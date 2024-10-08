import {lazy} from "react";
// import {Navigate} from "react-router-dom";
const Login = lazy(() => import("@/views/Login"));
const Register = lazy(() => import("@/views/Register"))
const Home = lazy(() => import("@/views/Home"));
const About = lazy(() => import("@/views/About"));
const User = lazy(() => import('@/views/User'));
const Manage = lazy(() => import('@/views/Manage'));
const TodoList =  lazy(() => import("@/views/TodoList"));
const Layout = lazy(() => import("@/views/Layout"));
const Clipboard =  lazy(() => import("@/views/Clipboard"));
const Packing = lazy(() => import("@/views/Packing"))
const Barcode = lazy(() => import("@/views/Barcode"));
const Password = lazy(() => import("@/views/Password"))
// const ProtectedRoute = ({element} : {element: JSX.Element}) => {
// 	const isAuthenticated = Boolean(localStorage.getItem('token'))
// 	const tokenExpireTime = localStorage.getItem('token_expire_time')
//
// 	const isTokenExpired = tokenExpireTime ? Date.now() > Number(tokenExpireTime) : true;
//
// 	if(!isAuthenticated || isTokenExpired) {
// 		return <Navigate to={'/login'} replace />
// 	}
// 	return element
// }

const routers = [
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/register',
		element: <Register />
	},
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/clipboard',
				element: <Clipboard />
				// element: <ProtectedRoute element={<Clipboard />} />,
			},
			{
				path: '/packing',
				element: <Packing />
				// element: <ProtectedRoute element={<Packing />} />
			}
		]
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
		path: '/barcode',
		element: <Barcode />
	},
	{
		path: '/password',
		element: <Password />
	}

];


export default routers;
