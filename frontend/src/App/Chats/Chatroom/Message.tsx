import { Paper, Typography, styled } from "@mui/material";

type MessageData = {
  content: string;
  sender: number;
  currentUserId: number;
  timestamp: string;
};

const CurrentUserMessageContainer = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  padding: "10px 16px",
  alignSelf: "flex-end",
  margin: "5px 20px",
});

const OtherUserMessageContainer = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  padding: "10px 16px",
  alignSelf: "flex-start",
  margin: "5px 20px",
  backgroundColor: "#e5faff",
});

const Message = ({
  content,
  sender,
  currentUserId,
  timestamp,
}: MessageData) => {
  const date = new Date(timestamp);
  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();
  if (minutes < 10) {
    minutes = 0 + minutes.toString();
  }
  if (hours < 10) {
    hours = 0 + hours.toString();
  }

  const formattedtime = `${hours}:${minutes}`;

  if (sender === currentUserId) {
    return (
      <CurrentUserMessageContainer>
        <Typography>{content}</Typography>
        <Typography
          sx={{ textAlign: "right", fontSize: "12px", color: "#8c8c8c" }}
        >
          {formattedtime}
        </Typography>
      </CurrentUserMessageContainer>
    );
  }
  return (
    <OtherUserMessageContainer>
      <Typography>{content}</Typography>
      <Typography
        sx={{ textAlign: "right", fontSize: "12px", color: "#8c8c8c" }}
      >
        {formattedtime}
      </Typography>
    </OtherUserMessageContainer>
  );
};

export default Message;
