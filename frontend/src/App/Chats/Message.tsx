import { Paper, styled } from "@mui/material";
import { useFetchCurrentUser } from "../../Utils/useFetchCurrentUser";

type MessageData = {
  content: string;
  sender: number;
};

const CurrentUserMessageContainer = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  alignSelf: "flex-end",

  marginLeft: "32px",
});

const OtherUserMessageContainer = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  alignSelf: "flex-start",
  marginRight: "32px",
  backgroundColor: "#e5faff",
});


const Message = ({ content, sender }: MessageData) => {
  const currentUser = useFetchCurrentUser();

  if (sender === currentUser?.id) {
    return <CurrentUserMessageContainer>{content}</CurrentUserMessageContainer>;
  }
  return (
    <OtherUserMessageContainer>{content}</OtherUserMessageContainer>
  );
};

export default Message;
