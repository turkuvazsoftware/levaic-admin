import React, { useEffect, memo, Fragment, useState } from 'react'
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../widget/logo';
import CustomToggle from '../bootstrap/dropdowns';
import { useSelector, useDispatch } from 'react-redux';
import * as SettingSelector from '../../store/setting/selectors'
import { logout } from '../../store/auth/actions';


const Header = memo((props) => {
    const [show1, setShow1] = useState(false);
    const navbarHide = useSelector(SettingSelector.navbar_show);
    const themeFontSize = useSelector(SettingSelector.theme_font_size)
    const headerNavbar = useSelector(SettingSelector.header_navbar)

    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (headerNavbar === 'navs-sticky' || headerNavbar === 'nav-glass') {
            window.onscroll = () => {
                if (document.documentElement.scrollTop > 50) {
                    document.getElementsByTagName('nav')[0].classList.add('menu-sticky')
                } else {
                    document.getElementsByTagName('nav')[0].classList.remove('menu-sticky')
                }
            }
        }

        const result = window.matchMedia("(max-width: 1200px)");
        window.addEventListener('resize',
            () => {
                if (result.matches === true) {
                    if (show1 === true) {
                        document.documentElement.style.setProperty('overflow', 'hidden');
                    }
                    else {
                        document.documentElement.style.removeProperty('overflow')
                    }

                }
                else {
                    document.documentElement.style.removeProperty('overflow')
                }

            }
        )
        if (window.innerWidth <= '1200') {
            if (show1 === true) {
                document.documentElement.style.setProperty('overflow', 'hidden');
            }
            else {
                document.documentElement.style.removeProperty('overflow')
            }

        }
        else {
            document.documentElement.style.removeProperty('overflow')
        }

    })
    document.getElementsByTagName('html')[0].classList.add(themeFontSize)

    const minisidebar = () => {
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Fragment>
            <Navbar
                expand="xl"
                variant="light"
                className={`nav iq-navbar header-hover-menu left-border ${headerNavbar} ${navbarHide.join(" ")}`}
            >
                <Container fluid className="navbar-inner">
                    <Link to="/" className="navbar-brand">
                        <Logo />
                    </Link>

                    <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
                        <i className="icon d-flex">
                            <svg className="icon-20" width="20" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                            </svg>
                        </i>
                    </div>

                    <div className="d-flex align-items-center">
                        <Navbar.Toggle aria-controls="navbarSupportedContent" type="button" className='px-0' data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                            <span className="navbar-toggler-btn">
                                <span className="navbar-toggler-icon"></span>
                            </span>
                        </Navbar.Toggle>
                    </div>

                    <Navbar.Collapse className="" id="navbarSupportedContent">
                        <ul className="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
                            <Dropdown as="li" className="nav-item">
                                <Dropdown.Toggle
                                    as={CustomToggle}
                                    variant=" nav-link py-0 d-flex align-items-center"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <div className="btn-inner d-inline-block position-relative d-flex align-items-center">
                                        {user?.image ? (
                                            <img
                                                src={user.image}
                                                alt="User-Profile"
                                                className="theme-color-default-img img-fluid avatar avatar-40 avatar-rounded"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div
                                                className="avatar avatar-40 avatar-rounded theme-color-default-img d-flex align-items-center justify-content-center"
                                                style={{ backgroundColor: "#fafafe" /* İstersen arka plan rengi */ }}
                                                data-bs-toggle="tooltip"
                                                title="Kullanıcılar"
                                                data-bs-placement="right"
                                            >
                                                <svg
                                                    className="icon-20"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z"
                                                        fill="currentColor"
                                                    ></path>
                                                    <path
                                                        opacity="0.4"
                                                        d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                            </div>
                                        )}


                                        <span className="ms-2">{user?.name || "Kullanıcı"}</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    className="dropdown-menu-end"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <Dropdown.Item as={Link} to="/profile">
                                        Profil
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                        Çıkış Yap
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ul>
                    </Navbar.Collapse>
                </Container>

            </Navbar>
        </Fragment>
    )
})

export default Header;
