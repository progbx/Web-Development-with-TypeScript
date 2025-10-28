import React from "react";

import "./App.css";

import Quote from "./components/Quote";
import Input from "./components/Input";
import styled from "styled-components";
import Card from "./components/Card";

// Styled-components definitions
const StyledShowcase = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 1rem;
    padding: 1rem;
    box-sizing: border-box;
`;

const StyledProduct = styled.div`
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1rem;
    box-sizing: border-box;
    text-align: center;
`;

const StyledName = styled.h2`
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 0.5rem;
`;

const StyledPrice = styled.p`
    color: #888;
    margin-bottom: 1rem;
`;

const StyledButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #0056b3;
    }
`;

const App: React.FC = () => {
    return (
        <section className="App">
            <h1>Styling Task</h1>

            <section className="section">
                <h2>1. Inline styling</h2>

                <div>
                    <h3>Quote component: </h3>
                    <Quote
                        text="The only limit to our realization of tomorrow is our doubts of today."
                        author="Franklin D. Roosevelt"
                    />
                </div>
            </section>

            <section className="section">
                <h2>2. CSS modules</h2>

                <div>
                    <h3>Input component: </h3>

                    <Input id="test-input" labelText="Test Input" />
                </div>
            </section>

            <section className="section styled-components-section">
                <h3>3. Styled Components</h3>

                <div>
                    <StyledShowcase>
                        <StyledProduct>
                            <StyledName>Product Name</StyledName>
                            <StyledPrice>Product Price</StyledPrice>
                            <StyledButton>Buy Now</StyledButton>
                        </StyledProduct>
                    </StyledShowcase>
                </div>
            </section>

            <section className="section tailwind-section">
                <h3>4. Tailwind</h3>

                <div className="tailwind-section-wrapper">
                    <Card />
                </div>
            </section>
        </section>
    );
};

export default App;
