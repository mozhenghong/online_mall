import Login from "@/pages/login";
import OrderManagement from "@/pages/orderManagement";
import Register from "@/pages/register";
import UserManagement from '@/pages/userManagement';
import VideoManagement from '@/pages/videoManagement';
import CourseManagement from '@/pages/courseManagement';

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
    component: OrderManagement,
  },
  {
    pathname: "userManagement",
    component: UserManagement,
  },
  {
    pathname: "videoManagement",
    component: VideoManagement,
  },
  {
    pathname: "courseManagement",
    component: CourseManagement,
  },
];
export default routes;
