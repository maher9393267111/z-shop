import React from 'react';
import AdminLayout from '../AdminLayout';
import ProductForm from './productForm';
import { useState } from 'react';
import { db } from '@/functions/firebase';
import { addDoc ,collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useAuth } from '@/functions/context';

const AddProductMain = ({cats,subcats}) => {

const [title,setTitle] = useState("");
const [image1 , setImage1] = useState({url:'' , name:''})
const [image2 , setImage2] = useState({url:'' , name:''})
const [image3 , setImage3] = useState({url:'' , name:''})
const [image4 , setImage4] = useState({url:'' , name:''})
const [image5 , setImage5] = useState({url:'' , name:''})
const [image6 , setImage6] = useState({url:'' , name:''})
const [video , setVideo] = useState({url:'' , name:''})
const [desc , setDesc] = useState("")
const [price , setPrice] = useState(0)
const [color , setColor] = useState("")
const [inStock , setInStock] = useState(true)
const [disCount , setDisCount] = useState(0)

const {setPageLoading,pageLoading} = useAuth();

const handleClick = async (e)=> {
    e.preventDefault();
    setPageLoading(true)

    const data = {title:title , image1:image1,image2:image2,image3:image3,image4:image4,
        image5:image5,image6:image6,video:video,desc:desc,price:price,color:color,
        inStock:inStock,disCount:disCount,reviews:0}

await addDoc(collection(db, 'products'), data)

    setPageLoading(false)
    toast.success('Product Uploaded Successfully')
    setTitle('')
    setImage1({name:"", url:""})
    setImage2({name:"", url:""})
    setImage3({name:"", url:""})
    setImage4({name:"", url:""})
    setImage5({name:"", url:""})
    setImage6({name:"", url:""})
    setVideo({name:"", url:""})
    setDesc("")
    setPrice(0)
    setColor("")
    setInStock(true)
    setDisCount(0)

}


    return (
        <AdminLayout>

        <ProductForm
       {...{title , setTitle , image1 , setImage1,image1 , setImage2,image2 , setImage3,image3 , setImage4,
        image4 , setImage5,image5 , setImage6,image6 , setVideo,video , handleClick,cats,subcats,desc , setDesc,price , setPrice,color , setColor,inStock , setInStock,disCount , setDisCount}}
       
        />

        </AdminLayout>
    );
}

export default AddProductMain;
