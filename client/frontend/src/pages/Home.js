import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/shared/Spinner'
import Layout from '../components/shared/layout/Layout'
import Modal from '../components/shared/modal/Modal'
import Api from '../services/Api'
import moment from 'moment'

const Home = () => {
    const { loading, error, user } = useSelector(state => state.auth)
    const [data, setData] = useState([])

    const navigate = useNavigate()

    const getBloodRecords = async () => {
        try {

            const { data } = await Api.get('/inventory/get-inventory')


            if (data?.success && Array.isArray(data.inventory)) {
                setData(data?.inventory)


            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBloodRecords();

    }, [])



    return (

        <Layout>
            {user?.role === "admin" && navigate("/admin")}
            {error && <span>{alert(error)}</span>}
            {loading ? <Spinner /> : (
                <>
                    <div className='container'>
                        <h4
                            className='ms-4'
                            data-bs-toggle="modal"
                            data-bs-target='#staticBackdrop'
                            style={{ cursor: "pointer" }}
                        >
                            <i className='fa-solid fa-plus text-success py-4'></i>
                            Add Inventory
                        </h4>
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
                                {Array.isArray(data) && data.length > 0 ? (data?.map((record) => (
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

                        <Modal />
                    </div>
                </>
            )}

        </Layout>
    )
}

export default Home




