import React from "react";

import { Form, Button, Input, Space } from "antd";

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

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      name="createUser"
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
      labelCol={{ span: 4 }}
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
        validateTrigger="onBlur"
      >
        <Input />
      </Form.Item>

      <Form.Item label="Rolle" name="role" rules={[{ required: true }]}>
        {props.roleList()}
      </Form.Item>

      <Form.Item label="Kommentar" name="comment">
        <TextArea maxLength={200} showCount={true} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Lagre
          </Button>
          <Button onClick={onReset}>Nullstill</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
