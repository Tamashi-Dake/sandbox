import * as io from "socket.io-client";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

const E_Socket_Event = {
  CONNECTION: "connection",
  SEND_MESSAGE: "send_message",
  RECEIVE_MESSAGE: "receive_message",
};

type Message = {
  id: number;
  content?: string;
  image?: string;
};

function App() {
  const socketRef = useRef<Socket | null>(null);
  const messageEndRefence = useRef<HTMLDivElement | null>(null);
  const [inputMessage, setInputMessage] = useState<Message>();
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage({
      id: Math.floor(Math.random() * 1000),
      content: event.target.value,
      // image:
      // "https://archive.org/download/placeholder-image//placeholder-image.jpg",
    });
  };

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputMessage?.content?.trim()) return;
    setInputMessage(undefined);
    if (socketRef.current && inputMessage) {
      socketRef.current.emit(E_Socket_Event.SEND_MESSAGE, inputMessage);
      setMessages((messages) => [...messages, inputMessage]);
      messageEndRefence.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    socketRef.current = io.connect(SERVER_URL);

    if (socketRef.current) {
      socketRef.current.on(E_Socket_Event.RECEIVE_MESSAGE, (data: Message) => {
        setMessages((messages) => [...messages, data]);
      });
    }
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "10rem",
        margin: "auto",
        height: "20vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <form
        style={{
          marginTop: "auto",
        }}
      >
        {messages.map((item) => (
          <div key={item.id}>
            <p>{item.content}</p>
            {item.image && (
              <img src={item.image} alt="Image" width={200} height={200} />
            )}
          </div>
        ))}
        <input
          type="text"
          placeholder="Message"
          value={inputMessage?.content || ""}
          onChange={handleChangeMessage}
        />
        <button type="submit" onClick={handleSendMessage}>
          Send
        </button>
      </form>
      <div ref={messageEndRefence} />
    </div>
  );
}

export default App;
