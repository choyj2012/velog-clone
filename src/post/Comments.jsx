import { useQuery, useQueryClient, useMutation } from "react-query";
import { useContext, useRef, useState } from "react";
import styled from "styled-components";

import { getComments, addComment, deleteComment } from "../../firebase";
import { AuthContext } from "../context/AuthContext";

const Comments = ({postId}) => {

  const queryClient = useQueryClient();
  const {isLoggedIn, user} = useContext(AuthContext);
  const [comment, setComment] = useState(isLoggedIn ? '' : '로그인 필요');
  const textAreaRef = useRef(null);

  const {data: comments, isLoading: isCommentsLoading } = useQuery(
    ["load-comments", postId],
    () => getComments(postId),
    {
      suspense: true,
      refetchOnWindowFocus: false,
      staleTime: 1000*20,
    }
  )

  const {mutate} = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('load-comments');
    }
  });

  const {mutate: mutate2} = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('load-comments');
    }
  })

  const handleTextAreaHeight = (e) => {
    setComment(e.target.value);
    textAreaRef.current.style.height = '0px';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }

  const handleAddComment = async () => {
    if(comment.trim() === '') return;
    
    mutate({postId: postId, name: user.displayName, comment: comment, uid: user.uid});
    setComment('');
    textAreaRef.current.style.height = '4rem';
  }

  const handleDeleteComment = (commentId) => {
    mutate2({postId: postId, commentId: commentId});
  }
  return (
    <CommentWrapper>
      <h2>{comments.length} Comments</h2>
      <CommentTextArea onChange={handleTextAreaHeight} value={comment} disabled={!isLoggedIn} ref={textAreaRef}/>
      <AddCommentBtn onClick={handleAddComment} disabled={!isLoggedIn}>댓글 작성</AddCommentBtn>

      {comments.map((comment) => {
        return (
          <Comment key={comment._id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>{comment.name}</div>
              <div>
                {new Date(comment.date.seconds * 1000).toLocaleString("ko-KR")}
                {comment.uid === user.uid && <span onClick={() => handleDeleteComment(comment._id)}>{" 삭제"}</span>}
              </div>
            </div>
            <div style={{lineHeight: '2'}}>- {comment.comment}</div>
          </Comment>
        );
      })}
    </CommentWrapper>
  );
}

export default Comments;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 10rem;
`
const CommentTextArea = styled.textarea`
  resize: none;
  font-size: 1rem;
  line-height: 1.75;
  border-radius: 4px;
  padding: 1rem;
  background-color: var(--background3);
  color: var(--text);
`

const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 30px;
`
const AddCommentBtn = styled.button`
  font-size: 1rem;
  align-self: flex-end;
  width: 100px;
  margin-top: 1rem;
  padding: 5px;
`;