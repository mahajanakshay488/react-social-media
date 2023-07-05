import {
    Routes,
    Route,
  } from "react-router-dom";
import Login from "../components/forms/Login";
import Signup from "../components/forms/Signup";
import Home from "../components/pages/Home";
import New from "../components/pages/New";
import Allblogs from "../components/pages/Allblogs";
import PostDetails from "../components/posts/PostDetails";
import UserProfile from "../components/pages/UserProfile";
import BlogerProfile from "../components/pages/BlogerProfile";
import ProtectedRoute from "./ProtectedRoute";
import Messenger from "../components/pages/Messenger/Messenger";
import ChatBox from "../components/pages/Messenger/ChatBox";
  
function Routers() {
    return ( 
        <Routes>
            <Route
                path="/"
                element={<Home/>}
            />
    
            <Route
                path="/all-blogs"
                element={<Allblogs />}
            />

            <Route
                path="/all-blogs/:id"
                element={<PostDetails/>}
            />

            <Route
                path="/messenger"
                element={<Messenger />}
            >
                <Route
                    path=":another/:chatid"
                    element={<ChatBox/>}
                />  
            </Route>

            <Route
                path="/signup"
                element={<Signup/>}
            />

            <Route
                path="/login"
                element={<Login/>}
            />

            <Route
                path="/user-profile"
                element={
                    <ProtectedRoute>
                        <UserProfile/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/bloger-profile/:username"
                element={<BlogerProfile/>}
            />

            <Route
                path="/new"
                element={<New/>}
            />
        </Routes>
     );
}

export default Routers;