'use client';

import { useState } from 'react';
import { Product } from '../types';

interface Props {
  products: Product[];
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  setOption: (option: string | undefined) => void;
  updatePrice: (index: number, newPrice: number) => void;
}

export default function ProductButtons({
  products,
  selectedProduct,
  setSelectedProduct,
  setOption,
  updatePrice
}: Props) {
  const [isCustomInputActive, setIsCustomInputActive] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState(0);

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {products.map((product, idx) => (
        <div key={product.name} className="relative">
          <button
            className={`px-4 py-2 rounded border ${selectedProduct.name === product.name ? 'bg-indigo-500 text-white' : 'bg-white text-black'}`}
            onClick={() => {
              setSelectedProduct(product);
              setOption(undefined);
              setIsCustomInputActive(false);
            }}
          >
            {product.name}
          </button>
          <button
            className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              const newPrice = prompt(`${product.name}의 새 가격`, product.price.toString());
              if (newPrice) updatePrice(idx, parseInt(newPrice));
            }}
          >
            ✏️
          </button>
        </div>
      ))}

      <div className="relative">
        <button
          className={`px-4 py-2 rounded border ${isCustomInputActive ? 'bg-indigo-500 text-white' : 'bg-white text-black'}`}
          onClick={() => {
            setIsCustomInputActive(true);
            setSelectedProduct({ name: customName, price: customPrice });
            setOption(undefined);
          }}
        >
          기타
        </button>
      </div>

      {selectedProduct.name === '뽑기' && (
        <input
          type="text"
          placeholder="비고를 입력하세요"
          className="border px-4 py-2 rounded w-full mt-2"
          onChange={(e) => setOption(e.target.value)}
        />
      )}

      {isCustomInputActive && (
        <div className="flex flex-col gap-2 w-full mt-2">
          <input
            type="text"
            placeholder="상품명을 입력하세요"
            className="border px-4 py-2 rounded"
            value={customName}
            onChange={(e) => {
              setCustomName(e.target.value);
              setSelectedProduct({
                name: e.target.value,
                price: customPrice
              });
            }}
          />
          <input
            type="number"
            placeholder="가격을 입력하세요"
            className="border px-4 py-2 rounded"
            value={customPrice}
            onChange={(e) => {
              const price = parseInt(e.target.value, 10);
              setCustomPrice(price);
              setSelectedProduct({
                name: customName,
                price
              });
            }}
          />
          <input
            type="text"
            placeholder="비고를 입력하세요"
            className="border px-4 py-2 rounded"
            onChange={(e) => setOption(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}