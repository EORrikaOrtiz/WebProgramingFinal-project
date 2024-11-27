import react, {useState} from 'react';
//import './App.css';

function Admistrator(){
    const [books, setBooks] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [loginData, setLoginData] = useState ({username: '', password:''});
    const [errorMessage, setErrorMesage] = useState('');

    const adminUsername = 'admin';
    const adminPassword = 'password123';

    const handleLogin = () => {
        if (loginData.username === adminUsername && loginData.password === adminPassword){
            setIsAdmin(true);
            setErrorMesage('');
        } else {
            setErrorMesage('Invalid username or password');
        }
    };
    const handleLogout = () => {
        setIsAdmin(false);
        setLoginData ({username: '', password: ''});
    };

    const addBook = (newBook) => {
        setBooks([...books, newBook]);        
    };

    const updateBook = (updateBook) => {
        setBooks(books.map(book => (book.id === updateBook.id ? updateBook : book)));
    };

    const deleteBook = (id) =>{
        setBooks(books.filter(book => (book.id !== id )));     
    };

    const searchBooks = () => {
        return books.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.pubicationDate.includes(searchQuery)
        );
    };
    const renderBookList =() =>{
        return searchBooks().map(book =>(
          <div key= {book.id} className='book-item' onClick={() => setSelectedBook(book)}>
            <img src={book.coverImage} alt = {book.title}/>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            </div>  
        ));
    };
    const renderBookDetails = ()=>{
        if (!selectedBook) return null;
        return(
            <div className='book-details'>
                <h2>{selectedBook.title}</h2>
                <p><strong>Author:</strong>{selectedBook.author}</p>
                <p><strong>Description:</strong>{selectedBook.description}</p>
                <p><strong>Pubication Date:</strong>{selectedBook.pubicationDate}</p>
                <img src={selectedBook.coverImage} alt ={selectedBook.title} />
            </div>
        );
    };
    return(
        <div className="App">
            <header>
                <h1>Book Management</h1>
                {isAdmin ? (
                    <button onClick={handleLogout}>Logout</button>
                ) :(
                    <div>
                        <input
                        type="text"
                        placeholder='Username'
                        value={loginData.username}
                        onChange={(e)=> setLoginData({...loginData, username: e.target.value})}
                        />
                        <button onClick={handleLogin}>Login</button>
                    </div>
                )}
                {errorMessage && <p className='error'>{errorMessage}</p>}          
    
            </header>
            <main>
                {isAdmin && (
                    <div className='admin-panel'>
                        <h2>Admin Panel</h2>
                        {}
                    </div>
                )}

                <div className='search-bar'>
                    <input
                    type="text"
                    placeholder='Search books...'
                    value={searchQuery}
                    onChange={(e)=> setSearchQuery(e.target.value)}    
                    />
                </div>

                <div className='book-list'>
                    {renderBookList()}
                </div>
                <div className='book-details-container'>
                    {renderBookDetails()}
                </div>                
            </main>
        </div>
    );
}

export default Admistrator