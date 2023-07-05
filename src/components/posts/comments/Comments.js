import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { postActions } from "../../../store";
import AddComment from "../../forms/AddComment";
import Comment from "./Comment";


function Comments() {

    const dispatch = useDispatch();
    const actions = bindActionCreators(postActions, dispatch);
    const posts = useSelector(state => state.posts);

    const params = useParams();

    useEffect(() => {
        actions.fetchComments(params.id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    },[])
    return (
        <Box mt={2} p={{
            sm: 2,
            xs: 1
        }}>
            <Typography variant="h6">Comments</Typography>

            <Box my={2} >

                <AddComment />

            </Box>


            <Stack
                // alignItems={'center'}
                width={'100%'}
                height={'50vh'}
                overflow={'auto'}

                spacing={3}
                paddingY={2}
            >
                {
                        
                        posts.comments.map(comment => (
                            <Comment key={comment._id} comment={comment} />
                        ))
                        
                
                }
            </Stack>

        </Box>
    );
}

export default Comments;