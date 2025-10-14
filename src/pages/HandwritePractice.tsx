import React, { useRef, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd-mobile";

const HandwritePractice: React.FC = () => {
  const { romaji } = useParams<{ romaji: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // 預期傳入整個kana item
  const kanaItem = location.state as {
    hiragana: string;
    katakana: string;
    romaji: string;
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 初始化畫布白色背景
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 設置畫筆樣式
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#222";
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setDrawing(true);
    draw(e);
  };

  const endDrawing = () => {
    setDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath(); // 斷開路徑，避免連續畫線
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let clientX: number, clientY: number;

    if ("touches" in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  if (!kanaItem) {
    return (
      <div style={{ padding: 16 }}>
        <h3>沒有找到對應的假名資料</h3>
        <Button onClick={() => navigate("/practice")}>回到列表</Button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 style={{ fontSize: 42 }}>
        練習書寫: {kanaItem.hiragana} / {kanaItem.katakana}
      </h1>

      <canvas
        ref={canvasRef}
        height={400}
        style={{ width: "100%", border: "1px solid #ccc", touchAction: "none" }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
      />

      <div style={{ marginTop: 16 }}>
        <Button color="danger" onClick={clearCanvas}>
          清除
        </Button>
        <Button
          style={{ marginLeft: 8 }}
          color="primary"
          onClick={() => navigate("/practice")}
        >
          回列表
        </Button>
      </div>
    </div>
  );
};

export default HandwritePractice;
