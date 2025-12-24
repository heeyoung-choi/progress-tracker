import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css';
import './App.css'
import './ColorScale.css'
import data from './data.json'
function App() {

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
