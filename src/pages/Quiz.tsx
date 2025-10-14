import React, { useEffect, useState } from "react";
import { Button, Card, Space, Toast } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import { kanaList, type KanaItem } from "../data/kana";
import { useHistory } from "../contexts/HistoryContext";
import { savePracticeRecord } from "../utils/storage";

type State = {
  mode: "hiragana" | "katakana" | "mixed";
  quizType: "jp-to-romaji" | "romaji-to-jp" | "random";
};

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addResult } = useHistory();

  const { mode, quizType } = (location.state || {}) as State;

  const [currentQuestion, setCurrentQuestion] = useState<KanaItem | null>(null);
  const [questionDisplay, setQuestionDisplay] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [wrongList, setWrongList] = useState<KanaItem[]>([]);

  const randomKana = (list: KanaItem[]) => {
    return list[Math.floor(Math.random() * list.length)];
  };

  const getDisplayKana = (kana: KanaItem) => {
    if (mode === "hiragana") return kana.hiragana;
    if (mode === "katakana") return kana.katakana;
    return Math.random() > 0.5 ? kana.hiragana : kana.katakana;
  };

  const generateQuiz = () => {
    const question = randomKana(kanaList);
    setCurrentQuestion(question);

    let questionText = "";
    let correctAns = "";

    if (quizType === "jp-to-romaji") {
      questionText = getDisplayKana(question);
      correctAns = question.romaji;
    } else if (quizType === "romaji-to-jp") {
      questionText = question.romaji;
      correctAns = getDisplayKana(question);
    } else {
      if (Math.random() > 0.5) {
        questionText = getDisplayKana(question);
        correctAns = question.romaji;
      } else {
        questionText = question.romaji;
        correctAns = getDisplayKana(question);
      }
    }

    setQuestionDisplay(questionText);
    setCorrectAnswer(correctAns);

    const optionSet = new Set<string>();
    optionSet.add(correctAns);

    while (optionSet.size < 4) {
      const randomItem = randomKana(kanaList);
      let option = "";

      if (quizType === "jp-to-romaji") {
        option = randomItem.romaji;
      } else if (quizType === "romaji-to-jp") {
        option = getDisplayKana(randomItem);
      } else {
        option =
          Math.random() > 0.5 ? randomItem.romaji : getDisplayKana(randomItem);
      }

      if (!optionSet.has(option)) optionSet.add(option);
    }

    setOptions(Array.from(optionSet).sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    if (!mode || !quizType) {
      navigate("/");
      return;
    }
    generateQuiz();
    setScore(0);
    setWrongList([]);
  }, [mode, quizType]);

  const onSelectAnswer = (answer: string) => {
    if (answer === correctAnswer) {
      Toast.show({ content: "答對了！🎉", position: "top" });
      setScore((prev) => prev + 1);
    } else {
      Toast.show({
        content: `答錯了，正確答案是 ${correctAnswer}`,
        position: "top",
      });
      if (currentQuestion) setWrongList((prev) => [...prev, currentQuestion]);
    }
    generateQuiz();
  };

  const onEndPractice = () => {
    savePracticeRecord({
      date: new Date().toISOString(),
      total: score + wrongList.length,
      wrongList,
    });
    navigate("/result");
  };

  return (
    <div className="page-container quiz">
      <Card className="glass-card question-card" style={{ fontSize: 72 }}>
        {questionDisplay}
      </Card>

      <Space direction="vertical" style={{ width: "100%", marginBottom: 12 }}>
        {options.map((opt) => (
          <Button
            key={opt}
            block
            size="large"
            color="primary"
            onClick={() => onSelectAnswer(opt)}
          >
            {opt}
          </Button>
        ))}
      </Space>

      <div
        className="score-text"
        style={{
          marginBottom: 12,
        }}
      >
        正確題數: {score} / {score + wrongList.length}
      </div>

      <Button color="primary" size="large" block onClick={onEndPractice}>
        結束練習
      </Button>
    </div>
  );
};

export default Quiz;
