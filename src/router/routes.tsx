import {lazy} from "react";
import {Navigate} from "react-router-dom";
const Login = lazy(() => import("@/views/Login"))
const Home = lazy(() => import("@/views/Home"))
const About = lazy(() => import("@/views/About"))
const User = lazy(() => import('@/views/User'))
const Manage = lazy(() => import('@/views/Manage'))
const TodoList =  lazy(() => import("@/views/TodoList"))
const Clipboard =  lazy(() => import("@/views/Clipboard"))

const ProtectedRoute = ({element} : {element: JSX.Element}) => {
	const isAuthenticated = Boolean(localStorage.getItem('token'))
	const tokenExpireTime = localStorage.getItem('token_expire_time')

	const isTokenExpired = tokenExpireTime ? Date.now() > Number(tokenExpireTime) : true;

	if(!isAuthenticated || isTokenExpired) {
		return <Navigate to={'/login'} replace />
	}
	return element
}

const routers = [
	{
		path: '/login',
		element: <Login />
	},
	// {
	// 	element: <Home />,
	// 	children: [
	// 		{
	// 			path: '/',
	// 			element: <User />
	// 		},
	// 		{
	// 			path: '/manage',
	// 			element: <Manage />
	// 		}
	// 	]
	// },
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/user',
		element: <User />
	},
	{
		path: '/manage',
		element: <Manage />
	},
	{
		path: '/about',
		element: <About />
	},
	{
		path: '/todolist',
		element: <TodoList />
	},
	{
		path: '/clipboard',
		element: <ProtectedRoute element={<Clipboard />} />,
	}
];


export default routers;
