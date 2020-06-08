---
title: Representación de la información
date: 2020-06-08T16:00:00-04:00
description: De humanos a autómatas, un vistazo al proceso de transformar la información en algo que las computadoras puedan entender.
rels:
  - .series.technology.software-engineering
tags:
  - tecnología
  - ciencia-de-la-computación
  - fundamentos
  - números-binarios
toc: true
comments: true
---

Además de los pulgares, la habilidad para comunicarse probablemente sea una de
las principales razones del desarrollo de la humanidad. También es cierto que
al menos el 90% de la comunicación humana es inútil, mal formulada,
malinterpretada y malintencionada (no tengo un estudio estadístico que lo
demuestre, es solo por exagerar, como dije, comunicación inútil y
malintencionada 😂), pero el punto es que el humano se comunica, y mucho.

Desde su nacimiento las personas son entrenadas en los mecanismos de
comunicación de la cultura que las rodea, pero el problema es que cuando
alguien de una cultura entra en contacto con personas de otras culturas, la
comunicación se ve afectada o incluso es imposible si no existe un método en
común (el idioma, por ejemplo).

Esto mismo pasa con los autómatas, para que realicen sus tareas primero se les
debe enseñar cómo llevarlas a cabo, y después se les debe entregar la
información que necesiten, pero ¿cómo una persona y un autómata podrían
establecer esta comunicación?.

Actualmente todos los autómatas programables son máquinas electrónicas, por lo
que todo el proceso de traducción de la información está orientado a la
electricidad o el magnetismo. Con la evolución de la informática se han ido
desarrollando diferentes métodos de representación, pero la
[digitalización](#digitalización) es el que ha tenido mayor existo en sus
aplicaciones.

La computación cuántica ha estado ganando mucha popularidad últimamente, pero
su tecnología está en pleno desarrollo (a pesar de que se está investigando
desde los 1980s) y probablemente no sea accesible hasta dentro de unos cuantos
años.

# Digitalización

Consiste en interpretar señales como ceros y unos, lo que la hace muy simple y
más confiable que otras alternativas, como la interpretación analógica. Por
ejemplo:

* En la digitalización, un canal con flujo de electricidad que tenga más de `N`
  electrones se interpreta como un 1 y en caso contrario como un 0, en
  contraste a la interpretación analógica que podría generar valores entre `X`
  y `Y` según el número de electrones.

* En la digitalización, una fuente de luz que esté encendida se interpreta como
  un 1 y en caso contrario como un 0, en contraste a la interpretación
  analógica que podría podría generar valores entre `X` y `Y` según la
  intensidad de la luz.

* En la digitalización, una fuente de sonido que esté generando ondas se
  interpreta como un 1 y en caso contrario como un 0, en contraste a la
  interpretación analógica que podría generar valores entre `X` y `Y` según la
  frecuencia de las ondas.

Para las computadoras estos 0s y 1s representan la unidad mínima de
información, conocida como el bit, pero generalmente, ellas trabajan procesando
secuencias de bits, pues un bit no contiene suficiente información para
realizar tareas comunes. A esta secuencia se le llama byte y de hecho es la
unidad mínima de almacenamiento.

```
        ⬐ bit
 10101010
└────────┘ ← byte
```

El tamaño de un byte es arbitrario, pero por conveniencia se usan 8 bits, pues
ofrece una buena relación información/consumo. Cambiar el tamaño de un byte en
estos tiempos significa prácticamente redefinir el proceso de representación de
la información que se conoce hasta hoy, lo que causaría que una cantidad
gigantesca de dispositivos sean obsoletos.

Ya que las computadoras han ido evolucionando y aumentando sus capacidades a
una velocidad increíble, limitar sus operaciones a 8 bits sería un desperdicio
de recursos pues por ejemplo, un procesador moderno tiene la capacidad de leer
64 bits por operación.

Por esta razón los procesadores usan *words* (*palabras* en español) como
unidad de trabajo, que son secuencias de bytes y representan la unidad máxima
de información que pueden leer por operación, de esta manera se aprovecha la
capacidad del hardware moderno y se mantiene un uso óptimo de recursos en el
hardware antiguo.

```
         ⬐ bit
  10101010  10101010  10101010  10101010
 └────────┘ ← byte
└────────────────────────────────────────┘
           word (CPU de 32 bit)
```

Esto no quiere decir que las computadoras no pueden resolver problemas que
requieren más de 32 o 64 bits de información, sino que es necesario dividirla
en bloques que no sobrepasen este límite. Aquí es donde entran en juegos las
estructuras de datos, que son métodos de programación usados para representar y
procesar información compleja de manera optimizada.

Entonces.. bits, bytes, words, bla bla bla.. pero ¿cómo es posible escribir
libros, capturar imágenes del mundo real, grabar sonidos, jugar videojuegos y
tener todas las utilidades que se tienen en las computadoras? ¿en serio con
solo 0s y 1s?

Para poder realizar todas estas actividades, los profesionales de la
electrónica y la informática han ido desarrollando métodos para interpretar
estos conjuntos binarios, que se han expandido como estándares de la industria,
por lo que la mayoría de las computadoras y sus programas son fabricados
respetando estos estándares.

Por ejemplo, según el contexto en que los programadores usen el byte `10101010`
puede significar diferente cosas:

* Como un número entero sin signo, haciendo una conversión de [número binario](./../../../math/numeral-systems/binary/)
  a número decimal el resultado es `170`.

* Como un número entero con signo, usando el método [Complemento a dos](./../twos-complement/)
  el resultado es `-86`.

* Como un caracter, usando [UTF-8](./../text-encoding/) el resultado es `ª`.

* Como un color, usando [colores de 8 bits](https://en.wikipedia.org/wiki/8-bit_color)
  el resultado es {{< img src="images/8bit-color.png" style="height: 1em" >}}.

Obviamente para realizar cálculos y tareas más complejas se necesitarán más
bytes, pero eso ya queda fuera del alcance de esta explicación.

# Atribuciones

**HarvardX.** *CS50's Introduction to Computer Science.* <https://courses.edx.org/courses/course-v1:HarvardX+CS50+X/course/>

**Khan Acedemy.** *Computer science.* <https://www.khanacademy.org/computing/computer-science>

**Wikipedia.** *Digitization.* <https://en.wikipedia.org/wiki/Digitization>

