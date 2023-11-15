import { useContext, useState } from "react";
import styled from "styled-components";
import { FeedSortContext } from "../context/FeedSortContext";

export default function FeedController() {

  const {_, setSortBy} = useContext(FeedSortContext);
  const [isSelected, setIsSelected] = useState(0);
  const btnText = ['최신 순', '제목 순'];
  const sort = ['date', 'title'];

  return (
    <FeedControlbox>
      {btnText
        .map((text, i) => {
          return (
            <FeedControlBtn
              key={i}
              handleClick={() => {
                setIsSelected(i);
                setSortBy(sort[i]);
              }}
              isSelected={isSelected === i}
              text={text}
            />
          );
        })}
      {/* <Link>최신</Link>
            <Link>트렌딩</Link> */}
    </FeedControlbox>
  );
}

//-------------------------------------
const FeedControlBtn = ({handleClick, isSelected, text}) => {

  return (
    <ControlBtn onClick={handleClick}>
      {text}
      <SelectedMark $isSelected={isSelected}/>
    </ControlBtn>
  )
}

const FeedControlbox= styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
`

const ControlBtn = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding-bottom: 3px;
  width: 4.5rem;
  height: 3rem;
  background-color: var(--background0);
  cursor: pointer;
`
const SelectedMark = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 3px;
  background-color: ${props => props.$isSelected ? 'var(--text)' : 'var(--background0)'};
`
//-------------------------------------