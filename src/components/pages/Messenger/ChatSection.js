import { Box, List, ListItemButton, Typography, useTheme } from "@mui/material";
import * as React from 'react';
import ChatUsers from "./ChatUsers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { chatActions, notifyActions } from "../../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import notifyService from "../../../services/notify.service";

function ChatSection(params) {

    const theme = useTheme();
    const navigate = useNavigate('');
    const {chatid, another} = useParams();

    const dispatch = useDispatch();
    const actions = bindActionCreators(chatActions, dispatch);
    const notifyAction = bindActionCreators(notifyActions, dispatch);
    const state = useSelector(state => state);
    const user = state.users.user;
    const chats = state.chat;
    const notifications =state.notifys.notifications;
    


    const [selectedIndex, setSelectedIndex] = React.useState(another);
    // const [chatSection, setChatSection] = useState({val:[]});
    // const [notifys, setNotifys] = useState({val:[]});

    const fechMsgs = (el, index)=>{
        actions.fetchMesseges(el)
        .then(res=>{
            let notify = notifications.filter(v=>v.author === el.another)[0];
            if(notify){
                notifyAction.removeNotify(notify._id)
                .then(deleted=>{
                    notifyAction.fetchNotifys(user.username)
                    .then(val => console.log('fetchMesseges'))
                    .catch(err => console.log(err));
                    console.log('deleted', deleted);
                });    
            }    
            
        })
        .catch(err =>{
            console.log(err);
        })
    }
    const handleListItemClick = (index, el) => {
        fechMsgs(el,index);
        navigate(`/messenger/${el.another}/${el.chatid}`);
    };

    const fetchChatSec = ()=>{
        actions.fetchChatsec()
        .then(res => {
            console.log("chatSec", chats.chatsec);

            // if(chatid=== 'startchat'){
            //     setChatSection({val: [{another,_id: another+'ijdi83783'}, ...chats.chatsec]});
            //     // setSelectedIndex(0)
            //     console.log('set New');
            // }
            // else{
            //     // fechMsgs(user.msgs[selectedIndex]);
            //     setChatSection({val: [...chats.chatsec]});
            //     // setSelectedIndex(0)
            //     // setSelectedIndex()
            //     console.log('setVal');
            // }

            // navigate(`/messenger/${another.another}/${another.chatid}`);
        })
        .catch(err => {
            console.log('fetchPost Err', err);
        })
    }

    // useEffect(() => {
    //     notifyAction.fetchNotifys(user.username)
    //         .then(res =>{
    //             console.log('Notifications Fetched');
    //     });
    //     fetchChatSec();
    // }, []);


    return (
        <Box
        width={'100%'}
        >
            <List >
                {
                    chats.chatsec.map((el, index) => (
                        // <Box key={another._id}>
                        <ListItemButton
                            key={el._id}
                            selected={selectedIndex === el.another}
                            onClick={(event) => handleListItemClick(index,el)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px',
                                bgcolor: theme.palette.background.paper,
                                boxShadow: (selectedIndex === el.another) ? 1 : '',
                                borderRadius: 1,
                                mt: 1
                            }}
                        >
                            <ChatUsers another={el} index={index} />
                        </ListItemButton>
                        
                    ))
                }

            </List>

        </Box>
    )
}

export default ChatSection;