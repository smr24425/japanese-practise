import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import "./index.css";
import { HistoryProvider } from "./contexts/HistoryContext";
import "antd-mobile/es/global"; // antd-mobile 全局樣式
import { unstableSetRender } from "antd-mobile";
import { registerSW } from "virtual:pwa-register";
registerSW(); // 啟動自動註冊的 service worker

unstableSetRender((node, container: any) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <HistoryProvider>
      <App />
    </HistoryProvider>
  </HashRouter>
);
