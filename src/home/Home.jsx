import styled from "styled-components"
import { Link } from "react-router-dom"
import Card from "./Card"
import { useEffect, useState } from "react"
import { getPost } from "../../firebase"

export default function Home() {

  const [posts, setPosts] = useState(new Array());
  useEffect(() => {
    let ignore = false;
    async function get(){
      const response = await getPost();
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
    <PageWrapper>
      <Header>
        <div>
          Logo
        </div>
        <div>
          <button>
            dark
          </button>
          <Link to={'/search'}>
            search
          </Link>
          <Link to={'/write'}>
            새글 작성
          </Link>
        </div>
      </Header>
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
    </PageWrapper>
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

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 5rem;
  font-size: 1.5rem;
  padding-top: 1rem;
`

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