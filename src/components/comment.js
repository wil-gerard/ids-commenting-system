import Button from "@mui/material/Button";

export const Comment = ({ comment, onReply, onEdit, onDelete }) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>{comment.text}</div>
        <Button onClick={onReply}>Reply</Button>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </div>
    );
  };