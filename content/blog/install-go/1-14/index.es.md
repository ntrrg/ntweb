---
title: Instalar Go 1.14 en Linux
publishdate: 2020-03-17T14:05:00-04:00
date: 2020-05-23T14:10:00-04:00
description: Instalar Go 1.14 es bastante sencillo, con solo seguir unas pocas instrucciones cualquiera puede hacerlo.
image: images/go.png
tags:
  - tecnología
  - guías
  - instalaciones
  - lenguajes-de-programación
  - go
  - linux
  - alpine
  - debian
comments: true
---

La forma más rápida de instalarlo es descargando la versión binaria, si se
quiere compilar desde el código fuente, en [esta sección](#desde-el-código-fuente)
explico el procedimiento para hacerlo.

{{< note >}}
Para instalar otra arquitectura, hay que cambiar el `amd64` por el código de la
arquitectura que se necesite. Las sumas de comprobación de los archivos no
serán iguales a las de este artículo.
{{< /note >}}

1\. Descargar el paquete con los binarios

```shell-session
$ wget https://dl.google.com/go/go1.14.3.linux-amd64.tar.gz
```

```shell-session
$ sha256sum -c <(echo "1c39eac4ae95781b066c144c58e45d6859652247f7515f0d2cba7be7d57d2226  go1.14.3.linux-amd64.tar.gz")
go1.14.3.linux-amd64.tar.gz: OK
```

```shell-session
$ tar -xf go1.14.3.linux-amd64.tar.gz
```

2\. Verificar que funciona correctamente

```shell-session
$ go/bin/go version
go version go1.14.3 linux/amd64
```

3\. Mover a `/usr/local`

```shell-session
# mv go /usr/local/
```

4\. Agregar los binarios a la lista de comandos del sistema

```shell-session
# ln -sf /usr/local/go/bin/* /usr/bin/
```

{{< note >}}
Es posible instalar Go en una ruta personalizada e incluso sin permisos de
super-usuario, los pasos serían muy parecidos a los anteriores, solo que hay
que cambiar las rutas.

3\. Mover a `$HOME/.local/`

```shell-session
$ mv go "$HOME/.local/"
```

4\. Agregar los binarios a la lista de comandos del sistema

```shell-session
$ mkdir -p "$HOME/.local/bin"
```

```shell-session
$ ln -sf "$HOME"/.local/go/bin/* "$HOME/.local/bin/"
```

```shell-session
$ export PATH="$HOME/.local/bin:$PATH"
```

Para que se mantenga después de cerrar el terminal se debe modificar el archivo
de configuración del Shell.

**Bash:**

```shell-session
$ echo "export PATH=\"$HOME/.local/bin:\$PATH\"" >> ~/.profile
```

**Zsh:**

```shell-session
$ echo "export PATH=\"$HOME/.local/bin:\$PATH\"" >> ~/.zshenv
```
{{< /note >}}

# Desde el código fuente

Es bueno saber en qué circunstancias es ventajoso realizar este proceso:

* Seguridad. Saber qué es lo que se está ejecutando es lo más importante del
  software libre.

* Control. Arreglar fallas, agregar funcionalidades, adaptar el lenguaje según
  las necesidades, usarlo en una plataforma no soportada oficialmente, etc.

* Acceso. Cuando no se dispone de una conexión a Internet muy rápida y ya se
  tiene una versión de Go instalada, descargar el código fuente y compilarlo
  puede ser más rápido. Si se usa Git, esta opción puede ser muy útil.

* Curiosidad. ¿A quién no le gusta aprender algo nuevo?.

También es bueno resaltar que compilar Go es una tarea que requiere algo de
poder de computo, así que mi recomendación es solo hacer este proceso si alguna
o más de las circunstancias de arriba aplican.

## Descarga

El código fuente se puede descargar como paquete desde el sitio oficial de Go

```shell-session
$ wget https://dl.google.com/go/go1.14.3.src.tar.gz
```

```shell-session
$ sha256sum -c <(echo "93023778d4d1797b7bc6a53e86c3a9b150c923953225f8a48a2d5fabc971af56  go1.14.3.src.tar.gz")
go1.14.3.src.tar.gz: OK
```

```shell-session
$ tar -xf go1.14.3.src.tar.gz
```

O usando Git

```shell-session
$ # Desde Google
$ git clone -b go1.14.3 https://go.googlesource.com/go
```

```shell-session
$ # Desde GitHub
$ git clone -b go1.14.3 https://github.com/golang/go
```

## Bootstrap

Antes de continuar, es necesario preparar el compilador del compilador 😂 suena
un poco raro, pero todo programa debe ser traducido a lenguaje máquina para ser
ejecutado (eso incluye a Go).

Desde su versión 1.5 Go está escrito en Go, eso quiere decir que se puede usar
un compilador de Go existente para realizar este proceso. Como la sintaxis del
lenguaje sufre muy pocos cambios a lo largo del tiempo, es posible usar
versiones anteriores, pero mi recomendación es usar la más reciente posible
para evitar fallas (es muy poco probable, pero puede pasar si se agregan nuevas
funcionalidades al lenguaje y se usan en el código fuente del compilador).

Hasta su versión 1.4 Go estaba escrito en C, por lo que también es posible usar
un compilador de C, esta opción solo tiene sentido usarla en algunas ocasiones
como:

* El hardware donde se quiere instalar Go no tiene soporte oficial. Suponiendo
  que exista un compilador de C para esta plataforma, de lo contrario habrá que
  escribir Assembly. También hay que tener en cuenta que aunque exista un
  compilador de C, el funcionamiento de Go no está garantizado pues la
  implementación de la biblioteca estándar varía entre plataformas.

* La distribución donde se quiere instalar Go usa una implementación de la
  biblioteca estándar de C diferente a la que se usó en la versión 1.4 para
  compilar los binarios de Go. Por ejemplo, los binarios para Linux
  distribuidos oficialmente fueron compilados con glibc, por lo que no
  funcionarán en Alpine pues esta distribución usa musl.

* No se confía en la integridad de los binarios de Go.

* Curiosidad (otra vez 😂).

### Con Go

En esta opción asumo que ya se tiene una versión de Go instalada, si no, se
debe instalar una versión binaria como se explica al inicio del artículo.

Solo hace falta establecer la variable de entorno `GOROOT_BOOTSTRAP`, que
determina donde buscar el compilador de la instalación actual

```shell-session
$ export GOROOT_BOOTSTRAP="$(go env GOROOT)"
```

### Con C

{{< note >}}
Para esta opción se necesitan algunas dependencias que varían según la
distribución.

**Alpine:**

```shell-session
# apk add bash gcc musl-dev openssl
```

**Debian:**

```shell-session
# apt install gcc libc6-dev make pkg-config
```
{{< /note >}}

1\. Descargar el código fuente de la versión 1.4

```shell-session
$ wget https://dl.google.com/go/go1.4-bootstrap-20171003.tar.gz
```

```shell-session
$ sha256sum -c <(echo "f4ff5b5eb3a3cae1c993723f3eab519c5bae18866b5e5f96fe1102f0cb5c3e52  go1.4-bootstrap-20171003.tar.gz")
go1.4-bootstrap-20171003.tar.gz: OK
```

```shell-session
$ tar -xf go1.4-bootstrap-20171003.tar.gz \
    --transform "s/^go/gobootstrap/"
```

O usando Git

```shell-session
$ # Si ya se había clonado el código fuente
$ git -C go archive --format tar origin/release-branch.go1.4 | \
    tar -x --transform "s/^/gobootstrap\//"
```

```shell-session
$ # Desde Google
$ git clone -b release-branch.go1.4 --depth 1 \
    https://go.googlesource.com/go gobootstrap
```

```shell-session
$ # Desde GitHub
$ git clone -b release-branch.go1.4 --depth 1 \
    https://github.com/golang/go gobootstrap
```

2\. Compilar el compilador 😂

```shell-session
$ (cd gobootstrap/src && CGO_ENABLED=0 ./make.bash)
```

3\. Verificar que funciona correctamente

```shell-session
$ gobootstrap/bin/go version
go version go1.4-bootstrap-20170531 linux/amd64
```

4\. Establecer la variable de entorno `GOROOT_BOOTSTRAP`, que determina donde
    buscar el compilador

```shell-session
$ export GOROOT_BOOTSTRAP="$PWD/gobootstrap"
```

## Compilación

1\. ¡Compilar!

```shell-session
$ (cd go/src && ./all.bash)
```

{{< note >}}
El script `all.bash` también ejecuta todas las pruebas (que es recomendable
hacerlo). Para evitar esto y solo compilar, se puede usar el script `make.bash`.
{{< /note >}}

2\. Verificar que funciona correctamente

```shell-session
$ go/bin/go version
go version go1.14.3 linux/amd64
```

## Instalación

1\. Eliminar cualquier instalación existente

```shell-session
# for BIN in $(ls /usr/local/go/bin/); do \
    rm -f /usr/bin/$BIN; done
```

```shell-session
# rm -rf /usr/local/go
```

2\. Mover a `/usr/local`

```shell-session
# mv go /usr/local/
```

3\. Agregar los binarios a la lista de comandos del sistema

```shell-session
# ln -s /usr/local/go/bin/* /usr/bin/
```

# Atribuciones

**Go Team.** *Getting Started.* <https://golang.org/doc/install>

**Go Team.** *Installing Go from source.* <https://golang.org/doc/install/source>

