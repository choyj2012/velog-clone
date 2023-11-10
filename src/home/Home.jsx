import styled from "styled-components"
import { Link } from "react-router-dom"
import Card from "./Card"
import Header from "../component/Header"
import { Suspense, useEffect, useState } from "react"
import { getAllPost, getAllPostbyParam } from "../../firebase"
import { useInfiniteQuery, useQuery } from "react-query"
import { useInView } from "react-intersection-observer"
import { Fragment } from "react"
import FeedController from "./FeedController"

export default function Home() {

  return (
    <>
      <Header />
      <MainFeed>
        <FeedHeader>
          <FeedController/>
        </FeedHeader>

        <Suspense fallback={<h2>Loading...</h2>}>
          <Feed />
        </Suspense>
      </MainFeed>
    </>
  );
}

const Feed = () => {

  const {ref, inView} = useInView();
  // const {data: posts, isLoading: isPostsLoading } = useQuery(
  //   ["load-posts"],
  //   () => getAllPost(),
  //   {
  //     refetchOnWindowFocus: false,
  //     suspense: true,
  //   }
  // )

  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["load-posts"],
    async ({ pageParam }) => getAllPostbyParam({ pageParam }),
    {
      getNextPageParam: (querySnapshot) => {
        if (querySnapshot.size < 20) return undefined;
        else return querySnapshot.docs[querySnapshot.docs.length - 1];
      },
      suspense: true,
      refetchOnWindowFocus: false,
      staleTime: 1000*20,
    }
  );

  
  useEffect(() => {
    if(inView) fetchNextPage()
  },[fetchNextPage, inView]);

  return (
    <Fragment>
      <FeedContents>
        {/* {posts?.map((v) => {
        return (
          <Card key={v._id} imgUrl={"https://placehold.co/600x400"} post={v} />
        );
      })} */}

        {posts.pages.map((querySnapshot) => {
          return querySnapshot.docs.map((postData) => {
            return (
              <Card
                key={postData.id}
                imgUrl={"https://picsum.photos/id/28/600/400"}
                postId={postData.id}
                post={postData.data()}
              />
            );
          });
        })}
        <Observer ref={ref}>
          {/* {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer"
            : "Nothing more to load"} */}
        </Observer>
      </FeedContents>
    </Fragment>
  );
}


const MainFeed = styled.div`
  
`

const FeedHeader = styled.div`
  display: flex;
`

const FeedContents = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  margin: -1rem;
  margin-top: 1rem;
`

const Observer = styled.div`
  position: absolute;
  bottom: 30rem;
  left: 50%;
  visibility: hidden;
  border: 1px solid black;
  width: 10px;
  height: 10px;
`