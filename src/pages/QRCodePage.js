import React, { useMemo, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Style/QRCodePage.css';

const normalizeQRItems = (qrCodeValues, eventTitles) => {
  if (!qrCodeValues || !Array.isArray(qrCodeValues) || qrCodeValues.length === 0) return [];
  const first = qrCodeValues[0];
  if (typeof first === 'string') {
    return qrCodeValues.map((qrCode) => ({ qrCode, eventTitle: eventTitles || 'Event' }));
  }
  return qrCodeValues.map((item) => ({ qrCode: item.qrCode, eventTitle: item.eventTitle || 'Event' }));
};

const QRCodePage = () => {
  const location = useLocation();
  const { qrCodeValues, eventTitles } = location.state || {};

  const items = useMemo(() => normalizeQRItems(qrCodeValues, eventTitles), [qrCodeValues, eventTitles]);

  useEffect(() => {
    document.title = "QR-Code Dashboard";
    if (items.length === 0) {
      toast.error("Book Ticket First!", { toastId: 'book-ticket-error', hideProgressBar: true, autoClose: 800 });
    } else {
      toast.info("Booked Ticket", { toastId: 'book-ticket-info', hideProgressBar: true, autoClose: 800 });
    }
  }, [items.length]);

  if (items.length === 0) {
    return (
      <div className="qr-code-container">
        <h2 className="qr-code-title">Booked QR Codes</h2>
        <p>No QR codes available. Book a ticket first.</p>
      </div>
    );
  }

  return (
    <div className="qr-code-container">
      <h2 className="qr-code-title">Booked QR Codes</h2>
      <div className="qr-code-list">
        {items.map((item, index) => (
          <div key={index} className="qr-code-item" tabIndex={0}>
            <h3>{item.eventTitle}</h3>
            <QRCodeCanvas
              className="qr-code-canvas"
              value={item.qrCode}
              size={160}
              bgColor="#ffffff"
              fgColor="#2a2a72"
              level="H"
              includeMargin={true}
              title={item.qrCode}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRCodePage;