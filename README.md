#GraphQL stitching example

GraphQL example using stitching to combine multiple schemas and fetch data from
different API's.

```
$ npm install
$ npm start

...

# Visit localhost:3000/graphiql
# Query example
{
  authorById(id: 5) {
    name,
    books {
      title
    }
  }
}
```
