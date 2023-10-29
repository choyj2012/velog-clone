import { addComment, addPosttest, getComments } from "../../firebase";
import { useState } from "react";

const postId = '3tBlAMH5rDaL35HPAsmy';

export default function TestPage() {
  
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const fn1 = () => {
    addPosttest(post);
  }
  
  const fn2 = async () => {
    const comments = await getComments(postId);
    setComments(comments);
  }
  
  const sendComment = async () => {
    addComment(postId, name, value);
    fn2();
  }
  return (
    <div>
      <h1>Test Page</h1>

      <button onClick={fn1}>BTN1</button>
      <button onClick={fn2}>BTN2</button>
      
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <input value={value} onChange={(e) => setValue(e.target.value)}></input>
      <button onClick={sendComment}>Send</button>
      <ul>
        {
          comments.map((item) => {
            return <li key={item._id}>{item.data.name} - {item.data.comment}</li>
          })
        }
      </ul>
    </div>
  );
}




import { Timestamp } from "firebase/firestore";
const post = {
  title: 'title1',
  content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, molestias.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, molestias.`,
  date: Timestamp.fromDate(new Date),
  author: 'aajnf',
  commentsCnt: 1,
  comment: ['asdf'],
  likesCnt: 2,
}