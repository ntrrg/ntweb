.. site-description: Es un lenguaje de código abierto, minimalista y de alto rendimiento; su fuerte es la concurrencia.

.. role:: emoji

.. role:: go(code)
    :language: go

=================
[WIP] Golang (Go)
=================

-------
v1.10.1
-------

:Author: Miguel Angel Rivera Notararigo
:Contact: `@ntrrg </es/autores/ntrrg/>`_
:Date: 2018-04-01T22:48:00-04:00
:Category: tecnologia
:Tags: backend; desarrollo; golang;

.. image:: images/index.png
    :class: article-image
    :alt: Golang gopher

__ https://golang.org/LICENSE

Fue diseñado en el año 2007 por Ken Thompson, Rob Pike y Robert Griesemer en
Google. Es de código abierto y es ditribuido bajo una licencia `BSD-style`__.
Algunas de sus características son:

__ https://es.wikipedia.org/wiki/Recolector_de_basura
__ `Utilidades excluidas`_

* Imperativo, los programas se escriben como una serie de instrucciones que la
  computadora debe seguir para resolver un problema (si leyendo esto piensan
  «*¿Y no es así como se escriben todos los programas?* :emoji:`😒`», la
  respuesta es no, existen otros paradigmas de programación que trabajan con
  enfoques muy diferentes a este).

* Compilado, todo el código escrito es traducido a lenguaje máquina antes de
  poder ejecutarse.

* Tipado estático, una vez que se define el tipo de una variable, este no puede
  ser modificado.

* Fuertemente tipado, no permite realizar operaciones entre datos de diferente
  tipo, deben hacerse cambios de tipo explícitamente.

* No es necesario liberar manualmente la memoria asignada, usa un GC__ que se
  encarga de esto, lo que da facilidades en el manejo de memoria.

* Concurrencia y paralelismo de manera nativa (por medio de palabras reservadas
  y operadores, también tiene algunas bibliotecas que permiten aplicar técnicas
  de más bajo nivel).

* Minimalista. La mayoría de las utilidades que faltan en el lenguaje, fueron
  `excluidas intencionalmente`__.

.. contents:: Tabla de contenido

Instalación
===========

__ `Desde el código fuente`_

La forma más rápida de instalar (si se tiene buena conexión a internet
:emoji:`😅`) es descargando la versión binaria, que es la que explico aquí, si
lo quieren compilar desde el código fuente, en `esta sección`__ explico el
procedimiento para hacerlo.

#. Descargar el paquete con los binarios

   .. code:: shell-session

       $ wget https://dl.google.com/go/go1.10.1.linux-amd64.tar.gz

#. Verificar que se haya descargado correctamente (la salida del comando
   ``md5sum`` debe ser igual en cualquier computadora)

   .. code:: shell-session

       $ md5sum go1.10.1.linux-amd64.tar.gz

   .. code:: shell-session

       ad5d557f69f8cb6a6a7773eb374a24c9  go1.10.1.linux-amd64.tar.gz

#. Descomprimirlo en ``/usr/local``

   .. code:: shell-session

       # tar -xvf go1.10.1.linux-amd64.tar.gz -C /usr/local

#. Agregar los binarios a la lista de comandos del sistema

   .. code:: shell-session

       # ln -s /usr/local/go/bin/* /usr/bin/

#. Verificar que se haya instalado correctamente

   .. code:: shell-session

       $ go version

   .. code:: shell-session

       go version go1.10.1 linux/amd64

.. admonition:: Nota

    Es posible instalar Go en una ruta personalizada e incluso sin permisos de
    super usuario, los pasos serían muy parecidos a los anteriores, solo que
    hay que cambiar las rutas y opcionalmente, si se quieren usar algunas
    utilidades, como ver la documentación de los paquetes, se debe definir la
    variable de entorno ``GOROOT``, que le dice al sistema donde está
    instalado Go.

    .. code:: shell-session

        $ export GOROOT="${HOME}/.local/go"

    **Zsh:**

    .. code:: shell-session

        $ echo "export GOROOT=\"${GOROOT}\"" >> ~/.zshenv

    **Bash:**

    .. code:: shell-session

        $ echo "export GOROOT=\"${GOROOT}\"" >> ~/.profile

Desde el código fuente
----------------------

#. Descargar el código fuente

   .. code:: shell-session

       $ wget https://dl.google.com/go/go1.10.1.src.tar.gz

