import { useQuery, useQueryClient, useMutation } from "react-query";
import { useState } from "react";
import styled from "styled-components";

import { getComments, addComment } from "../../firebase";
const Comments = ({postId}) => {

  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');

  const {data: comments, isLoading: isCommentsLoading } = useQuery(
    ["load-comments", postId],
    () => getComments(postId),
    {
      suspense: true,
    }
  )

  const {mutate} = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('load-comments');
    }
  });

  const handleTextAreaHeight = (e) => {
    setComment(e.target.value);
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  const handleAddComment = async () => {
    mutate({postId: postId, name: 'name', comment: comment});
    setComment('');
  }
  return (
    <CommentWrapper>
      <h2>{comments.length} Comments</h2>
      <CommentTextArea onChange={handleTextAreaHeight} value={comment} />
      <AddCommentBtn onClick={handleAddComment}>댓글 작성</AddCommentBtn>

      {comments.map((item) => {
        return (
          <div
            key={item._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>
              {item.name} - {item.comment}
            </p>
            <p>{new Date(item.date.seconds * 1000).toLocaleString("ko-KR")}</p>
          </div>
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

const AddCommentBtn = styled.button`
  font-size: 1rem;
  align-self: flex-end;
  width: 100px;
  margin-top: 1rem;
  padding: 5px;
`;