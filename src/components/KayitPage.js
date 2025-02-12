import React, { useState } from 'react';
import './KayitPage.css';

function KayitPage() {
    const [formData, setFormData] = useState({
        adSoyad: '',
        telefon: '',
        email: '',
        sifre: ''
    });

    const [message, setMessage] = useState(null); // Kullanıcıya mesaj göstermek için

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'Kayıt başarılı!' });
                setFormData({ adSoyad: '', telefon: '', email: '', sifre: '' }); // Formu sıfırla
            } else {
                setMessage({ type: 'error', text: 'Kayıt başarısız. Lütfen tekrar deneyin.' });
            }
        } catch (error) {
            console.error('Kayıt hatası:', error);
            setMessage({ type: 'error', text: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' });
        }
    };

    return (
        <div className="kayit-container">
            <div className="kayit-form-card">
                <h2>Kayıt Ol</h2>
                {message && <p className={message.type === 'success' ? 'success' : 'error'}>{message.text}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="adSoyad"
                            value={formData.adSoyad}
                            onChange={handleChange}
                            required
                            placeholder="Ad Soyad"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="tel"
                            name="telefon"
                            value={formData.telefon}
                            onChange={handleChange}
                            required
                            placeholder="Telefon"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="E-mail"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="sifre"
                            value={formData.sifre}
                            onChange={handleChange}
                            required
                            placeholder="Şifre"
                        />
                    </div>

                    <button type="submit">Kayıt Ol</button>
                </form>
            </div>
        </div>
    );
}

export default KayitPage;
