import { Paper, styled } from "@mui/material";

type MessageData = {
  content: string;
  sender: number;
  currentUserId: number;
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

const Message = ({ content, sender, currentUserId }: MessageData) => {
  if (sender === currentUserId) {
    return <CurrentUserMessageContainer>{content}</CurrentUserMessageContainer>;
  }
  return <OtherUserMessageContainer>{content}</OtherUserMessageContainer>;
};

export default Message;
