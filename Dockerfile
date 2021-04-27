FROM ntrrg/hugo:0.82.0-extended as hugo
COPY . .
RUN hugo --baseUrl / -d /public

FROM ntrrg/nginx:http
COPY --from=hugo /public /usr/share/nginx/html

