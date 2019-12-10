# Strapi application

A quick description of your strapi application

Export navigation data:

```shell
query {
  navigation(id: 2) {
    name
    pages {
      ...PageFields
      pages {
        ...PageFields
      }
    }
  }
}

fragment PageFields on Page {
  id
  url
  content {
    title
  }
}
```