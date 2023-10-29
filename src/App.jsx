import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./home/Home";
import Search from "./search/Search";
import Write from "./write/Write";
import Post from "./post/Post";

import styled from "styled-components";
import TestPage from "./test/TestPage";

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
  },
  {
    path: '/test',
    element: <TestPage/>,
  }
])

function App() {
  return (
    <PageWrapper>
      <RouterProvider router={router}/>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  margin: auto;
  height: 100%;
  width: 1728px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 1919px) {
    width: 1376px;
  };
  @media (max-width: 1440px) {
    width: 1024px;
  };
  @media (max-width: 1056px) {
    width: calc(100% - 2rem);
  };
`
export default App