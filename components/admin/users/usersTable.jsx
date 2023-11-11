import React from "react";
import { Table, Dropdown } from "antd";
import Link from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { handleDelete, updateUserRole } from "@/functions/firebase/getData";
import { MoreOutlined } from "@ant-design/icons";

const CategoryTable = ({ users }) => {
  const USER_ACTIONS = [
    { label: "Standard", value: "standard" },
    { label: "Moderator", value: "moderator" },
    { label: "Admin", value: "admin" },
  ];

  const createUserAction = (id) =>
    USER_ACTIONS.map(({ label, value }) => ({
      key: label,
      label,
      onClick: () => updateUserRole(id, value),
    }));

    

  const columns = [
    {
      title: "name",
      // same name from database   // category={title ,....}
      dataIndex: "displayName",
    },

    {
      title: "image",
      // single category {record} --> record.image.url === category.image.url
      render: (record) => {
        return (
          <>
            <img
              className="  relative  -ml-6  w-24 h-24 object-contain object-center "
              src={record?.avatarUrl}
              alt=""
            />
          </>
        );
      },
    },

    // ---change user role---
    {
      title: "Assign Roles",
      key: "Role Action",
      render: (record, { id }) => (
        <div className=" gap-5  flex">
          <div
            className={`${
              record?.role === "admin" ? " text-green-600" : " text-red-500 "
            } text-xl font-bold`}
          >
            {record?.role}
          </div>

        

          <Dropdown menu={{ items: createUserAction(id) }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <MoreOutlined className=" text-xl" />
            </a>
          </Dropdown>
        </div>
      ),
    },

    {
      title: "Actions",

      // 💡💡  render to make style in table in single category
      // single category data ==> title , image , id

      render: (record) => {
        return (
          <>
            <div className=" flex gap-4  items-center">
              <div>
                <AiFillDelete
                  // send collection name and single category data to delete
                  onClick={() => handleDelete("users",record ,false ,true)}
                  className=" hover:text-red-700 text-red-500 cursor-pointer"
                  size={"25"}
                />
              </div>

              <div>
                <Link href={`/admin/category/edit/${record?.id}`}>
                  <AiFillEdit
                    className="hover:text-blue-700 text-blue-500 cursor-pointer"
                    size={"25"}
                  />
                </Link>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className=" w-[90%]  md:w-[70%] mx-auto">
      <Table columns={columns} dataSource={users} />
    </div>
  );
};

export default CategoryTable;
