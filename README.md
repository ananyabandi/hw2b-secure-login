# Login Form

A small HTML, JavaScript, and Express login demonstration.

## Features

- Email and password fields
- Client-side and server-side validation
- Empty submissions rejected
- Email must contain @
- Password must contain 8–128 characters
- Salted bcrypt password hashing
- Vulnerable and fixed output modes for comparing XSS behavior

The application verifies a fake account. It does not create sessions
or provide a complete production authentication system.

## Requirements

Node.js and npm.

## Run

Open a terminal in the project folder:

```sh
npm install
npm start
```

Visit http://127.0.0.1:3000.

## Demo account

Email: student@example.com

Password: DemoPass123!

## Fixed mode

Stop the server with Ctrl+C, then run:

```sh
npm run safe
```

Reload the page.

Fixed mode uses a generic login failure message and renders server
messages with textContent instead of innerHTML.

## Security experiment

The default mode deliberately contains an XSS vulnerability.
A failed login reflects the supplied email into a message, which
the browser renders using innerHTML.

Use fake data and run this demonstration locally.
