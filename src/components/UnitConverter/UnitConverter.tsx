import React, { useState } from 'react';

const UnitConverter: React.FC = () => {
  const [pxValue, setPxValue] = useState('');
  const [remValue, setRemValue] = useState('');
  const [error, setError] = useState('');

  const handlePxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPxValue(value);
    setError('');
    if (value.length > 0) {
      const parsed = parseFloat(value);
      if (isNaN(parsed) || parsed <= 0) {
        setError('Please enter a valid positive number for pixels.');
        setRemValue('');
      } else {
        setRemValue((parsed / 16).toFixed(2));
      }
    } else {
      setRemValue('');
    }
  };

  const handleRemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRemValue(value);
    setError('');
    if (value.length > 0) {
      const parsed = parseFloat(value);
      if (isNaN(parsed) || parsed <= 0) {
        setError('Please enter a valid positive number for rems.');
        setPxValue('');
      } else {
        setPxValue((parsed * 16).toFixed(0));
      }
    } else {
      setPxValue('');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center text-black">
        Pixel (px) to Rem (rem) Converter
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="mb-4 flex-1">
          <label htmlFor="px" className="block text-gray-700 font-bold mb-1">
            Pixels (px):
          </label>
          <input
            type="number"
            id="px"
            value={pxValue}
            onChange={handlePxChange}
            placeholder="Enter pixels"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="rem" className="block text-gray-700 font-bold mb-1">
            Rems (rem):
          </label>
          <input
            type="number"
            id="rem"
            value={remValue}
            onChange={handleRemChange}
            placeholder="Enter rems"
            className="text-black w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
