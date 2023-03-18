import { useState, useEffect } from "react";
import axios from 'axios';

const GetFactories =  () => {
  const [factories, setfactories] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/factory").then((response) => {
    setfactories(response.data)
  });
  }, []);  

  return (
    <div>
      <ul>
        {
          factories.map(factory => <li key={factory.id.toLocaleString()}>{factory.address.toLocaleString()}{" - "}{factory.name.toLocaleString()}</li>)
        }
      </ul>
    </div>
  )
}

const App = () => {
  return <GetFactories />
}

export default App;

