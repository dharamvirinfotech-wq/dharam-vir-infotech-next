"use client";
import React from "react";

const FloatingWhatsApp = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+918750299299";
    const message = "Hello! I need assistance.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="floating-whatsapp" onClick={handleWhatsAppClick}>
        <img
          src="/whatsapp-icon.svg"
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </div>

      <style jsx>{`
        .floating-whatsapp {
          position: fixed;
          bottom: 90px; /* increased from 25px to 90px to avoid overlap */
          right: 16px;
          z-index: 9999;
          cursor: pointer;
          background-color: #25d366;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease-in-out;
        }

        .floating-whatsapp:hover {
          transform: scale(1.1);
          background-color: #20b858;
        }

        .whatsapp-icon {
          width: 35px;
          height: 35px;
          object-fit: contain;
        }
      `}</style>
    </>
  );
};

export default FloatingWhatsApp;
