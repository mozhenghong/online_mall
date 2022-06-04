import Login from '@/pages/login';
import OrderManagement from '@/pages/orderManagement';
import Register from '@/pages/register';
import UserManagement from '@/pages/userManagement';
import VideoManagement from '@/pages/videoManagement';
import CourseManagement from '@/pages/courseManagement';
import { VideoDetail } from '@/pages/videoManagement/detail';
import PayTransition from '@/pages/payTransition';

const routes = [
    {
        pathname: 'login',
        component: Login
    },
    {
        pathname: 'register',
        component: Register
    },
    {
        pathname: 'orderManagement',
        component: OrderManagement
    },
    {
        pathname: 'userManagement',
        component: UserManagement
    },
    {
        pathname: 'videoManagement',
        component: VideoManagement
    },
    {
        // 查看
        pathname: 'videoManagement/videoDetail/:id',
        component: VideoDetail
    },
    {
        pathname: 'videoManagement/videoDetail',
        component: VideoDetail
    },
    {
        pathname: 'courseManagement',
        component: CourseManagement
    },
    {
        pathname: 'payTransition',
        component: PayTransition
    }
];
export default routes;
