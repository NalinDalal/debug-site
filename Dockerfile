# Step 1: Use official Node.js image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json into the container
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the Next.js application
RUN npm run build

# Step 7: Expose the port that the app will run on
EXPOSE 3000

# Step 8: Run the application
CMD ["npm", "start"]

