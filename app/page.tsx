"use client";
import React, { useEffect, useState } from 'react';
import Camera from './Camera';
import { IDevice } from './interfaces/components';

// const renderCamera = React.useCallback(
//   (e: IDevice, i: number) => 
//   <Camera {...e}  />
// )

// force auth
const authorize = async (host: any) => {
  // Force a login by fetching usergroup
  try {
    await window.fetch(`http://${host}/axis-cgi/usergroup.cgi`, {
      credentials: 'include',
      mode: 'no-cors',
    });
    return true; // Authorization succeeded
  } catch (err) {
    console.error(err);
    return false; // Authorization failed
  }
};


export default function Home() {
  // Define the list of devices
  const initialDevices: IDevice[] = [
    { hostname: '192.168.0.21', label: 'PORT/AFTER', authorized: false },
    { hostname: '192.168.0.21', label: 'PORT/AMIDSHIP', authorized: false },
    { hostname: '192.168.0.21', label: 'PORT/FORWARD', authorized: false },
    { hostname: '192.168.0.21', label: 'STARBOARD/AFTER', authorized: false },
    { hostname: '192.168.0.21', label: 'STARBOARD/AMIDSHIP', authorized: false },
    { hostname: '192.168.0.21', label: 'STARBOARD/FORWARD', authorized: false },
  ];

  // State to store the devices and their authorization status
  const [devices, setDevices] = useState<IDevice[]>(initialDevices);

  // Authorize each device in the list when the component mounts
  useEffect(() => {
    const authorizeDevices = async () => {
      const updatedDevices: IDevice[] = await Promise.all(
        initialDevices.map(async (device) => {
          const isAuthorized = await authorize(device.hostname);
          return { ...device, authorized: isAuthorized };
        })
      );

      setDevices(updatedDevices);
    };

    authorizeDevices();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {devices.length > 0 ? (
          devices.slice(0,3).map((device) => {
            return <Camera device={device} />
          })
          ) : (
          <div>No authorized devices</div>
        )}
      </div>
    </main>
  )
}
