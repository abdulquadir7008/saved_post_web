FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs tailwind.config.ts ./
COPY next-env.d.ts ./
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY messages ./messages

RUN npm ci

EXPOSE 3000

ENV NEXT_PUBLIC_API_URL=http://server:4000

CMD ["npm", "run", "dev"]
