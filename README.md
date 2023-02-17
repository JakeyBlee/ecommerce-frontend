# E-Commerce Frontend React App

## Description

This is an independent coding project suggested by the Codecademy platform. It is built around the React.js framework to present a frontend view to a simple e-commerce single page application. It allows users to interect with the accompanying API in a clear and concise manner.

This project serves as the front-end component of my Full Stack Career Path capstone project.

## Features

This project displays products in a sample shop, and provides an interface for users to browse, view and purchase said items. There are separate views for logging in and signing up, viewing products, viewing orders, viewing the current basket and completing a purchase. The project is linked via proxy to a previosly coded Node.js RESTful API backend.

The project features simple responsive design through media queries to resize dependant on the device used to view the project. Routing is handled through React Router v6 to mimic the natural navigation of a standard webpage.

## How to Use

This App will be hosted on a Netlify, harnessing a CICD pipeline through GitHub. In order to access the project users will access the Netlify domain. From the homepage users can browse products stored in the database, view their details and add them to a basket without needing to sign in. At the point of progressing the order to payment, sign in will be required. Accounts are created and managed through the app, allowing for the changing of passwords and viewing of previous orders. The current basket contents is stored on the database, and presists through logins. Upon sign in, the stored basket and newly created 'offline' basket are merged.

## Technololgies

This project is written using JavaScript and the React.js library. HTML elements are coded through JSX and styled using CSS stylesheets. State is managed through React Redux and navigation through React Router, which also allows for the layering of views throughout the SPA. View animation and transitions are managed through the use of the Framer Motion animation library.

The project is hosted on the Netlify platform and uses asyncronous javascript and the Fetch API to make HTTP requests to an AWS EC2 server.

## Collaboraters

I am the sole author of this project following its initiation through bootstrapping.

## Licence

The contents of this repository are owned solely by their author.