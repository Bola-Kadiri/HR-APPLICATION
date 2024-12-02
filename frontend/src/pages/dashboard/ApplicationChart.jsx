
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

// Dataset containing monthly rainfall data for different cities
const dataset = [
  { application: 59,  month: 'Jan' },
  {  application: 60,  month: 'Feb' },
  {  application: 40,   month: 'Mar' },
  { application: 60,   month: 'Apr' },
  {  application: 80,  month: 'May' },
  {  application: 75,   month: 'June' },
  {  application: 50,   month: 'July' },
  {  application: 45,   month: 'Aug' },
  {  application: 77,   month: 'Sept' },
  {  application: 55,   month: 'Oct' },
  {  application: 59,  month: 'Nov' },
  {  application: 99,  month: 'Dec' },
];

// Function to format the rainfall values
function valueFormatter(value) {
  return `${value}%`;
}

// Chart settings
const chartSetting = {
  yAxis: [
    {
      label: 'Application (%)',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-10px, 0)',
    },
  },
};

// Main component rendering the bar chart
export default function Application() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'application', label: 'application', valueFormatter },
      
      
      ]}
      {...chartSetting}
      width={550}
      height={400}
    />
  );
}
