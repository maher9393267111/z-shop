import React from 'react';
import AdminLayout from './AdminLayout';
import CountCard from './CountCards';
const MainAdmin = ({cats,subcats,products}) => {
    return (
        <div>
            <AdminLayout>
               <CountCard
               cats={cats}
               subcats={subcats}
               products={products}
               />
            </AdminLayout>
        </div>
    );
}

export default MainAdmin;
