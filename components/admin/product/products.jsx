import React from 'react'
import ProductsTable from './productTable'
import AdminLayout from '../AdminLayout'
export default function productsMain({products}) {
  return (
    <AdminLayout>
        
        <ProductsTable products ={products} />



    </AdminLayout>
  )
}
