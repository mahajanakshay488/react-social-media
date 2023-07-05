import { Avatar, Box, Typography } from "@mui/material";

function Comment(props) {
    const comment = props.comment;
    return ( 
        <Box
        component={'div'}
        display='flex'
    >
        <Avatar>H</Avatar>
        <Box ml={2}>
            <Box mb={1}>
                <Typography variant="body2" >{comment.userid.name}</Typography>
                <Typography variant="body2" color='text.secondary'>23h</Typography>
            </Box>    
                <Typography variant="body" color='text.secondary'>
                    {comment.comment}
                </Typography>
            
        </Box>
    </Box>    
     );
}

export default Comment;