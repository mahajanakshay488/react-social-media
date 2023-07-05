import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { postActions } from "../../../store";
import PostListing from "../../posts/PostListing";
import Blogers from "./Blogers";

function Rightbar() {

    const dispatch = useDispatch();
    const actions = bindActionCreators(postActions, dispatch);
    const posts = useSelector(state => state.posts);
    

    useEffect(()=>{
        actions.fetchPosts()
        .then(res =>{console.log('fetchPosts', res)})
        .catch(err =>{
            console.log('fetchPosts',err);
        });
    },[])

    return (
        <Box p={2}>
            <Box height={'26vh'} >
                <Blogers/>
            </Box>
            
            <Box pt={3} width={'100%'} height={'52vh'}  >
                <PostListing posts={posts.posts.slice(0,2)} heading='Featured Blogs' rightbar={true} />
            </Box>
        </Box>
    );
}

export default Rightbar;