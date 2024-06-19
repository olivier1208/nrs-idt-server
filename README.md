# 🌐 NRS IDT Server 🌐

This is a server application built with Express, Sequelize, Docker, and other technologies. It provides a robust backend
for managing and visualizing population data.

## 🚀 Technologies Used 🚀

- ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)
- ![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?logo=sequelize&logoColor=white)
- ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)
- ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)

## 📚 API Endpoints 📚

- `GET /api/v1/states/stale`: Fetches the stale states data (from JSON file)
- `GET /api/v1/states`: Retrieves a list of all states.
- `GET /api/v1/states/:id`: Retrieves a specific state by its ID.
- `PUT /api/v1/states/:id`: Updates a specific state by its ID.
- `DELETE /api/v1/states/:id`: Deletes a specific state by its ID.
- `GET /api/v1/states/:name/counties`: Retrieves a list of counties by state name.

## 📖 API Documentation 📖

The API documentation is available via Swagger UI. You can access it at `/api/v1/_docs`.

## 🏁 Getting Started 🏁

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js (v20 or higher)
- Docker
- Docker Compose (version 3 or higher)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/olivier1208/nrs-idt-server.git
   
    ```

2. Copy your `.env.example` file to `.env` and update the values according to your environment
   ```sh
   cp .env.example .env
   ```

3. Install NPM packages

   ```sh
      npm install
      ```

   or

   ```sh
   yarn install
   ```

3. Build the containers (Without cache, use `docker compose build --no-cache`)
   ```sh
   docker compose build
   ```

4. Start the containers (use `-d` to run in detached mode)
   ```sh
    docker compose up
    ```

4. Run the migrations, to populate the db based on JSON provided
   ```sh
   npm run seed:db
   ```

   or

   ```sh
   yarn seed:db
   ```

5. Access the server with the port you defined in your .env file at `http://localhost:YOUR_PORT`

## Bonus

The frontend app has been deployed to netlify :)
In order to use your docker container with the frontend, just use the port 8023 in your .env file

## Possible evolutions

As I was running out of time, here's what I could have implemented over the scope :

- Unit tests
- Redis Implementation for caching
- CI/CD pipeline integration with auto deployment
- Authentication and Authorization
- Permissions and roles
- More advanced error handling
- Logging
- More advanced validation
- Better documentation
- Adding commitizen to enforce a commit message convention
- Using SemVer to manage the versioning of the app

## 🤝 Contributing 🤝

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any
contributions you make are greatly appreciated.  
Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request

## 📜 License 📜

Distributed under the MIT License. See LICENSE for more information.

Enjoy! 🚀
