import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import KayitPage from './components/KayitPage';  


function App() {
  const [products, setProducts] = useState([]);

  // Backend'den ürünleri çek (Axios ile)
  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
      });
  };

  // Belirli aralıklarla veri çek (Polling)
  useEffect(() => {
    fetchProducts(); // İlk veri çekme işlemi

    const interval = setInterval(() => {
      fetchProducts(); // Her 5 saniyede bir veri çek
    }, 5000); // 5000 ms = 5 saniye

    // Temizleme fonksiyonu (component unmount olduğunda interval'i temizle)
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navigation Menüsü */}
        <nav className="navbar">
          <div className="navbar-left">
            <ul>
              <li><Link to="/">Anasayfa</Link></li>
              <li><Link to="/hakkimizda">Hakkımızda</Link></li>
              <li><Link to="/iletisim">İletişim</Link></li>
            </ul>
          </div>
          <div className="navbar-right">
            <ul>
              <li><Link to="/giris">Giriş Yap</Link></li>
              <li><Link to="/kayit">Kayıt Ol</Link></li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/kayit" element={<KayitPage />} />
          <Route path="/" element={
            <div className="content">
              <aside className="sidebar">
                <h2>Kategoriler</h2>
                <ul>
                  <li>Elektronik</li>
                  <li>Giyim</li>
                  <li>Ev & Yaşam</li>
                  <li>Spor & Outdoor</li>
                </ul>
              </aside>
              <main className="products">
                <h2>Ürünler</h2>
                <div className="product-list">
                  {products.map((product) => (
                    <div className="product-item" key={product.id}>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <p>Fiyat: {product.price} TL</p>
                    </div>
                  ))}
                </div>
              </main>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
