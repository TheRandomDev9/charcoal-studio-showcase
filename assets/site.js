const grid = document.querySelector('#film-grid');
const template = document.querySelector('#film-template');
const picker = document.querySelector('#collection-picker');

function render(collection) {
  document.querySelectorAll('video').forEach(video => video.pause());
  grid.replaceChildren();
  document.querySelector('#collection-title').textContent = collection.title || collection.collection;
  document.querySelector('#collection-meta').textContent = `${collection.films.length} films · ${collection.description || 'Review collection'}`;
  collection.films.forEach((film, index) => {
    const card = template.content.cloneNode(true);
    card.querySelector('article').id = film.slug;
    const video = card.querySelector('video');
    video.src = film.video;
    video.poster = film.poster;
    video.setAttribute('aria-label', `Play ${film.title}`);
    card.querySelector('.film-number').textContent = String(index + 1).padStart(2, '0');
    card.querySelector('.duration').textContent = film.duration;
    card.querySelector('h3').textContent = film.title;
    card.querySelector('.promise').textContent = film.promise;
    card.querySelector('.download').href = film.video;
    const transcript = card.querySelector('.transcript');
    if (film.transcript) { transcript.href = film.transcript; transcript.hidden = false; }
    grid.appendChild(card);
  });
}

fetch('data/showcases.json', {cache:'no-store'}).then(response => {
  if (!response.ok) throw new Error(`Gallery data returned ${response.status}`);
  return response.json();
}).then(data => {
  const collections = data.collections || [{id:'teaching-first-v2', ...data}];
  collections.forEach(collection => {
    const option = document.createElement('option');
    option.value = collection.id;
    option.textContent = collection.title || collection.collection;
    picker.appendChild(option);
  });
  const desired = new URL(location.href).searchParams.get('collection');
  picker.value = collections.some(c => c.id === desired) ? desired : collections[0].id;
  const select = () => {
    render(collections.find(c => c.id === picker.value));
    const url = new URL(location.href);
    url.searchParams.set('collection', picker.value);
    history.replaceState(null, '', url);
  };
  picker.addEventListener('change', select);
  select();
  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
}).catch(error => {
  grid.textContent = `The screenings could not load. ${error.message}`;
});

document.addEventListener('play', event => {
  if (event.target.tagName !== 'VIDEO') return;
  document.querySelectorAll('video').forEach(video => {
    if (video !== event.target) video.pause();
  });
}, true);
