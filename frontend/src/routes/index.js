import HomePage from "../pages/homepage/HomePage";
import AdminPage from "../pages/adminpage/AdminPage";
import ExamPage from "../pages/exampage/ExamPage";
import PracticePage from "../pages/practicepage/PracticePage";
import CoursePage from "../pages/coursepage/CoursePage";
import BlogPage from "../pages/blogpage/BlogPage";
import LoginPage from "../pages/loginpage/LoginPage";
import RegisterPage from "../pages/registerpage/RegisterPage";
import ListenExamPage from "../pages/listenexampage/ListenExamPage";
import User from "../pages/user/User";
import EditUser from "../pages/edituser/EditUser";

export const routes = [
    {
        path: '/',
        page: HomePage
    },
    {
        path: '/exam-reading',
        page: ExamPage
    },
    {
        path: '/exam-listen',
        page: ListenExamPage
    },
    
    {
        path: '/course',
        page: CoursePage
    },
    {
        path: '/practice',
        page: PracticePage
    },
    {
        path: '/blog',
        page: BlogPage
    },
    {
        path: '/login',
        page: LoginPage
    },
    {
        path: '/register',
        page: RegisterPage
    },
    {
        path: '/user',
        page: User
    },
    {
        path: '/edituser',
        page: EditUser
    },
    {
        path: '/admin',
        page: AdminPage
    }
]
