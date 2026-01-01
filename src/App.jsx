import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (!message || !user) return;
    socket.emit("sendMessage", { user, text: message });
    setMessage("");
  };

  return (
    <div
      style={{
        fontFamily: "monospace",
        backgroundColor: "#0f0f0f",
        color: "#00ff00",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundImage:
          'url("https://img.freepik.com/free-vector/stream-binary-code-design_53876-100689.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0,0,0,0.6)",
        backgroundBlendMode: "darken",
      }}
    >
      <h1
        style={{
          textShadow: "0 0 5px #00ff00, 0 0 10px #00ff00",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        The Gooners Chatroom — made by Mursleen
      </h1>

      {/* Main Chat + Friends Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          maxWidth: "900px",
          gap: "20px",
          flexWrap: "wrap", // for responsiveness on small screens
        }}
      >
        {/* Chat Section */}
        <div
          style={{
            flex: "1 1 500px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <input
            placeholder="Your Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #00ff00",
              backgroundColor: "#0f0f0f",
              color: "#00ff00",
              outline: "none",
              borderRadius: "5px",
              width: "100%",
            }}
          />

          <div
            style={{
              flex: 1,
              minHeight: "400px",
              border: "1px solid #00ff00",
              padding: "10px",
              overflowY: "auto",
              backgroundColor: "#050505",
              boxShadow: "0 0 10px #00ff00",
              borderRadius: "5px",
            }}
          >
            {chat.map((m, i) => (
              <p key={i} style={{ margin: "5px 0" }}>
                <b style={{ color: "#00ff99" }}>{m.user}:</b> {m.text}
              </p>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #00ff00",
                borderRadius: "5px",
                backgroundColor: "#0f0f0f",
                color: "#00ff00",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "10px 20px",
                border: "1px solid #00ff00",
                borderRadius: "5px",
                backgroundColor: "#0f0f0f",
                color: "#00ff00",
                cursor: "pointer",
                textShadow: "0 0 5px #00ff00",
                transition: "0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#002200")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#0f0f0f")
              }
            >
              Send
            </button>
          </div>
        </div>

        {/* Friends Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            minWidth: "120px",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src="/mursleen.jpg"
              alt="Mursleen"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #00ff00",
              }}
            />
            <p style={{ marginTop: "5px", fontSize: "0.8rem" }}>Mursleen</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src="/sarmad.png"
              alt="Sarmad"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #00ff00",
              }}
            />
            <p style={{ marginTop: "5px", fontSize: "0.8rem" }}>Sarmad</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src="/amman.png"
              alt="Amman"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #00ff00",
              }}
            />
            <p style={{ marginTop: "5px", fontSize: "0.8rem" }}>Amman</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
