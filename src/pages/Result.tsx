import React, { useEffect, useState } from "react";
import type { KanaItem } from "../data/kana";
import { getPracticeRecords } from "../utils/storage"; // 你存資料的工具
import { Button, Space } from "antd-mobile";
import { useNavigate } from "react-router-dom";

const Result: React.FC = () => {
  const [latestRecord, setLatestRecord] = useState<{
    total: number;
    wrongList: KanaItem[];
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const records = getPracticeRecords();
    if (records.length === 0) {
      setLatestRecord(null);
    } else {
      setLatestRecord(records[records.length - 1]);
    }
  }, []);

  if (!latestRecord) {
    return (
      <div>
        <p>沒有結果資料，請從首頁開始練習。</p>
        <Button onClick={() => navigate("/")}>回首頁</Button>
      </div>
    );
  }

  return (
    <div>
      <h2>練習結果</h2>
      <p>總題數：{latestRecord.total}</p>
      <p>錯誤題數：{latestRecord.wrongList.length}</p>

      {latestRecord.wrongList.length > 0 && (
        <>
          <h3>錯誤題目：</h3>
          <ul>
            {latestRecord.wrongList.map((item, idx) => (
              <li key={idx}>
                {item.hiragana} / {item.katakana} - {item.romaji}
              </li>
            ))}
          </ul>
        </>
      )}

      <Space style={{ gap: 8 }}>
        <Button color="primary" onClick={() => navigate("/")}>
          回首頁
        </Button>
        <Button color="primary" onClick={() => navigate("/history")}>
          查看歷史紀錄
        </Button>
      </Space>
    </div>
  );
};

export default Result;
