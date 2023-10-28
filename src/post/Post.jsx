import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getPost } from "../../firebase";
import styled from "styled-components";
import Header from "../component/Header";
import MDEditor from "@uiw/react-md-editor"

export default function Post() {
  const param = useParams();
  const [postData, setPostData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

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

  const handleTextAreaHeight = (e) => {
    setComment(e.target.value);
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 'px';
  }
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
              visibleDragbar={false}
              height={'auto'}
            />
            <CommentWrapper>
              <h2>{postData.commentsCnt} Comments</h2>
              <CommentTextArea onChange={handleTextAreaHeight} value={comment}/>
              <AddCommentBtn>댓글 작성</AddCommentBtn>
              
              <div style={{
                height: '3px', backgroundColor: 'black', 
                marginBottom: '1rem', marginTop: '1rem'}}></div>
              <div>
                {postData.comment.map((com) => {
                  return <div>- {com}</div>;
                })}
              </div>
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
  margin-top: 5rem;
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
`

function Loading(){
  return (
    <div>
      Loading...
    </div>
  )
}