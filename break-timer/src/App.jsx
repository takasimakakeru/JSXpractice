import { useState, useEffect } from "react";

function App() {
  // 1. 変数（State）を準備する場所
  const [alarmList, setAlarmList] = useState(["08:34:00","09:34:00","10:34:00", "11:34:00", "13:34:00", "14:34:00", "15:34:00"]);
  const [currentTime, setCurrentTime] = useState(""); // ★これ！

  // 2. 裏で動く処理（Effect）の場所
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const timeString = `${hrs}:${mins}:${secs}`;

      setCurrentTime(timeString); // ★コメントを外して本物にする！

      if (alarmList.includes(timeString)) {
  window.open("https://takasimakakeru.github.io/break-timerpopup/", "_blank", "width=500,height=400,menubar=no,toolbar=no");
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
