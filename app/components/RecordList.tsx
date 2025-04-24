'use client';

import React from 'react';
import { RecordItem } from '../types';

interface RecordListProps {
  records: RecordItem[];
  onDelete: (index: number) => void;
  showDate?: boolean;
  title?: string;
}

const RecordList: React.FC<RecordListProps> = ({ records, onDelete, showDate, title }) => {
  console.log('✅ 전달받은 records:', records);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">{title || '판매 내역'}</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b py-2 text-left">상품명</th>
            <th className="border-b py-2 text-left">수량</th>
            <th className="border-b py-2 text-left">가격</th>
            <th className="border-b py-2 text-left">시간</th>
            {showDate && <th className="border-b py-2 text-left">날짜</th>}
            <th className="border-b py-2 text-left">옵션</th>
            <th className="border-b py-2 text-left">삭제</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-400">
                기록이 없습니다.
              </td>
            </tr>
          ) : (
            records.map((record, index) => (
              <tr key={record.id ?? index}>
                <td className="border-b py-2">{record.name}</td>
                <td className="border-b py-2">{record.qty}</td>
                <td className="border-b py-2">{record.price}원</td>
                <td className="border-b py-2">{record.time}</td>
                {showDate && <td className="border-b py-2">{record.date}</td>}
                <td className="border-b py-2">{record.option || '없음'}</td>
                <td
                  className="border-b py-2 text-red-500 cursor-pointer"
                  onClick={() => onDelete(index)}
                >
                  삭제
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecordList;