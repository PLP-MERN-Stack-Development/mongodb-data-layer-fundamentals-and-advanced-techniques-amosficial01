# PLP Bookstore MongoDB Fundamentals

This repository contains the setup and queries for the MongoDB Week 1 assignment.

## Prerequisites

1.  MongoDB Community Edition Server is installed and running.
2.  The MongoDB Shell (`mongosh`) is installed and accessible.

## Setup and Data Population

1.  **Connect to MongoDB:**
    Open your terminal/command prompt and run `mongosh`. This connects to the default local MongoDB server.

2.  **Select the Database:**
    In the `mongosh` session, run:
    ```javascript
    use plp_bookstore
    ```

3.  **Insert Data:**
    Load the `insert_books.js` script to populate the `books` collection:
    ```javascript
    load('insert_books.js')
    ```

## Running the Queries

All required MongoDB queries are contained in the `queries.js` file. You can run all of them in a single session by loading the file:

```javascript
load('queries.js')