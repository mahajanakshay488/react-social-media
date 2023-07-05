import { AppBar, Avatar, Box, Button, Icon, IconButton, Menu, MenuItem, Stack, styled, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { userActions } from "../../store";
import { hideMobileView, } from "../../styles/responsiveStyle";
import PalleteMode from "../forms/PalleteMode";

function Navbar() {

    const navigate = useNavigate();
    const path = useLocation().pathname;

    const dispatch = useDispatch();
    const actions = bindActionCreators(userActions, dispatch);
    const users = useSelector(state => state.users);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        // actions.checkAuth()
        // .then(res =>{
        //     console.log(res);
        // })
        // .catch(err => console.log('checkAuth', err));
        actions.profile()
        .then(res=>{
            console.log(res);
            if(res.status === 'fail'){
                actions.setAuth(false);
            }else{
                actions.setAuth(true);
            }
        })
        .catch(err=>console.log(err));
    }, []);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        handleClose();
        actions.logout()
            .then(res => {
                localStorage.removeItem('isAuth');
                navigate('/');
            })
            .catch(err => {
                console.log('logout error', err);
            });
    }

    const TabBox = styled(Box)(({ theme }) => ({
        display: 'none',

        [theme.breakpoints.down('md')]: {
            display: 'flex'
        }
    }));

    const DeskBox = styled(Box)(({ theme }) => ({
        display: 'none',

        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    }));

    const notLoginStack = (
        <Stack direction='row' >

            <Button
                onClick={() => navigate('/signup')}
                color={(path === '/signup') ? 'primary' : 'inherit'}
                variant={(path === '/signup') ? "contained" : ''}
                startIcon={<Icon>feed</Icon>}
                size='small'
            >
                Signup
            </Button>

            <Button
                onClick={() => navigate('/')}
                color={(path === '/') ? 'primary' : 'inherit'}
                variant={(path === '/') ? "contained" : ''}
                startIcon={<Icon>feed</Icon>}
                size='small'
            >
                Login
            </Button>

        </Stack>
    );

    const isLoginStack = (
        <Box>
            <Button
                onClick={() => navigate('/new')}
                color={(path === '/new') ? 'primary' : 'inherit'}
                variant={(path === '/new') ? "contained" : ''}
                startIcon={<Icon>thumb_up</Icon>}
                size='small'
            >
                New
            </Button>
            <Button
                onClick={() => navigate('/messenger')}
                color={(path === '/messenger') ? 'primary' : 'inherit'}
                variant={(path === '/messenger') ? "contained" : ''}
                startIcon={<Icon>messenger</Icon>}
                size='small'
            >
                Messenger
            </Button>
            <Button
                onClick={() => navigate('/all-blogs')}
                color={(path === '/all-blogs') ? 'primary' : 'inherit'}
                variant={(path === '/all-blogs') ? "contained" : ''}
                startIcon={<Icon>feed</Icon>}
                size='small'
            >
                Feed
            </Button>

            <Button
                onClick={() => navigate('/all-blogs')}
                color={(path === '/all-blogers') ? 'primary' : 'inherit'}
                variant={(path === '/all-blogers') ? "contained" : ''}
                startIcon={<Icon>group</Icon>}
                size='small'
            >
                Blogers
            </Button>

        </Box>
    )

    return (
        <AppBar position="sticky">
            <Toolbar
            // sx={{
            //     backgroundColor:{
            //         xs: theme.palette.grey[100],
            //         sm: theme.palette.primary.main
            //     },
            //     color:{
            //         xs: theme.palette.grey[900],
            //         sm: theme.palette.grey[100]
            //     }
            // }}
            >
                <DeskBox
                    component='div'
                    width='100%'
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                >

                    <Box display='flex' alignItems='center'>
                        <Icon fontSize="large" >cruelty_free</Icon>
                        <Typography variant="h6" ml={1}>Blogs</Typography>
                    </Box>

                    <Box>
                        {
                            (users.isAuth)
                                ?
                                ''
                                :
                                notLoginStack
                        }

                    </Box>

                </DeskBox>

                <TabBox
                    component='div'
                    width='100%'
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                >

                    <Box display='flex' alignItems='center'>
                        <Icon fontSize="large" >cruelty_free</Icon>
                        <Typography variant="h6" ml={1}>Blogs</Typography>
                    </Box>

                    <Box
                        display='flex'
                        alignItems='center'
                        sx={{ ...hideMobileView }}
                    >
                        {
                            (users.isAuth)
                                ?
                                isLoginStack
                                :
                                notLoginStack
                        }
                    </Box>

                </TabBox>
                {
                    (users.isAuth)?
                <Box pl={2}>
                    <Avatar
                        src={`http://localhost:5000/${users.user.profilepic}`}
                        sx={{ cursor: 'pointer' }}
                        onClick={handleClick}
                    />
                </Box>
                :''
                
                }
                <Menu
                    sx={{ marginTop: '30px' }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem
                        onClick={logout}
                    >
                        <IconButton

                            size="small"
                            aria-label="show 4 new mails"
                            color="inherit"
                        >

                            <Icon>logout</Icon>

                        </IconButton>
                        <p>Logout</p>
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            handleClose();
                            navigate('/user-profile');
                        }}
                    >
                        <IconButton

                            size="small"
                            aria-label="show 4 new mails"
                            color="inherit"
                        >

                            <Icon>person</Icon>

                        </IconButton>
                        <p>Profile</p>
                    </MenuItem>
                    <PalleteMode/>
                </Menu>
                        
            </Toolbar>

        </AppBar>
    );
}

export default Navbar;