#. Verificar que se haya descargado correctamente (la salida del comando
   ``md5sum`` debe ser igual en cualquier computadora)

   .. code:: shell-session

       $ md5sum go1.10.1.src.tar.gz
       d55e8b2c6272ab1abf5e4e6cdaaca680  go1.10.1.src.tar.gz

#. Todavía no se hacer el resto :emoji:`😅` por ahora usen los binarios

Herramientas
============

Para empezar a programar solo hacen falta dos cosas:

__ Instalación_

* El compilador (las instrucciones para instalarlo están arriba__).
* Un editor de texto.

Aunque ya con esto es más que suficiente para desarrollar tranquilamente,
existen muchas herramientas que ayudan a mejorar la velocidad de trabajo e
integran bastantes utilidades en el flujo de trabajo sin mucha fricción. Las
que yo uso son:

__ https://play.golang.org/
__ https://chrome.google.com/webstore/detail/odfhkelcmblecfdnboahphiafolojmpl

* Gophertool, que es una extensión muy sencilla de Chrome y viene con la
  instalación de Go, específicamente en la carpeta ``misc/chrome/gophertool``.
  Fue creada para ayudar a los programadores del lenguaje con algunos accesos
  rápidos, pero para simple mortales como yo, sirve para buscar en la
  documentación de la biblioteca estándar.

* El `Playground oficial`__ que permite probar código directamente en el
  navegador y `Better Go Playground`__, que es una extensión de Chrome que lo
  hace más amigable.

Archivos Go
===========

Todos los archivos escritos en Go forman parte de un paquete, que es la unidad
de distribución de código en este lenguaje, por esto, todos los archivos deben
iniciar con una línea que contenga :go:`package NOMBRE`, donde ``NOMBRE`` es un
valor asignado por el desarrollador y es el identificador con el que otros
podrán utilizarlo dentro de sus programas (por ahora se ve como una cosa rara,
pero en la sección de Modularización_ se puede ver lo útil que es crear
bibliotecas). Cuando se pretende desarrollar algún comando o alguna aplicación
se usa :go:`package main`, ``main`` es un nombre especial que le dice al
compilador que la intención del archivo no es servir como biblioteca, sino como
un ejecutable.

.. code:: go
    :number-lines:

    package main -> Nombre del paquete
    ...

Después de una línea en blanco, se hace el llamado a los paquetes que se usarán
en el programa (si hace falta ¿no?, no es que sea obligatorio usar al menos un
paquete :emoji:`😂`), por ejemplo, si se quiere escribir algo en pantalla se
debe importar el paquete ``fmt``.

.. code:: go
    :number-lines: 2

    ...
    import "fmt" -> Paquetes importados
    ...

Luego se escriben todas las instrucciones que el programador quiera darle a la
computadora, en el caso de usar ``main``, se debe crear un bloque de código
identificado con el mismo nombre para comunicarle al compilador cuál es el
código que debe ser invocado al usar el ejecutable.

.. code:: go
    :number-lines: 4

    ...
    func main() { ┐
      ...         │-> Bloque de código
    }             ┘

A estos bloques se les llaman funciones_ (por eso el :go:`func` al inicio, que
viene de «*function*») y su principal utilidad es modularizar y reutilizar el
código, muy parecidas a los paquetes, solo que a una escala menor; tienen
cierta sintaxis específica, pero por ahora basta con saber que:

#. Se usa la palabra reservada :go:`func` para iniciar la declaración.

#. Separado por un espacio en blanco se escribe el nombre de la función
   (``main`` en este caso) y unos paréntesis (``()``).

#. Se escribe el código a ejecutar dentro de llaves (``{}``).

__ https://es.wikipedia.org/wiki/Hola_mundo

----

En resumen, todo archivo escrito en Go tendrá la siguiente estructura:

#. Nombre del paquete.
#. Llamados a paquetes externos (opcional).
#. Cuerpo del programa.

Siguiendo estas reglas, el programa más famoso (`hello, world`__) escrito en Go
se vería algo así:

``hola_mundo.go``:

.. include:: go-learning/1-archivos-go/hola_mundo.go
    :code: go
    :number-lines:
    :tab-width: 2

Comentarios
===========

Los comentarios son texto ignorado por el compilador, su función principal es
documentar ciertas secciones de código que sean un poco difíciles de entender a
simple vista, pero en muchas ocasiones también son usados para ocultar código
de los ojos del compilador y ver como se comporta el programa. Existen dos
tipos de comentarios:

