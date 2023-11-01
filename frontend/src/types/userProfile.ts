export interface UserProfileProps {
  firstName: string;
  lastName: string;
  location: string;
  avatar: File | null;
  nativeLanguage: string;
  targetLanguage: string;
  bio: string;
  id?: number;
  active?: boolean;
}

export interface UserProfileData {
  first_name: string;
  last_name: string;
  location: string;
  avatar: File | null;
  native_language: string;
  target_language: string;
  bio: string;
  id?: number;
  active?: boolean;
}
