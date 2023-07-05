import { Avatar, Box, Card, CardContent, List, ListItemButton, Stack, Typography, useTheme } from "@mui/material";
import { lightBlue, orange } from "@mui/material/colors";
import * as React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../../store";
import { useState } from "react";
import { useRef } from "react";
import socket from "../../../services/socket";


function MessegeComp(props) {
    const { msg } = props;
    const scrollRef = useRef();
    const dispatch = useDispatch();
    const actions = bindActionCreators(userActions, dispatch);
    const state = useSelector(state => state);
    const user = state.users.user;
    const blogers = state.blogs.blogers;

    const data = blogers.filter(b => b.username === msg.reciever)[0];

    const [bloger, setBloger] = useState({
        profilepic: '',
        name: ''
    });

    const theme = useTheme();

    


    const [selectedIndex, setSelectedIndex] = useState(1);


    useEffect(() => {
       scrollRef.current?.scrollIntoView({'behavior': 'smooth'});
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
                        <Card

                            sx={{
                                maxWidth: "60%",
                                bgcolor: lightBlue[300],
                                p: 2,
                                mr: 1
                            }}
                        >
                            <Typography type="text" component={'text'} variant="p" letterSpacing={0.8} >
                                {msg.msg}
                            </Typography>
                        </Card>
                        {/* <Avatar
                            alt="Remy Sharp"
                            src={'http://localhost:5000/'+user.profilepic}
                        /> */}
                    </Box>
                    :
                    <Box
                        ref={scrollRef}
                        // height={'120%'}
                        display={'flex'}
                        // flexDirection={'column'}
                        justifyContent={'start'}
                    >
                        {/* <Avatar

                            alt="Remy Sharp"
                            src={'http://localhost:5000/'+data.profilepic}
                        /> */}
                        <Card

                            sx={{
                                maxWidth: "60%",
                                bgcolor: orange[300],
                                p: 2,
                                ml: 1
                            }}
                        >
                            <Typography type="text" component={'text'} variant="p" letterSpacing={0.8} >
                                {msg.msg}
                            </Typography>
                        </Card>
                        {/* <Typography variant="subtitle1">
                            3:20 pm
                        </Typography> */}
                    </Box>
            }
        </>


    )
}

export default MessegeComp;