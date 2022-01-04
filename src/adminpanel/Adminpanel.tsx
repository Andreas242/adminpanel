import React, { useState } from "react";
import Roles from "../consts/Roles";
import { Form, Radio, RadioChangeEvent, Tabs } from "antd";
import UpdateUser from "./UpdateUser";
import CreateUser from "./CreateUser";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
  id: string;
  comment: string;
}

const { TabPane } = Tabs;

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Adminpanel = (props: { currentUser: User; users: User[] }) => {
  const [roleValue, setRoleValue] = useState(Roles.Publikum);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [savedSelectedUserId, setSavedSelectedUserId] = useState("");
  const [selectedUserComment, setSelectedUserComment] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const onFinish = (values: any) => {
    if (selectedUserId !== "") {
      const user = {
        userId: selectedUserId,
        role: roleValue,
        comment: selectedUserComment,
        email: userEmail,
      };
      // TODO: axios send to backend create or update
      console.table(user);
    } else {
      const user = {
        role: values.role,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        comment: values.comment,
      };
      console.table(user);
    }
  };

  const deleteUser = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    //TODO: open modal for verification of deletion
    console.log("Delete me");
  };

  const [form] = Form.useForm();

  const changeUser = (value: string) => {
    setSelectedUserId(value);
    setRoleValue(props.users.filter((user) => user.id === value)[0].role);
    setSelectedUserComment(
      props.users.filter((user) => user.id === value)[0].comment
    );
    setUserEmail(props.users.filter((user) => user.id === value)[0].email);
  };

  const onChange = (e: RadioChangeEvent) => {
    setRoleValue(e.target.value);
  };

  const updateComment = (value: { currentTarget: { value: React.SetStateAction<string>; }; }) => {
    setSelectedUserComment(value.currentTarget.value);
  };

  const updateEmail = (value: { currentTarget: { value: React.SetStateAction<string>; }; }) => {
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
      {roleValue} :{selectedUserId} : {selectedUserComment} : {userEmail}
      {/** spare ned ny rolle */}
    </>
  );
};

export default Adminpanel;
