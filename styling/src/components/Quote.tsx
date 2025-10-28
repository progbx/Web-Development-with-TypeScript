import React from "react";

interface QuoteProps {
    text: string;
    author: string;
}

const Quote: React.FC<QuoteProps> = ({ text, author }) => {
    return (
        <>
            {/* PLEASE DON'T DELETE EXISTONG CODE */}
            <div
                className="quote-component"
                style={{
                    backgroundColor: '#4299e1',
                    borderRadius: '0.25rem',
                    padding: '1.25rem',
                }}
            >
                <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
                    "{text}"
                </p>
                <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
                    - {author}
                </p>
            </div>
        </>
    );
};

export default Quote;
