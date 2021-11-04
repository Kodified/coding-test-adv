import React from "react";
import { AuthContextProvider } from "./context/AuthContext";
import Main from "./pages/Main";

function App() {
  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  );
}

export default App;
