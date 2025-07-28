import React, { useState, useEffect } from 'react'
import { Row, Col, Tab, Nav, Button, Table, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from '../components/pagination'
import Card from '../components/bootstrap/card'
import { useSelector } from 'react-redux';
import appAxios from "../utilities/appAxios"
import { toast } from 'react-toastify';
import Swal from "sweetalert2";


const User = () => {

    const [userList, setUserList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');

    const [updateId, setUpdateId] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [updateEmail, setUpdateEmail] = useState('');
    const [updatePhone, setUpdatePhone] = useState('');
    const [updateBirthDate, setUpdateBirthDate] = useState('');

    const fetchUsers = async () => {
        const params = new URLSearchParams();
        params.append("role", "user");

        const response = await appAxios.get("/get_users.php?" + params.toString());

        if (response.data.success) {
            setUserList(response.data.data);
        } else {
            setError(response.data.message || 'Veri alınamadı.');
        }
    };

    useEffect(() => {
        Promise.all([fetchUsers()])
    }, []);

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const startPage = (currentPage - 1) * itemsPerPage;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => {
        setUpdateId("")
        setUpdateName("")
        setUpdateEmail("")
        setUpdatePhone("")
        setUpdateBirthDate("")
        setShow1(false)
    };
    const handleShow1 = (item) => {
        setUpdateId(item.id)
        setUpdateName(item.name)
        setUpdateEmail(item.email)
        setUpdatePhone(item.phone)
        setUpdateBirthDate(item.birth_date)
        setShow1(true)
    };

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const filteredUsers = userList.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSaveUser = async () => {
        if (!name || !email || !phone || !birthDate || !password) {
            toast.error("Tüm alanları doldurun!");
            return;
        }

        const params = new URLSearchParams();
        params.append("name", name);
        params.append("email", email);
        params.append("phone", phone);
        params.append("birth_date", birthDate);
        params.append("password", password);
        params.append("role", "user");
        params.append("is_verified", "1");

        const response = await appAxios.post("/create_user.php", params.toString());

        if (response.data.success) {
            toast.success("Kullanıcı başarıyla eklendi!");
            fetchUsers();
            handleClose();
            setName(''); setEmail(''); setPhone(''); setBirthDate(''); setPassword('');
        } else {
            toast.error(response.data.message || "Kayıt sırasında hata oluştu.");
        }
    };

    const handleSaveAdmin = async () => {
        if (!name || !email || !phone || !birthDate || !password) {
            toast.error("Tüm alanları doldurun!");
            return;
        }

        const params = new URLSearchParams();
        params.append("name", name);
        params.append("email", email);
        params.append("phone", phone);
        params.append("birth_date", birthDate);
        params.append("password", password);
        params.append("role", "admin");
        params.append("is_verified", "1");

        const response = await appAxios.post("/create_user.php", params.toString());

        if (response.data.success) {
            toast.success("Admin başarıyla eklendi!");
            handleClose2();
            setName(''); setEmail(''); setPhone(''); setBirthDate(''); setPassword('');
        } else {
            toast.error(response.data.message || "Kayıt sırasında hata oluştu.");
        }
    };

    const handleDeleteUser = async (id) => {

        Swal.fire({
            title: "Emin misin?",
            text: "Bu kaydı silmek istiyor musun?",
            icon: "error",
            confirmButtonColor: `rgb(192, 50, 33)`,
            showCancelButton: true,
            backdrop: `rgba(60,60,60,0.8)`,
            confirmButtonText: "Sil",
            cancelButtonText: "İptal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const params = new URLSearchParams();
                params.append("id", id);

                const response = await appAxios.post("/delete_user.php", params.toString());

                if (response.data.success) {
                    toast.success("Kullanıcı başarıyla silindi!");
                    fetchUsers();
                } else {
                    toast.error(response.data.message || "Silme işlemi başarısız.");
                }

            }
        });

    };

    const handleUpdateUser = async () => {
        if (!updateName || !updateEmail || !updatePhone) {
            toast.error("Tüm alanları doldurun!");
            return;
        }

        const params = new URLSearchParams();
        params.append("id", updateId);
        params.append("name", updateName);
        params.append("email", updateEmail);
        params.append("phone", updatePhone);
        params.append("birth_date", updateBirthDate);

        const response = await appAxios.post("/update_user.php", params.toString());

        if (response.data.success) {
            toast.success("Kullanıcı başarıyla güncellendi!");
            fetchUsers();
            handleClose1();
        } else {
            toast.error(response.data.message || "Kayıt sırasında hata oluştu.");
        }
    };


    const currentUserItems = filteredUsers.slice(startPage, startPage + itemsPerPage);
    return (
        <>
            <Row>
                <Col lg="12">
                    <Card>
                        <Tab.Container defaultActiveKey="first">
                            <div className="card-header">
                                <Row className="align-items-center gy-3">
                                    <Col md="4" lg="6" className="text-md-start">
                                        <h4>Kullanıcılar</h4>
                                    </Col>
                                    <Col md="8" lg="6" className="text-md-end">
                                        <div className="">
                                            <Nav as="ul" id="User-table-tab" role="tablist" className="nav nav-tabs d-inline-flex align-items-center gap-3 flex-wrap mb-0 px-0">
                                                <li>
                                                    <Button variant="primary" onClick={handleShow}>
                                                        <span className="btn-inner">
                                                            <span className="text d-inline-block align-middle">Kullanıcı Ekle</span>{" "}
                                                            <span className="icon d-inline-block align-middle ms-1 ps-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                                    <path
                                                                        d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                                                        fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                        </span>
                                                    </Button>
                                                    <Button variant="primary ms-3" onClick={handleShow2}>
                                                        <span className="btn-inner">
                                                            <span className="text d-inline-block align-middle">Admin Ekle</span>{" "}
                                                            <span className="icon d-inline-block align-middle ms-1 ps-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                                    <path
                                                                        d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z"
                                                                        fill="currentColor" />
                                                                </svg>
                                                            </span>
                                                        </span>
                                                    </Button>
                                                </li>
                                            </Nav>
                                        </div>
                                    </Col>
                                </Row>
                                <Form.Control
                                    type="text"
                                    placeholder="Kullanıcı Ara"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-100 d-inline-block mt-2 me-2"
                                />
                            </div>
                            <Card.Body className="pt-0">

                                <div className="table-responsive">
                                    <Table className="table border-end border-start align-middle rounded">
                                        <thead className="table-dark">
                                            <tr>
                                                <th scope="col">İsim</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Telefon</th>
                                                <th scope="col">Doğum Tarihi</th>
                                                <th scope="col">Aksiyon</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentUserItems.map((item, index) => (
                                                <tr data-item="list" key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.birth_date}</td>
                                                    <td>
                                                        <a variant="" className="d-inline-block pe-2" onClick={() => handleShow1(item)}>
                                                            <span className="text-success">
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M9.31055 14.3321H14.75" stroke="currentColor"
                                                                        strokeWidth="1.5" strokeLinecap="round"
                                                                        strokeLinejoin="round" />
                                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                                        d="M8.58501 1.84609C9.16674 1.15084 10.2125 1.04889 10.9222 1.6188C10.9614 1.64972 12.2221 2.62909 12.2221 2.62909C13.0017 3.10039 13.244 4.10233 12.762 4.86694C12.7365 4.90789 5.60896 13.8234 5.60896 13.8234C5.37183 14.1192 5.01187 14.2938 4.62718 14.298L1.89765 14.3323L1.28265 11.7292C1.1965 11.3632 1.28265 10.9788 1.51978 10.683L8.58501 1.84609Z"
                                                                        stroke="currentColor" strokeWidth="1.5"
                                                                        strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M7.26562 3.50073L11.3548 6.64108" stroke="currentColor"
                                                                        strokeWidth="1.5" strokeLinecap="round"
                                                                        strokeLinejoin="round" />
                                                                </svg>
                                                            </span>
                                                        </a>{" "}
                                                        <Link to="#" className="d-inline-block ps-2 delete-btn" onClick={() => handleDeleteUser(item.id)}>
                                                            <span className="text-danger">
                                                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M12.4938 6.10107C12.4938 6.10107 12.0866 11.1523 11.8503 13.2801C11.7378 14.2963 11.1101 14.8918 10.0818 14.9106C8.12509 14.9458 6.16609 14.9481 4.21009 14.9068C3.22084 14.8866 2.60359 14.2836 2.49334 13.2853C2.25559 11.1388 1.85059 6.10107 1.85059 6.10107"
                                                                        stroke="currentColor" strokeWidth="1.5"
                                                                        strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M13.5312 3.67969H0.812744" stroke="currentColor"
                                                                        strokeWidth="1.5" strokeLinecap="round"
                                                                        strokeLinejoin="round" />
                                                                    <path
                                                                        d="M11.0804 3.67974C10.4917 3.67974 9.98468 3.26349 9.86918 2.68674L9.68693 1.77474C9.57443 1.35399 9.19343 1.06299 8.75918 1.06299H5.58443C5.15018 1.06299 4.76918 1.35399 4.65668 1.77474L4.47443 2.68674C4.35893 3.26349 3.85193 3.67974 3.26318 3.67974"
                                                                        stroke="currentColor" strokeWidth="1.5"
                                                                        strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <Pagination
                                    totalItems={filteredUsers.length}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                    onPageChange={(page) => {
                                        if (page >= 1 && page <= Math.ceil(filteredUsers.length / itemsPerPage)) {
                                            setCurrentPage(page);
                                        }
                                    }}
                                />
                            </Card.Body>
                        </Tab.Container>
                    </Card>
                </Col>
            </Row>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Kullanıcı Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group col-md-12">
                        <Form.Group className="mb-3">
                            <Form.Label>İsim <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Telefon <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" onChange={(e) => setPhone(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Doğum Tarihi <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="date" className="form-control" onChange={(e) => setBirthDate(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Şifre (8 haneli olmalı) <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="offcanvas-footer">
                        <div className="d-grid d-md-flex gap-3 p-3">
                            <Button type="submit" className="btn btn-primary d-block" onClick={handleSaveUser}>
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Kaydet</span>{" "}
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </span>
                            </Button>
                            <Button className="btn btn-secondary d-block" type="button" aria-label="Close" onClick={handleClose}>
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Kapat</span>{" "}
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </span>
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal
                show={show1}
                onHide={handleClose1}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Kullanıcı Güncelle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group col-md-12">
                        <Form.Group className="mb-3">
                            <Form.Label>İsim <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue={updateName} onChange={(e) => setUpdateName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Telefon <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue={updatePhone} onChange={(e) => setUpdatePhone(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Doğum Tarihi <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="date" className="form-control" defaultValue={updateBirthDate} onChange={(e) => setUpdateBirthDate(e.target.value)}></Form.Control>
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="offcanvas-footer">
                        <div className="d-grid d-md-flex gap-3 p-3">
                            <Button type="submit" className="btn btn-primary d-block" onClick={handleUpdateUser}>
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Güncelle</span>{" "}
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </span>
                            </Button>
                            <Button className="btn btn-secondary d-block" type="button" aria-label="Close" onClick={handleClose1}>
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Kapat</span>{" "}
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </span>
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal
                show={show2}
                onHide={handleClose2}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Admin Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group col-md-12">
                        <Form.Group className="mb-3">
                            <Form.Label>İsim <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Telefon <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" onChange={(e) => setPhone(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Doğum Tarihi <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="date" className="form-control" onChange={(e) => setBirthDate(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Şifre (8 haneli olmalı) <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="offcanvas-footer">
                        <div className="d-grid d-md-flex gap-3 p-3">
                            <Button type="submit" className="btn btn-primary d-block" onClick={handleSaveAdmin}>
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Kaydet</span>{" "}
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </span>
                            </Button>
                            <Button className="btn btn-secondary d-block" type="button" aria-label="Close" onClick={handleClose2}>
                                <span className="btn-inner">
                                    <span className="text d-inline-block align-middle">Kapat</span>{" "}
                                    <span className="icon d-inline-block align-middle ms-1 ps-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M7.32046 4.70834H4.74952V7.25698C4.74952 7.66734 4.41395 8 4 8C3.58605 8 3.25048 7.66734 3.25048 7.25698V4.70834H0.679545C0.293423 4.6687 0 4.34614 0 3.96132C0 3.5765 0.293423 3.25394 0.679545 3.21431H3.24242V0.673653C3.28241 0.290878 3.60778 0 3.99597 0C4.38416 0 4.70954 0.290878 4.74952 0.673653V3.21431H7.32046C7.70658 3.25394 8 3.5765 8 3.96132C8 4.34614 7.70658 4.6687 7.32046 4.70834Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </span>
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default User
