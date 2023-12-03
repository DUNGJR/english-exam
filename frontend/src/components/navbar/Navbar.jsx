import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './navbar.css';

const { Search } = Input;

const Navbar = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({}); // Thêm state để lưu thông tin người dùng
  const token = localStorage.getItem('token'); // Lấy token từ local storage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          setLoggedIn(true);

          const response = await fetch('http://localhost:3001/users', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserData({}); // Đặt thông tin người dùng về giá trị rỗng

    // Chuyển hướng hoặc thực hiện các hành động khác sau khi đăng xuất
  };

  return (
    <div className="navbar">
      <div className="navbar-links">
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
          <>
            <a href="/user">
              {userData.avatarUrl ? (
                <Avatar src={userData.avatarUrl} alt="Avatar" />
              ) : (
                <Avatar
                  style={{ backgroundColor: 'blue', marginRight: '10px'}}
                  size={32}
                  
                >
                  {userData.name ? userData.name.charAt(0).toUpperCase() : ''}
                </Avatar>
              )}
            </a>
            <a href="/" className="navbar-link_login">
              <button onClick={handleLogout}>Đăng xuất</button>
            </a>
          </>
        ) : (
          <a href="/login" className="navbar-link_login">
            <button>Đăng nhập</button>
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
