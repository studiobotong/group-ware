'use client';

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
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {products.map((product, idx) => (
        <div key={product.name} className="relative">
          <button
            className={`px-4 py-2 rounded border ${selectedProduct.name === product.name ? 'bg-indigo-500 text-white' : 'bg-white text-black'}`}
            onClick={() => { setSelectedProduct(product); setOption(undefined); }}
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
    </div>
  );
}
