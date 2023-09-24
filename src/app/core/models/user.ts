export interface User {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  attributes: {
    [key: string]: string | string[]; // Allow for any custom attribute
  };

}
