import React from "react";
import { Table, Button, Modal } from "antd";
import UserModal from "../components/userModal";
import UserTableColumns from "../components/userColumns";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { User } from "../constants";

const { confirm } = Modal;

const UserTable: React.FC = () => {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const { data, isLoading } = useQuery<User[]>("users", () =>
    axios.get("/api/users").then((res) => res.data)
  );

  const deleteUser = useMutation<void, Error, number>((userId) =>
    axios.delete(`/api/user/${userId}`)
  );

  const handleEdit = (userId: number) => {
    if (userId) {
      const userToEdit = data?.find((user) => user.id === userId);
      setEditingUser(userToEdit || null);
    } else {
      setEditingUser(null);
    }
    setIsModalVisible(true);
  };

  const handleDelete = (userId: number) => {
    confirm({
      title: "Delete User",
      content: "Are you sure you want to delete this user?",
      onOk: async () => {
        try {
          await deleteUser.mutateAsync(userId);

          queryClient.setQueryData<User[]>("users", (prevData) =>
            prevData?.filter((user) => user.id !== userId) || []
          );

          queryClient.invalidateQueries("users");
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const handleCreateOrUpdate = async (userData: User) => {
    try {
      setSaving(true);
      if (editingUser) {
        await axios.put(`/api/user/${editingUser.id}`, userData);
      } else {
        await axios.post("/api/user", userData);
      }
      
      setEditingUser(null);
      setErrorMessage(null);
      setIsModalVisible(false);
      queryClient.invalidateQueries("users");

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setErrorMessage(err.response?.data.message)
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Unknown Error occured");
      }
    } finally {
      setSaving(false);
    }
  };

  const columns = UserTableColumns(handleEdit, handleDelete);

  return (
    <div style={{ padding: "5%" }}>
      <Button
        type="primary"
        onClick={() => handleEdit(0)}
        style={{ marginBottom: "30px" }}
      >
        Add New User
      </Button>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 7 }}
        size="large"
        bordered
      />
      {isModalVisible && (
        <UserModal
          onCreate={handleCreateOrUpdate}
          onCancel={() => {
            setErrorMessage(null);
            setIsModalVisible(false);
          }}
          user={editingUser}
          errorMessage={errorMessage}
          confirmLoad={saving}
        />
      )}
    </div>
  );
};

export default UserTable;