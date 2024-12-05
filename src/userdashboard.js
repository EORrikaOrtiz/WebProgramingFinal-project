import react, { usestate,usefetch } from "react";
import Errormessage from "/components/errormessage";

const userdashboard =() => {
    const [books, setbooks] = usestate([]);
    const [ searchterm, setsearchterm] = usestate("");
    const [error, seterror] = usestate ("")
    const [loading, setloading] = usestate(false);

    // for fetching all the books
useEffect (() => {
    const fetchbooks = async () => {
        try {
            setloading(true);
            const response = await fetch(""); //have to adjust the api endpoint.
            if(!response.ok) {
                throw new Error("Failed to fetch books, Please try again.");
            }
            const data = await response.json();
            setbooks(data);
            seterror("");
        } catch (err) {
            setError(err.message);
        } finally {
          setloading(false);
        }
     };

    fetchbooks();
}, []);

const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.description.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <h1>User Dashboard</h1>
      {error && <ErrorMessage message={error} />}
      <div>
        <input
          type="text"
          placeholder="Search books by title, author, or keyword..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: "10px", marginBottom: "20px", width: "100%" }}
        />
      </div>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div>
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <img
                src={book.coverImage}
                alt={book.title}
                style={{ width: "100px", height: "150px" }}
              />
              <p>{book.description}</p>
            </div>
          ))}
          </div>
      )}
      </div>
  );
};

export default userdashboard;