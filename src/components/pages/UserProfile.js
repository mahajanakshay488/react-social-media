import { Box, Icon, IconButton, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { userActions } from "../../store";
import ProfileCard from '../appbar/leftbar/ProfileCard'
import PostListing from "../posts/PostListing";

function UserProfile() {

    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    const dispatch = useDispatch();
    const actions = bindActionCreators(userActions, dispatch);
    const users = useSelector(state => state.users);
   

    useEffect(()=>{
            actions.profile()
            .then(res =>{
                if(res.notLogedin){
                    navigate('/login')
                }
            })
            .catch(err => {
                console.log("profile Err",err);
            });
    },[]);

    return (
        <Box height={'100%'} width='100%' >

            <Box
                position='relative'
            >
                <ProfileCard userProfile={true} user={users.user} />

                <Box
                    position='absolute'
                    top={0}
                    right={60}
                >
                    {/* <Tooltip
                        title="Close This">
                        <IconButton
                            // onClick={()=>navigate('/all-blogs')}
                            onClick={() => navigate(-1)}
                            aria-label="settings"
                        >
                            <Icon>close</Icon>
                        </IconButton>
                    </Tooltip> */}
                </Box>

            </Box>

            <Box height={'70vh'} width='100%'>
                <PostListing posts={(users.user.posts)?users.user.posts.reverse():[]} heading='Posted Blogs' />
            </Box>
        </Box>
    );
}

export default UserProfile;