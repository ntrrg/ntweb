---
title: Endianness, ordenamiento de bytes
date: 2020-06-04T05:50:00-04:00
description: ¿¡ENDIA QUÉ!? Con simplemente conocer como se puede representar la información en lenguaje máquina no es suficiente, también es necesario entender como es almacenada esta representación en las computadoras.
rels:
  - .series.technology.software-engineering
tags:
  - tecnología
  - ciencia-de-la-computación
  - fundamentos
toc: true
comments: true
---

Endianness es un término en inglés que se usa para referirse a la forma en que
se ordena la información en la memoria de las computadoras una vez ha sido
[representada como lenguaje máquina](./../data/#digitalización).

Al momento de diseñar los procesadores, además de decidir su *word size* (que
es *tamaño de palabra* en español), los encargados de esta tarea también
deciden cómo ordenar los bytes que componen las words.

Es bueno recordar que para los humanos (o al menos los de este lado del
planeta), en los sistemas numéricos posicionales, sus elementos están ordenados
de manera descendente según su valor de izquierda a derecha. Esto quiere decir
que en el número `1234`, el número `1` es el que tiene más valor pues
representa `1000`.

Actualmente existen dos métodos de endianess: *little-endian* y *big-endian*,
que respectivamente determinan si el primer **byte** de una word será el de
menor o mayor valor, y resalto **byte**, por que esto no afecta a los bits de
cada byte.

```
Valor: 4.037.694.735
Word:
  11110000 10101010 01010101 00001111
     1        2        3        4

  Little-endian:
    00001111 01010101 10101010 11110000
       4        3        2        1

  Big-endian:
    11110000 10101010 01010101 00001111
       1        2        3        4
```

Aunque puede sonar bastante irrelevante, esta utilidad puede resultar en
grandes cambios en el desempeño del procesador según su tarea.

# Atribuciones

**Wikipedia.** *Endianness.* <https://en.wikipedia.org/wiki/Endianness>

