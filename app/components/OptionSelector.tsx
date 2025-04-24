'use client';

import { Product } from '../types';

interface Props {
  product: Product;
  qty: number;
  setQty: (qty: number) => void;
  option?: string;
  setOption: (opt: string) => void;
  addRecord: () => void;
}

export default function OptionSelector({ product, qty, setQty, option, setOption, addRecord }: Props) {
  return (
    <div className="space-y-2 mb-4">
      {product.options && Array.isArray(product.options) && (
        <>
          <label>비고 선택:</label>
          <select
            className="border p-2 w-full"
            value={option || ''}
            onChange={(e) => setOption(e.target.value)}
          >
            <option value="">선택 안함</option>
            {product.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </>
      )}

      <label>수량:</label>
      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="border p-2 w-full"
      />

      <button onClick={addRecord} className="bg-indigo-500 text-white px-4 py-2 rounded">
        입력
      </button>
    </div>
  );
}
