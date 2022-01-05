import React from "react";

import { Form, Select, Button, Input, Space } from "antd";
import Roles from "../consts/Roles";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
  id: string;
  comment: string;
}

const { Option } = Select;
const { TextArea } = Input;

const UpdateUser = (props: {
  onFinish: ((values: any) => void) | undefined;
  onFinishFailed:
    | ((
        errorInfo: import("rc-field-form/lib/interface").ValidateErrorEntity<any>
      ) => void)
    | undefined;
  validateMessages:
    | import("rc-field-form/lib/interface").ValidateMessages
    | undefined;
  users: User[];
  userEmail: string | number | readonly string[] | undefined;
  updateEmail:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
  roleList: any;
  selectedUserComment: string | number | readonly string[] | undefined;
  updateComment:
    | ((event: React.ChangeEvent<HTMLTextAreaElement>) => void)
    | undefined;
  deleteUser:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
  changeUser:
    | ((
        value: any,
        option:
          | import("rc-select/lib/Select").DefaultOptionType
          | import("rc-select/lib/Select").DefaultOptionType[]
      ) => void)
    | undefined;
  selectedUserId: string;
}) => {
  const [form] = Form.useForm();

  const userList = (userList: User[]) => {
    return (
      <Select onChange={props.changeUser}>
        {userList.map((user, index) => (
          <Option key={index} value={user.id}>
            {user.lastName} {user.firstName}
          </Option>
        ))}
      </Select>
    );
  };

  return (
    <Form
      name="updateUser"
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      validateMessages={props.validateMessages}
      initialValues={{ remember: true }}
      form={form}
    >
      <Form.Item label="User">{userList(props.users)}</Form.Item>

      <Form.Item label="Epost">
        <Input value={props.userEmail} onChange={props.updateEmail} disabled />
      </Form.Item>

      <Form.Item label="Rolle">{props.roleList()}</Form.Item>

      <Form.Item label="Kommentar">
        <TextArea
          value={props.selectedUserComment}
          onChange={props.updateComment}
          maxLength={200}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Lagre
          </Button>

          <Button
            danger
            htmlType="button"
            onClick={props.deleteUser}
            disabled={!props.selectedUserId}
          >
            Ta bort bruker
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UpdateUser;
