"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#8b69d473",
          color: "#fff",
          display: 'flex',
          textAlign: 'center',
        },
      }}
    />
  );
};

export default ToasterProvider;