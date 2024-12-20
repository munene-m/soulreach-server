# Use a base Node.js image for building
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn run build

# Use another base Node.js image for production
FROM node:18-alpine AS production
WORKDIR /app

# Copy the built application files and package.json from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Install dependencies for production
RUN yarn install --production --frozen-lockfile

EXPOSE 4001

# Command to run your application in production
CMD ["node", "./dist/index.js"]
