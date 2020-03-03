# Strapi application

A quick description of your strapi application

Export navigation data:

```shell
query {
  navigation(id:1) {
    id
    title
    menus {
      ...allMenu
      submenus {
        ...allMenu
      }
    }
  }
}

fragment allMenu on Menu {
  id
  url
  title
}
```

Import content data:

```shell
mutation CreateNewContent($newData:createContentInput) {
  createContent(input: $newData) { 
  	content {title, text}
  }
}

{
  "newData":  {
    "data": {
      "title": "Dealer header usage",
      "text": "Dealer header description"
    }
  }
}
```