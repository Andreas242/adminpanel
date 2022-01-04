import React from "react";

import { Form, Button, Input } from "antd";

const { TextArea } = Input;

const CreateUser = (props: {
  onFinish: ((values: any) => void) | undefined;
  onFinishFailed:
    | ((
        errorInfo: import("rc-field-form/lib/interface").ValidateErrorEntity<any>
      ) => void)
    | undefined;
  validateMessages:
    | import("rc-field-form/lib/interface").ValidateMessages
    | undefined;
  userEmail: string | number | readonly string[] | undefined;
  updateEmail:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
  roleList: any;
  selectedUserComment: string | number | readonly string[] | undefined;
  updateComment:
    | ((event: React.ChangeEvent<HTMLTextAreaElement>) => void)
    | undefined;
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      name="createUser"
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      validateMessages={props.validateMessages}
      initialValues={{ remember: true }}
      form={form}
    >
      <Form.Item label="Fornavn" name="firstName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Etternavn" name="lastName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Epost"
        name="email"
        rules={[{ type: "email" }, { required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Rolle" name="role" rules={[{ required: true }]}>
        {props.roleList()}
      </Form.Item>

      <Form.Item label="Kommentar" name="comment">
        <TextArea maxLength={200} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Lagre
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
