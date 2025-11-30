# 🏥 ObesityCheck - Prediksi Level Obesitas

<div align="center">

![Python](https://img.shields.io/badge/Python-3.13+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.121+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status](https://img.shields.io/badge/Status-Active-success.svg)

**Aplikasi web prediksi tingkat obesitas berbasis Machine Learning dengan antarmuka responsif dan modern**

[Demo](#demo) • [Fitur](#-fitur-utama) • [Instalasi](#-instalasi) • [Dokumentasi](#-dokumentasi)

</div>

---

## 📖 Tentang Proyek

ObesityCheck adalah aplikasi web berbasis AI yang membantu pengguna memprediksi tingkat obesitas mereka berdasarkan berbagai faktor seperti:
- Data fisik (tinggi, berat badan, usia, jenis kelamin)
- Kebiasaan makan dan pola konsumsi
- Aktivitas fisik dan gaya hidup
- Riwayat kesehatan keluarga

Aplikasi ini menggunakan model Machine Learning yang telah dilatih untuk mengklasifikasikan tingkat obesitas ke dalam 7 kategori sesuai standar BMI dan faktor risiko kesehatan.

---

## ✨ Fitur Utama

### 🎯 Prediksi Akurat
- Menggunakan algoritma Machine Learning terlatih
- Memperhitungkan multiple faktor (bukan hanya BMI)
- Memberikan tingkat kepercayaan prediksi

### 📱 Responsive Design
- **Sidebar Navigation**: Menu burger untuk mobile & tablet
- **Overflow Fix**: Tidak ada horizontal scroll pada semua device
- **Adaptive Layout**: Optimal di desktop, tablet, dan mobile
- **Touch-Friendly**: Interface yang mudah digunakan di touchscreen

### 🎨 User Interface Modern
- Desain clean dan intuitif
- Animasi smooth dan transisi halus
- Color scheme profesional
- Icons dan visual yang menarik

### 📊 Informasi Lengkap
- 7 kategori obesitas dengan penjelasan detail
- Rekomendasi kesehatan untuk setiap kategori
- Informasi rentang BMI dan risiko kesehatan
- Disclaimer medis yang jelas

### 🔒 Keamanan & Privasi
- Tidak menyimpan data pengguna
- Proses prediksi di server
- CORS protection
- Input validation

---

## 🏗️ Teknologi

### Backend
- **FastAPI** - Modern Python web framework
- **Scikit-learn** - Machine learning library
- **Pandas & NumPy** - Data processing
- **Joblib** - Model serialization

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling dengan CSS variables
- **Vanilla JavaScript** - No framework overhead
- **Responsive Design** - Mobile-first approach

### Deployment
- **Uvicorn** - ASGI server
- **Python 3.13+**
- Compatible dengan Heroku, Railway, Render, dll

---

## 🚀 Instalasi

### Prasyarat
- Python 3.13 atau lebih tinggi
- pip atau uv (package manager)
- Git (opsional)

### Langkah Instalasi

#### 1. Clone Repository
```bash
git clone https://github.com/yourusername/websoy.git
cd websoy
```

#### 2. Buat Virtual Environment
```bash
# Menggunakan venv
python -m venv .venv

# Aktifkan virtual environment
# Windows
.venv\Scripts\activate
# Linux/Mac
source .venv/bin/activate
```

#### 3. Install Dependencies

**Menggunakan pip:**
```bash
pip install -r requirements.txt
```

**Menggunakan uv (recommended):**
```bash
uv pip install -e .
```

#### 4. Jalankan Aplikasi
```bash
# Development mode
uvicorn main:app --reload

# Production mode
uvicorn main:app --host 0.0.0.0 --port 8000
```

#### 5. Akses Aplikasi
Buka browser dan kunjungi: `http://localhost:8000`

---

## 📁 Struktur Proyek

```
websoy/
├── src/                          # Frontend files
│   ├── index.html               # Main HTML file
│   ├── styles.css               # Stylesheet dengan responsive design
│   ├── main.js                  # JavaScript logic
│   └── favicon.ico              # Favicon
├── modules/                      # Backend modules
│   ├── model/                   # ML model files
│   │   └── obesity_model.pkl    # Trained model
│   ├── router/                  # API routes
│   │   └── predict.py           # Prediction endpoint
│   ├── schema/                  # Data schemas
│   │   └── request.py           # Request/Response models
│   └── services/                # Business logic
│       └── predict.py           # Prediction service
├── docs/                         # Documentation
│   ├── RESPONSIVE_UPDATES.md    # Responsive design guide
│   └── API_DOCUMENTATION.md     # API docs (if needed)
├── main.py                       # FastAPI application entry point
├── pyproject.toml               # Project configuration
├── README.md                    # This file
└── .gitignore                   # Git ignore rules
```

---

## 🎮 Cara Penggunaan

### 1. Akses Website
Buka aplikasi di browser (localhost:8000 atau URL deployment)

### 2. Navigasi
- **Desktop**: Gunakan menu navigasi di header
- **Mobile/Tablet**: Klik ikon burger menu (☰) untuk membuka sidebar

### 3. Isi Form Prediksi
Klik "Cek Sekarang" atau scroll ke form, lalu isi:
- **Data Pribadi**: Jenis kelamin, usia, tinggi, berat badan
- **Kebiasaan Makan**: Frekuensi makan, konsumsi sayur, air
- **Gaya Hidup**: Aktivitas fisik, konsumsi alkohol, merokok
- **Kesehatan**: Riwayat keluarga, monitoring kalori

### 4. Lihat Hasil
- Klik tombol "🔮 Prediksi Sekarang"
- Tunggu proses (biasanya < 1 detik)
- Hasil akan muncul di bawah form dengan:
  - Kategori obesitas Anda
  - Nilai BMI
  - Tingkat kepercayaan prediksi
  - Rekomendasi kesehatan

---

## 📊 Kategori Obesitas

| No | Kategori | Rentang BMI | Deskripsi |
|----|----------|-------------|-----------|
| 1 | **Insufficient Weight** | < 18.5 | Berat badan di bawah rentang sehat |
| 2 | **Normal Weight** | 18.5–24.9 | Rentang berat badan sehat |
| 3 | **Overweight Level I** | 25–27.4 | Kelebihan berat badan tingkat ringan |
| 4 | **Overweight Level II** | 27.5–29.9 | Kelebihan berat badan tingkat sedang |
| 5 | **Obesity Type I** | 30–34.9 | Obesitas tingkat I |
| 6 | **Obesity Type II** | 35–39.9 | Obesitas tingkat II |
| 7 | **Obesity Type III** | ≥ 40 | Obesitas tingkat III (sangat berat) |

---

## 🔌 API Documentation

### POST `/api/predict`

**Request Body:**
```json
{
  "Gender": "Male",
  "Age": 25,
  "Height": 1.75,
  "Weight": 70,
  "family_history_with_overweight": "yes",
  "FAVC": "yes",
  "FCVC": 2,
  "NCP": 3,
  "CAEC": "Sometimes",
  "SMOKE": "no",
  "CH2O": 2,
  "SCC": "yes",
  "FAF": 2,
  "TUE": 1,
  "CALC": "Sometimes",
  "MTRANS": "Public_Transportation"
}
```

**Response:**
```json
{
  "prediction": "Normal_Weight",
  "bmi": 22.86,
  "confidence": 85.5
}
```

---

## 📱 Responsive Features

### Breakpoints
- **Desktop**: > 1024px - Full navigation
- **Tablet**: 768px - 1024px - Optimized layout
- **Mobile**: < 768px - Burger menu & sidebar
- **Small Mobile**: < 480px - Compact design

### Mobile Navigation
- **Burger Menu**: Ikon ☰ di kanan atas
- **Sidebar**: Slide-in dari kanan
- **Overlay**: Background gelap saat sidebar terbuka
- **Close Options**: 
  - Tombol X
  - Klik overlay
  - Tekan ESC
  - Klik menu item

### Overflow Fixes
✅ Result section responsive
✅ Long text wrapping
✅ Grid layouts adaptive
✅ No horizontal scroll
✅ Touch-friendly buttons

---

## 🛠️ Development

### Menjalankan Development Server
```bash
uvicorn main:app --reload --port 8000
```

### Testing
```bash
# Test API endpoint
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d @test_data.json
```

### Build untuk Production
```bash
# Install production dependencies
pip install -r requirements.txt

# Run dengan Gunicorn (optional)
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

---

## 🌐 Deployment

### Heroku
```bash
# Login
heroku login

# Create app
heroku create your-app-name

# Deploy
git push heroku main

# Open
heroku open
```

### Railway / Render
1. Connect GitHub repository
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Deploy

---

## 🤝 Contributing

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## ⚠️ Disclaimer

**Penting**: Hasil prediksi dari aplikasi ini hanya untuk referensi dan edukasi. Hasil ini **BUKAN** pengganti diagnosis medis profesional. Untuk informasi kesehatan yang akurat dan penanganan yang tepat, silakan konsultasikan dengan dokter atau profesional kesehatan yang berkualifikasi.

---

## 👥 Author

**ObesityCheck Team**
- Website: [your-website.com](https://your-website.com)
- Email: contact@your-email.com

---

## 🙏 Acknowledgments

- Dataset dari UCI Machine Learning Repository
- Icons dari Material Design
- Font dari Google Fonts (Poppins)
- Inspirasi desain dari berbagai health apps

---

## 📞 Support

Jika Anda mengalami masalah atau memiliki pertanyaan:

1. Cek [Issues](https://github.com/yourusername/websoy/issues) yang ada
2. Buat issue baru dengan detail masalah
3. Email ke: support@your-email.com

---

## 🔄 Changelog

### Version 1.1.0 (Latest)
- ✨ Added responsive sidebar navigation
- 🐛 Fixed overflow issues in result section
- 📱 Improved mobile/tablet experience
- 📝 Added detailed BMI explanations
- 🎨 Enhanced UI/UX

### Version 1.0.0
- 🎉 Initial release
- ✅ Basic prediction functionality
- 🎨 Modern UI design
- 📊 7 obesity categories

---

<div align="center">

**Made with ❤️ for healthier life**

[⬆ Back to Top](#-obesitycheck---prediksi-level-obesitas)

</div>