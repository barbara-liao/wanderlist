# WanderList

A web application for vacationers who want to plan their itinerary.

I built this project because I am a planner and love to travel. I always loosely plan out my trips and like to have options for places to go. I wanted to see my itineraries laid out day by day and to be able to view all the locations on a map, that way I can plan each day based on locations and what would make more sense. I hope this app can assist others in planning for their trips, as it did mine.

## Technologies Used

- React.js
- Webpack
- Node.js
- Express.js
- PostgreSQL
- JavaScript
- HTML5
- CSS3
- Babel
- Heroku

## Live Demo

Try the application live [here](https://wanderlist-project.herokuapp.com/).

## Features

- User can set the length of trip.
- User can view trips.
- User can view itinerary.
- User can add itineraries.
- User can view itinerary details.
- User can edit itineraries.
- User can add notes to itineraries.
- User can view itineraries on a map.

## Stretch Features

- User can get directions to place.
- User can view weather.

## Preview

![wanderlist demo](https://user-images.githubusercontent.com/87685216/143378533-37e2b47b-43b6-42f1-bca2-afa01eaf7b3e.gif)


## Development

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- Postgres

### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/barbara-liao/wanderlist
    cd wanderlist
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Make a copy of the `.env.example` file.

    ```shell
    cp .env.example .env
    ```    

1. Start postgreSQL.

    ```shell
    sudo service postgresql start
    ```
    
1. Create a new database.

    ```shell
    createdb wanderlist
    ```

1. Import the example database to postgreSQL.

    ```shell
    npm run db:import
    ```

1. Start the database (optional - if pgweb is installed).

    ```shell
    pgweb --db=wanderlist
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
