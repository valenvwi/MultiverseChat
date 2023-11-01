export interface AuthServiceProps {
  login: (username: string, password: string) => any;
  isLoggedIn: boolean;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<any>;
  userId: string | null;
}
