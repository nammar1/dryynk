FROM node:alpine3.18 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install -g npm@10.7.0

# Remove package-lock.json and node_modules to fix optional dependencies issue
RUN rm -f package-lock.json && rm -rf node_modules

# Install dependencies with explicit optional dependencies
RUN npm install --include=optional

COPY . .

RUN npm run build

FROM nginx:alpine
# Copy the build output
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]