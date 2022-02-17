---
title: Instalar Go en Linux
publishdate: 2019-11-12T10:10:00-04:00
date: 2022-02-17T08:25:00-04:00
description: Instalar Go es bastante sencillo, con solo seguir unas pocas instrucciones cualquiera puede hacerlo.
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
aliases:
  - /es/blog/instalar-go-1.13/
  - /es/blog/instalar-go-1.13-en-linux/
  - /es/blog/instalar-go-1.14-en-linux/
  - /es/blog/instalar-go-1.15-en-linux/
  - /es/blog/instalar-go-1.16-en-linux/
  - /es/blog/instalar-go-1.17-en-linux/
---

La forma más rápida de instalarlo es descargando la versión binaria, si se
quiere compilar desde el código fuente, en [esta sección](#desde-el-código-fuente)
explico el procedimiento para hacerlo.

{{% note %}}
Para evitar conflictos con instalaciónes actuales, recomiendo ejecutar todos
los comandos de este artículo en una carpeta que no sea `$HOME`.
{{% /note %}}

{{% note %}}
Para instalar otra versión o usar otra arquitectura, solo hay que cambiar
`1.17.7` o `amd64` por los valores deseados en los comandos.

Si se hace algún cambio, las sumas de comprobación de los archivos no serán
iguales a las de este artículo.
{{% /note %}}

1\. Descargar los binarios.

```shell-session
$ wget https://dl.google.com/go/go1.17.7.linux-amd64.tar.gz
```

```shell-session
$ sha256sum -c <(echo "02b111284bedbfa35a7e5b74a06082d18632eff824fd144312f6063943d49259  go1.17.7.linux-amd64.tar.gz")
go1.17.7.linux-amd64.tar.gz: OK
```

```shell-session
$ tar -xf go1.17.7.linux-amd64.tar.gz
```

2\. Verificar que funciona correctamente.

```shell-session
$ go/bin/go version
go version go1.17.7 linux/amd64
```

3\. Eliminar cualquier instalación existente

```shell-session
# rm -rf "$(go env GOROOT)"
```

```shell-session
# rm -f "$(command -v gofmt)" "$(command -v go)"
```

4\. Mover a `/usr/lib`.

```shell-session
# mv go /usr/lib/
```

5\. Agregar los binarios a la lista de comandos del sistema.

```shell-session
# ln -sf /usr/lib/go/bin/* /usr/bin/
```

{{% note %}}
Es posible instalar Go en una ruta personalizada e incluso sin permisos de
super-usuario, los pasos serían muy parecidos a los anteriores, solo que hay
que cambiar las rutas.

4\. Mover a `$HOME/.local/lib/`.

```shell-session
$ mkdir -p "$HOME/.local/lib"
```

```shell-session
$ mv go "$HOME/.local/lib"
```

4\. Agregar los binarios a la lista de comandos del sistema.

```shell-session
$ mkdir -p "$HOME/.local/bin"
```

```shell-session
$ ln -sf "$HOME"/.local/lib/go/bin/* "$HOME/.local/bin/"
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
{{% /note %}}

# Desde el código fuente

Es bueno saber en qué circunstancias es ventajoso realizar este proceso:

* Seguridad. Saber qué es lo que se está ejecutando es lo más importante del
  software libre.

* Control. Arreglar fallas, agregar funcionalidades, adaptar el lenguaje según
  las necesidades, compilar para plataformas soportadas de las que no se puede
  descargar una versión binaria, etc.

* Acceso. Cuando no se dispone de una conexión a Internet muy rápida y ya se
  tiene una versión de Go instalada, descargar el código fuente y compilarlo
  puede ser más rápido (en mi computadora tarda ~7 minutos). Si se usa Git,
  esta opción puede ser muy útil.

* Curiosidad. ¿A quién no le gusta aprender algo nuevo?.

También es bueno resaltar que compilar Go es una tarea que requiere algo de
poder de computo, así que mi recomendación es solo hacer este proceso si alguna
o más de las circunstancias de arriba aplican.

## Descarga

El código fuente se puede descargar como paquete desde el sitio oficial de Go.

```shell-session
$ wget https://dl.google.com/go/go1.17.7.src.tar.gz
```

```shell-session
$ sha256sum -c <(echo "c108cd33b73b1911a02b697741df3dea43e01a5c4e08e409e8b3a0e3745d2b4d  go1.17.7.src.tar.gz")
go1.17.7.src.tar.gz: OK
```

```shell-session
$ tar -xf go1.17.7.src.tar.gz
```

O usando Git.

```shell-session
$ # Desde Google
$ git clone -b go1.17.7 https://go.googlesource.com/go
```

```shell-session
$ # Desde GitHub
$ git clone -b go1.17.7 https://github.com/golang/go
```

## Bootstrap

Antes de continuar, es necesario preparar el compilador del compilador 😂 suena
un poco raro, pero todo programa debe ser traducido a lenguaje máquina para ser
ejecutado, y eso incluye a los compiladores.

Desde su versión 1.5, el compilador de Go está escrito en Go, eso quiere decir
que se puede usar una [instalación existente](#con-go) para compilarlo.

Es posible usar versiones no muy recientes, pero mi recomendación es usar la
más reciente posible para evitar fallas, por ejemplo, el soporte para Linux ARM
de 64 bits (`linux/arm64`) se agregó en la versión 1.5, el soporte para Android
x86 de 32 bits (`android/386`) en la versión 1.6, y así sucesivamente, por lo
que esas son las versiones mínimas necesarias para cada plataforma.

En caso de que no se confíe en la integridad del compilador de Go instalado, o
la plataforma actual utilice otra biblioteca de C (como Alpine, que usa musl en
lugar de glibc), se puede [compilar la versión 1.4 con C](#con-c) (que es la
última versión del compilador de Go escrito en C) y usar esta versión para
compilar la versión que realmente quiere compilar.

Un detalle a tener en cuenta al usar la versión 1.4, como expliqué arriba, es
que solo servirá en plataformas soportadas hasta esta versión. Para que
funcione en otras plataformas, se deben [generar artefactos de compilación
desde una plataforma soportada](#para-otras-plataformas), por ejemplo, para
compilar Go 1.17.7 en la plataforma *A* (Linux ARM de 64 bits), se pueden
generar los artefactos desde la plataforma *B* (Linux x86 de 64 bits) de la
versión 1.5 como mínimo (la versión donde se agrego soporte para `linux/arm64`)
y copiarlos a la plataforma *A*.

### Con Go

Definir la variable de entorno `GOROOT_BOOTSTRAP`, que determina la ubicación
del compilador actual.

```shell-session
$ export GOROOT_BOOTSTRAP="$(go env GOROOT)"
```

### Con C

{{% note %}}
Para esta opción se necesitan algunas dependencias que varían según la
distribución.

**Alpine:**

```shell-session
# apk add --no-cache bash gcc git musl-dev openssl
```

**Debian:**

```shell-session
# apt install bash gcc git libc6-dev make openssl
```
{{% /note %}}

1\. Descargar el código fuente de la versión 1.4.

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

O usando Git.

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

2\. Compilar el compilador 😂.

```shell-session
$ (cd gobootstrap/src && CGO_ENABLED=0 ./make.bash)
```

3\. Verificar que funciona correctamente.

```shell-session
$ gobootstrap/bin/go version
go version go1.4-bootstrap-20170531 linux/amd64
```

4\. Definir la variable de entorno `GOROOT_BOOTSTRAP`.

```shell-session
$ export GOROOT_BOOTSTRAP="$PWD/gobootstrap"
```

### Para otras plataformas

1\. Instalar Go en una de las plataformas soportadas (este es mi primer
artículo recursivo 😂) y [descargar el código fuente](#descarga).

2\. Crear los artefactos de compilación (ajustar los valores de `GOOS` y
`GOARCH` según se necesite).

```shell-session
$ export GOROOT_BOOTSTRAP="$(go env GOROOT)"
```

```shell-session
$ export GOOS=linux GOARCH=arm64
```

```shell-session
$ (cd go/src && GOROOT="" ./bootstrap.bash)
```

3\. Copiar los artefactos generados a la plataforma donde se va a compilar y
descomprimirlos.

```shell-session
$ tar -xf go-linux-arm64-bootstrap.tbz
```

4\. Definir la variable de entorno `GOROOT_BOOTSTRAP`.

```shell-session
$ export GOROOT_BOOTSTRAP="$PWD/go-linux-arm64-bootstrap"
```

## Compilación

1\. ¡Compilar!

```shell-session
$ (cd go/src && GOROOT="" ./all.bash)
```

{{% note %}}
El script `all.bash` también ejecuta todas las pruebas (que es recomendable
hacerlo). Para evitar esto y solo compilar, se puede usar el script
`make.bash`. Si se quieren ejecutar las pruebas en otro paso, se puede usar el
script `run.bash -no-rebuild`.
{{% /note %}}

2\. Verificar que funciona correctamente

```shell-session
$ go/bin/go version
go version go1.17.7 linux/amd64
```

## Instalación

1\. Eliminar cualquier instalación existente

```shell-session
# rm -rf "$(go env GOROOT)"
```

```shell-session
# rm -f "$(command -v gofmt)" "$(command -v go)"
```

2\. Mover a `/usr/lib`

```shell-session
# mv go /usr/lib/
```

3\. Agregar los binarios a la lista de comandos del sistema

```shell-session
# ln -s /usr/lib/go/bin/* /usr/bin/
```

# Atribuciones

**Go Team.** *Download and install.* <https://go.dev/doc/install>

**Go Team.** *Installing Go from source.* <https://go.dev/doc/install/source>

**Dave Cheney.** *Bootstrapping Go 1.5 on non Intel platforms.* <https://dave.cheney.net/2015/10/16/bootstrapping-go-1-5-on-non-intel-platforms>

