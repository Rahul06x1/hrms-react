import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserDetail from '../userdetail/userdetail'
import './employee.css'

function Employee() {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`).then((response) => {
            setUsers(response.data)
        })
    }, [])

    const userHandler = (empid) => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${empid}`).then((response) => {
            setUser(response.data)
        })
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-5">
                    <div className="card mb-4">
                        <div className="card-body">
                            {users.map((user) =>
                                <div key={user.id} className="row">
                                    <div>
                                        <p  className="name mb-0" onClick={() => userHandler(user.id)}>{user.name}</p>
                                    </div>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    {user.length !== 0 && <UserDetail user={user} />}
                </div>
            </div>

        </div>
    )
}

export default Employee