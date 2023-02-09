import { useState } from "react";
import { Comment } from "./comment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Comments = ({ comments, onCreateComment, onUpdateComment, onDeleteComment }) => {
    const [newCommentText, setNewCommentText] = useState("");
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [selectedCommentText, setSelectedCommentText] = useState("");
  
    const handleCreateComment = () => {
      onCreateComment(newCommentText);
      setNewCommentText("");
    };
  
    const handleUpdateComment = () => {
      onUpdateComment(selectedCommentId, selectedCommentText);
      setSelectedCommentId(null);
      setSelectedCommentText("");
    };
  
    const handleDeleteComment = (commentId) => {
      onDeleteComment(commentId);
    };
  
    const renderComment = (comment) => {
      return (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={() => setNewCommentText(`Reply to ${comment.text}`)}
          onEdit={() => {
            setSelectedCommentId(comment.id);
            setSelectedCommentText(comment.text);
          }}
          onDelete={() => handleDeleteComment(comment.id)}
        />
      );
    };
  
    const renderReplies = (commentId) => {
      return (
        <div style={{ marginLeft: 16 }}>
          {comments
            .filter((comment) => comment.parentId === commentId)
            .map((reply) => renderComment(reply))}
        </div>
      );
    };
  
    return (
      <div>
        <TextField
          value={newCommentText}
          onChange={(event) => setNewCommentText(event.target.value)}
        />
        <Button onClick={handleCreateComment}>Create Comment</Button>
        {selectedCommentId && (
          <TextField
            value={selectedCommentText}
            onChange={(event) => setSelectedCommentText(event.target.value)}
          />
        )}
        {selectedCommentId && (
          <Button onClick={handleUpdateComment}>Update Comment</Button>
        )}
        {comments
          .filter((comment) => !comment.parentId)
          .map((comment) => (
            <div key={comment.id}>
              {renderComment(comment)}
              {renderReplies(comment.id)}
            </div>
          ))}
      </div>
    );
  };