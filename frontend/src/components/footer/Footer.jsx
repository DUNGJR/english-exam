import React from "react";
import './footer.css';

const Footer = () => {
    return (
        <footer class="footer">
            <div class="grid">
                <div class="grid__row">
                    <div class="grid__column-2-4">
                        <h3 class="footer__heading">Về chúng tôi</h3>
                        <ul class="footer-list">
                            <li class="footer-item">
                                <a href="" class="footer-item__link">Giới Thiệu</a>
                            </li>

                        </ul>
                    </div>
                    <div class="grid__column-2-4">
                        <h3 class="footer__heading">LIÊN HỆ </h3>
                        <ul class="footer-list">
                            <li class="footer-item">
                                <h3 href="" class="footer-item__link">090909090909</h3>
                            </li>
                        </ul>
                    </div>
                    <div class="grid__column-2-4">
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
                    </div>
                    <div class="grid__column-2-4">
                        <h3 class="footer__heading">Theo dõi chúng tôi trên</h3>
                        <ul class="footer-list">
                            <li class="footer-item">
                                <a href="" class="footer-item__link">
                                    <i class="footer-item__icon fa-brands fa-facebook"></i>
                                    Facebook</a>
                            </li>
                            <li class="footer-item">
                                <a href="" class="footer-item__link">
                                    <i class="footer-item__icon fa-brands fa-instagram"></i>
                                    Instagram</a>
                            </li>
                            <li class="footer-item">
                                <a href="" class="footer-item__link">
                                    <i class="footer-item__icon fa-brands fa-linkedin"></i>
                                    LinkedIn</a>
                            </li>
                        </ul>
                    </div>
                    <div class="grid__column-2-4">
                        <h3 class="footer__heading">Tải ứng dụng</h3>
                    </div>
                </div>

            </div>
            <div class="footer__bottom">
                <div class="grid">
                    <p class="footer__text">© 2023 - By LD</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer