export const initialData = {
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