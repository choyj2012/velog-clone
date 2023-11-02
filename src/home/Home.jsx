import styled from "styled-components"
import { Link } from "react-router-dom"
import Card from "./Card"
import Header from "../component/Header"
import { Suspense, useEffect, useState } from "react"
import { getAllPost } from "../../firebase"
import { useQuery } from "react-query"

export default function Home() {

  return (
    <>
      <Header />
      <MainFeed>
        <FeedHeader>
          <div>
            <Link>트렌딩</Link>
            <Link>최신</Link>
          </div>
        </FeedHeader>

        <Suspense fallback={<h2>Loading...</h2>}>
          <Feed />
        </Suspense>
      </MainFeed>
    </>
  );
}

const Feed = () => {

  const {data: posts, isLoading: isPostsLoading } = useQuery(
    ["load-posts"],
    () => getAllPost(),
    {
      refetchOnWindowFocus: false,
      suspense: true,
    }
  )

  return (
    <FeedContents>
      {posts?.map((v) => {
        return (
          <Card key={v._id} imgUrl={"https://placehold.co/600x400"} post={v} />
        );
      })}
    </FeedContents>
  );
}


const MainFeed = styled.div`
  
`

const FeedHeader = styled.div`
  display: flex;
`

const FeedContents = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: -1rem;
  margin-top: 2rem;
`