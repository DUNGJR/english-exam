import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Avatar, Button, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './navbar.css';

const { Search } = Input;

const Navbar = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem('token');
  const isAdmin = userData.admin === true;
  const navigate = useNavigate();

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
          localStorage.setItem('admin', data.admin)
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.clear()
    setLoggedIn(false);
    setUserData({});
    navigate('/')
  };

  const handleViewProfile = () => {
    navigate('/user');
  };

  const handleManage = () => {
    if (isAdmin) {
      navigate('/admin');
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleViewProfile}>
        Xem trang cá nhân
      </Menu.Item>
      {isAdmin && (
        <Menu.Item key="2" onClick={handleManage}>
          Quản lý
        </Menu.Item>
      )}
      <Menu.Item key="3" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

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
            <Dropdown overlay={menu} placement="bottomRight" trigger={['hover']}>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
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
            </Dropdown>
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
