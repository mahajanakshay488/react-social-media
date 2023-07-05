import { AppBar, Button, ButtonGroup, Icon, styled, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { displayMobileView } from "../../styles/responsiveStyle";
import AddPost from "../posts/AddPost";

function Mobilebar() {

  const navigate = useNavigate();
  const path = useLocation().pathname;

  const users = useSelector(state => state.users);

  const StyledFab = styled(ButtonGroup)({
    position: 'absolute',
    zIndex: 1,
    top: -60,
    left: 15,
    right: 0,
    margin: '0 auto',
    // translate: ('-25px')
  });

  return (

      <AppBar position="fixed" color='background' sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{
        display:'flex',
        justifyContent:'space-between',
        ...displayMobileView}
      }>

       <StyledFab color="secondary" aria-label="add">
          <AddPost size='medium' />
        </StyledFab>

        <Button 
          onClick={() => navigate('/new')}
          color={(path === '/new') ? 'primary' : 'inherit'}
          aria-label="open drawer"
          sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
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
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            flexGrow: 1
          }}
         >
           <Icon fontSize="medium">feed</Icon>
            <Typography variant="small" >Feed</Typography>
        </Button>

          {
            (users.isAuth)?
            <Button 
            onClick={() => navigate('/')}
            color={(path === '/') ? 'primary' : 'inherit'}
            aria-label="open drawer"
            sx={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'space-between',
              flexGrow: 1
            }}
           >
             <Icon fontSize="medium">group</Icon>
              <Typography variant="small" >Blogers</Typography>
          </Button>
          :
          <Button 
            onClick={() => navigate('/')}
            color={(path === '/') ? 'primary' : 'inherit'}
            aria-label="open drawer"
            sx={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'space-between',
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