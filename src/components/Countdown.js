import { useState, useEffect } from 'react';

// Chuyển "2026-11-05" thành 0 giờ ngày đó theo giờ địa phương
function parseDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).getTime();
}

function Countdown({ date }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id); // rời trang thì dừng hẳn
  }, []);

  const diff = parseDate(date) - now;

  if (Number.isNaN(diff) || diff <= 0) {
    return <span>Sự kiện đã diễn ra</span>;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <span>
      Còn {days} ngày {hours} giờ {minutes} phút {seconds} giây
    </span>
  );
}

export default Countdown;