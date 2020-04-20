# Riposte

Riposte is an open-source-first game developed as my thesis project for my advancement certificate in Interactive Media Studies at Fanshawe College. The game focuses on being a card game built on a purely javascript stack with node.

## Building

A couple areas of the app have config files, make sure any example.config.json files are renamed and populated with appropriate data relative to the scope (ie: a mongo db)

Game:
`npm install` then `npm run start`

Server:
`npm run server-setup`, create a config from the example named 'config.json', then `npm run server`

## Packaging

`npm run package` will create a number of packages for the application.

## Running

As above, `npm run start` will run the app and `npm run server` will initiate a server that the frontend and db connect to.
