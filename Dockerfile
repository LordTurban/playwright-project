FROM mcr.microsoft.com/playwright:v1.42.1-focal

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# The CMD runs the test and triggers the notification logic you wrote
CMD ["npx", "playwright", "test"]