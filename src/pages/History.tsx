import React, { useEffect, useState } from "react";
import {
  getPracticeRecords,
  clearPracticeRecords,
  deletePracticeRecord,
  type PracticeRecord,
} from "../utils/storage";
import { Toast, Button, Dialog, Space } from "antd-mobile";
import { DeleteOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<PracticeRecord[]>([]);

  const loadRecords = () => {
    setRecords(getPracticeRecords());
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleClearAll = async () => {
    const result = await Dialog.confirm({
      content: "確定要清除所有紀錄嗎？",
    });

    if (result) {
      clearPracticeRecords();
      loadRecords();
      Toast.show({ content: "已清除所有紀錄", position: "bottom" });
    }
  };

  const handleDelete = async (index: number) => {
    const result = await Dialog.confirm({
      content: "確定要刪除此筆紀錄？",
    });

    if (result) {
      deletePracticeRecord(index);
      loadRecords();
      Toast.show({ content: "已刪除紀錄", position: "bottom" });
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>歷史練習紀錄</h2>

      {records.length === 0 ? (
        <p>目前沒有練習紀錄</p>
      ) : (
        records.map((record, index) => (
          <div
            key={index}
            style={{
              marginBottom: 24,
              paddingBottom: 8,
              borderBottom: "1px solid #ccc",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>{new Date(record.date).toLocaleString()}</strong>

              <DeleteOutline
                onClick={() => handleDelete(index)}
                style={{
                  fontSize: 20,
                  color: "#e64545",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
              />
            </div>

            <p>總題數: {record.total}</p>
            <p>錯誤題目:</p>
            <ul>
              {record.wrongList.map((item, idx) => (
                <li key={idx}>
                  {item.hiragana} / {item.katakana} - {item.romaji}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      <Space style={{ gap: 8 }}>
        {records.length > 0 && (
          <Button color="danger" onClick={handleClearAll} block>
            清除所有紀錄
          </Button>
        )}

        <Button onClick={() => navigate("/")} color="primary">
          回首頁
        </Button>
      </Space>
    </div>
  );
};

export default HistoryPage;
