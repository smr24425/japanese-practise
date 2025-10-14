import React from "react";
import { useNavigate } from "react-router-dom";
import { List } from "antd-mobile";
import { kanaList } from "../data/kana";

const PracticeList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 16 }}>
      <h2>五十音練習列表</h2>

      <List
        header={
          <div style={{ display: "flex", fontWeight: "bold" }}>
            <div style={{ flex: 1, textAlign: "center" }}>平假名</div>
            <div style={{ flex: 1, textAlign: "center" }}>片假名</div>
            <div style={{ flex: 1, textAlign: "center" }}>羅馬拼音</div>
          </div>
        }
      >
        {kanaList.map((item) => (
          <List.Item
            key={item.romaji}
            clickable
            onClick={() =>
              navigate(`/practice/handwrite/${item.romaji}`, { state: item })
            }
            style={{ padding: "12px 0" }}
          >
            <div style={{ display: "flex", fontSize: 24 }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                {item.hiragana}
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                {item.katakana}
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>{item.romaji}</div>
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default PracticeList;
