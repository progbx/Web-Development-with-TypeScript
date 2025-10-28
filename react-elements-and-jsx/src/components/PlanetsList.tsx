import './PlanetsList.css';

function PlanetsList() {
  const planets = [
    'Mercury',
    'Venus', 
    'Earth',
    'Mars',
    'Jupiter',
    'Saturn',
    'Uranus',
    'Neptune'
  ];

  return (
    <ul className="planets-list">
      {planets.map((planet, index) => (
        <li key={index}>{planet}</li>
      ))}
    </ul>
  );
}

export default PlanetsList;
