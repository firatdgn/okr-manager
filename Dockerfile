FROM node:16-alpine3.12 as builder
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:1.23.3-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d/default.conf /etc/nginx/conf.d/default.conf

# docker build . -t okr-manager 
# docker run -p 8080:80 okr-manager