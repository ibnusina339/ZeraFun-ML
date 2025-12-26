function save() {
  const data = {
    final1: final1.textContent,
    final2: final2.textContent,
    third1: third1.textContent,
    third2: third2.textContent,
    champion: champion.textContent,
    thirdWinner: thirdWinner.textContent
  };
  localStorage.setItem("bracketState", JSON.stringify(data));
}

function load() {
  const data = JSON.parse(localStorage.getItem("bracketState"));
  if (!data) return;

  Object.keys(data).forEach(id => {
    const el = document.getElementById(id);
    if (el && data[id] !== "?") el.textContent = data[id];
  });
}

document.addEventListener("click", e => {
  const el = e.target;
  if (!el.classList.contains("clickable")) return;

  const match = el.closest(".match");
  const items = match.querySelectorAll(".team, .slot");

  items.forEach(i => {
    i.classList.remove("win", "lose");
    if (i !== el) i.classList.add("lose");
  });

  el.classList.add("win");

  // ROUND 1 → FINAL
  if (el.classList.contains("team")) {
    const next = document.getElementById(el.dataset.next);
    next.textContent = el.textContent;

    const loser = [...items].find(i => i !== el);
    if (match.dataset.match === "m1") third1.textContent = loser.textContent;
    if (match.dataset.match === "m2") third2.textContent = loser.textContent;
  }

  // FINAL → CHAMPION
  if (match.dataset.match === "final") {
    champion.textContent = el.textContent;
  }

  // 3RD PLACE
  if (match.dataset.match === "third") {
    thirdWinner.textContent = el.textContent;
  }

  save();
});

load();
