---
title: Hugo
publishdate: 2018-05-06T01:19:25-04:00
date: 2019-11-14T09:30:25-04:00
image: images/hugo.png
description: El generador de sitios web estáticos más fácil de usar y más rápido del mundo.
tags:
  - tecnología
  - referencias
  - programación
  - programación-web
  - frontend
  - generador-de-sitios-estáticos
  - hugo
toc: true
draft: true
---

Hugo es un generador de sitios web estáticos, este tipo de sitios es llamado
así porque una vez que se crean sus archivos, al acceder a ellos, el contenido
que se obtiene siempre será el mismo.

[Contenido dinámico]: https://es.wikipedia.org/wiki/Contenido_din%C3%A1mico

> El contenido estático es aquél que permanece invariable desde el momento en
> que su autor lo crea. Es decir, no depende de quién lo visualice ni en que
> momento lo haga.
>
> \- Según [este artículo][Contenido dinámico] de Wikipedia.

No quiere decir que sean aburridos o algo así 😅, en realidad esta es una de
sus mejores cualidades pues:

* No hace falta procesar los archivos cuando alguien accede a ellos (más
  rápido! ⚡).

* No hay que preocuparse mucho por la seguridad (dudo que le hagan
  inyecciones a los `.html` 😂).

* Pueden alojarse con mucha facilidad.

[Hugo releases]: https://github.com/gohugoio/hugo/releases/

Fue desarrollado inicialmente por Steve Francia y su primera versión estable
fue liberada en 2012. A la fecha (mientras escribía esto) su última versión
estable es la número [0.59.1][Hugo releases] y algunas de sus características
son:

[Go HTML Templates]: http://golang.org/pkg/html/template/
[Netlify CMS]: https://www.netlifycms.org/
[Forestry]: https://forestry.io
[Hugo features]: https://gohugo.io/about/features/

* Hasta ahora, es el generador de sitios estáticos más rápido.

* Solo hace falta un archivo ejecutable para utilizarlo.

* Soporta temas, que pueden crearse con cualquier tecnología web (HTML, CSS,
  JavaScript, etc...) y [Go HTML Templates][].

* Utilidades de desarrollo que hacen más sencillo el trabajo de edición.

* Gracias a su popularidad, se han ido creando aplicaciones como
  [Netlify CMS][] y [Forestry][] que le facilitan la vida a los editores.

* Un montón más que pueden verse [aquí][Hugo features].

# Herramientas necesarias

[Hugo]: https://gohugo.io
[Vim]: https://www.vim.org/
[Docker]: https://docker.com
[Firefox Developer Edition]: https://www.mozilla.org/en-US/firefox/developer/

1. Un editor de texto (yo uso [Vim][])
2. [Hugo][] o [Docker][]
3. Un navegador web (yo uso [Firefox Developer Edition][])

# ¿Cómo funciona?

Básicamente, Hugo toma como entrada un directorio estructurado, que después de
analizarlo, usará toda la información obtenida para generar el sitio web.

Para realizar sus tareas usa: **Go HTML Templates** que es un lenguaje de
plantillas implementado en la biblioteca estándar de Go, permite estructurar
muy fácilmente los elementos del sitio y eliminar gran parte de las tareas
repetitivas en la creación de páginas web; **Markdown** que es un lenguaje de
marcado muy sencillo con el que se escribe el contenido, y aunque sea posible
usar otros lenguajes de marcado, se recomienda no cambiarlo pues se pierde la
garantía de que el sitio sea generado rápidamente (no depende de Hugo, sino de
la herramienta que procese el lenguaje); y algunas herramientas más, pero por
ahora es suficiente con resaltar estas dos.

Por suerte, si se usa un tema, solo hace falta conocer un poco de Markdown y
para los casos más extremos de personalización, se deben conocer tecnologías
web y algo de Go HTML Templates. 

