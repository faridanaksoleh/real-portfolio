let userLogin = localStorage.getItem("userId");

document.addEventListener("DOMContentLoaded", () => {
  if (userLogin) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("roadmap").classList.remove("hidden");

    fetchMateri1("frontend");
    fetchMateri2("frontend");
    fetchMateri3("frontend");
    fetchMateri4("frontend");
    fetchMateri5("frontend");
    fetchMateri6("frontend");
    fetchMateri7("frontend");
    fetchMateri8("frontend");
    fetchMateri9("frontend");
    fetchMateri10("frontend");
    fetchMateri11("frontend");
    fetchMateri12("frontend");
    fetchMateri13("frontend");
    fetchMateri14("frontend");
    fetchMateri15("frontend");
    fetchMateri16("frontend");
    fetchMateri17("frontend");
    fetchMateri18("frontend");
    fetchMateri19("frontend");
    fetchMateri20("frontend");
    fetchMateri21("frontend");
    fetchMateri22("frontend");
    fetchMateri23("frontend");
    fetchMateri24("frontend");
    fetchMateri25("frontend");
    fetchMateri26("frontend");
    fetchMateri27("frontend");
    fetchMateri28("frontend");
    fetchMateri29("frontend");

    // Updated function to check and update completed items from database
    async function checkCompletedItems() {
      try {
        // Fetch all completed items for the logged in user
        const response = await axios.get(
          `http://localhost:3000/api/pencapaian/${userLogin}`
        );
    
        const completedItems = response.data;
    
        // Update rectangle colors for all completed items
        completedItems.forEach((item) => {
          const nodeId = `materi-${item.materiid}`; // Perhatikan penamaan field yang sesuai dengan database
          const group = document.querySelector(`[data-node-id="${nodeId}"]`);
    
          if (group) {
            const rect = group.querySelector("rect");
            if (rect) {
              // Set color based on progress
              if (item.progress === "learned") {
                rect.setAttribute("fill", "#FFD700"); // Gold for learned
              } else if (item.progress === "in progress") {
                rect.setAttribute("fill", "#FF9800"); // Orange for in progress
              } else {
                rect.setAttribute("fill", "#ffe599"); // Default yellow
              }
            }
          }
        });
      } catch (error) {
        console.error("Failed to fetch completed items:", error);
      }
    }
  }
});

//? POP UP
function setupMaterialClick(materiid, containerId) {
  const handleClick = async () => {
    // Cek status saat ini
    let currentStatus = 'not started';
    try {
      const response = await axios.get(`http://localhost:3000/api/pencapaian/${userLogin}/${materiid}`);
      if (response.data.length > 0) {
        currentStatus = response.data[0].progress || 'not started';
      }
    } catch (error) {
      console.error("Gagal memeriksa status:", error);
    }

    // Buat overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";

    const box = document.createElement("div");
    box.style.backgroundColor = "white";
    box.style.padding = "20px";
    box.style.borderRadius = "10px";
    box.style.textAlign = "center";
    box.style.width = "300px";

    const title = document.createElement("h3");
    title.textContent = "Update Status Pembelajaran";
    title.style.marginBottom = "15px";

    const materi = document.createElement("div");
    materi.textContent = materiid.materi;
    materi.style.marginBottom = "20px";
    materi.style.padding = "10px";
    materi.style.backgroundColor = "#f0f0f0";
    materi.style.borderRadius = "5px";
    materi.style.fontWeight = "500";

    // Buat tombol-tombol status
    const statusOptions = [
      { value: "learned", label: "Done", color: "#FFD700" },
      { value: "in progress", label: "In Progress", color: "#FF9800" },
      { value: "not learned", label: "Not Started", color: "#f44336" }
    ];

    statusOptions.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option.label;
      btn.style.margin = "5px";
      btn.style.padding = "8px 16px";
      btn.style.backgroundColor = option.color;
      btn.style.color = "white";
      btn.style.border = "none";
      btn.style.borderRadius = "5px";
      btn.style.cursor = "pointer";
      btn.style.fontWeight = "bold";
      btn.style.width = "100%";

      // Highlight status saat ini
      if (currentStatus === option.value) {
        btn.style.border = "2px solid #000";
      }

      btn.addEventListener("click", async () => {
        const nodeId = `materi-${materiid.id}`;
        const group = document.querySelector(`[data-node-id="${nodeId}"]`);

        if (group) {
          const rect = group.querySelector("rect");
          if (rect) {
            rect.setAttribute("fill", option.color);
          }
        }

        try {
          if (option.value === "not learned") {
            // Hapus pencapaian jika memilih "not started"
            await axios.delete("http://localhost:3000/api/pencapaian", {
              data: {
                userId: userLogin,
                materialId: materiid.materiid,
                progress: option.value
              }
            });
          } else {
            // Update atau buat pencapaian baru
            await axios.post("http://localhost:3000/achieve", {
              userid: userLogin,
              materiid: materiid.id,
              progress: option.value
            });
          }
        } catch (error) {
          console.error("Error:", error.response?.data || error.message);
          alert("Gagal menyimpan perubahan");
        }

        document.body.removeChild(overlay);
      });
      
      box.appendChild(btn);
    });

    // Tombol close
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.style.marginTop = "15px";
    closeBtn.style.padding = "8px 16px";
    closeBtn.style.backgroundColor = "#e0e0e0";
    closeBtn.style.border = "none";
    closeBtn.style.borderRadius = "5px";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.width = "100%";
    
    closeBtn.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });

    box.appendChild(title);
    box.appendChild(materi);
    box.appendChild(closeBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  };

  return handleClick;
}

