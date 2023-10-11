import React from "react";
import { Modal, Form, Input } from "antd";
import { User } from "../constants";

interface UserModalProps {
  onCreate: (userData: User) => void;
  onCancel: () => void;
  user: User | null;
  errorMessage?: string | null;
  confirmLoad?: boolean;
}

const UserModal: React.FC<UserModalProps> = ({
  onCreate,
  onCancel,
  user,
  errorMessage = null,
  confirmLoad = false,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue(user);
  }, [user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onCreate(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={true}
      title={user ? "Edit User" : "Add New User"}
      okText="Save"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
      confirmLoading={confirmLoad}
      destroyOnClose
    >
      {errorMessage !== null && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Form form={form} layout="vertical" name="user_form">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please enter the user's name" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter the user's email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please enter the user's phone" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter the user's password" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
