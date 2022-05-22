import Login from "@/pages/login";
import Order from "@/pages/orderManagement";
import Register from "@/pages/register";

const routes = [
  {
    pathname: "login",
    component: Login,
  },
  {
    pathname: "register",
    component: Register,
  },
  {
    pathname: "orderManagement",
    component: Order,
  },
];
export default routes;
