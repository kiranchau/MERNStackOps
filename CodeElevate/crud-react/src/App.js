import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import PostUser from "./components/postUser/PostUser";
import UpdateUser from "./components/updateUser/UpdateUser";
import NoMatch from "./components/nomatch/NoMatch";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<PostUser />} />
        <Route path="/user/:id" element={<UpdateUser />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
