---
publishdate: 2021-02-08T11:13:12-04:00
date: 2021-04-14T05:04:46-04:00
metadata:
  source-code: https://github.com/ntrrg/docker-hdsentinel
  license: MIT
  website: https://hub.docker.com/r/ntrrg/hdsentinel
title: docker-hdsentinel
description: Hard Disk Sentinel en Docker.
tags:
  - contenedores
  - clis
  - docker
  - hdsentinel
---

[![GitHub Actions](https://github.com/ntrrg/docker-hdsentinel/workflows/Docker/badge.svg)](https://github.com/ntrrg/docker-hdsentinel/actions?query=workflow:Docker)

[Hard Disk Sentinel]: https://www.hdsentinel.com/

**docker-hdsentinel** es [Hard Disk Sentinel][] en Docker.

| Etiqueta | Dockerfile |
| --: | :-- |
| `latest`, `018c` | [Dockerfile](https://github.com/ntrrg/docker-hdsentinel/blob/018c/Dockerfile) |

# Uso

```shell-session
$ docker run --privileged -v /dev/:/dev/ \
    ntrrg/hdsentinel [OPCIONES] [DISCO]
```

Puede usarse cualquier opción de hdsentinel, para más información ejecutar
`docker run --rm ntrrg/hdsentinel -h` o ver la [documentación
oficial](https://www.hdsentinel.com/hard_disk_sentinel_linux.php).

## Ejemplos

* Obtener información de los discos en el sistema

```shell-session
$ docker run --rm --privileged -v /dev/:/dev/ ntrrg/hdsentinel
```

* Obtener información del disco principal

```shell-session
$ docker run --rm --privileged -v /dev/:/dev/ \
    ntrrg/hdsentinel -dev /dev/sda
```

* Obtener un reporte simple del disco principal

```shell-session
$ docker run --rm --privileged -v /dev/:/dev/ \
    ntrrg/hdsentinel -dev /dev/sda -solid
```

# Atribuciones

Trabajando en este proyecto uso/usé:

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

* [Hard Disk Sentinel](https://www.hdsentinel.com/)

