import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventList from './pages/EventList';
import NewEvent from './pages/NewEvent';
import EventDetail from './pages/EventDetail';
import './App.css';

const STORAGE_KEY = 'clb_events';

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

function App() {
  const [saved] = useState(loadSaved);
  const [events, setEvents] = useState(saved ?? []);
  const [loading, setLoading] = useState(saved === null);
  const [error, setError] = useState(false);

  // Chỉ gọi API khi trình duyệt chưa có dữ liệu lưu
  useEffect(() => {
    if (saved !== null) return;
    axios
      .get('/data/events.json')
      .then((res) => {
        if (!Array.isArray(res.data)) throw new Error('Dữ liệu không hợp lệ');
        setEvents(res.data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [saved]);

  // Lưu lại mỗi khi dữ liệu thay đổi (chỉ khi đã tải xong và không lỗi)
  useEffect(() => {
    if (loading || error) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // bỏ qua nếu không lưu được
    }
  }, [events, loading, error]);

  const handleRegister = (id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id && e.registered < e.capacity
          ? { ...e, registered: e.registered + 1 }
          : e
      )
    );
  };

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleAdd = ({ name, location, date, capacity }) => {
    setEvents((prev) => {
      const maxId = prev.reduce((max, e) => Math.max(max, e.id), 0);
      return [
        ...prev,
        { id: maxId + 1, name, location, date, capacity, registered: 0 },
      ];
    });
  };

  let content;
  if (loading) {
    content = <p>Đang tải...</p>;
  } else if (error) {
    content = <p>Không tải được dữ liệu</p>;
  } else {
    content = (
      <Routes>
        <Route path="/" element={<Home events={events} />} />
        <Route
          path="/events"
          element={
            <EventList
              events={events}
              onRegister={handleRegister}
              onDelete={handleDelete}
            />
          }
        />
        <Route path="/events/new" element={<NewEvent onAdd={handleAdd} />} />
        <Route path="/events/:id" element={<EventDetail events={events} />} />
      </Routes>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="content">{content}</div>
    </div>
  );
}

export default App;