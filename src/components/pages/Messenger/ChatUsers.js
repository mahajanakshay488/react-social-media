import { Avatar, Box, Card, CardContent, List, ListItemButton, Stack, Typography, useTheme } from "@mui/material";
import * as React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { blogActions } from "../../../store";
import { useState } from "react";

function ChatUsers(props) {

    const { index, another } = props;
    const chat = useSelector(state => state.chat);

    const blogs = useSelector(state => state.blogs);
    const [bloger, setBloger] = useState({
        profilepic: '',
        name: '',
        id:''
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
        if(data.length>0){
            let bl = data[0];
        setBloger({...bloger, profilepic: bl.profilepic, name: bl.name, id:bl._id});
        }
        
        // console.log(bloger);
    },[])


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
            <Box display={'flex'} flexDirection={"column"} alignItems={'center'} >
                <Avatar
                    alt="Remy Sharp"
                    sx={{ width: "56px", height: '56px' }}
                    src={'http://localhost:5000/'+bloger.profilepic}
                />
                <Box
                    width={"40px"}
                    height={"4px"}
                    bgcolor={(chat.loginUsers.some((user)=>user.userId === another.another))?"#50C900":"#dadada"}
                    borderRadius={2}
                    mt={"4px"}
                />
            </Box>


            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography color={'text'} component="text" type="text" variant="p">
                    {bloger.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                {another.another}
                </Typography>
            </CardContent>
        </>



        // </ListItemButton>
    )
}

export default ChatUsers;