import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductsMain from '@/components/admin/product/products';
import { getDocuments } from '@/functions/firebase/getData';
const All = ({products}) => {
    return (
        <div>
            <ProductsMain products={products} />
        </div>
    );
}

export default All;



// serverside
All.getInitialProps = async (context) => {
    const Products = await getDocuments("products"); //  []
  
  
    console.log("data", Products);
  
  
    return {
      // props from serverside will go to props in clientside
      products: Products,
    };
  };
  