document.getElementById("login-Btn").addEventListener("click", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  axios
    .post("http://localhost:3000/api/login", { username, password })
    .then((response) => {
      localStorage.setItem("userId", response.data.userId);
      document.getElementById("login").classList.add("hidden");
      document.getElementById("roadmap").classList.remove("hidden");

      // Fetch data after successful login
      fetchMateri1("frontend");
      // ... other fetch functions
    })
    .catch((error) => {
      console.error(error);
    });
});

document.getElementById("logout-Btn").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("userId");
  document.getElementById("login").classList.remove("hidden");
  document.getElementById("roadmap").classList.add("hidden");
});

async function fetchMateri1(category) {
  try {
    // Ambil data materi dari API
    const materiResponse = await axios.get(`http://localhost:3000/api/materi/${category}`);
    let materi = materiResponse.data
      .filter((materi) => materi.id >= 1 && materi.id <= 6)
      .sort((a, b) => a.id - b.id);

    // Ambil data pencapaian user untuk semua materi dalam kategori ini
    const pencapaianResponse = await axios.get(`http://localhost:3000/api/pencapaian/${userLogin}`);
    const completedItems = pencapaianResponse.data;

    const materiList = document.getElementById("materiList1");
    materiList.innerHTML = ""; // Kosongkan SVG

    const svgNS = "http://www.w3.org/2000/svg";
    const startX = 90;
    const startY = -100;
    const spacingY = 55;

    materi.forEach((materiItem, index) => {
      // Cari progress untuk materi ini
      const materiProgress = completedItems.find(item => item.materiid === materiItem.id);
      const progressValue = materiProgress ? materiProgress.progress : 0;
      
      // Tentukan warna berdasarkan progress
      let rectColor;
      if (progressValue === 100 || progressValue === "learned") {
        rectColor = "#FFD700"; // Gold - learned
      } else if ((progressValue > 0 && progressValue < 100) || progressValue === "in progress") {
        rectColor = "#FF9800"; // Orange - in progress
      } else {
        rectColor = "#ffe599"; // Default - not learned
      }

      const rectX = startX;
      const rectY = startY + index * spacingY;
      const rectWidth = 298;
      const rectHeight = 45;
      const textX = rectX + rectWidth / 2;
      const textY = rectY + rectHeight / 2;
      const circleRadius = 10;
      const circleX = rectX + 298;
      const circleY = textY;

      // Buat grup elemen
      const group = document.createElementNS(svgNS, "g");
      group.setAttribute("data-node-id", `materi-${materiItem.id}`);
      group.setAttribute("data-type", "subtopic");
      group.setAttribute("data-title", materiItem.materi);

      // Kotak latar dengan warna sesuai progress
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", rectX);
      rect.setAttribute("y", rectY);
      rect.setAttribute("width", rectWidth);
      rect.setAttribute("height", rectHeight);
      rect.setAttribute("rx", "5");
      rect.setAttribute("fill", rectColor); // Warna diatur berdasarkan progress
      rect.setAttribute("stroke", "black");
      rect.setAttribute("stroke-width", "2.7");

      // Teks materi
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", textX);
      text.setAttribute("y", textY);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.setAttribute("font-size", "17");
      text.setAttribute("fill", "#000000");
      const tspan = document.createElementNS(svgNS, "tspan");
      tspan.textContent = materiItem.materi;
      text.appendChild(tspan);

      // Lingkaran centang
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", circleX);
      circle.setAttribute("cy", circleY);
      circle.setAttribute("r", circleRadius);
      circle.setAttribute("fill", "#874efe");
      circle.setAttribute("stroke", "white");
      circle.setAttribute("stroke-width", "1.5");

      const checktext = document.createElementNS(svgNS, "text");
      checktext.setAttribute("x", circleX);
      checktext.setAttribute("y", circleY + 1);
      checktext.setAttribute("text-anchor", "middle");
      checktext.setAttribute("dominant-baseline", "middle");
      checktext.setAttribute("font-size", "14");
      checktext.setAttribute("fill", "#ffffff");
      checktext.textContent = "✓";

      // Tambahkan semua ke dalam grup
      group.appendChild(rect);
      group.appendChild(text);
      group.appendChild(circle);
      group.appendChild(checktext);

      // Tambahkan event click
      [rect, text, circle, checktext].forEach((el) => {
        el.addEventListener(
          "click",
          setupMaterialClick(materiItem, "fetchMateri1")
        );
      });

      materiList.appendChild(group);
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchMateri2(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 7 && materi.id <= 11)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList2");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -645;
  const startY = -37;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 260;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 3;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", materiItem.id === 11 ? "#929292" : "#874efe");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    // Tambahkan event click ke semua elemen yang bisa diklik
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList2")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri3(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 12 && materi.id <= 14)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList3");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -115;
  const startY = 257;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 235;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 235;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", "#874efe");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList3")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri4(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 15 && materi.id <= 17)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList4");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -643;
  const startY = 410;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 235;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList4")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri5(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 18 && materi.id <= 18)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList5");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -35;
  const startY = 550;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 125;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 125;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", "#874efe");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList5")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri6(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 19 && materi.id <= 21)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList6");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 243;
  const startY = 260;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 155;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 155;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", materiItem.id === 19 ? "#874efe" : "#4f7a28");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList6")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri7(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 22 && materi.id <= 24)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList7");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -233;
  const startY = 585;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 125;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 1;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", materiItem.id === 22 ? "#874efe" : "#4f7a28");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList7")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri8(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 25 && materi.id <= 30)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList8");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 270;
  const startY = 685;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 120;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 118;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", materiItem.id === 25 ? "#874efe" : "#4f7a28");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList8")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri9(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 31 && materi.id <= 31)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList9");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -645;
  const startY = 820;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 140;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 1;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", "#874efe");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList9")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri10(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 32 && materi.id <= 32)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList10");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -645;
  const startY = 940;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 143;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 1;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", "#929292");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList10")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri11(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 33 && materi.id <= 33)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList11");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -200;
  const startY = 1015;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 100;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 1;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", "#929292");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList11")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri12(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 34 && materi.id <= 34)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList12");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -90;
  const startY = 1015;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 100;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 100;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", "#929292");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList12")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri13(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 35 && materi.id <= 35)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList13");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -40;
  const startY = 1100;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 100;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 1;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", "#874efe");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList13")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri14(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 36 && materi.id <= 36)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList14");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 70;
  const startY = 1100;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 100;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 100;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", "#874efe");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList14")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri15(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 37 && materi.id <= 42)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList15");
  materiList.innerHTML = "";

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -360;
  const startY = 1190;
  const spacingY = 55;
  const spacingX = 110;

  materi.forEach((materiItem, index) => {
    let rectX, rectY;
    const fullRectWidth = 210;
    const smallRectWidth = 100;
    const rectHeight = 45;
    const circle = document.createElementNS(svgNS, "circle");
    const circleRadius = 10;
    let circleX;
    let circleY = rectY + rectHeight / 2;
    let circleColor = "#874efe";

    // Atur posisi kotak berdasarkan ID
    if (materiItem.id === 39) {
      rectX = startX;
      rectY = startY;
      circleY = rectY + rectHeight / 2;
      circleX = rectX;
    } else if (materiItem.id === 38) {
      rectX = startX + spacingX;
      rectY = startY;
      circleY = rectY + rectHeight / 2;
      circleX = rectX + 100;
    } else if (materiItem.id === 37) {
      rectX = startX;
      rectY = startY - spacingY;
      circleY = rectY + rectHeight / 2;
      circleX = rectX + 210;
    } else if (materiItem.id === 40) {
      rectX = startX;
      rectY = startY + spacingY;
      circleY = rectY + rectHeight / 2;
      circleX = rectX;
    } else if (materiItem.id === 41) {
      rectX = startX;
      rectY = startY + spacingY * 2;
      circleY = rectY + rectHeight / 2;
      circleX = rectX;
    } else if (materiItem.id === 42) {
      rectX = startX;
      rectY = startY + spacingY * 3;
      circleY = rectY + rectHeight / 2;
      circleX = rectX;
    }

    const isSmall = materiItem.id === 38 || materiItem.id === 39;
    const rectWidth = isSmall ? smallRectWidth : fullRectWidth;

    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", rectX + rectWidth / 2);
    text.setAttribute("y", rectY + rectHeight / 2);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran di kiri tengah dari kotak

    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute(
      "fill",
      materiItem.id === 37 || materiItem.id === 38 ? circleColor : "#4f7a28"
    );
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1);
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList15")
      );
    });

    materiList.appendChild(group);
  });
}

