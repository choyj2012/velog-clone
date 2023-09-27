import { Suspense, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { deletePost, getPost } from "../../firebase";

export default function Post() {
  const param = useParams();
  const [postData, setPostData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      const response = await getPost(param._id);
      if(!ignore){
        setPostData(response)
        setIsLoading(false);
      }
    }

    fetchData();
    return () => {
      ignore = true;
    }
  }, [])
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <button
            onClick={() => {
              deletePost(param._id);
              navigate("/");
            }}
          >
            delete this post
          </button>
          {postData.title}
        </div>
      )}
    </div>
  );
}

function Loading(){
  return (
    <div>
      Loading...
    </div>
  )
}