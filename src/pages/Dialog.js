import React from 'react';
import './style.css';

function Dialog({ title, body, onClose }) {
  return (
    <div className="post-popup">
      <div className="post-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
}

export default Dialog;