async function fetchMateri16(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 43 && materi.id <= 44)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList16");
  materiList.innerHTML = "";

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -70;
  const startY = 1350;
  const spacingY = 55;
  const spacingX = 107;

  materi.forEach((materiItem, index) => {
    let rectX, rectY;
    const fullRectWidth = 100;
    const smallRectWidth = 100;
    const rectHeight = 45;

    // Atur posisi kotak berdasarkan ID
    if (materiItem.id === 43) {
      rectX = startX;
      rectY = startY;
    } else if (materiItem.id === 44) {
      rectX = startX + spacingX;
      rectY = startY;
    }

    const isSmall = materiItem.id === 38 || materiItem.id === 39;
    const rectWidth = isSmall ? smallRectWidth : fullRectWidth;

    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", rectX + rectWidth / 2);
    text.setAttribute("y", rectY + rectHeight / 2);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran di kiri tengah dari kotak
    const circle = document.createElementNS(svgNS, "circle");
    const circleRadius = 10;
    const circleX = rectX; // posisi kiri dari kotak
    const circleY = rectY + rectHeight / 2;

    circle.setAttribute("cx", materiItem.id === 44 ? rectX + 100 : rectX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", materiItem.id === 44 ? "#4f7a28" : "#874efe");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", materiItem.id === 44 ? rectX + 100 : rectX);
    checktext.setAttribute("y", circleY + 1);
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList16")
      );
    });

    materiList.appendChild(group);
  });
}

