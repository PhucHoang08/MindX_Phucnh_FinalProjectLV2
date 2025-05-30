import React from 'react'
import AdminProduct from '../components/admin/AdminProduct'
import HeaderAdmin from '../components/admin/HeaderAdmin'

function Admin() {
  return (
    <div className='w-full pt-[90px] h-fit  bg-white'>
      <HeaderAdmin/>
      <AdminProduct/>
    </div>
  )
}

export default Admin
