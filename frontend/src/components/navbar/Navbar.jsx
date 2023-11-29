import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './navbar.css'

const { Search } = Input;

const Navbar = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    // Kiểm tra xem có token trong Local Storage hay không
    const token = localStorage.getItem('token');

    if (token) {
      // Nếu có token, cập nhật trạng thái đăng nhập
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Xóa token từ Local Storage khi đăng xuất
    localStorage.removeItem('token');

    // Cập nhật trạng thái đăng nhập
    setLoggedIn(false);

    // Chuyển hướng hoặc thực hiện các hành động khác sau khi đăng xuất

  };

  return (
    <div className="navbar">
      <div className="navbar-links">
        {/* Các phần khác của Navbar */}
        <div className="navbar-links_container">
          <p><a href="/">Trang chủ</a></p>
          <p><a href="/course">Khóa học</a></p>
          <p><a href="/practice">Đề thi</a></p>
          <p><a href="/blog">Tin tức</a></p>
        </div>

        <Search placeholder="Tìm đề thi" enterButton style={{ width: 720, padding: 30 }} />
      </div>
      
      <div className="navbar-link_sign">
        {isLoggedIn ? (
          // Nếu đã đăng nhập, hiển thị avata và nút logout
          <>
            <a href="/user">
              <UserOutlined style={{ color: '#fff' }} />
            </a>
            <a href="/" className="navbar-link_login" >
            <button onClick={handleLogout}>Đăng xuất</button>
            </a>
          </>
        ) : (
          // Nếu chưa đăng nhập, hiển thị nút đăng nhập
          <a href="/login" className="navbar-link_login">
            <button>Đăng nhập</button>
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
