import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import styles from "./QRScanner.module.css";

const QRScanner = (props: any) => {
  const { show } = props;
  const videoElementRef = useRef<any>(null);
  const [scanned, setScannedText] = useState("");

  useEffect(() => {
    const video = videoElementRef.current;
    const qrScanner = new QrScanner(
      video,
      (result) => {
        console.log("decoded qr code:", result);
        setScannedText(result.data);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );
    qrScanner.start();
    console.log("start");

    return () => {
      console.log(qrScanner);
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);

  return (
    <div className={`h-full ${show ? "opacity-100" : "opacity-0"}`}>
      <div className={styles.videoWrapper + " h-[90%]"}>
        <video className={styles.qrVideo + " h-full"} ref={videoElementRef} />
      </div>
      <p className={styles.scannedText + " text-black"}>SCANNED: {scanned}</p>
    </div>
  );
};

export default QRScanner;
