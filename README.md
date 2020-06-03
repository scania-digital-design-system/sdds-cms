# Scania Digital Design System CMS

A quick description of SDDS CMS

```shell
npm i
npm run build
npm start
```

Setup local postgres database:
- Add .env file with following config
```shell
DATABASE_HOST=Host e.g localhost
DATABASE_PORT=port number e.g 5432
DATABASE_NAME=database
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
```

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