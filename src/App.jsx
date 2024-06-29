import React from "react";
import "./assets/css/App.css";
import Login from "./pages/Login";
import HotkeyProvider from "./components/contexts/HotkeyContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TableDemo from "./components/TableDemo";
import Home from "./components/Home";
import Charts from "./components/Charts";
import CustomerTable from "./components/CustomerList";
import CustomerForm from "./components/CustomerForm";
import WorkspaceList from "./components/WorkspaceList";
import WorkspaceForm from "./components/WorkspaceForm";
import BookingList from "./components/BookingList";
import BookingForm from "./components/BookingForm";
import Header from "./components/Header.jsx";
import WorkSpacePage from "./pages/WorkSpacePage.jsx";

function App() {
  return (
    <Router>
      <HotkeyProvider>
        <Main />
      </HotkeyProvider>
    </Router>
  );
}

function Main() {
  const isAuthUser = localStorage?.getItem("access_token");
  return (
    <>
      {location?.pathname !== "/login" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route
              path="/"
              element={isAuthUser ? <Home /> : <Navigate to={"/login"} />}
            /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path='/data-table' element={<TableDemo />} /> */}
        <Route path="/customers" element={<CustomerTable />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/booking/:id" element={<BookingForm />} />
        <Route path="/workspaces" element={<WorkspaceList />} />
        <Route path="/workspace/:id" element={<WorkspaceForm />} />
        <Route path="/customer/:id" element={<CustomerForm />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/workspace-page" element={<WorkSpacePage />} />
      </Routes>
    </>
  );
}

export default App;