* De línea

.. code:: go
    :number-lines:

    fmt.Println("hola, mundo") // Así se escribe un comentario de línea
    // Las sentencias comentadas no son procesadas por el compilador
    // fmt.Println("chao, mundo")

* Generales

.. code:: go
    :number-lines:

    /* Así se escribe un comentario general
    func main() {
        fmt.Println("hola, mundo")
    }

    Este programa no hace nada..
    */

Tipos de datos
==============

.. Numerics
.. Strings
.. Booleans
.. Casting

..     .3. Tipos de variable
..         .1. Simples
..             .1. Numéricos
..             .2. Lógicos
..         .2. Compuestos
..             .1. Cadenas
..             .2. Listas
..             .3. Tuplas
..             .4. Conjuntos
..             .5. Diccionarios
..     .4. Cambio de tipo

https://tour.golang.org/basics/11
https://tour.golang.org/basics/13

Estructuras:

https://tour.golang.org/moretypes/2
https://tour.golang.org/moretypes/3

Arreglos:

https://tour.golang.org/moretypes/6

Porciones:

https://tour.golang.org/moretypes/7
https://tour.golang.org/moretypes/8
https://tour.golang.org/moretypes/9
https://tour.golang.org/moretypes/10
https://tour.golang.org/moretypes/11
https://tour.golang.org/moretypes/12
https://tour.golang.org/moretypes/13
https://tour.golang.org/moretypes/14
https://tour.golang.org/moretypes/15
https://blog.golang.org/go-slices-usage-and-internals

Mapas:

https://tour.golang.org/moretypes/19
https://tour.golang.org/moretypes/20
https://tour.golang.org/moretypes/21
https://tour.golang.org/moretypes/22

Punteros:

https://tour.golang.org/moretypes/1
https://tour.golang.org/moretypes/4
https://tour.golang.org/moretypes/5

Operadores
==========

.. Arithmetic
.. Logical Operators
.. Relational Operators

.. 4. Operadores
..     .1. Asignación
..     .2. Aritmeticos
..     .3. Asignación aumentada
..     .4. Compración
..     .5. Lógicos
..     .6. Binarios

Constantes
==========

https://tour.golang.org/basics/15
https://tour.golang.org/basics/16

Variables
=========

.. 3. Variables
..     .1. Declaración
..     .2. Eliminación

https://blog.golang.org/gos-declaration-syntax
https://tour.golang.org/basics/8
https://tour.golang.org/basics/9
https://tour.golang.org/basics/10
https://tour.golang.org/basics/12
https://tour.golang.org/basics/14

.. code:: go

    var x int = 1

Condiciones
===========

If

https://tour.golang.org/flowcontrol/5
https://tour.golang.org/flowcontrol/6
https://tour.golang.org/flowcontrol/7

Switch

https://tour.golang.org/flowcontrol/9
https://tour.golang.org/flowcontrol/10
https://tour.golang.org/flowcontrol/11

Repeticiones
============

https://tour.golang.org/flowcontrol/1
https://tour.golang.org/flowcontrol/2
https://tour.golang.org/flowcontrol/3
https://tour.golang.org/flowcontrol/4

Funciones
=========

.. Functions
.. Recursion
.. Closures
.. Defer
.. Recover

.. 10. Funciones
..     .1. Declaración
..     .2. Uso
..     .3. Funciones de orden superior
..         .1. Funciones anónimas
..         .2. Decoradores
..     .4. Funciones predefinidas de Python
..         .1. del
..         .2. filter
..         .3. globals
..         .4. len
..         .5. locals
..         .6. map
..         .7. max
..         .8. min
..         .9. next
..         .10. range
..         .11. zip

https://tour.golang.org/basics/4
https://tour.golang.org/basics/5
https://tour.golang.org/basics/6
https://tour.golang.org/basics/7
https://tour.golang.org/flowcontrol/12
https://tour.golang.org/flowcontrol/13
https://blog.golang.org/defer-panic-and-recover
https://tour.golang.org/moretypes/24
https://tour.golang.org/moretypes/25
https://tour.golang.org/methods/5

https://golang.org/doc/codewalk/functions/

Funciones predefinidas
----------------------

``make``

Métodos
=======

