import React, { useState, useEffect, Fragment } from 'react';
import { Card, Col, Container, Row, Form, FormCheck, Button } from 'react-bootstrap';
import Logo from '../../components/widget/logo';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth/actions';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberEmail');
        const savedPassword = localStorage.getItem('rememberPassword');

        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const generateToken = () => {
        return Math.random().toString(36).substring(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === 'admin@gmail.com' && password === '123456') {
            const user = { id: 1, name: 'Admin', image: 'https://media.licdn.com/dms/image/v2/C4E03AQEhUL_IViE7hQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1631539391760?e=2147483647&v=beta&t=48giSHIJzxdOxCZPra6z1jN-LXvh3D6LHwgC2F9jKCk', role: 'admin' };
            const token = generateToken();

            dispatch(login({ user, token }));

            if (rememberMe) {
                localStorage.setItem('rememberEmail', email);
                localStorage.setItem('rememberPassword', password);
            } else {
                localStorage.removeItem('rememberEmail');
                localStorage.removeItem('rememberPassword');
            }


            toast.success("Giriş başarılı, yönlendiriliyorsunuz...", {
                autoClose: 1500,
            });
            setTimeout(() => {
                navigate('/');
            }, 2000);
            return;
        }

        if (email === 'consultant@gmail.com' && password === '654321') {
            const user = { id: 2, name: 'Consultant', image: 'https://media.licdn.com/dms/image/v2/C4E03AQEhUL_IViE7hQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1631539391760?e=2147483647&v=beta&t=48giSHIJzxdOxCZPra6z1jN-LXvh3D6LHwgC2F9jKCk', role: 'consultant' };
            const token = generateToken();

            setTimeout(() => toast.success("Giriş başarılı yönlendiriliyorsunuz..."), 1000)
            dispatch(login({ user, token }));

            if (rememberMe) {
                localStorage.setItem('rememberEmail', email);
                localStorage.setItem('rememberPassword', password);
            } else {
                localStorage.removeItem('rememberEmail');
                localStorage.removeItem('rememberPassword');
            }

            toast.success("Giriş başarılı, yönlendiriliyorsunuz...", {
                autoClose: 1500,
            });
            setTimeout(() => {
                navigate('/');
            }, 1500);
            return;
        }

        toast.error('Email veya şifre hatalı!');
    };

    return (
        <Fragment>
            <div className="login-content">
                <Container>
                    <Row className="align-items-center justify-content-center vh-100 w-100 m-0">
                        <Col lg={5} md={12} className="align-self-center">
                            <Card className="p-0 mb-0">
                                <Card.Body className="auth-card">
                                    <div className="logo-img">
                                        <Link to="/" className="navbar-brand d-flex align-items-center justify-content-center mb-5">
                                            <Logo />
                                        </Link>
                                    </div>
                                    <Form onSubmit={handleSubmit}>
                                        <div className="custom-form-field">
                                            <Form.Group className="mb-5">
                                                <Form.Label className="mb-0">
                                                    Email&nbsp; <span>*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    className="mb-0"
                                                    placeholder="Email giriniz"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-5">
                                                <Form.Label className="mb-0">
                                                    Şifre&nbsp; <span>*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    className="mb-0"
                                                    placeholder="Şifre giriniz"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <div className="d-flex align-items-center justify-content-between mb-5">
                                                <Form.Check className="d-inline-block">
                                                    <FormCheck.Input
                                                        type="checkbox"
                                                        id="customCheck11"
                                                        checked={rememberMe}
                                                        onChange={() => setRememberMe(!rememberMe)}
                                                    />
                                                    <Form.Check.Label htmlFor="customCheck11">Beni Hatırla</Form.Check.Label>
                                                </Form.Check>
                                            </div>
                                            <div className="pb-0 d-block w-100">
                                                <Button type="submit" className="w-100">
                                                    <span className="text d-inline-block align-middle">Giriş Yap</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
};

export default Login;