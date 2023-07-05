import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { postActions } from "../../store";
import PostListing from "../posts/PostListing";


function Allblogs() {
    const dispatch = useDispatch();
    const actions = bindActionCreators(postActions, dispatch);
    const posts = useSelector(state => state.posts);

    useEffect(()=>{
        actions.fetchPosts()
        .then(res=>{})
        .catch(err =>{
            console.log('fetchPost Err', err);
        })
    },[])

    return ( 
        <Box height={'100%'} width='100%' >
            <PostListing posts={posts.posts} heading='All Blogs' />
        </Box>
     );
}

export default Allblogs;