import { Suspense } from "react"
import { useParams } from "react-router"
import { getPost, deletePost } from "../../firebase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../component/Header";
import MDEditor from "@uiw/react-md-editor"
import { useQuery } from "react-query";
import Comments from "./Comments";

export default function Post() {
  
  const param = useParams();
  const postId = param._id;

  return (
    <>
      <Header />
      <PostWrapper>
        <Suspense fallback={<h2>Loading...</h2>}>
          <PostContent postId={postId} />
        </Suspense>

        <Suspense fallback={<h2>Loading...</h2>}>
          <Comments postId={postId} />
        </Suspense>
      </PostWrapper>
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

const PostContent = ({postId}) => {

  const navigate = useNavigate();
  const { data: postData, isLoading: isPostLoading } = useQuery(
    ["load-post", postId],
    () => getPost(postId),
    {
      suspense: true,
      refetchOnWindowFocus: false,
      staleTime: 1000*20,
    }
  );

  return (
    <>
      <button
        onClick={async () => {
          await deletePost(postId);
          navigate("/");
        }}
      >
        delete this post
      </button>
      <h1>{postData.title}</h1>
      <MDEditor
        value={postData.content}
        preview="preview"
        hideToolbar={true}
        visibleDragbar={false}
        height={"auto"}
      />

      <div
        style={{
          height: "3px",
          backgroundColor: "black",
          marginBottom: "1rem",
          marginTop: "6rem",
        }}
      />
    </>
  );
}