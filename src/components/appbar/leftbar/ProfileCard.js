import { Avatar, Box, Card, CardContent, Icon, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../../store";



function ProfileCard(props) {
    const { userProfile } = props;
    // const users = useSelector(state => state.users);

    const dispatch = useDispatch();
    const actions = bindActionCreators(userActions, dispatch);
    // const users = useSelector(state => state.users);
    const refs = useRef(null);

    const uploadAvatar = () => {
        refs.current.click();
    }

    const selectFile = (e) => {
        let imgfile = e.target.files[0];
        const formData = new FormData();
        formData.append('imgfile', imgfile);
        console.log(imgfile);

        actions.updateProfilepic(formData)
        .then(res =>{
            console.log(res);
        })
        .catch(err => console.log(err));
    }

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
                            src={'http://localhost:5000/'+props.user.profilepic}
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
                        src={'http://localhost:5000/'+props.user.profilepic}
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
            </CardContent>
        </Card>
    );
}

export default ProfileCard;