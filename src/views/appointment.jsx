import React, { useState, useEffect } from 'react'
import { Row, Col, Tab, Nav, Button, Table, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from '../components/pagination'
import DateTimePicker from '../components/dateTimePicker'
import Card from '../components/bootstrap/card'
import { useSelector } from 'react-redux';
import appAxios from "../utilities/appAxios"
import Select from 'react-select';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import { iteratee, set } from 'lodash';

const Appointment = () => {
    const [date, setDate] = useState(null);
    const [selectedConsultant, setSelectedConsultant] = useState(null);
    const [appointmentList, setAppointmentList] = useState([]);

    const [updateId, setUpdateId] = useState(null);
    const [updateDate, setUpdateDate] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(null);

    const [consultantList, setConsultantList] = useState([]);

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const userRole = useSelector(state => state.auth.user?.role);
    const userId = useSelector(state => state.auth.user?.id);

    const getAppointmentStatus = (status) => {
        switch (status) {
            case "scheduled":
                return <p className="bg-success-subtle pt-2 pb-2 text-center rounded">Onaylandı</p>;
            case "completed":
                return <p className="bg-info-subtle pt-2 pb-2 text-center rounded">Tamamlandı</p>;
            case "pending":
                return <p className="bg-warning-subtle pt-2 pb-2 text-center rounded">Beklemede</p>;
            case "cancelled":
                return <p className="bg-danger-subtle pt-2 pb-2 text-center rounded">İptal Edildi</p>;
            default:
                return <p className="bg-info-subtle pt-2 pb-2 text-center rounded">{status || "Bilinmiyor"}</p>;
        }
    };

    const getStatusList = (activeStatus) => {
        let statusList = [
            { value: "scheduled", label: "Onaylandı" },
            { value: "completed", label: "Tamamlandı" },
            { value: "pending", label: "Beklemede" },
            { value: "cancelled", label: "İptal Edildi" },
        ];

        if (activeStatus && activeStatus.value === "scheduled") {
            statusList = statusList.filter(x => x.value !== "pending");
        }

        return statusList;
    }

    const getStatusName = (status) => {
        switch (status) {
            case "scheduled":
                return "Onaylandı";
            case "completed":
                return "Tamamlandı";
            case "pending":
                return "Beklemede";
            case "cancelled":
                return "İptal Edildi";
            default:
                return status;
        }
    };

    useEffect(() => {
        const fetchConsultants = async () => {
            const params = new URLSearchParams();
            params.append("role", "consultant");

            const response = await appAxios.get("/get_users.php?" + params.toString());

            if (response.data.success) {
                setConsultantList(response.data.data.map(x => ({ label: x.name, value: parseInt(x.id) })));
            } else {
                setError(response.data.message || 'Veri alınamadı.');
            }
        };

        Promise.all([fetchConsultants(), fetchAppointments()])
    }, []);

    const fetchAppointments = async () => {
        const params = new URLSearchParams();
        if (userRole === "consultant") {
            params.append("consultant_id", userId);
        }
        const response = await appAxios.get("/get_appointments.php?" + params.toString());

        if (response.data.success) {
            setAppointmentList(response.data.appointments);
        } else {
            setError(response.data.message || 'Veri alınamadı.');
        }
    };

    const handleAddAppointment = async (e) => {
        e.preventDefault();

        if (userRole === "consultant") {
            setSelectedConsultant({value: userId, label: userId});
        }

        if (!selectedConsultant) {
            toast.error("Danışman seçiniz");
            return;
        }
        if (!date) {
            toast.error("Tarih ve saat seçiniz");
            return;
        }

        const appointment_date = date.toISOString().split("T")[0];
        const appointment_time = date.toTimeString().split(" ")[0].slice(0, 5);

        const params = new URLSearchParams();
        params.append("user_id", parseInt(userId));
        params.append("consultant_id", parseInt(selectedConsultant.value));
        params.append("appointment_date", appointment_date);
        params.append("appointment_time", appointment_time);
        params.append("status", "pending");

        const response = await appAxios.post("/save_appointment.php", params);

        if (response.data.success) {
            toast.success("Randevu başarıyla eklendi");
            await fetchAppointments()
            handleClose();
            setSelectedConsultant(null);
            setDate(null);
        } else {
            toast.error(response.data.message || "Randevu eklenirken hata oluştu");
        }
    };

    const handleAppointmentUpdate = async () => {
        if (!updateStatus || !updateDate) {
            toast.error("Tüm alanları doldurun!");
            return;
        }

        const appointment_date = updateDate.toISOString().split("T")[0];
        const appointment_time = updateDate.toTimeString().split(" ")[0].slice(0, 5);

        const params = new URLSearchParams();
        params.append("id", updateId);
        params.append("appointment_date", appointment_date);
        params.append("appointment_time", appointment_time);
        params.append("status", updateStatus.value);


        const response = await appAxios.post("/update_appointment.php", params.toString());

        if (response.data.success) {
            toast.success("Randevu başarıyla güncellendi!");
            fetchAppointments();
            handleClose1();
        } else {
            toast.error(response.data.message || "Kayıt sırasında hata oluştu.");
        }
    };

    const handleDeleteAppointment = async (id) => {
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

                const response = await appAxios.post("/delete_appointment.php", params.toString());

                if (response.data.success) {
                    toast.success("Randevu başarıyla silindi!");
                    fetchAppointments();
                } else {
                    toast.error(response.data.message || "Silme işlemi başarısız.");
                }

            }
        });

    };

    const startPage = (currentPage - 1) * itemsPerPage;
    const currentAppointmentItems = appointmentList.slice(startPage, startPage + itemsPerPage);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = (item) => {
        setUpdateId(item.id);
        const dateTimeString = `${item.appointment_date}T${item.appointment_time}`;
        const updateDate = new Date(dateTimeString);
        setUpdateDate(updateDate);
        setUpdateStatus({ value: item.status, label: getStatusName(item.status) })
        setShow1(true);
    }

    return (
        <>
            <Row>
                <Col lg="12">
                    <Card>
                        <Tab.Container defaultActiveKey="first">
                            <div className="card-header">
                                <Row className="align-items-center gy-3">
                                    <Col md="4" lg="6" className="text-md-start">
                                        <h4>Randevular</h4>
                                    </Col>
                                    <Col md="8" lg="6" className="text-md-end">
                                        <div className="">
                                            <Nav as="ul" id="appointment-table-tab" role="tablist" className="nav nav-tabs d-inline-flex align-items-center gap-3 flex-wrap mb-0 px-0">
                                                <li>
                                                    <Button variant="primary" onClick={handleShow}>
                                                        <span className="btn-inner">
                                                            <span className="text d-inline-block align-middle">Randevu Ekle</span>{" "}
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
                            </div>
                            <Card.Body className="pt-0">

                                <div className="table-responsive">
                                    <Table className="table border-end border-start align-middle rounded">
                                        <thead className="table-dark">
                                            <tr>
                                                <th scope="col">Danışman</th>
                                                <th scope="col">Tarih</th>
                                                <th scope="col">Saat</th>
                                                <th scope="col">Zoom</th>
                                                <th scope="col">Durum</th>
                                                <th scope="col">Aksiyon</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentAppointmentItems.map((item, index) => (
                                                <tr data-item="list" key={index}>
                                                    <td>{consultantList.find(x => x.value === item.consultant_id)?.label || item.consultant_id}</td>
                                                    <td>{item.appointment_date}</td>
                                                    <td>{item.appointment_time}</td>
                                                    <td>
                                                        {item.status === 'completed' || item.status === 'scheduled' ? (
                                                            <a href={item.zoom_link} target="_blank" rel="noopener noreferrer">
                                                                Zoom Bağlantısı
                                                            </a>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </td>
                                                    <td>{getAppointmentStatus(item.status)}</td>

                                                    <td>
                                                        {item.status !== "completed" && (
                                                            <>
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
                                                                <Link to="#" className="d-inline-block ps-2 delete-btn" onClick={() => handleDeleteAppointment(item.id)}>
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
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <Pagination
                                    totalItems={appointmentList.length}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                    onPageChange={(page) => {
                                        if (page >= 1 && page <= Math.ceil(appointmentList.length / itemsPerPage)) {
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
                    <Modal.Title>Randevu Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group col-md-12">
                        {userRole === "admin" && (
                            <Form.Group className="mb-3 custom-choicejs">
                                <Form.Label>Danışman <span className="text-danger">*</span></Form.Label>
                                <Select
                                    options={consultantList}
                                    className="js-choice"
                                    select="one"
                                    onChange={(val) => setSelectedConsultant(val)}
                                />
                            </Form.Group>
                        )}


                        <DateTimePicker date={date} setDate={setDate} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="offcanvas-footer">
                        <div className="d-grid d-md-flex gap-3 p-3">
                            <Button type="submit" className="btn btn-primary d-block" onClick={handleAddAppointment}>
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
                    <Modal.Title>Randevu Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group col-md-12">
                        <Form.Group className="mb-3">
                            <Form.Label>Tarih <span className="text-danger">*</span></Form.Label>
                            <DateTimePicker date={updateDate} setDate={setUpdateDate} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Durum <span className="text-danger">*</span></Form.Label>
                            <Select options={getStatusList(updateStatus)} value={updateStatus} className="js-choice" select="one" onChange={(val) => setUpdateStatus(val)} />
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="offcanvas-footer">
                        <div className="d-grid d-md-flex gap-3 p-3">
                            <Button type="submit" className="btn btn-primary d-block" onClick={handleAppointmentUpdate}>
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
                                    <span className="text d-inline-block align-middle">Close</span>{" "}
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

export default Appointment