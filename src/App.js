import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { initialData } from "./data/initialData";
import { Comments } from "./components/comments";

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