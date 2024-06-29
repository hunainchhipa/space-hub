import React from "react";
import "./assets/css/App.css";
import Login from "./pages/Login";
import HotkeyProvider from "./components/contexts/HotkeyContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableDemo from "./components/TableDemo";

function App() {
  return (
    <>
      <HotkeyProvider>
        <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/data-table" element={<TableDemo />} />
          </Routes>
        </Router>
      </HotkeyProvider>
    </>
  );
}

export default App;
