import { Avatar, Box, Card, CardContent, List, ListItemButton, Stack, Typography, useTheme } from "@mui/material";
import { grey, lightBlue, orange, red } from "@mui/material/colors";
import * as React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../../store";
import { useState } from "react";
import { useRef } from "react";
import socket from "../../../services/socket";


function MessegeComp(props) {
    const { msg, pictures, prevMsg, index } = props;
    const scrollRef = useRef();
    const dispatch = useDispatch();
    const actions = bindActionCreators(userActions, dispatch);
    const state = useSelector(state => state);
    const user = state.users.user;
    const chat = state.chat;
    const blogers = state.blogs.blogers;

    const theme = useTheme();


    useEffect(() => {
       scrollRef.current?.scrollIntoView({'behavior': 'smooth'});
    //    console.log('pictures', pictures);
        // setBloger({...bloger, profilepic: data.profilepic, name: data.name});
        // console.log("msgCOmp", msg);
    }, []);


    return (
        <>

            {
                (user.username == msg.author)
                    ?

                    <Box
                        // height={'120%'}
                        ref={scrollRef}
                        display={'flex'}
                        // flexDirection={'column'}
                        justifyContent={'end'}
                    >
                        <Box
                            sx={{
                                maxWidth: "60%",
                                bgcolor: lightBlue[100],
                                p: 2,
                                mr: 1
                            }}
                            borderRadius={2}
                        >
                            <Typography type="text" component={'text'} variant="p" letterSpacing={0.8} >
                                {msg.msg}
                            </Typography>
                        </Box>
                        <Avatar
                            alt="Remy Sharp"
                            src={'http://localhost:5000/'+pictures.user}
                        />
                    </Box>
                    :
                    <Box
                        ref={scrollRef}
                        // height={'120%'}
                        display={'flex'}
                        // flexDirection={'column'}
                        justifyContent={'start'}
                    >
                        {
                            <Box 
                            height={"42px"} 
                            width={'42px'} 
                            display={'flex'} 
                            position={'relative'} 
                            flexDirection={"column"} 
                            alignItems={'center'} 
                        >
                            <Avatar
                                alt="Remy Sharp"
                                src={'http://localhost:5000/'+pictures.another}
                            />
                            <Box
                                position={'absolute'}
                                bottom={4}
                                right={4}
                                width={"10px"}
                                height={"10px"}
                                bgcolor={(chat.loginUsers.some((user)=>user.userId === msg.author))?"#50C900":"#dadada"}
                                borderRadius={2}
                                boxShadow={1}
                                mt={"4px"}
                            />
                        </Box>
                        }
                        
                        <Box

                            sx={{
                                maxWidth: "60%",
                                bgcolor: "lightcoral",
                                p: 2,
                                ml: 1
                            }}
                            borderRadius={2}
                        >
                            <Typography type="text" component={'text'} variant="p" letterSpacing={0.8} >
                                {msg.msg}
                            </Typography>
                        </Box>
                        {/* <Typography variant="subtitle1">
                            3:20 pm
                        </Typography> */}
                    </Box>
            }
        </>


    )
}

export default MessegeComp;