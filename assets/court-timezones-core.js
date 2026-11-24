(function (root) {
  'use strict';

  function normalize(value) {
    return String(value).toLocaleLowerCase('ru-RU').replace(/ё/g, 'е')
      .replace(/[^a-zа-я0-9]+/g, ' ').trim();
  }

  function search(courts, query, kind) {
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    return courts.filter(court => {
      if (kind && kind !== 'all' && court.kind !== kind) return false;
      const words = normalize([court.name, court.city, ...(court.aliases || [])].join(' ')).split(' ');
      return tokens.every(token => words.some(word => /^\d+$/.test(token) ? word === token : word.startsWith(token)));
    });
  }

  function utcLabel(hours) {
    return 'UTC' + (hours >= 0 ? '+' : '−') + Math.abs(hours);
  }

  function moscowLabel(hours) {
    return hours === 0 ? 'МСК' : 'МСК' + (hours > 0 ? '+' : '−') + Math.abs(hours);
  }

  function zonedParts(instant, zone) {
    const values = {};
    new Intl.DateTimeFormat('en-GB', {
      timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(instant).forEach(part => { if (part.type !== 'literal') values[part.type] = part.value; });
    return values;
  }

  function formatTime(instant, zone) {
    return new Intl.DateTimeFormat('ru-RU', {
      timeZone: zone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).format(instant);
  }

  function formatDate(instant, zone) {
    return new Intl.DateTimeFormat('ru-RU', {
      timeZone: zone, day: 'numeric', month: 'long', year: 'numeric'
    }).format(instant);
  }

  function differenceLabel(hours, place) {
    if (!hours) return 'Совпадает со временем ' + place;
    const number = Math.abs(hours);
    const endings = { one: 'час', few: 'часа', many: 'часов', other: 'часа' };
    return 'На ' + number + ' ' + endings[new Intl.PluralRules('ru-RU').select(number)] +
      (hours > 0 ? ' позже ' : ' раньше ') + place;
  }

  function convert(court, dateValue, timeValue) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue) || !/^\d{2}:\d{2}$/.test(timeValue)) {
      throw new Error('Укажите дату и время заседания.');
    }
    const [year, month, day] = dateValue.split('-').map(Number);
    const [hour, minute] = timeValue.split(':').map(Number);
    const wallClock = new Date(Date.UTC(year, month - 1, day, hour, minute));
    if (year < 2026 || year > 9999 || month < 1 || month > 12 || day < 1 || hour > 23 || minute > 59 ||
      wallClock.getUTCFullYear() !== year || wallClock.getUTCMonth() !== month - 1 || wallClock.getUTCDate() !== day) {
      throw new Error('Выберите корректную дату начиная с 2026 года и время от 00:00 до 23:59.');
    }
    const courtUtc = court.moscowOffset + 3;
    const instant = new Date(wallClock.getTime() - courtUtc * 3600000);
    const result = {
      instant: instant.toISOString(), courtUtc,
      moscowTime: formatTime(instant, 'Europe/Moscow'),
      moscowDate: formatDate(instant, 'Europe/Moscow'),
      courtDate: new Intl.DateTimeFormat('ru-RU', {timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric'}).format(wallClock),
      courtTime: timeValue,
      moscowDifference: differenceLabel(court.moscowOffset, 'Москвы')
    };
    return result;
  }

  function todayInMoscow() {
    const p = zonedParts(new Date(), 'Europe/Moscow');
    return p.year + '-' + p.month + '-' + p.day;
  }

  const api = Object.freeze({ normalize, search, utcLabel, moscowLabel, convert, todayInMoscow });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CourtTimeCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
