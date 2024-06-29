import React from "react";
import "./assets/css/App.css";
import Login from "./pages/Login";
import HotkeyProvider from "./components/contexts/HotkeyContext";

function App() {
  return (
    <>
      <HotkeyProvider>
        <Login />
      </HotkeyProvider>
    </>
  );
}

export default App;
