---
title: ¿Cómo hacer contribuciones a Go?
publishdate: 2018-07-06T12:42:47-04:00
date: 2020-05-15T10:30:00-04:00
description: Contribuir a Go sin morir en el intento.
image: images/go.png
tags:
  - tecnología
  - guías
  - programación
  - lenguajes-de-programación
  - go
comments: true
toc: true
---

Además de intimidante, hacer una contribución por primera vez en cualquier
proyecto open source suele ser complicado (aunque no lo sea), o por lo menos
para mí suele ser así. Más cuando se trata del código fuente de un lenguaje
de programación, que normalmente tiene a un equipo de genios trabajando sobre
él y sus flujos de trabajo suelen ser complejos.

[Go Contributing]: https://golang.org/doc/contribute.html

Para el caso de Go, hay una [página][Go Contributing] de la documentación
oficial que se enfoca en explicar los pasos para realizar contribuciones y
hacer de este trabajo una tarea más amigable, por lo que gran parte de las
instrucciones que se encuentran aquí son extraídas o están inspiradas en
ella.

# Requisitos

{{% note "Proceso de contribución" %}}
Antes de empezar a trabajar, es bueno tener una idea de como se desarrolla el
proceso de contribución para no sentir que todo funciona por arte de magia y
que hay crear cuentas en sitios específicos solo porque la guía lo dice.

[Go Release Cycle]: https://github.com/golang/go/wiki/Go-Release-Cycle

Cada versión estable de Go tiene un ciclo de desarrollo de seis meses, de los
cuales los primeros tres tienen como meta recibir todos los cambios posibles, y
durante los tres meses restantes solo se recibirán arreglos de fallas o
mejoras en la documentación; para obtener más detalles sobre el ciclo de
desarrollo, es recomendable ir a esta [página][Go Release Cycle].

El repositorio oficial del proyecto está alojado en <https://go.googlesource.com/go>,
la rama `master` es la que recibe todo el código que será utilizado para
generar la próxima versión estable; antes de llegar ahí, el código debe ser
auditado por miembros de la comunidad, esto se hace desde <https://go-review.googlesource.com>;
una vez auditado, dependiendo de la fecha y de cuanto afecten al lenguaje, los
nuevos cambios son mezclados y esperan para ser liberados al final del ciclo de
desarrollo activo; el estado actual del proyecto puede verse desde <https://build.golang.org>.
{{% /note %}}

* [Una cuenta de Google](https://www.google.com/accounts/NewAccount).

* Iniciar sesión en <https://go.googlesource.com>, hacer clic en *Generate
  Password* y seguir las instrucciones.

* [Registrarse en el Gerrit de Go](https://go-review.googlesource.com/login/).

* Firmar el [Contributor License Agreement (CLA)](https://developers.google.com/open-source/cla/individual).

* Git.

* La última versión estable de Go instalada.

{{< card "/blog/install-go-1-14/" >}}

* El código fuente. Se puede clonar desde el repositorio oficial o GitHub.

```shell-session
$ git clone https://go.googlesource.com/go
```

* Instalar dos herramientas que facilitan algunas de las tareas durante el
  desarrollo.

{{% details summary="**git-codereview**" open=true %}}
Permite usar Git para enviar los cambios al Gerrit de Go.

```shell-session
$ go get -u -v golang.org/x/review/git-codereview
```

En la sección [Realizar cambios](#realizar-cambios) muestro los comandos
básicos, pero si se quiere conocer más sobre esta herramienta se puede ver su
ayuda ejecutando el siguiente comando:

```shell-session
$ git codereview help
```
{{% /details %}}

{{% details summary="**go-contrib-init**" open=true %}}
Verifica el entorno de desarrollo y determina si hacen falta algunas
configuraciones.

```shell-session
$ go get -u -v golang.org/x/tools/cmd/go-contrib-init
```
{{% /details %}}

# Realizar cambios

1\. Ir al código fuente de Go.

```shell-session
$ cd go
```

2\. Verificar que esté actualizado y funcione correctamente.

```shell-session
$ git checkout master
```

```shell-session
$ git pull origin master
```

```shell-session
$ (cd src/ && ./all.bash)
```

3\. Crear una rama.

```shell-session
$ git checkout -b fix-1234
```

4\. Hacer los cambios.

Si se modifica el código, todo archivo creado debe tener el texto de licencia.

```go
// Copyright YYYY The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
```

Toda funcionalidad agregada o modificada debe ser probada.

```shell-session
$ unset GOROOT
$ export GOROOT_BOOTSTRAP="$(go env GOROOT)"
$ go-contrib-init
$ cd src
$
$ # Para ejecutar solo algunas pruebas
$ export OLD_GOPATH="$(go env GOPATH)"
$ export GOPATH="$(dirname "$PWD")"
$ ./make.bash
$ "$GOPATH/bin/go" test -run '^TestHostHandlers$' -v net/http
$
$ # Para ejecutar todas las pruebas
$ ./all.bash
```

5\. Confirmar los cambios.

```shell-session
$ git add .
```

```shell-session
$ git codereview gofmt
```

```shell-session
$ git codereview change
```

Este comando solicitará un mensaje para la confirmación, que debería ser algo
como:

```text
PAQUETE: descripción corta que complete "This change modifies Go to ___."

Descripción detallada que responda "¿Por qué se hace la
modificación?" y que no sobrepase los 72 caracteres por línea.

Fixes: #123
```

Si se debe hacer una modificación después de confirmar, simplemente se repite
este paso.

6\. Verificar que el código esté actualizado.

```shell-session
$ git codereview sync
```

Si hay cambios deben ejecutarse nuevamente las pruebas.

7\. Publicar los cambios para que sean auditados.

```shell-session
$ git codereview mail
```

Si se debe hacer una modificación después de la auditoria, simplemente se
repiten los pasos desde el número 4.

# Atribuciones

**Go Team.** *Contributing Guide.* <https://golang.org/doc/contribute.html>

