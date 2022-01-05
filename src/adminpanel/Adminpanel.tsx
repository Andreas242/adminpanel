import React, { useState } from "react";
import Roles from "../consts/Roles";
import { Form, Radio, RadioChangeEvent, Tabs } from "antd";
import UpdateUser from "./UpdateUserForm";
import CreateUser from "./CreateUserForm";
import DeleteModal from "./DeleteUserModal";
import User from "./UserInterface";

const { TabPane } = Tabs;

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Adminpanel = (props: { currentUser: User; users: User[], crudUserCall: any }) => {
  const [roleValue, setRoleValue] = useState(Roles.Publikum);
  const [selectedUser, setSelectedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: Roles.Publikum,
    id: "",
    comment: "",
  });
  const [selectedUserId, setSelectedUserId] = useState("");
  const [savedSelectedUserId, setSavedSelectedUserId] = useState("");
  const [selectedUserComment, setSelectedUserComment] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const user = {
        userId: selectedUserId,
    }
    props.crudUserCall(user);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    if (selectedUserId !== "") {
      const user = {
        userId: selectedUserId,
        role: roleValue,
        comment: selectedUserComment,
        email: userEmail,
      };
      console.table(user);
      props.crudUserCall(user);
    } else {
      const user = {
        role: values.role,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        comment: values.comment,
      };
      console.table(user);
      props.crudUserCall(user);
    }
  };

  const deleteUser = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    showModal();
    console.log("Delete me");
  };

  const [form] = Form.useForm();

  const changeUser = (value: string) => {
    setSelectedUserId(value);
    setSelectedUser(props.users.filter((user) => user.id === value)[0]);
    setRoleValue(props.users.filter((user) => user.id === value)[0].role);
    setSelectedUserComment(
      props.users.filter((user) => user.id === value)[0].comment
    );
    setUserEmail(props.users.filter((user) => user.id === value)[0].email);
  };

  const onChange = (e: RadioChangeEvent) => {
    setRoleValue(e.target.value);
  };

  const updateComment = (value: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setSelectedUserComment(value.currentTarget.value);
  };

  const updateEmail = (value: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setUserEmail(value.currentTarget.value);
  };

  function updateSelectedUserId(key: string) {
    if (key === "2") {
      setSavedSelectedUserId(selectedUserId);
      setSelectedUserId("");
    } else {
      setSelectedUserId(savedSelectedUserId);
    }
  }

  const roleList = () => {
    const roleArray = Object.values(Roles);
    return (
      <Radio.Group onChange={onChange} value={roleValue}>
        {roleArray.map((role, index) => (
          <Radio key={index} value={role}>
            {role}
          </Radio>
        ))}
      </Radio.Group>
    );
  };

  // TODO: Move me
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "Feltet er påkrevd!",
    types: {
      email: "Ikke en gyldig epost!",
    },
  };
  /* eslint-disable no-template-curly-in-string */

  return (
    <>
      <DeleteModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        user={selectedUser}
      />
      <div>
        Du er inlogged som {props.currentUser.firstName}{" "}
        {props.currentUser.lastName}
      </div>
      <Tabs defaultActiveKey="1" onChange={updateSelectedUserId}>
        <TabPane tab="Oppdater bruker" key="1">
          <UpdateUser
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            users={props.users}
            roleList={roleList}
            userEmail={userEmail}
            updateEmail={updateEmail}
            selectedUserComment={selectedUserComment}
            updateComment={updateComment}
            deleteUser={deleteUser}
            validateMessages={validateMessages}
            changeUser={changeUser}
            selectedUserId={selectedUserId}
          />
        </TabPane>

        <TabPane tab="Opprett bruker" key="2">
          <CreateUser
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            roleList={roleList}
            userEmail={userEmail}
            updateEmail={updateEmail}
            selectedUserComment={selectedUserComment}
            updateComment={updateComment}
            validateMessages={validateMessages}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Adminpanel;
