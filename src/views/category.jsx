import React, { useState, useEffect } from 'react'
import { Row, Col, Tab, Nav, Button, Table, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from '../components/pagination'
import Card from '../components/bootstrap/card'
import { useSelector } from 'react-redux';
import appAxios from "../utilities/appAxios"
import { toast } from 'react-toastify';
import Swal from "sweetalert2";


const Category = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [name, setName] = useState('');

    const [updateId, setUpdateId] = useState('');
    const [updateName, setUpdateName] = useState('');

    const fetchCategories = async () => {
        const response = await appAxios.get("/get_categories.php");

        if (response.data.success) {
            setCategoryList(response.data.data);
        } else {
            setError(response.data.message || 'Veri alınamadı.');
        }
    };

    useEffect(() => {
        Promise.all([fetchCategories()])
    }, []);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const startPage = (currentPage - 1) * itemsPerPage;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => {
        setUpdateName("")
        setShow1(false)
    };
    const handleShow1 = (item) => {
        setUpdateId(item.id)
        setUpdateName(item.name)
        setShow1(true)
    };

    const filteredCategories = categoryList.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSaveCategory = async () => {
        if (!name) {
            toast.error("Tüm alanları doldurun!");
            return;
        }

        const params = new URLSearchParams();
        params.append("name", name);

        const response = await appAxios.post("/create_category.php", params.toString());

        if (response.data.success) {
            toast.success("Kategori başarıyla eklendi!");
            fetchCategories();
            handleClose();
            setName('');
        } else {
            toast.error(response.data.message || "Kayıt sırasında hata oluştu.");
        }

    };

    const handleDeleteCategory = async (id) => {
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

                const response = await appAxios.post("/delete_category.php", params.toString());

                if (response.data.success) {
                    toast.success("Kategori başarıyla silindi!");
                    fetchCategories();
                } else {
                    toast.error(response.data.message || "Silme işlemi başarısız.");
                }

            }
        });

    };



    const handleUpdateCategory = async () => {
        if (!updateName) {
            toast.error("Tüm alanları doldurun!");
            return;
        }

        const params = new URLSearchParams();
        params.append("id", updateId);
        params.append("name", updateName);

        const response = await appAxios.post("/update_category.php", params.toString());

        if (response.data.success) {
            toast.success("Kategori başarıyla güncellendi!");
            fetchCategories();
            handleClose1();
        } else {
            toast.error(response.data.message || "Kayıt sırasında hata oluştu.");
        }
    };


    const currentCategoryItems = filteredCategories.slice(startPage, startPage + itemsPerPage);
    return (
        <>
            <Row>
                <Col lg="12">
                    <Card>
                        <Tab.Container defaultActiveKey="first">
                            <div className="card-header">
                                <Row className="align-items-center gy-3">
                                    <Col md="4" lg="6" className="text-md-start">
                                        <h4>Kategoriler</h4>
                                    </Col>
                                    <Col md="8" lg="6" className="text-md-end">
                                        <div className="">
                                            <Nav as="ul" id="category-table-tab" role="tablist" className="nav nav-tabs d-inline-flex align-items-center gap-3 flex-wrap mb-0 px-0">
                                                <li>
                                                    <Button variant="primary" onClick={handleShow}>
                                                        <span className="btn-inner">
                                                            <span className="text d-inline-block align-middle">Kategori Ekle</span>{" "}
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
                                    placeholder="Kategori Ara"
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
                                                <th scope="col">Url İsmi</th>
                                                <th scope="col">Aksiyon</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentCategoryItems.map((item, index) => (
                                                <tr data-item="list" key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.nameforurl}</td>
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
                                                        <Link to="#" className="d-inline-block ps-2 delete-btn" onClick={() => handleDeleteCategory(item.id)}>
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
                                    totalItems={filteredCategories.length}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                    onPageChange={(page) => {
                                        if (page >= 1 && page <= Math.ceil(filteredCategories.length / itemsPerPage)) {
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
                    <Modal.Title>Kategori Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group col-md-12">
                        <Form.Group className="mb-3">
                            <Form.Label>İsim <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="offcanvas-footer">
                        <div className="d-grid d-md-flex gap-3 p-3">
                            <Button type="submit" className="btn btn-primary d-block" onClick={handleSaveCategory}>
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
                    <Modal.Title>Kategori Güncelle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group col-md-12">
                        <Form.Group className="mb-3">
                            <Form.Label>İsim <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" className="form-control" defaultValue={updateName} onChange={(e) => setUpdateName(e.target.value)}></Form.Control>
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="offcanvas-footer">
                        <div className="d-grid d-md-flex gap-3 p-3">
                            <Button type="submit" className="btn btn-primary d-block" onClick={handleUpdateCategory}>
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
        </>
    )
}

export default Category
