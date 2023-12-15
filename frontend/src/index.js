import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
    </QueryClientProvider>
  /* </React.StrictMode> */
);
