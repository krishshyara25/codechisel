import React from 'react';
import './Contact.css';
import  girl from "../assets/girl.png"
const ThankYouScreen = ({ onClose }) => {
  return (
    <div className="thank-you-container">
      <div className="floating-icons">
        <div className="icon icon-eyes">👀</div>
        <div className="icon icon-book">📖</div>
        <div className="icon icon-chart">📈</div>
        <div className="icon icon-handshake">🤝</div>
        <div className="icon icon-party">🎉</div>
        <div className="icon icon-sparkle">✨</div>
      </div>
      
      <div className="content">
        <div className="avatar-container">
          <img 
            src={girl}
            alt="Avatar showing a girl with phone"
            className="avatar-image"
          />
        </div>
        
        <h1 className='sub'>Thank you for submitting,<br />we're excited to chat!</h1>
        <p className='reach'>We will reach out to you soon!</p>
        
        <button onClick={onClose} className="close-button">
          close
        </button>
      </div>
    </div>
  );
};

export default ThankYouScreen;