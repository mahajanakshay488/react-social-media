import { Avatar, Badge, Box, Card, CardContent, List, ListItemButton, Stack, Typography, useTheme } from "@mui/material";
import * as React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { blogActions } from "../../../store";
import { useState } from "react";

function ChatUsers(props) {

    const { index, another } = props;
    const state = useSelector(state => state);
    const chat = state.chat;
    const notifications = state.notifys.notifications;
    let notify = notifications.filter(v=>v.author === another.another)[0]

    const blogs = useSelector(state => state.blogs);
    const [bloger, setBloger] = useState({
        profilepic: '',
        name: '',
        id: ''
    });

    const theme = useTheme();

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (
        index
    ) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        const data = blogs.blogers.filter(b => b.username === another.another);
        // console.log(data);
        if (data.length > 0) {
            let bl = data[0];
            setBloger({ ...bloger, profilepic: bl.profilepic, name: bl.name, id: bl._id });
        }

        console.log('notifys', notifications, another);

        // console.log(bloger);
    }, [])


    return (
        // <ListItemButton 

        // selected={selectedIndex === index}
        // onClick={(event) => handleListItemClick(index)}
        //     sx={{ 
        //         display: 'flex', 
        //         alignItems: 'center', 
        //         padding: '10px', 
        //         bgcolor: theme.palette.background.paper,
        //         boxShadow: (selectedIndex===index)?1:'',
        //         borderRadius: 1,
        //         mt:1
        //     }}
        // >

        <>
        
            <Box
                height={"56px"}
                width={'56px'}
                display={'flex'}
                position={'relative'}
                flexDirection={"column"}
                alignItems={'center'}
            >
                <Badge badgeContent={(notify) ? notify.msgs.length : null} color="primary">
                <Avatar
                    alt="Remy Sharp"
                    sx={{ width: "56px", height: '56px' }}
                    src={'http://localhost:5000/' + bloger.profilepic}
                />
                </Badge>
                
                <Box
                    position={'absolute'}
                    bottom={4}
                    right={4}
                    width={"10px"}
                    height={"10px"}
                    bgcolor={(chat.loginUsers.some((user) => user.userId === another.another)) ? "#50C900" : "transparent"}
                    borderRadius={2}
                    // boxShadow={1}
                    mt={"4px"}
                />
            </Box>

            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography sx={{ color: theme.palette.text.secondary }} component="text" type="text" variant="p">
                    {bloger.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {
                    (notify)
                    ?
                     ((notify.msgs[notify.msgs.length-1].msg.slice(0,30))+'...')
                    :
                    <></>
                    }
                </Typography>
            </CardContent>
        </>



        // </ListItemButton>
    )
}

export default ChatUsers;