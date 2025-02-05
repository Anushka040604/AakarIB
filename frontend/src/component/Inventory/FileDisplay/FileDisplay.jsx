import React, { useState } from 'react';
import { FaFile } from 'react-icons/fa';  // File icon
import './FileDisplay.css';  // Import the CSS file

const FileDisplay = ({ fileName="photo", fileType,fileUrl }) => {
  const [openFile, setOpenFile] = useState(false);

  const handleFileClick = () => {
    setOpenFile(true);
  };

  const handleClose = () => {
    setOpenFile(false);
  };

  return (
    <div className="file-display">
      {/* File Icon (Same icon for all file types) */}
      <div onClick={handleFileClick} className="file-icon">
        <FaFile size={30} />
      </div>

      {/* File Viewer Modal */}
      {openFile && (
        <div className="modal">
          <button onClick={handleClose} className="close-btn">Close</button>
          <div className="file-viewer">
            {/* Conditional rendering based on file type */}
            { fileType ==='pdf'  && (
              <iframe src={`http://localhost:3000/${fileUrl}`} width="100%" height="100%" title="PDF Viewer" />
             )} 
            {fileType === 'image'&& (
              <img src={`http://localhost:3000/${fileUrl}`} alt={fileName} width="100%" height="100%" />
            )}
            {(fileType === 'docx' || fileType === 'xlsx') && (
              <p>Preview for {fileType} files is not available. You can download it.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDisplay;
