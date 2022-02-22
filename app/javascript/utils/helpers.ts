export const getBigFirstLetter = (string: string) => string.toUpperCase().charAt(0);

export const getInitials = (name: string, surname: string | undefined) => {
  return (
    (name ? getBigFirstLetter(name) : '') +
    (surname ? getBigFirstLetter(surname) : '')
  );
};

export const getFullnameOrNickname = (name: string, surname: string, nickname: string) => {
  return name && surname ? `${name} ${surname}` : nickname;
};
