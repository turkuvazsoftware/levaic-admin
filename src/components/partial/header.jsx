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
                                        <img
                                            src={user?.image || "/assets/images/dashboard/dr-dashboard.png"}
                                            alt="User-Profile"
                                            className="theme-color-default-img img-fluid avatar avatar-40 avatar-rounded"
                                            loading="lazy"
                                        />
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
