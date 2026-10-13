"use strict";

/* ============ 1. Grab elements once ============ */
const els = {
  roomList: document.getElementById("room-list"),
  roomTitle: document.getElementById("room-title"),
  messages: document.getElementById("messages"),
  composer: document.getElementById("composer"),
  input: document.getElementById("message-input"),
  newRoomBtn: document.getElementById("new-room-btn"),
};

/* ============ 2. State ============ */
const currentUser = { name: "You" };

/* ============ 3. Helpers ============ */
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function scrollToBottom() {
  els.messages.scrollTop = els.messages.scrollHeight;
}

/* ============ 4. Building a message (safely) ============ */
function createMessageElement({ author, text, createdAt, own = false }) {
  const article = document.createElement("article");
  article.className = own ? "message message--own" : "message";

  const meta = document.createElement("p");
  meta.className = "message__meta";

  const authorEl = document.createElement("strong");
  authorEl.className = "message__author";
  authorEl.textContent = author;

  const timeEl = document.createElement("time");
  timeEl.dateTime = createdAt.toISOString();
  timeEl.textContent = formatTime(createdAt);

  meta.append(authorEl, timeEl);

  const body = document.createElement("p");
  body.className = "message__text";
  body.textContent = text; // textContent: user text is NEVER parsed as HTML

  article.append(meta, body);
  return article;
}

function addMessage(message) {
  els.messages.append(createMessageElement(message));
  scrollToBottom();
}

/* ============ 5. Sending a message ============ */
els.composer.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the browser's full-page reload

  const text = els.input.value.trim();
  if (!text) return;

  addMessage({
    author: currentUser.name,
    text,
    createdAt: new Date(),
    own: true,
  });

  els.input.value = "";
  els.input.focus();
});

/* ============ 6. Switching rooms (event delegation) ============ */
function setActiveRoom(link) {
  els.roomList.querySelectorAll(".room-link").forEach((el) => {
    el.classList.remove("room-link--active");
    el.removeAttribute("aria-current");
  });
  link.classList.add("room-link--active");
  link.setAttribute("aria-current", "page");

  els.roomTitle.textContent = link.textContent;
  els.messages.replaceChildren(); // empty the message area
}

els.roomList.addEventListener("click", (event) => {
  const link = event.target.closest(".room-link");
  if (!link) return;
  event.preventDefault();
  setActiveRoom(link);
});

/* ============ 7. Creating a room ============ */
function slugify(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

els.newRoomBtn.addEventListener("click", () => {
  const raw = window.prompt("Room name?");
  const slug = slugify(raw ?? "");
  if (!slug) return;

  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = "#";
  a.className = "room-link";
  a.textContent = `# ${slug}`;
  li.append(a);
  els.roomList.append(li);
  setActiveRoom(a);
});

/* ============ 8. Local times for the static sample messages ============ */
document.querySelectorAll("time[datetime]").forEach((el) => {
  el.textContent = formatTime(new Date(el.dateTime));
});

/* ============ 9. Talking to an HTTP API ============ */
// Demo only: a free public fake API. In Phase 3 we swap in Hive's own backend.
async function loadSampleHistory() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");

    if (!response.ok) {
      throw new Error(`Server answered ${response.status}`);
    }

    const posts = await response.json();
    posts.forEach((post) => {
      addMessage({
        author: `User ${post.userId}`,
        text: post.title,
        createdAt: new Date(),
      });
    });
  } catch (error) {
    console.error("Could not load history:", error);
  }
}

loadSampleHistory();