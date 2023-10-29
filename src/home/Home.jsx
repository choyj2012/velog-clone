import styled from "styled-components"
import { Link } from "react-router-dom"
import Card from "./Card"
import Header from "../component/Header"
import { useEffect, useState } from "react"
import { getAllPost } from "../../firebase"

export default function Home() {

  const [posts, setPosts] = useState(new Array());
  useEffect(() => {
    let ignore = false;
    async function get(){
      const response = await getAllPost();
      if(!ignore){
        setPosts(response);
      }
    }

    get();

    return () => {
      ignore = true;
    }
  }, [])
  
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
        <FeedContents>
          {/* {Array(5).fill().map((v, i) => <Card key={i} imgUrl={'https://placehold.co/600x400'}/>)} */}
          {posts.map((v) => {
            return <Card key={v._id} imgUrl={'https://placehold.co/600x400'} post={v}/>
          })}
        </FeedContents>
      </MainFeed>
    </>
  )
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