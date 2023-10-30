export interface AuthServiceProps {
  login: (username: string, password: string) => any;
  isLoggedIn: boolean;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<any>; // return the error status
}
