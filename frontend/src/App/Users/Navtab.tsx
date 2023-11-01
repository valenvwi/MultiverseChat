import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

interface NavtabProps {
  onChangeTab: (tabValue: number) => void;
}

const Navtab = ({ onChangeTab }: NavtabProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onChangeTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", mb: "32px" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Exchange Hub" />
        <Tab label="Goal Match" />
      </Tabs>
    </Box>
  );
};

export default Navtab;
