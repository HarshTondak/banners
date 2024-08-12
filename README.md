# Bannerss

The task is to create a dynamic one-page website using React, which includes the following features:

Website Layout:

- Design a simple, clean one-page website that can optionally display a banner. The banner's visibility should be controllable.

- Frontend Countdown Display: Implement a countdown timer on the banner, displayed as a reverse clock, that shows the remaining time before the banner disappears.
  Internal Dashboard:

- Implement an internal dashboard that allows the following controls:

  - Banner On/Off: Toggle the visibility of the banner on the main website.

  - Banner Description: Update the content of the banner's text.

  - Banner Timer: Set a timer to control how long the banner is displayed. Please make sure in the frontend, there should be a reverse clock showing the countdown.

  - Banner Link: Add a clickable link to the banner, directing users to a specified URL

- Database Integration: Use MySQL to store the banner's content, including the description, timer settings, and link. The dashboard should retrieve and update this information in the database.

## Solution

- The assignment is done using `React.js`, `Node.js`, `Express.js`, and `MySQL`.
- I have implemented the required feature like Displaying Banners, adding a visibility toggle button, timer button (and countdown), form to add new Banners.
- I have implemented some extra features like :-
  - Banners slideshow, instead of keeping only the last banner, I added each banner and created a type of slideshow.
  - User can directly upload any image from their local storage and give any description for that image.
  - User can set the timer countdown for the slideshow.
  - User can use the visibility toggle button to make banner visible/invisible from the UI.

## Tech Stack Used:

```
For Frontend : React.js
For Backend  : Node.js, Express.js
For DataBase : MySQL
```

## Building the project

Clone the Repository:

```bash
git clone git@github.com:HarshTondak/banners.git
```

## Installation

Install my-project with npm

Frontend:

```bash
$ cd frontend   // go to client folder
$ npm i       // npm install packages
$ npm start // run it locally
$ npm run build // this will build the server code to es5 js codes and generate a dist file
```

Backend:

```bash
$ cd backend   // go to server folder
$ npm i       // npm install packages
$ npm start // run it locally
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`Frontend Variable`

```
REACT_APP_API_URL = Backend URL
```

`Backend Variable`

```
DB_HOST = MySQL Database Host
DB_USER = MySQL Database User
DB_PORT = MySQL Database Port
DB_PASSWORD = MySQL Database Password
DB_DATABASE = MySQL Database name
```

## Deployment

Frontend is deployed on Vercel.app
Backend is hosted on Railway.app

Hosted Link :
https://bannerss.vercel.app/

Github Link :
https://github.com/HarshTondak/banners/
