let attendanceChart;
let movementChart;

function todayValue() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function calc() {
  const active = Number(document.getElementById("todayActive").value || 0);
  const attendance = Number(document.getElementById("actualAttendance").value || 0);
  const joiners = Number(document.getElementById("newJoinersCount").value || 0);
  const resign = Number(document.getElementById("resignationsCount").value || 0);
  const leaves = Number(document.getElementById("leavesCount").value || 0);
  const absences = Number(document.getElementById("absencesCount").value || 0);
  const rate = active ? ((attendance / active) * 100).toFixed(1) + "%" : "0.0%";

  document.getElementById("attendanceRate").value = rate;
  document.getElementById("kpiActive").textContent = active;
  document.getElementById("kpiAttendance").textContent = attendance;
  document.getElementById("kpiRate").textContent = rate;
  document.getElementById("kpiTurnover").textContent = `+${joiners} / -${resign}`;

  updateCharts(attendance, active - attendance, joiners, resign, leaves, absences);
}

function updateCharts(attendance, notAttend, joiners, resign, leaves, absences) {
  const aCtx = document.getElementById("attendanceChart");
  const mCtx = document.getElementById("movementChart");

  if (attendanceChart) attendanceChart.destroy();
  if (movementChart) movementChart.destroy();

  attendanceChart = new Chart(aCtx, {
    type: "doughnut",
    data: {
      labels: ["Actual Attendance 实际出勤 เข้างานจริง", "Not Attending 未出勤 ไม่ได้เข้างาน"],
      datasets: [{ data: [attendance, Math.max(notAttend, 0)] }]
    },
    options: { responsive: true, plugins: { title: { display: true, text: "Attendance / 出勤 / การเข้างาน" } } }
  });

  movementChart = new Chart(mCtx, {
    type: "bar",
    data: {
      labels: ["Join 入职 เข้าใหม่", "Resign 离职 ลาออก", "Leave 请假 ลา", "Absent 旷工 ขาดงาน"],
      datasets: [{ label: "Count / 人数 / จำนวน", data: [joiners, resign, leaves, absences] }]
    },
    options: { responsive: true, plugins: { title: { display: true, text: "Daily Movement / 今日异动 / การเปลี่ยนแปลงวันนี้" } } }
  });
}

function addRow(tableId) {
  const table = document.getElementById(tableId);
  const colCount = table.tHead.rows[0].cells.length;
  const tr = document.createElement("tr");
  for (let i = 0; i < colCount - 1; i++) {
    const td = document.createElement("td");
    td.contentEditable = "true";
    td.textContent = i === 0 ? table.tBodies[0].rows.length + 1 : "";
    tr.appendChild(td);
  }
  const action = document.createElement("td");
  action.innerHTML = '<button onclick="deleteRow(this)">删除 / Delete / ลบ</button>';
  tr.appendChild(action);
  table.tBodies[0].appendChild(tr);
}

function deleteRow(btn) {
  btn.closest("tr").remove();
}

function tableData(tableId) {
  const table = document.getElementById(tableId);
  return [...table.tBodies[0].rows].map(row => [...row.cells].slice(0, -1).map(cell => cell.textContent.trim()));
}

function fillTable(tableId, rows) {
  const table = document.getElementById(tableId);
  table.tBodies[0].innerHTML = "";
  rows.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(value => {
      const td = document.createElement("td");
      td.contentEditable = "true";
      td.textContent = value;
      tr.appendChild(td);
    });
    const action = document.createElement("td");
    action.innerHTML = '<button onclick="deleteRow(this)">删除 / Delete / ลบ</button>';
    tr.appendChild(action);
    table.tBodies[0].appendChild(tr);
  });
}

function collectReport() {
  const ids = ["reportDate", "clientName", "preparedBy", "yesterdayHeadcount", "newJoinersCount", "resignationsCount", "todayActive", "leavesCount", "absencesCount", "actualAttendance"];
  const data = {};
  ids.forEach(id => data[id] = document.getElementById(id).value);
  data.inventory = tableData("inventoryTable");
  data.joiners = tableData("joinersTable");
  data.resignations = tableData("resignTable");
  data.leaves = tableData("leaveTable");
  return data;
}

function saveReport() {
  localStorage.setItem("ycmDailyReport", JSON.stringify(collectReport()));
  alert("已保存 / Saved / บันทึกแล้ว");
}

function loadReport() {
  const raw = localStorage.getItem("ycmDailyReport");
  if (!raw) return alert("没有保存数据 / No saved data / ไม่มีข้อมูลที่บันทึกไว้");
  const data = JSON.parse(raw);
  Object.entries(data).forEach(([key, value]) => {
    if (document.getElementById(key)) document.getElementById(key).value = value;
  });
  if (data.inventory) fillTable("inventoryTable", data.inventory);
  if (data.joiners) fillTable("joinersTable", data.joiners);
  if (data.resignations) fillTable("resignTable", data.resignations);
  if (data.leaves) fillTable("leaveTable", data.leaves);
  calc();
}

function exportJSON() {
  const blob = new Blob([JSON.stringify(collectReport(), null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ycm-daily-report.json";
  a.click();
}

document.addEventListener("input", calc);
document.getElementById("reportDate").value = todayValue();
calc();
