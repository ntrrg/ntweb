---
title: Endianness, ordenamiento de bytes
date: 2020-06-11T12:10:00-04:00
description: ¿¡ENDIA QUÉ!? Con simplemente conocer como se puede representar la información en lenguaje máquina no es suficiente, también es necesario entender como es almacenada esta representación en las computadoras.
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

Endianness es un término en inglés que se usa para referirse a la forma en que
se ordena la información en la memoria de las computadoras una vez ha sido
[representada como lenguaje máquina](./../data/#digitalización).

Cuando se está programando con lenguajes de alto nivel (como JavaScript,
Python, PHP, etc...), estos conceptos parecen irrelevante, pero cuando se usan
lenguajes con un nivel de abstracción más bajo (Go, C, Rust, etc...) que
permiten aplicar técnicas más complejas al momento de tratar con la memoria de
las computadoras, estar familiarizado con este tema es una necesidad, pues
puede causar problemas de compatibilidad entre diferentes arquitecturas o
incluso generar problemas que pasen desapercibidos.

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
menor o mayor valor, y resalto byte, por que esto no afecta a sus bits.

# Little-endian

Determina que el primer byte de las words debe ser el de menor valor, lo que
significa que deben ordenarse de manera ascendentes de izquierda a derecha.

```
Arquitectura: 32 bits
Valor: 4.037.694.735

Representación:
  11110000 10101010 01010101 00001111
     1        2        3        4

Representación en memoria:
  00001111 01010101 10101010 11110000
     4        3        2        1
```

Es usado generalmente en aplicaciones de bajo nivel, como los procesadores, que
lo usan para almacenar físicamente los datos en memoria. Uno de sus beneficios
es poder redimensionar información sin tener que mover sus valores a otro
espacio de memoria.

Por ejemplo, suponiendo que previamente se almacenó el número `128` en la
dirección `0x01` de la memoria, si el programador no fue suficientemente
específico (o el lenguaje de programación no se lo permite), es muy probable
que se reserve una word completa en la memoria.

```
Arquitectura: 32 bits
Valor: 128

Representación:
  00000000 00000000 00000000 10000000

Memoria:

     0x01     0x02     0x03     0x04
  +--------+--------+--------+--------+
  |10000000|00000000|00000000|00000000|
  +--------+--------+--------+--------+
```

Si se decide que 4 bytes es mucho espacio, se puede reservar otro espacio más
pequeño de memoria y mover la información relevante.

```
     0x01     0x02     0x03     0x04
  +--------+--------+--------+--------+
  |10000000|00000000|00000000|00000000|
  +--------+--------+--------+--------+
      ↓
  +--------+
  |10000000|
  +--------+
     0x21
```

Pero esto genera varias tareas para el procesador y la dirección de memoria ya
no será la misma. Gracias a little-endian estos problemas pueden evitarse
descartando los últimos tres bytes.

```
     0x01         0x02     0x03     0x04
  +--------+   +--------+--------+--------+
  |10000000|   |········|········|········|
  +--------+   +--------+--------+--------+
```

O en caso que sea necesario expandir en lugar de reducir, se podrían agregar
más bytes al final, siempre y cuando estén disponibles.

```
     0x01     0x02     0x03     0x04     0x05     0x06     0x07     0x08
  +--------+--------+--------+--------+--------+--------+--------+--------+
  |10000000|00000000|00000000|00000000|00000000|00000000|00000000|00000000|
  +--------+--------+--------+--------+--------+--------+--------+--------+
```

Hay que tener en cuenta que esto sucede es a nivel de memoria, a nivel de
programación el valor es traducido a big-endian para facilitar las tareas de
los programadores al momento de realizar operaciones sobre bits (mejor
conocidas como *bitwise operations* en inglés).

# Big-endian

Determina que el primer byte de las words debe ser el de mayor valor, lo que
significa que deben ordenarse de manera descendente de izquierda a derecha, que
es como normalmente los humanos lo hacen.

```
Arquitectura: 32 bits
Valor: 4.037.694.735

Representación:
  11110000 10101010 01010101 00001111
     1        2        3        4

Representación en memoria:
  11110000 10101010 01010101 00001111
     1        2        3        4
```

Es usado generalmente en protocolos de redes, y de hecho en este contexto se le
llama *network byte order*. Uno de sus beneficios es que permite hacer
comparaciones y ordenamiento lexicográfico (alfabético, solo que además del
alfabeto incluye símbolos propios de la matemática y la informática) a nivel de
bits.

Por ejemplo, cuando se intenta ordenar una lista de números es necesario
determinar el valor aritmético de cada elemento para saber cual es mayor o
menor.

```
[128 4 32]

128 = 1*10^2 + 20*10^1 + 8*10^0

 128
  ↓
+---+---+---+
|   |   |   |
+---+---+---+

---

4 = 4*10^0

4 < 128 ✔
  ↓
+---+---+---+
|128|   |   |
+---+---+---+

---

32 = 3*10^1 + 2*10^0

32 < 4 ✘
+---+---+---+
| 4 |128|   |
+---+---+---+

   32 < 128 ✔
      ↓
+---+---+---+
| 4 |128|   |
+---+---+---+

---

             +---+---+---+
[128 4 32] → | 4 | 32|128|
             +---+---+---+
```

> ¿Será posible ordenar los números sin tener que hacer estos cálculos? ¿Qué
> tal usando ese orden lexico..? Ya que suena raro y complicado
> probablemente resuelva todo.

Como expliqué arriba, consiste en comparar los elementos caracter a caracter
(como lo hacemos con las palabras).

```
Orden decimal (ascendente): 0 1 2 3 4 5 6 7 8 9

[128 4 32]

128 = [1 2 8]

 128
  ↓
+---+---+---+
|   |   |   |
+---+---+---+

---

4 = [4]

[4    ]
[1 2 8]

4 < 1 ✘
+---+---+---+
|128|   |   |
+---+---+---+

      4
      ↓
+---+---+---+
|128|   |   |
+---+---+---+

---

32 = [3 2]

[3 2  ]
[1 2 8]

3 < 1 ✘
+---+---+---+
|128| 4 |   |
+---+---+---+

[3 2]
[4  ]

    3 < 4 ✔
      32
      ↓
+---+---+---+
|128| 4 |   |
+---+---+---+

---

             +---+---+---+
[128 4 32] → |128| 32| 4 |
             +---+---+---+
```

> Parece que algo no salió bien.. 😒 ese orden no es tan poderoso como su
> nombre..

Como dicen aquí en Venezuela, *«El problema no es la flecha, es el indio»* (que
debería ser indígena, pero bueno..).

De hecho este es el resultado esperado pues la comparación se hizo a nivel de
carateres y así no es como lo haría la computadora, para que realmente funcione
se debe hacer la comparación a nivel de bits (o agregarle ceros a la izquierda
a los números más pequeños, que es lo que hace la computadora con los bytes). 

```
Arquitectura: 32 bits
Orden binario (ascendente): 0 1

[128 4 32]

128 = [00000000 00000000 00000000 10000000]

 128
  ↓
+---+---+---+
|   |   |   |
+---+---+---+

---

4 = [00000000 00000000 00000000 00000100]

[00000000 00000000 00000000 00000100]
[00000000 00000000 00000000 10000000]

Bit 1: 0 < 0
...
Bit 24: 0 < 0
Bit 25: 0 < 1 ✔
  ↓
+---+---+---+
|128|   |   |
+---+---+---+

---

32 = [00000000 00000000 00000000 00100000]

[00000000 00000000 00000000 00100000]
[00000000 00000000 00000000 00000100] ← 4

Bit 1: 0 < 0
...
Bit 26: 0 < 0
Bit 27: 1 < 0 ✘
+---+---+---+
| 4 |128|   |
+---+---+---+

[00000000 00000000 00000000 00100000]
[00000000 00000000 00000000 10000000] ← 128

Bit 1: 0 < 0
...
Bit 24: 0 < 0
Bit 25: 0 < 1 ✔
      32
      ↓
+---+---+---+
| 4 |128|   |
+---+---+---+

---

             +---+---+---+
[128 4 32] → | 4 | 32|128|
             +---+---+---+
```

> Ahora sí están ordenados! Ya me gusta este orden lexicoalgo 😎

En resumen, big-endian permite saber el resultado de una comparación sin tener
que procesar todos los bits de las words y por la naturaleza de su ordenamiento
se hace más amigable al pensamiento humano.

# Atribuciones

**Wikipedia.** *Endianness.* <https://en.wikipedia.org/wiki/Endianness>

**Go Walkthrough.** *encoding/binary.* <https://medium.com/go-walkthrough/go-walkthrough-encoding-binary-96dc5d4abb5d>

