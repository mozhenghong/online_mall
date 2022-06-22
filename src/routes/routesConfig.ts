import Login from '@/pages/login';
import OrderManagement from '@/pages/orderManagement';
import Register from '@/pages/register';
import UserManagement from '@/pages/userManagement';
import VideoManagement from '@/pages/videoManagement';
import CourseManagement from '@/pages/courseManagement';
import { VideoDetail } from '@/pages/videoManagement/detail';
import PayTransition from '@/pages/payTransition';
import OrderDetail from '@/pages/orderManagement/detail';
import CourseDetail from '@/pages/courseManagement/detail';
import VideoPlay from '@/pages/courseManagement/videoDetail';
import Page403 from '@/pages/errorPage/403';
import Page404 from '@/pages/errorPage/404';


const routes = [
    {
        pathname: '/login',
        component: Login
    },
    {
        pathname: '/register',
        component: Register
    },
    {
        pathname: '/orderManagement',
        component: OrderManagement
    },
    {
        pathname: '/orderManagement/detail',
        component: OrderDetail
    },
    {
        pathname: '/userManagement',
        component: UserManagement
    },
    {
        pathname: '/videoManagement',
        component: VideoManagement
    },
    {
        // 查看
        pathname: '/videoManagement/videoDetail/:id',
        component: VideoDetail
    },
    {
        pathname: '/videoManagement/videoDetail',
        component: VideoDetail
    },
    {
        pathname: '/',
        component: CourseManagement
    },
    {
        pathname: '/detail',
        component: CourseDetail
    },
    {
        pathname: '/payTransition',
        component: PayTransition
    },
    {
        pathname: '/videoPlay',
        component: VideoPlay
    },
    { pathname: '/403', component: Page403 },
    { pathname: '/404', component: Page404 },
];
export default routes;
