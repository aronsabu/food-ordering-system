# Cloud-Based Secure Food Ordering Application (DevSecOps)

## Project Overview

This project is a cloud-based secure food ordering web application developed as part of a DevSecOps Capstone Project. The application allows users to browse food items, manage carts, place orders, and securely access application features through role-based authentication. Administrators can manage food items, upload images, and monitor application data through a dedicated dashboard.

The project demonstrates the practical implementation of modern web development, cloud computing, cybersecurity, and DevOps practices using Amazon Web Services (AWS).

**Live Application:**
https://foodorderingapp.online

---

## Key Features

### User Features

* User Registration & Login
* JWT Authentication
* Browse Food Menu
* Add Items to Cart
* Place Orders
* Responsive User Interface

### Admin Features

* Admin Dashboard
* Add, Edit, and Delete Food Items
* Upload Food Images
* Manage Orders
* Role-Based Access Control

### Security Features

* HTTPS/SSL Encryption
* JWT Authentication
* bcrypt Password Hashing
* API Rate Limiting
* SQL Injection Prevention
* XSS Protection
* Helmet Security Headers
* UFW Firewall
* Fail2Ban Intrusion Prevention

---

## AWS Infrastructure

The application was deployed on AWS using a secure cloud architecture.

### Services Used

* Amazon EC2 (Ubuntu Server)
* Amazon RDS MySQL
* Application Load Balancer (ALB)
* AWS Certificate Manager (ACM)
* Amazon CloudWatch
* Amazon SNS
* Amazon S3
* Security Groups
* NAT Gateway

### Deployment URL

```text
https://foodorderingapp.online
```

---

## Technology Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* Amazon RDS MySQL

### DevOps & Automation

* Git
* GitHub
* GitHub Actions
* Docker
* Nginx
* systemd

### Monitoring

* AWS CloudWatch
* Amazon SNS

---

## Project Structure

```bash
food-ordering-system/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
├── frontend/
│   ├── css/
│   ├── js/
│   └── pages
│
├── docker-compose.yml
├── package.json
├── README.md
└── .gitignore
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/aronsabu/food-ordering-system.git

cd food-ordering-system
```

---

## 2. Install Dependencies

### Backend

```bash
cd backend

npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000

DB_HOST=your-rds-endpoint
DB_USER=admin
DB_PASSWORD=888888888888
DB_NAME=foodordering

JWT_SECRET=88888888
```

---

## 4. Start Application

### Using Node.js

```bash
npm start
```

---

### Using Docker

Build containers:

```bash
docker-compose build
```

Run containers:

```bash
docker-compose up -d
```

---

## 5. Verify Application

Backend Health Check:

```bash
curl http://localhost:5000/health
```

Expected Output:

```json
{
  "status": "healthy"
}
```

---

# Security Implementation

The application incorporates multiple security controls including:

* JWT Authentication
* bcrypt Password Hashing
* HTTPS Enforcement
* Helmet Security Headers
* API Rate Limiting
* SQL Injection Protection
* XSS Protection
* UFW Firewall Rules
* Fail2Ban Intrusion Prevention
* SSH Hardening

---

# Monitoring & Logging

Monitoring was implemented using AWS CloudWatch and Amazon SNS.

### Monitored Metrics

* CPU Utilization
* Memory Usage
* Disk Usage
* Network Traffic
* Application Health Status

### Alerts Configured

* High CPU Usage
* Health Check Failures
* Suspicious Activity Detection
* Service Availability Monitoring

---

# CI/CD Pipeline

A CI/CD pipeline was implemented using GitHub Actions.

### Workflow

```text
Developer Pushes Code
        ↓
GitHub Repository
        ↓
GitHub Actions
        ↓
Build & Validation
        ↓
Deployment to EC2
        ↓
Application Restart
        ↓
Production Environment Updated
```

The pipeline automates deployment and reduces manual intervention while ensuring consistent application releases.

---

# Backup & Recovery

Automated backups were configured using:

* Linux Cron Jobs
* Amazon S3 Storage

Database and application backups are periodically generated and stored securely for disaster recovery purposes.

---

# Author

**Aron Sabu**
DevSecOps Capstone Project

---

