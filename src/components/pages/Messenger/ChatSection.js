import { Avatar, Box, Card, CardContent, List, ListItemButton, Stack, Typography, useTheme } from "@mui/material";
import * as React from 'react';
import ChatUsers from "./ChatUsers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { chatActions } from "../../../store";
import { useNavigate } from "react-router-dom";

function ChatSection(params) {

    const theme = useTheme();
    const navigate = useNavigate('');

    const dispatch = useDispatch();
    const actions = bindActionCreators(chatActions, dispatch);
    const state = useSelector(state => state);
    const user = state.users.user;
    const chats = state.chat;


    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const fechMsgs = (chatid, index)=>{
        actions.fetchMesseges(chatid)
        .then(res=>{
            // localStorage.setItem('another', user.msgs[index].another);
            // localStorage.setItem('chatid', chatid.chatid);
            // console.log("mess another", localStorage.getItem('another'),localStorage.getItem('chatid'));
        })
        .catch(err =>{
            console.log(err);
        })
    }
    const handleListItemClick = (index, another) => {
        setSelectedIndex(index);
        fechMsgs(another,index);
        navigate(`/messenger/${another.another}/${another.chatid}`);
    };

    useEffect(() => {
        

        actions.fetchChatsec()
            .then(res => {
                fechMsgs(user.msgs[selectedIndex]);
                console.log(res);
            })
            .catch(err => {
                console.log('fetchPost Err', err);
            })
        // console.log("chatSec", chats.chatsec);
    }, []);


    return (
        <Box
        >
            <List >
                {
                    // (chats.chatsec.length==0)
                    // ?
                    chats.chatsec.map((another, index) => (
                        // <Box key={another._id}>
                        <ListItemButton
                            key={another._id}
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(index,another)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px',
                                bgcolor: theme.palette.background.paper,
                                boxShadow: (selectedIndex === index) ? 1 : '',
                                borderRadius: 1,
                                mt: 1
                            }}
                        >
                            <ChatUsers another={another} index={index} />
                        </ListItemButton>
                        
                    ))
                    // :
                    // 'NO users'
                }

            </List>

        </Box>
    )
}

export default ChatSection;