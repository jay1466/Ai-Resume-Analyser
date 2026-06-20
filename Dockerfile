# Stage 1: Build the Frontend using Node
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY Frontend/package.json Frontend/package-lock.json* ./
RUN npm install
COPY Frontend/ ./
RUN npm run build

# Stage 2: Build the Backend using Maven
FROM maven:3.9.5-eclipse-temurin-21 AS backend-build
WORKDIR /app/backend
COPY Backend/pom.xml ./
COPY Backend/src ./src
COPY Backend/mvnw ./
COPY Backend/.mvn ./.mvn

# Copy the built frontend static files into Spring Boot's static directory
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static

# Package the application
RUN mvn clean package -DskipTests

# Stage 3: Run the application
FROM eclipse-temurin:21-jre AS runtime
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
