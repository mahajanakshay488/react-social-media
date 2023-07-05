import { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { postActions } from "../../store";
import { useParams } from "react-router-dom";

function AddComment(props) {

    const dispatch = useDispatch();
    const actions = bindActionCreators(postActions, dispatch);
    const posts = useSelector(state => state.posts);
    const params = useParams();

        const [credentials, setCredentials] = useState({
            comment: ''
        });
    
        const handleSubmit =(e)=>{
            e.preventDefault();

            actions.addComment(params.id, credentials)
            .then(res =>{
                console.log('signup', res);
            })
            .catch(err => console.log('signup',err));

        }
    
        const handleChange =(e)=>{
            setCredentials({...credentials, [e.target.name]: e.target.value});
        }
        return ( 
            <Box>
    
                <form onSubmit={handleSubmit} >
                    <Stack direction={'row'} spacing={3}>
                        <TextField 
                            name="comment" 
                            value={credentials.comment}
                            onChange={handleChange}
                            label="Add Comment" 
                            fullWidth 
                            size="small"
                            id="fullWidth"
                        />
                        <Button 
                            type="submit"
                            variant="contained"
                            size="small"
                            color="primary"
                        >
                            Post
                        </Button>
                    </Stack>
                    
                </form>
            </Box>
     );
}

export default AddComment;