import {
  SAVE_USER,
  SAVE_ALL_USERS,
  STOP_LOADER,
  SAVE_SEARCH,
  START_LOADER,
  SAVE_SEARCH_COUNT,
  START_DETAIL_LOADER,
  STOP_DETAIL_LOADER,
  EMPTY_USER_OBJECT

} from "../types/userTypes";

import http from "../../helpers/http";
import api from "../../helpers/api";
import queryString from "query-string";

export const startLoader = () => (dispatch) => {
    dispatch({ type: START_LOADER });
  };
  export const stopLoader = () => (dispatch) => {
    dispatch({ type: STOP_LOADER });
  };

export const getAllUsers = (queries) => (dispatch) => {
  const query = queryString.stringify(queries);
  dispatch({ type: START_LOADER });

  http
    .get(api.users + "?" + `${query}`)
    .then((res) => {
      dispatch({ type: SAVE_ALL_USERS, payload: res.data.items });
      dispatch({ type: SAVE_SEARCH_COUNT, payload: res.data.total_count });

      dispatch({ type: STOP_LOADER });
    })

    .catch((e) => {
      dispatch({ type: STOP_LOADER });
    });
};
export const getUserDetail = (url) => (dispatch) => {
  dispatch({ type: START_DETAIL_LOADER });
  dispatch({ type: EMPTY_USER_OBJECT, payload:{}  });

  http
    .get(url)
    .then((res) => {
      dispatch({ type: SAVE_USER, payload: res.data });

      dispatch({ type: STOP_DETAIL_LOADER });
    })

    .catch((e) => {
      dispatch({ type: STOP_DETAIL_LOADER });
    });
};

export const saveSearch = (value) => (dispatch) => {
  dispatch({ type: SAVE_SEARCH, payload: value });
};

