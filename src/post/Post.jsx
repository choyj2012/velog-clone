import { Suspense, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { deletePost, getPost } from "../../firebase";
import styled from "styled-components";
import Header from "../component/Header";
import MDEditor from "@uiw/react-md-editor"

export default function Post() {
  const param = useParams();
  const [postData, setPostData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      const response = await getPost(param._id);
      if(!ignore){
        setPostData(response)
        setIsLoading(false);
      }
    }

    fetchData();
    return () => {
      ignore = true;
    }
  }, [])
  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* <div>
            <button
              onClick={() => {
                deletePost(param._id);
                navigate("/");
              }}
            >
              delete this post
            </button>
          </div> */}

          <PostWrapper>
            <h1>{postData.title}</h1>
            <MDEditor
              value={postData.content}
              preview="preview"
              hideToolbar={true}
            />
          </PostWrapper>
          {/* <PostContent postData={postData} /> */}
        </>
      )}
    </>
  );
}

const PostWrapper = styled.div`
  width: 768px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px){
    width: 100%;
  }
`
function Loading(){
  return (
    <div>
      Loading...
    </div>
  )
}