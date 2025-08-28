# Readme

## Debug

Press **F5** to debug in vscode

## Script

### Document

View project document in Website

```bash
npm run document
```

### Run in Docker

```bash
docker-compose up --build -d
```

### Database migration

Generate migration file from entities

```bash
npm run migration:generate --name=migration_file_name
```

Create empty migration file

```bash
npm run migration:create --name=migration_file_name
```

Run migration

```bash
npm run migration:run
```

This command will execute **down** in the latest executed migration. If you need to revert multiple migrations you must call this command multiple times.

```bash
npm run migration:revert
```
