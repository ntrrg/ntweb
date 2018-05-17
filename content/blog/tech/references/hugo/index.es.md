---
title: Hugo
date: 2018-05-06T01:19:25-04:00
image: images/hugo.png
categories:
  - programación
tags:
  - referencias
  - frontend
  - generador-de-sitios-estáticos
  - hugo
  - sitios-web
  - sitios-web-staticos
  - go-templates
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
  inyecciones a los `.yaml` 😂).

* Pueden alojarse con mucha facilidad.

[latest-release]: https://github.com/gohugoio/hugo/releases/tag/v0.40.3

Fue desarrollado inicialmente por Steve Francia y su primera versión estable
fue liberada en 2012. A la fecha (mientras escribía esto 😂) su última
versión estable es la número [0.40.3][latest-release] y algunas de sus
características son:

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

Para realizar sus tareas usa: **Go**, que es un lenguaje de programación
bastante llamativo (mi favorito si me preguntan), se encarga de procesar todos
los archivos y convertirlos en el sitio; **Go HTML Templates** que es un
lenguaje de plantillas implementado en la biblioteca estándar de Go, permite
estructurar muy fácilmente los elementos del sitio y eliminar gran parte de
las tareas repetitivas en la creación de páginas web; **Markdown**, que es un
lenguaje de marcado muy sencillo con el que se escribe el contenido, y aunque
sea posible usar otros lenguajes de marcado, se recomienda no cambiarlo pues se
pierde la garantía de que el sitio sea generado rápidamente (no depende de
Hugo, sino de la herramienta que procese el lenguaje); y algunos más, pero por
ahora es suficiente con resaltar estos tres.

Por suerte, si se usa un tema, solo hace falta conocer un poco de Markdown y
para los casos más extremos de personalización, se deben conocer tecnologías
web y algo de Go HTML Templates. 

