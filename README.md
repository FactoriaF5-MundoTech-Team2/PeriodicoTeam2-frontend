# Mundo Tech

A full-stack news platform where authors can write and submit articles for editorial review, and managers can approve or reject them before publication. Built as a team project at Factoria F5.

## Features

- Create, read, update and delete articles
- Article workflow: DRAFT → IN_REVIEW → PUBLISHED (rejection returns to DRAFT)
- Role-based access control: AUTHOR and MANAGER roles enforced at service level
- Image upload per article stored on disk and served as static files
- User management with cascade delete (deletes all related articles)
- Only the same user can delete their own account

## Technologies

**Backend**
- Java 25
- Spring Boot 3.5.16
- Spring Data JPA / Hibernate
- PostgreSQL 18.4
- Lombok
- Maven

**Frontend**
- React 18
- React Router
- SASS (SCSS modules)
- Bootstrap Icons
- Vite

# MundoTech - Project Structure

````
mundotech/
├── backend/                                    # Spring Boot REST API
│   ├── src/
│   │   └── main/
│   │       ├── java/com/periodico/mundotech/
│   │       │   ├── config/                     # CORS configuration
│   │       │   ├── controller/                 # REST controllers
│   │       │   ├── dto/                        # Request and response DTOs
│   │       │   ├── entity/                     # JPA entities (Article, User, Role, FileData)
│   │       │   ├── mapper/                     # Entity <-> DTO mappers
│   │       │   ├── repository/                 # Spring Data repositories
│   │       │   └── service/                    # Service interfaces and implementations
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── frontend/                                   # React + Vite application
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx                            # Entry point (mounts App, global styles, icons)
        ├── App.jsx
        ├── routes/
        │   └── AppRoutes.jsx                   # React Router route definitions
        ├── context/
        │   └── UserContext.jsx                 # Global user state
        ├── components/                         # Shared reusable components
        │   ├── CardImage/
        │   ├── Footer/
        │   ├── Header/
        │   ├── Modal/
        │   └── Tag/                            # TagStatus
        ├── features/                           # Feature-based modules
        │   ├── articles/
        │   │   ├── components/                 # ApproveButton, RejectButton, DraftButton,
        │   │   │                               # CreateArticleButton, EditArticleButton,
        │   │   │                               # DeleteButton, CounterTag, FilterButton,
        │   │   │                               # SearchBar, PublishButton, ArticleForm,
        │   │   │                               # ArticleCardAuthor, ArticleCardManager
        │   │   └── pages/                      # AuthorHome, ManagerHome, CreateArticle,
        │   │                                   # ArticleDetail
        │   └── users/
        │       ├── components/                 # UserInfo, DeleteAccount
        │       └── pages/                      # ProfilePage
        └── styles/
            ├── main.scss                       # Global styles and resets
            ├── _variables.scss                 # Colors, typography, spacing
            ├── _mixins.scss
            └── _reset.scss
````

## Tech Stack

### Backend

