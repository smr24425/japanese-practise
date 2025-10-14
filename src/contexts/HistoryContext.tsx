import React, { createContext, useContext, useState } from "react";
import type { KanaItem } from "../data/kana";

export type QuizResult = {
  date: string;
  total: number;
  wrong: number;
  wrongItems: KanaItem[];
};

type HistoryContextType = {
  history: QuizResult[];
  addResult: (result: QuizResult) => void;
};

const HistoryContext = createContext<HistoryContextType>({
  history: [],
  addResult: () => {},
});

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState<QuizResult[]>([]);

  const addResult = (result: QuizResult) => {
    setHistory((prev) => [result, ...prev]);
  };

  return (
    <HistoryContext.Provider value={{ history, addResult }}>
      {children}
    </HistoryContext.Provider>
  );
};
