import React from 'react';
import {Data} from './Data'
import { Card,Box,SimpleGrid,Button } from '@chakra-ui/react';
import Link from 'next/link';
const Cards = () => {
    
  return (
        <div>
          <Link href={"/"}>
          <Button className=' items-center flex ml-80 h-[100vh]'>Home</Button>
          </Link>
          <Card columns={[2,2,4] } mx={10} my={10} w={"70%"}>
          <SimpleGrid spacing={5} columns={[1,1,2,3,4]} >
            
          {Data.map((Data)=> (         
           <div className="card card-compact w-50 bg-base-100 shadow-xl" >
  <figure >
    <Box >
    <img width={"100%"} style={{height:"350px"}} src={Data.IMG} alt="coats" />
    </Box>
    </figure>
    
  
    <h2 className="card-title">{Data.Title}</h2>
    
  </div>
))}

</SimpleGrid>
</Card>

        </div>
    );
}

export default Cards;
