const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

let lastSession = null;
let prediction = null;
let confidence = null;

async function getHistory() {
  try {
    const res = await fetch("https://sunai.onrender.com/api/taixiu/history");
    const data = await res.json();

    if (data && data[0]) {
      const current = data[0];

      // Nếu có phiên mới thì random dự đoán
      if (lastSession !== current.session) {
        lastSession = current.session;
        prediction = Math.random() > 0.5 ? "Tài" : "Xỉu";
        confidence = (Math.random() * (99.99 - 25) + 25).toFixed(2) + "%";
      }

      return {
        id: "Tele@idol_vannhat",
        Phien_truoc: current.session,
        Xuc_xac: current.dice,
        Tong: current.total,
        Ket_qua: current.result,
        Phien_sau: current.session + 1,
        Du_doan: prediction,
        Do_tin_cay: confidence
      };
    }
    return { error: "Không lấy được dữ liệu" };
  } catch (err) {
    return { error: err.message };
  }
}

app.get("/", async (req, res) => {
  const result = await getHistory();
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`✅ Server chạy ở cổng ${PORT}`);
});    res.status(500).json({ error: "Lỗi server" });
  }
});

app.listen(PORT, () => {
  console.log(`Server chạy ở http://localhost:${PORT}`);
});
