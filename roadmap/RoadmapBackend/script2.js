let userLogin = localStorage.getItem("userId");

document.addEventListener("DOMContentLoaded", () => {
  if (userLogin) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("roadmap").classList.remove("hidden");
    loadAllMaterials();

    fetchMateri1("backend");
    fetchMateri2("backend");
    fetchMateri3("backend");
    fetchMateri4("backend");
    fetchMateri5("backend");
    fetchMateri6("backend");
    fetchMateri7("backend");
    fetchMateri8("backend");
    fetchMateri9("backend");
    fetchMateri10("backend");
    fetchMateri11("backend");
    fetchMateri12("backend");
    fetchMateri13("backend");
    fetchMateri14("backend");
    fetchMateri15("backend");
    fetchMateri16("backend");
    fetchMateri17("backend");
    fetchMateri18("backend");
    fetchMateri19("backend");
    fetchMateri20("backend");
    fetchMateri21("backend");
    fetchMateri22("backend");
    fetchMateri23("backend");
    fetchMateri24("backend");
    fetchMateri25("backend");
    fetchMateri26("backend");
    fetchMateri27("backend");
    fetchMateri28("backend");
    fetchMateri29("backend");
    fetchMateri30("backend");
    fetchMateri31("backend");
    fetchMateri32("backend");
    fetchMateri33("backend");
    fetchMateri34("backend");
  }
});

