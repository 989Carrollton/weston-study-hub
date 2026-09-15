(function () {
  "use strict";

  const PASSWORD = "weston8";
  const GATE_KEY = "weston_hub_unlocked";

  // ——— Units (data-driven; add more subjects here later) ———
  // When adding a unit, also fill SECTIONS / FLASHCARDS / QUIZ (or nest per-unit later).
  const UNITS = [
    {
      id: "religion",
      title: "Religion",
      emoji: "✝️",
      subtitle: "8th Grade · Test 9/16/2026 · Notes coming soon",
      welcome: "Hey Weston! Pick a mode to get ready for your Religion test. You've got this! 💪",
      quizTitle: "Religion Quiz",
      readyMsg: "You're ready for that Religion test!"
    }
  ];

  let currentUnit = null;

  // ——— Study sections (empty until first unit content is added) ———
  const SECTIONS = [
    {
      id: "coming-soon",
      title: "Notes coming soon",
      short: "1. Soon",
      html: `
        <h2>Religion unit</h2>
        <p>Your study guide, flashcards, and quiz will land here as soon as your notes are uploaded.</p>
        <p><strong>Test date:</strong> 9/16/2026 · <strong>Grade:</strong> 8th</p>
      `
    }
  ];

  // ——— Flashcards (empty until first unit content is added) ———
  const FLASHCARDS = [];

  // ——— Quiz (empty until first unit content is added) ———
  const QUIZ = [];

  // ——— State ———
  let flashOrder = [];
  let flashIndex = 0;
  let flashFlipped = false;
  let knowSet = new Set();
  let learningSet = new Set();

  let quizOrder = [];
  let quizIndex = 0;
  let quizAnswers = []; // { selected, correct, qIndex }
  let quizSelected = [];
  let quizLocked = false;

  // ——— DOM ———
  const $ = (sel) => document.querySelector(sel);
  const gate = $("#gate");
  const app = $("#app");
  const btnHome = $("#btn-home");
  const brandTitle = $("#brand-title");
  const brandSubtitle = $("#brand-subtitle");

  // Gate
  function checkGate() {
    if (sessionStorage.getItem(GATE_KEY) === "1") {
      gate.classList.add("hidden");
      app.classList.remove("hidden");
    }
  }
  $("#gate-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const pw = $("#gate-pw").value.trim().toLowerCase();
    if (pw === PASSWORD.toLowerCase()) {
      sessionStorage.setItem(GATE_KEY, "1");
      $("#gate-error").classList.add("hidden");
      gate.classList.add("hidden");
      app.classList.remove("hidden");
    } else {
      $("#gate-error").classList.remove("hidden");
      $("#gate-pw").value = "";
      $("#gate-pw").focus();
    }
  });

  // ——— Hub / unit branding ———
  function setHubBrand() {
    brandTitle.textContent = "Weston's Study Hub";
    brandSubtitle.textContent = "Pick a subject to study";
  }

  function setUnitBrand(unit) {
    brandTitle.textContent = unit.emoji + " " + unit.title;
    brandSubtitle.textContent = unit.subtitle;
  }

  function renderUnits() {
    const grid = $("#units-grid");
    grid.innerHTML = "";
    if (!UNITS.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML =
        '<span class="empty-emoji" aria-hidden="true">✏️</span>' +
        "<p>No subjects yet — your dad will add your first one soon!</p>";
      grid.appendChild(empty);
      return;
    }
    UNITS.forEach((unit) => {
      const btn = document.createElement("button");
      btn.className = "mode-card unit-card";
      btn.type = "button";
      btn.dataset.unit = unit.id;
      btn.innerHTML =
        '<span class="mode-emoji">' + unit.emoji + "</span>" +
        '<span class="mode-title">' + unit.title + "</span>" +
        '<span class="mode-desc">' + unit.subtitle + "</span>";
      btn.addEventListener("click", () => selectUnit(unit.id));
      grid.appendChild(btn);
    });
  }

  function selectUnit(id) {
    const unit = UNITS.find((u) => u.id === id);
    if (!unit) return;
    currentUnit = unit;
    setUnitBrand(unit);
    $("#unit-welcome").textContent = unit.welcome;
    const quizTitle = $("#quiz-intro-title");
    if (quizTitle) quizTitle.textContent = unit.quizTitle || "Quiz";
    showView("unit-home");
  }

  // Navigation
  // views: units (hub) → unit-home (modes) → study | flash | quiz
  function showView(name) {
    ["units", "unit-home", "study", "flash", "quiz"].forEach((v) => {
      const el = $("#view-" + v);
      if (el) el.classList.toggle("hidden", v !== name);
    });
    btnHome.classList.toggle("hidden", name === "units");
  }

  btnHome.addEventListener("click", () => {
    const studyEl = $("#view-study");
    const flashEl = $("#view-flash");
    const quizEl = $("#view-quiz");
    const unitHomeEl = $("#view-unit-home");
    const inMode =
      (studyEl && !studyEl.classList.contains("hidden")) ||
      (flashEl && !flashEl.classList.contains("hidden")) ||
      (quizEl && !quizEl.classList.contains("hidden"));
    if (inMode) {
      showView("unit-home");
      if (currentUnit) setUnitBrand(currentUnit);
    } else if (unitHomeEl && !unitHomeEl.classList.contains("hidden")) {
      currentUnit = null;
      setHubBrand();
      showView("units");
    } else {
      currentUnit = null;
      setHubBrand();
      showView("units");
    }
  });

  document.querySelectorAll(".mode-card[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.mode;
      if (mode === "study") { initStudy(); showView("study"); }
      else if (mode === "flash") { initFlash(); showView("flash"); }
      else if (mode === "quiz") { initQuizHome(); showView("quiz"); }
    });
  });

  // ——— Study ———
  function initStudy() {
    const nav = $("#study-nav");
    nav.innerHTML = "";
    if (!SECTIONS.length) {
      $("#study-content").innerHTML =
        '<div class="empty-state"><span class="empty-emoji" aria-hidden="true">📖</span><p>Study guide coming soon!</p></div>';
      return;
    }
    SECTIONS.forEach((s, i) => {
      const chip = document.createElement("button");
      chip.className = "sec-chip" + (i === 0 ? " active" : "");
      chip.textContent = s.short;
      chip.addEventListener("click", () => {
        nav.querySelectorAll(".sec-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        $("#study-content").innerHTML = s.html;
        window.scrollTo(0, 0);
      });
      nav.appendChild(chip);
    });
    $("#study-content").innerHTML = SECTIONS[0].html;
  }

  // ——— Flashcards ———
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function initFlash() {
    if (!FLASHCARDS.length) {
      flashOrder = [];
      flashIndex = 0;
      flashFlipped = false;
      knowSet = new Set();
      learningSet = new Set();
      $("#flash-term").textContent = "No flashcards yet";
      $("#flash-def").textContent = "Your dad will add these soon!";
      $("#flashcard").classList.remove("flipped");
      $("#flash-progress").textContent = "0 / 0";
      $("#stat-know").textContent = "0";
      $("#stat-learning").textContent = "0";
      return;
    }
    flashOrder = shuffle(FLASHCARDS.map((_, i) => i));
    flashIndex = 0;
    flashFlipped = false;
    knowSet = new Set();
    learningSet = new Set();
    renderFlash();
  }

  function currentFlash() {
    return FLASHCARDS[flashOrder[flashIndex]];
  }

  function renderFlash() {
    if (!flashOrder.length) return;
    const card = currentFlash();
    if (!card) return;
    $("#flash-term").textContent = card.term;
    $("#flash-def").textContent = card.def;
    $("#flashcard").classList.toggle("flipped", flashFlipped);
    $("#flash-progress").textContent = (flashIndex + 1) + " / " + flashOrder.length;
    $("#stat-know").textContent = knowSet.size;
    $("#stat-learning").textContent = learningSet.size;
  }

  function flipCard() {
    if (!flashOrder.length) return;
    flashFlipped = !flashFlipped;
    $("#flashcard").classList.toggle("flipped", flashFlipped);
  }

  $("#flashcard").addEventListener("click", flipCard);
  $("#flashcard").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flipCard(); }
  });

  $("#btn-shuffle").addEventListener("click", () => {
    if (!FLASHCARDS.length) return;
    flashOrder = shuffle(FLASHCARDS.map((_, i) => i));
    flashIndex = 0;
    flashFlipped = false;
    renderFlash();
  });

  $("#btn-prev").addEventListener("click", () => {
    if (!flashOrder.length) return;
    flashIndex = (flashIndex - 1 + flashOrder.length) % flashOrder.length;
    flashFlipped = false;
    renderFlash();
  });
  $("#btn-next").addEventListener("click", () => {
    if (!flashOrder.length) return;
    flashIndex = (flashIndex + 1) % flashOrder.length;
    flashFlipped = false;
    renderFlash();
  });

  $("#btn-know").addEventListener("click", () => {
    if (!flashOrder.length) return;
    const id = flashOrder[flashIndex];
    knowSet.add(id);
    learningSet.delete(id);
    flashIndex = (flashIndex + 1) % flashOrder.length;
    flashFlipped = false;
    renderFlash();
  });
  $("#btn-learning").addEventListener("click", () => {
    if (!flashOrder.length) return;
    const id = flashOrder[flashIndex];
    learningSet.add(id);
    knowSet.delete(id);
    flashIndex = (flashIndex + 1) % flashOrder.length;
    flashFlipped = false;
    renderFlash();
  });

  // ——— Quiz ———
  function initQuizHome() {
    $("#quiz-start").classList.remove("hidden");
    $("#quiz-play").classList.add("hidden");
    $("#quiz-results").classList.add("hidden");
    if (!QUIZ.length) {
      $("#quiz-q-count").textContent = "No questions yet — check back soon!";
      $("#btn-start-quiz").disabled = true;
    } else {
      $("#quiz-q-count").textContent = QUIZ.length + " questions · mix of multiple choice & multi-select";
      $("#btn-start-quiz").disabled = false;
    }
  }

  function startQuiz() {
    if (!QUIZ.length) return;
    quizOrder = shuffle(QUIZ.map((_, i) => i));
    quizIndex = 0;
    quizAnswers = [];
    $("#quiz-start").classList.add("hidden");
    $("#quiz-results").classList.add("hidden");
    $("#quiz-play").classList.remove("hidden");
    renderQuestion();
  }

  function currentQ() {
    return QUIZ[quizOrder[quizIndex]];
  }

  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    const as = a.slice().sort((x, y) => x - y);
    const bs = b.slice().sort((x, y) => x - y);
    return as.every((v, i) => v === bs[i]);
  }

  function renderQuestion() {
    const q = currentQ();
    quizSelected = [];
    quizLocked = false;
    const pct = (quizIndex / quizOrder.length) * 100;
    $("#quiz-bar").style.width = pct + "%";
    $("#quiz-num").textContent = "Question " + (quizIndex + 1) + " of " + quizOrder.length;
    const typeLabel = q.type === "ms" ? "Multi-select — pick all that apply" : "Multiple choice";
    $("#quiz-question").innerHTML = '<span class="q-type">' + typeLabel + "</span><br>" + escapeHtml(q.q);

    const box = $("#quiz-choices");
    box.innerHTML = "";
    q.choices.forEach((c, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice" + (q.type === "ms" ? " multi" : "");
      btn.dataset.idx = i;
      const letter = String.fromCharCode(65 + i);
      btn.innerHTML = '<span class="marker">' + (q.type === "ms" ? "☐" : letter) + "</span><span>" + escapeHtml(c) + "</span>";
      btn.addEventListener("click", () => onChoice(i, btn));
      box.appendChild(btn);
    });

    $("#quiz-feedback").classList.add("hidden");
    $("#btn-submit-q").classList.remove("hidden");
    $("#btn-submit-q").disabled = false;
    $("#btn-next-q").classList.add("hidden");
  }

  function onChoice(i, btn) {
    if (quizLocked) return;
    const q = currentQ();
    if (q.type === "mc") {
      quizSelected = [i];
      $("#quiz-choices").querySelectorAll(".choice").forEach((el) => el.classList.remove("selected"));
      btn.classList.add("selected");
    } else {
      const pos = quizSelected.indexOf(i);
      if (pos >= 0) {
        quizSelected.splice(pos, 1);
        btn.classList.remove("selected");
        btn.querySelector(".marker").textContent = "☐";
      } else {
        quizSelected.push(i);
        btn.classList.add("selected");
        btn.querySelector(".marker").textContent = "☑";
      }
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  $("#btn-submit-q").addEventListener("click", () => {
    if (quizLocked) return;
    const q = currentQ();
    if (quizSelected.length === 0) {
      $("#quiz-feedback").textContent = "Pick an answer first — you've got this!";
      $("#quiz-feedback").className = "quiz-feedback no";
      $("#quiz-feedback").classList.remove("hidden");
      return;
    }
    quizLocked = true;
    const correctAns = q.type === "mc" ? [q.answer] : q.answer.slice();
    const isCorrect = arraysEqual(quizSelected, correctAns);

    const choiceEls = $("#quiz-choices").querySelectorAll(".choice");
    choiceEls.forEach((el) => {
      const idx = +el.dataset.idx;
      if (correctAns.indexOf(idx) >= 0) el.classList.add("correct");
      if (quizSelected.indexOf(idx) >= 0 && correctAns.indexOf(idx) < 0) el.classList.add("wrong");
    });

    const fb = $("#quiz-feedback");
    if (isCorrect) {
      fb.className = "quiz-feedback ok";
      fb.textContent = "Nice work! ✓ " + q.explain;
    } else {
      fb.className = "quiz-feedback no";
      fb.textContent = "Not quite — keep going! " + q.explain;
    }
    fb.classList.remove("hidden");

    quizAnswers.push({
      qIndex: quizOrder[quizIndex],
      selected: quizSelected.slice(),
      correct: isCorrect
    });

    $("#btn-submit-q").classList.add("hidden");
    $("#btn-next-q").classList.remove("hidden");
    $("#btn-next-q").textContent =
      quizIndex + 1 >= quizOrder.length ? "See Results →" : "Next Question →";
  });

  $("#btn-next-q").addEventListener("click", () => {
    if (quizIndex + 1 >= quizOrder.length) {
      showResults();
    } else {
      quizIndex++;
      renderQuestion();
      window.scrollTo(0, 0);
    }
  });

  function showResults() {
    $("#quiz-play").classList.add("hidden");
    $("#quiz-results").classList.remove("hidden");
    $("#quiz-bar").style.width = "100%";

    const total = quizAnswers.length;
    const right = quizAnswers.filter((a) => a.correct).length;
    const pct = total ? Math.round((right / total) * 100) : 0;

    $("#results-score").textContent = right + " / " + total + " (" + pct + "%)";

    const readyMsg = (currentUnit && currentUnit.readyMsg) || "You're ready for that test!";
    let emoji = "🌟", title = "Amazing!", msg = readyMsg;
    if (pct < 60) {
      emoji = "💪"; title = "Keep practicing!";
      msg = "Review the wrong answers below, then try the quiz again. You've got this, Weston!";
    } else if (pct < 80) {
      emoji = "👍"; title = "Good job!";
      msg = "Solid work! Check the ones you missed, then retry to lock it in.";
    } else if (pct < 100) {
      emoji = "🎉"; title = "Great job!";
      msg = "You're almost perfect — peek at the review, then crush it next time!";
    }

    $("#results-emoji").textContent = emoji;
    $("#results-title").textContent = title;
    $("#results-msg").textContent = msg;

    const review = $("#results-review");
    review.innerHTML = "";
    const wrongs = quizAnswers.filter((a) => !a.correct);
    if (wrongs.length === 0) {
      review.innerHTML = '<p style="text-align:center;color:var(--teal);font-weight:600;">You got every question right! 🏆</p>';
    } else {
      const h = document.createElement("h3");
      h.textContent = "Review missed questions";
      h.style.color = "var(--sand)";
      h.style.marginBottom = "12px";
      review.appendChild(h);

      wrongs.forEach((a) => {
        const q = QUIZ[a.qIndex];
        const correctIdx = q.type === "mc" ? [q.answer] : q.answer;
        const correctText = correctIdx.map((i) => q.choices[i]).join("; ");
        const yourText = a.selected.map((i) => q.choices[i]).join("; ") || "(none)";
        const item = document.createElement("div");
        item.className = "review-item";
        item.innerHTML =
          "<h4>" + escapeHtml(q.q) + "</h4>" +
          "<p>Your answer: " + escapeHtml(yourText) + "</p>" +
          '<p class="correct-ans">Correct: ' + escapeHtml(correctText) + "</p>" +
          '<p class="explain">' + escapeHtml(q.explain) + "</p>";
        review.appendChild(item);
      });
    }
  }

  $("#btn-start-quiz").addEventListener("click", startQuiz);
  $("#btn-retry").addEventListener("click", startQuiz);
  $("#btn-quiz-home").addEventListener("click", () => {
    showView("unit-home");
    if (currentUnit) setUnitBrand(currentUnit);
  });

  // Boot
  checkGate();
  renderUnits();
  setHubBrand();
  showView("units");
})();
