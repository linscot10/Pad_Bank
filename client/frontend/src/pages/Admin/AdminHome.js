import React from 'react'
import Layout from '../../components/shared/layout/Layout'
import { useSelector } from 'react-redux'

const AdminHome = () => {
    const { user } = useSelector(state => state.auth)
    return (
        <Layout>


            <div class="container">
                <div class="d-flex flex-column mt-4">
                    <h1>Welcome Admin <i className='text-success '>{user?.name}</i></h1>
                    <h3>Manage Blood Bank App</h3>
                    <p>
                        <hr />
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus expedita doloribus blanditiis deserunt
                        laudantium architecto incidunt aspernatur facilis, cumque voluptate omnis eveniet distinctio earum
                        labore laboriosam maxime reiciendis. Molestiae est deleniti ut, aliquam nesciunt quo inventore ratione
                        soluta? Eum ipsam laborum nobis error nostrum corrupti quam quibusdam! Quibusdam omnis ab quas iusto
                        dicta sunt dolore ullam et placeat, fugiat reprehenderit aut, accusamus explicabo, laudantium odit
                        adipisci cum? Suscipit esse, quod quaerat deleniti laboriosam sequi quis blanditiis beatae sint nisi
                        doloremque vel officiis ducimus. Fugiat vero nam tempore pariatur optio cupiditate assumenda doloribus
                        sequi, illo dolorum corrupti ad quo ex sunt!
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default AdminHome