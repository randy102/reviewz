export default [
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
    authorization: true
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
    authorization: false
  },
  {
    path: "/",
    component: "Home",
    exact: true,
    authorization: false
  }
]