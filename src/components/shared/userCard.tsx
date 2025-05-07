import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { getFileView } from "../../lib/appwrite/api";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="user-card">

                  { user.imageId ?
                <img
                 src={ getFileView(user.imageId ) || '/assets/icons/profile-placeHolder.svg'}
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                   />
                : 
                <img
                 src={ user.imageUrl || '/assets/icons/profile-placeHolder.svg'}
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                   />

            }
      

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;