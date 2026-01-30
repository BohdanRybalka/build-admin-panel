# Build Admin Panel

A full-stack **Construction Expense Tracker** web application built with React, Node.js/Express, and MongoDB. This application allows users to manage construction projects, track expenses, and view statistics - all containerized and ready to run without any local dependencies.

## 🚀 Quick Start (Docker - Recommended)

**No MongoDB or Node.js installation required!** Everything runs in Docker containers.

### Prerequisites

- [Docker](https://www.docker.com/get-started) (20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0 or higher)

### Running the Application

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd build-admin-panel
   ```

2. **Start all services:**
   ```bash
   docker compose up --build
   ```

   This single command will:
   - Start MongoDB container (with persistent data)
   - Build and start the backend API server
   - Build and start the frontend with Nginx
   - Configure automatic service health checks
   - Set up networking between all containers

3. **Access the application:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:4000

4. **Stop the application:**
   ```bash
   docker compose down
   ```

5. **Stop and remove all data:**
   ```bash
   docker compose down -v
   ```

### Service Architecture

```
┌─────────────────────────────────────────────────────┐
│  Browser (localhost:3000)                           │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │  Nginx (Client)       │
         │  - Serves React app   │
         │  - Proxies API calls  │
         └──────────┬────────────┘
                    │
                    ▼
         ┌───────────────────────┐
         │  Express (Server)     │
         │  - REST API           │
         │  - JWT Auth           │
         └──────────┬────────────┘
                    │
                    ▼
         ┌───────────────────────┐
         │  MongoDB (Database)   │
         │  - Persistent storage │
         └───────────────────────┘
```

## 📁 Project Structure

```
build-admin-panel/
├── /src/                    # React frontend (TypeScript)
│   ├── components/          # UI components
│   ├── hooks/               # Custom React hooks
│   ├── config/              # API configuration
│   └── assets/              # Images and icons
├── /server/                 # Node.js/Express backend
│   ├── models/              # MongoDB schemas
│   ├── server.ts            # Express server
│   └── db.ts                # Database connection
├── /public/                 # Static assets
├── docker-compose.yml       # Container orchestration
├── Dockerfile               # Frontend container
├── nginx.conf               # Nginx configuration
└── README.md
```

## 🛠️ Development

### Local Development (Without Docker)

If you prefer to run services locally:

#### Prerequisites
- Node.js 20+
- MongoDB 6.0+
- npm or yarn

#### Setup

1. **Start MongoDB:**
   ```bash
   mongod --dbpath /path/to/data
   ```

2. **Start Backend:**
   ```bash
   cd server
   npm install
   npm run start-server
   ```
   Backend runs on http://localhost:4000

3. **Start Frontend:**
   ```bash
   npm install
   npm run start-client
   ```
   Frontend runs on http://localhost:3000

## 🔐 Environment Variables

### Backend (`/server/.env`)
```env
JWT_SECRET_KEY=V3ryC0mpl3xS3cr3tK3yTh4t1sH4rdT0Gu3ss
PORT=4000
MONGO_URI=mongodb://localhost:27017/ConstructionExpenseManagement
```

### Frontend (Optional - defaults work for Docker)
```env
REACT_APP_API_URL=/api
```

## 📦 Available Scripts

### Frontend
- `npm run start-client` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run test:e2e` - Run Playwright E2E tests

### Backend
- `npm run start-server` - Start development server (uses tsx)

### Docker
- `docker compose up` - Start all services
- `docker compose up --build` - Rebuild and start
- `docker compose down` - Stop all services
- `docker compose logs -f` - View logs
- `docker compose ps` - View running containers

## 🧪 Testing

### E2E Tests with Playwright
```bash
npm run test:e2e
```

Tests are located in `/tests/frontend.spec.ts`

## 🔧 Technology Stack

### Frontend
- React 18.3 with TypeScript
- Chakra UI for components
- React Router for navigation
- Axios for HTTP requests
- Chart.js for statistics visualization

### Backend
- Express 4.19 with TypeScript
- Mongoose for MongoDB ODM
- JWT for authentication
- bcrypt for password hashing

### Infrastructure
- Docker & Docker Compose
- Nginx for reverse proxy
- MongoDB 6.0 for database

## 📝 API Endpoints

### Authentication
- `POST /login` - User login
- `POST /register` - User registration

### Protected Routes (Require JWT)
- `GET /api/user` - Get user info
- `GET /api/projects` - Get all projects
- `POST /api/projects/create` - Create project
- `DELETE /api/projects/delete` - Delete projects
- `GET /api/expenses/:projectId` - Get expenses
- `POST /api/expenses/create` - Create expense
- `DELETE /api/expenses/delete` - Delete expenses

## 🔒 Security Features

- JWT-based authentication (1-hour token expiration)
- Bcrypt password hashing (10 salt rounds)
- CORS protection
- Environment variable configuration
- Nginx reverse proxy

## 🐛 Troubleshooting

### Port Already in Use
If you see "port already allocated" errors:
```bash
docker compose down
# Check for processes using ports 3000, 4000, or 27017
lsof -i :3000
lsof -i :4000
lsof -i :27017
```

### MongoDB Connection Issues
If the backend can't connect to MongoDB:
```bash
# Check MongoDB container is running
docker compose ps

# View MongoDB logs
docker compose logs mongo

# Restart services
docker compose restart
```

### Frontend Can't Reach Backend
- Ensure all containers are healthy: `docker compose ps`
- Check nginx logs: `docker compose logs client`
- Verify API configuration in `src/config/api.ts`

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License