async function fetchMateri17(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 45 && materi.id <= 46)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList17");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 270;
  const startY = 1475;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 130;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 130;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", materiItem.id === 46 ? "#4f7a28" : "#874efe");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList17")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri18(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 47 && materi.id <= 50)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList18");
  materiList.innerHTML = "";

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -640;
  const startY = 1130;
  const spacingY = 55;
  const spacingX = 115;

  materi.forEach((materiItem, index) => {
    let rectX, rectY;
    const fullRectWidth = 220;
    const smallRectWidth = 100;
    const rectHeight = 45;
    let circleX = rectX; // posisi kiri dari kotak

    // Atur posisi kotak berdasarkan ID
    if (materiItem.id === 47) {
      rectX = startX;
      rectY = startY;
      circleX = rectX;
    } else if (materiItem.id === 48) {
      rectX = startX + spacingX;
      rectY = startY;
      circleX = rectX + 105;
    } else if (materiItem.id === 49) {
      rectX = startX;
      rectY = startY + spacingY;
      circleX = rectX + 220;
    } else if (materiItem.id === 50) {
      rectX = startX;
      rectY = startY + spacingY * 2;
      circleX = rectX + 220;
    }

    const isSmall = materiItem.id === 38 || materiItem.id === 39;
    const rectWidth = isSmall ? smallRectWidth : fullRectWidth;

    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute(
      "width",
      materiItem.id === 47 || materiItem.id === 48 ? 105 : rectWidth
    );
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute(
      "x",
      materiItem.id === 47 || materiItem.id === 48
        ? rectX + 50
        : rectX + rectWidth / 2
    );
    text.setAttribute("y", rectY + rectHeight / 2);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran di kiri tengah dari kotak
    const circle = document.createElementNS(svgNS, "circle");
    const circleRadius = 10;
    let circleY = rectY + rectHeight / 2;

    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", "#874efe");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1);
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList18")
      );
    });

    materiList.appendChild(group);
  });
}

