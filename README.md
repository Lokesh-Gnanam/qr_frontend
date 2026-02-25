# 🚀 QR Generator Website
A full-stack web application that allows users to upload files (Images, PDFs, Audio, Video) and instantly generate a QR code for accessing the file.

The file is securely stored in Cloudinary and the QR code contains the public file URL.

---

## 🌐 Live Demo

Frontend: https://qrgencode.vercel.app  
Backend: https://qr-generator-kvjq.onrender.com  

---

## 📌 Features

- 📁 Upload files (PNG, JPG, JPEG, PDF, MP3, WAV, MP4)
- 🔐 Secure file storage using Cloudinary
- 🔗 Automatic QR code generation
- 📥 Download QR Code
- 👀 View QR Code in browser
- ⚡ Upload animation and status messages
- 🌍 Fully deployed (Frontend + Backend)

---

## 🏗️ Tech Stack

### Frontend
- React (Vite / CRA)
- Axios
- CSS

### Backend
- Flask (Python)
- Cloudinary (File Storage)
- QRCode Library
- Gunicorn (Production Server)

### Deployment
- Frontend → Vercel
- Backend → Render
- Storage → Cloudinary

---
### 📂 Project Structure
```
qr_generator/
│
├── app.py
├── requirements.txt
├── .env
│
├── frontend/
│ ├── package.json
│ ├── src/
│ │ ├── components/
│ │ ├── App.jsx
│ │ └── main.jsx
│ │
│ └── public/
│
└── README.md
