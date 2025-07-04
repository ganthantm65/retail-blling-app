import React from 'react';
import { usePDF } from 'react-to-pdf';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Invoice = ({ cartItems, total, tax, visible, updateVisible }) => {
  const { toPDF, targetRef } = usePDF({ filename: 'invoice.pdf' });
  const grandTotal = parseFloat((total + tax).toFixed(2));

  if (!visible) return null;

  return (
    <>
      <div className="absolute top-20 left-1/3 w-[600px] bg-white rounded-xl shadow-2xl p-6 font-poppins text-black z-50 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Invoice</h1>
          <button
            onClick={updateVisible}
            className="text-red-600 font-bold text-lg hover:underline"
          >
            ✖
          </button>
        </div>

        <div className="max-h-60 overflow-y-auto border rounded p-2">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b py-1 text-sm"
            >
              <div>
                <p className="font-medium">{item.product_name}</p>
                <p className="text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div>
                <p>₹ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹ {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (12%):</span>
            <span>₹ {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>₹ {grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={() => toPDF()}
          className="flex justify-center items-center gap-2 w-full h-10 rounded-lg bg-violet-500 text-white font-semibold shadow-lg"
        >
          Download Invoice <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>

      <div style={{ position: 'absolute', top: '-10000px', left: '-10000px' }}>
        <div
            ref={targetRef}
            style={{
            width: '100%',
            padding: '24px',
            backgroundColor: '#ffffff',
            color: '#000000',
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.6',
            border: '1px solid #ccc',
            borderRadius: '8px',
            }}
        >
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            Invoice
            </h2>

            {cartItems.map((item, index) => (
            <div
                key={index}
                style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #ddd',
                padding: '8px 0',
                }}
            >
                <div>
                <p style={{ margin: 0 }}>{item.product_name}</p>
                </div>
                <p style={{ margin: 0 }}>
                ₹ {(item.price * item.quantity).toFixed(2)}
                </p>
            </div>
            ))}

            <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600 }}>Subtotal:</span>
                <span>₹ {total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600 }}>GST (12%):</span>
                <span>₹ {tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px' }}>
                <span>Total:</span>
                <span>₹ {grandTotal.toFixed(2)}</span>
            </div>
            </div>
        </div>
        </div>

    </>
  );
};

export default Invoice;
