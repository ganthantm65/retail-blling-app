import React, { useState } from 'react';

const MessageBox = ({ message, color  }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className={`fixed z-50 top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg flex items-center justify-between text-white font-semibold text-lg ${color}`}
      role="alert"
    >
      <span>{message}</span>
      <button onClick={() => setVisible(false)} className="ml-4 text-white font-bold">
        &times;
      </button>
    </div>
  );
};

export default MessageBox;
