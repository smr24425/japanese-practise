import React, { useState } from "react";
import { Button, Space, Radio, Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [mode, setMode] = useState<"hiragana" | "katakana" | "mixed">(
    "hiragana"
  );
  const [quizType, setQuizType] = useState<
    "jp-to-romaji" | "romaji-to-jp" | "random"
  >("jp-to-romaji");

  const navigate = useNavigate();

  const startQuiz = () => {
    Toast.show({ content: "開始練習！", position: "bottom" });
    navigate("/quiz", { state: { mode, quizType } });
  };

  return (
    <div className="page-container">
      <h1>選擇模式</h1>

      <Space direction="vertical" block>
        <div className="glass-card">
          <h2>五十音類型</h2>
          <Radio.Group
            value={mode}
            onChange={(val) => setMode(val as any)}
            // direction="horizontal"
          >
            <Radio value="hiragana">平假名</Radio>
            <Radio value="katakana">片假名</Radio>
            <Radio value="mixed">混合</Radio>
          </Radio.Group>
        </div>

        <div className="glass-card" style={{ marginBottom: 12 }}>
          <h2>選擇題類型</h2>
          <Radio.Group
            value={quizType}
            onChange={(val) => setQuizType(val as any)}
            // direction="horizontal"
          >
            <Radio value="jp-to-romaji">日文→羅馬拼音</Radio>
            <Radio value="romaji-to-jp">羅馬拼音→日文</Radio>
            <Radio value="random">隨機</Radio>
          </Radio.Group>
        </div>

        <Button color="primary" size="large" block onClick={startQuiz}>
          開始練習
        </Button>
      </Space>
    </div>
  );
};

export default Home;
