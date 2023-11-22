import { useState, useEffect } from "react";
import MDEditor, {commands} from "@uiw/react-md-editor";
import { addPost, createPostObject, getPost, updatePost } from "../../firebase";
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQueryClient } from "react-query";

const mkdStr = `
# title
![image](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fserver-rendering-with-streaming.png&w=1920&q=75&dpl=dpl_k9JgN7S2Z3LfqB6skeTLi9zU4W6G)
`
export default function Write() {
  const editPost = useLocation().state;
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("untitled");
  const [value, setValue] = useState(mkdStr);
  const navigate = useNavigate();
  const {isLoggedIn, user} = useContext(AuthContext);
  const queryClient = useQueryClient();
  //로그인 상태인지 확인
  useEffect(() => {
    if(!isLoggedIn) navigate('/');
  }, [])

  useEffect(() => {
    if(editPost?.postData){
      setTitle(editPost.postData.title);
      setValue(editPost.postData.content);
      setIsEdit(true);
    }
  }, []);

  const upload = () => {
    if(isEdit){
      updatePost(editPost.postId, title, value);
      queryClient.invalidateQueries('load-post', editPost.postId);
    }
    else {
      const newPost = new createPostObject(title, value, user.displayName, user.uid);
      addPost(newPost);
    }
    queryClient.resetQueries('load-posts');
    navigate('/');
  }
  
  const goBack = () => {
    navigate('/');
  }
  return (
    <>
      <div
        data-color-mode="auto"
        style={{ height: "100vh" }}
      >
        <ControlBox>
          <TitleBox
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div>
            <ControlBtn onClick={goBack}>{`나가기`}</ControlBtn>
            <ControlBtn onClick={upload}>{`저장`}</ControlBtn>
          </div>
        </ControlBox>

        <MDEditor
          value={value}
          onChange={setValue}
          height={"90%"}
          extraCommands={[
            commands.codeEdit,
            commands.codeLive,
            commands.codePreview,
          ]}
          visibleDragbar={false}
        />
      </div>
    </>
  );
}

const ControlBox = styled.div`
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background0);
`
const TitleBox = styled.input`
  border: none;
  background-color: var(--background0);
  width: 50%;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 2.75rem;
  outline: none;
  caret-color: var(--text);
  color: var(--text);
`

const ControlBtn = styled.span`
  font-size: 1.5rem;
  padding: 10px;
  border-radius: 10%;
  margin-right: 10px;
  height: fit-content;
  color: var(--text);
  
  &:hover {
    background-color: var(--hover-layer);
  }
`