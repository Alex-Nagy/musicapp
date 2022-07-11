# musicApp

A fullstack web application using Spotify's Web API. You can search for an artist or song and listen to music with the lyrics displayed.

## System requirements
- node.js
- npm

### Environment variables
Create a ***.env*** file in **backend** folder, with the following variables:

    PORT={8080}
    CONNECTION_STRING={mongodb://localhost:27017/musicapp} (Database)
    REDIRECT_URI={http://localhost:3000/callback/spotify}
    CLIENT_ID={d4057ca6c39b408496e9a83ecabe4b4a}
    CLIENT_SECRET={0b57a0786e4f4cf0b7d09cdbbee3f6e6}

##### Start backend
###### Dev start
    cd backend
    npm install
    npm run dev
##### Start frontend
###### *In new terminal*
    cd frontend
    npm install
    npm start
