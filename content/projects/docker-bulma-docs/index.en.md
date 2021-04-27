---
publishdate: 2021-04-11T14:49:25-04:00
date: 2021-04-11T16:37:10-04:00
metadata:
  source-code: https://github.com/ntrrg/docker-bulma-docs
  license: MIT
  website: https://hub.docker.com/r/ntrrg/bulma-docs
title: docker-bulma-docs
description: Dockerized Bulma documentation.
tags:
  - containers
  - clis
  - docker
  - bulma
---

[![GitHub Actions](https://github.com/ntrrg/docker-bulma-docs/workflows/Docker/badge.svg)](https://github.com/ntrrg/docker-bulma-docs/actions?query=workflow:Docker)

[Bulma]: https://bulma.io/

**docker-bulma-docs** is the Dockerized [Bulma][] documentation.

| Tag | Dockerfile |
| --: | :-- |
| `latest`, `0.9.2` | [Dockerfile](https://github.com/ntrrg/docker-bulma-docs/blob/0.9.2/Dockerfile) |

# Usage

```shell-session
$ docker run -i -t -p 4321:80 ntrrg/bulma-docs
```

The port `4321` is mandatory since Jekyll uses absolute paths for resource
referencing.

# Acknowledgment

Working on this project I use/used:

* [Alpine](https://alpinelinux.org/)

* [XFCE](https://xfce.org/)

* [st](https://st.suckless.org/)

* [Zsh](http://www.zsh.org/)

* [GNU Screen](https://www.gnu.org/software/screen)

* [EditorConfig](http://editorconfig.org/)

* [Vim](https://www.vim.org/)

* [Git](https://git-scm.com/)

* [Docker](https://docker.com)

* [Firefox](https://www.mozilla.org/en-US/firefox/)

* [Github](https://github.com)

* [Bulma](https://bulma.io/)

