import { Box, Stack, styled, Typography } from "@mui/material";
import { compBox } from "../../styles/responsiveStyle";
import Post from "./Post";


function PostListing(props) {

    const MyBox = styled(Box)(({theme})=>({
        width: (props.rightbar)?`90%`:'75%',
        [theme.breakpoints.down('sm')]:{
            width: '100%'
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
                            <Post rightbar={(props.rightbar)?props.rightbar:false} page='postList' post={post} />
                        </MyBox>
                    ))
                    :
                    'No Posts Yet'
                }
                

            </Stack>
        </Box>
     );
}

export default PostListing;