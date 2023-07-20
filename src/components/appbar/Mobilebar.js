import { AppBar, Badge, Button, ButtonGroup, Icon, styled, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { displayMobileView } from "../../styles/responsiveStyle";
import AddPost from "../posts/AddPost";
import { useTheme } from "@emotion/react";
import { grey } from "@mui/material/colors";

function Mobilebar() {

  const navigate = useNavigate();
  const path = useLocation().pathname;
  const theme = useTheme();

  const state = useSelector(state => state);
  const users = state.users;
  const notifications =state.notifys.notifications;

  const StyledFab = styled(ButtonGroup)({
    position: 'absolute',
    zIndex: 1,
    top: -45,
    left: 10,
    right: 0,
    margin: '0 auto',
    // translate: ('-25px')
  });

  return (

    <AppBar position="fixed" color='background' sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
        ...displayMobileView
      }
      }>

        {
          (!path.includes('/messenger'))
            ?
            <StyledFab color="secondary" aria-label="add">
              <AddPost size='small' />
            </StyledFab>
            :
            <></>
        }


        <Button
          onClick={() => navigate('/new')}
          color={(path === '/new') ? 'primary' : 'inherit'}
          aria-label="open drawer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1
          }}
        >
          <Icon fontSize="medium">thumb_up</Icon>
          <Typography variant="small" >New</Typography>
        </Button>

        <Button
          onClick={() => navigate('/all-blogs')}
          color={(path === '/all-blogs') ? 'primary' : 'inherit'}
          aria-label="open drawer"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1
          }}
        >
          <Icon fontSize="medium">feed</Icon>
          <Typography variant="small" >Feed</Typography>
        </Button>

        {
          (users.isAuth) ?
            <>
              <Button
                onClick={() => navigate('/')}
                color={(path === '/') ? 'primary' : 'inherit'}
                aria-label="open drawer"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1
                }}
              >
                <Icon fontSize="medium">group</Icon>
                <Typography variant="small" >Blogers</Typography>
              </Button>

              <a 
          style={{color: (theme.palette.mode === 'dark')? grey[100]:grey[900]}} 
          href="http://localhost:4200/messenger"
          target="_blank"
        >
          <Button
                aria-label="open drawer"
                color="inherit"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1
                }}
              >
                <Badge badgeContent={(notifications) ? notifications.length : null} color="error">
                <Icon fontSize="medium">messenger</Icon>
                </Badge>
                
                <Typography variant="small" >Messenger</Typography>
              </Button>
        </a>
              
            </>
            :
            <Button
              onClick={() => navigate('/')}
              color={(path === '/') ? 'primary' : 'inherit'}
              aria-label="open drawer"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1
              }}
            >
              <Icon fontSize="medium">login</Icon>
              <Typography variant="small" >Login</Typography>
            </Button>
        }


      </Toolbar>
    </AppBar>



  );
}

export default Mobilebar;