import React from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const onSearch = (value, _e, info) => console.log(info?.source, value);

const { Search } = Input;
const Navbar = () => {
  return (

    <div className="navbar">
      <div className="navbar-links">
        <a href="/" className="navbar-links_logo">
          <img src={logo} alt="logo" />
        </a>
        <div className="navbar-links_container">
          <p>
            <a href="/">Trang chủ</a>
          </p>
          <p>
            <a href="/course">Khóa học</a>
          </p>
          <p>
            <a href="/practice">Đề thi</a>
          </p>
          <p>
            <a href="/blog">Tin tức</a>
          </p>
        </div>
        {/* <div className="navbar-search"> */}
        <Search placeholder="Tìm đề thi" onSearch={onSearch} enterButton style={{
          width: 720,
          padding: 30
        }} />

        {/* </div> */}
      </div>
      <div className="navbar-link_sign">
        <a href="/user">
          <UserOutlined style={{ color: '#fff' }} />
        </a>
        <a href="/login" className="navbar-link_login"><button>Đăng nhập</button>
        </a>
      </div>
    </div>
  );
};
export default Navbar;
