import { useCallback } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { searchPost } from "../../firebase";
import styled from "styled-components";
import Card from "../home/Card";
import Header from "../component/Header";

let timer = 0;
export default function Search() {
  
  const [text, setText] = useState('');

  const query = useQuery(
    ['search', text],
    async () => await searchPost(text),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10,
    }
  )

  const handleInput = useCallback((e) => {
    if(timer){
      clearTimeout(timer);
    }

    timer = setTimeout(() => setText(e.target.value), 1000);
  });

  return (
    <>
      <Header />
      <SearchInput type="text" onChange={handleInput}></SearchInput>

      <FeedContents>
        {query.isLoading ? (
          <h1>Loading...</h1>
        ) : query.data === null || query.data?.docs.length === 0 ? (
          <h1>No result</h1>
        ) : (
          query.data?.docs.map((doc) => {
            return <Card key={doc.id} postId={doc.id} post={doc.data()}></Card>;
          })
        )}
      </FeedContents>
    </>
  );
}

const SearchInput = styled.input`
  width: 50%;
  font-size: 3rem;
  color: var(--text);
  display: block;
  margin: auto;
  border: 3px solid var(--text);
  background-color: var(--hover-layer);
  border-radius: 10px;
  margin-top: 2rem;
  margin-bottom: 5rem;
`
const FeedContents = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  margin: -1rem;
  margin-top: 1rem;
`