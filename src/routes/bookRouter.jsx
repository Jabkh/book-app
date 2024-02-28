import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BookList from '../components/BookList';
import BookDetails from '../components/BookDetails';

function BookRouter() {
  return (
    <Routes>
      <Route path="/" element={<BookList/>} />
      <Route path="/:id" element={<BookDetails/>} />
    </Routes>
  );
}

export default BookRouter;
