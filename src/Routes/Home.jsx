import React, { useEffect } from 'react';
import { useGlobalContext } from '../Components/utils/global.context';
import Card from '../Components/Card';

const Home = () => {
  const { state, dispatch } = useGlobalContext(); 
  const { theme, dentists } = state;

  useEffect(() => {
    const fetchDentists = async () => {
      const response = await fetch('https://api.example.com/dentists');
      const data = await response.json();
      dispatch({ type: 'SET_DENTISTS', payload: data });
    };

    if (dentists.length === 0) {
      fetchDentists();
    }
  }, [dentists, dispatch]);

  return (
    <main className={`home-container ${theme}`}>
      <h1>Home</h1>
      <div className='card-grid'>
        {/* Aquí renderizamos las tarjetas */}
        {dentists.map((dentist) => (
          <Card key={dentist.id} dentist={dentist} />
        ))}
      </div>
    </main>
  );
};

export default Home;
