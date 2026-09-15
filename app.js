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
      subtitle: "8th Grade · Test 9/16/2026 · Commandments, Sabbath, life & holiness",
      welcome: "Hey Weston! Pick a mode to get ready for your Religion test. Commandments, Sabbath, life & holiness — you've got this! 💪",
      quizTitle: "Religion Quiz",
      readyMsg: "You're ready for that Religion test!"
    }
  ];

  let currentUnit = null;

  // ——— Study sections ———
  const SECTIONS = [
    {
      id: "vocab",
      title: "Key Vocabulary",
      short: "1. Vocab",
      html: `
        <h2>Key Vocabulary</h2>
        <p>Know these definitions cold — a lot of the test is matching terms to meanings.</p>
        <div class="key-terms">
          <h3>Terms</h3>
          <div class="term-row"><strong>Euthanasia</strong> — Mercy medical killing of another human life</div>
          <div class="term-row"><strong>Perjury</strong> — The act of making a false oath</div>
          <div class="term-row"><strong>Reverence</strong> — Honor, love, and respect</div>
          <div class="term-row"><strong>Atheism</strong> — To reject or deny God’s existence</div>
          <div class="term-row"><strong>Idolatry</strong> — Giving worship to a creature or thing instead of God</div>
          <div class="term-row"><strong>Sabbath</strong> — A day set apart to rest and honor God</div>
          <div class="term-row"><strong>Adultery</strong> — Infidelity in marriage; unfaithfulness or cheating on one’s husband or wife</div>
          <div class="term-row"><strong>Decalogue</strong> — Another word for the 10 commandments; “God’s 10 words”</div>
          <div class="term-row"><strong>Temple</strong> — Holy place in Jerusalem where the Jewish people gathered to worship God</div>
          <div class="term-row"><strong>Modesty</strong> — Acting in a way that reflects God</div>
          <div class="term-row"><strong>Scribes</strong> — Scholars of the Jewish law</div>
          <div class="term-row"><strong>Cursing</strong> — Calling upon God to do harm to others</div>
          <div class="term-row"><strong>Chastity</strong> — The virtue that helps us live out our human sexuality in a respectful way</div>
        </div>
        <h3>Human sexuality</h3>
        <p>The gift of being able to <strong>feel, think, choose, love, and act</strong> as the male or female person God created us to be.</p>
        <div class="callout"><strong>Watch the mix-ups:</strong> The Israelites worshipped a golden calf → <strong>idolatry</strong>. Blasphemy example: making fun of the Eucharist (Catholics believe it is truly Jesus). Cursing is calling on God to harm others — not the same as perjury (a false oath).</div>
      `
    },
    {
      id: "commandments",
      title: "The Commandments",
      short: "2. Commandments",
      html: `
        <h2>The Commandments</h2>
        <p>The <strong>Decalogue</strong> is another word for the 10 commandments — “God’s 10 words.”</p>
        <h3>First 3 — focus on God</h3>
        <ul>
          <li>You shall put no other gods before me</li>
          <li>You shall not say the Lord’s name in vain</li>
          <li>You shall keep the Sabbath day holy</li>
        </ul>
        <h3>Last 7 — focus on others</h3>
        <p>Commandments 4–6 (from the notes):</p>
        <ul>
          <li>You shall honor your father and mother</li>
          <li>You shall not kill</li>
          <li>You shall not commit adultery</li>
        </ul>
        <div class="callout"><strong>Trap:</strong> It is the first <em>three</em> commandments — not four — that focus on loving and worshipping the Lord. The last seven focus on others.</div>
        <h3>Great commandment vs New Commandment</h3>
        <ul>
          <li><strong>Great commandment</strong> — loving the Lord your God with all your heart, mind, strength, and soul</li>
          <li><strong>New Commandment</strong> — loving your <strong>neighbor</strong></li>
        </ul>
        <h3>Shema vs Sabbath</h3>
        <p>The <strong>Shema</strong> is a prayer from the book of Deuteronomy and a teaching from the book of Leviticus. The <strong>Sabbath</strong> is a day set apart to rest and honor God — they are not the same thing.</p>
      `
    },
    {
      id: "life-holiness",
      title: "Life, holiness & key ideas",
      short: "3. Life & holiness",
      html: `
        <h2>Life, holiness &amp; key ideas</h2>
        <h3>Right to life</h3>
        <p>From the moment of <strong>conception</strong> to <strong>natural</strong> death, humans receive the universal right to life.</p>
        <ul>
          <li><strong>Euthanasia</strong> is mercy medical killing of another human life.</li>
          <li>Killing yourself or someone else is a serious sin — but <strong>any sin can be forgiven by God</strong>.</li>
          <li><strong>TRUE:</strong> Polluting the Earth is one way of killing (the Earth, animals, and eventually others).</li>
        </ul>
        <h3>Paschal mystery</h3>
        <p>Order: <strong>suffering, death, resurrection, and ascension</strong>.</p>
        <h3>Prodigal Son</h3>
        <p>The story focuses on <strong>conversion and true happiness</strong>.</p>
        <h3>Beatitude (example)</h3>
        <p>“Blessed are the merciful, for they will be shown mercy.” It calls us to <strong>show mercy</strong> — forgive and help others when they make a mistake — so that we may be forgiven when we need it (including when it counts at the gates of heaven), and so the world becomes more forgiving.</p>
        <h3>Jesus, the Temple, and scribes</h3>
        <ul>
          <li>Jesus was <strong>Jewish</strong>.</li>
          <li>The <strong>Temple</strong> is the holy place in Jerusalem where the Jewish people gathered to worship God.</li>
          <li><strong>Scribes</strong> are scholars of the Jewish law.</li>
        </ul>
        <div class="key-terms">
          <h3>Holiness in daily life</h3>
          <div class="term-row"><strong>Chastity</strong> — Live out human sexuality in a respectful way</div>
          <div class="term-row"><strong>Modesty</strong> — Acting in a way that reflects God</div>
        </div>
      `
    }
  ];

  // ——— Flashcards ———
  const FLASHCARDS = [
    { term: "Euthanasia", def: "Mercy medical killing of another human life." },
    { term: "Perjury", def: "The act of making a false oath." },
    { term: "Reverence", def: "Honor, love, and respect." },
    { term: "Atheism", def: "To reject or deny God’s existence." },
    { term: "Idolatry", def: "Giving worship to a creature or thing instead of God." },
    { term: "Sabbath", def: "A day set apart to rest and honor God." },
    { term: "Adultery", def: "Infidelity in marriage; unfaithfulness or cheating on one’s husband or wife." },
    { term: "Human sexuality", def: "The gift of being able to feel, think, choose, love, and act as the male or female person God created us to be." },
    { term: "Chastity", def: "The virtue that helps us live out our human sexuality in a respectful way." },
    { term: "Decalogue", def: "Another word for the 10 commandments; “God’s 10 words.”" },
    { term: "Temple", def: "Holy place in Jerusalem where the Jewish people gathered to worship God." },
    { term: "Modesty", def: "Acting in a way that reflects God." },
    { term: "Scribes", def: "Scholars of the Jewish law." },
    { term: "Cursing", def: "Calling upon God to do harm to others." }
  ];

  // ——— Quiz ———
  // type: 'mc' | 'ms'  (multiple choice | multi-select)
  // answer: index or array of indices
  const QUIZ = [
    {
      type: "mc",
      q: "What is euthanasia?",
      choices: [
        "Mercy medical killing of another human life",
        "The act of making a false oath",
        "A day set apart to rest and honor God",
        "Giving worship to a creature or thing instead of God"
      ],
      answer: 0,
      explain: "Euthanasia is mercy medical killing of another human life."
    },
    {
      type: "mc",
      q: "What is perjury?",
      choices: [
        "Calling upon God to do harm to others",
        "Honor, love, and respect",
        "The act of making a false oath",
        "Rejecting or denying God’s existence"
      ],
      answer: 2,
      explain: "Perjury is the act of making a false oath."
    },
    {
      type: "mc",
      q: "Reverence means…",
      choices: [
        "Infidelity in marriage",
        "Honor, love, and respect",
        "Acting in a way that hides your faith",
        "Making a false oath"
      ],
      answer: 1,
      explain: "Reverence is honor, love, and respect."
    },
    {
      type: "mc",
      q: "Atheism is…",
      choices: [
        "Worshipping a golden calf",
        "Scholars of the Jewish law",
        "To reject or deny God’s existence",
        "Keeping the Sabbath day holy"
      ],
      answer: 2,
      explain: "Atheism means to reject or deny God’s existence."
    },
    {
      type: "mc",
      q: "Idolatry is…",
      choices: [
        "Giving worship to a creature or thing instead of God",
        "The act of making a false oath",
        "Mercy medical killing of another human life",
        "Calling upon God to do harm to others"
      ],
      answer: 0,
      explain: "Idolatry is giving worship to a creature or thing instead of God."
    },
    {
      type: "mc",
      q: "What is human sexuality?",
      choices: [
        "Only the physical differences between men and women",
        "The same thing as adultery",
        "The gift of being able to feel, think, choose, love, and act as the male or female person God created us to be",
        "A sin against the first commandment"
      ],
      answer: 2,
      explain: "Human sexuality is the gift of being able to feel, think, choose, love, and act as the male or female person God created us to be."
    },
    {
      type: "mc",
      q: "The Israelites committed _____ when they worshipped a golden calf.",
      choices: ["Perjury", "Adultery", "Blasphemy", "Idolatry"],
      answer: 3,
      explain: "Worshipping the golden calf was idolatry — giving worship to a creature or thing instead of God."
    },
    {
      type: "mc",
      q: "What is a day set apart to rest and honor God?",
      choices: ["Decalogue", "Sabbath", "Temple", "Shema"],
      answer: 1,
      explain: "The Sabbath is a day set apart to rest and honor God."
    },
    {
      type: "mc",
      q: "What is adultery?",
      choices: [
        "Infidelity in marriage; unfaithfulness or cheating on one’s husband or wife",
        "Making a false oath",
        "Giving worship to a creature instead of God",
        "Calling upon God to do harm to others"
      ],
      answer: 0,
      explain: "Adultery is infidelity in marriage — unfaithfulness or cheating on one’s husband or wife."
    },
    {
      type: "mc",
      q: "The _____ commandment focuses on loving the Lord your God with all your heart, mind, strength, and soul.",
      choices: ["New", "Fourth", "Great", "Tenth"],
      answer: 2,
      explain: "The Great commandment focuses on loving the Lord your God with all your heart, mind, strength, and soul."
    },
    {
      type: "mc",
      q: "TRUE OR FALSE: The Sabbath is a prayer from the book of Deuteronomy and a teaching from the book of Leviticus.",
      choices: ["True", "False"],
      answer: 1,
      explain: "False. The Shema is a prayer from Deuteronomy and a teaching from Leviticus — not the Sabbath."
    },
    {
      type: "mc",
      q: "TRUE OR FALSE: The first four commandments focus on loving and worshipping the Lord.",
      choices: ["True", "False"],
      answer: 1,
      explain: "False. It is the first three commandments that focus on loving and worshipping the Lord. The last seven focus on others."
    },
    {
      type: "mc",
      q: "From the moment of _____ to _____ death, humans receive the universal right to life.",
      choices: [
        "Birth; accidental",
        "Conception; natural",
        "Baptism; old-age",
        "Childhood; sudden"
      ],
      answer: 1,
      explain: "From the moment of conception to natural death, humans receive the universal right to life."
    },
    {
      type: "mc",
      q: "The New Commandment focuses on loving your _____.",
      choices: ["Country", "Parents only", "Neighbor", "Enemies only if they repent"],
      answer: 2,
      explain: "The New Commandment focuses on loving your neighbor."
    },
    {
      type: "mc",
      q: "What are scribes?",
      choices: [
        "Scholars of the Jewish law",
        "Roman soldiers who arrested Jesus",
        "People who deny God’s existence",
        "Priests of the golden calf"
      ],
      answer: 0,
      explain: "Scribes are scholars of the Jewish law."
    },
    {
      type: "mc",
      q: "What religion was Jesus?",
      choices: ["Christian", "Roman", "Jewish", "Greek"],
      answer: 2,
      explain: "Jesus was Jewish."
    },
    {
      type: "mc",
      q: "What virtue helps us live out our human sexuality in a respectful way?",
      choices: ["Perjury", "Atheism", "Modesty", "Chastity"],
      answer: 3,
      explain: "Chastity is the virtue that helps us live out our human sexuality in a respectful way. (Modesty is acting in a way that reflects God.)"
    },
    {
      type: "mc",
      q: "What is the order of the paschal mystery?",
      choices: [
        "Death, resurrection, suffering, and ascension",
        "Suffering, death, resurrection, and ascension",
        "Birth, death, resurrection, and Pentecost",
        "Suffering, resurrection, death, and ascension"
      ],
      answer: 1,
      explain: "The paschal mystery is suffering, death, resurrection, and ascension — in that order."
    },
    {
      type: "mc",
      q: "What does the story of the Prodigal Son focus on?",
      choices: [
        "The Ten Commandments",
        "How to pray the Shema",
        "Conversion and true happiness",
        "Keeping the Sabbath"
      ],
      answer: 2,
      explain: "The story of the Prodigal Son focuses on conversion and true happiness."
    },
    {
      type: "mc",
      q: "Which would qualify as an example of blasphemy?",
      choices: [
        "Someone making fun of the Eucharist and the way Catholics believe it is truly Jesus",
        "Resting on the Sabbath",
        "Honoring your father and mother",
        "Studying the Jewish law"
      ],
      answer: 0,
      explain: "Making fun of the Eucharist — and the Catholic belief that it is truly Jesus — is an example of blasphemy."
    },
    {
      type: "mc",
      q: "What is it called when someone calls upon God to do harm to others?",
      choices: ["Perjury", "Idolatry", "Cursing", "Atheism"],
      answer: 2,
      explain: "Cursing is when someone calls upon God to do harm to others."
    },
    {
      type: "mc",
      q: "TRUE OR FALSE: Killing yourself/someone else is a sin that cannot be forgiven by God.",
      choices: ["True", "False"],
      answer: 1,
      explain: "False. It is a serious sin, but any sin can be forgiven by God."
    },
    {
      type: "mc",
      q: "TRUE OR FALSE: Polluting the Earth is one way of killing.",
      choices: ["True", "False"],
      answer: 0,
      explain: "True. You are killing the Earth, animals, and eventually others."
    },
    {
      type: "mc",
      q: "The beatitude “Blessed are the merciful, for they will be shown mercy” calls us to…",
      choices: [
        "Never make any mistakes",
        "Only show mercy to people who deserve it",
        "Keep the Sabbath by resting all week",
        "Forgive and help others so that we may be forgiven when we need it"
      ],
      answer: 3,
      explain: "This beatitude calls us to show mercy — forgive and help others — so that we may be forgiven when we need it, including at the gates of heaven."
    },
    {
      type: "mc",
      q: "Decalogue is another word for…",
      choices: [
        "The Temple in Jerusalem",
        "The 10 commandments; “God’s 10 words”",
        "The story of the Prodigal Son",
        "The New Commandment only"
      ],
      answer: 1,
      explain: "Decalogue means the 10 commandments — “God’s 10 words.”"
    },
    {
      type: "mc",
      q: "The Temple is…",
      choices: [
        "A day set apart to rest and honor God",
        "Another word for the 10 commandments",
        "The holy place in Jerusalem where the Jewish people gathered to worship God",
        "A virtue of human sexuality"
      ],
      answer: 2,
      explain: "The Temple is the holy place in Jerusalem where the Jewish people gathered to worship God."
    },
    {
      type: "mc",
      q: "Modesty means…",
      choices: [
        "Acting in a way that reflects God",
        "Making a false oath",
        "Rejecting God’s existence",
        "Infidelity in marriage"
      ],
      answer: 0,
      explain: "Modesty is acting in a way that reflects God."
    },
    {
      type: "ms",
      q: "The first 3 commandments focus on God. Which belong in that list? (Select all that apply)",
      choices: [
        "You shall put no other gods before me",
        "You shall not say the Lord’s name in vain",
        "You shall keep the Sabbath day holy",
        "You shall honor your father and mother"
      ],
      answer: [0, 1, 2],
      explain: "The first three (God): no other gods; do not take the Lord’s name in vain; keep the Sabbath holy. Honoring father and mother is commandment 4 — it focuses on others."
    }
  ];


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
