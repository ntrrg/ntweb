---
title: Go (Golang)
date: 2018-05-16T12:23:25-04:00
image: images/gopher.png
description: Es un lenguaje de código abierto, minimalista y de alto rendimiento; su fuerte es la concurrencia.
categories:
  - programación
tags:
  - referencias
  - backend
  - lenguajes-de-programación
  - go
draft: true
---

[Go license]: https://golang.org/LICENSE

Fue diseñado en el año 2007 por Ken Thompson, Rob Pike y Robert Griesemer en
Google. Es de código abierto y es ditribuido bajo una licencia
[BSD-style][Go license]. Algunas de sus características son:

[GC]: https://es.wikipedia.org/wiki/Recolector_de_basura

* Imperativo, los programas se escriben como una serie de instrucciones que la
  computadora debe seguir para resolver un problema (si leyendo esto piensan
  «*¿Y no es así como se escriben todos los programas?* 😒», la respuesta
  es no, existen otros paradigmas de programación que trabajan con enfoques
  muy diferentes a este).

* Compilado, todo el código escrito es traducido a lenguaje máquina antes de
  poder ejecutarse.

* Tipado estático, una vez que se define el tipo de una variable, este no
  puede ser modificado.

* Fuertemente tipado, no permite realizar operaciones entre datos de diferente
  tipo, deben hacerse cambios de tipo explícitamente.

* No es necesario liberar manualmente la memoria asignada, usa un [GC][] que se
  encarga de esto, lo que da facilidades en el manejo de memoria.

* Concurrencia y paralelismo de manera nativa (por medio de palabras reservadas
  y operadores, también tiene algunas bibliotecas que permiten aplicar técnicas
  de más bajo nivel).

* Minimalista. La mayoría de las utilidades que faltan en el lenguaje, fueron
  [excluidas intencionalmente](#).

## Atribuciones

**Go Team.** *The Go Programming Language.* <https://golang.org/>

**Ariel Mashraki.** *An overview of Go syntax and features.* <https://github.com/a8m/go-lang-cheat-sheet>

