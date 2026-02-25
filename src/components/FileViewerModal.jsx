import React, { useEffect, useRef } from 'react'
import './FileViewerModal.css'

const FileViewerModal = ({ fileUrl, onClose }) => {
  const modalRef = useRef()

  // Determine file type from extension
  const getFileType = (url) => {
    const extension = url.split('.').pop().toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) return 'image'
    if (['mp4', 'webm', 'ogg', 'mov'].includes(extension)) return 'video'
    if (['mp3', 'wav', 'ogg', 'm4a'].includes(extension)) return 'audio'
    if (extension === 'pdf') return 'pdf'
    return 'other'
  }

  const fileType = getFileType(fileUrl)

  // Close modal when clicking outside the content
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const renderContent = () => {
    switch (fileType) {
      case 'image':
        return <img src={fileUrl} alt="Preview" className="file-preview" />
      case 'video':
        return (
          <video controls className="file-preview">
            <source src={fileUrl} />
            Your browser does not support the video tag.
          </video>
        )
      case 'audio':
        return (
          <audio controls className="audio-preview">
            <source src={fileUrl} />
            Your browser does not support the audio tag.
          </audio>
        )
      case 'pdf':
        return (
          <iframe 
            src={fileUrl} 
            title="PDF Preview" 
            className="pdf-preview"
            frameBorder="0"
          />
        )
      default:
        return (
          <div className="unsupported-preview">
            <p>Preview not available for this file type.</p>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Open File in New Tab
            </a>
          </div>
        )
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-body">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default FileViewerModal