import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css';
import './App.css'
import './ColorScale.css'
import Button from 'react-bootstrap/Button';
import data from './data.json'
 import { neon } from '@netlify/neon';
 import {useState, useEffect} from 'react'
 import 'bootstrap/dist/css/bootstrap.min.css';

function convertKey(arr)
{
  const a = arr
  a.forEach(obj => {
    obj["date"] = obj["log_date"];
    delete obj["log_date"];
    obj["count"]  = obj["entry_count"];
    delete obj["entry_count"];
  })
  return a
}
function App() {
  const [dataSource, setDataSource] = useState(true);
  const [my_data, setData] = useState(null);
  const handleClick = () => 
  {
    fetch(!dataSource ? `/.netlify/functions/worklogger` : `/.netlify/functions/test`)
      .then(res => res.json())
      .then(res => {
        // 2. Use the setter to save the data
        console.log(res)
        const converted = convertKey(res)
        setData(converted);
      })
    setDataSource(!dataSource);

  }
  useEffect(() => {
    fetch(dataSource ? `/.netlify/functions/worklogger` : `/.netlify/functions/test`)
      .then(res => res.json())
      .then(res => {
        // 2. Use the setter to save the data
        console.log(res)
        const converted = convertKey(res)
        setData(converted);
      });
  }, []);

  return (
    <div className="App">
    <Button variant={dataSource ? "primary" : "secondary"}
     onClick={handleClick}
     >
      {dataSource ? "real data" : "test data"}
    </Button>
      <CalendarHeatmap
        startDate={new Date('2025-11-01')}
        endDate={new Date('2026-12-01')}
        values={
          my_data ? my_data : []
        }
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
