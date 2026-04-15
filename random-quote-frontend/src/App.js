import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [quote, setQuote] = useState("");
  const [newQuote, setNewQuote] = useState("");
  const [quotes, setQuotes] = useState([]);

  // 🔥 CHANGE THIS IF USING PHONE
  const BASE_URL = "http://localhost:8080/api";
  // const BASE_URL = "http://192.168.X.X:8080/api"; // for mobile

  // ✅ Get random quote
  const fetchRandomQuote = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/random-quote`);
      setQuote(res.data?.text || "No quote found");
    } catch (err) {
      alert("Error fetching quote!");
      console.error(err);
    }
  };

  // ✅ Get all quotes
  const fetchAllQuotes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/all-quotes`);
      setQuotes(res.data);
    } catch (err) {
      alert("Error fetching quotes!");
      console.error(err);
    }
  };

  // ✅ Add quote
  const addQuote = async () => {
    if (!newQuote.trim()) return;

    try {
      await axios.post(`${BASE_URL}/add-quote`, {
        text: newQuote,
      });
      setNewQuote("");
      fetchAllQuotes();
    } catch (err) {
      alert("Error adding quote!");
      console.error(err);
    }
  };

  // ✅ Delete quote
  const deleteQuote = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete-quote/${id}`);
      fetchAllQuotes();
    } catch (err) {
      alert("Error deleting quote!");
      console.error(err);
    }
  };

  // ✅ Update quote
  const updateQuote = async (id) => {
    const updatedText = prompt("Enter updated quote:");
    if (!updatedText) return;

    try {
      await axios.put(`${BASE_URL}/update-quote/${id}`, {
        text: updatedText,
      });
      fetchAllQuotes();
    } catch (err) {
      alert("Error updating quote!");
      console.error(err);
    }
  };

  // ✅ Load on start
  useEffect(() => {
    fetchAllQuotes();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 Go + Firebase Quote App</h1>

      {/* RANDOM QUOTE */}
      <p style={styles.quote}>
        {quote || "Click button to get a quote"}
      </p>

      <button style={styles.buttonBlue} onClick={fetchRandomQuote}>
        Get Random Quote
      </button>

      {/* ADD QUOTE */}
      <div style={styles.inputBox}>
        <input
          style={styles.input}
          placeholder="Enter new quote"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
        />
        <button style={styles.buttonGreen} onClick={addQuote}>
          Add
        </button>
      </div>

      {/* ALL QUOTES */}
      <div style={{ marginTop: "30px" }}>
        <h2>📜 All Quotes</h2>

        {quotes.length === 0 ? (
          <p>No quotes available</p>
        ) : (
          quotes.map((q) => (
            <div key={q.id} style={styles.card}>
              <span>{q.text}</span>
              <div>
                <button
                  style={styles.smallBtn}
                  onClick={() => updateQuote(q.id)}
                >
                  Update
                </button>
                <button
                  style={styles.smallBtnDelete}
                  onClick={() => deleteQuote(q.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    background: "#f4f6f8",
    minHeight: "100vh",
  },
  title: {
    color: "#333",
  },
  quote: {
    fontSize: "20px",
    fontStyle: "italic",
    color: "#555",
    margin: "20px 0",
  },
  inputBox: {
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    width: "250px",
  },
  buttonBlue: {
    padding: "10px 15px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  buttonGreen: {
    padding: "10px 15px",
    background: "green",
    color: "#fff",
    border: "none",
    marginLeft: "10px",
    cursor: "pointer",
  },
  card: {
    background: "#fff",
    padding: "10px",
    margin: "10px auto",
    width: "300px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  smallBtn: {
    marginRight: "10px",
    marginTop: "10px",
    padding: "5px",
  },
  smallBtnDelete: {
    marginTop: "10px",
    padding: "5px",
    background: "red",
    color: "#fff",
    border: "none",
  },
};

export default App;