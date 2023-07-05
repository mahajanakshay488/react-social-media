import { Box, Icon, IconButton, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { blogActions } from "../../store";
import ProfileCard from '../appbar/leftbar/ProfileCard'
import PostListing from "../posts/PostListing";

function BlogerProfile() {

    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const params = useParams();

    const dispatch = useDispatch();
    const actions = bindActionCreators(blogActions, dispatch);
    const blogs = useSelector(state => state.blogs);
   

    useEffect(()=>{
            actions.fetchBloger(params.username)
            .then(res =>{          
                console.log(res);
            })
            .catch(err => {
                console.log("profile Err",err);
            });
    },[params.username]);

    return (
        <Box height={'100%'} width='100%' >

            <Box
                position='relative'
            >
                <ProfileCard userProfile={false} user={blogs.bloger} />

                <Box
                    position='absolute'
                    top={0}
                    right={60}
                >
                    <Tooltip
                        title="Close This">
                        <IconButton
                            // onClick={()=>navigate('/all-blogs')}
                            onClick={() => navigate(-1)}
                            aria-label="settings"
                        >
                            <Icon>close</Icon>
                        </IconButton>
                    </Tooltip>
                </Box>

            </Box>

            <Box height={'70vh'} width='100%'>
                <PostListing posts={(blogs.bloger.posts)?blogs.bloger.posts.reverse():[]} heading='Posted Blogs' />
            </Box>
        </Box>
    );
}

export default BlogerProfile;