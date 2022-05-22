import Login from "@/pages/login";
import Order from "@/pages/orderManagement";
import Register from "@/pages/register";
import UserManagement from '@/pages/userManagement';

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
  {
    pathname: "userManagement",
    component: UserManagement,
  },
];
export default routes;
