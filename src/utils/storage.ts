import type { KanaItem } from "../data/kana";

export type PracticeRecord = {
  date: string; // ISO時間字串
  total: number;
  wrongList: KanaItem[];
};

const STORAGE_KEY = "practiceRecords";

// 讀取練習紀錄
export function getPracticeRecords(): PracticeRecord[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// 儲存練習紀錄
export function savePracticeRecord(record: PracticeRecord) {
  const records = getPracticeRecords();
  records.push(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// 清除所有紀錄（若需要）
export function clearPracticeRecords() {
  localStorage.removeItem(STORAGE_KEY);
}

export const deletePracticeRecord = (index: number) => {
  const records = getPracticeRecords();
  records.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};
