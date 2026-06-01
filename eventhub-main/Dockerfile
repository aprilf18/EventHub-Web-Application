# Multi-stage build for React frontend and Spring Boot backend
FROM --platform=linux/amd64 node:18-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Backend build stage
FROM --platform=linux/amd64 eclipse-temurin:17-jdk-alpine AS backend-build

# Install Maven
RUN apk add --no-cache maven

WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn package -DskipTests

# Final stage
FROM --platform=linux/amd64 eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built backend jar
COPY --from=backend-build /app/target/*.jar app.jar

# Copy the built frontend
COPY --from=frontend-build /app/frontend/build ./static

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
