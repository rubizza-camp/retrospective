
export type User = {
  id: number;
  email: string;
  avatar: {
    url: string;
    thumb: {
      url: string;
    };
    profile: {
      url: string;
    };
  };
  nickname: string;
  firstName: string;
  lastName: string;
  name: string;
};
