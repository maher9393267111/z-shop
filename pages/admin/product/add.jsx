import React, { useState } from 'react';
import { Input,Box,Button ,Stack} from '@chakra-ui/react';
import AddProductMain from '@/components/admin/product/addProduct';
import { getDocuments } from '@/functions/firebase/getData';

const AddProductPage = ({subcats,cats}) => {
    return (
            <div>
                <AddProductMain
                subcats={subcats}
                cats={cats}
                />
        </div>
    );
}

export default AddProductPage;


// serverside
AddProductPage.getInitialProps = async (context) => {
    const SubCategories = await getDocuments("subcats"); //  []
    const Categories = await getDocuments("cats"); //  []
  
    console.log("data SubCats💡", SubCategories);
    console.log("data Cats💡", Categories);
  
    return {
      // props from serverside will go to props in clientside
      subcats: SubCategories,
      cats: Categories,
    };
  };
  