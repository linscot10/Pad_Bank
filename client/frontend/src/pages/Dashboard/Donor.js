import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/layout/Layout'
import Api from '../../services/Api'
import moment from 'moment'

const Donor = () => {
    const [data, setData] = useState([])
    const getDonors = async () => {
        try {
            const { data } = await Api.get('/inventory/get-donors')
            // console.log(data)
            if (data?.success) {
                setData(data?.donors)
            }
            // setData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDonors()
    }, [])

    return (
        <Layout>
            <table className="table ">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Date</th>

                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.length > 0 ? (data?.map((record) => (
                        <tr key={record._id}>
                            <td>{record.name || record.organisationName + "(ORG)"}</td>
                            <td>{record.email}</td>
                            <td>{record.phone}</td>
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

export default Donor