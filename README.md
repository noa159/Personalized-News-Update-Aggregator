# Personalized News Update Aggregator

This project is a microservices-based application designed to aggregate news and technology updates based on user preferences. The system fetches the latest news, picks up the most interesting news using AI based on user preferences, and sends this information to users via email or Telegram.

## Project Structure

The application is divided into three main services:

- **User Service**: Manages user authentication, registration, and stores user preferences.
- **News Service**: Fetches news based on user preferences from various news APIs.
- **Notify Service**: Sends news updates to users through their preferred communication channels.

Each service is designed to run independently, with communication facilitated by Dapr sidecars.

## Technology Stack

- **Node.js**: Core programming platform for building microservices.
- **Express**: Web application framework for Node.js.
- **Dapr**: Event-driven, portable runtime for building microservices on cloud and edge.
- **Docker & Docker Compose**: Containerization of services and their orchestration.
- **MongoDB**: NoSQL database used by the User Service for storing user data.
- **Redis**: Used as a state store by Dapr for managing session and preferences state.
- **JWT (JSON Web Tokens)**: Used for securing the APIs via token-based authentication.
- **Axios**: Used for making HTTP requests from Node.js.

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js
- An API key for NewsData.io (or any other news API you prefer)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/personalized-news-aggregator.git
   cd personalized-news-aggregator
    ```
   

2. **Clone the repository:**

Create a .env file in each service directory and add the necessary environment variables:

# For user-service
MONGODB_URI=mongodb://localhost:27017/userdb
JWT_SECRET=your_jwt_secret

# For news-service and notify-service
DAPR_HTTP_PORT=3500


3. **Build and run the services using Docker Compose:**

   ```bash
   docker-compose up --build
   ```


Usage
Register a User:
Send a POST request to http://localhost:3001/api/users/register with a JSON body containing the user's email and preferences.

Login:
Send a POST request to http://localhost:3001/api/users/login to receive a JWT token.

Fetch News:
With a valid JWT, send a GET request to http://localhost:3002/api/news.

Send Notification:
Use the Notify Service to send updates through configured channels.
