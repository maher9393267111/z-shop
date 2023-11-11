import React from 'react'
import UsersTable from './usersTable'
import AdminLayout from '../AdminLayout'
export default function UsersMain({users}) {
  return (
    <AdminLayout >


<UsersTable users={users}/>

    </AdminLayout>
  )
}
