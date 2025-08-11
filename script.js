(function () {
  "use strict";

  // ===========================
  // Config
  // ===========================
  const PROMPT_PATH = "Portfolio:\\Nafi";
  const HINT_TEXT = "Type 'help' and press Enter";
  const BANNER_TEXT = [
    "[Version 10.0.19045.6093]",
    "All rights reseseved by Nafiul Islam.",
    ""
  ].join("\n");

  // ===========================
  // Command data (EDIT HERE)
  // Replace the placeholder text with your real content later.
  // ===========================
  const commandResponses = {
    help: [
      " ",
      "List of commands:",
      "about",
      "education",
      "experience",
      "projects",
      "research",
      "skills",
      "certifications",
      "activities",
      "contact",
      "clear",
      "Type any command and press Enter",
      " "
    ].join("\n"),

    // --- about ---
    about: [
      "About Me",
      "----------------------------------------",
      "Hi, I'm Nafi. This is a placeholder about section.",
      "Replace this text with your own background, interests, and profile summary."
    ].join("\n"),

         // --- education ---
     education: [
       " ",
       "MSc in Computer Science and Engineering | United International University | 2023 – Ongoing",
       "BSc in Mechanical Engineering | Military Institute of Science and Technology | 2019 – 2023",
       "Higher Secondary Certificate | Adamjee Cantonment College | 2018",
       "Secondary School Certificate | Adamjee Cantonment Public School | 2016",
       "Junior School Certificate | Monipur High School and College (Branch-2) | 2013",
       "Primary School Certificate | Cambrian School and College | 2010",
       " ",
       "You might be wondering—why study mechanical engineering and then switch to CSE—what's wrong with me? My journey into mechanical engineering wasn't exactly by choice. I've been coding since 2013, back when I was a 14-year-old who would rather explore computer hardware and write bits of code than study school textbooks. I had always dreamed of becoming a computer engineer, but the university admission system had other plans. Lacking the courage to push back, I went with the flow—straight into a degree I didn't love.",
       " "
     ].join("\n"),

         // --- experience ---
     experience: [
       " ",
       "Executive, Business Development | Cynical Ltd. | December 2024 – July 2025",
       "At Cynical Ltd., I focused on driving growth and expanding business opportunities across a variety of ERP software solutions, government projects, and high-impact initiatives in partnership with organizations like the Asian Development Bank (ADB) and the World Bank. My role involved designing and planning innovative software solutions tailored to client needs, ensuring smooth implementation and optimal performance. I also contributed to automation projects within the power and energy sectors, developing strategies and partnerships that enabled clients to enhance operational efficiency while advancing their digital transformation journeys.",
       " ",
       "Trainee | British American Tobacco Bangladesh | February 2022 – March 2022",
       "Worked in a data-driven environment to support automated maintenance, reducing equipment downtime. Gained exposure to high-volume production and inventory management, learned about the Integrated Work System (IWS), and analyzed tobacco wastage to identify efficiency improvements.",
       " "
     ].join("\n"),

    // --- projects ---
    projects: [
      "Not updated yet."
    ].join("\n"),

         // --- research ---
     research: [
       " ",
       "Design and Development of Motorcycle Helmet Using Carbon Fiber Reinforced Epoxy Resin Hybrid Composite",
       "Elsevier | April 2025",
       "Read publication: https://www.sciencedirect.com/science/article/pii/S2590048X25000615",
       " ",
       "Laminar Convective Heat Transfer Across a Circular Pipe by Using MWCNT + Fe3O4 Hybrid Nanofluid: A Numerical Study",
       "IOP Conference Series: Materials Science and Engineering | December 2022",
       "Read publication: https://iopscience.iop.org/article/10.1088/1757-899X/1305/1/012005",
       " ",
       "Using Real-Time GPS Tracking Traffic System for Healthcare Vehicles",
       "5th International Conference on Advances in Civil Engineering (ICACE 2020) | December 2020",
       "Read publication: https://www.researchgate.net/publication/357057117_USING_REAL-TIME_GPS_TRACKING_TRAFFIC_SYSTEM_FOR_HEALTHCARE_VEHICLES",
       " "
     ].join("\n"),

         // --- skills ---
     skills: [
       " ",
       "Languages: Python | C# | C | Java | MySQL",
       "Software Development Stack: Django | ASP.NET Core",
       "Data Science Libraries: NumPy | Pandas | Seaborn | Matplotlib",
       "Tools: Git | Visual Studio | MS Office | Colab | Figma",
       " "
     ].join("\n"),

         // --- certifications ---
     certifications: [
       " ",
       "Certified Supply Chain Analyst (CSCA) | ISCEA - International Supply Chain Education Alliance | Issued Nov 2022",
       "Certified SOLIDWORKS Associate (CSWA) | SolidWorks Designer | Issued Oct 2022",
       " "
     ].join("\n"),

         // --- activities ---
     activities: [
       " ",
       "Anatolian Rover Challenge 2022 | Co-lead of Rover Structure",
       "I co-led the Rover Structure sub-team for international robotics competitions including the Anatolian Rover Challenge (ARC 2022) and the University Rover Challenge (URC 2022), organized by the Turkish Space Agency and NASA/The Mars Society. Managing a team of five, I oversaw structural design, CAD modeling, material selection, prototyping, and component integration to build mission-ready rovers. Our efforts earned us 3rd place at ARC 2022 and a Top 3 ranking in the SAR category at URC 2022.",
       " ",
       "MOTO MIST Automotive Club | Vice President",
       "I led and coordinated a team of over 40 members to successfully plan and run seminars, technical competitions, and campus-wide events that energized the engineering community.",
       " "
     ].join("\n"),

    // --- contact ---
    contact: [
      " ",
      "Email | islamnafi99@gmail.com",
      "LinkedIn | https://www.linkedin.com/in/nafii99",
      "GitHub |  https://github.com/islamnafi",
      "Scholar | https://tinyurl.com/4sxz6k5j",
      " "
    ].join("\n")
  };

  // ===========================
  // DOM helpers
  // ===========================
  const terminal = document.getElementById("terminal");

  function makeElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (typeof text === "string") el.textContent = text;
    return el;
  }

  function firstPromptLabel() {
  return `${PROMPT_PATH}> `;
  }

  function normalPromptLabel() {
  return `${PROMPT_PATH}> `;
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  // Make URLs and emails clickable in output
  const LINK_PATTERN = /((https?:\/\/|www\.)\S+)|([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

  function linkify(text) {
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match;

    while ((match = LINK_PATTERN.exec(text)) !== null) {
      const matchStart = match.index;
      const matchEnd = LINK_PATTERN.lastIndex;

      if (matchStart > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, matchStart)));
      }

      const matchedText = match[0];
      const isEmail = !!match[3];
      const anchor = document.createElement("a");
      if (isEmail) {
        anchor.href = `mailto:${matchedText}`;
        anchor.textContent = matchedText;
      } else {
        const hasProtocol = /^(https?:)/i.test(matchedText);
        anchor.href = hasProtocol ? matchedText : `https://${matchedText}`;
        anchor.textContent = matchedText;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
      }
      fragment.appendChild(anchor);

      lastIndex = matchEnd;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    return fragment;
  }

  // ===========================
  // Rendering
  // ===========================
  let currentInput = "";
  let currentPrompt = null;
  let hasDismissedHint = false; // once user types, don't show hint again
  let isFirstPrompt = true;     // only first prompt shows the special backslash + hint

  function finalizeCurrentPrompt() {
    if (!currentPrompt) return;
    if (currentPrompt.cursor && currentPrompt.cursor.parentNode) {
      currentPrompt.cursor.remove();
    }
    if (currentPrompt.hint) {
      currentPrompt.hint.style.display = "none";
    }
  }

function renderPromptLine() {
  const line = makeElement("div", "line prompt-line");

  const labelText = isFirstPrompt && !hasDismissedHint
    ? firstPromptLabel()
    : normalPromptLabel();

  const label = makeElement("span", "prompt-label", labelText);
  const typed = makeElement("span", "typed", "");
  const cursor = makeElement("span", "cursor", "█");
  let hint = null;

  if (isFirstPrompt && !hasDismissedHint) {
    hint = makeElement("span", "hint", HINT_TEXT ? ` ${HINT_TEXT}` : "");
  }

  // Order matters: cursor should be before the hint
  line.appendChild(label);
  line.appendChild(typed);
  line.appendChild(cursor);
  if (hint) line.appendChild(hint);

  terminal.appendChild(line);
  scrollToBottom();

  currentPrompt = { line, label, typed, cursor, hint };
  return currentPrompt;
}

  function renderOutput(text) {
    if (!text) return;
    const lines = text.split("\n");
    lines.forEach((t) => {
      const out = makeElement("div", "line output");
      out.appendChild(linkify(t));
      terminal.appendChild(out);
    });
    scrollToBottom();
  }

  function resetPrompt() {
    finalizeCurrentPrompt();
    currentInput = "";
    renderPromptLine();
    // After the first time we render, subsequent prompts are normal
    isFirstPrompt = false;
  }

  function setTyped(text) {
    if (!currentPrompt) return;
    currentPrompt.typed.textContent = text;
    if (currentPrompt.hint) {
      currentPrompt.hint.style.display =
        text.length === 0 && !hasDismissedHint ? "" : "none";
    }
    scrollToBottom();
  }

  // ===========================
  // Input handling
  // ===========================
  function processCommand(raw) {
    const input = raw.trim();
    finalizeCurrentPrompt();

    if (input.length === 0) {
      resetPrompt();
      return;
    }

    const lower = input.toLowerCase();

    // clear / cls
    if (lower === "clear" || lower === "cls") {
      terminal.innerHTML = "";
      hasDismissedHint = false;
      isFirstPrompt = true;
      currentPrompt = null;
      currentInput = "";
      resetPrompt();
      return;
    }

    if (Object.prototype.hasOwnProperty.call(commandResponses, lower)) {
      renderOutput(commandResponses[lower]);
    } else {
      renderOutput(`'${input}' is not recognized as an internal or external command.`);
    }

    resetPrompt();
  }

  function isPrintableKey(evt) {
    // Allow single-character keys as printable
    return evt.key.length === 1;
  }

  function handleKeyDown(evt) {
    if (evt.key === "Tab") {
      evt.preventDefault();
      return;
    }

    if (evt.key === "Enter") {
      evt.preventDefault();
      processCommand(currentInput);
      return;
    }

    if (evt.key === "Backspace") {
      evt.preventDefault();
      if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        setTyped(currentInput);
      }
      return;
    }

    if (evt.key === "Escape") {
      evt.preventDefault();
      currentInput = "";
      setTyped(currentInput);
      return;
    }

    if (isPrintableKey(evt)) {
      // First printable keypress dismisses the hint on the first line
      if (!hasDismissedHint && currentInput.length === 0 && currentPrompt && currentPrompt.hint) {
        hasDismissedHint = true;
        currentPrompt.hint.style.display = "none";
      }
      currentInput += evt.key;
      setTyped(currentInput);
      return;
    }
  }

  function handlePaste(evt) {
    const text = (evt.clipboardData || window.clipboardData).getData("text");
    if (text) {
      evt.preventDefault();
      if (!hasDismissedHint && currentInput.length === 0 && currentPrompt && currentPrompt.hint) {
        hasDismissedHint = true;
        currentPrompt.hint.style.display = "none";
      }
      currentInput += text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      setTyped(currentInput);
    }
  }

  // ===========================
  // Init
  // ===========================
  function init() {
    terminal.setAttribute("tabindex", "0");
    
    // Create hidden input field for mobile compatibility
    const mobileInput = document.createElement("input");
    mobileInput.type = "text";
    mobileInput.id = "mobileInput";
    mobileInput.style.position = "absolute";
    mobileInput.style.left = "-9999px";
    mobileInput.style.opacity = "0";
    mobileInput.style.pointerEvents = "none";
    mobileInput.setAttribute("inputmode", "text");
    mobileInput.setAttribute("enterkeyhint", "send");
    mobileInput.setAttribute("autocorrect", "off");
    mobileInput.setAttribute("autocapitalize", "sentences");
    mobileInput.setAttribute("spellcheck", "false");
    document.body.appendChild(mobileInput);
    
    // Start with the first prompt that includes the hint
    isFirstPrompt = true;
    hasDismissedHint = false;
    // Show version banner above the first prompt
    renderOutput(BANNER_TEXT);
    resetPrompt();

    // Focus the terminal to capture input immediately
    setTimeout(() => { terminal.focus(); }, 0);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("paste", handlePaste);

    // Mobile input handling
    mobileInput.addEventListener("input", (e) => {
      if (e.target.value) {
        currentInput += e.target.value;
        setTyped(currentInput);
        e.target.value = "";
      }
    });
    
    mobileInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        processCommand(currentInput);
      }
    });

    document.addEventListener("click", () => {
      terminal.focus();
      // On mobile, also focus the hidden input to trigger keyboard
      if ('ontouchstart' in window) {
        mobileInput.focus();
      }
    }, { passive: true });
    
    // Handle touch events for mobile
    if ('ontouchstart' in window) {
      terminal.addEventListener("touchstart", () => {
        mobileInput.focus();
      }, { passive: true });
    }
  }

  init();
})();