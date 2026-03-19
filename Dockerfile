# Stage 1 - Build
FROM node:20-alpine AS build   
WORKDIR /app                    
COPY package*.json ./         
RUN npm install                
COPY . .                       
RUN chmod +x node_modules/.bin/react-scripts    
RUN npm run build             

# Stage 2 - Serve
FROM nginx:alpine     
COPY --from=build /app/build /usr/share/nginx/html  .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



#Stage 1 sets up Node.js, installs dependencies, copies source code and compiles React into static files. Stage 2 takes a fresh Nginx image,
copies only those compiled static files from Stage 1, 
and serves them on port 80. Node.js never makes it into the final image — keeping it small, fast and secure.
