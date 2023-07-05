import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Icon, IconButton, Tooltip, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";

function Post(props) {
    const { post } = props;

    const navigate = useNavigate();

    const rightbar = (props.rightbar) ? props.rightbar : false;

    const addLike=()=>{

    }

    return (
        <Card
            sx={{
                width: '100%',
                padding: {
                    // sm: (rightbar) ? 0 : 2,
                    xs: 0
                },
                boxShadow: (rightbar || props.page==='postList') ? 1 : 0,
                "&:hover": {
                    boxShadow: 1
                }
            }}
        >
            <CardHeader
                avatar={
                    <Link to={`/bloger-profile/${(post.userid) ? post.userid.username : 'username'}`}>
                        <Avatar sx={{ bgcolor: red[400] }} aria-label="recipe">
                            R
                        </Avatar>
                    </Link>

                }
                action={
                    (props.page === 'postList')
                        ?
                        <Tooltip title="Open Blog">
                            <IconButton
                                onClick={() => navigate('/all-blogs/3')}
                                aria-label="settings"
                            >
                                <Icon>read_more</Icon>
                            </IconButton>
                        </Tooltip>

                        :
                        <Tooltip title="Close This">
                            <IconButton
                                // onClick={()=>navigate('/all-blogs')}
                                onClick={() => navigate(-1)}
                                aria-label="settings"
                            >
                                <Icon>close</Icon>
                            </IconButton>
                        </Tooltip>

                }
                title={(post.userid) ? post.userid.name : 'Loading'}
                subheader="September 14, 2016"
            />
            <Link to={`/all-blogs/${post._id}`}>
                <Box 
                 height={(props.page === 'postList')?'240px':'auto'}
                 width='100%'
                 display='flex'
                 alignItems='center'
                 justifyContent='center'
                >
                    <img
                        // width='100%'
                        src={'http://localhost:5000/'+post.media}
                        alt="Paella dish"
                        style={{
                            maxWidth:'100%',
                            maxHeight:'100%',
                            backgroundSize: 'custom',
                            backgroundPosition: 'center'
                        }}
                    />
                </Box>
                
                <CardContent>
                    <Typography gutterBottom variant="body" color='text.primary' pb={1} component="div">
                        {post.title}
                    </Typography>
                    <Typography variant="p" color="text.secondary">
                        {post.content}
                    </Typography>
                </CardContent>
            </Link>

            <CardActions>

                <Box
                    display='flex'
                    alignItems='flex-end'
                    mr={1}
                >
                    <IconButton>
                        <Icon fontSize="medium" >favorite</Icon>
                    </IconButton>
                    <Typography
                        mb={'6px'}
                        fontWeight={600}
                        variant="body2"
                        color={'text.secondary'}
                    >
                        {(post.reacts) ? post.reacts.length : '..'}
                    </Typography>
                </Box>

                <Box
                    display='flex'
                    alignItems='flex-end'
                >
                    <IconButton >
                        <Icon fontSize="medium" >message</Icon>

                    </IconButton>
                    <Typography
                        mb={'6px'}
                        fontWeight={600}
                        variant="body2"
                        color={'text.secondary'}
                    >
                        {(post.comments) ? post.comments.length : '..'}
                    </Typography>
                </Box>

            </CardActions>
        </Card>
    );
}

export default Post;