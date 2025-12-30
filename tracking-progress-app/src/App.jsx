import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css';
import './App.css'
import './ColorScale.css'
import Button from 'react-bootstrap/Button';
import data from './data.json'
 import { neon } from '@netlify/neon';
 import {useState, useEffect} from 'react'
 import 'bootstrap/dist/css/bootstrap.min.css';
import EdiText from 'react-editext';
import ISOToDate from './helper.jsx';
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
  const [square_data, setSquareData] = useState(null);
  const [editLock, setEditLock] = useState(false);
    const handleSave = (val) => {
    console.log('Edited Value -> ', val);
    setValue(val);
  };
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
  const handleMouseOverSquare = (value) =>{
    if (!editLock){
      setSquareData(value);
    }
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
      <div className="container">
        <h2>
          <Button className="edit-lock" onClick = {() => setEditLock(false)}>
            {
              editLock ? <i className ="fa-solid fa-lock" ></i> :
              <i className ="fa-solid fa-lock-open"></i>

            }            
          </Button>
          {!square_data? "no data yet" : `Hour(s) worked on ${ISOToDate(square_data.date)}:`}
        </h2>
        <EdiText type="text" value={!square_data? 0 : square_data.count} onSave={handleSave} />
      </div>
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
          onMouseOver = {(event, value) => {  console.log(value); handleMouseOverSquare(value); }}
          onClick = {(value) => setEditLock(true)}
        />
    </div>
  )
}

export default App;
