import Roles from "../consts/Roles";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    role: Roles;
    id: string;
    comment: string;
  }

export default User;