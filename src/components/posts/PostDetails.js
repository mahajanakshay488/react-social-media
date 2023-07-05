// import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Icon, IconButton, Typography } from "@mui/material";
// import { red } from "@mui/material/colors";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { postActions } from "../../store";
import Comments from "./comments/Comments";
import Post from './Post';

function PostDetails() {

    const dispatch = useDispatch();
    const actions = bindActionCreators(postActions, dispatch);
    const posts = useSelector(state => state.posts);

    const params = useParams();

    useEffect(()=>{
        actions.fetchPost(params.id)
        .then(res=>{console.log(res)})
        .catch(err => console.log('fetchPost', err));
    },[])

    return ( 
       
        <Box 
            sx={{
                height:'100%',
                width:'100%'
            }} 
            pt={2}
        >
            <Post post={posts.activePost} page='postDetails' />
            <Comments />
        </Box>
        
     );
}

export default PostDetails;