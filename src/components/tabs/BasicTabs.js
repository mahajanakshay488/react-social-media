import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Login from "../forms/Login";
import Signup from "../forms/Signup";
import Tabpanel from "./Tabpanel";

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
function BasicTabs() {
    const [value, setValue] = useState(1);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
      <AppBar color="grey" position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
        <Tabpanel value={value} index={0}>
          <Signup/>
        </Tabpanel>
        <Tabpanel value={value} index={1}>
          <Login/>
        </Tabpanel>
      </Box>
    );
}

export default BasicTabs;