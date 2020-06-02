# Strapi application

A quick description of your strapi application


setup local env database in config/environments/development/database.json:

{
  "defaultConnection": "default",
  "connections": {
    "default": {
      "connector": "bookshelf",
      "settings": {
        "client": "postgres",
        "host": "localhost",
        "port": "5432",
        "database": "database name",
        "username": "username",
        "password": "Your password",
        "ssl": false
      },
      "options": {
        "useNullAsDefault": true
      }
    }
  }
}



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