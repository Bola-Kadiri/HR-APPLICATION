import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts/PieChart';

// Data with custom colors for each segment
const mobileAndDesktopOS = [
  { label: 'Accept', value: 60, color: '#fb9c0c' },
  { label: 'Reject', value: 40, color: '#635bff' },
];

const valueFormatter = (value) => `${value}%`;

export default function PieAnimation() {
  const [radius, setRadius] = React.useState(50);
  const [skipAnimation, setSkipAnimation] = React.useState(false);
  

  const handleRadiusChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setRadius(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <PieChart
        height={250}
        series={[
          {
            data: mobileAndDesktopOS,
            innerRadius: radius,
            arcLabel: (params) => params.label ?? '',
            arcLabelMinAngle: 50,
            valueFormatter,
            color: ({ dataIndex }) => mobileAndDesktopOS[dataIndex].color,
            // Customize label font size
            arcLabelStyle: {
              fontSize: '12px', // Adjust font size as desired
              fontWeight: 'bold',
            },
          },
        ]}
        skipAnimation={skipAnimation}
      />
      <FormControlLabel
        checked={skipAnimation}
        control={<Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />}
        label="Skip Animation"
        labelPlacement="end"
      />

      <Typography id="input-radius" gutterBottom>
        Radius
      </Typography>
      <Slider
        value={radius}
        onChange={handleRadiusChange}
        valueLabelDisplay="auto"
        min={15}
        max={100}
        aria-labelledby="input-radius"
      />
    </Box>
  );
}
