import { NavLink } from 'react-router-dom';

function Navbar() {
  const getClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <nav className="navbar">
      <NavLink to="/" end className={getClass}>Trang chủ</NavLink>
      <NavLink to="/events" end className={getClass}>Danh sách</NavLink>
      <NavLink to="/events/new" end className={getClass}>Thêm mới</NavLink>
    </nav>
  );
}

export default Navbar;