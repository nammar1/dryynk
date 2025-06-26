FROM node:alpine3.18
WORKDIR /app
COPY package*.json ./
RUN npm install
# Install typescript globally
RUN npm install -g typescript
COPY . .
# Add build step with proper permissions
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "start"]