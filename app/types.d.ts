// 판매 기록 (RecordItem)
export interface RecordItem {
  id: number;       // 고유 ID (Date.now() 등으로 생성)
  name: string;     // 상품명
  price: number;    // 단가
  qty: number;      // 수량
  option?: string;  // 옵션 (선택사항)
  time: string;     // 시간 (HH:MM:SS)
  date: string;     // 판매일 (YYYY-MM-DD)
}

// 상품 목록 (Product)
export interface Product {
  name: string;         // 상품명
  price: number;        // 단가
  options?: string[];   // 선택 옵션 (선택사항)
}
