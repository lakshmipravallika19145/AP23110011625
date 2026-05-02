# Campus Notifications Microservice

## Project Overview

This project is a backend microservice for a campus notification system. It provides APIs to:

* Optimize vehicle maintenance scheduling
* Display priority-based notifications for users

The system is built using **Node.js, Express, and Axios**, with a focus on **efficient algorithms, API integration, and logging middleware**.

---

## Tech Stack

* Node.js
* Express.js
* Axios
* JavaScript (ES6)
* REST APIs

---

## Project Structure

```
AP23110011625/
│
├── logging_middleware/
│   ├── logger.js
│   └── middleware.js
│
├── notification_app_be/
│   ├── server.js
│   ├── vehicle_scheduler.js
│   ├── priority_inbox.js
│   ├── package.json
│
├── notification_system_design.md
├── .gitignore
```

---

## Features

### 1️ Logging Middleware

* Logs every request and important operations
* Helps in debugging and monitoring system behavior

---

### 2️ Vehicle Maintenance Scheduler

* Uses **0/1 Knapsack Algorithm**
* Maximizes total impact within limited mechanic hours

#### API:

```
GET /optimize-vehicles
```

#### Description:

* Fetches vehicle tasks and depot data
* Selects optimal tasks based on:

  * Duration (constraint)
  * Impact (value)

---

### 3️ Priority Inbox (Stage 6)

* Displays top 10 most important notifications

#### Priority Rules:

* Placement > Result > Event
* If same priority → latest timestamp first

#### API:

```
GET /priority-inbox
```

#### Output:

* Total notifications
* Top 10 sorted notifications

---

##  Authentication

* Uses Bearer Token from external API
* Token must be passed in headers:

```
Authorization: Bearer <access_token>
```

---

## How to Run

### Step 1: Install dependencies

```
cd notification_app_be
npm install
```

### Step 2: Start server

```
node server.js
```

### Step 3: Test APIs

Open in browser or Postman:

```
http://localhost:3000/optimize-vehicles
http://localhost:3000/priority-inbox
```

---

## Algorithm Used

### 0/1 Knapsack

* Time Complexity: O(n × capacity)
* Used to maximize impact under constraints

---

## Design Document

Detailed system design is available in:

```
notification_system_design.md
```

Includes:

* API design (Stage 1)
* Database schema (Stage 2)
* Query optimization (Stage 3)
* Performance improvements (Stage 4)
* Scalable system design (Stage 5)
* Priority logic (Stage 6)

---

##  Key Highlights

* Efficient algorithm implementation
* Clean REST API design
* Proper logging integration
* Real-time API data handling
* Scalable and modular structure

---

## Author

Lakshmi Pravallika
Roll No: AP23110011625

---

## Status

✔ Completed and submission-ready
API call Results:
{
    "email": "lakshmipravallika_kattamuri@srmap.edu.in",
    "name": "lakshmi pravallika",
    "rollNo": "ap23110011625",
    "accessCode": "QkbpxH",
    "clientID": "b7970054-cf3e-446c-9aa3-b3d64cb78933",
    "clientSecret": "mqvXdHpdxaTTyecV"
}

{
    "token_type": "Bearer",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsYWtzaG1pcHJhdmFsbGlrYV9rYXR0YW11cmlAc3JtYXAuZWR1LmluIiwiZXhwIjoxNzc3Njk5NjY5LCJpYXQiOjE3Nzc2OTg3NjksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJkZGZiNjI2OC1kMGU1LTQyZTQtYjY1MS01NzdiNTVlMDA3ZDciLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJsYWtzaG1pIHByYXZhbGxpa2EiLCJzdWIiOiJiNzk3MDA1NC1jZjNlLTQ0NmMtOWFhMy1iM2Q2NGNiNzg5MzMifSwiZW1haWwiOiJsYWtzaG1pcHJhdmFsbGlrYV9rYXR0YW11cmlAc3JtYXAuZWR1LmluIiwibmFtZSI6Imxha3NobWkgcHJhdmFsbGlrYSIsInJvbGxObyI6ImFwMjMxMTAwMTE2MjUiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiJiNzk3MDA1NC1jZjNlLTQ0NmMtOWFhMy1iM2Q2NGNiNzg5MzMiLCJjbGllbnRTZWNyZXQiOiJtcXZYZEhwZHhhVFR5ZWNWIn0.FG44yx5HPNxhtD10-fgLVPPHYpv4C0Xqg3-X7oRSbkQ",
    "expires_in": 1777699669
}

PS C:\Users\klaks\AP23110011625\notification_app_be> node server.js
Server running on port 3000
Log created: {
  logID: 'b31ea49c-f5f1-4957-a883-7d165200b423',
  message: 'log created successfully'
}
Log created: {
  logID: 'bf16b9a8-b96a-44a7-a49a-e7f80b2a93a4',
  message: 'log created successfully'
}

