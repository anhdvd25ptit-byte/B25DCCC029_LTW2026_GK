import { useState } from 'react';
import { Link } from 'react-router-dom';

function EventList({ events, onRegister, onDelete }) {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('all');

  const filtered = events.filter((e) => {
    const isFull = e.registered >= e.capacity;
    const matchName = e.name.toLowerCase().includes(keyword.trim().toLowerCase());
    const matchStatus =
      status === 'all' ||
      (status === 'available' && !isFull) ||
      (status === 'full' && isFull);
    return matchName && matchStatus;
  });

  return (
    <div>
      <h2>Danh sách sự kiện</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="available">Còn chỗ</option>
          <option value="full">Đã đầy</option>
        </select>
      </div>

      <p>Tìm thấy {filtered.length} sự kiện</p>

      {filtered.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <table className="event-table">
          <thead>
            <tr>
              <th>Sự kiện</th>
              <th>Địa điểm</th>
              <th>Ngày</th>
              <th>Số chỗ</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => {
              const isFull = e.registered >= e.capacity;
              return (
                <tr key={e.id} className={isFull ? 'full' : ''}>
                  <td>
                    <Link to={`/events/${e.id}`}>{e.name}</Link>
                  </td>
                  <td>{e.location}</td>
                  <td>{e.date}</td>
                  <td>
                    {e.registered}/{e.capacity}
                  </td>
                  <td>
                    <button onClick={() => onRegister(e.id)} disabled={isFull}>
                      Đăng ký
                    </button>
                    <button onClick={() => onDelete(e.id)}>Xóa</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EventList;