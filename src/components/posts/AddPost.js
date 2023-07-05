import { Box, Fab, Icon, IconButton, Modal, styled, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddPostForm from '../forms/AddPostForm';

function AddPost(props) {

    const [open, setOpen] = useState(false);
    const users = useSelector(state => state.users);

    const theme = useTheme();

    const StyledBox = styled(Box)(({ theme }) => ({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        boxShadow: 24,
        [theme.breakpoints.down('sm')]: {
            width: '90%'
        }
    }));

    return (
        users.isAuth &&
        <div>
            <Fab onClick={() => setOpen(true)} size={props.size} color="primary" aria-label="add">
                <Icon fontSize={props.size}>add</Icon>
            </Fab>

            <Modal
                keepMounted
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <StyledBox borderRadius={2} p={4} bgcolor={theme.palette.background.paper}>
                    <IconButton
                    onClick={()=>setOpen(false)}
                    sx={{
                        position:'absolute',
                        top:0,
                        right:0
                    }}
                    >
                    <Icon >close</Icon>
                    </IconButton>
                    
                    <Typography 
                        id="keep-mounted-modal-title" 
                        variant="h6" 
                        component="h2"
                        mb={3}
                        color='text.primary'
                    >
                        Create And Post    
                    </Typography>
                    
                   <AddPostForm setOpen={setOpen} />
                    
                </StyledBox>
            </Modal>
        </div>
    );
}

export default AddPost;