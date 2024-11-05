import { Box,  Typography } from '@mui/material';
import { PromptSelector } from '../prompt-chart/PromptSelector';
import { PromptChart } from '../prompt-chart/PromptChart';

export const HomePage = () => (
  <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 4, margin: 4 }}>
    <Typography variant="h3">
      Example React Snowflake Native App
    </Typography>
    <Typography>
      Replace this example with your own code!
    </Typography>
    <PromptSelector>
      {prompt => prompt ? <PromptChart prompt={prompt}/> : null}   
    </PromptSelector>
  </Box>
);