// Updated function to check and update completed items from database
async function checkCompletedItems(category) {
  try {
    // Fetch completed items from the database
    const response = await axios.get(
      `http://localhost:3000/api/pencapaian/${userLogin}`
    );

    const completedItems = response.data;

    // Update rectangle colors for completed items based on status
    completedItems.forEach((item) => {
      const nodeId = `materi-${item.materiid}`;
      const group = document.querySelector(`[data-node-id="${nodeId}"]`);

      if (group) {
        const rect = group.querySelector("rect");
        if (rect) {
          // Set color based on status
          if (item.progress === "done") {
            rect.setAttribute("fill", "#FFD700"); // Gold for done
          } else if (item.progress === "in_progress") {
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

//? POP UP
function setupMaterialClick(material, containerId) {
  const handleClick = async () => {
    // Bikin div untuk pilihan "done" / "in progress" / "undone"
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

    const title = document.createElement("h1");
    title.textContent = "Status untuk :";
    title.style.marginBottom = "20px";

    const materi = document.createElement("h2");
    materi.textContent = material.materi;
    materi.style.marginBottom = "20px";
    materi.style.padding = "10px 20px";
    materi.style.backgroundColor = "#929292";
    materi.style.borderRadius = "5px";
    materi.style.border = "2px solid #000000";
    materi.style.fontWeight = "600";

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.style.margin = "10px";
    doneBtn.style.padding = "10px 20px";
    doneBtn.style.backgroundColor = "#FFD700"; // Gold color
    doneBtn.style.color = "black";
    doneBtn.style.border = "none";
    doneBtn.style.borderRadius = "5px";
    doneBtn.style.cursor = "pointer";
    doneBtn.style.fontWeight = "bold";

    const inProgressBtn = document.createElement("button");
    inProgressBtn.textContent = "In Progress";
    inProgressBtn.style.margin = "10px";
    inProgressBtn.style.padding = "10px 20px";
    inProgressBtn.style.backgroundColor = "#FF9800"; // Orange color
    inProgressBtn.style.color = "black";
    inProgressBtn.style.border = "none";
    inProgressBtn.style.borderRadius = "5px";
    inProgressBtn.style.cursor = "pointer";
    inProgressBtn.style.fontWeight = "bold";

    const undoneBtn = document.createElement("button");
    undoneBtn.textContent = "Not Started";
    undoneBtn.style.margin = "10px";
    undoneBtn.style.padding = "10px 20px";
    undoneBtn.style.backgroundColor = "#f44336"; // Red color
    undoneBtn.style.color = "black";
    undoneBtn.style.border = "none";
    undoneBtn.style.borderRadius = "5px";
    undoneBtn.style.cursor = "pointer";
    undoneBtn.style.fontWeight = "bold";

    //? Klik tombol "done"
    doneBtn.addEventListener("click", async () => {
      const nodeId = `materi-${material.id}`;
      const group = document.querySelector(`[data-node-id="${nodeId}"]`);

      if (group) {
        const rect = group.querySelector("rect");
        if (rect) {
          // Ubah warna latar belakang kotak menjadi emas
          rect.setAttribute("fill", "#FFD700");
        }
      }

      //? Tambahkan pencapaian ke database dengan status "done"
      try {
        await axios.post("http://localhost:3000/api/pencapaian", {
          userid: userLogin,
          materiid: material.id,
          progress: "done" // Pastikan menggunakan 'progress' bukan 'status'
        });
      } catch (error) {
        console.error("Gagal menyimpan pencapaian:", error);
      }
    });

    //? Klik tombol "in progress"
    inProgressBtn.addEventListener("click", async () => {
      const nodeId = `materi-${material.id}`;
      const group = document.querySelector(`[data-node-id="${nodeId}"]`);

      if (group) {
        const rect = group.querySelector("rect");
        if (rect) {
          // Ubah warna latar belakang kotak menjadi orange
          rect.setAttribute("fill", "#FF9800");
        }
      }

      //? Tambahkan pencapaian ke database dengan status "in_progress"
      try {
        await axios.post("http://localhost:3001/achieve", {
          userid: userLogin,
          materiid: material.id,
          status: "in_progress",
        });
      } catch (error) {
        console.error("Gagal menyimpan pencapaian:", error);
      }
      document.body.removeChild(overlay);
    });

    //? Klik tombol "undone"
    undoneBtn.addEventListener("click", async () => {
      const nodeId = `materi-${material.id}`;
      const group = document.querySelector(`[data-node-id="${nodeId}"]`);

      if (group) {
        const rect = group.querySelector("rect");
        if (rect) {
          // Kembalikan warna latar belakang ke default (#ffe599)
          rect.setAttribute("fill", "#ffe599");
        }
      }

      try {
        await axios.delete("http://localhost:3001/achieve", {
          data: {
            userid: userLogin,
            materiid: material.id,
          },
        });
      } catch (error) {
        console.error("Gagal menghapus pencapaian:", error);
      }
      document.body.removeChild(overlay);
    });

    box.appendChild(title);
    box.appendChild(materi);
    box.appendChild(doneBtn);
    box.appendChild(inProgressBtn);
    box.appendChild(undoneBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  };

  return handleClick;
}

document.getElementById("login-Btn").addEventListener("click", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value; // Jangan lupa tambahkan input password di HTML

  axios
    .post("http://localhost:3000/api/login", { username, password })
    .then((response) => {
      localStorage.setItem("userId", response.data.userId);
      document.getElementById("login").classList.add("hidden");
      document.getElementById("roadmap").classList.remove("hidden");

      // Setelah login berhasil, muat semua materi dan pencapaian
      loadAllMaterials();
    })
    .catch((error) => {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    });
});

async function loadAllMaterials() {
  // Panggil semua fungsi fetchMateri
  fetchMateri1("backend");
  fetchMateri2("backend");
  fetchMateri3("backend");
  fetchMateri4("backend");
  fetchMateri5("backend");
  fetchMateri6("backend");
  fetchMateri7("backend");
  fetchMateri8("backend");
  fetchMateri9("backend");
  fetchMateri10("backend");
  fetchMateri11("backend");
  fetchMateri12("backend");
  fetchMateri13("backend");
  fetchMateri14("backend");
  fetchMateri15("backend");
  fetchMateri16("backend");
  fetchMateri17("backend");
  fetchMateri18("backend");
  fetchMateri19("backend");
  fetchMateri20("backend");
  fetchMateri21("backend");
  fetchMateri22("backend");
  fetchMateri23("backend");
  fetchMateri24("backend");
  fetchMateri25("backend");
  fetchMateri26("backend");
  fetchMateri27("backend");
  fetchMateri28("backend");
  fetchMateri29("backend");
  fetchMateri30("backend");
  fetchMateri31("backend");
  fetchMateri32("backend");
  fetchMateri33("backend");
  fetchMateri34("backend");
  // ... dan seterusnya untuk semua fetchMateri
}

document.getElementById("logout-Btn").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("userId");
  document.getElementById("login").classList.remove("hidden");
  document.getElementById("roadmap").classList.add("hidden");
});

async function fetchMateri1(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 86 && materi.id <= 91)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList1");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 60;
  const startY = -75;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 280;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 280;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri1")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);
  });

  // Check for completed items in database and update circles
  checkCompletedItems(category);
}

async function fetchMateri2(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 92 && materi.id <= 99)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList2");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -715;
  const startY = 10;
  const spacingY = 33; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const row = Math.floor(index / 2); // Setiap 2 item, pindah baris
    const col = index % 2; // 0 (kiri) atau 1 (kanan)

    const rectX = startX + col * 115;
    const rectY = startY + row * (spacingY + 20); // 20 itu jarak antar baris

    const rectWidth = 110;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    let circleX = rectX; // geser ke kiri dari kotak
    const circleY = textY;

    if (
      materiItem.id === 93 ||
      materiItem.id === 95 ||
      materiItem.id === 97 ||
      materiItem.id === 99
    ) {
      circleX = rectX + 110;
    }

    // --- Sisanya tetap seperti punyamu ---
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
    circle.setAttribute("fill", materiItem.id === 98 ? "#874efe" : "#4f7a28");
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri2")
      );
    });

    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri3(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 100 && materi.id <= 100)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList3");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -205;
  const startY = 220;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri3")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri4(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 101 && materi.id <= 102)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList4");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -665;
  const startY = 260;
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
    circle.setAttribute("fill", materiItem.id === 101 ? "#874efe" : "#4f7a28");
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri4")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri5(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 103 && materi.id <= 103)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList5");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -665;
  const startY = 500;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri5")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri6(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 104 && materi.id <= 104)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList6");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -210;
  const startY = 410;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri6")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri7(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 105 && materi.id <= 109)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList7");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 135;
  const startY = 330;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 170;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 170;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri7")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri8(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 110 && materi.id <= 114)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList8");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -240;
  const startY = 820;
  const spacingY = 55; // Jarak antar baris
  const fullWidth = 200; // Width kotak penuh
  const halfWidth = (fullWidth - 10) / 2; // Width setengah (dengan gap 10px di tengah)

  materi.forEach((materiItem, index) => {
    let rectX = startX;
    let rectY;
    let rectWidth = fullWidth;
    const rectHeight = 45;

    if (materiItem.id === 112) {
      // SOAP (kiri)
      rectWidth = halfWidth;
      rectY = startY + 2 * spacingY; // Baris ke-3
    } else if (materiItem.id === 113) {
      // gRPC (kanan)
      rectWidth = halfWidth;
      rectX = startX + halfWidth + 10; // Geser ke kanan
      rectY = startY + 2 * spacingY; // Sama kayak SOAP
    } else if (materiItem.id < 112) {
      rectY = startY + (materiItem.id - 110) * spacingY; // REST dan JSON APIs
    } else if (materiItem.id > 113) {
      rectY = startY + (materiItem.id - 111) * spacingY; // GraphQL
    }

    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX;
    const circleY = textY;

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
    circle.setAttribute(
      "fill",
      materiItem.id === 112 || materiItem.id === 113 || materiItem.id === 114
        ? "#929292"
        : "#874efe"
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri8")
      );
    });

    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri9(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 115 && materi.id <= 121)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList9");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 75;
  const startY = 650;
  const spacingY = 55; // Jarak antar baris
  const fullWidth = 250;
  const halfWidth = (fullWidth - 10) / 2; // Width setengah (dengan gap 10px)

  materi.forEach((materiItem, index) => {
    let rectX = startX;
    let rectY;
    let rectWidth = fullWidth;
    const rectHeight = 45;

    if (materiItem.id === 115) {
      // JWT (kiri atas)
      rectWidth = halfWidth;
      rectY = startY + 55;
    } else if (materiItem.id === 116) {
      // OAuth (kanan atas)
      rectWidth = halfWidth;
      rectX = startX + halfWidth + 10; // Geser ke kanan
      rectY = startY + 55;
    } else if (materiItem.id === 120) {
      // OpenID (kiri bawah)
      rectWidth = halfWidth;
      rectY = startY + 5 * spacingY;
    } else if (materiItem.id === 121) {
      // SAML (kanan bawah)
      rectWidth = halfWidth;
      rectX = startX + halfWidth + 10;
      rectY = startY + 5 * spacingY;
    } else {
      // Sisanya Basic Auth, Token Auth, Cookie Based Auth
      rectY = startY + (materiItem.id - 115) * spacingY;
    }

    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX =
      materiItem.id === 116 || materiItem.id === 121
        ? rectX + rectWidth // kanan
        : rectX; // kiri
    const circleY = textY;

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
    circle.setAttribute(
      "fill",
      materiItem.id === 120 || materiItem.id === 121 ? "#929292" : "#874efe"
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri9")
      );
    });

    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri10(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 122 && materi.id <= 123)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList10");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -370;
  const startY = 590;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 170;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri10")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri11(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 124 && materi.id <= 126)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList11");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -690;
  const startY = 740;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 135;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri11")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri12(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 127 && materi.id <= 128)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList12");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -680;
  const startY = 600;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 120;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 120;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri12")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri13(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 129 && materi.id <= 132)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList13");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -675;
  const startY = 965;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 120;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri13")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri14(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 133 && materi.id <= 138)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList14");
  materiList.innerHTML = "";

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -670;
  const startY = 1270;
  const spacingY = 55;
  const gapBetween = 5; // Jarak antara 2 kotak di 1 baris

  materi.forEach((materiItem, index) => {
    let row = Math.floor(index / 2); // Baris keberapa
    let isLeft = index % 2 === 0; // Kiri atau kanan

    let rectWidth, rectX;

    if (materiItem.id === 133) {
      rectWidth = 100; // HTTPS lebih pendek
      rectX = startX;
    } else if (materiItem.id === 134) {
      rectWidth = 160; // OWASP Risks lebih panjang
      rectX = startX + 110 + gapBetween;
    } else if (materiItem.id === 135) {
      rectWidth = 100; // CORS
      rectX = startX;
    } else if (materiItem.id === 136) {
      rectWidth = 160; // SSL/TLS
      rectX = startX + 110 + gapBetween;
    } else if (materiItem.id === 137) {
      rectWidth = 100; // CSP
      rectX = startX;
    } else if (materiItem.id === 138) {
      rectWidth = 160; // Server Security
      rectX = startX + 110 + gapBetween;
    }

    const rectHeight = 45;
    const rectY = startY + row * spacingY;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX;
    const circleY = textY;

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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri14")
      );
    });

    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri15(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 139 && materi.id <= 141)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList15");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 55;
  const startY = 1020;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 185;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 185;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri15")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri16(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 143 && materi.id <= 150)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList16");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 145;
  const startY = 1195;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 150;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 150;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri16")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri17(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 151 && materi.id <= 154)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList17");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -675;
  const startY = 1540;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 190;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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
    circle.setAttribute("fill", materiItem.id === 151 ? "#874efe" : "#929292");
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri16")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri18(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 155 && materi.id <= 160)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList18");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 100;
  const startY = 1750;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 200;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 200;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri16")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri19(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 161 && materi.id <= 165)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList19");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -670;
  const startY = 1780;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 230;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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
    circle.setAttribute(
      "fill",
      materiItem.id === 164 || materiItem.id === 165 ? "#929292" : "#874efe"
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri16")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri20(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 166 && materi.id <= 166)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList20");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -300;
  const startY = 2000;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 130;
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

    // Tambahkan event click
    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri20")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri21(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 167 && materi.id <= 168)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList21");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 135;
  const startY = 2260;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 150;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 150;
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
    circle.setAttribute("fill", materiItem.id === 168 ? "#4f7a28" : "#874efe");
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri21")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri22(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 169 && materi.id <= 170)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList22");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -170;
  const startY = 2260;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 150;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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
    circle.setAttribute("fill", materiItem.id === 170 ? "#4f7a28" : "#874efe");
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri22")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri23(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 171 && materi.id <= 174)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList23");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -650;
  const startY = 2150;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 100;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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
    circle.setAttribute("fill", materiItem.id === 171 ? "#874efe" : "#4f7a28");
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri23")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri24(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 175 && materi.id <= 178)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList24");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 110;
  const startY = 2425;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 190;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 190;
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
    circle.setAttribute("fill", materiItem.id === 176 ? "#874efe" : "#4f7a28");
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri24")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri25(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 179 && materi.id <= 180)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList25");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -480;
  const startY = 2485;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 130;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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
    circle.setAttribute("fill", materiItem.id === 180 ? "#4f7a28" : "#874efe");
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri25")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri26(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 181 && materi.id <= 182)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList26");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -630;
  const startY = 2485;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 130;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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
    circle.setAttribute("fill", materiItem.id === 182 ? "#4f7a28" : "#874efe");
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri26")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri27(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 183 && materi.id <= 184)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList27");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -630;
  const startY = 2650;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 130;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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
    circle.setAttribute("fill", materiItem.id === 184 ? "#4f7a28" : "#874efe");
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri27")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri28(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 185 && materi.id <= 186)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList28");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -630;
  const startY = 2825;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 130;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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
    circle.setAttribute("fill", materiItem.id === 186 ? "#4f7a28" : "#874efe");
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

    // Tambahkan event click
    [rect, text].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri28")
      );
    });

    group.appendChild(circle);
    group.appendChild(checktext);

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri29(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 187 && materi.id <= 188)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList29");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -480;
  const startY = 2825;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 130;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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
    circle.setAttribute("fill", materiItem.id === 188 ? "#4f7a28" : "#874efe");
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri29")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri30(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 189 && materi.id <= 190)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList30");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -320;
  const startY = 2825;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 150;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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
    circle.setAttribute("fill", materiItem.id === 190 ? "#4f7a28" : "#874efe");
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri30")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri31(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 191 && materi.id <= 195)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList31");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 70;
  const startY = 2738;
  const spacingY = 47; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 220;
    const rectHeight = 40;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri31")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri32(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 196 && materi.id <= 197)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList32");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 60;
  const startY = 3030;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 250;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri32")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri33(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 198 && materi.id <= 200)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList33");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = -205;
  const startY = 3185;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 210;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri33")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}

async function fetchMateri34(category) {
  const response = await axios.get(
    `http://localhost:3000/api/materi/${category}`
  );
  let materi = response.data;

  materi = materi
    .filter((materi) => materi.id >= 201 && materi.id <= 201)
    .sort((a, b) => a.id - b.id);

  const materiList = document.getElementById("materiList34");
  materiList.innerHTML = ""; // Kosongkan SVG

  const svgNS = "http://www.w3.org/2000/svg";

  const startX = 80;
  const startY = 3300;
  const spacingY = 55; // Jarak antar elemen vertikal

  materi.forEach((materiItem, index) => {
    const rectX = startX;
    const rectY = startY + index * spacingY;
    const rectWidth = 210;
    const rectHeight = 45;
    const textX = rectX + rectWidth / 2;
    const textY = rectY + rectHeight / 2;

    const circleRadius = 10;
    const circleX = rectX + 0;
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

    // Tambahkan event click
    [rect, text, circle, checktext].forEach((el) => {
      el.addEventListener(
        "click",
        setupMaterialClick(materiItem, "fetchMateri34")
      );
    });

    // Tambahkan grup ke dalam SVG
    materiList.appendChild(group);

    checkCompletedItems(category);
  });
}
