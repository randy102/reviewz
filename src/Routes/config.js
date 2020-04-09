import { AUTH_ROLE } from "../Configs/constants";

export default [
  // Admin page //
  {
    path: "/admin",
    component: "Admin",
    exact: false,
    authorization: true,
    role: AUTH_ROLE.ADMIN
  },

  {
    path: "/login",
    component: "Login",
    exact: true,
    authorization: false
  },
  {
    path: "/register",
    component: "Register",
    exact: true,
    authorization: false
  },
  {
    path: "/logout",
    component: "Logout",
    exact: true,
    authorization: true
  },
  {
    path: "/test",
    component: "Test",
    exact: true,
    authorization: false,
    role: AUTH_ROLE.ADMIN
  },
  {
    path: "/*",
    component: "Home",
    exact: true,
    authorization: false
  }
]