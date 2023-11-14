import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./home/Home";
import Search from "./search/Search";
import Write from "./write/Write";
import Post from "./post/Post";

import styled from "styled-components";
import TestPage from "./test/TestPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"
import GlobalStyle from "./globalStyle";
import { useEffect, useLayoutEffect } from "react";
import AuthContext from "./context/AuthContext";
const queryClient = new QueryClient();

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

const isUserColorScheme = localStorage.getItem('color-scheme');
const isOsColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const getColorScheme = () => (isUserColorScheme ? isUserColorScheme : isOsColorScheme);

const useColorScheme = () => {
  useLayoutEffect(() => {
    console.log(isUserColorScheme, isOsColorScheme, getColorScheme());
    if (getColorScheme() === "dark") {
      localStorage.setItem("color-scheme", "dark");
      document.documentElement.setAttribute("data-color-mode", "dark");
    } else {
      localStorage.setItem("color-scheme", "light");
      document.documentElement.setAttribute("data-color-mode", "light");
    }
  }, []);
}
function App() {

  useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <PageWrapper>
        <AuthContext>
          <RouterProvider router={router}/>
        </AuthContext>
      </PageWrapper>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}

const PageWrapper = styled.div`
  margin: auto;
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