async function fetchMateri19(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 51 && materi.id <= 53)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList19");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -645;
  const startY = 1718;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 220;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 1;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", "#929292");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList19")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri20(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 54 && materi.id <= 54)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList20");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -310;
  const startY = 1710;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 180;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 180;
    const circleY = textY;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", "#874efe");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList20")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri21(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 25 && materi.id <= 28)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList21");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 120;
  const startY = 1670;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    let rectX = startX;
    let rectY = startY + index * spacingY;
    const rectWidth = 100;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 1;
    let circleY = rectY;

    if (materiItem.id === 25) {
      rectY = startY;
      circleY = rectY + 22;
    } else if (materiItem.id === 27) {
      rectY = startY + spacingY;
      circleY = rectY + 22;
    } else if (materiItem.id === 26) {
      rectY = startY + spacingY * 2;
      circleY = rectY + 22;
    } else if (materiItem.id === 28) {
      rectY = startY + spacingY * 3;
      circleY = rectY + 22;
    }

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", rectX + rectWidth / 2);
    text.setAttribute("y", rectY + rectHeight / 2);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", materiItem.id === 25 ? "#874efe" : "#4f7a28");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList21")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri22(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 55 && materi.id <= 59)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList22");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 265;
  const startY = 1610;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    let rectX = startX;
    let rectY = startY + index * spacingY;
    const rectWidth = 140;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 140;
    let circleY = rectY + 22;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", rectX + rectWidth / 2);
    text.setAttribute("y", rectY + rectHeight / 2);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute(
      "fill",
      materiItem.id === 55 || materiItem.id === 56 ? "#874efe" : "#4f7a28"
    );
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList22")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri23(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 60 && materi.id <= 61)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList23");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -295;
  const startY = 1810;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    let rectX = startX;
    let rectY = startY + index * spacingY;
    const rectWidth = 150;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 150;
    let circleY = rectY + 22;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", rectX + rectWidth / 2);
    text.setAttribute("y", rectY + rectHeight / 2);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", materiItem.id === 60 ? "#874efe" : "#4f7a28");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList23")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri24(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 62 && materi.id <= 66)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList24");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -630;
  const startY = 1900;
  const spacingY = 53; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    let rectX = startX;
    let rectY = startY + index * spacingY;
    const rectWidth = 200;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", rectX + rectWidth / 2);
    text.setAttribute("y", rectY + rectHeight / 2);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList24")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri25(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 67 && materi.id <= 75)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList25");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -627;
  const startY = 2255;
  const spacingY = 53; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    let rectX = startX;
    let rectY = startY + index * spacingY;
    const rectWidth = 200;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", rectX + rectWidth / 2);
    text.setAttribute("y", rectY + rectHeight / 2);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList25")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri26(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 58 && materi.id <= 58)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList26");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -45;
  const startY = 2248;
  const spacingY = 53; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    let rectX = startX;
    let rectY = startY + index * spacingY;
    const rectWidth = 205;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 1;
    let circleY = rectY + 22;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", rectX + rectWidth / 2);
    text.setAttribute("y", rectY + rectHeight / 2);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", "#4f7a28");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList26")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

// Desktop Apps (materi terakhir)
async function fetchMateri27(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 76 && materi.id <= 78)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList27");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -315;
  const startY = 2400;
  const spacingY = 53; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    let rectX = startX;
    let rectY = startY + index * spacingY;
    const rectWidth = 100;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 1;
    let circleY = rectY + 22;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", rectX + rectWidth / 2);
    text.setAttribute("y", rectY + rectHeight / 2);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", materiItem.id === 78 ? "#4f7a28" : "#874efe");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList27")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });
}

