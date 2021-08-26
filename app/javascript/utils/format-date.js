import {enGB} from 'date-fns/locale';

const formatRelativeLocale = {
  lastWeek: "'Last' eeee, 'at' HH:mm",
  yesterday: "'Yesterday', 'at' HH:mm",
  today: "'Today', 'at' HH:mm",
  tomorrow: "'Tomorrow', 'at' HH:mm",
  nextWeek: "'Next', 'at' eeee",
  other: "dd.MM.yyyy, 'at' HH:mm"
};

export const locale = {
  ...enGB,
  formatRelative: (token) => formatRelativeLocale[token]
};
