import styled from "styled-components"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import DarkmodeSvg from '../assets/dark-mode.svg?react';
import LightmodeSvg from '../assets/light-mode.svg?react';
import SearchSvg from '../assets/search-icon.svg?react';
import DownSvg from '../assets/down.svg?react';
import { useEffect } from "react";


import { getCurrentUser, signInWithGoogle, signOutWithGoogle } from "../../auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {

  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute('data-color-mode') === 'dark');
  }, []);

  const handleLogin = () => {
    signInWithGoogle();
  }
  const handleLogout = () => {
    setIsOpen(p => !p);
    signOutWithGoogle();
  }
  return (
    <HeaderBox>
      <Logo
        onClick={() => {
          navigate("/");
        }}
      >
        PostIt
      </Logo>
      <ControlBox>
        <SvgBtn
          onClick={() => {
            setIsDark((p) => !p);
            if (isDark) {
              document.documentElement.setAttribute("data-color-mode", "light");
              localStorage.setItem("color-scheme", "light");
            } else {
              document.documentElement.setAttribute("data-color-mode", "dark");
              localStorage.setItem("color-scheme", "dark");
            }
          }}
        >
          {isDark ? <LightmodeSvg /> : <DarkmodeSvg />}
        </SvgBtn>

        <Link to={"/search"}>
          <SvgBtn>
            <SearchSvg fill={isDark ? "#FFF" : "#000"} />
          </SvgBtn>
        </Link>

        {isLoggedIn ? (
          <>
            <LinkBtn to={"/write"}>
              <HeaderBtn>새 글 작성</HeaderBtn>
            </LinkBtn>

            <ProfileImg $imgURL={user.photoURL} />
            {/* <HeaderBtn
              onClick={() => {
                console.log(getCurrentUser());
              }}
            >
              MyPage
            </HeaderBtn> */}
            {/* <HeaderBtn onClick={handleLogout}>로그아웃</HeaderBtn> */}
            <SvgBtn onClick={() => setIsOpen(p => !p)}>
              <DownSvg 
                stroke={isDark ? "#FFF" : "#000"}
                transform={isOpen ? 'rotate(180)' : 'rotate(0)'}
              />
            </SvgBtn>
          </>
        ) : (
          <>
            <HeaderBtn onClick={handleLogin}>로그인</HeaderBtn>
          </>
        )}

        <Dropbox $isOpen={isOpen}>
          <div onClick={() => navigate('/write')}>새 글 작성</div>
          <div onClick={handleLogout}>로그아웃</div>
        </Dropbox>
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
  position: relative;
`

const SvgBtn = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    width: 24px;
    height: 24px;
  }
  &:hover {
    background-color: var(--hover-layer);
  }
`
const LinkBtn = styled(Link)`
  @media (max-width: 480px) {
    display: none;
  }
`
const HeaderBtn = styled.div`
  background-color: var(--background0);
  border: 1px solid var(--text);
  border-radius: 30px;
  font-size: inherit;
  padding: 5px 10px;

  &:hover {
    background-color: var(--text);
    color: var(--background0);
  }
`

const ProfileImg = styled.div`
  cursor: pointer;
  min-width: 2.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-size: 100%;
  background-image: ${(props) => `url(${props.$imgURL})`};
  background-repeat: no-repeat;
  object-fit: center;
`

const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 5rem;
  font-size: 1.25rem;
  padding-top: 1rem;

  @media (max-width: 767px) {
    font-size: 1rem;
  };
`

const Dropbox = styled.div`
  position: absolute;
  display: ${(props) => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  width: 12rem;
  right: 0;
  top: 100%;
  background-color: var(--background1);
  margin-top: 1rem;
  z-index: 100;
  & > div {
    border: 1px solid var(--background0);
    text-align: center;
    padding: 15px;
    font-size: 1.25rem;

    &:hover {
      background-color: var(--background3);
    }
  }
`