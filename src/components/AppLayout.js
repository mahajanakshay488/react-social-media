import { Box, Stack, styled, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
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
    bottom: 20,
    left: 20,
    margin: '0 auto',
    display: 'flex',
    [(theme.breakpoints.down('sm'))]: {
        display: 'none'
    }
}));


function AppLayout() {

    const theme = useTheme();
    let path = useLocation().pathname;

    return (
        <>
            <Navbar />

            <Stack bgcolor={(theme.palette.mode === 'dark')?theme.palette.grey[900]:theme.palette.grey[200]} direction={'row'} spacing={{
                md: 2,
                sm: 0
            }}
            >
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
                        sm: 0,
                        md:2
                    }}
                    flex={6}
                    className='backLayer'
                >
                    <Routers />
                </Box>

                <RightBox display={(path.startsWith('/messenger')?'none':'flex')} className="rightbox"  >
                    <Rightbar />
                </RightBox>
            </Stack>

            {
            (!path.includes('/messenger'))
            ?
            <StyledBox
            display={(path.startsWith('/messenger'))?'none':'flex'}
            >
                <AddPost size='medium' />
            </StyledBox>
            :
            <></>
            }

            <Mobilebar />
        </>
    )
}

export default AppLayout;