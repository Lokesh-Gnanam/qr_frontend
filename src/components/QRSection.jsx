import React, { useState } from 'react'
import FileViewerModal from './FileViewerModal'
import './QRSection.css'

const QRSection = ({ qrUrl, fileUrl, onReset }) => {
  const [showFileModal, setShowFileModal] = useState(false)

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'qr_code.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download QR code. Please try again.')
    }
  }

  return (
    <div className="qr-box">
      <h2>Your QR Code is Ready!</h2>
      <div className="qr-image-container">
        <img src={qrUrl} alt="QR Code" className="qr-image" />
      </div>
      <div className="qr-actions">
        <button onClick={handleDownloadQR} className="btn btn-primary">
          DOWNLOAD QR
        </button>
        <button onClick={() => setShowFileModal(true)} className="btn btn-secondary">
          View File
        </button>
        <button onClick={onReset} className="btn btn-outline">
          Convert Another File
        </button>
      </div>

      {showFileModal && (
        <FileViewerModal 
          fileUrl={fileUrl} 
          onClose={() => setShowFileModal(false)} 
        />
      )}
    </div>
  )
}

export default QRSection    