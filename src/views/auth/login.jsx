import React, { useState, useEffect, Fragment } from 'react';
import { Card, Col, Container, Row, Form, FormCheck, Button } from 'react-bootstrap';
import Logo from '../../components/widget/logo';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth/actions';
import { toast } from 'react-toastify';
import * as storage from "../../utilities/storage"
import appAxios from "../../utilities/appAxios"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = storage.getItem('rememberEmail');
        const savedPassword = storage.getItem('rememberPassword');

        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const params = new URLSearchParams();
        params.append("email", email);
        params.append("password", password);

        const response = await appAxios.post("/login.php", params.toString());

        if (response.data.success) {
            const user = {
                id: response.data.user_id,
                name: response.data.name,
                email: response.data.email,
                phone: response.data.phone,
                role: response.data.role, 
                birth_date: response.data.birth_date
            };

            dispatch(login({ user }));
            if (rememberMe) {
                storage.setItem('rememberEmail', email);
                storage.setItem('rememberPassword', password);
            } else {
                storage.removeItem('rememberEmail');
                storage.removeItem('rememberPassword');
            }

            toast.success("Giriş başarılı, yönlendiriliyorsunuz...", { autoClose: 1500 });
            setTimeout(() => {
                navigate('/');
            }, 2000);
            return;
        } else {
            toast.error(response.data.message || "Email veya şifre hatalı");
        }
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