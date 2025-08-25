const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

// Biến nhớ giá trị random cho từng phiên
let lastSession = null;
let lastPrediction = null;
let lastConfidence = null;

app.get("/api/free/sunwin", async (req, res) => {
  try {
    const response = await fetch("https://sunai.onrender.com/api/taixiu/history");
    const data = await response.json();

    const latest = data[0]; 

    if (lastSession !== latest.session) {
      lastSession = latest.session;
      lastPrediction = Math.random() > 0.5 ? "Tài" : "Xỉu";
      lastConfidence = (Math.random() * (99.99 - 25) + 25).toFixed(2) + "%";
    }

    res.json({
      Phien_truoc: latest.session,
      Xuc_xac: latest.dice,
      Tong: latest.total,
      Ket_qua: latest.result,
      Phien_sau: latest.session + 1,
      Du_doan: lastPrediction,
      Do_tin_cay: lastConfidence,
      id: "Tele@idol_vannhat"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server" });
  }
});

app.listen(PORT, () => {
  console.log(`Server chạy ở http://localhost:${PORT}`);
});
