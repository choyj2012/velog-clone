import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function Header() {

  const navigate = useNavigate();
  return (
    <HeaderBox>
        <Logo onClick={() => {
          navigate('/');
        }}>
          MyBlog
        </Logo>
        <div>
          <button>
            dark
          </button>
          <Link to={'/search'}>
            search
          </Link>
          <Link to={'/write'}>
            새글 작성
          </Link>
        </div>
      </HeaderBox>
  )
}

const Logo = styled.div`
  cursor: pointer;
  font-weight: bold;
  font-size: 2rem;
`

const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 5rem;
  font-size: 1.5rem;
  padding-top: 1rem;
`