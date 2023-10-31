import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getPost, deletePost, getComments, addComment } from "../../firebase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../component/Header";
import MDEditor from "@uiw/react-md-editor"
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "react-query";

export default function Post() {
  const param = useParams();
  const postId = param._id;
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');

  const navigate = useNavigate();
  const { data: postData, isLoading: isPostLoading } = useQuery(
    ["load-post", postId],
    () => getPost(postId),
    {
      staleTime: 3600 * 1000,
    }
  );

  const {data: comments, isLoading: isCommentsLoading } = useQuery(
    ["load-comments", postId],
    () => getComments(postId),
  )

  const handleTextAreaHeight = (e) => {
    setComment(e.target.value);
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  const handleAddComment = async () => {
    mutate({postId: postId, name: 'name', comment: comment});
    setComment('');
  }

  const {mutate} = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('load-comments');
    }
  });
  return (
    <>
      <Header />
      {isPostLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <button
              onClick={() => {
                deletePost(postId);
                navigate("/");
              }}
            >
              delete this post
            </button>
          </div>

          <PostWrapper>
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
            ></div>

            <CommentWrapper>
              {isCommentsLoading ? (
                <h2>Loading...</h2>
              ) : (
                <>
                  <h2>{comments.length} Comments</h2>
                  <CommentTextArea
                    onChange={handleTextAreaHeight}
                    value={comment}
                  />
                  <AddCommentBtn onClick={handleAddComment}>
                    댓글 작성
                  </AddCommentBtn>

                  <div>
                    <ul>
                      {comments.map((item) => {
                        return (
                          <li key={item._id}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p>
                                {item.name} - {item.comment}
                              </p>
                              <p>
                                {new Date(
                                  item.date.seconds * 1000
                                ).toLocaleString("ko-KR")}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              )}
            </CommentWrapper>
          </PostWrapper>
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

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`
const CommentTextArea = styled.textarea`
  resize: none;
  font-size: 1rem;
  line-height: 1.75;
  border-radius: 4px;
  padding: 1rem;
`

const AddCommentBtn = styled.button`
  font-size: 1rem;
  align-self: flex-end;
  width: 100px;
  margin-top: 1rem;
  padding: 5px;
`;

function Loading(){
  return (
    <div>
      Loading...
    </div>
  )
}