| Technology | Version | Purpose |
|---|---|---|
| [Java](https://www.java.com/) | 25 | Programming language |
| [Spring Boot](https://spring.io/projects/spring-boot) | 3.5.16 | Application framework |
| [Spring Data JPA](https://spring.io/projects/spring-data-jpa) | - | Database ORM |
| [Spring Validation](https://docs.spring.io/spring-framework/reference/core/validation.html) | - | Bean validation |
| [Spring Boot Actuator](https://docs.spring.io/spring-boot/reference/actuator/index.html) | - | App monitoring |
| [PostgreSQL](https://www.postgresql.org/) | 18.4 | Relational database |
| [Lombok](https://projectlombok.org/) | - | Boilerplate reduction |
| [Maven](https://maven.apache.org/) | - | Build and dependency management |

### Testing

| Technology | Version | Purpose |
|---|---|---|
| [JUnit Jupiter](https://junit.org/junit5/) | 6.1.0 | Unit testing framework |
| [Mockito](https://site.mockito.org/) | 5.23.0 | Mocking library |
| [H2 Database](https://h2database.com/)

### Core

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19.2.7 | UI library |
| [React DOM](https://react.dev/) | 19.2.7 | Browser rendering |
| [React Router DOM](https://reactrouter.com/) | 7.18.1 | Client-side routing |
| [Axios](https://axios-http.com/) | 1.18.1 | HTTP client for the REST API |
| [Bootstrap](https://getbootstrap.com/) | 5.3.8 | CSS framework |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | 1.13.1 | Icon library |

### Development Tools

| Technology | Version | Purpose |
|---|---|---|
| [Vite](https://vite.dev/) | 8.1.1 | Build tool and dev server |
| [Sass](https://sass-lang.com/) | 1.101.0 | CSS preprocessor |
| [ESLint](https://eslint.org/) | 10.6.0 | Code linting |

# Installation
## Getting Started

This project consists of two separate repositories that work together:

- **Backend**: [PeriodicoTeam2](https://github.com/FactoriaF5-MundoTech-Team2/PeriodicoTeam2) (Spring Boot REST API)
- **Frontend**: [PeriodicoTeam2-frontend](https://github.com/FactoriaF5-MundoTech-Team2/PeriodicoTeam2-frontend) (React + Vite)

Clone both repositories into the same parent folder:

```bash
mkdir mundotech && cd mundotech
git clone https://github.com/FactoriaF5-MundoTech-Team2/PeriodicoTeam2.git
git clone https://github.com/FactoriaF5-MundoTech-Team2/PeriodicoTeam2-frontend.git
```

Resulting structure:

```
mundotech/
├── PeriodicoTeam2/            # Backend
└── PeriodicoTeam2-frontend/   # Frontend
```
### 1. Backend setup

```bash
cd PeriodicoTeam2
```

Create the database:

```sql
CREATE DATABASE mundotech;
```

Create `src/main/resources/application-local.properties` (gitignored):

```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

Run the application:

```bash
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`.

### 2. Frontend setup

In a separate terminal:

```bash
cd PeriodicoTeam2-frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Note:** The backend must be running before starting the frontend, otherwise API requests will fail. CORS is already configured on the backend to accept requests from `http://localhost:5173`.

## API Endpoints

### Articles

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/articles` | Create article (AUTHOR only) |
| GET | `/api/v1/articles` | Get all articles |
| GET | `/api/v1/articles/{id}` | Get article by ID |
| GET | `/api/v1/articles/author/{authorId}` | Get articles by author |
| GET | `/api/v1/articles/status/{status}` | Get articles by status |
| GET | `/api/v1/articles/my-articles?authorId=&status=` | Filter author's articles by status |
| PUT | `/api/v1/articles/{id}?authorId=` | Update article (DRAFT only) |
| DELETE | `/api/v1/articles/{id}?authorId=` | Delete article |
| PATCH | `/api/v1/articles/{id}/submit-review?authorId=` | Submit for review |
| PATCH | `/api/v1/articles/{id}/approve?managerId=` | Approve article (MANAGER only) |
| PATCH | `/api/v1/articles/{id}/reject?managerId=` | Reject article (MANAGER only) |

### Images

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/images/{articleId}` | Upload image for article (multipart/form-data, key: `file`) |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/users?rolesIds=` | Create user |
| DELETE | `/api/v1/users/{id}?requestingUserId=` | Delete own account (cascades articles) |

### Roles

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/roles` | Create role |

## Database

Main entities and relationships:

- **User** has many **Articles** (cascade delete)
- **Article** belongs to one **User** (author)
- **Article** has one **FileData** (image, cascade)
- **User** has many **Roles** (many-to-many)
- **ArticleStatus**: `DRAFT`, `IN_REVIEW`, `PUBLISHED`

## Testing

```bash
./mvnw test
```

## Roadmap

- Frontend in separate repository
- Change `ddl-auto` from `create` to `update` for persistent data
- Pagination for article listings

## Contributors

- [Viviana Andrango](https://github.com/alvi103-png)
- [Johanna Monroy](https://github.com/Johamonroy20)
- [Nayeli Córdova](https://github.com/nagicome03)
- [Chiara Di Maio](https://github.com/chdimaio)

