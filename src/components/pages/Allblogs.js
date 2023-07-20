import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { chatActions, postActions, userActions } from "../../store";
import PostListing from "../posts/PostListing";
import socket from "../../services/socket";


function Allblogs() {
    const dispatch = useDispatch();
    const actions = bindActionCreators(postActions, dispatch);
    const chatactions = bindActionCreators(chatActions, dispatch);
    const posts = useSelector(state => state.posts);

    useEffect(()=>{
        actions.fetchPosts()
        .then(res=>{})
        .catch(err =>{
            console.log('fetchPost Err', err);
        })
        socket.on('getUsers', users=>{
            console.log('users', users);
            chatactions.setLoginUsers(users);
        })
    },[])

    return ( 
        <Box height={'100%'} width='100%' >
            <PostListing posts={posts.posts} heading='All Blogs' />
        </Box>
     );
}

export default Allblogs;