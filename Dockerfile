FROM node:16-alpine3.12 as builder
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# docker build . -t okr-manager 
# docker run -p 8080:80 okr-manager