import React from "react";
import "./assets/css/App.css";
import Login from "./pages/Login";
import HotkeyProvider from "./components/contexts/HotkeyContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableDemo from "./components/TableDemo";
import Home from "./components/Home";
import Charts from "./components/Charts";

function App() {
  return (
    <>
      <HotkeyProvider>
        <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/data-table" element={<TableDemo />} />
              <Route path="/charts" element={<Charts />} />
          </Routes>
        </Router>
      </HotkeyProvider>
    </>
  );
}

export default App;
