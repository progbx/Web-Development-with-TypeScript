import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Empower Your Journey with Our Solutions</h1>
        <p>Discover tools and services designed to streamline your life.</p>
        <button onClick={toggleMenu}>
          {isMenuOpen ? 'Close Menu' : 'Open Menu'}
        </button>
        {isMenuOpen && (
          <nav className="App-menu">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
};

export default App;
