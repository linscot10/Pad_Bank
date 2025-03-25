import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/layout/Layout'
import Api from '../../services/Api'
import moment from 'moment'

const Hospital = () => {
    const [data, setData] = useState([])
    const getHospitals = async () => {
        try {
            const { data } = await Api.get('/inventory/get-hospitals')
            console.log(data)
            if (data?.success) {
                setData(data?.hospitals)
            }
            // setData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getHospitals()
    }, [])

    return (
        <Layout>
            <table className="table ">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Date</th>

                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.length > 0 ? (data?.map((record) => (
                        <tr key={record._id}>
                            <td>{record.hospitalName}</td>
                            <td>{record.email}</td>
                            <td>{record.phone}</td>
                            <td>{record.address}</td>
                            <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>

                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan="5">No records available</td>
                        </tr>
                    )}


                </tbody>
            </table>
        </Layout>
    )
}

export default Hospital