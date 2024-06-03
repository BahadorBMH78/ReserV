import { useState } from "react";
import { QrReader } from "react-qr-reader";
import styles from "./QRScanner.module.css";

const QRScanner = ({ show }: { show: boolean }) => {
  const [scanned, setScannedText] = useState("");

  const handleScan = (data) => {
    if (data) {
      console.log("decoded qr code:", data);
      setScannedText(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className={`h-full`}>
      {show && (
        <div className={styles.videoWrapper + " h-[90%]"}>
          <QrReader
            onResult={handleScan}
            constraints={{ facingMode: "user" }}
          />
        </div>
      )}
      <p className={styles.scannedText + " text-black"}>SCANNED: {scanned}</p>
    </div>
  );
};

export default QRScanner;
