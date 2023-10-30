export default interface UserProfileProps {
  firstName: string,
  lastName: string,
  location: string,
  avatar: File | null,
  nativeLanguage: string,
  targetLanguage: string,
  bio: string
}
