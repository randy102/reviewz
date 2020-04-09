export default [
  {
    path: "/user",
    component: "User",
    exact: true,
  },
  {
    path: "/category",
    component: "Category",
    exact: true,
  },
  {
    path: "/*",
    component: "User",
    exact: true
  }
]