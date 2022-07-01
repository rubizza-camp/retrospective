export const getBigFirstLetter = (string: string) =>
  string.toUpperCase().charAt(0);

export const getInitials = (name: string, surname: string | undefined) => {
  return (
    (name ? getBigFirstLetter(name) : "") +
    (surname ? getBigFirstLetter(surname) : "")
  );
};

export const getFullnameOrNickname = (
  name: string,
  surname: string,
  nickname: string
) => {
  return name && surname ? `${name} ${surname}` : nickname;
};


export const handleKeyPress = (
  evt: React.KeyboardEvent<HTMLTextAreaElement>,
  handleEnter: (event: React.FormEvent) => void,
  handleEscape: () => void
) => {
  if (navigator.platform.includes('Mac')) {
    if (evt.key === 'Enter' && evt.metaKey) {
      handleEnter(evt);
    }
  } else if (evt.key === 'Enter' && evt.ctrlKey) {
    handleEnter(evt);
  }

  if (evt.key === 'Escape' && handleEscape) {
    handleEscape();
  }
};
