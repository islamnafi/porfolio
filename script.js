(function () {
  "use strict";

  // ===========================
  // Config
  // ===========================
  const PROMPT_PATH = "C:\\Nafi";
  const HINT_TEXT = "Type 'help' and press Enter";

  // ===========================
  // Command data (EDIT HERE)
  // Replace the placeholder text with your real content later.
  // ===========================
  const commandResponses = {
    help: [
      "Available commands:",
      "",
      "  about           education        experience",
      "  projects        research         skills",
      "  certifications  activities       contact",
      "  clear (alias: cls)",
      "",
      "Type any command and press Enter."
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
      "Education",
      "----------------------------------------",
      "- B.S. in Something, University Name (YYYY - YYYY)",
      "- M.S. in Something Else, University Name (YYYY - YYYY)",
      "",
      "Replace with your actual degrees, schools, and achievements."
    ].join("\n"),

    // --- experience ---
    experience: [
      "Experience",
      "----------------------------------------",
      "- Company A — Role Title (YYYY - YYYY)",
      "  Key contributions and accomplishments.",
      "",
      "- Company B — Role Title (YYYY - YYYY)",
      "  Key contributions and accomplishments.",
      "",
      "Replace with your actual roles and bullets."
    ].join("\n"),

    // --- projects ---
    projects: [
      "Projects",
      "----------------------------------------",
      "- Project One: Short description. Tech used: X, Y, Z.",
      "- Project Two: Short description. Tech used: A, B, C.",
      "",
      "Add links or more details as needed."
    ].join("\n"),

    // --- research ---
    research: [
      "Research",
      "----------------------------------------",
      "- Topic/Area: Brief description of your research focus.",
      "- Publication/Thesis: Title, Venue/Year.",
      "",
      "Expand with citations, abstracts, and links."
    ].join("\n"),

    // --- skills ---
    skills: [
      "Skills",
      "----------------------------------------",
      "Languages: JavaScript, TypeScript, Python, C++",
      "Web: HTML, CSS, Node.js",
      "Tools: Git, Docker",
      "",
      "Tailor this to your actual skill set."
    ].join("\n"),

    // --- certifications ---
    certifications: [
      "Certifications",
      "----------------------------------------",
      "- Certification A (Issuer, Year)",
      "- Certification B (Issuer, Year)",
      "",
      "Update with your real certifications."
    ].join("\n"),

    // --- activities ---
    activities: [
      "Activities",
      "----------------------------------------",
      "- Volunteer at Organization (Role, YYYY - YYYY)",
      "- Club/Community involvement, events, hackathons, etc.",
      "",
      "Customize this section to your extracurriculars."
    ].join("\n"),

    // --- contact ---
    contact: [
      "Contact",
      "----------------------------------------",
      "Email: your.email@example.com",
      "LinkedIn: https://www.linkedin.com/in/your-handle",
      "GitHub:  https://github.com/your-handle",
      "",
      "Replace placeholders with your real contact info."
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
      const out = makeElement("div", "line output", t);
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
    // Start with the first prompt that includes the hint
    isFirstPrompt = true;
    hasDismissedHint = false;
    resetPrompt();

    // Focus the terminal to capture input immediately
    setTimeout(() => { terminal.focus(); }, 0);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("paste", handlePaste);

    document.addEventListener("click", () => terminal.focus(), { passive: true });
  }

  init();
})();