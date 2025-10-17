import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, NavBar, Popup, List, Badge, SafeArea } from "antd-mobile";
import { getPracticeRecords } from "../utils/storage";

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [records, setRecords] = useState(() => getPracticeRecords()); // 初始從localStorage拉
  const navigate = useNavigate();

  const openMenu = () => {
    setRecords(getPracticeRecords()); // 每次打開menu都重新拉資料
    setVisible(true);
  };

  return (
    <>
      <NavBar
        right={
          <Button
            fill="none"
            onClick={openMenu}
            aria-label="Open menu"
            style={{ fontSize: 24 }}
          >
            ☰
          </Button>
        }
        style={{
          background:
            "linear-gradient(135deg, rgba(180,160,220,0.8), rgba(140,110,190,0.8))",
          color: "white",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        back={null}
      >
        五十音練習
      </NavBar>

      <Popup
        visible={visible}
        onMaskClick={() => setVisible(false)}
        bodyStyle={{ minWidth: "30vw" }}
      >
        <List>
          <List.Item
            onClick={() => {
              navigate("/");
              setVisible(false);
            }}
          >
            首頁
          </List.Item>
          <List.Item
            onClick={() => {
              navigate("/practice");
              setVisible(false);
            }}
          >
            手寫練習
          </List.Item>
          <List.Item
            onClick={() => {
              navigate("/history");
              setVisible(false);
            }}
          >
            歷史紀錄{" "}
            <Badge content={records.length} style={{ marginLeft: 6 }} />
          </List.Item>
          <List.Item
            onClick={() => {
              navigate("/result");
              setVisible(false);
            }}
          >
            最近結果
          </List.Item>
        </List>
        <SafeArea position="bottom" />
      </Popup>
    </>
  );
};

export default Header;
