// import DeviceDetector from "device-detector-js";
import React, { useEffect, useState } from "react";

function DetectDevice() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (navigator.onLine === true) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, []);
  // const deviceDetector = new DeviceDetector();
  // const userAgent =
  //   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36";
  // const device = deviceDetector.parse(userAgent);
  // console.log(device);
  return <div>{isOnline ? "Online" : "Offine"}</div>;
}

export default DetectDevice;
