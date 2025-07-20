const dummyStudents = [
  {
    id: "001",
    name: "Shreya Sawant",
    email: "shreya@example.com",
    course: "Web Development",
    duration: "6 weeks",
    mentor: "Kajal Joseph",
    mode: "Online",
    certificate: "WDC2025-001",
    issuedOn: "2025-06-20"
  },
  {
    id: "002",
    name: "Aditi Sharma",
    email: "aditi@gmail.com",
    course: "UI/UX Design",
    duration: "4 weeks",
    mentor: "Rahul Dev",
    mode: "Offline",
    certificate: "UX2025-002",
    issuedOn: "2025-07-01"
  },
  {
    id: "003",
    name: "Karan Mehta",
    email: "karan@vaultcodes.in",
    course: "Data Science",
    duration: "8 weeks",
    mentor: "Riya Das",
    mode: "Online",
    certificate: "DS2025-003",
    issuedOn: "2025-07-10"
  }
];

// Populate datalist for auto-complete
window.onload = () => {
  const list = document.getElementById("suggestions");
  dummyStudents.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s.email;
    list.appendChild(opt);
  });
};

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function verifyStudent() {
  const input = document.getElementById("identifier").value.trim().toLowerCase();
  const spinner = document.querySelector(".spinner");
  const result = document.getElementById("result");
  result.innerHTML = "";
  spinner.classList.remove("hidden");

  setTimeout(() => {
    spinner.classList.add("hidden");

    const student = dummyStudents.find(
      (s) => s.email.toLowerCase() === input || s.id === input
    );

    if (student) {
      const resultCard = `
        <div class="card">
          <h2>✅ Certificate Verified</h2>
          <p><strong>Name:</strong> ${student.name}</p>
          <p><strong>Email:</strong> ${student.email}</p>
          <button class="toggle-btn" onclick="toggleDetails(this)">Show More</button>
          <div class="more-details hidden">
            <p><strong>Course:</strong> ${student.course}</p>
            <p><strong>Duration:</strong> ${student.duration}</p>
            <p><strong>Mentor:</strong> ${student.mentor}</p>
            <p><strong>Mode:</strong> ${student.mode}</p>
            <p><strong>Certificate ID:</strong> ${student.certificate}</p>
            <p><strong>Issued On:</strong> ${student.issuedOn}</p>
          </div>
        </div>
      `;
      result.innerHTML = resultCard;
    } else {
      const extractedName = input.includes("@")
        ? input.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase())
        : input;
      result.innerHTML = `
        <p style="color:red;">❌ No certificate found for: <strong>${extractedName}</strong></p>
      `;
      showToast("No matching student found.");
    }
  }, 1000);
}

function toggleDetails(btn) {
  const details = btn.nextElementSibling;
  if (details.classList.contains("hidden")) {
    details.classList.remove("hidden");
    btn.textContent = "Show Less";
  } else {
    details.classList.add("hidden");
    btn.textContent = "Show More";
  }
}
