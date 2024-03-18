import React, { useEffect, useState } from 'react';

export default function App() {
  return (
    <div className="app">
      <GetQuotes />
    </div>
  );
}

function GetQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState({
    text: 'Keep moving forward',
    author: 'Barbie',
  });

  useEffect(() => {
    async function getRandomQuotes() {
      try {
        const res = await fetch(`https://type.fit/api/quotes`);
        if (!res.ok) {
          throw new Error('Failed to fetch quotes');
        }
        const data = await res.json();
        setQuotes(data);
      } catch (error) {
        console.error('Error fetching quotes:', error.message);
        setQuotes([]);
      }
    }
    getRandomQuotes();
  }, []);

  const handleQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote({
      text: quotes[randomIndex]?.text,
      author: quotes[randomIndex]?.author || 'Anonymous',
    });
  };

  return (
    <div className="quote-container">
      <>
        <p className="quote">{currentQuote.text}</p>
        <p className="author">- {currentQuote.author}</p>
      </>

      <button className="btn" onClick={handleQuote}>
        New Quote
      </button>
    </div>
  );
}
