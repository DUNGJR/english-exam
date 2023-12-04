export default (posts = [], action) => {
    switch (action.type) {
      case "DELETE_USER":
        return posts.filter((post) => post._id !== action.payload);
      case "UPDATE_USER":
      return posts.map((post) => post._id === action.payload._id ? action.payload : post);
      case "FETCH_ALL_USER":
        return action.payload;
      case "CREATE_USER":
        return [...posts, action.payload];
      default:
        return posts;
    }
  };
  