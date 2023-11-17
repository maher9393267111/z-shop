import React from 'react';
import { useAuth } from '@/functions/context';

import Navbar from '@/components/client/layout/navbar';

const Index = () => {

const {profile,userData} = useAuth();
console.log("user Data---->",profile)

    return (
       
        <div className='bg-green-500 text-white text-center my-4'>

    <Navbar/>

        </div>
      
      
    );
}

export default Index;
