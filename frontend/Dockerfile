FROM public.ecr.aws/docker/library/node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Clear cache
RUN rm -rf .angular/cache node_modules/.vite

# Expose the default Angular port 4200
EXPOSE 4200

# Start the Angular development server
CMD ["npm", "start"]