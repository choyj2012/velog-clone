import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./home/Home";
import Search from "./search/Search";
import Write from "./write/Write";
import Post from "./post/Post";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/search',
    element: <Search/>,
  },
  {
    path: '/write',
    element: <Write/>,
  },
  {
    path: '/post/:_id',
    element: <Post/>,
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App