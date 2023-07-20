import { Avatar, Box, styled, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { blogActions } from "../../../store";

const StyledBox = styled(Box)({
    padding: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})

function Blogers() {

    const dispatch = useDispatch();
    const actions = bindActionCreators(blogActions, dispatch);
    const state = useSelector(state => state);
    const blogers = state.blogs.blogers;
    const chats = state.chat;

    useEffect(() => {
        actions.fetchBlogers()
        .then(res =>{console.log('fetchblogers', res)})
        .catch(err =>{
            console.log('blogers err' ,err);
        });
    }, []);

    return (
        <Box>
            <Typography color='text.primary' variant="h6" pb={2} >
                Top Blogers Of This Week
            </Typography>

            <Grid container spacing={2}>

                {
                    (!blogers.length==0)
                    ?
                    blogers.slice(0,5).map(bloger => (

                        <Grid item key={bloger._id} >
                            <Link to={`/bloger-profile/${bloger.username}`}>
                                <StyledBox >
                                    {/* <Avatar sx={{ bgcolor: purple[400] }} >{bloger.name.slice(0,2)}</Avatar> */}
                                    <Box 
                height={"56px"} 
                width={'56px'} 
                display={'flex'} 
                position={'relative'} 
                flexDirection={"column"} 
                alignItems={'center'} 
            >
                <Avatar
                    alt="Remy Sharp"
                    sx={{ width: "56px", height: '56px' }}
                    src={'http://localhost:5000/'+bloger.profilepic}
                />
                <Box
                    position={'absolute'}
                    bottom={4}
                    right={4}
                    width={"10px"}
                    height={"10px"}
                    bgcolor={(chats.loginUsers.some((user)=>user.userId === bloger.username))?"#50C900":"tranparent"}
                    borderRadius={2}
                    // boxShadow={1}
                    mt={"4px"}
                />
            </Box>
                                    {/* <Avatar alt="Remy Sharp" src={'http://localhost:5000/'+bloger.profilepic} /> */}
                                    <Typography variant="p" color={'text.secondary'} pt={1} >
                                        {bloger.name}
                                    </Typography>
                                </StyledBox>
                            </Link>
                            
                        </Grid>
                    ))
                    :
                    'Loading'
                }


            </Grid>
        </Box>
    );
}

export default Blogers;