import React, { useEffect, useState } from 'react'
import Header from '../../components/shared/layout/Header'
import Api from '../../services/Api'
import moment from 'moment'
const Analytics = () => {
    const [data, setData] = useState([])
    const [inventoryData, setInventoryData] = useState([])
    const colors = ["#884A39", "#C38154", "#FFC26F", "#4F709C", "#4942E4", "#0079FF", "#FF0600", "#22A699"]

    const getBloodGroupData = async () => {
        try {
            const { data } = await Api.get('/analytics/bloodGroup-data')
            if (data?.success) {
                setData(data?.bloodGroupData)
                // console.log(data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBloodGroupData();
    }, [])

    const getBloodRecords = async () => {
        try {

            const { data } = await Api.get('/inventory/get-recent-inventory')


            if (data?.success && Array.isArray(data.inventory)) {
                setInventoryData(data?.inventory)
                console.log(data)

            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBloodRecords();

    }, [])
    return (
        <>
            <Header />
            <div class="d-flex flex-row flex-wrap">
                {
                    data?.map((record, i) => (
                        <div className="card m-2 p-1" key={i} style={{ width: '18rem', backgroundColor: `${colors[i]}` }}>
                            <div className="card-body">
                                <h1 className="card-title bg-light text-dark text-center mb-3">{record.bloodGroup}</h1>
                                <p className="card-text">
                                    Total In: <b>{record.totalIn}</b> (Ml)
                                </p>
                                <p className="card-text">
                                    Total Out: <b>{record.totalOut}</b> (Ml)
                                </p>

                            </div>
                            <div className="card-footer text-light bg-dark text-center">
                                Total Available: <b>{record.availableBlood}</b> (Ml)
                            </div>

                        </div>
                    ))
                }
            </div>
            <div className="container mt-3">
                <h1 className="my-3" >Recent Blood Transactions</h1>
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">Blood Group</th>
                            <th scope="col">Inventory Type</th>
                            <th scope="col">Quantity (ML)</th>
                            <th scope="col">Donor Email</th>
                            <th scope="col">Time & Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(inventoryData) && inventoryData.length > 0 ? (inventoryData?.map((record) => (
                            <tr key={record._id}>
                                <td>{record.bloodGroup}</td>
                                <td>{record.inventoryType}</td>
                                <td>{record.quantity} </td>
                                <td>{record.email}</td>
                                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>

                            </tr>
                        ))) : (
                            <tr>
                                <td colSpan="5">No records available</td>
                            </tr>
                        )}


                    </tbody>
                </table>

            </div>
        </>
    )
}

export default Analytics