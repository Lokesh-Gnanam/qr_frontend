import React, { useState } from 'react'
import UploadBox from './components/UploadBox'
import Loader from './components/Loader'
import QRSection from './components/QRSection'
import './App.css'

function App() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [qrUrl, setQrUrl] = useState(null)
  const [fileUrl, setFileUrl] = useState(null)
  const [error, setError] = useState(null)

  const handleUpload = async (file) => {
    if (!file) return

    setUploading(true)
    setProgress(0)
    setQrUrl(null)
    setFileUrl(null)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 90))
      }, 200)

      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        body: formData,
      })

      clearInterval(interval)
      setProgress(100)

      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        const text = await response.text()
        throw new Error(`Server returned: ${text || 'empty response'}`)
      }

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      const qrFullUrl = `${import.meta.env.VITE_API_URL}${data.qr_url}`
      setQrUrl(qrFullUrl)
      setFileUrl(data.file_url)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Convert Your Files to QR Code</h1>
      </header>

      <main className="main-content">
        {!qrUrl ? (
          <UploadBox onUpload={handleUpload} uploading={uploading} />
        ) : (
          <QRSection qrUrl={qrUrl} fileUrl={fileUrl} onReset={() => setQrUrl(null)} />
        )}

        {uploading && <Loader progress={progress} />}

        {error && (
          <div className="error-message">
            <p><strong>Error:</strong> {error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Please Be Patient While Uploading Large Files. Backend Might Take Some Time To Process.</p>
        <br></br>
        <p>Made by Lokesh (Artificial Intelligence and Data Science)</p>
      </footer>
    </div>
  )
}

export default App