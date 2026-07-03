import { useEffect, useState } from "react";
import styles from "./TimerApp.module.css";

// ★ここに学校の時間を記述する★
const schedules = {
  A: [
    { name: "1時間目休み", time: "09:30" },
	  { name: "2時間目休み", time: "10:30" },
	  { name: "3時間目休み", time: "11:30" },
    { name: "給食", time: "12:40" },
    { name: "昼休み", time: "13:30" },
	  { name: "5時間目休み", time: "14:30" },
	  { name: "6時間目休み", time: "15:30" },
  ],
  B: [

  ],
  C: [
    { name: "1時間目休み", time: "09:50" },
    { name: "昼休み", time: "12:30" },
    { name: "放課後", time: "15:20" },
  ],
};

function addFiveMinutes(time) {
  const [h, m] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(h);
  date.setMinutes(m + 5);
  date.setSeconds(0);

  return (
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0")
  );
}

export default function TimerApp() {
  // 現在選択中の時間割
  const [scheduleName, setScheduleName] = useState("A");

  // モーダル表示状態
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 表示するメッセージ
  const [message, setMessage] = useState("");

  // 同じ通知を何度も出さないため
  const [lastTrigger, setLastTrigger] = useState("");

  // 1秒ごとに現在時刻を確認
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      const current =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");

      schedules[scheduleName].forEach((item) => {
        const trigger = addFiveMinutes(item.time);

        if (current === trigger && lastTrigger !== trigger) {
          setMessage(`${item.name}から5分経過しました。PCを閉じましょう！`);
          setIsModalOpen(true);
          setLastTrigger(trigger);
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [scheduleName, lastTrigger]);

  // テスト用
  const runTest = () => {
    setTimeout(() => {
      setMessage("テスト通知です。PCを閉じましょう！");
      setIsModalOpen(true);
    }, 10000);
  };

  // PWA登録
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>休み時間タイマー</h1>

      <h3>時間割</h3>

      <select
        value={scheduleName}
        onChange={(e) => setScheduleName(e.target.value)}
      >
        <option value="A">パターンA</option>
        <option value="B">パターンB</option>
        <option value="C">パターンC</option>
      </select>

      <h3 style={{ marginTop: 20 }}>今日の予定</h3>

      <ul>
        {schedules[scheduleName].map((item) => (
          <li key={item.name}>
            {item.name} ： {item.time}
            {" → "}
            {addFiveMinutes(item.time)} に通知
          </li>
        ))}
      </ul>

      <button
        style={{ marginTop: 20 }}
        onClick={runTest}
      >
        10秒後に警告を表示（テスト）
      </button>

      {isModalOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>⚠ 休み時間終了</h2>

            <p>{message}</p>

            <button onClick={() => setIsModalOpen(false)}>
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
