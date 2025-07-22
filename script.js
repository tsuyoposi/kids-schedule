let audioStart = new Audio("chime_start.mp3");
let audioEnd = new Audio("chime_end.mp3");
let started = false;

document.getElementById("startButton").addEventListener("click", () => {
  audioStart.play().then(() => {
    started = true;
    document.getElementById("startButton").style.display = "none";
    monitorSchedule();
  });
});

function monitorSchedule() {
  setInterval(() => {
    if (!started) return;
    const now = new Date();
    const hhmm = now.toTimeString().slice(0,5);
    const dateKey = now.toISOString().split("T")[0];
    const data = localStorage.getItem("schedule_" + dateKey);
    if (!data) return;

    const schedule = JSON.parse(data);
    for (let item of schedule) {
      if (item.start === hhmm) {
        document.getElementById("current-task").textContent = item.task + " をはじめよう！";
        audioStart.play();
        return;
      } else if (item.end === hhmm) {
        document.getElementById("current-task").textContent = item.task + " はおわりです";
        audioEnd.play();
        return;
      }
    }
    document.getElementById("current-task").textContent = "まだ予定はありません";
  }, 1000);
}
