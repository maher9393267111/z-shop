import React from 'react';
import ProductForm from './productForm';
import {toast} from 'react-toastify'
import { useAuth } from '@/functions/context';
import { useState } from 'react';
import { db } from '@/functions/firebase';
import { addDoc ,collection } from 'firebase/firestore';
import { uploadImages , deleteImages } from '@/functions/firebase/getData';
import AdminLayout from '../AdminLayout';
const AddProductMain = ({cats , subcats}) => {
    const {setPageLoading ,pageLoading} = useAuth();
    const [files, setFiles] = useState([]);
    const onFinish = async (values) => {
        try {

            setPageLoading(true)
            console.log('datra--->' , values)
       
          values.images = await uploadImages(files);
         await addDoc(collection(db, 'products') , values)
          toast.success("Product Added Successfully");
        } catch (error) {
          toast.error(error.message);
        } finally {
            setPageLoading(false)
         // dispatch(SetLoading(false));
        }
      };





    return (
        <AdminLayout>
            
            <ProductForm {...{onFinish ,subcats ,cats ,files ,setFiles}} />
        </AdminLayout>
    );
}

export default AddProductMain;
