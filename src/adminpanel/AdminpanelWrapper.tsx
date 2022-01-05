import React from "react";

import AdminPanel from "./Adminpanel";
import Roles from "../consts/Roles";

const currentUser = {
  firstName: "Andy",
  lastName: "Bridgehead",
  role: Roles.Admin,
  id: "1",
  comment: "",
  email: "andy@pandy.com",
};

const users = [
  {
    firstName: "Thom",
    lastName: "Thorwaldson",
    id: "2",
    role: Roles.Prosjektleder,
    comment: "",
    email: "tt@pandy.com",
  },
  {
    firstName: "Arun",
    lastName: "Juss",
    id: "3",
    role: Roles.Leverandor,
    comment: "Aktiv til 10/10",
    email: "arun@juss.com",
  },
  {
    firstName: "Bubonicus",
    lastName: "Dolor",
    id: "4",
    role: Roles.Publikum,
    comment: "återevaluere i 2022",
    email: "ipsum@dolor.com",
  },
  {
    firstName: "Andy",
    lastName: "Bridgehead",
    role: Roles.Admin,
    id: "1",
    comment: "",
    email: "andy@pandy.com",
  },
];

const h1Styles: any = {
  width: "min(90%,1000px)",
  marginInline: "auto",
};

const AdminPanelWrapper = () => {
    const filteredUserArray = users.filter(function(e) { return e.id !== currentUser.id })
  return (
    <div style={h1Styles}>
      <AdminPanel currentUser={currentUser} users={filteredUserArray} />
    </div>
  );
};

export default AdminPanelWrapper;
