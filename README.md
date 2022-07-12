# musicApp

A fullstack web application using Spotify's Web API. You can search for an artist or song and listen to music with the lyrics displayed.

## System requirements
<div>
<img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/npm/npm-original-wordmark.svg" title="npm" alt="npm" width="40" height="40"/>&nbsp;
</div>

### :hammer_and_wrench: Languages and Tools :

<div>
<img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original.svg" title="ExpressJS" alt="ExpressJS" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original-wordmark.svg" title="MongoDB" alt="MongoDB" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/materialui/materialui-original.svg" title="Material UI" alt="Material UI" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/bootstrap/bootstrap-original.svg" title="Bootstrap" alt="Bootstrap" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original.svg" title="Git" **alt="Git" width="40" height="40"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/jest/jest-plain.svg" title="Jest" **alt="Jest" width="40" height="40"/>
</div>

### Environment variables

Create a **_.env_** file in **backend** folder, with the following variables:

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

###### _In new terminal_

    cd frontend
    npm install
    npm start
