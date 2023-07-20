import { Box, Stack, Typography, colors, useTheme } from "@mui/material";
import ChatMessege from "./ChatMessege";
import { blueGrey, lightBlue} from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { chatActions } from "../../../store";
import MessegeComp from "./MessegeComp";
import { useEffect } from "react";
import socket from "../../../services/socket";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import notifyService from "../../../services/notify.service";

function ChatBox(params) {

    let {chatid, another} = useParams();
    let path = useLocation().pathname;
    const theme = useTheme();

    const dispatch = useDispatch();
    const actions = bindActionCreators(chatActions, dispatch);
    const state = useSelector(state => state);
    const blogers = state.blogs.blogers;
    const chats = state.chat;
    const user = state.users.user;

    const [pictures, setPictures] = useState({
        another: '',
        user: user.profilepic
    });
    

    useEffect(()=>{

        let bloger = blogers.filter(b => b.username == another)[0];
        setPictures({...pictures, another: bloger.profilepic});

        // console.log(bloger);
        console.log('param', another, chatid);
    },[]);

    return (
        <Box    pb={{
            xl:0,
            lg:0,
            md:0,
            sm:0,
            xs: '60px'
        }} 
        width={'100%'} height={'100%'} >
            {/* <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    // bgcolor: theme.palette.background.paper,
                    boxShadow: 0,
                    borderRadius: 1,
                    mt: 1
                }}
            > 
                <Box display={'flex'} flexDirection={"column"} alignItems={'center'} >
                    <Avatar
                        alt="Remy Sharp"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
                    />
                    <Box
                        width={"40px"}
                        height={"4px"}
                        bgcolor={"#50C900"}
                        borderRadius={2}
                        mt={"4px"}
                    />
                </Box>


                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="p">
                        Mac Miller
                    </Typography>
                </CardContent>

            </Box> */}

            <Stack
                width={'100%'}
                height={'90%'}
                overflow={'auto'}
                spacing={2}
                pr={2}
                pl={2}
                pt={2}
                pb={'10px'}
            >
                {   
                (chatid === 'startchat')
                ?
                <Typography sx={{color: theme.palette.text.secondary}} variant="h4" m={'auto'} >Start chat with {another}</Typography>
                :
                (chats.chatting)?
                    chats.chatting.map((another, index) => (
                        <Box key={another._id}>

                            <MessegeComp prevMsg={chats.chatting[index-1]} pictures={pictures} msg={another} index={index} />

                        </Box>
                    ))
                    :
                    'Not yet'
                }

            </Stack>

            <Box
                sx={{
                    width: '95%',
                    // position: "absolute",
                    ml: '2.5%',
                    // bottom: "10px",
                    borderRadius: 1,
                    boxShadow: 1,
                    // p: 2,
                    pl: 2,
                    pr: 2,
                    pb:1,
                    bgcolor: theme.palette.background.paper,
                }}
                
            >
                   
                <ChatMessege reciever={another}  />
            </Box>
        </Box>
    )
}

export default ChatBox;