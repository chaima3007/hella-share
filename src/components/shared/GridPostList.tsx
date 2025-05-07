import { Models } from "appwrite";
import { useUserContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { getFileView } from "../../lib/appwrite/api";
import PostStats from "./PostStats";


type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
}

const GridPostList = ({posts, showUser = true, showStats = true}:GridPostListProps) => {
  const {user } = useUserContext()
  return (
    <ul className="grid-container">
     {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80" >
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
          <img src={getFileView(post.imageId)} alt="post" className="h-full w-full object-cover" />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">

                { post?.creator?.imageId ?
                    <img
                    src={ getFileView(post?.creator?.imageId ) || '/assets/icons/profile-placeHolder.svg'}
                      alt="creator"
                      className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                      />
                    : 
                    <img
                    src={ post?.creator?.imageUrl || '/assets/icons/profile-placeHolder.svg'}
                      alt="creator"
                      className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                      />

                }
                  <p className="line-clamp-1">{post.creator.name}</p>

              </div>
              )}
            {showStats && (
              <PostStats post={post} userId={user.id} />
            )}

          </div>
        
        </li>))}

    </ul>
  )
}

export default GridPostList