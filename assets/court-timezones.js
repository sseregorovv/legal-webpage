(function () {
  'use strict';
  const core = window.CourtTimeCore;
  const courts = window.COURT_TIMEZONES;
  const query = document.getElementById('court-search');
  const kind = document.getElementById('court-kind');
  const list = document.getElementById('court-results');
  const count = document.getElementById('court-count');
  const empty = document.getElementById('court-empty');
  const date = document.getElementById('hearing-date');
  const time = document.getElementById('hearing-time');
  const error = document.getElementById('court-error');
  const output = document.getElementById('court-output');
  const result = document.getElementById('selected-court');
  const kindNames = { subject: 'Суд субъекта', appeal: 'Апелляционный суд', district: 'Окружной суд' };
  const collator = new Intl.Collator('ru-RU', { numeric: true });
  courts.sort((a, b) => collator.compare(a.name, b.name));
  let selected = courts.find(court => court.name === 'АС г. Москвы') || courts[0];
  date.value = core.todayInMoscow();

  function text(id, value) { document.getElementById(id).textContent = value; }

  function renderTime() {
    text('selected-name', selected.name);
    text('selected-city', selected.city + ' · ' + kindNames[selected.kind]);
    text('selected-zone', core.moscowLabel(selected.moscowOffset) + ' · ' + core.utcLabel(selected.moscowOffset + 3));
    const note = document.getElementById('court-special-note');
    note.textContent = selected.note;
    note.hidden = !selected.note;
    try {
      const value = core.convert(selected, date.value, time.value);
      error.hidden = true;
      output.hidden = false;
      text('time-court', value.courtTime);
      text('time-moscow', value.moscowTime);
      text('date-court', value.courtDate);
      text('date-moscow', value.moscowDate);
      text('moscow-difference', value.moscowDifference);
      text('court-announcement', selected.name + ', ' + value.courtDate + '. В суде ' + value.courtTime +
        ', в Москве ' + value.moscowTime + '.');
    } catch (problem) {
      output.hidden = true;
      error.hidden = false;
      error.textContent = problem.message;
      text('court-announcement', problem.message);
    }
  }

  function renderList() {
    const matches = core.search(courts, query.value, kind.value);
    count.textContent = 'Найдено: ' + matches.length + ' из ' + courts.length;
    empty.hidden = matches.length > 0;
    list.replaceChildren();
    const fragment = document.createDocumentFragment();
    matches.forEach(court => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'court-option';
      button.dataset.courtId = court.id;
      button.setAttribute('aria-pressed', String(selected.id === court.id));
      const title = document.createElement('strong');
      title.textContent = court.name;
      const meta = document.createElement('span');
      meta.textContent = court.city + ' · ' + kindNames[court.kind];
      const zone = document.createElement('small');
      zone.textContent = core.moscowLabel(court.moscowOffset);
      button.append(title, meta, zone);
      item.append(button);
      fragment.append(item);
    });
    list.append(fragment);
  }

  query.addEventListener('input', renderList);
  kind.addEventListener('change', renderList);
  date.addEventListener('input', renderTime);
  time.addEventListener('input', renderTime);
  document.getElementById('clear-court-search').addEventListener('click', () => {
    query.value = '';
    kind.value = 'all';
    renderList();
    query.focus();
  });
  list.addEventListener('click', event => {
    const button = event.target.closest('[data-court-id]');
    if (!button) return;
    selected = courts.find(court => court.id === button.dataset.courtId);
    list.querySelectorAll('[aria-pressed]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderTime();
    if (window.matchMedia('(max-width: 800px)').matches) {
      result.focus({ preventScroll: true });
      result.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  });
  renderList();
  renderTime();
})();
