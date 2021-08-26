export const getBigFirstLetter = (string) => string.toUpperCase().charAt(0);

export const getUserInitials = (name, surname) => {
  return (
    (name ? getBigFirstLetter(name) : '') +
    (surname ? getBigFirstLetter(surname) : '')
  );
};

export const handleKeyPress = (evt, handleEnter, handleEscape) => {
  if (navigator.platform.includes('Mac')) {
    if (evt.key === 'Enter' && evt.metaKey) {
      handleEnter(evt);
    }
  } else if (evt.key === 'Enter' && evt.ctrlKey) {
    handleEnter(evt);
  }

  if (evt.key === 'Escape' && handleEscape) {
    handleEscape(evt);
  }
};

export const getFullnameOrNickname = (name, surname, nickname) => {
  return name ? `${name} ${surname}` : nickname;
};
