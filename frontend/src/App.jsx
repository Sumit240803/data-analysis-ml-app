
import { useState } from 'react'
import './App.css'
import SimpleBarChart from './components/Barcharts/BarChart'
import axios from "axios"
import StackedBarChart from './components/Barcharts/Stackbarchart'
import SimpleLineChart from './components/Linecharts/SimplelineChar'
import BasicPie from './components/Piecharts/Piecharts'

function App() {
  const[file,setFile] = useState(null);
  const [columns , setColumns ] = useState([]);
  const handleFileChange =(event)=>{
    setFile(event.target.files[0]);
  }  
  const handleSubmit = async(event)=>{
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    try {
      
      const response = await axios.post('http://127.0.0.1:5000/get-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from server:', response.data);
      setColumns(response.data.columns)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>

    <input type="file" name="file" onChange={handleFileChange} id="file" />
    <button type='submit'>Submit</button>
    </form>
    {columns.length>0 && columns.map((column)=>(
      <div key={column}>
        {column}
      </div>
    ))}
      <SimpleBarChart/>
     
      <BasicPie/>
      <SimpleLineChart/>
    </>
  )
}

export default App
