import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { RootPage } from "RootPage";
import { Provider } from "react-redux";
import { store } from "platform/store";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>
          <RootPage />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
