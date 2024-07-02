import { useEffect, useState } from 'react';
const Loading = ({ text }: { text: string }) => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev % 3) + 1); // 1, 2, 3の繰り返し
    }, 500); // 500msごとに更新

    return () => clearInterval(interval); // コンポーネントがアンマウントされたらインターバルをクリア
  }, []);

  return (
    <div className="mb-8 text-4xl font-bold text-gray-900">
      {text}
      {'.'.repeat(dots)}
    </div>
  );
};

export default Loading;
