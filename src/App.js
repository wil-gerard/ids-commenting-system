import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";

const initialData = {
  comments: [
    {
      id: 123,
      creatorId: 1,
      text: "This is a comment that is not a reply",
      createdAt: "2022-12-06T22:10:04.984Z",
      modifiedAt: "2022-12-06T22:10:04.984Z",
      parentId: null,
    },
    {
      id: 124,
      creatorId: 2,
      text: "This is a reply comment",
      createdAt: "2022-12-06T22:15:04.984Z",
      modifiedAt: "2022-12-06T22:15:04.984Z",
      parentId: 123,
    },
    {
      id: 125,
      creatorId: 1,
      text: "This is a 2nd reply comment, with edits",
      createdAt: "2022-12-06T22:23:04.984Z",
      modifiedAt: "2022-12-06T22:28:04.984Z",
      parentId: 123,
    },
    {
      id: 126,
      creatorId: 1,
      text: "This is a comment that a reply to a reply comment",
      createdAt: "2022-12-06T22:10:04.984Z",
      modifiedAt: "2022-12-06T22:10:04.984Z",
      parentId: 124,
    },
    {
      id: 127,
      creatorId: 2,
      text: "This is another comment that is not a reply, with edits",
      createdAt: "2022-12-11T22:10:04.984Z",
      modifiedAt: "2022-12-12T22:10:04.984Z",
      parentId: null,
    },
  ],
};

const Comments = ({ comments, onCreateComment, onUpdateComment, onDeleteComment }) => {
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

const Comment = ({ comment, onReply, onEdit, onDelete }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div>{comment.text}</div>
      <Button onClick={onReply}>Reply</Button>
      <Button onClick={onEdit}>Edit</Button>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  );
};

export default function App() {
  const [comments, setComments] = useState(initialData.comments);

  const onCreateComment = (text) => {
    setComments([
      ...comments,
      {
        id: uuidv4(),
        creatorId: 1,
        text,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        parentId: null,
      },
    ]);
  };

  const onUpdateComment = (id, text) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? {
            ...comment,
            text,
            modifiedAt: new Date().toISOString(),
          }
          : comment
      )
    );
  };

  const onDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div style={{ padding: 16 }}>
      <Comments
        comments={comments}
        onCreateComment={onCreateComment}
        onUpdateComment={onUpdateComment}
        onDeleteComment={onDeleteComment}
      />
    </div>
  );
}