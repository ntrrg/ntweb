FROM ntrrg/hugo:0.76.2-extended
COPY . .
ENTRYPOINT ["/usr/bin/hugo", "server", "-D", "-E", "-F", "--noHTTPCache", "--bind", "0.0.0.0", "--baseUrl", "/", "--appendPort=false"]

