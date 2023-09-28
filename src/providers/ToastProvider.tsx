"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#919191",
          color: "#fff",
          display: 'flex',
          textAlign: 'center'
        },
      }}
    />
  );
};

export default ToasterProvider;