# Doss take-home technical challenge

Getting Started:

1. Make sure you have NodeJS, npm, and yarn installed on your local machine.
2. Run `yarn install` from `src/web` and `web/api`.
3. Run `yarn start` from the root directory and the frontend should open at `localhost:3000`.
4. Open `localhost:3000/readme`.

# Details

This project contains a frontend and backend, with data stored in a JSON file.

- `src/web` contains all frontend files, with UI classes under the `components` direction and CSS in `style`. The class `api.ts` should contain
  client-side functions for interacting with the backend API.
- `src/api` contains all backend classes. API endpoints are defined in `app.ts`, functions for managing invoice and project data are in `util.ts`,
  and generic utility functions for interacting with the JSON data file are in `db/db.ts`.

# Useful Commands

To run prettier, run `yarn prettier`.
To run eslint, run `yarn eslint`.
To run tests, run `yarn test --watchAll=false`.

# Project Completed

Test as indicated above. To test adding a record via API endpoint, try the following url: http://localhost:3000/fb374bf1-c76b-44b3-945b-ee03d35d7a3c/add?order=1234&build=5678&cost=9012&description=23456
