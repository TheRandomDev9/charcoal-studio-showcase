const grid = document.querySelector("#film-grid");
const template = document.querySelector("#film-template");

fetch("data/showcases.json")
  .then((response) => {
    if (!response.ok) throw new Error(`Gallery data returned ${response.status}`);
    return response.json();
  })
  .then(({ films }) => {
    films.forEach((film, index) => {
      const card = template.content.cloneNode(true);
      const video = card.querySelector("video");
      video.src = film.video;
      video.poster = film.poster;
      video.setAttribute("aria-label", `Play ${film.title}`);
      card.querySelector(".film-number").textContent = String(index + 1).padStart(2, "0");
      card.querySelector(".duration").textContent = film.duration;
      card.querySelector("h3").textContent = film.title;
      card.querySelector(".promise").textContent = film.promise;
      card.querySelector(".download").href = film.video;
      grid.appendChild(card);
    });
  })
  .catch((error) => {
    grid.innerHTML = `<p class="load-error">The screenings could not load. ${error.message}</p>`;
  });

document.addEventListener("play", (event) => {
  if (event.target.tagName !== "VIDEO") return;
  document.querySelectorAll("video").forEach((video) => {
    if (video !== event.target) video.pause();
  });
}, true);
