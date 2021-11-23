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

Try the application live at [https://student-grade-table.lfz.com](https://student-grade-table.lfz.com)

## Features

- Teachers can view a list of recorded grades.
- Teachers can view the average grade.
- Teachers can add a grade to the table.
- Teachers can delete a grade from the table.

## Preview

![SGT React](assets/sgt-react.gif)

## Development

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher

### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/barbara-liao/wanderlist
    cd sgt-react
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```
    
1. Start postgreSQL.

    ```shell
    sudo service postgresql start
    ```

1. Import the example database to postgreSQL.

    ```shell
    npm run db:import
    ```

1. Start the database.

    ```shell
    pgweb --db=wanderlist
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
