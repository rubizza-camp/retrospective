export type UserAvatar = {
  url: string;
  thumb: {
    url: string;
  };
  profile: {
    url: string;
  };
}

export type User = {
  id: number;
  email: string;
  avatar: UserAvatar;
  nickname: string;
  firstName: string;
  lastName: string;
  name: string;
};
