import { useState, useEffect } from "react";
import MDEditor, {commands} from "@uiw/react-md-editor";
import { addPost, createPostObject } from "../../firebase";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'
import Header from "../component/Header";
const mkdStr = `
# title
![image](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fserver-rendering-with-streaming.png&w=1920&q=75&dpl=dpl_k9JgN7S2Z3LfqB6skeTLi9zU4W6G)
`
export default function Write() {
  const [title, setTitle] = useState("untitled");
  const [value, setValue] = useState(mkdStr);
  const navigate = useNavigate();

  const upload = () => {
    const newPost = new createPostObject(title, value, 'Eense');
    addPost(newPost);
    navigate('/');
  }
  
  const goBack = () => {
    navigate('/');
  }
  return (
    <>
      <Header />
      <div
        data-color-mode="auto"
        style={{ height: "100%", overflow: "hidden" }}
      >
        <ControlBox>
          <TitleBox
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              console.log(e.target.value);
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
  background-color: black;
`
const TitleBox = styled.input`
  border: none;
  background-color: black;
  width: 50%;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 2.75rem;
  outline: none;
  caret-color: white;
  color: white;
`

const ControlBtn = styled.span`
  font-size: 1.5rem;
  padding: 10px;
  border-radius: 10%;
  margin-right: 10px;
  height: fit-content;
  color: white;
  
  &:hover {
    background-color: #373737;
  }
`