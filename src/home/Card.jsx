import styled from "styled-components"
import { Link } from "react-router-dom"
import { Timestamp } from "firebase/firestore";

const Card = ({imgUrl, postId, post}) => {

  const title = post.title;
  const summary = post.content;
  const author = post.author;
  const date = post.date.toDate();
  const commentsCnt = post.commentsCnt;

  return (
    <CardWrapper>
      <Link to={`/post/${postId}`}>
        <CardContent>
          {/* {imgUrl && 
          <ImgWrapper>
            <Img src={imgUrl}>
            </Img>
          </ImgWrapper>} */}
          <ContentShortCut>
            <h4>{title}</h4>
            <p>{summary}</p>
            <SubInfo>
              <span>{date.toLocaleString('ko-KR', {year: 'numeric', month: 'long', day: 'numeric'})}</span>
              <span>{' / '}</span>
              <span>{`${commentsCnt} Comments`}</span>
            </SubInfo>
          </ContentShortCut>
          <ContentInfo>
            <ContentAuthor>
              {author}
            </ContentAuthor>
            <Likes>
              
            </Likes>
          </ContentInfo>
        </CardContent>
      </Link>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  width: 20rem;
  margin: 1rem;
  @media (max-width: 1056px){
    width: calc(50% - 2rem);
  }
  @media (max-width: 767px){
    width: 100%;
  }
`

const CardContent = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  background-color: var(--background2);
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  &:hover {
    transform: translateY(-1rem);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 12px 20px 0px;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  padding-top: 52.19%;
`

const Img = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 4px 4px 0px 0px;
  object-fit: cover;
`

const ContentShortCut = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  flex: 1 1 0%;

  /* title */
  & > h4 {
    font-size: 1.5rem;
    margin: 0px 0px 0.75rem;
    text-overflow: ellipsis;
  }

  & > p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    font-size: 0.875rem;
    height: 4rem;
    word-break: break-word;
    line-height: 1.5;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0px 0px 1.5rem;
  }
`

const SubInfo = styled.div`
  font-size: 0.75rem;
`

const ContentInfo = styled.div`
  padding: 0.625rem 1rem;
  display: flex;
`
const ContentAuthor = styled.div`
  
`
const Likes = styled.div`
  
`
export default Card