import React from 'react';
import AdminLayout from '../AdminLayout';
import SubCategoryTable from './subCategoryTable';


const SubCategoriesMain = ({ subcats}) => {
    return (
        <AdminLayout>
           <SubCategoryTable subcats={subcats} />
        </AdminLayout>
    );
}


export default SubCategoriesMain;