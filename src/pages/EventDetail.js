import { useParams, useNavigate } from 'react-router-dom';

function EventDetail({ events }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => String(e.id) === id);

  if (!event) {
    return (
      <div>
        <p>Không tìm thấy sự kiện</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Chi tiết sự kiện</h2>
      <p><strong>Tên sự kiện:</strong> {event.name}</p>
      <p><strong>Địa điểm:</strong> {event.location}</p>
      <p><strong>Ngày:</strong> {event.date}</p>
      <p><strong>Số chỗ:</strong> {event.registered}/{event.capacity}</p>
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
}

export default EventDetail;