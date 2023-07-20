import { Badge, Icon, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import PalleteMode from "../../forms/PalleteMode";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";

function Sidebar() {

    const navigate = useNavigate();

    const path = useLocation().pathname;
    const theme = useTheme();
  
    const state = useSelector(state => state);
    const users = state.users;
    const user = users.user;
    const notifications =state.notifys.notifications;

    return (
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Accesable Menu
          </ListSubheader>
        }
      >

        <ListItemButton 
            onClick={()=>navigate('/all-blogs')}
            sx={
                (path.startsWith('/all-blogs'))
                    ? {bgcolor: blue[400], color: 'text.primary'}
                    :{color:'text.primary'}
            } 
        >
          <ListItemIcon>
            <Typography 
                color={
                    (path.startsWith('/all-blogs'))
                        ?'text.primary'
                        :''
                    }
                >
                <Icon>feed</Icon>
            </Typography>
            
          </ListItemIcon>
          <ListItemText primary="Feed" />
        </ListItemButton>
        {
        (users.isAuth)?
        <a 
          style={{color: (theme.palette.mode === 'dark')? grey[100]:grey[900]}} 
          href="http://localhost:4200/messenger"
          target="_blank"
        >
        <ListItemButton >
          
          <ListItemIcon>
          
          <Badge badgeContent={(notifications) ? notifications.length : null} color="error">
            <Typography 
                >
                <Icon>messenger</Icon>
            </Typography>
          </Badge>
          </ListItemIcon>
          <ListItemText primary="Messenger" />
        </ListItemButton>
        </a>
        :<></>
        }
        <ListItemButton
        sx={{color:'text.primary'}}
        >
          <ListItemIcon>
            <Icon>group</Icon>
          </ListItemIcon>
          <ListItemText primary="Blogers" />
        </ListItemButton>
        <PalleteMode/>
      </List>
    );
  }

export default Sidebar;