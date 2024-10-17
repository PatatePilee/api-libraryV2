const users = {
  admin: {
    username: "admin",
    scopes: [
      "read",
      "write",
      "delete:author",
      "delete:book",
      "delete:bookCollection",
    ],
  },
  gerant: {
    username: "gerant",
    scopes: [
      "read:author",
      "read:book",
      "read:bookCollection",
      "write:author",
      "write:book",
      "write:bookCollection",
      "delete:bookCollection",
    ],
  },
  utilisateur: {
    username: "utilisateur",
    scopes: ["read:author", "read:book", "read:bookCollection", "write:book"],
  },
};
