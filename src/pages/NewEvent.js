import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewEvent({ onAdd }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra 1: ô trống (mục 4)
    if (!name.trim() || !location.trim() || !date || capacity.trim() === '') {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    // Kiểm tra 2: sức chứa là số nguyên từ 10 đến 1000 (mục 8)
    const cap = capacity.trim();
    const isInteger = /^\d+$/.test(cap);
    if (!isInteger || Number(cap) < 10 || Number(cap) > 1000) {
      setError('Sức chứa phải từ 10 đến 1000');
      return;
    }

    // Hợp lệ: thêm và chuyển về trang danh sách
    setError('');
    onAdd({
      name: name.trim(),
      location: location.trim(),
      date,
      capacity: Number(cap),
    });
    navigate('/events', { replace: true });
  };

  return (
    <div>
      <h2>Thêm sự kiện mới</h2>
      <form onSubmit={handleSubmit} className="event-form" noValidate>
        <label>
          Tên sự kiện
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Địa điểm
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          Ngày diễn ra
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Sức chứa
          <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        </label>
        <button type="submit">Thêm</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default NewEvent;