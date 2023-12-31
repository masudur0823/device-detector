import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase_config";
import dayjs from "dayjs";
// import { v4 as uuid } from "uuid";

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

  // crud -----------------------------------------
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // const [deviceId, setDeviceId] = useState();

  // useEffect(() => {
  //   const deviceIdFromCookie = document.cookie.match(/deviceId=(\w+)/);
  //   if (deviceIdFromCookie) {
  //     // console.log(deviceIdFromCookie[1]);
  //     setDeviceId(deviceIdFromCookie.input.slice(9));
  //   } else {
  //     const newDeviceId = uuid();

  //     document.cookie = `deviceId=${newDeviceId}; expires=365`;
  //     setDeviceId(newDeviceId);
  //   }
  // }, []);

  return (
    <>
      {/* <h1>Your device ID is: {deviceId}</h1> */}
      <table border="1px solid gry" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Unique ID</th>
            <th>IP</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            {/* <th>PlatForm (userAgent)</th> */}
            <th>PlatForm_npm</th>
            <th>session Start time</th>
            <th>session End time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i}</td>
                <td>{item?.uniqueId}</td>
                <td>{item?.ipAddress}</td>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{dayjs(item.date).format("DD-MM-YYYY hh:ss A")}</td>
                {/* <td>{item.platform}</td> */}
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
