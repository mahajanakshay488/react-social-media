import { Box, Stack, styled, useTheme } from "@mui/material";
import ChatSection from "./ChatSection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { chatActions, notifyActions } from "../../../store";
import socket from "../../../services/socket";
import { Outlet, useLocation } from "react-router-dom";
import notifyService from "../../../services/notify.service";

function Messenger() {
    const theme = useTheme();
    let path = useLocation().pathname;
    const dispatch = useDispatch();
    const chatactions = bindActionCreators(chatActions, dispatch);
    const notifyactions = bindActionCreators(notifyActions, dispatch);

    const state = useSelector(state => state);
    const user = state.users.user;
    const chats = state.chat;


    // const socket = useRef();

    const chatAndNotify=(notific)=>{
        // notifyactions.addNotify(notific)
        // .then(res => {
        chatactions.fetchChatsec()
        .then(res => console.log(res))
        .catch(err => console.log(err));
        console.log('add Notification', notific);
        // })
        // .catch(err => console.log(err));   
    }

    const onGetMessege = (val)=>{
        let notific = {
            author:val.author,
            reciever: user.username,
            chatid: val.chatid,
            msgid: val.msgid
        }
        

        if(chats.another === val.author){
            console.log("chatting true",chats.another, 'val',val.author, val.chatid);
            chatactions.fetchMesseges({chatid: val.chatid})
            .then(res =>{console.log("fetch msgs",res)})
            .catch(err =>{console.log(err)});
        }else{
            console.log('chatting false', chats.another, val.author,val.chatid);
            chatAndNotify(notific);
        }
    }

    useEffect(()=>{ 
        
        notifyactions.fetchNotifys(user.username)
            .then(res =>{
                console.log('Notifications Fetched');
        });

        chatactions.fetchChatsec()
        .then(res => {
            console.log("chatsec", res);
        })
        .catch(err => {
            console.log('chatsec Err', err);
        })
        socket.on('gettMessege', val=>{    
            console.log("getMMEssege", val);
            onGetMessege(val);  
        });
    },[]);


    const ChatMesg = styled(Box)(({ theme }) => ({
        flex: 10,
        [theme.breakpoints.down('md')]: {

            display: (path === '/messenger')?'none':'flex',
            flex: (path === '/messenger')?0:6
        }
    }));
    

    const ChatSec = styled(Box)(({ theme }) => ({
        flex: 2.5,
        [theme.breakpoints.down('md')]: {
            display: (path !== '/messenger')?'none':'flex',
            flex: (path !== '/messenger')? 0 : 6
        }
    }));

   

    useEffect(()=>{

        // if(user._id){
        //     socket.emit('addUser', user.username);
        // }else{
        //     socket.emit('userLogout');
        // }

       
    },[user]);

    return(
        <Stack
            width={'100%'}
            height={'100%'}
            // bgcolor={theme.palette.background.paper} 
            direction={'row'}
            pl={{
                xl: 2,
                md:0
            }}
         
            
        >
            <ChatMesg
                // flex={6}
                
            >
                <Outlet />
                
            </ChatMesg>
            <ChatSec
                 pl={2}
                // flex={2.5}
                bgcolor={theme.palette.background.paper}
                borderRadius={2}
                pr={2}
            >
                <ChatSection />
            </ChatSec>
        </Stack>
    )
}

export default Messenger;