https://tour.golang.org/methods/1
https://tour.golang.org/methods/2
https://tour.golang.org/methods/3
https://tour.golang.org/methods/4
https://tour.golang.org/methods/6
https://tour.golang.org/methods/7
https://tour.golang.org/methods/8

Interfaces
==========

.. 11. Clases
..     .1. Declaración
..         .1. Herencia
..         .2. Polimorfismo
..         .3. Métodos especiales
..         .4. Encapsulamiento
..     .2. Uso
..     .3. Métodos predefinidos de Python
..         .1. Cadenas
..         .2. Diccionarios
..         .3. Listas
..         .4. Tuplas
..         .5. Conjuntos

https://tour.golang.org/methods/9
https://tour.golang.org/methods/10
https://tour.golang.org/methods/11
https://tour.golang.org/methods/12
https://tour.golang.org/methods/13
https://tour.golang.org/methods/14
https://tour.golang.org/methods/15
https://tour.golang.org/methods/16

Interfaces predefinidas
-----------------------

``error``

https://tour.golang.org/methods/19

Concurrencia
============

https://tour.golang.org/concurrency/1
https://tour.golang.org/concurrency/9

https://vimeo.com/49718712
https://talks.golang.org/2012/concurrency.slide
https://www.youtube.com/watch?v=f6kdp27TYZs
https://www.youtube.com/watch?v=QDDwwePbDtw

https://www.ardanlabs.com/blog/2014/01/concurrency-goroutines-and-gomaxprocs.html
http://morsmachine.dk/go-scheduler
https://www.ardanlabs.com/blog/2015/02/scheduler-tracing-in-go.html
https://www.ardanlabs.com/blog/2013/09/detecting-race-conditions-with-go.html

Canales

https://tour.golang.org/concurrency/2
https://tour.golang.org/concurrency/3
https://tour.golang.org/concurrency/4
https://tour.golang.org/concurrency/5
https://tour.golang.org/concurrency/6

https://golang.org/doc/codewalk/sharemem/

Patrones
--------

Generator:

Una función que retorna un canal.

https://youtu.be/f6kdp27TYZs?t=14m28s

Multiplexing o FanIn

https://youtu.be/f6kdp27TYZs?t=16m58s

Synced multiplexing

https://youtu.be/f6kdp27TYZs?t=18m28s

Modularización
==============

.. Printf
.. File I/O

.. 5. Entrada y salida de datos
.. 12. Manejo de archivos
..     .1. Modos
..     .2. Métodos y atributos
..     .3. Estructura "with"
.. 13. Programación modular
..     .1. Módulos predefinidos
..         .1. Expresiones regulares (re)
.. 15. Almacenamiento
..     .1. Archivos
..         .1. Binarios
..     .2. Bases de datos

https://tour.golang.org/basics/2
https://tour.golang.org/basics/3

Biblioteca estándar
-------------------

https://vimeo.com/53221558
https://golang.org/doc/articles/wiki/

``fmt.Stringer``

https://tour.golang.org/methods/17

``io.Reader``

https://tour.golang.org/methods/21

Palabras reservadas
===================

``type``

``range``

https://tour.golang.org/moretypes/16
https://tour.golang.org/moretypes/17

Utilidades excluidas
====================

https://www.youtube.com/watch?v=k9Zbuuo51go

Desinstalación
==============

Para desinstalarlo es suficiente con eliminar la carpeta de Go y los enlaces
simbólicos a sus binarios

.. code:: shell-session

    # rm -r /usr/local/go /usr/bin/go{,doc,fmt}

Atribuciones
============

Escribiendo este artículo uso/usé:

__ `Docker site`_

* `Debian <https://www.debian.org/>`_

* `XFCE <https://xfce.org/>`_

* `Terminator <https://gnometerminator.blogspot.com/p/introduction.html>`_

* `st <https://st.suckless.org/>`_

* `Zsh <http://www.zsh.org/>`_

* `GNU Screen <https://www.gnu.org/software/screen/>`_

* `Sublime Text 3 <https://www.sublimetext.com/3>`_

* `NtDocutils <https://ntrrg.github.io/NtDocutils/>`_

* `Chrome <https://www.google.com/chrome/browser/desktop/index.html>`_

* Docker__

**Go Team.** *The Go Programming Language.* https://golang.org/

**Ariel Mashraki.** *An overview of Go syntax and features.* https://github.com/a8m/go-lang-cheat-sheet

.. _Docker site: https://docker.com
