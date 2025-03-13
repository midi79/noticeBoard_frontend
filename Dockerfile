# Stage 1: Serve the App Using Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
WORKDIR /usr/share/nginx/html
COPY --from=builder /dist/index.html ./index.html  
COPY --from=builder /dist/assets ./assets

# Expose the correct port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

