# Readme

## Script

### Database

Generate migration file from entities

```
npm run migration:generate --name=migration_file_name
```

Run migration

```
npm run migration:run
```

Create empty migration file

```
npm run migration:create --name=migration_file_name
```

This command will execute **down** in the latest executed migration. If you need to revert multiple migrations you must call this command multiple times.

```
npm run migration:revert
```
