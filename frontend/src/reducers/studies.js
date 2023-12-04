export default (posts = [], action) => {
    switch (action.type) {
      case "DELETE_STUDY":
        return posts.filter((post) => post._id !== action.payload);
      case "UPDATE_STUDY":
      return posts.map((post) => post._id === action.payload._id ? action.payload : post);
      case "FETCH_ALL_STUDY":
        return action.payload;
      case "CREATE_STUDY":
        return [...posts, action.payload];
      default:
        return posts;
    }
  };
  