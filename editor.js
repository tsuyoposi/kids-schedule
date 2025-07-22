function loadSchedule() {
  const date = document.getElementById("datePicker").value;
  const data = localStorage.getItem("schedule_" + date);
  const list = document.getElementById("scheduleList");
  list.innerHTML = "";
  if (!data) return;
  const schedule = JSON.parse(data);
  for (let item of schedule) {
    const div = document.createElement("div");
    div.textContent = item.start + "〜" + item.end + " : " + item.task;
    list.appendChild(div);
  }
}

function addTask() {
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;
  const task = document.getElementById("task").value;
  if (!start || !end || !task) return alert("すべて入力してください");

  const date = document.getElementById("datePicker").value;
  const key = "schedule_" + date;
  let schedule = JSON.parse(localStorage.getItem(key) || "[]");

  for (let item of schedule) {
    if (!(end <= item.start || start >= item.end)) {
      if (start !== item.end && end !== item.start) {
        return alert("他の予定と時間が重複しています");
      }
    }
  }

  schedule.push({ start, end, task });
  localStorage.setItem(key, JSON.stringify(schedule));
  loadSchedule();
}

function saveSchedule() {
  alert("自動保存されています");
}
