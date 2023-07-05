import { Icon, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import PalleteMode from "../../forms/PalleteMode";
import { useSelector } from "react-redux";

function Sidebar() {

    const navigate = useNavigate();

    const path = useLocation().pathname;

    const users = useSelector(state => state.users);
    const user = users.user;

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
        <ListItemButton 
            onClick={()=>navigate('/messenger')}
            sx={
                (path.startsWith('/messenger'))
                    ? {bgcolor: blue[400], color: 'text.primary'}
                    :{color:'text.primary'}
            } 
        >
          <ListItemIcon>
            <Typography 
                color={
                    (path.startsWith('/messenger'))
                        ?'text.primary'
                        :''
                    }
                >
                <Icon>messenger</Icon>
            </Typography>
            
          </ListItemIcon>
          <ListItemText primary="Messenger" />
        </ListItemButton>
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