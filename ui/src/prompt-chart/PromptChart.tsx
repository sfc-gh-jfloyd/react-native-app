import { BarChart } from '@mui/x-charts';
import { useQuery } from '@tanstack/react-query';
import { Box, CircularProgress } from '@mui/material';
import { getPromptChartBars } from './getPromptChartBars';

export interface PromptChartProps {
  prompt: string;
}

export const PromptChart = ({ prompt }: PromptChartProps) => {
  const { data: bars, isLoading } = useQuery({
    queryKey: ['promptChart', prompt],
    queryFn: () => getPromptChartBars(prompt),
  });

  const chartStyles = {
    height: 300,
    margin: { left: 80 },
  };
  const barColor = "#29B5E8";
  return (
    <Box sx={{ width: "100%", position: "relative", height: chartStyles.height }}>
     {bars ? (
      <BarChart
        series={[
          { data: bars.map(bar => Number(bar.value)), color: barColor },
        ]}
        xAxis={[{ data: bars.map(bar => bar.key), scaleType: 'band' }]}
        {...chartStyles}
      />
     ) : (
      <BarChart
        series={[
          { data: [10, 20, 30, 40, 50, 60, 70], color: barColor },
        ]}
        xAxis={[{ data: ['l', 'o', 'a', 'd', 'i', 'n', 'g'], scaleType: 'band' }]}
        {...chartStyles}
        sx={{ opacity: 0.3}}
      />
     )}
     {
      isLoading ? (
        <Box sx={{ transform: "translate(-50%,0)", position: "absolute", top: chartStyles.height/2, left: "50%" }}>
          <CircularProgress/>
        </Box>
      ) : null
     }
    </Box>
  );
};