import React, { useState, useEffect } from "react";

const ToastAlert = ({message}) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (message) {
      setShowToast(true);
    //   setTimeout(() => {
    //     setShowToast(false);
    //   }, 50000);
    }
  }, [message]);

  const handleClose = () => {
    setShowToast(false);
  };

  return (
    <div
      className={`w-full mx-auto ${
        showToast ? "block" : "hidden"
      }`}
    >
      <div className="rounded-lg py-6 px-8 text-gray-800 font-medium relative border-2 border-red-700">
        <div className="text-sm">{message}</div>
        <button
          className="absolute top-0 right-0 px-2 py-1 rounded-full text-red-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-600"
          onClick={handleClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ToastAlert;
