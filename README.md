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

### How to backup and restore data from postgres

When you make changes to the database (add contents in strapi, or modify data), it's important to provide the updated database to the reviewer.

1. Backup your local database

```shell
pg_dump -U postgres_username updated_database_name > backup_file.sql
```

2. Create a dump from sql file

```shell
pg_dump -Fc --no-acl --no-owner -h localhost -U postgres -f backup_file.sql > backup_file.dump
```

3. Restore data with a new data

```shell
pg_restore --verbose --clean --no-acl --no-owner -h localhost -U postgres -d local_database_name backup_file.dump
```

Restore will work if you have the exact same structure between the database that you copy and your own database.
If the commands above does not work, try to create a new empty database, and run following command :

```shell
psql -U postgres empty_database < backup_file.sql
```

If you use pgAdmin interface, you can use restore tool. Right click on the database, and choose restore.
