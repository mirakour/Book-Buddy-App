const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

// Fetch all books
export async function fetchBooks() {
  try {
    const response = await fetch(`${BASE_URL}/books`);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Failed to fetch books:", err);
    throw err;
  }
}

// Fetch a single book by ID
export async function fetchBookById(id) {
    try {
      const response = await fetch(`${BASE_URL}/books/${id}`);
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Failed to fetch book:", err);
      throw err;
    }
  }

// Register a new user
export async function registerUser({ firstname, lastname, email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

// Log in an existing user
export async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Get logged-in user's account details and reservations
export async function fetchMe(token) {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Fetching user info error:", error);
    throw error;
  }
}

// Reserve a book (check out)
export async function reserveBook(token, bookId) {
  try {
    const response = await fetch(`${BASE_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookId }),
    });
    return await response.json();
  } catch (error) {
    console.error("Reservation error:", error);
    throw error;
  }
}

// Return a book (delete reservation)
export async function returnBook(token, reservationId) {
  try {
    const response = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Return error:", error);
    throw error;
  }
}