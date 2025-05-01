import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBookById, reserveBook, fetchMe, returnBook } from "./api";

export default function SingleBook({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function loadBookDetails() {
      const data = await fetchBookById(id);
      setBook(data);
    }

    async function loadUserData() {
      if (token) {
        const me = await fetchMe(token);
        setReservations(me.reservations || []);
        setUserId(me.id);
      }
    }

    loadBookDetails();
    loadUserData();
  }, [id, token]);

  async function handleReserve() {
    await reserveBook(token, parseInt(id));
    navigate("/account");
  }

  async function handleReturn() {
    const match = reservations.find((r) => r.bookid === parseInt(id));
    if (match) {
      await returnBook(token, match.id);
      navigate("/account");
    }
  }

  if (!book) return <p>Loading book details...</p>;

  const isReservedByUser = reservations.some(
    (r) => r.bookid === parseInt(id)
  );

  return (
    <div className="book-detail">
      <img src={book.coverimage} alt={book.title} />
      <div className="book-info">
        <h2>{book.title}</h2>
        <h4>{book.author}</h4>
        <p>{book.description}</p>

        {token ? (
          book.available ? (
            <button className="reserve-btn" onClick={handleReserve}>
              Reserve Book
            </button>
          ) : isReservedByUser ? (
            <button className="return-btn" onClick={handleReturn}>
              Return Book
            </button>
          ) : (
            <p className="unavailable-msg">This book is currently checked out.</p>
          )
        ) : (
          <p className="login-msg">Login to reserve this book.</p>
        )}
      </div>
    </div>
  );
}
