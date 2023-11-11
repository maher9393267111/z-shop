import React from 'react'
import UsersMain from '@/components/admin/users';
import { getDocuments } from '@/functions/firebase/getData';
export default function UsersPage({users}) {
  return (
    <div>
        <UsersMain users={users} />
    </div>
  )
}


// serverside
UsersPage.getInitialProps = async (context) => {
    const Users = await getDocuments("users"); //  []
  
  
    console.log("data",Users);
  
  
    return {
      // props from serverside will go to props in clientside
      users:Users,
    };
  };
  
  
  