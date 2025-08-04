

import Registration from "./Pages/registration";
import Otp from "./Pages/otp";
import Login from "./Pages/login"; 

import { Route, Routes } from "react-router-dom";
import UserProvider from "./Context/UserContext";
import ProtectedRoute from "./Routes/protectedRoute";




import Unauthorized from "./Pages/Unauthorized";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import Upload from "./Pages/Upload";
import Files from "./Pages/Files";
import Details from "./Pages/Details";
import Card from "./Pages/Card";
import CreateAppointment from "./Pages/CreateAppointment";







function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        
        <Route path="/registration" element={<Registration />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home/>}/>
        
           <Route
          path="/upload"
          element={
            <ProtectedRoute role={["user"]}>
              <Upload/>
            </ProtectedRoute>
          }
        />


         <Route
          path="/documents"
          element={
            <ProtectedRoute role={["user"]}>
              <Files/>
            </ProtectedRoute>
          }
        />


          <Route
          path="/details/:id"
          element={
            <ProtectedRoute role={["user"]}>
              <Details/>
            </ProtectedRoute>
          }
        />
     

       <Route
          path="/card"
          element={
            <ProtectedRoute role={["user"]}>
              <Card/>
            </ProtectedRoute>
          }
        />


        <Route
          path="/appointment"
          element={
            <ProtectedRoute role={["user"]}>
             <CreateAppointment/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
