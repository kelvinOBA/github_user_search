import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { getAllUsers, getUserDetail } from "../redux/actions/user";
import CircularProgress from "@mui/material/CircularProgress";
import SearchUser from "./SearchUser";

const UserCard = () => {
  const dispatch = useDispatch();
  const [page, setMyPage] = useState(1);
  const [userId, setUserId] = useState("");
  const loader = useSelector((state) => state.userReducer.loader);
  const detailLoader = useSelector((state) => state.userReducer.detailLoader);
  const users = useSelector((state) => state.userReducer.allUsers);
  const userDetails = useSelector((state) => state.userReducer.user);
  const searchValue = useSelector((state) => state.userReducer.searchValue);
  const totalSearchCount = useSelector(
    (state) => state.userReducer.totalSearchCount
  );


useEffect(()=>{
    setMyPage(1)

},[searchValue])

  const getUserDetails = (url, id) => {
    dispatch(getUserDetail(url));
    setUserId(id);
  };
  const setPage = (e, p) => {
    setMyPage(p);
    let query = {
      page: p,
      q: searchValue,
      per_page: 10,
    };
    dispatch(getAllUsers(query));
    window.scrollTo(0,0)
  };

  return (
    <div className="user-card-parent">
      <SearchUser />

      {loader ? (
        <div className="progress-div">
          <CircularProgress />
        </div>
      ) : (
        <>
          {!users ? (
            <p>No results found</p>
          ) : (
            <div>
              {users?.map((user) => (
                <div
                  className={`${userId === user.id ? "card-active" : ""} card`}
                  key={user.id}
                >
                  <div className="card-content">
                    <div className="card-content_avatar">
                      <img height="128" width="128" src={user.avatar_url} />
                    </div>
                    <div className="card-content_text">
                      <h3 className="car">{user.login}</h3>
                      <a href={user.html_url} target="_blank">
                        View on github
                      </a>
                      <p onClick={() => getUserDetails(user.url, user.id)}>
                        View details
                      </p>
                      {detailLoader ? null : (
                        <div
                          className={`${
                            userId === user.id ? "user-active" : ""
                          } user-details`}
                        >
                          <p>
                            <b>Bio</b> : {userDetails?.bio}
                          </p>
                          <p>
                            <b>Followers</b> : {userDetails?.followers}
                          </p>
                          <p>
                            <b>Following</b> : {userDetails?.following}
                          </p>
                          <p>
                            <b>Location</b> : {userDetails?.location}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="pagination-div">
                <Pagination
                  page={page}
                  onChange={setPage}
                  count={totalSearchCount}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserCard;
