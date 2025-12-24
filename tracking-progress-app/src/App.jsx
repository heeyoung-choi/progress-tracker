import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css';
import './App.css'
import './ColorScale.css'
import data from './data.json'
 import { neon } from '@netlify/neon';
function App() {

  const getDataInProduction = async () =>
  {
    console.log("Fetching from Netlify Function...");
    fetch('/netlify/functions/test')
    .then(res => console.log(res))
  // const response = await fetch('./get-data');
  // const dbData = await response.json();
  // console.log(dbData);
  return data;
  }
  const getDataInDev = async () => 
  {
    console.log("this is dev ")
    const response = await fetch('./get-data.js');
  const dbData = await response.json();
  console.log(dbData);
  return data;
  }


  const value = process.env.NODE_ENV === 'production' 
  ? getDataInProduction()
  : getDataInDev()

  return (
    <div className="App">
      <CalendarHeatmap
        startDate={new Date('2025-11-01')}
        endDate={new Date('2026-12-01')}
        values={data}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.count}`;
        }}
      />
    </div>
  )
}

export default App;
