import react, { useState, useEffect } from 'react';
import { AppRoutes } from 'react-router-dom';
import axios from 'axios';

//import "./App.css"
const API_URL='http://localhost:3001';

const BookList =({books, onSelect}) => (
    <div className='book-list'>
        <h2>Books</h2>
        <ul>
            {books.map((book) => (
                <li key={book.id} onClick={() => onSelect(book)}>
                    {book.tittle} by {book.author}
                </li>
            ))}
        </ul>
    </div>
);
const AdminDashboard= ({token}) => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({title: '', author:''});
    const [updateBook, setUpdateBook] = useState({id:'', title:'', author:''});
    const [deleteBookId, setDeleteBookId] = useState('');

    useEffect(()=>{
        fetchBooks();
    }, []);

    const fetchBooks = async () =>{
        try {
            const response = await axios.get(`${API_URL}/books`,{
                headers: {Authorization: token},
            });
            setBooks(response.data);
        } catch (err){
            console.error('Error fetching books:', err)
        }
    };

    const addBook = async()=>{
        try {
            await axios.post(`${API_URL}/books`, newBook, {
                headers: {Authorization: token},
            });
            setNewBook({title:'', author: ''});
            fetchBooks();
        } catch (err) {
            console.error('Error adding book:', err)
        }
    };

    const updateBookDetails = async () =>{
        try {
            await axios.put(`${API_URL}/books/${updateBook.id}`, updateBook, {
                headers: {Authorization: token},
            });
            setUpdateBook({id: '',title: '', author:''});
            fetchBooks();
        } catch (err){
            console.error('Error updating book:', err);
        }
    };

    const deleteBook = async ()=>{
        try {
            await axios.delete(`${API_URL}/books/${deleteBook}`, {
                headers: {Authorization: token},
            });
            setDeleteBookId('');
            fetchBooks();           
        } catch (err){
            console.error('Error deleting book: ', err);
        }
    };

    return (
        <div>
            <h2>Welcome Administrator</h2>
            <BookList books={books} onSelect={(book) => console.log('Selected Book:', book)}/>
                <h3>Add New Book</h3>
                <input 
                    type='text'
                    placeholder='Title'
                    value ={newBook.title}
                    onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                />

                <input
                type='text'
                placeholder='Author'
                value={newBook.author}
                onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                />

                <button onClick={addBook}>Add Book</button>

                <h3>Update Book</h3>
                <input
                type='number'
                placeholder='Book ID'
                value={updateBook.id}
                onChange={(e) => setUpdateBook({...updateBook, id: e.target.value})}
                />
                <input
                type="text"
                placeholder="Title"
                value={updateBook.title}
                onChange={(e) => setUpdateBook({ ...updateBook, title: e.target.value })}
                />
                <input
                type="text"
                placeholder="Author"
                value={updateBook.author}
                onChange={(e) => setUpdateBook({ ...updateBook, author: e.target.value })}
                />

                <button onClick={updateBookDetails}>Update Book</button>

                <h3>Delete a Book</h3>
                <input
                type="number"
                placeholder="Book ID"
                value={deleteBookId}
                onChange={(e) => setDeleteBookId(e.target.value)}
                />
                <button onClick={deleteBook}>Delete Book</button>
                </div>
        );
};

export default AdminDashboard;
