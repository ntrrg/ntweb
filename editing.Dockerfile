FROM ntrrg/hugo:0.69.0
COPY . .
ENTRYPOINT ["/usr/bin/hugo", "server", "-D", "-E", "-F", "--noHTTPCache", "--bind", "0.0.0.0", "--baseUrl", "/", "--appendPort=false"]

