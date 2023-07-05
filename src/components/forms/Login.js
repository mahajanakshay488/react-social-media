import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { userActions } from "../../store";


function Login() {

    const dispatch = useDispatch();
    const actions = bindActionCreators(userActions, dispatch);
    // const users = useSelector(state => state.users);

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        actions.login(credentials)
        .then(res =>{

            if(!res.notLogedin){
                console.log(res);
                localStorage.setItem('isAuth', true);
                localStorage.setItem('User', res.value);
                navigate('/all-blogs');
            }else{
                localStorage.setItem('isAuth', false);
            }
            
        })
        .catch(err => {
            console.log('Login Err',err);
        });
        
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <Box>
            <Typography color='text.primary' variant="h5" pb={2}>Login</Typography>

            <form onSubmit={handleSubmit} >
                <Stack spacing={2}>
                    <TextField
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        id="standard-basic"
                        label="Username"
                        variant="standard"
                    />
                    <TextField
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        id="standard-basic"
                        label="Password"
                        variant="standard"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size='large'
                    >
                        Login
                    </Button>
                </Stack>

            </form>
            
            <Link to='/signup'>
                <Typography color={'text.secondary'} mt={2}>
                    Don't Have An Account? Signup Here. 
                </Typography>
            </Link>
            
        </Box>
    );
}

export default Login;