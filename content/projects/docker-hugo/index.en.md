---
publishdate: 2018-05-06T22:07:39-04:00
date: 2021-03-31T05:31:11-04:00
metadata:
  source-code: https://github.com/ntrrg/docker-hugo
  license: MIT
  website: https://hub.docker.com/r/ntrrg/hugo
title: docker-hugo
description: Dockerized Hugo CLI.
tags:
  - container
  - cli
  - docker
  - hugo
---

[![Docker Build Status](https://img.shields.io/docker/build/ntrrg/hugo.svg)](https://hub.docker.com/r/ntrrg/hugo)

[Hugo]: https://gohugo.io

**docker-hugo** is a Dockerized [Hugo][] CLI.

| Tag | Dockerfile |
| --: | :-- |
| `latest`, `0.82.0` | [Dockerfile](https://github.com/ntrrg/docker-hugo/blob/0.82.0/Dockerfile) |
| `extended`, `0.82.0-extended` | [Dockerfile](https://github.com/ntrrg/docker-hugo/blob/0.82.0/extended.Dockerfile) |
| `docs`, `0.82.0-docs` | [Dockerfile](https://github.com/ntrrg/docker-hugo/blob/0.82.0/docs.Dockerfile) |
| `0.81.0` | [Dockerfile](https://github.com/ntrrg/docker-hugo/blob/0.81.0/Dockerfile) |
| `0.80.0` | [Dockerfile](https://github.com/ntrrg/docker-hugo/blob/0.80.0/Dockerfile) |
| `0.79.1` | [Dockerfile](https://github.com/ntrrg/docker-hugo/blob/0.79.1/Dockerfile) |
| `0.78.2` | [Dockerfile](https://github.com/ntrrg/docker-hugo/blob/0.78.2/Dockerfile) |
| `0.76.5` | [Dockerfile](https://github.com/ntrrg/docker-hugo/blob/0.76.5/Dockerfile) |

Every image has the `extended` and `docs` variations. The first one contains
the Hugo extended version binary, and the second one is the Hugo website.

# Usage

```shell-session
$ docker run -v /path/to/my/site/:/site/ \
    ntrrg/hugo [OPTIONS] [COMMAND]
```

Any command from the Hugo CLI might be used, for extra information use `docker run --rm ntrrg/hugo help`
or see the [official documentation](https://gohugo.io/commands/).

{{% note %}}
Since the Hugo binary from the container is called by `root`, it is
recommendable to add the `-u` Docker flag.

```shell-session
$ docker run -v /path/to/my/site/:/site/ \
    -u $(id -u $USER) \
    -v ${TMPDIR:-/tmp/}:/tmp/ \
    ntrrg/hugo [OPTIONS] [COMMAND]
```
{{% /note %}}

## Examples

* Create a new Hugo skeleton

```shell-session
$ docker run --rm -v /path/to/my/site/:/site/ \
    ntrrg/hugo new site .
```

* Build a Hugo project

```shell-session
$ docker run --rm -v /path/to/my/site/:/site/ ntrrg/hugo
```

* Run the Hugo server

```shell-session
$ docker run --rm -i -t -p 1313:1313 \
    -v /path/to/my/site/:/site/ \
    ntrrg/hugo server -DEF --baseUrl=/ \
        --bind=0.0.0.0 --appendPort=false
```

* Run the Hugo server with a custom port

```shell-session
$ export PORT=8080
```

```shell-session
$ docker run --rm -i -t -p $PORT:$PORT \
    -v /path/to/my/site/:/site/ \
    ntrrg/hugo server -DEF --bind=0.0.0.0 --port=$PORT \
        --baseUrl=/ --appendPort=false
```

# Acknowledgment

Working on this project I use/used:

* [Debian](https://www.debian.org/)

* [XFCE](https://xfce.org/)

* [Vim](https://www.vim.org/)

* [Chrome](https://www.google.com/chrome/browser/desktop/index.html)

* [st](https://st.suckless.org/)

* [Zsh](http://www.zsh.org/)

* [GNU Screen](https://www.gnu.org/software/screen)

* [Git](https://git-scm.com/)

* [EditorConfig](http://editorconfig.org/)

* [Docker](https://docker.com)

* [Github](https://github.com)

* [Hugo](https://gohugo.io)

* [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/)

*Websocket for LiveReload using wrong port if Hugo binds to port 80.* <https://github.com/gohugoio/hugo/issues/2205>

