//import { AiOutlineUser } from "react-icons/ai";
import Link from "next/link";

//import { getAuth } from "@/functions/firebase/auth";
//import { auth } from "@/functions/firebase";

import Loader from "../common/Loader";
import { useAuth } from "@/functions/context";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Spinner, Avatar, Button } from "@chakra-ui/react";
import { toast } from "react-toastify";

const AdminLayout = ({ children }) => {
  const list = [
    { id: 1, text: "Admin", path: "/admin" },
    { id: 2, text: "Add Category", path: "/admin/category/add" },
    { id: 3, text: "All Categories", path: "/admin/category/all" },
    { id: 4, text: "Add Product", path: "/admin/product/add" },
    { id: 5, text: "All Products", path: "/admin/product/all" },
    { id: 6, text: "Add SubCategory", path: "/admin/subcategory/add" },
    { id: 7, text: "All SubCategories", path: "/admin/subcategory/all" },
    

  ];


 




  const { logout, profile, setPageLoading, pageLoading, user  } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname, replace } = useRouter();


  useEffect(() => {
    console.log("profile Role: " + user);

    if (profile?.role && profile?.role !== "admin") {
      replace("/");
      toast.error("sorry you are not allowed to edit this page");
    }


 const  isLoggeed = localStorage.getItem("isLogged");
 
 console.log('isLogged-->' , isLoggeed)
if(!isLoggeed)
{

  replace('/auth/login')

}



    
  }, [profile]);

  const signOut = () => {
    try {
      // setPageLoading(true);
      logout();
      localStorage.removeItem('isLogged');
      replace("/auth/login");
      // setPageLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };



  if (pageLoading) {
    <div className=" h-[100vh] flex justify-center items-center">
      <div>
        <h1>Please Login First to Access to this page</h1>
        <h2 className=" text-blue-400 text-center text-2xl font-semibold">
          <Link href={"/auth/login"}> Login Page</Link>
        </h2>
        <h2 className=" text-blue-400 text-4xl font-bold text-center mt-12">
          <Spinner size={"xl"} fontSize={"50px"} />
        </h2>
      </div>
    </div>;
  }

  if (profile && profile?.role !== "admin") {
    return (
      <div className="bg-blue-200 !h-screen w-full fixed top-0 flex justify-center items-center z-50">
        <h1 className="font-cutiveMono text-3xl">
          Sorry You Are Not Admin {profile?.role}
        </h1>
      </div>
    );
  }


  if (profile === null) {
    return (
      <>
      <Loader/>
      
      </>
   
    );
  }


 

  return (
    <>
      <div className="lg:sticky  lg:top-8 mt-12 mb-6 ml-4 flex flex-row gap-2">
        {/* <AiOutlineUser className="text-3xl" /> */}

        <Avatar name={profile?.displayName} src="https://bit.ly/broken-link" />
      </div>
      <div className="mb-12 flex flex-col lg:flex-row gap-8 ">
        {/* //sidebar */}
        <div className="lg:sticky  lg:top-[5.5rem] h-fit">
          <ul className="md:w-max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-none text-xl font-semibold">
            {list.map((listItem) => (
              <Link
                key={listItem.id}
                href={listItem.path}
                className={
                  pathname === listItem.path
                    ? "text-orange-600 transition duration-500"
                    : "hover:text-orange-600 transition duration-500"
                }
              >
                <li className="py-2 px-4 cursor-pointer">{listItem.text}</li>
              </Link>
            ))}



          </ul>

          <div className=" py-2 px-4 cursor-pointer text-white">
            <Button
              onClick={signOut}
              color={"white"}
              bg={"red.500"}
              _hover={{ bg: "red.600" }}
              className=""
            >
              LogOut
            </Button>
          </div>
        </div>
        <div className="grow">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;