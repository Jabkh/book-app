import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://openlibrary.org/subjects/science_fiction.json?limit=20');
        setBooks(response.data.works);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container">
      <h2>Liste des livres</h2>
      <div className="row">
        {books.map(book => (
          <div key={book.key} className="col-md-3 mb-4">
            <Link to={`${book.key.replace('/works/', '')}`} className="text-decoration-none">
              <div className="card">
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                  className="card-img-top"
                  alt="Couverture du livre"
                />
                <div className="card-body">
                  <p className="card-text">{book.title}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
