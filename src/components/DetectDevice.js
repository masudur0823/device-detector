import DeviceDetector from "device-detector-js";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase_config";
import dayjs from "dayjs";

function DetectDevice() {
  // const [isOnline, setIsOnline] = useState(false);
  const [data, setData] = useState([]);
  const DeviceCollectionRef = collection(db, "deviceInfo");

  // useEffect(() => {
  //   if (navigator.onLine === true) {
  //     setIsOnline(true);
  //   } else {
  //     setIsOnline(false);
  //   }
  // }, []);

  useEffect(() => {
    // Check if a device identifier exists in the cookie
    const deviceIdentifier = getCookie("device_id");
    if (!deviceIdentifier) {
      // Generate a unique identifier and store it in a cookie
      const uniqueIdentifier = generateUniqueIdentifier();
      document.cookie = `device_id=${uniqueIdentifier}`;
    }
  }, []);
  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  const generateUniqueIdentifier = () => {
    // Generate a unique identifier (you may want to use a more sophisticated method)
    return Date.now().toString(36) + Math.random().toString(36);
  };

  // crud -----------------------------------------
  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const q = query(DeviceCollectionRef, orderBy("date", "desc"));
    // const q = query(expenseCollectionRef, where("category", "==", filterCategory));
    const res = await getDocs(q);
    const finalRes = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setData(finalRes);
  };

  const handleDelete = async (id) => {
    const expenseDoc = doc(db, "deviceInfo", id);
    await deleteDoc(expenseDoc);
    get();
  };

  // crud -----------------------------------------

  return (
    <>
      <table border="1px solid gry" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Unique ID</th>
            <th>Date</th>
            <th>PlatForm (userAgent)</th>
            <th>PlatForm_npm</th>
            <th>session Start time</th>
            <th>session End time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i}</td>
                <td></td>
                <td>{dayjs(item.date).format("DD-MM-YYYY hh:ss A")}</td>
                <td>{item.platform}</td>
                <td>{item.platform_npm}</td>
                <td>{dayjs(item.sessionStart).format("DD-MM-YYYY hh:ss A")}</td>
                <td>{dayjs(item.sessionEnd).format("DD-MM-YYYY hh:ss A")}</td>
                <td>
                  <button>Logout</button>
                  <button onClick={() => handleDelete(item.id)}>delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default DetectDevice;
