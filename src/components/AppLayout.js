import { Box, Stack, styled, useTheme } from "@mui/material";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Routers from "../router/Routers";
import Navbar from "./appbar/Navbar";
import Leftbar from "./appbar/leftbar/Leftbar";
import Rightbar from "./appbar/rightbar/Rightbar";
import AddPost from "./posts/AddPost";
import Mobilebar from "./appbar/Mobilebar";


const RightBox = styled(Box)(({ theme }) => ({
    flex: 3.5,
    height: '100%',
    [theme.breakpoints.down('xl')]: {
        flex: 3
    },
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}))

const LeftBox = styled(Box)(({ theme }) => ({
    // flex: 2,
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const StyledBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    left: 30,
    margin: '0 auto',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));


function AppLayout() {

    const theme = useTheme();
    let path = useLocation().pathname;

    return (
        <>
            <Navbar />

            <Stack bgcolor={theme.palette.background.paper} direction={'row'} spacing={{
                md: 2,
                sm: 0
            }}>
                <LeftBox flex={(path.startsWith('/messenger')?1:1.6)} bgcolor={theme.palette.background.paper} >
                    <Leftbar />
                </LeftBox>
                <Box
                    alignItems={'center'}
                    width={'100%'}
                    height={'91vh'}
                    overflow={'auto'}
                    p={{
                        xs: 0,
                        sm: 0
                    }}
                    flex={6} bgcolor={theme.palette.background.paper}
                    className='backLayer'
                >
                    <Routers />
                </Box>

                <RightBox display={(path.startsWith('/messenger')?'none':'flex')} className="rightbox" bgcolor={theme.palette.background.paper} >
                    <Rightbar />
                </RightBox>
            </Stack>

            {
            (!path.startsWith('/messenger'))
            ?
            <StyledBox>
                <AddPost size='large' />
            </StyledBox>
            :
            <></>
            }

            <Mobilebar />
        </>
    )
}

export default AppLayout;