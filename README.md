# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. To run migrations `npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/data-source.ts ` 
4. Run `npm start` command
