import { Box, Icon, IconButton, Modal, Stack, styled, Typography, useTheme } from "@mui/material";
import { compBox } from "../../styles/responsiveStyle";
import Post from "./Post";
import { useState } from "react";


function PostListing(props) {

    const {posts} = props;

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [modalPost, setModalPost] = useState({});

    const updateState = (modalpost)=>{
        setOpen(true);
        setModalPost(modalpost);
    }

    const alreadyOpen=(postindex)=>{
        console.log('Already Open');
    }

    const MyBox = styled(Box)(({theme})=>({
        width: (props.rightbar)?`90%`:'75%',
        [theme.breakpoints.down('sm')]:{
            width: '100%'
        }
    }));

    const StyledBox = styled(Box)(({ theme }) => ({
        width:'90vw',
        height: '90vh',
        // overflow: 'auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: '70%',
        // height: '50%',
        boxShadow: 24,
        [theme.breakpoints.down('sm')]: {
            width: '90%'
        }
    }));

    return ( 

        <Box width={'100%'} height={'100%'} sx={(props.rightbar)?{}:{...compBox}} >

            <Typography 
                color='text.primary'
                textAlign={(props.rightbar)?'left':'center'} 
                variant="h6"
            >
                {props.heading}
            </Typography>

            <Stack 
                alignItems={'center'}
                width={'100%'} 
                height={'100%'} 
                overflow={'auto'} 
                mt={2} 
                spacing={2}
                paddingY={2}
            >
                {
                    (!props.posts.length==0)
                    ?
                    props.posts.map((post, index) =>(
                        <MyBox key={post._id}>
                            <Post openModal={updateState} rightbar={(props.rightbar)?props.rightbar:false} page='postList' post={post} index={index} />
                        </MyBox>
                    ))
                    :
                    'No Posts Yet'
                }

            </Stack>

            <Modal
                keepMounted
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <StyledBox
                 borderRadius={2} bgcolor={theme.palette.background.paper}>
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
                    
                    {/* <Typography 
                        id="keep-mounted-modal-title" 
                        variant="h6" 
                        component="h2"
                        mb={3}
                        color='text.primary'
                    >
                        Post Details in convinient Way...
                    </Typography> */}
                    
                    <Post inModal={true} openModal={alreadyOpen} rightbar={(props.rightbar)?props.rightbar:false} page='postDetails' post={modalPost} />
                    
                </StyledBox>
            </Modal>
        </Box>
     );
}

export default PostListing;