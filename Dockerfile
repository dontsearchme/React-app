# Stage 1 - Build
FROM node:20-alpine AS build   #using nodejs version 20 on alpine linux as base image and name=ing it as build for stage 2 reference.
WORKDIR /app                    
COPY package*.json ./          #copy all files with package keyword which has .json extension in it, json files list all the dependencies required for your react app
RUN npm install                # NPM Downloads and install all dependencies listed in package.json. 
COPY . .                       # Copy all remaining project files from GitHub repo into /app inside container. Source code, components, everything.
RUN chmod +x node_modules/.bin/react-scripts   #Give execute permission to react-scripts. Without this npm run build throws a permission denied error. 
RUN npm run build              # Compile React source code into plain HTML, CSS and JavaScript files. Output goes into /app/build folder. This is the final deployable version of your app.

# Stage 2 - Serve
FROM nginx:alpine    # use Nginx on Alpine Linux as new base image. 
COPY --from=build /app/build /usr/share/nginx/html  # Copy ONLY the compiled files from Stage 1's /app/build folder into Nginx's serving directory. This is why multi-stage works — we carry forward only what we need.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



#Stage 1 sets up Node.js, installs dependencies, copies source code and compiles React into static files. Stage 2 takes a fresh Nginx image,
copies only those compiled static files from Stage 1, 
and serves them on port 80. Node.js never makes it into the final image — keeping it small, fast and secure.
