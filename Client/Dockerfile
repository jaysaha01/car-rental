FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Accept build argument
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_PAYMENT_KEY

# Make it available at build time
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_PAYMENT_KEY=$NEXT_PUBLIC_PAYMENT_KEY

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]