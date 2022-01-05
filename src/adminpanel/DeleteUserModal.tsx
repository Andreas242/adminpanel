import React from "react";
import { Modal } from "antd";
import User from "./UserInterface";

const DeleteModal = (props: {
  isModalVisible: any;
  handleOk: any;
  handleCancel: any;
  user: User;
}) => (
  <Modal
    title="Ta bort bruker"
    visible={props.isModalVisible}
    onOk={props.handleOk}
    onCancel={props.handleCancel}
    okText="Ja"
    cancelText="Nei"
  >
    <p>Er du sikker på att du vil ta bort brukeren {props.user.firstName} {props.user.lastName}?</p>
  </Modal>
);

export default DeleteModal;
