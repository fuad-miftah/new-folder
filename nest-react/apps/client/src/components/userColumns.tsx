import { User } from "../constants";
import { Button } from "antd";
import { useUserTableSearch } from "./getColumnSearchProps";

const UserTableColumns = (handleEdit: (userId: number) => void, handleDelete: (userId: number) => void) => {
  const { getColumnSearchProps } = useUserTableSearch({ dataIndex: "name" });

  return [
    { title: "ID", dataIndex: "id", key: "id", width: "25%" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps(),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "15%",
      ...getColumnSearchProps(),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      ...getColumnSearchProps(),
    },
    { title: "Password", dataIndex: "password", key: "password", width: "15%" },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (record: User) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record.id)}>
            Edit
          </Button>
          <Button
            style={{ backgroundColor: "red", color: "white", marginLeft: "8px" }}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
};

export default UserTableColumns;