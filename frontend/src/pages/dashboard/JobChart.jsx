import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

// Dataset containing monthly job data
const dataset = [
  { job: 59, month: 'Jan' },
  { job: 60, month: 'Feb' },
  { job: 40, month: 'Mar' },
  { job: 60, month: 'Apr' },
  { job: 80, month: 'May' },
  { job: 75, month: 'June' },
  { job: 50, month: 'July' },
  { job: 45, month: 'Aug' },
  { job: 77, month: 'Sept' },
  { job: 55, month: 'Oct' },
  { job: 59, month: 'Nov' },
  { job: 99, month: 'Dec' },
];

// Function to format the job percentage values
function valueFormatter(value) {
  return `${value}%`;
}

// Chart settings
const chartSetting = {
  yAxis: [
    {
      label: 'Job (%)',
    },
  ],
  width: 550,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-10px, 0)',
    },
  },
};

// Main component rendering the bar chart
export default function JobChart() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'job', label: 'job', valueFormatter },
      ]}
      {...chartSetting}
      width={500}
      height={400}
      colors={['#635bff']}
    />
  );
}
