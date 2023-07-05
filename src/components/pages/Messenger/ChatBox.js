import { Avatar, Box, Button, Card, CardContent, Icon, Stack, TextField, Typography } from "@mui/material";
import ChatMessege from "./ChatMessege";
import { lightBlue, lightGreen, orange, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { chatActions } from "../../../store";
import MessegeComp from "./MessegeComp";
import { useEffect } from "react";
import socket from "../../../services/socket";
import { useState } from "react";
import { useParams } from "react-router-dom";

function ChatBox(params) {

    let {chatid, another} = useParams();

    const dispatch = useDispatch();
    const actions = bindActionCreators(chatActions, dispatch);
    const chats = useSelector(state => state.chat);
    

    useEffect(()=>{

        socket.on('gettMessege', val=>{
            console.log("getMMEssege", val);
            // let reciever = localStorage.getItem('another');
            // let chatid = localStorage.getItem('chatid');

            // console.log('local reciever', reciever)
            if(another === val.author){
                actions.fetchMesseges({chatid: chatid})
                .then(res =>{console.log(res)})
                .catch(err =>{console.log(err)});
            }
        });

        // console.log(chats.chatting);
        // console.log('param')
    });

    return (
        <Box position={"relative"} height={'100%'} >
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
                height={'100%'}
                overflow={'auto'}
                spacing={2}
                pr={2}
                pl={2}
                pt={2}
                pb={'100px'}
            >
                {   
                (chats.chatting)?
                    chats.chatting.map((another, index) => (
                        <Box key={another._id}>

                            <MessegeComp msg={another} index={index} />

                        </Box>
                    ))
                    :
                    'Not yet'
                }

            </Stack>

            <Box
                sx={{
                    width: '95%',
                    position: "absolute",
                    left: '2.5%',
                    bottom: "10px",
                    borderRadius: 1,
                    boxShadow: 1,
                    p: 2,
                    pl: 3,
                    pr: 3,
                    bgcolor: lightBlue[50],
                }}
                
            >
                
                
                <ChatMessege reciever={chats.another}  />
                
                
            </Box>
        </Box>
    )
}

export default ChatBox;