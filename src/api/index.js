module.exports = app => {
  const books = [
    {
      id: "1",
      title: "Harry Potter and the Sorcerer's stone",
      authorId: "5"
    },
    {
      id: "2",
      title: "Jurassic Park",
      authorId: "5"
    }
  ];

  const authors = [
    {
      id: "5",
      name: "Foo"
    }
  ];

  app.get("/books/:id", (req, res) => {
    const book = books.find(({ id }) => id === req.params.id);

    res.send(JSON.stringify(book));
  });

  app.get("/authors/:id", (req, res) => {
    const author = authors.find(({ id }) => id === req.params.id);

    res.send(JSON.stringify(author));
  });

  app.get("/authors/:id/books", (req, res) => {
    res.send(JSON.stringify(books));
  });
};
