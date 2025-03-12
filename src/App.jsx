import './App.css'
import { useState, useEffect } from 'react';
import Header from './components/Header/Header'
import supabase from './SupabaseClient.jsx';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        const { data, error } = await supabase.from("CPU").select();

        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setData(data);
          // console.log(`Retrieved data: ${data}`);
        }
      };
    fetchData();
  }, []);

  function Body() {
    const handleClick = (e) => {
      e.preventDefault();
      // fetchData();
    }

    return (
      <main>
        <h2>Build a new pc!</h2>
        <button onClick={handleClick}>Start</button>
        <div>
          <h3>Data from Supabase:</h3>
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.model}</li>
            ))}
          </ul>
        </div>
      </main>
    )
  }

  return (
    <>
      <Header />
      <Body />
    </>
  )
}

export default App
