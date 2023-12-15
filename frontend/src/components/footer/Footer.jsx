import React from "react";
import './footer.css';
import { Row, Col } from 'antd';

const Footer = () => {
    return (
        <footer class="footer">
          <Row>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <h3 class="footer__heading">Về chúng tôi</h3>
                    <ul class="footer-list">
                        <li class="footer-item">
                            <a href="" class="footer-item__link">Giới Thiệu</a>
                        </li>

                    </ul>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <h3 class="footer__heading">LIÊN HỆ </h3>
                    <ul class="footer-list">
                        <li class="footer-item">
                            <h3 href="" class="footer-item__link">090909090909</h3>
                        </li>
                    </ul>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <h3 class="footer__heading">QUY ĐỊNH + ĐIỀU KHOẢN</h3>
                    <ul class="footer-list">
                        <li class="footer-item">
                            <a href="" class="footer-item__link">Trung tâm trợ giúp</a>
                        </li>
                        <li class="footer-item">
                            <a href="" class="footer-item__link">Chính sách bảo mật</a>
                        </li>
                        <li class="footer-item">
                            <a href="" class="footer-item__link">Tuyển dụng</a>
                        </li>
                    </ul>
                </Col>

                <Col xs={24} sm={12} md={8} lg={6}>
                    <h3 class="footer__heading">Theo dõi chúng tôi trên</h3>
                    <ul class="footer-list">
                        <li class="footer-item">
                            <a href="" class="footer-item__link">
                                
                                Facebook</a>
                        </li>
                        <li class="footer-item">
                            <a href="" class="footer-item__link">
                             
                                Instagram</a>
                        </li>
                        <li class="footer-item">
                            <a href="" class="footer-item__link">
                             
                                LinkedIn</a>
                        </li>
                    </ul>
                </Col>
              
            </Row>
            <div class="footer__bottom">
                <div class="grid">
                    <p class="footer__text">© 2023 - By LD</p>
                </div>
            </div>
        </footer >
    )
}
export default Footer