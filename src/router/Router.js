import { Box, Stack, styled, useTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Mobilebar from "../components/appbar/Mobilebar";
import Navbar from "../components/appbar/Navbar";
import AddPost from "../components/posts/AddPost";
import Rightbar from "../components/appbar/rightbar/Rightbar";
import Routers from "./Routers";
import Leftbar from "../components/appbar/leftbar/Leftbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { postActions } from "../store";
import AppLayout from "../components/AppLayout";


// const RightBox = styled(Box)(({theme})=>({
//     flex: 3.5,
//     height: '100%',
//     [theme.breakpoints.down('xl')]:{
//         flex: 3
//     },
//     [theme.breakpoints.down('md')]:{
//         display: 'none'
//     }
// }))

// const LeftBox = styled(Box)(({theme})=>({
//     flex: 2,
//     [theme.breakpoints.down('md')]:{
//       display: 'none'
//     }
// }));

// const StyledBox =styled(Box)(({theme})=>({
//     position: 'absolute',
//     zIndex: 1,
//     bottom: 30,
//     left: 30,
//     margin: '0 auto',
//     display: 'flex',
//     [theme.breakpoints.down('sm')]:{
//      display:'none'
//     }
//   }));

 

function Router() {

    const theme = useTheme();

    return ( 
        <BrowserRouter>

            <AppLayout />
            {/* <Navbar />

            <Stack bgcolor={theme.palette.background.paper}  direction={'row'} spacing={{
                md:2,
                sm:0
                }}>
                <LeftBox bgcolor={theme.palette.background.paper} >
                    <Leftbar/>
                </LeftBox>
                <Box
                alignItems={'center'}
                width={'100%'} 
                height={'91vh'} 
                overflow={'auto'} 
                p={{
                    xs:0,
                    sm:0
                }}
                 flex={6} bgcolor={theme.palette.background.paper}
                    className='backLayer'
                >
                    <Routers/>
                </Box>

                <RightBox className="rightbox" bgcolor={theme.palette.background.paper} >
                    <Rightbar/>
                </RightBox>
            </Stack>
            
            <StyledBox>
                <AddPost size='large' />
            </StyledBox>
            
                <Mobilebar /> */}
            
        </BrowserRouter>
     );
}

export default Router;