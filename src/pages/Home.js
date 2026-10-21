function Home({ events }) {
  const totalEvents = events.length;
  const totalRegistered = events.reduce((sum, e) => sum + e.registered, 0);
  const fullEvents = events.filter((e) => e.registered >= e.capacity).length;

  return (
    <div>
      <h1>Sự kiện CLB</h1>
      <p><strong>Tổng số sự kiện: {totalEvents}</strong></p>
      <p><strong>Tổng số lượt đăng ký: {totalRegistered}</strong></p>
      <p><strong>Số sự kiện đã đầy: {fullEvents}</strong></p>
    </div>
  );
}

export default Home;