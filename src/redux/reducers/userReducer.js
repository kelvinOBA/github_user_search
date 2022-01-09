import {
    SAVE_ALL_USERS,
    SAVE_USER,
    START_LOADER,
    STOP_LOADER,
    SAVE_SEARCH,
    SAVE_SEARCH_COUNT,
    START_DETAIL_LOADER,
    STOP_DETAIL_LOADER,
    EMPTY_USER_OBJECT


  } from "../types/userTypes";
  
  const initialState = {
   
    allUsers: null,
    user: null,
    loader:false,
    searchValue:'',
    totalSearchCount:0,
    detailLoader:false,
    
 
  };
  
  const userReducer = function (state = initialState, action) {
    switch (action.type) {
      case SAVE_ALL_USERS:
        return { ...state, allUsers: action.payload };
        case SAVE_USER:
            return { ...state, user: action.payload };
        case EMPTY_USER_OBJECT:
            return { ...state, user: action.payload };
        case SAVE_SEARCH:
            return { ...state, searchValue: action.payload };
        case SAVE_SEARCH_COUNT:
            return { ...state, totalSearchCount: action.payload };
      case START_LOADER:
        return { ...state, loader: true };
      case STOP_LOADER:
        return { ...state, loader: false };
    
   
      
      default:
        return state;
    }
  };
  
  export default userReducer;