import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Login from "../components/auth/Login.jsx";
import PostIndex from '../components/posts/PostIndex.jsx';
import PostCreate from '../components/posts/PostCreate.jsx';
import PostShow from '../components/posts/PostShow.jsx';
import PostComment from "../components/posts/comments/PostComment.jsx";
import PostCommentCreate from "../components/posts/comments/PostCommentCreate.jsx";
import PostCommentItem from "../components/posts/comments/PostCommentItem.jsx";
import Registration from "../components/users/Registration.jsx";
import UserInfo from "../components/users/UserInfo.jsx";

const router = createBrowserRouter(
  [
    {
      element: <App></App>,
      children: [
        {
          path: '/',
          loader: async () => {
            // 'loader'에 정의한 처리는 라우트 진입 시에 실행 됨
            // 'redirect()'를 이용하여 해당 라우터로 이동
            return redirect('/posts');
          }
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/posts',
          element: <PostIndex />
        },
        {
          path: '/posts/create',
          element: <PostCreate />
        },
        {
          path: '/posts/show',
          element: <PostShow />
        },
        {
          path: '/posts/comments',
          element: <PostComment />
        },
        {
          path: '/posts/comments/create',
          element: <PostCommentCreate />
        },
        {
          path: '/posts/comments/item',
          element: <PostCommentItem />
        },
        {
          path: '/registration',
          element: <Registration />
        },
        {
          path: '/userinfo/:id',
          element: <UserInfo />
        }
      ]
    }
  ]
);

export default function Router() {
  return <RouterProvider router={router} />;
}
