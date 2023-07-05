import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { userActions } from "../../store";

function Signup() {

    const dispatch = useDispatch();
    const actions = bindActionCreators(userActions, dispatch);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        name:'',
        username: '',
        password: ''
    });

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(credentials);
        actions.signup(credentials)
        .then(res =>{

            if(!res.notLogedin){
                localStorage.setItem('isAuth', true);
                navigate('/all-blogs');
            }else{
                localStorage.setItem('isAuth', false);
            }
            
        })
        .catch(err => {
            console.log('Login Err',err);
        });
    }

    const handleChange =(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return ( 
        <Box>
            <Typography color='text.primary' variant="h5" pb={2}>Signup</Typography>

            <form onSubmit={handleSubmit} >
                <Stack spacing={2}>
                    <TextField 
                        name="name" 
                        value={credentials.name}
                        onChange={handleChange}
                        id="standard-basic" 
                        label="Name" 
                        variant="standard" 
                    />
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
                        Signup
                    </Button>
                </Stack>
                
            </form>
            <Link to='/login'>
                <Typography color={'text.secondary'} mt={2}>
                    Already Have An Account? Login Here. 
                </Typography>
            </Link>
        </Box>
     );
}

export default Signup;