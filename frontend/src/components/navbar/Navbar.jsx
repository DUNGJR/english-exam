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

  const handleCourseClick = (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      navigate('/course');
    } else {
      alert('Vui lòng đăng nhập để xem Khóa học.');
      navigate('/login');
    }
  };

  const handlePracticeClick = (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      navigate('/practice');
    } else {
      alert('Vui lòng đăng nhập để xem Đề thi.');
      navigate('/login');
    }
  };

  const handleBlogClick = (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      navigate('/blog');
    } else {
      alert('Vui lòng đăng nhập để xem Tin tức.');
      navigate('/login');
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
      <a href="/">
      <img
        src="https://i.pinimg.com/originals/92/c5/3a/92c53a179d29b97f6fd8f35f2c57e2e3.jpg" // Đặt đường dẫn đến hình ảnh của bạn
        alt="Logo"
        className="navbar-logo"
      />

      </a>

      <div className="navbar-links">
        <div className="navbar-links_container" style={{fontWeight:'600',}}>
          <p><a href="/">Trang chủ</a></p>
          <p><a href="/course" onClick={handleCourseClick}>Khóa học</a></p>
          <p><a href="/practice" onClick={handlePracticeClick}>Đề thi</a></p>
          <p><a href="/blog" onClick={handleBlogClick}>Tin tức</a></p>
        </div>
        <Search placeholder="Tìm đề thi" enterButton style={{ width: 720, padding: 30, marginLeft: '50px' }} />
      </div>

      <div className="navbar-link_sign">
        {isLoggedIn ? (
          <>
            <Dropdown className='useroverview' overlay={menu} placement="bottomRight" trigger={['hover']} >
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <div className="user-info">
                <span className="username-info" style={{color: 'white', marginRight: '10px', fontWeight:'bold', fontStyle: 'italic'}}>Xin chào: {userData.name}</span>
                  {userData.avata ? (
                    <Avatar src={userData.avata} alt="Avatar" />
                  ) : (
                    <Avatar style={{ backgroundColor: 'blue', marginRight: '10px' }} size={32}>
                      {userData.name ? userData.name.charAt(0).toUpperCase() : ''}
                    </Avatar>
                  )}
                 
                </div>
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
