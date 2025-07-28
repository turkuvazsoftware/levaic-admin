import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Form, Button } from 'react-bootstrap';
import appAxios from "../utilities/appAxios"
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/auth/actions';

const Profile = () => {
    const userRole = useSelector(state => state.auth.user?.role);
    const userId = useSelector(state => state.auth.user?.id);
    const userName = useSelector(state => state.auth.user?.name);
    const userEmail = useSelector(state => state.auth.user?.email);
    const userPhone = useSelector(state => state.auth.user?.phone);
    const userBirthDate = useSelector(state => state.auth.user?.birth_date);

    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        birth_date: '',
    });

    useEffect(() => {
        setFormData({
            name: userName || '',
            email: userEmail || '',
            phone: userPhone || '',
            birth_date: userBirthDate || '',
        });
    }, [userName, userEmail, userPhone, userBirthDate]);

    const roleLabels = {
        admin: 'Admin',
        clinic: 'Klinik',
        consultant: 'Danışman',
        user: 'Kullanıcı'
    };

    const roleLabel = roleLabels[userRole] || userRole || 'Bilinmiyor';

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };


    const handleSave = async () => {
        const params = new URLSearchParams();
        params.append("id", userId);
        params.append("name", formData.name);
        params.append("email", formData.email);
        params.append("phone", formData.phone);
        params.append("birth_date", formData.birth_date);

        const response = await appAxios.post("/update_user.php", params.toString());

        if (response.data.success) {
            toast.success("Profil başarıyla güncellendi!");

            dispatch(updateUser({
                ...formData,
                id: userId,
                role: userRole
            }));

        } else {
            toast.error(response.data.message || "Güncelleme sırasında hata oluştu.");
        }
    };
    return (
        <Card>
            <Card.Header>
                <h4 className="card-title">Profil Düzenle</h4>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="name">İsim</Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="phone">Telefon</Form.Label>
                        <Form.Control
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="birth_date">Doğum Tarihi</Form.Label>
                        <Form.Control
                            type="date"
                            id="birth_date"
                            value={formData.birth_date}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Rol bilgisi, değiştirilemez, sadece gösterim */}
                    <Form.Group className="mb-3">
                        <Form.Label>Rol</Form.Label>
                        <Form.Control
                            type="text"
                            value={roleLabel}
                            disabled
                            readOnly
                        />
                    </Form.Group>

                    <Button type="button" variant="primary" onClick={handleSave}>Kaydet</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Profile;