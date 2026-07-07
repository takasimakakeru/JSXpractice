import { useState, useEffect } from "react";

function App() {
  // 1. 変数（State）を準備する場所
  const [alarmList, setAlarmList] = useState(["09:30:00","10:30:00", "11:30:00", "13:00:00", "14:30:00", "15:30:00"]);
  const [currentTime, setCurrentTime] = useState(""); // ★これ！

  // 2. 裏で動く処理（Effect）の場所
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString(); 

      setCurrentTime(timeString); // ★コメントを外して本物にする！

      if (alarmList.includes(timeString)) {
        alert("定刻になりました！");
      }

    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 3. 画面の見た目（JSX）の場所
  return (
    <div>
      {/* ★中括弧で変数を表示する！ */}
      <h2>今の時間：{currentTime}</h2>
    </div>
  );
}

export default App;
