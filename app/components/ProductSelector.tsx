'use client';

import React from 'react';
import { Product } from '../types'; // 기존 타입 재사용

interface Props {
  products: Product[];
  selectedProductName: string;
  onSelect: (productName: string) => void;
  onEdit: (productName: string) => void;
}

export default function ProductSelector({
  products,
  selectedProductName,
  onSelect,
  onEdit,
}: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {products.map((product) => (
        <div
          key={product.name}
          className={`relative border rounded p-3 cursor-pointer ${
            selectedProductName === product.name
              ? 'bg-indigo-100 border-indigo-400'
              : 'hover:bg-gray-100'
          }`}
          onClick={() => onSelect(product.name)}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">
                {/* ❗ 안전하게 처리: 가격이 있을 때만 표시 */}
                {typeof product.price === 'number'
                  ? product.price.toLocaleString() + '원'
                  : '가격 없음'}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // 클릭 버블링 방지
                onEdit(product.name);
              }}
              className="text-sm text-gray-400 hover:text-indigo-500"
              title="수정"
            >
              ✏️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
