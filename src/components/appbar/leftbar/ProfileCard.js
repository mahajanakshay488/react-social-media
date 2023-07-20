import { Avatar, Box, Button, Card, CardContent, Icon, Typography, colors } from "@mui/material";
import { blue, orange, purple } from "@mui/material/colors";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../../store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



function ProfileCard(props) {
    const { userProfile } = props;
    const navigate = useNavigate();
    // const users = useSelector(state => state.users);

    const dispatch = useDispatch();
    const actions = bindActionCreators(userActions, dispatch);
    const users = useSelector(state => state.users);
    const refs = useRef(null);

    const [chatid, setChatid] = useState('')

    const uploadAvatar = () => {
        refs.current.click();
    }

    const selectFile = (e) => {
        let imgfile = e.target.files[0];
        const formData = new FormData();
        formData.append('imgfile', imgfile);
        console.log(imgfile);

        actions.updateProfilepic(formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }
    useEffect(()=>{
        let msg = props.user.msgs?.filter(u => u.another === users.user.username)[0];
        (msg)
        ? setChatid(msg.chatid)
        : setChatid('startchat');

        console.log(chatid);    
    });

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 2,
                padding: 1,
                paddingTop: 3,
                boxShadow: 0
            }}
        >
            <Box display='none'>
                <input
                    ref={refs}
                    type="file"
                    onChange={selectFile}
                />
            </Box>

            {
                (userProfile)
                    ?
                    <Box
                        component='div' id='profileBox' position='relative' >

                        <Avatar
                            src={'http://localhost:5000/' + props.user.profilepic}
                            variant="rounded"
                            sx={{
                                width: '100%',
                                height: '100%',
                                bgcolor: purple[400]
                            }} />


                        <div id="hoverItem"
                            onClick={uploadAvatar}
                        >
                            <Icon>edit</Icon>
                            <p>Update Picture</p>
                        </div>
                    </Box>
                    :
                    <Avatar
                        src={'http://localhost:5000/' + props.user.profilepic}
                        sx={{
                            width: '200px',
                            height: '200px',
                            // bgcolor: purple[400]
                        }} />

            }


            <CardContent>

                <Typography textAlign={'center'} color='text.secondary' component="div" variant="p">
                    {props.user.name}
                </Typography>

                <Typography textAlign={'center'} color='text.secondary' component="div" variant="body2">
                    @{props.user.username}
                </Typography>
                {
                    (!userProfile) &&
                    <Button
                        onClick={() => navigate(`/messenger/${props.user.username}/${chatid}`)}
                        aria-label="open drawer"
                        sx={{
                            display: 'flex',
                            // flexDirection: 'column',
                            justifyContent: 'space-between',
                            border: '1px solid',
                            borderColor: orange[300],
                            mt:2
                        }}
                    >
                        <Icon fontSize="medium">chat</Icon>
                        <Typography ml={1} variant="small" >Start Chat</Typography>
                    </Button>
                }
            </CardContent>
        </Card>
    );
}

export default ProfileCard;