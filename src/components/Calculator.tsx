// filepath: /C:/Users/karan/Projects/my-vite-app/src/components/Calculator.tsx
import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleButtonClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const calculateResult = () => {
    try {
      // Evaluate the expression using the Function constructor
      const evalResult = new Function('return ' + input)();
      setResult(evalResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="w-80 mx-auto border border-gray-300 rounded-lg p-4 shadow-lg">
      <div className="mb-4">
        <div className="bg-gray-100 p-2 rounded text-right mb-2 text-xl text-black h-12">
          {input}
        </div>
        <div className="bg-gray-100 p-2 rounded text-right text-xl text-black h-12">
          {result}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button
          className="p-4 bg-gray-200 rounded"
          onClick={() => handleButtonClick('1')}
        >
          1
        </button>
        <button
          className="p-4 bg-gray-200 rounded"
          onClick={() => handleButtonClick('2')}
        >
          2
        </button>
        <button
          className="p-4 bg-gray-200 rounded"
          onClick={() => handleButtonClick('3')}
        >
          3
        </button>
        <button
          className="p-4 bg-blue-200 rounded"
          onClick={() => handleButtonClick('+')}
        >
          +
        </button>
        <button
          className="p-4 bg-gray-200 rounded"
          onClick={() => handleButtonClick('4')}
        >
          4
        </button>
        <button
          className="p-4 bg-gray-200 rounded"
          onClick={() => handleButtonClick('5')}
        >
          5
        </button>
        <button
          className="p-4 bg-gray-200 rounded"
          onClick={() => handleButtonClick('6')}
        >
          6
        </button>
        <button
          className="p-4 bg-blue-200 rounded"
          onClick={() => handleButtonClick('-')}
        >
          -
        </button>
        <button
          className="p-4 bg-gray-200 rounded"
          onClick={() => handleButtonClick('7')}
        >
          7
        </button>
        <button
          className="p-4 bg-gray-200 rounded"
          onClick={() => handleButtonClick('8')}
        >
          8
        </button>
        <button
          className="p-4 bg-gray-200 rounded"
          onClick={() => handleButtonClick('9')}
        >
          9
        </button>
        <button
          className="p-4 bg-blue-200 rounded"
          onClick={() => handleButtonClick('*')}
        >
          *
        </button>
        <button
          className="p-4 bg-gray-200 rounded"
          onClick={() => handleButtonClick('0')}
        >
          0
        </button>
        <button className="p-4 bg-green-200 rounded" onClick={calculateResult}>
          =
        </button>
        <button
          className="p-4 bg-blue-200 rounded"
          onClick={() => handleButtonClick('/')}
        >
          /
        </button>
        <button className="p-4 bg-red-200 rounded" onClick={clearInput}>
          C
        </button>
      </div>
    </div>
  );
};

export default Calculator;
