import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import './UploadBox.css'

const UploadBox = ({ onUpload, uploading }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0])
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: uploading,
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  return (
    <div
      {...getRootProps()}
      className={`upload-box ${isDragActive ? 'drag-active' : ''} ${uploading ? 'disabled' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="upload-content">
        <svg className="upload-icon" viewBox="0 0 24 24" width="48" height="48">
          <path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
        </svg>
        <p className="upload-text">
          {isDragActive
            ? 'Drop your file here'
            : 'Drag & Drop your files here or browse'}
        </p>
        <p className="upload-hint">
          Supported: PDF, Images, MP3, WAV, MP4 (Max 10MB)
        </p>
      </div>
    </div>
  )
}

export default UploadBox