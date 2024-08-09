import React, { useState, useEffect } from 'react';
import { getBooks } from '../api';
import BookList from '../components/BookList';

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(response => setBooks(response.data));
  }, []);

  return (
    <div>
      <BookList books={books} />
    </div>
  );
};

export default HomePage;
