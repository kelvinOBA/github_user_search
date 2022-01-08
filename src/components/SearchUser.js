import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { saveSearch, getAllUsers } from "../redux/actions/user";

export default function SearchFilter() {
  const dispatch = useDispatch();
  const totalSearchCount = useSelector(
    (state) => state.userReducer.totalSearchCount
  );

  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (userName) {
      let query = {
        page: 1,
        q: userName,
        per_page: 10,
      };
      const timeoutId = setTimeout(() => dispatch(getAllUsers(query)), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [userName]);

  const getSearch = (value) => {
    setUserName(value);
    dispatch(saveSearch(value));
  };

  return (
    <div>
      <h2>GITHUB USER SEARCH</h2>
      <TextField
        fullWidth
        label="Search user"
        onChange={(e) => getSearch(e.target.value)}
        id="fullWidth"
      />
      <p>Total result : {totalSearchCount}</p>
    </div>
  );
}
