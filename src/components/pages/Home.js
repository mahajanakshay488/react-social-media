import { Box, ImageListItem, ImageListItemBar } from "@mui/material";
import Login from "../forms/Login";

function Home() {

    return ( 
        <Box height={'100%'} display='flex' flexDirection={'column'} alignItems='center' >
          <Box
            width={{
              sm:  '400px',
              xs: '90%'
            }}
            m={4}
          >
            
          <Login/>
          </Box>

          <ImageListItem>
          <img
            src={`${'https://images.unsplash.com/photo-1551109078-c1b187669254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}?w=248&fit=crop&auto=format`}
            srcSet={`${'https://images.unsplash.com/photo-1551109078-c1b187669254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={'homeImage'}
            loading="lazy"
          />
          <ImageListItemBar
            title={'Think & Create'}
            subtitle={"Best Bloger"}
          />
        </ImageListItem>
        </Box>
     );
}

export default Home;