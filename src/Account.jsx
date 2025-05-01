import { useEffect, useState } from "react";
import { fetchMe, returnBook } from "./api";

export default function Account({ token }) {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function getAccountDetails() {
      try {
        const data = await fetchMe(token);
        setUser(data);
        setReservations(data.reservations || []);
      } catch (err) {
        console.error("Failed to fetch account data:", err);
      }
    }
    getAccountDetails();
  }, [token]);

  async function handleReturn(reservationId) {
    try {
      await returnBook(token, reservationId);
      setReservations((prev) =>
        prev.filter((res) => res.id !== reservationId)
      );
    } catch (err) {
      console.error("Failed to return book:", err);
    }
  }

  if (!user) return <p>Loading account details...</p>;

  return (
    <div className="account-container">
      <h2>📚 Your BookBuddy Account</h2>
      <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <h3>Your Checked Out Books</h3>
      {reservations.length === 0 ? (
        <p>You have no current reservations.</p>
      ) : (
        <div className="reservation-list">
          {reservations.map((book) => (
            <div key={book.id} className="reservation-card">
              <img src={book.coverimage} alt={book.title} />
              <div className="reservation-info">
                <h4>{book.title}</h4>
                <p><em>{book.author}</em></p>
                <button
                  className="return-btn"
                  onClick={() => handleReturn(book.id)}
                >
                  Return
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}