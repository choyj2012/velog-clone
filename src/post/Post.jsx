import { Suspense } from "react"
import { useParams } from "react-router"
import { getPost, deletePost } from "../../firebase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../component/Header";
import MDEditor from "@uiw/react-md-editor"
import { QueryClient, useQuery, useQueryClient } from "react-query";
import Comments from "./Comments";
import { ErrorBoundary } from "react-error-boundary";

export default function Post() {
  
  const param = useParams();
  const postId = param._id;

  return (
    <>
      <Header />
      <PostWrapper>
        <ErrorBoundary fallback={<h1>page not exist</h1>}>
          <Suspense fallback={<h2>Loading...</h2>}>
            <PostContent postId={postId} />

            <Suspense fallback={<h2>Loading...</h2>}>
              <Comments postId={postId} />
            </Suspense>
          </Suspense>
        </ErrorBoundary>
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

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: postData, isLoading: isPostLoading } = useQuery(
    ["load-post", postId],
    () => getPost(postId),
    {
      suspense: true,
      refetchOnWindowFocus: false,
      staleTime: 1000*20,
      useErrorBoundary: true,
    }
  );

  return (
    <>
      {/* <button
        onClick={async () => {
          await deletePost(postId);
          navigate("/");
        }}
      >
        delete this post
      </button> */}
      <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
        {postData.title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <div>{postData.author}</div>
          <div> | </div>
          <div>
            {new Date(postData.date.seconds * 1000).toLocaleString("ko-KR", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </div>
        </div>
        <div>
          <span>수정</span> |{" "}
          <span
            onClick={async () => {
              await deletePost(postId);
              queryClient.invalidateQueries('load-posts');
              navigate("/");
              queryClient.removeQueries('load-post', postId);
            }}
          >
            삭제
          </span>
        </div>
      </div>

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