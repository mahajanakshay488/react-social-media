import { Box, Stack, useTheme } from "@mui/material";
import ChatBox from "./ChatBox";
import ChatUsers from "./ChatUsers";
import { blue, blueGrey, lightBlue } from "@mui/material/colors";
import ChatSection from "./ChatSection";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { chatActions } from "../../../store";
import socket from "../../../services/socket";

function Messenger() {
    const theme = useTheme();

    const dispatch = useDispatch();
    const actions = bindActionCreators(chatActions, dispatch);

    const user = useSelector(state => state.users.user);

    // const socket = useRef();

    // useEffect(()=>{
    //     socket.current = io("ws://localhost:8900");
    // },[])

    useEffect(()=>{

        if(user._id){
            socket.emit('addUser', user.username);
        }else{
            socket.emit('userLogout');
        }

        socket.on('getUsers', users=>{
            console.log('users', users);
            actions.setLoginUsers(users);        
        })
    },[user]);

    return(
        <Stack
            width={'100%'}
            height={'100%'}
            bgcolor={theme.palette.background.paper} 
            direction={'row'}
            pl={2}
            
        >
            <Box
                flex={6}
                
            >
                <ChatBox />
            </Box>
            <Box 
                 pl={2}
                flex={2.5}
                bgcolor={theme.palette.background.paper}
                pr={2}
            >
                <ChatSection />
            </Box>
        </Stack>
    )
}

export default Messenger;