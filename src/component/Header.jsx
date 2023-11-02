import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function Header() {

  const navigate = useNavigate();
  return (
    <HeaderBox>
      <Logo
        onClick={() => {
          navigate("/");
        }}
      >
        MyBlog
      </Logo>
      <ControlBox>
        <SVGBtn>
          <img src="src\assets\dark-mode.svg" alt="" />
        </SVGBtn>

        <Link to={"/search"}>
          <SVGBtn>
            <img src="src\assets\search-icon.svg" alt=""></img>
          </SVGBtn>
        </Link>

        <Link to={"/write"}>새 글 작성</Link>
      </ControlBox>
    </HeaderBox>
  );
}

const Logo = styled.div`
  cursor: pointer;
  font-weight: bold;
  font-size: 2rem;
`

const ControlBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 3rem;
  gap: 8px;
`

const SVGBtn = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 24px;
    height: 24px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`
const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 5rem;
  font-size: 1.5rem;
  padding-top: 1rem;
`