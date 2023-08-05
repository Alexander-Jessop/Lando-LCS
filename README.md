<h1 align="center">Lando: LCS Tech Evaluation</h1>

## Description

This repository contains a simple React application that demonstrates CRUD (Create, Read, Update, Delete) operations on a table. The app utilizes the CoreUI framework for front-end styling, Firebase for the back-end database, and the react-hook-form library for form management.

## Installation & Usage

**Visit the deployed application at: https://lando-lcs.web.app/**

Clone repository to your local machine.

```sh
git clone https://github.com/Alexander-Jessop/Lando-LCS.git
```

Run the following command to install the dependencies at the root of the project:

```sh
npm install
```

To start the application: <br>

```sh
npm run dev
```

## Requirements

Task:

- Deploy a simple react app, that consists of one page, with a table, that you can add entries to, edit entries, and delete entries from.

Set up:

- Front-end: CoreUI Framework

- Back-end: Firebase
- Create a free Firebase account using your Google account

- Forms Library: react-hook-form

Develop the following features/user stories:

- As a client, I want a table, that I can use to add, edit, and delete Users from

The fields I would like to enter for each User are the following:

- Name
- Date of birth
- Country
- City
- The only Countries allowed are Canada or USA
- Users from Canada can only be from the City of Ottawa, or Toronto
- Users from USA can only be from the City of Las Vegas, or Chicago

Technical requirements:

- Store the data in the back-end under a Users collection

Typing:

- Name: String
- Date of birth: Date
- Country: { value: String, label: String}
- City: { value: String, label: String}
- Use React-select for Country and City
- The drop down list for City should be conditional based on Country