async function fetchMateri28(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 79 && materi.id <= 82)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList28");
  materiList.innerHTML = "";

  const svgNS = "http://www.w3.org/2000/svg";

  const centerX = 60; // Pusat horizontal
  const startY = 1950;
  const spacingY = 53;
  const spacingX = 220; // Jarak horizontal antara dua item

  materi.forEach((materiItem) => {
    let rectX = 0;
    let rectY = 0;
    let rectWidth = 200;
    let circleX = 0;

    // Atur posisi berdasarkan ID
    if (materiItem.id === 79) {
      rectWidth = 95;
      rectX = centerX - 100; // kiri dari tengah
      rectY = startY;
      circleX = rectX + 1;
    } else if (materiItem.id === 80) {
      rectWidth = 95;
      rectX = centerX + 5; // kanan dari tengah
      rectY = startY;
      circleX = rectX + 95;
    } else if (materiItem.id === 81) {
      rectX = centerX - 100;
      rectY = startY + spacingY;
      circleX = rectX + 1;
    } else if (materiItem.id === 82) {
      rectX = centerX - 100;
      rectY = startY + spacingY * 2;
      circleX = rectX + 1;
    }

    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleY = rectY + 22;

    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", materiItem.id === 80 ? "#874efe" : "#4f7a28");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1);
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList28")
      );
    });

    materiList.appendChild(group);
  });
}

async function fetchMateri29(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 83 && materi.id <= 85)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList29");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 250;
  const startY = 1950;
  const spacingY = 53; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    let rectX = startX;
    let rectY = startY + index * spacingY;
    const rectWidth = 150;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 150;
    let circleY = rectY + 22;

    // Buat grup elemen
    const group = document.createElementNS(svgNS, "g");
    group.setAttribute("data-node-id", `materi-${materiItem.id}`);
    group.setAttribute("data-type", "subtopic");
    group.setAttribute("data-title", materiItem.materi);

    // Kotak latar
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", rectX);
    rect.setAttribute("y", rectY);
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("rx", "5");
    rect.setAttribute("fill", "#ffe599");
    rect.setAttribute("stroke", "black");
    rect.setAttribute("stroke-width", "2.7");

    // Teks materi
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", rectX + rectWidth / 2);
    text.setAttribute("y", rectY + rectHeight / 2);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("font-size", "17");
    text.setAttribute("fill", "#000000");

    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.textContent = materiItem.materi;
    text.appendChild(tspan);

    // Lingkaran centang
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", circleX);
    circle.setAttribute("cy", circleY);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", materiItem.id === 83 ? "#874efe" : "#4f7a28");
    circle.setAttribute("stroke", "white");
    circle.setAttribute("stroke-width", "1.5");

    const checktext = document.createElementNS(svgNS, "text");
    checktext.setAttribute("x", circleX);
    checktext.setAttribute("y", circleY + 1); // +1 agar centang lebih tengah
    checktext.setAttribute("text-anchor", "middle");
    checktext.setAttribute("dominant-baseline", "middle");
    checktext.setAttribute("font-size", "14");
    checktext.setAttribute("fill", "#ffffff");
    checktext.textContent = "✓";

    // Tambahkan semua ke dalam grup
    group.appendChild(rect);
    group.appendChild(text);
    group.appendChild(circle);
    group.appendChild(checktext);

    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "materiList29")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    rect.addEventListener("click", () => {
      showMaterialProgress(materi);
    });
  });
}

// function showMaterialProgress(materi) {
//   const progress = document.getElementById("progress");
//   progress.innerHTML = `
//     <div>
//       <p>${materi.progress}%</p>
//       <p>aaaaaa?????//</p>
//     </div>
//   `;
//   progress.classList.remove("hidden");
//   console.log(materi);
// }

// async function fetchPencapaian(materiId) {
//   const response = await axios.get(
//     `http://localhost:3000/api/pencapaian/${userId}/${materiId}`
//   );
//   showMaterialProgress(response.data);
//   axios;
//   return response.data;
//   console.log(response.data);
// }

// async function updatePencapaian(userId, materiId, progress) {
//   const response = await axios.post(`http://localhost:3000/api/pencapaian`, {
//     progress,
//   });
//   return response.data;
//   console.log(response.data);
// }
