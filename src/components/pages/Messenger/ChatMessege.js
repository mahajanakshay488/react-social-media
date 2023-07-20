import { Box, Button, Icon, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { chatActions } from "../../../store";
import socket from "../../../services/socket";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import notifyService from "../../../services/notify.service";

function ChatMessege(props) {

    const {another, chatid } =useParams();
    const {reciever} = props;
    const dispatch = useDispatch();
    const actions = bindActionCreators(chatActions, dispatch);
    const state = useSelector(state => state);
    const user = state.users.user;
    const blogers = state.blogs.blogers;
    const chats = state.chat;
    

    const [credentials, setCredentials] = useState({
        msg: '',
    });

    const handleChange =(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }


    const sendMessege=(event)=>{
        event.preventDefault();

        // const recieverId = blogers.filter(b=> b.username === reciever)[0].username;
        // console.log("reciever-chatid", localStorage.getItem('another'), localStorage.getItem('chatid'));
        console.log(another);
        actions.sendMessage(another, credentials)
        .then(response=>{

            socket.emit('sendMessege', {
                userId: user.username,
                recieverId: another,
                chatid: response.value.chatid,
                msgid: response.value._id,
                text: credentials.msg
            });

            if(!chats.loginUsers.some(u => u.userId === another)){
                const notific = {
                    author: user.username,
                    reciever: another,
                    chatid: response.value.chatid,
                    msgid: response.value._id
                }
                console.log('notify added', notific);
                // notifyService.addNotify(credentials)
                // .then(res=>{
                //     console.log('notify added', res);
                // })
                // .catch(err =>console.log(err));
            }

           actions.fetchMesseges(response.value)
           .then(res=>{

            console.log('fetch messege', res);
           })
           .catch(err=>console.log(err));

            console.log("sendmesg", response)
        })
        .catch(err => console.log(err));

        // console.log(credentials, reciever);
    
        setCredentials({...credentials, msg:''});
    }

    // useEffect(()=>{
        
    // },[])

    return (
        <>
        <form onSubmit={sendMessege} >
            <Box
                display={'flex'}
            >
            <Box flex={6} >
                    <TextField 
                        name="msg"
                        size="small"
                        value={credentials.msg}s
                        onChange={handleChange}
                        fullWidth
                        id="standard-basic" label="Write A Message" variant="standard" 
                    />
                </Box>
                
                <Box ml={2} flex={1} mt={2}>
                    <Button 
                       type="submit"
                       size="small"
                        variant="contained" color="primary" endIcon={<Icon>send</Icon>}>
                        Send
                    </Button>
                </Box>
            </Box>
            
        </form>
            
            
        </>

    )
}

export default ChatMessege;