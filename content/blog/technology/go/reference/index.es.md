---
title: Go (Golang)
date: 2020-06-24T15:30:00-04:00
image: images/go.png
description: Es un lenguaje de código abierto, minimalista y de alto rendimiento. Más que un artículo, esta es una referencia del lenguaje y sus herramientas.
tags:
  - tecnología
  - referencias
  - programación
  - lenguajes-de-programación
  - go
toc: true
comments: false
---

[Go license]: https://golang.org/LICENSE

Es un lenguaje minimalista y de alto rendimiento.  Su fase de diseño inició en
el año 2007 por parte de un equipo de ingenieros de Google, conformado en ese
tiempo por Ken Thompson, Rob Pike y Robert Griesemer; luego de tener una base
estable, se unieron los ingenieros Russ Cox e Ian Lance Taylor. Para inicios
del 2012 se liberó la primera versión estable, de código abierto y distribuida
bajo una licencia [BSD-style][Go license]. Actualmente el proyecto es mantenido
por un equipo financiado por Google y su gran comunidad.

Algunas de sus características más resaltantes son:

[GC]: https://es.wikipedia.org/wiki/Recolector_de_basura

* Imperativo, los programas se escriben como una serie de instrucciones que la
  computadora debe seguir para resolver un problema (leyendo esto se puede
  pensar *«¿Y no es así cómo se escriben todos los programas? 😒»*, 
  la respuesta es no, existen otros paradigmas de programación que trabajan con
  enfoques muy diferentes a este).

* Compilado, todo el código escrito es traducido a lenguaje máquina antes de
  poder ejecutarse, esto significa que no hace falta instalar Go en la máquina
  donde se usará el programa generado.

* Tipado estático, una vez que se define el tipo de una variable, este no puede
  ser modificado.

* Fuertemente tipado, no permite realizar operaciones entre datos de diferente
  tipo, se deben hacer cambios de tipo explícitamente.

* No es necesario liberar manualmente la memoria asignada, usa un [GC][] que se
  encarga de esto, pero también ofrece algunas utilidades de bajo nivel para el
  manejo de memoria.

* Concurrencia y paralelismo de manera nativa (por medio de palabras reservadas
  y operadores), también tiene algunas bibliotecas que permiten aplicar técnicas
  de sincronización.

* Minimalista, la mayoría de las utilidades que faltan en el lenguaje fueron
  [excluidas intencionalmente](#funcionalidades-excluidas).

# Herramientas necesarias

Para empezar a programar solo se necesitan dos cosas:

* Un compilador de código fuente Go.

{{< card "blog/technology/go/install/1-14" >}}

* Un editor de texto.

También existen muchas herramientas que ayudan a aumentar la productividad e
integran bastantes utilidades en el flujo de trabajo sin mucha fricción,
algunas de las que conozco son:

[Playground]: https://play.golang.org/

* [Extensiones para editores de texto](https://github.com/golang/go/wiki/IDEsAndTextEditorPlugins).

* [Herramientas para mejorar el código](https://github.com/golang/go/wiki/CodeTools).

* [Mage](https://magefile.org/) para automatizar tareas (muy parecido a Make).

* [GoDoc](https://godoc.org/golang.org/x/tools/cmd/godoc) para ver la
  [documentación](#documentación) de los paquetes.

* [GolangCI](https://golangci.com) para análisis estático del código.

* [Delve](https://github.com/go-delve/delve) para debugging.

* [reflex](https://github.com/cespare/reflex) para ejecutar comandos cuando se
  modifique un archivo.

* [Go Playground][Playground] para probar código directamente en el navegador.

# Archivos

Un archivo de código fuente Go es un archivo de texto codificado con UTF-8, lo
que permite usar un amplio rango de caracteres naturalmente (como `á`, `ñ`,
`β`, `本` y `😂`).  Cada caracter es único, es decir que `a`, `á`, `à` y `A`
son identificados independientemente.

Algunas de las extensiones usadas son:

[Go Templates]: https://golang.org/pkg/text/template/

* `.go`: para código fuente escrito en Go.
* `.tmpl`, `.gotxt`, `.gohtml`: para [Go Templates][].

La primera línea de código de cualquier archivo Go debe ser la definición del
paquete (ver [Paquetes](#paquetes)).

```go
package main // -> Definición del paquete
```

Después de una línea en blanco, se hace el llamado a los paquetes externos, por
ejemplo, para escribir algo en la salida estándar se debe importar el paquete
`fmt` (ver [Paquetes externos](#paquetes-externos)).

```go
import "fmt" // -> Paquetes importados
```

Luego de otra línea en blanco, se escriben todas las instrucciones.

```go
func main() {                // ┐
  fmt.Println("hola, mundo") // │-> Cuerpo del archivo
}                            // ┘
```

[hello, world]: https://es.wikipedia.org/wiki/Hola_mundo

En resumen, todo archivo escrito en Go tendrá la siguiente estructura:

1. Definición del paquete.
2. Llamado a paquetes externos (opcional).
3. Cuerpo del archivo (opcional).

Siguiendo estas reglas, el programa más famoso ([hello, world][]) escrito en
Go se vería algo así:

{{< go-playground id="hR9ZBMz-Pst" >}}
```go
package main

import "fmt"

func main() {
  fmt.Println("hola, mundo")
}
```
{{< /go-playground >}}

## Paquetes

En Go, la unidad mínima con sentido es el paquete, que es un conjunto de
[Archivos](#archivos) `.go` con el mismo nombre de paquete y están en la misma
carpeta. 

Para definir el nombre del paquete, los archivos deben iniciar con una línea
que contenga `package NOMBRE`, donde `NOMBRE` es un valor arbitrario y es el
identificador con el que otros desarrolladores podrán utilizarlo dentro de sus
programas (ver [Paquetes externos](#paquetes-externos)).

Dentro de un paquete pueden existir archivos de prueba, estos son ignorados al
momento de compilar el paquete, pero serán procesados al usar el comando `go
test`. Los archivos de prueba pueden usar el mismo nombre de paquete que los
demás archivos, pero también es posible agregarle el sufijo `_test`, lo que
permite probar el paquete desde la perspectiva de un usuario (ver
[Pruebas](#pruebas) y [Ejemplos](#ejemplos)).

Todos los archivos de un paquete comparten el ámbito global, por lo que al
declarar un identificador global en un archivo, este podrá ser utilizado en
cualquier otro archivo (ver [Ámbito](#ámbito)).

Cuando se pretende desarrollar un programa, se debe usar `main` como nombre del
paquete. `main` es un valor especial que le dice al compilador que la intención
del paquete es crear un archivo ejecutable y no una biblioteca. También debe
definirse una función que tenga `main` como nombre, esta función es llamada
cuando se ejecute que programa.

## Módulos

Aunque los [Paquetes](#paquetes) son la unidad mínima con sentido para Go, los
módulos son la unidad mínima de distribución, es decir, cuando se quiere
publicar un paquete para que sea usado por otros proyectos, este debe ser
publicado dentro de un módulo.

Un módulo es un conjunto de paquetes, su función es facilitar el manejo de
dependencias y controlar las versiones, para ello se apoya en dos archivos:

* `go.mod`: contiene la ruta del módulo, que es la ruta con la que se deben
  importar sus paquetes; la lista de dependencias con sus versiones; y otras
  ordenes que permiten alterar el comportamiento de la compilación. Su sintaxis
  está orientada a humanos.

* `go.sum`: contiene información detallada sobre las dependencias del módulo,
  asegura el comportamiento del comando `go` en diferentes entornos al momento
  de procesar las dependencias y mantiene la historia de las versiones de las
  dependencias usadas por el módulo. Su sintaxis está orientada a máquinas y su
  contenido es generado automáticamente.

La raíz de un módulo es la carpeta donde se encuentra el archivo `go.mod`,
desde este punto, todos los paquetes dentro de esta carpeta son parte del
módulo, excluyendo las carpetas que contengan otro archivo `go.mod`. Por lo
general la raíz del módulo es la raíz del repositorio de código, pero esto no
es obligatorio.

La primera línea del archivo `go.mod` es la ruta del módulo.

```
module github.com/ntrrg/arithmetic
```

Luego se especifica la versión del lenguaje, lo que permite alterar el
comportamiento del comando `go`, por ejemplo, desde la versión 1.14, si existe
una carpeta `vendor` y un archivo `vendor/module.txt` se usa la opción
`-mod=vendor` de forma predeterminada.

```
go 1.14
```

Y después se declara la lista de dependencias de sus paquetes.

```
require (
  github.com/ghodss/yaml v1.0.0
)
```

En algunos casos, es necesario aplicar parches privados a ciertas bibliotecas
para adaptarlas a las necesidades del proyecto, por esta razón (o cualquier
otro caso de uso) existe `replace`, que le indica al comando `go` donde buscar
el código fuente de la dependencia. **Esto solo funciona cuando el módulo es
compilado directamente, los `replace` de las dependencias son ignorados.**

```
replace github.com/ghodss/yaml v1.0.0 => github.com/ntrrg/yaml v1.0.0-mod.1
```

Se pueden usar rutas del sistema de archivos para agilizar el desarrollo

```
replace github.com/ghodss/yaml v1.0.0 => ../yaml
```

En resumen, el archivo debe verse de la siguiente manera:

`go.mod`:

```
module github.com/ntrrg/arithmetic

go 1.14

require (
  github.com/ghodss/yaml v1.0.0
)

replace github.com/ghodss/yaml v1.0.0 => github.com/ntrrg/yaml v1.0.0-mod.1
```

A partir de la segunda versión, los módulos deben incluir el número de versión
mayor en la ruta del módulo.

```
module github.com/ntrrg/arithmetic/v2
module github.com/ntrrg/arithmetic/v3
...
module github.com/ntrrg/arithmetic/vX
```

Aunque es bastante sencillo crear y modificar el archivo `go.mod` manualmente,
todas estas tareas pueden ser realizadas programáticamente con el comando [`go
mod`](#módulos-go-mod).

# Tipos de datos

Son clasificaciones que permiten decirle al compilador como pretenden usarse
los datos que pasan por el programa. Go cuenta con una estructura muy bien
definida en cuanto a tipos de datos, pero también permite crear nuevos según
las necesidades del programador.

Todos los tipos de datos cuentan con un valor cero, que no quiere decir que
sean literalmente 0, sino que los identifica como *vacío* en su contexto. En
analogía, cuando se habla de personas, su valor cero sería *nadie*; cuando se
habla de objetos, su valor cero sería *nada*; y así dependiendo del contexto.

{{% note %}}
Para explicar la implementación de los tipos de datos muestro cómo es tratada
la información por el lenguaje y cómo es almacenada en memoria.

Debido a que esto puede depender de la arquitectura donde se use el lenguaje,
estos ejemplos probablemente no sean exactos e incluso incorrectos en otras
arquitecturas, específicamente con tipos de datos que usan más de un byte de
memoria (ver [Endianness](./../../computer-science/endianness/)).
{{% /note %}}

## Booleanos

{{% details summary="Enlaces de interés" %}}
* <https://golang.org/ref/spec#Boolean_types>
{{% /details %}}

[George Boole]: https://es.wikipedia.org/wiki/George_Boole

Nombrados así en honor a [George Boole][], también son conocidos como lógicos,
representan valores de verdad (verdadero o falso) que normalmente son usados
para controlar el flujo de los programas.

**Representación sintáctica:**

```go
bool
```

**Representación literal:**

No existen booleanos literales en Go, de hecho este tipo de dato se obtiene
usando los operadores de comparación.

```go
0 == 0 // Verdadero
0 != 0 // Falso
```

Existen dos constantes predefinidas que permiten usar estos valores sin tener
que usar los operadores de comparación.

```go
true  // 0 == 0
false // 0 != 0
```

Pero se debe tener cuidado de no reescribir estos identificadores.

{{< go-playground >}}
```go
package main

import (
  "fmt"
)

const true = 0 != 0

func main() {
  fmt.Println(true)
}
```
{{< /go-playground >}}

**Valor cero:**

```go
false
```

**Implementación:**

Aunque en teoría se pueden representar con 1 bit, su tamaño depende de la
técnica usada por el compilador y de la arquitectura donde trabaje, pero
generalmente ocupan 1 byte.

{{< go-playground >}}
```go
package main

import (
  "fmt"
  "unsafe"
)

func main() {
  x, y := true, false

  fmt.Println("true")
  fmt.Printf("  Tamaño: %v\n", unsafe.Sizeof(x))
  fmt.Printf("  Bits: %08b\n", *(*byte)(unsafe.Pointer(&x)))

  fmt.Println("false")
  fmt.Printf("  Tamaño: %v\n", unsafe.Sizeof(y))
  fmt.Printf("  Bits: %08b\n", *(*byte)(unsafe.Pointer(&y)))
}
```
{{< /go-playground >}}

## Numéricos

Existen tres grupos de datos numéricos:

* Enteros
* Punto flotante
* Complejos

### Enteros

{{% details summary="Enlaces de interés" %}}
* <https://golang.org/ref/spec#Integer_literals>
* <https://golang.org/ref/spec#Numeric_types>
* <https://golang.org/pkg/math/#pkg-constants>
* [Números binarios](./../../../math/numeral-systems/binary-numbers/)
* [Números octales](./../../../math/numeral-systems/octal-numbers/)
* [Números decimales](./../../../math/numeral-systems/decimal-numbers/)
* [Números hexadecimales](./../../../math/numeral-systems/hex-numbers/)
* [Complemento a dos](./../../computer-science/twos-complement/)
{{% /details %}}

Representan los números del conjunto matemático con el mismo nombre, aunque
claro, con una cantidad finita de elementos que puede ser controlada por el
espacio de memoria que se reserve, es decir, el programador tiene la capacidad
de especificar si quiere un número entero que ocupe `N` bits de memoria, donde
`N` puede ser 8, 16, 32 o 64 (1, 2, 4 y 8 bytes respectivamente).

**Representación sintáctica:**

```go
// Sin signo
uint8  uint16  uint32  uint64

// Con signo
int8  int16  int32  int64

// Alias
byte // -> uint8
rune // -> int32, ver Cadenas para más información

// Dependientes de la arquitectura
uint    // -> uint32 o uint64
int     // -> int32 o int64
uintptr // -> uint32 o uint64, para almacenar espacios de memoria
```

**Representación literal:**

Además de números decimales, es posible usar otras notaciones como binarios,
octales y hexadecimales para expresar enteros literales.

Se puede usar el guión bajo (`_`) para separar los números y mejorar su
legibilidad.

```go
5     // Decimal
0b101 // Binario
05    // Octal
0x5   // Hexadecimal

// Binarios (`0b`,`0B`)
0b101
0b_101
0B101
0B_101

// Octales (`0`, `0o`, `0O`)
05
0o5
0o_5
0O5
0O_5

// Hexadecimales (`0x`, `0X`)
0x5
0x_5
0X5
0X_5

// Con signo.
-10
-0b1010
-012
-0xa

// Con separadores (_)
5_000_000           // Separador de miles
+58_123_456_7890    // Teléfono
1234_5678_9012_3456 // Tarjeta de crédito/débito

1_23_4 // SemVer

0x_C1_86_05_48_DC_6C                       // MAC Address
0b_11000000_10101000_00000000_00000001     // Dirección IPv4
0x_2001_0db8_0000_0000_0000_ff00_0042_8329 // Dirección IPv6
```

**Valor cero:**

```go
0
```

**Implementación:**

Los enteros sin signo son almacenados directamente en su representación
binaria. Por otro lado, los enteros con signo son representados usando el
método *Complemento a dos*.

```
10101010 -> 170
⬑ 8 bits -> 0 - 255

⬐ Signo
10101010 -> -86
 ⬑ 7 bits -> -128 - 127

10101010 10101010 -> 43690
⬑ 16 bits -> 0 - 65535

⬐ Signo
01010101 01010101 -> 21845
 ⬑ 15 bits -> -32768 - 32767

10101010 10101010 10101010 10101010 -> 2863311530
⬑ 32 bits -> 0 - 4294967295

⬐ Signo
10101010 10101010 10101010 10101010 -> -1431655766
 ⬑ 31 bits -> -2147483648 - 2147483647

10101010 10101010 10101010 10101010 10101010 10101010 10101010 10101010 -> 12297829382473034410
⬑ 64 bits -> 0 - 18446744073709551615

⬐ Signo
01010101 01010101 01010101 01010101 01010101 01010101 01010101 01010101 -> 6148914691236517205
 ⬑ 63 bits -> -9223372036854775808 - 9223372036854775807
```

### Punto flotante

{{% details summary="Enlaces de interés" %}}
* <https://golang.org/ref/spec#Numeric_types>
* <https://golang.org/ref/spec#Floating-point_literals>
* <https://golang.org/pkg/math/#pkg-constants>
* [Números decimales](./../../../math/numeral-systems/decimal-numbers/)
* [Números hexadecimales](./../../../math/numeral-systems/hex-numbers/)
* [Representación de números de Punto flotante](./../../computer-science/ieee-754/)
{{% /details %}}

Representan al conjunto matemático de los números reales, aunque claro, con una
cantidad finita de elementos, que puede ser controlada por el espacio de
memoria que se reserve, es decir, el programador tiene la capacidad de
especificar si quiere un número de punto flotante que ocupe `N` bits de
memoria, donde `N` puede ser `32` o `64` (4 y 8 bytes respectivamente).

**Representación sintáctica:**

```go
float32  float64
```

**Representación literal:**

Un número de punto flotante literal está compuesto por una parte entera, un
punto (`.`), una parte fraccionaria y un exponente. Se pueden usar números
decimales y hexadecimales para expresarlos (exceptuando el exponente que solo
puede ser un número decimal). El símbolo para identificar el exponente es
`e`/`E` con números decimales y `p`/`P` con números hexadecimales. Cuando se
usan números hexadecimales el exponente es obligatorio.

Se puede usar el guión bajo (`_`) para separar los números y mejorar su
legibilidad.

```
Decimal:

  ⬐ Parte entera
  123.4567e8
          ⬑ Exponente
  
          ⬐ Exponente
  123.4567E8
      ⬑ Fracción

Hexadecimal:

    ⬐ Parte entera
  0xAB.CDp12
         ⬑ Exponente
  
         ⬐ Exponente
  0xAB.CDP12
       ⬑ Fracción
```

```go
0.           // Nivel de bondad en nuestra raza
3.14         // 14/03/1988
-9.8         // El mundo al revés
59724.e20    // Madre tierra
59724e20     // Madre tierra sin punto
.91093e-30   // Inside Out
11312.11e+10 // Straight flush

0x0.p0
0xA.BCp13
0x1Ap15
0x.FEp-17
0xADC.Bp+10
```

**Valor cero:**

```go
0
```

**Implementación:**

Son representados según el estándar *IEEE 754*.

```
⬐ Signo   ⬐ Fracción, 23 bits
10101010 10101010 10101010 10101010
 ⬑ Exponente, 8 bits -> -3.40282346638528859811704183484516925440e+38 - 3.40282346638528859811704183484516925440e+38

⬐ Signo      ⬐ Fracción, 52 bits
10101010 10101010 10101010 10101010 10101010 10101010 10101010 10101010
 ⬑ Exponente, 11 bits -> -1.797693134862315708145274237317043567981e+308 - 1.797693134862315708145274237317043567981e+308
```

### Complejos

{{% details summary="Enlaces de interés" %}}
* <https://golang.org/ref/spec#Numeric_types>
* <https://golang.org/ref/spec#Imaginary_literals>
* <https://golang.org/ref/spec#Constant_expressions>
* <https://golang.org/ref/spec#Complex_numbers>
* [Números de Punto flotante](#punto-flotante)
{{% /details %}}

Representan los números del conjunto matemático con el mismo nombre, aunque
claro, con una cantidad finita de elementos, que puede ser controlada por el
espacio de memoria que se reserve, es decir, el programador tiene la capacidad
de especificar si quiere un número complejo que ocupe `N` bits de memoria,
donde `N` puede ser `64` o `128` (8 y 16 bytes respectivamente).

**Representación sintáctica:**

```go
complex64  complex128
```

**Representación literal:**

Un número complejo literal está compuesto por dos números reales separados por
los símbolos de suma (`+`) o resta (`-`), y el último número debe tener el
símbolo `i` al final. La parte real puede ser omitida y su valor predeterminado
es `0`.

Ver las funciones [`complex`](#complex), [`real`](#real) e [`imag`](#imag).

Se puede usar el guión bajo (`_`) para separar los números y mejorar su
legibilidad.

```go
1 + 2i
3 - 4.5i
7e8 + 9e-10i

// Equivalentes a 0 + IMAGINARIO
1i
2.3i
45.6e7i
```

**Valor cero:**

```go
0
```

**Implementación:**

Son representados en memoria por un par consecutivo de números de punto
flotante.

```
⬐ Parte real, 32 bits               ⬐ Parte imaginaria, 32 bits
10101010 10101010 10101010 10101010 10101010 10101010 10101010 10101010

⬐ Parte real, 64 bits                                                   ⬐ Parte imaginaria, 64 bits
10101010 10101010 10101010 10101010 10101010 10101010 10101010 10101010 10101010 10101010 10101010 10101010 10101010 10101010 10101010 10101010
```

## Vectores

{{% details summary="Enlaces de interés" %}}
* <https://golang.org/ref/spec#Array_types>
* <https://golang.org/ref/spec#Length_and_capacity>
* <https://golang.org/ref/spec#Composite_literals>
* <https://blog.golang.org/slices-intro>
* <https://blog.golang.org/slices>
* <https://research.swtch.com/godata>
{{% /details %}}

Son un conjunto de elementos de un mismo tipo de dato asignado arbitrariamente,
la cantidad de elementos debe ser constante y se le llama *Longitud del
vector*, esta longitud no puede cambiar después de la creación del vector.

Todos los elementos están enumerados iniciando desde 0, a estas posiciones se
les llama *índices* y se usa la notación `x[i]` para acceder a ellos, donde `x`
es un vector e `i` el índice.

```
    +---+---+---+---+---+
x = | 1 | 3 | 5 | 7 | 9 |
    +---+---+---+---+---+
      0   1   2   3   4

x[0] -> 1
x[2] -> 5
x[4] -> 9

x[0] = 0
x[4] = 0

     +---+---+---+---+---+
x -> | 0 | 3 | 5 | 7 | 0 |
     +---+---+---+---+---+
       0   1   2   3   4
```

La longitud de un vector se obtiene directamente desde su tipo de dato y no
contando sus elementos, esto quiere decir que `[5]byte` y `[10]byte` son dos
tipos de datos diferentes.

Por lo general no hace falta obtener la longitud de un vector, pues es un valor
constante, pero si es necesario, se puede usar la función `len(VECTOR)`, que
retorna este valor como un número entero del tipo `int`.

{{< go-playground id="vpsI0bAQlYS" >}}
```go
x := [3]int{1, 2, 3}

len(x)) // 3
```
{{< /go-playground >}}

A diferencia de otros lenguajes, un vector en Go no es un puntero al primero de
sus elementos, sino que representa el bloque de memoria completo, por lo que se
obtiene la ventaja de poder usar los operadores `==` y `!=`. Esto también puede
ser una desventaja pues al momento de usar un vector como argumento de una
función o en una asignación se hará una copia completa del mismo.

**Representación sintáctica:**

```
[LONGITUD]TIPO
```

**Representación literal:**

```go
[5]byte{1, 2, 3, 4, 5}
// [1 2 3 4 5]

[...]byte{1, 2, 3, 4, 5}
// Igual que el anterior, solo que obtiene la longitud automáticamente
// [1 2 3 4 5]

[3]bool{true}
// Se pueden definir solo los primero valores y los demás serán
// inicializados con su valor 0.
// [true false false]

[3]bool{}
// Inicializa todos los elementos con su valor 0
// [false false false]

[5]byte{2: 'M'}
// Se pueden asignar valores a índices específicos, los demás serán
// inicializados con su valor 0
// [0 0 77 0 0]

[...]byte{2: 'M', 'A', 4: 'R', 'N'}
// Si se especifica un índice, los siguientes elementos sin índice
// sumarán uno al valor anterior
// [0 0 77 64 0 82 78]

[...]string{
  "Miguel",
  "Angel",
  "Rivera",
  "Notararigo",
}
// Se pueden usar varias líneas para mejorar la legibilidad, pero
// incluso el último elemento debe tener una coma
// ["Miguel" "Angel" "Rivera" "Notararigo"]

[...]struct{ X, Y float64 }{
  {5, 10},
  {15, 30},
}
// Se puede omitir el tipo de dato en los elementos en datos complejos
// [{5 10} {15 30}]
```

**Valor cero:**

```go
[LONGITUD]TIPO{VALOR_CERO_0 ... VALOR_CERO_N}
```

**Implementación:**

Son implementados como un bloque de memoria que contiene todos sus elementos
consecutivamente, es decir, si se crea un vector de bytes con los cuatro
primeros números pares, el espacio de memoria ocupado por el vector sera 4
bytes (16 bits) y sus elementos se ubicarán en estos bytes según sus indices.

```
    +---+---+---+---+
x = | 2 | 4 | 6 | 8 | -> 1 byte x 4 elementos -> 4 bytes
    +---+---+---+---+
      0   1   2   3

Ubicación en la memoria: 0x10313020

x[0] -> 0 * 1 byte -> 0x10313020 + 0 -> 0x10313020 -> 00000010 -> 2
x[1] -> 1 * 1 byte -> 0x10313020 + 1 -> 0x10313021 -> 00000100 -> 4
x[2] -> 2 * 1 byte -> 0x10313020 + 2 -> 0x10313022 -> 00000110 -> 6
x[3] -> 3 * 1 byte -> 0x10313020 + 3 -> 0x10313023 -> 00001000 -> 8
```

Del mismo modo pasa con los primeros cuatro números pares después del límite de
un byte, la única diferencia es que ocuparán el doble de memoria.

```
    +---+---+---+---+
x = |256|258|260|262| -> 2 bytes (uint16) x 4 elementos -> 8 bytes
    +---+---+---+---+
      0   1   2   3

Ubicación en la memoria: 0x10313020

x[0] -> 0 * 2 bytes -> 0x10313020 + 0 -> 0x10313020 -> 00000001 00000000 -> 256
x[1] -> 1 * 2 bytes -> 0x10313020 + 2 -> 0x10313022 -> 00000001 00000010 -> 258
x[2] -> 2 * 2 bytes -> 0x10313020 + 4 -> 0x10313024 -> 00000001 00000100 -> 260
x[3] -> 3 * 2 bytes -> 0x10313020 + 6 -> 0x10313026 -> 00000001 00000110 -> 262
```

## Porciones

{{% details summary="Enlaces de interés" %}}
* <https://golang.org/ref/spec#Slice_types>
* <https://golang.org/ref/spec#Making_slices_maps_and_channels>
* <https://golang.org/ref/spec#Slice_expressions>
* <https://golang.org/ref/spec#Length_and_capacity>
* <https://golang.org/ref/spec#Appending_and_copying_slices>
* <https://golang.org/ref/spec#Composite_literals>
* <https://blog.golang.org/slices-intro>
* <https://blog.golang.org/slices>
* <https://research.swtch.com/godata>
* <https://github.com/golang/go/wiki/SliceTricks>

https://medium.com/@thatisuday/the-anatomy-of-slices-in-go-6450e3bb2b94
{{% /details %}}

Son un conjunto de elementos de un tipo de dato asignado arbitrariamente como
los vectores, pero con algunas diferencias importantes, entre las cuales
destaca la posibilidad de alterar su tamaño después de crearse, por lo que son
muchos más flexibles y esto hace que sea más común ver su uso.

Es posible obtener porciones de varias maneras, una de ellas es aplicando
*operaciones de porciones* sobre vectores u otras porciones. Estas operaciones
permiten obtener subconjuntos de los elementos a los que se apliquen (de aquí
su nombre), para esto se usa la notación `x[i:j]`, donde `x` es el elemento a
porcionar, `i` es el índice inicial inclusivo y `j` el índice final exclusivo.

```
    +---+---+---+---+---+
x = | 1 | 3 | 5 | 7 | 9 |
    +---+---+---+---+---+
      0   1   2   3   4

          +---+---+---+
x[1:4] -> | 3 | 5 | 7 |
          +---+---+---+
            0   1   2

         +---+---+---+
x[:3] -> | 1 | 3 | 5 |
         +---+---+---+
           0   1   2

Si se omite i, equivale a 0

         +---+---+---+
x[2:] -> | 5 | 7 | 9 |
         +---+---+---+
           0   1   2

Si se omite j, equivale a la longitud (5 en este caso)

        +---+---+---+---+---+
x[:] -> | 1 | 3 | 5 | 7 | 9 |
        +---+---+---+---+---+
          0   1   2   3   4

Si se omiten ambos se obtienen todos los elementos
```

Las porciones no contienen valores directamente, sino que en su lugar hacen
referencia a vectores donde están almacenados estos valores, a estos vectores
se les llaman *vectores internos*. Debido a esto su longitud no indica
realmente cuanta memoria ocupan.

Cuando se aplican operaciones de porciones sobre otras porciones, todas
comparten el mismo vector interno, por lo que al modificar los valores en una
de ellas, estos cambios se reflejarán en todas las demás.

También tienen otro atributo llamado *capacidad*, que indica la cantidad de
elementos que hay desde el inicio de la porción hasta el final del vector
interno.

```
    +---+---+---+---+---+
x = | 1 | 3 | 5 | 7 | 9 |
    +---+---+---+---+---+
      0   1   2   3   4

          +---+---+---+  +---+
x[1:4] -> | 3 | 5 | 7 |  | 9 |
          +---+---+---+  +---+
            0   1   2      3

Longitud: 3
Capacidad: 4

---

         +---+---+---+  +---+---+
x[:3] -> | 1 | 3 | 5 |  | 7 | 9 |
         +---+---+---+  +---+---+
           0   1   2      3   4

Longitud: 3
Capacidad: 5

---

         +---+---+---+
x[2:] -> | 5 | 7 | 9 |
         +---+---+---+
           0   1   2

Longitud: 3
Capacidad: 3

---

        +---+---+---+---+---+
x[:] -> | 1 | 3 | 5 | 7 | 9 |
        +---+---+---+---+---+
          0   1   2   3   4

Longitud: 5
Capacidad: 5
```

Si una porción tiene una capacidad mayor a su longitud, es posible aplicar
operaciones de porciones que sobrepasen su longitud, de esta manera se pueden
obtener los elementos que no se incluyeron en ella originalmente.

```
    +---+---+---+---+---+
x = | 1 | 3 | 5 | 7 | 9 |
    +---+---+---+---+---+
      0   1   2   3   4

y = x[:3]

     +---+---+---+  +---+---+
y -> | 1 | 3 | 5 |  | 7 | 9 |
     +---+---+---+  +---+---+
       0   1   2      3   4

Longitud: 3
Capacidad: 5

         +---+---+---+---+---+
y[:5] -> | 1 | 3 | 5 | 7 | 9 |
         +---+---+---+---+---+
           0   1   2   3   4

y[3]  // Error, sobrepasa la longitud
y[:6] // Error, sobrepasa la capacidad
```

Si se agrega un tercer índice a la sintaxis de porciones, este determina hasta
qué índice exclusivo llega su capacidad, su sintaxis es `x[i:j:k]`, `k` debe
ser mayor o igual que `j`. Cuando se usa este modo, solo `i` es opcional.

```
b = x[:3:4]

     ┌─────┬───┬───┐    ┌─┬─┬─┐ ┌─┐
b -> │&x[0]│ 3 │ 4 │ -> │1│3│5│ │7│
     └─────┴───┴───┘    └─┴─┴─┘ └─┘
       ptr  lon cap      0 1 2   3

b[:]  -> [1 3 5]
b[:2] -> [1 3]
b[:4] -> [1 3 5 7]
b[:5] -> Error, sobrepasa la capacidad
```

Para obtener la longitud y la capacidad de una porción se deben usar las
funciones `len(PORCIÓN)` y `cap(PORCIÓN)`, ambas retornan un número entero del
tipo `int`.

{{< go-playground id="l9D0hIL8Mpl" >}}
```go
x := [5]int{1, 2, 3, 4, 5}
y := x[1:4]

len(y) // 3
cap(y) // 4
```
{{< /go-playground >}}

Es posible inicializar una porción sin valores literales, para esto se puede
usar la función `make`, que recibe tres argumentos: el tipo de porción, la
longitud y opcionalmente la capacidad.

{{< go-playground id="QqtBDs72WGQ" >}}
```go
x := make([]bool, 3)
// [false false false]

y := make([]byte, 3, 5)
// [0 0 0]

z := y[:cap(y)]
// [0 0 0 0 0]
```
{{< /go-playground >}}

Existen dos funciones que ayudan con el trabajo cotidiano de las porciones, la
primera es `append`, que permite agregar elementos al final de una porción,
recibe como argumentos una porción de un tipo específico y una lista de
datos del mismo tipo, retorna una nueva porción que dependiendo de la
capacidad, reutilizará el arreglo referenciado por la porción pasada como
argumento o creará uno nuevo que pueda almacenar los elementos.

{{< go-playground id="gaW_r9YvadO" >}}
```go
a := []byte{1, 2, 3, 4, 5}
b := a[:3]
c := a[2:]

// [1 2 3 4 5]
// [1 2 3] 3 5
// [3 4 5] 3 3

x := append(b, 6)

// La capacidad de b es 5 y su longitud 3, esto quiere decir que
// todavía quedan 2 (5-3) índices reusables en el arreglo referenciado,
// por lo que se agregará el nuevo valor en el índice después de la
// porción (3)

// [1 2 3 6 5]
// [1 2 3] 3 5
// [3 6 5] 3 3
// [1 2 3 6] 4 5

y := append(c, 7, 8)

// La capacidad de c es 3 y su longitud 3, esto quiere decir que
// no quedan índices reusables en el arreglo referenciado, por lo que
// se creará uno nuevo que logre almacenar los valores, pero con una
// capacidad un poco difícil de predecir pues por ahora no hay un
// comportamiento definido en la especificación del lenguaje y puede
// variar entre sus implementaciones

// [1 2 3 6 5]
// [1 2 3] 3 5
// [3 6 5] 3 3
// [1 2 3 6] 4 5
// [3 6 5 7 8] 5
```
{{< /go-playground >}}

La segunda función es `copy`, se encarga de copiar elementos de una porción a
otra, recibe dos porciones del mismo tipo como argumento y la primera es a la
que se copiarán los elementos, al finalizar retorna la cantidad de elementos
copiados, que es determinada por la mínima longitud entre ambas porciones.

{{< go-playground id="zmWI34jS_Pv" >}}
```go
x := make([]int, 2)
y := []int{1, 2, 3, 4}

copy(x, y)     // 2
fmt.Println(x) // [1 2]

a := []byte{'a', 'b', 'c', 'o', 'u'}
b := "aei"

copy(a, b)     // 3
fmt.Println(a) // "aeiou"

n := []bool{true, true, false, false, true}
m := []bool{false, true}

copy(n[1:3], m) // 2
fmt.Println(n)  // [true false true false true]
```
{{< /go-playground >}}

Ya que las porciones solo tienen una referencia a un arreglo, pasarlas como
argumentos es una operación muy ligera, pero esto quiere decir que cualquier
modificación que se haga a los valores de una porción, afectará a las demás con
el mismo arreglo.

```
    ┌─┬─┬─┬─┐
x = │2│4│6│8│
    └─┴─┴─┴─┘
     0 1 2 3

y = [:3]
z = [1:]

x -> [2 4 6 8]
y -> [2 4 6]
z -> [4 6 8]

x[1] = 3

x -> [2 3 6 8]
y -> [2 3 6]
z -> [3 6 8]

y[0] = 1

x -> [1 3 6 8]
y -> [1 3 6]
z -> [3 6 8]

z[2] = 9

x -> [1 3 6 9]
y -> [1 3 6]
z -> [3 6 9]
```

El vector interno de las porciones solo es liberado cuando ya no existen más
porciones que hacen referencia a él. Esto quiere decir que aunque solo exista
una porción con un elemento de un vector con mil elementos, todos estos mil
elementos se mantendrán en memoria, por lo que en algunos casos puede resultar
conveniente solo copiar los valores que se necesiten.

**Representación sintáctica:**

```
[]TIPO
```

**Representación literal:**

```go
[]byte{1, 2, 3, 4, 5} // [1 2 3 4 5]

[]byte{2: 'M'} // [0 0 77]
               // Se pueden asignar valores a índices específicos,
               // los demás serán inicializados con su valor 0

[]byte{2: 'M', 'A', 4: 'R', 'N'} // [0 0 77 64 0 82 78]
                                 // Si se especifíca un índice, los
                                 // siguientes elementos sin índice
                                 // sumarán uno al valor anterior

[]string{       // Se pueden usar varias líneas para mejorar la
  "Miguel",     // legibilidad
  "Angel",
  "Rivera",
  "Notararigo", // Pero incluso el último elemento debe tener una coma
}

[]struct{ X, Y float64 }{
  struct{ X, Y float64 }{5, 10},

  {15, 30}, // Se puede omitir el tipo de dato en los elementos
}
```

**Valor cero:**

```go
nil
```

**Implementación:**

Otra diferencia con los arreglos, es la forma en la que son implementadas
internamente por el lenguaje, pues en lugar de representar bloques de memoria,
son estructuras de datos que contienen un puntero a un elemento de un arreglo;
una longitud, que determina la cantidad de elementos que pertenecen a la
porción después del referenciado por el puntero; y una capacidad, que es la
máxima longitud que puede tener la porción, calculada por la cantidad de
elementos desde el referenciado por el puntero hasta el final del arreglo.

```
    +---+---+---+---+---+
x = | 1 | 3 | 5 | 7 | 9 |
    +---+---+---+---+---+
      0   1   2   3   4

y = x[:2]

     +-----+---+---+    +-+-+ +-+-+-+ 
y -> |&x[0]| 2 | 5 | -> |1|3| |5|7|9| 
     +-----+---+---+    +-+-+ +-+-+-+ 
       ptr  lon cap      0 1   2 3 4

     ┌─────┬───┬───┐    ┌─┬─┐ ┌─┬─┬─┐ 
y -> │&x[0]│ 2 │ 5 │ -> │1│3│ │5│7│9│ 
     └─────┴───┴───┘    └─┴─┘ └─┴─┴─┘ 
       ptr  lon cap      0 1   2 3 4

y[:]  -> [1 3]
y[:2] -> [1 3]
y[:5] -> [1 3 5 7 9]
y[:6] -> Error, sobrepasa la capacidad
y[2]  -> Error, sobrepasa la longitud

z = x[1:4]

     ┌─────┬───┬───┐    ┌─┬─┬─┐ ┌─┐
z -> │&x[1]│ 3 │ 4 │ -> │3│5│7│ │9│
     └─────┴───┴───┘    └─┴─┴─┘ └─┘
       ptr  lon cap      0 1 2   3

z[:]  -> [3 5 7]
z[:2] -> [3 5]
z[:4] -> [3 5 7 9]
z[:5] -> Error, sobrepasa la capacidad
y[3]  -> Error, sobrepasa la longitud

a = x[3:]

     ┌─────┬───┬───┐    ┌─┬─┐
a -> │&x[3]│ 2 │ 2 │ -> │7│9│
     └─────┴───┴───┘    └─┴─┘
       ptr  lon cap      0 1

a[:]  -> [7 9]
a[:2] -> [7 9]
a[:3] -> Error, sobrepasa la capacidad
a[2]  -> Error, sobrepasa la longitud
```

## Cadenas

{{% details summary="Enlaces de interés" %}}
* <https://golang.org/ref/spec#String_types>
* <https://golang.org/ref/spec#String_literals>
* <https://golang.org/ref/spec#Rune_literals>
* <https://blog.golang.org/strings>
* <https://research.swtch.com/godata>
* [Porciones](#porciones)
* [Codificación de texto](./../../computer-science/text-encoding.es.md)
{{% /details %}}

Son secuencias de símbolos que representan el sistema de escritura humano. Por
lo general a cada uno de estos símbolos se les llama caracter y de hecho, el
nombre completo de este tipo de dato es *Cadena de caracteres*.

**Representación sintáctica:**

```go
string
```

**Representación literal:**

Existen dos tipos de cadenas literales: las cadenas sin formato, que almacenan
el texto justo como se ve en la pantalla; y las cadenas interpretadas, que
permiten usar secuencias de escape para representar caracteres especiales.

Para la definición de cadenas interpretadas se usan las comillas (`"`) y para
las cadenas sin formato los acentos graves (<code>\`</code>).

{{< go-playground id="M0lvf5r9D8p" >}}
```go
"Soy una cadena interpretada\ny puedo procesar secuencias de escape 😎"
// Soy una cadena interpretada
// y puedo procesar secuencias de escape 😎

`Soy una cadena sin formato\ny no puedo procesar secuencias de escape 😔

Pero puedo tener varias líneas,
quien es mejor ahora 😒`
// Soy una cadena sin formato\ny no puedo procesar secuencias de escape 😔
//
// Pero puedo tener varias líneas,
// quien es mejor ahora 😒
```
{{< /go-playground >}}

A diferencia de otros lenguajes de programación, el apóstrofo (`'`) se usa para
representar runas literales, no cadenas. Las runas son caracteres individuales
y representan valores numéricos, específicamente el valor UTF-8 del caracter.

{{< go-playground >}}
```
"M" -> M
'M' -> 77

"😄" -> 😄
'😄' -> 128516
```

--- PLAYGROUND ---

```go
package main

import "fmt"

func main() {
  fmt.Println("M")
  fmt.Println('M')
  fmt.Println("😄")
  fmt.Println('😄')
}
```
{{< /go-playground >}}

Las cadenas interpretadas y las runas tienen la capacidad de procesar
secuencias de escape, estas secuencias son caracteres precedidos por una barra
invertida (`\`) que les permite alterar su comportamiento.

```go
"\a" // Bell character
"\b" // Backspace
"\t" // Horizontal tab
"\n" // Line feed
"\v" // Vertical tab
"\f" // Form feed
"\r" // Carriage return
"\"" // Quotation mark
"\\" // Backslash

'\a' // 7
'\b' // 8
'\t' // 9
'\n' // 10
'\v' // 11
'\f' // 12
'\r' // 13
'\'' // 39
'\\' // 92

// Unicode - Versión corta (u y 4 dígitos)
"\u004d" // "M"
'\u004d' // 77

// Unicode - Versión larga (U y 8 dígitos)
"\U0000004D" // "M"
'\U0000004D' // 77
"\U00F1F064" // "😄"
'\U00F1F064' // 128516

// Bytes (UTF-8) - Octales (3 dígitos)
"\115"             // "M"
'\115'             // 77
"\360\237\230\204" // "😄"
'\360\237\230\204' // Error, las runas no soportan más de un byte escapado

// Bytes (UTF-8) - Hexadecimales (x y 2 dígitos)
"\x4D"             // "M"
'\x4D'             // 77
"\xF0\x9F\x98\x84" // "😄"
'\xF0\x9F\x98\x84' // Error, las runas no soportan más de un byte escapado
```

**Valor cero:**

```go
""
```

**Implementación:**

Las cadenas son estructuras de datos muy parecidas a las porciones, pero se
diferencian en que son inmutables y no tienen capacidad, por lo que su tamaño
es de 2 words. Su vector interno es de tipo `[...]byte`, por lo que puede
intercambiarse entre porciones de tipo `[]byte` y `[]rune`.

```
"hola mundo"

Cadena:

  +-----+-----+
  | 0x1 |  10 |
  +-----+-----+
    ptr   lon

Vector interno:

 0x1
  ↓
  +---+---+---+---+---+---+---+---+---+---+
  |104|111|108| 97| 44|109|117|110|100|111|
  +---+---+---+---+---+---+---+---+---+---+
    0   1   2   3   4   5   6   7   8   9
```

{{< go-playground id="yHrBgqgfqE9" >}}
```go
x := "Hola"

x[2] = 'L' // Error
cap(x)     // Error
```
{{< /go-playground >}}

Como su unidad mínima es el byte y no la runa, es posible que cadenas como
`Hola` y `😂` tengan la misma longitud.

{{< go-playground id="oCaft33c5jj" >}}
```go
len("Hola") // 4
// "Hola" es una cadena compuesta por cuatro bytes, cada uno
// representa una runa.
// 'H' ->  72 -> U+0048 -> 01001000
// 'o' -> 111 -> U+006F -> 01101111
// 'l' -> 108 -> U+006C -> 01101100
// 'a' ->  92 -> U+0061 -> 01100001

len("😂") // 4
// "😂" es una cadena compuesta por cuatro bytes, todos
// representan una runa
// '😂' -> 128514 -> U+1F602 -> 11110000 10011111 10011000 10000010
```
{{< /go-playground >}}

Realizar operaciones de índices sobre las cadenas puede resultar en un
comportamiento inesperado, pues cada índice contiene un byte y no una runa.

{{< go-playground id="y0O2H_Y91Tc" >}}
```go
x := "😂"

for i := 0; i < len(x); i++ {
  fmt.Println(x[i])
}

// 240 -> 11110000
// 159 -> 10011111
// 152 -> 10011000
// 130 -> 10000010
```
{{< /go-playground >}}

Para evitar esto se puede usar `range`, que extrae runa a runa.

{{< go-playground id="CcnClPYtrEn" >}}
```go
for _,  v := range "😂" {
  fmt.Println(v)
}

// 128514
```
{{< /go-playground >}}

También se puede usar [`utf8.DecodeRuneInString`](https://golang.org/pkg/unicode/utf8/#DecodeRuneInString)
en los casos que no se quiera iterar sobre la cadena o se necesite más control.

{{< go-playground id="cStYBcRb9ZX" >}}
```go
x := "😂"

// Sin iteración, retorna la primera runa y la cantidad de bytes que la
// componen.
utf8.DecodeRuneInString(x) // 128514 4

// Equivale a usar range
for i := 0; i < len(x); {
  v, w := utf8.DecodeRuneInString(x[i:])
  fmt.Println(v)
  i += w
}

// 128514
```
{{< /go-playground >}}

Solo es posible obtener la dirección de memoria de la cadena completa, no de
sus caracteres individualmente.

{{< go-playground >}}
```go
x := "hola, mundo"
y := &x
z := &x[0] // Error
```

--- PLAYGROUND ---

```go
package main

import "fmt"

func main() {
  x := "hola, mundo"
  y := &x
  z := &x[0]

  fmt.Println(y)
  fmt.Println(z)
}
```
{{< /go-playground >}}

## Mapas

{{% details summary="Enlaces de interés" %}}
* <https://tour.golang.org/moretypes/19>
* <https://tour.golang.org/moretypes/20>
* <https://tour.golang.org/moretypes/21>
* <https://tour.golang.org/moretypes/22>
* <https://golang.org/ref/spec#Map_types>
* <https://golang.org/ref/spec#Composite_literals>
* <https://golang.org/ref/spec#Length_and_capacity>
* <https://golang.org/ref/spec#Deletion_of_map_elements>
* <https://golang.org/ref/spec#Making_slices_maps_and_channels>
* <https://blog.golang.org/go-maps-in-action>
* <https://golang.org/ref/spec#Comparison_operators>

https://hackernoon.com/some-insights-on-maps-in-golang-rm5v3ywh
{{% /details %}}

**Nota:** cada vez que mencione a los arreglos, también hago referencia a los
demás tipos que derivan de ellos, como las porciones y las cadenas.

Son una estructura de datos que permite acceder a valores por medio de índices
del tipo especificado (que no sea función, porción o mapa, pues no son valores
comparables) durante su definición, a estos índices se les llaman claves, y a
diferencia de los arreglos, el orden de sus elementos es irrelevante.

La especificación del lenguaje no regula la manera en que son implementados,
por lo que cada compilador puede tener su propia forma de manejarlos, lo único
que debe mantenerse es que sean tipos de datos referenciales, como las
porciones o los punteros.

Para crear mapas se pueden usar valores literales.

{{< go-playground id="FGRrpitkgtQ" >}}
```go
x := map[string]int {
  "cero": 0,
  "uno":  1,
  "dos":  2,
  "tres": 3,
}
```
{{< /go-playground >}}

O la función `make`, que permite crear mapas vacíos, recibe como argumentos un
tipo de mapa y opcionalmente una capacidad aproximada, que a diferencia de las
porciones no representa un límite, sino la cantidad de elementos a las que se
les reservará memoria automáticamente, esto evitará futuras tareas de
reservación de memoria por lo que mejorará el rendimiento, pero estos espacios
no serán contados en su longitud hasta que reciban algún valor, cosa que puede
comprobarse usando la función `len(MAPA)`, que retorna la cantidad de elementos
dentro del mapa y la representa con un número entero del tipo `int`.

{{< go-playground id="p1eBzG_B9_G" >}}
```go
x := make(map[string]bool, 10)

x["go"] = true
x["javascript"] = true
x["python"] = true
x["php"] = true
x["c#"] = false

len(x) // 5
```
{{< /go-playground >}}

Al igual que los arreglos, para acceder a sus valores se usan los corchetes
(`[]`). Intentar acceder a una clave que no existe retornará el valor cero del
tipo de dato que pueda recibir el mapa, para verificar la existencia de una
clave se debe realizar una doble asignación, la primera variable recibirá el
valor almacenado, y la segunda variable un booleano que será `true` si la clave
existe o `false` en caso contrario.

{{< go-playground id="61Is7Ve_W4G" >}}
```go
x := map[string][]int{
  "pares": {2, 4, 6, 8},
  "impares": {1, 3, 5, 7, 9},
}

y := x["impares"]   // [1 3 5 7 9]
z, ok := x["pares"] // [2 4 6 8] true

a := x["fraccionales"] // []
b, ok := x["enteros"]  // [] false
```
{{< /go-playground >}}


La creación de nuevos pares clave-valor y la modificación de valores existentes
son tareas bastante sencillas, que consisten en simplemente referenciar la
clave que se quiere crear/modificar y asignarle un valor.

{{< go-playground id="BCPhbpeY_K3" >}}
```go
x := map[bool][]interface{}{
  true: []interface{}{0, "True", []int{1, 2}},
}

x[false] = []interface{}{0, "", []int(nil)}     // Asignación
x[true] = []interface{}{1, "True", []int{1, 2}} // Modificación
```
{{< /go-playground >}}

Ya que sus claves no ofrecen ninguna garantía de orden, usar `range` o
simplemente mostrarlos como una cadena podría resultar en un comportamiento
impredecible.

{{< go-playground id="89nUjKLW7nn" >}}
```go
x := map[string]struct{ X, Y float64 }{
  "l1": struct{ X, Y float64 }{5, 10},
  "l2": {15, 30},
  "l3": {25, 50},
  "l4": {35, 70},
  "l5": {45, 90},
}

// Orden aleatorio

fmt.Println(x)
fmt.Println(x)

for k, v := range x {
  fmt.Println(k, v)
}

// Orden predecible gracias al patrón en las claves

for i := 1; i <= len(x); i++ {
  k := fmt.Sprintf("l%v", i)

  fmt.Println(k, x[k])
}
```
{{< /go-playground >}}

Es posible eliminar elementos de los mapas con la función `delete`, que recibe
como argumentos un mapa y la clave del elemento a ser eliminado.

{{< go-playground id="tN0s8GaicHo" >}}
```go
x := map[int]string{
  0: "cero",
  1: "uno",
  2: "dos",
  1<<30: "infinito",
}

delete(x, 1<<30)
```
{{< /go-playground >}}

### Representación sintáctica

```go
map[TIPO_CLAVE]TIPO_VALOR
```

Ejemplos

```go
map[string]int{
  "Miguel": 6,
  "Angel": 5,
  "Rivera": 6,
  "Notararigo": 10,
}

map[string]struct{ X, Y float64 }{
  "Lugar 1": struct{ X, Y float64 }{5, 10},

  "Lugar 2": {15, 30}, // Se puede omitir el tipo de dato en los
                       // elementos
}
```

### Valor cero

```go
nil
```

## Punteros

<https://tour.golang.org/moretypes/1>
<https://tour.golang.org/moretypes/4>
<https://tour.golang.org/moretypes/5>

https://medium.com/@tsriharsha/go-pointers-demystified-1f0710ec07eb?source=email-a31d0d6d29a8-1567949207790-digest.reader------1-72------------------8bc995d4_3097_48ed_9a8a_a5b3671db869-28-----&sectionName=quickReads

## Funciones

https://medium.com/@thatisuday/variadic-function-in-go-5d9b23f4c01a?source=email-a31d0d6d29a8-1564151216975-digest.reader------1-59------------------b2899319_64bf_4d5b_85d8_d2f36e4fa32c-1&sectionName=top

https://medium.com/@blanchon.vincent/go-how-does-defer-statement-work-1a9492689b6e?source=email-a31d0d6d29a8-1564584261942-digest.reader------2-59------------------3e0d9573_1bfe_429f_a97a_0cadc9847da0-16&sectionName=recommended

https://medium.com/@lizrice/variables-and-functions-in-go-oh-my-18b71297657?source=email-a31d0d6d29a8-1567861183904-digest.reader------0-72------------------1d7b57d8_9f84_4952_b6a4_98b369cd75b6-28-----&sectionName=quickReads

https://medium.com/rungo/anatomy-of-methods-in-go-f552aaa8ac4a

```
A estos bloques se les llaman funciones (por eso el `func` al inicio, que viene
de *«function»*) y su principal utilidad es modularizar y reutilizar el
código, muy parecidas a los paquetes, solo que a una escala menor; tienen
cierta sintaxis específica, pero por ahora basta con saber que:

* Se usa la palabra reservada `func` para iniciar la declaración.

* Separado por un espacio en blanco se escribe el nombre de la función
  (`main` en este caso) y unos paréntesis (`()`).

* Se escribe el código a ejecutar dentro de llaves (`{}`).

Funciones main() e init()

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

```

## Interfaces

https://medium.com/@blanchon.vincent/go-understand-the-empty-interface-2d9fc1e5ec72?source=email-a31d0d6d29a8-1566652227517-digest.reader------1-72------------------b9b80b28_9c12_4cde_a97e_10b142e29d6b-28-----&sectionName=quickReads

```
https://tour.golang.org/methods/9
https://tour.golang.org/methods/10
https://tour.golang.org/methods/11
https://tour.golang.org/methods/12
https://tour.golang.org/methods/13
https://tour.golang.org/methods/14
https://tour.golang.org/methods/15
https://tour.golang.org/methods/16
https://research.swtch.com/interfaces

Interfaces predefinidas
-----------------------

``error``

https://tour.golang.org/methods/19

```

## Estructuras

<https://tour.golang.org/moretypes/2>
<https://tour.golang.org/moretypes/3>
* <https://research.swtch.com/godata>

## Cambios de tipos

<https://tour.golang.org/basics/13>

<https://golang.org/ref/spec#Conversions>

# Operadores

```go
Arithmetic
Logical Operators
Relational Operators

4. Operadores
    .1. Asignación
    .2. Aritmeticos
    .3. Asignación aumentada
    .4. Compración
    .5. Lógicos
    .6. Binarios

+    &     +=    &=     &&    ==    !=    (    )
-    |     -=    |=     ||    <     <=    [    ]
*    ^     *=    ^=     <-    >     >=    {    }
/    <<    /=    <<=    ++    =     :=    ,    ;
%    >>    %=    >>=    --    !     ...   .    :
     &^          &^=
```

# Identificadores

{{% details summary="Enlaces de interés" %}}
* <https://golang.org/ref/spec#Identifiers>
* <https://en.wikipedia.org/wiki/Template:General_Category_(Unicode)>
* <https://www.compart.com/en/unicode/category>
{{% /details %}}

Son los nombres que se asignan a los elementos del programa, como por ejemplo
los tipos, las constantes, las variables, las funciones, etc... Un
identificador es un conjunto de letras (Unicode Lu, Ll, Lt, Lm y Lo), números
(Unicode Nd) y guiones bajos (`_`), pero el primer caracter no puede ser un
número.

Cuando un paquete es importado, solo sus identificadores exportados son
accesibles por medio de un identificador calificado, que es la unión del nombre
del paquete, un punto (`.`) y el identificador del elemento.

```go
import "fmt" // Paquete

fmt.Println // Identificador calificado
```

Para exportar un identificador se debe usar una letra mayúscula (Unicode Lu)
como primer caracter. Esto también afecta a los campos de las estructuras y los
métodos de los tipos de datos.

**Ejemplos:**

```go
a
_x9
áéíóúñ
αβ
Exportado
```

Los siguientes identificadores no deben ser utilizados pues tienen un
significado especial para Go:

```go
// Palabras reservadas
break      case    chan     const        continue
default    defer   else     fallthrough  for
func       go      goto     if           import
interface  map     package  range        return
select     struct  switch   type         var

// Tipos de datos
bool     byte     complex64  complex128  error
float32  float64  int        int8        int16
int32    int64    rune       string      uint
uint8    uint16   uint32     uint64      uintptr

// Constantes
true  false  iota

// Valor cero
nil

// Funciones
append   cap   close    complex  copy   delete
imag     len   make     new      panic  print
println  real  recover

// Identificadores especiales
init
```

# Constantes

https://tour.golang.org/basics/15

https://tour.golang.org/basics/16

* <https://golang.org/ref/spec#Constants>
* <https://golang.org/ref/spec#Constant_expressions>
* <https://golang.org/ref/spec#Complex_numbers>

<https://blog.golang.org/constants>

<https://husobee.github.io/golang/compile/time/variables/2015/12/03/compile-time-const.html>

```go
const (
  x = 2
  y = 3i
)

x + y // (2+3i)
```

# Variables

.. 3. Variables
..     .1. Declaración
..     .2. Eliminación

https://blog.golang.org/gos-declaration-syntax
https://tour.golang.org/basics/8
https://tour.golang.org/basics/9
https://tour.golang.org/basics/10
https://tour.golang.org/basics/12
https://tour.golang.org/basics/14

# Ámbito

# Estructuras de control

If

https://tour.golang.org/flowcontrol/5
https://tour.golang.org/flowcontrol/6
https://tour.golang.org/flowcontrol/7

Switch

https://tour.golang.org/flowcontrol/9
https://tour.golang.org/flowcontrol/10
https://tour.golang.org/flowcontrol/11

## `for`

https://tour.golang.org/flowcontrol/1
https://tour.golang.org/flowcontrol/2
https://tour.golang.org/flowcontrol/3
https://tour.golang.org/flowcontrol/4

https://tour.golang.org/moretypes/16
https://tour.golang.org/moretypes/17

https://medium.com/@mlowicki/for-statement-and-its-all-faces-in-golang-abcbdc011f81?source=email-a31d0d6d29a8-1581146147068-digest.reader------1-1------------------01531b7f_6b93_450e_9394_af0ec95ae789-1-----&sectionName=top

# Manejo de errores

<https://golang.org/ref/spec#Handling_panics>

<https://blog.golang.org/error-handling-and-go>

https://medium.com/@boltmick1/golang-handling-errors-gracefully-8e27f1db729f?source=email-a31d0d6d29a8-1564241076435-digest.reader------3-59------------------c8286857_9b13_4aef_be99_348604a8e035-1&sectionName=top

* Excepciones y afirmaciones (asserts). Usar estructuras de control (como
  `try {} catch {}`) para manejar los errores puede resultar en flujos
  complejos que dificultan el seguimiento y mantenimiento del código. Es
  innegable que estas estructuras pueden ser de gran ayuda, pero en algunos
  casos suelen usarse para manejar los errores de manera perezosa, lo que puede
  generar interrupciones inesperadas de los servicios. En su lugar los errores
  se manejan por medio del mecanismo de retorno múltiple en las funciones. Go
  cuenta con .

https://github.com/upspin/upspin/blob/master/errors/errors.go

https://medium.com/@arindamroy/simple-guide-to-panic-handling-and-recovery-in-golang-72d6181ae3e8?source=email-a31d0d6d29a8-1573458402958-digest.reader------0-59------------------1d028e49_51cc_44e0_bbfd_fd89caf50479-1-----&sectionName=top

# Concurrencia

<https://medium.com/rungo/achieving-concurrency-in-go-3f84cbf870ca>

https://medium.com/@abhishek1987/using-synchronization-primitives-in-go-mutex-waitgroup-once-2e50359cb0a7?source=email-a31d0d6d29a8-1572700255263-digest.reader------0-58------------------6e3c59bc_ad51_4584_b5be_8a413b78a33d-1-----&sectionName=top

https://medium.com/@kharekartik/why-goroutines-are-not-lightweight-threads-7c460c1f155f?source=email-a31d0d6d29a8-1564151216975-digest.reader------2-59------------------b2899319_64bf_4d5b_85d8_d2f36e4fa32c-1&sectionName=top

https://medium.com/@blanchon.vincent/go-buffered-and-unbuffered-channels-29a107c00268?source=email-a31d0d6d29a8-1564755255546-digest.reader------1-38------------------1e51b133_30d1_48c1_b54e_76c82e8c2894-1&sectionName=top

https://medium.com/@blanchon.vincent/go-understand-the-design-of-sync-pool-2dde3024e277?source=email-a31d0d6d29a8-1565363247300-digest.reader------2-59------------------d8c67597_cf06_4a6f_a5b3_5fe1b055b8d0-16&sectionName=recommended

https://medium.com/@michal.bock/managing-groups-of-gorutines-in-go-ee7523e3eaca?source=email-a31d0d6d29a8-1572605532186-digest.reader------0-71------------------3944457b_fb4d_4b24_a987_c56dd8538aa4-27-----&sectionName=icymi

https://medium.com/@rakyll/context-propagation-over-http-in-go-d4540996e9b0?source=email-a31d0d6d29a8-1564326246011-digest.reader------1-59------------------c7458ddf_dd98_4053_8efd_1978c60ba6bd-16&sectionName=recommended

https://medium.com/@jayaganesh1997/concurrency-golang-c65f2dec91db?source=email-a31d0d6d29a8-1567255491972-digest.reader------0-72------------------e277e963_5de1_46b0_b416_cceb8501d0e6-28-----&sectionName=quickReads

https://medium.com/@psinghal04/a-goroutines-gotcha-7d7441c7758f?source=email-a31d0d6d29a8-1567342921634-digest.reader------2-72------------------aaf557d7_0815_464c_8266_3d2bd812442c-28-----&sectionName=quickReads

https://medium.com/@blanchon.vincent/go-concurrency-bugs-in-go-7d3677a1f2a2?source=email-a31d0d6d29a8-1568035050392-digest.reader------0-72------------------fffcbd55_d07d_4594_b621_6aedfb0601b4-28-----&sectionName=quickReads

```
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

https://medium.com/@mayank.gupta.6.88/understanding-goroutine-go-channels-in-detail-9c5a28f08e0d?source=email-a31d0d6d29a8-1572869853494-digest.reader------0-58------------------3db022d1_5ef8_46fc_89df_af57f66bf2a7-1-----&sectionName=top

Patrones
--------

Generator:

Una función que retorna un canal.

https://youtu.be/f6kdp27TYZs?t=14m28s

Multiplexing o FanIn

https://youtu.be/f6kdp27TYZs?t=16m58s

Synced multiplexing

https://youtu.be/f6kdp27TYZs?t=18m28s

```

https://blog.golang.org/context

# Comentarios

{{% details summary="Enlaces de interés" %}}
* <https://golang.org/ref/spec#Comments>
{{% /details %}}

Los comentarios son texto ignorado por el compilador, su función principal es
documentar ciertas secciones de código que sean un poco difíciles de entender
a simple vista, pero en muchas ocasiones también son usados para ocultar
código de los ojos del compilador y ver como se comporta el programa. Existen
dos tipos de comentarios:

* De línea

{{< go-playground id="4g5BEqD0RGU" >}}
```go
fmt.Println("hola, mundo") // Esto muestra "hola, mundo"

// Las sentencias comentadas no son procesadas por el compilador
// fmt.Println("chao, mundo")
```
{{< /go-playground >}}

* Generales

{{< go-playground id="4HyigTWqiZ8" >}}
```go
/*
  Así se escribe un comentario general

  fmt.Println("hola, mundo")
  fmt.Println("chao, mundo")

  Este programa no hace nada..
*/
```
{{< /go-playground >}}

# Documentación

{{% details summary="Enlaces de interés" %}}
* <https://blog.golang.org/godoc-documenting-go-code>
{{% /details %}}

Los comentarios también pueden usarse para automatizar la generación de la
documentación. El objetivo principal de la documentación son las definiciones
exportadas (`package`, `const`, `var`, `type`, `func`, etc...), solo aquellas
precedidas directamente por una o más líneas de comentarios son procesadas como
documentación.

Es común (y una buena práctica) que cada comentario inicie con el
identificador del elemento que se quiere documentar, con la excepción de:

* El nombre del paquete, que debería iniciar con la palabra `Package` y luego
  sí el nombre del paquete.

* Las constantes y variables agrupadas, que suele ser suficiente con documentar
  el grupo y no cada una de ellas.

`arithmetic/go.mod`:

```
module arithmetic

go 1.14
```

`arithmetic/arithmetic.go`:

```go
// Package arithmetic provides arithmetic operations for any type.
package arithmetic

// Identity constants
const (
  AdditiveIdentity       = 0
  MultiplicativeIdentity = 1
)

// Operander is the interface that wraps the arithmetic representation
// methods.
//
// Val returns the variable's arithmetic representation (float64).
type Operander interface {
  Val() float64
}

// Add gets any number of Operander and returns their addition.
func Add(operands ...Operander) float64 {
  result := operands[0].Val()

  for _, v := range operands[1:] {
    if v.Val() == AdditiveIdentity {
      continue
    }

    result += v.Val()
  }

  return result
}
```

Cuando se tiene un paquete con múltiple archivos, cada uno de ellos tendrá la
sentencia `package NOMBRE`, pero esto no quiere decir que sea necesario repetir
el comentario del paquete en cada archivo, en realidad basta con que uno de los
archivos lo tenga (si varios archivos contienen este comentario, se unirán).

Si la documentación es algo extensa, se recomienda crear un archivo `doc.go`
que contenga solo en nombre del paquete y su comentario de documentación.

```go
/*
Package arithmetic provides arithmetic operations for any type.

This is a long description of the Arithmetic package.

  type Operand string

  func (o Operand) Val() float64 {
    return float64(len(o))
  }

  func main() {
    var x, y Operand = "a", "b"

    r := Add(x, y)
    fmt.Println(r)
  }

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
euismod egestas elit sed viverra. Nunc tincidunt lacinia orci in
mattis. Praesent cursus neque et dapibus faucibus. Maecenas at
sem ut arcu ornare commodo. Morbi laoreet diam sit amet est
ultricies imperdiet. Proin ullamcorper ac massa a accumsan.
Praesent quis bibendum tellus. Sed id velit libero. Fusce dapibus
purus neque, sit amet sollicitudin odio porttitor posuere. Mauris
eu dui elementum, fermentum ante vitae, porttitor nunc. Duis mi
elit, viverra at turpis vitae, sollicitudin aliquet velit.
Pellentesque nisl turpis, pulvinar et consectetur et, iaculis vel
leo. Suspendisse euismod sem at vehicula fermentum. Duis viverra
eget ante a accumsan.

Aenean dui lectus, ultrices at elit id, pellentesque faucibus
dolor. Duis blandit vulputate est, eget sollicitudin ipsum
pellentesque quis. Cras sed nibh sed sapien suscipit tincidunt
venenatis id eros. Praesent laoreet, erat quis hendrerit
dignissim, justo diam semper elit, sit amet commodo lacus ipsum
eget nisl. In a mi tellus. In hac habitasse platea dictumst.
Aliquam et neque a quam mollis molestie. Etiam tempor arcu quis
justo molestie congue.
*/
package arithmetic
```

Para obtener la documentación se usa el comando `go doc` dentro de la carpeta
del módulo.

```shell-session
$ cd arithmetic
$ go doc -all .
```

## GoDoc

[GoDoc]: https://godoc.org

[GoDoc][] es una herramienta que permite obtener la documentación en formato
HTML y tiene algunas funcionalidades extras. Para instalarlo se debe ejecutar
el siguiente comando:

```shell-session
$ go get -v https://golang.org/x/tools/cmd/godoc
```

GoDoc puede dar formato especial a algún texto si tiene:

* Formato de URL, será convertido en un enlace HTML.

* Indentación, será convertido en un bloque de código.

* El formato `IDENTIFICADOR(USUARIO): DESCRIPCIÓN.`, será agregado a la lista
  de notas del paquete. `IDENTIFICADOR` puede ser cualquier combinación de más
  de dos letras mayúsculas. El identificador `BUG` tiene el comportamiento
  especial de crear una lista de fallas conocidas en la página del paquete.

`arithmetic/go.mod`:

```
module arithmetic

go 1.14
```

`arithmetic/arithmetic.go`:

```go
/*
Package arithmetic provides arithmetic operations for any type.

  import "arithmetic"

See https://ntrrg.dev/ for more info.

BUG: This may have a bug.
*/
package arithmetic
```

Se debe ejecutar dentro de la carpeta del módulo y luego abrir <http://localhost:6060/>
con un navegador web

```shell-session
$ cd arithmetic
$ godoc -http :6060
```

También es posible habilitar el Playground, lo que permite correr [Ejemplos](#ejemplos)
directamente desde la interfaz web.

```shell-session
$ godoc -http :6060 -play
```

# Pruebas

## Ejemplos

{{% details summary="Enlaces de interés" %}}
* <https://blog.golang.org/examples>
{{% /details %}}

Los ejemplos son pruebas especiales que permiten demostrar el uso del paquete y
sus elementos desde la perspectiva de un usuario, por lo que son ideales para
pruebas de integración.

Al igual que las pruebas, su código vive dentro de archivos con el sufijo
`_test`. Para crear un ejemplo del paquete se debe declarar una función con el
nombre `Example`; por otro lado, si el objetivo del ejemplo es un elemento en
específico, se debe agregar su nombre al de la función (`ExampleELEMENTO`); y
si el objetivo es un método, se deben agregar además, un guión bajo y el nombre
del método (`ExampleELEMENTO_MÉTODO`).

Al final de cada función debe existir el comentario especial `// Output:`, que
indica los valores esperados, estos valores deben ser escritos por la salida
estándar.

`arithmetic/go.mod`:

```
module arithmetic

go 1.14
```

`arithmetic/arithmetic.go`:

```go
package arithmetic

func Add(operands ...int) int {
  result := operands[0]

  for _, v := range operands[1:] {
    result += v
  }

  return result
}

func Sub(operands ...int) int {
  result := operands[0]

  for _, v := range operands[1:] {
    result -= v
  }

  return result
}
```

`arithmetic/example_test.go`:

```go
package arithmetic_test

import (
  "fmt"

  a "arithmetic"
)

func Example() {
  r := a.Add(1, 2) - a.Sub(3, 4)
  fmt.Println(r)
  // Output: 4
}

func ExampleAdd() {
  r := a.Add(1, 2, 3, 4)
  fmt.Println(r)
  // Output: 10
}

func ExampleSub() {
  r := a.Sub(5, 3, 1)
  fmt.Println(r)
  // Output: 1
}
```

Para verificar los ejemplos se usa el comando el comando `go test`.

```shell-session
$ go test -v ./...
=== RUN   Example
--- PASS: Example (0.00s)
=== RUN   ExampleAdd
--- PASS: ExampleAdd (0.00s)
=== RUN   ExampleSub
--- PASS: ExampleSub (0.00s)
PASS
ok  	arithmetic
```

Si el orden del resultado no es estrictamente igual en cada ejecución, se puede
usar el comentario especial `// Unordered Output:`.

```go
func ExampleUnordered() {
  fmt.Println(5)
  fmt.Println(3)
  fmt.Println(1)
  // Unordered Output:
  // 1
  // 3
  // 5
}
```

Para crear múltiples ejemplos de un mismo elemento, se deben agregar un guión
bajo, una letra minúscula y cualquier otra cantidad de caracteres después de
esta.

`arithmetic/multiexample_test.go`:

```go
package arithmetic_test

import (
  "fmt"

  a "arithmetic"
)

func ExampleAdd_two() {
  r := a.Add(1, 2)
  fmt.Println(r)
  // Output: 3
}

func ExampleAdd_five() {
  r := a.Add(1, 2, 3, 4, 5)
  fmt.Println(r)
  // Output: 15
}
```

```shell-session
$ go test -v ./...
=== RUN   Example
--- PASS: Example (0.00s)
=== RUN   ExampleAdd
--- PASS: ExampleAdd (0.00s)
=== RUN   ExampleSub
--- PASS: ExampleSub (0.00s)
=== RUN   ExampleAdd_two
--- PASS: ExampleAdd_two (0.00s)
=== RUN   ExampleAdd_five
--- PASS: ExampleAdd_five (0.00s)
PASS
ok  	arithmetic
```

Como los ejemplos son representados por funciones, no es posible demostrar
algunas características como la implementación de interfaces, los ejemplos de
archivo existen con este propósito y consisten en un archivo con una función de
ejemplo y todas las definiciones a nivel de paquete que sean necesarias.

`arithmetic-interface/go.mod`:

```
module arithmetic

go 1.14
```

`arithmetic-interface/arithmetic.go`:

```go
package arithmetic

type Operander interface {
  Val() float64
}

func Add(operands ...Operander) float64 {
  result := operands[0].Val()

  for _, v := range operands[1:] {
    result += v.Val()
  }

  return result
}
```

`arithmetic-interface/whole_file_example_test.go`:

```go
package arithmetic_test

import (
  "fmt"

  a "arithmetic"
)

type Operand string

func (o Operand) Val() float64 {
  return float64(len(o))
}

func ExampleAdd() {
  var x, y Operand = "a", "b"

  r := a.Add(x, y)
  fmt.Println(r)
  // Output: 2
}
```

```shell-session
$ go test -v ./...
=== RUN   ExampleAdd
--- PASS: ExampleAdd (0.00s)
PASS
ok  	arithmetic
```

Además del comando `go test`, los ejemplos pueden ser visualizados y ejecutados
directamente desde la interfaz web de [GoDoc](#godoc).

```shell-session
$ godoc -http :6060 -play
```

# Funciones predefinidas

## `complex`

Permite crear números complejos, sus parámetros son dos números que representan
su parte real e imaginaria respectivamente. Si los dos números son constantes,
el valor retornado por esta función también es una constante.

## `real`

## `imag`

que hacen lo opuesto, pues permiten extraer la parte real e imaginaria de un
número complejo respectivamente.

# Paquetes externos

Para usar paquetes externos se usa la palabra reservada `import`, que recibe la
ruta del módulo y la ruta de la carpeta que contiene al paquete.

```go
import "go.ntrrg.dev/ntgo/net/http"
```

Si se importan múltiples paquetes es más conveniente usar la versión compuesta
de `import`.

```go
import (
  "log"
  "os"

  "go.ntrrg.dev/ntgo/net/http"
)
```

Se recomienda que los paquetes importados sean agrupados por su origen y
ordenados lexicográficamente.

```go
import (
  // Biblioteca estándar
  "log"
  "os"

  // Paquetes externos
  "go.ntrrg.dev/ntgo/net/http"

  // Paquetes del mismo módulo
  "arithmetic/operations"
)
```

También es posible usar un nombre alternativo para el paquete externo, para
esto solo hace falta definir un nuevo identificador justo después de la palabra
reservada `import`.

```go
import nthttp "go.ntrrg.dev/ntgo/net/http"
```

```go
import (
  nthttp "go.ntrrg.dev/ntgo/net/http"
  ntos "go.ntrrg.dev/ntgo/os"
)
```

Si se usa `.` como nombre alternativo, todos los identificadores exportados del
paquete formarán parte del ámbito del archivo.

```go
import . "go.ntrrg.dev/ntgo/os"

func main() {
  // os.Copy("b.txt", "a.txt")
  Copy("b.txt", "a.txt")
}
```

Si se usa `_` como nombre alternativo, solo se inicializarán los
identificadores del paquete y se ejecutarán sus funciones `init`. Esto resulta
útil para hacer configuraciones especializadas, como con bases de datos.

```go
import (
  "database/sql"

  _ "github.com/go-sql-driver/mysql" // Hace configuraciones para MySQL
)
```

Aunque regularmente el nombre del paquete es el mismo que el de su carpeta, en
algunos casos puede resultar útil que esto no sea así, pues por ejemplo, un
repositorio que contenga APIs para múltiples lenguajes podría usar `mylib-go`
para identificar que esta carpeta contiene la implementación escrita en Go.

```go
import "github.com/example/mylib/mylib-go"
```

Pero sus usuarios deben usar el identificador que se haya definido en la línea
que contenga `package`, que probablemente sería algo como `mylib`.

# Biblioteca estándar

{{% details summary="Enlaces de interés" %}}
{{% /details %}}

```
https://vimeo.com/53221558
https://golang.org/doc/articles/wiki/

``fmt.Stringer``

https://tour.golang.org/methods/17

``io.Reader``

https://tour.golang.org/methods/21

```

# Runtime

https://medium.com/@blanchon.vincent/go-memory-management-and-allocation-a7396d430f44?source=email-a31d0d6d29a8-1573039798635-digest.reader------1-58------------------2369e6b2_ad91_4d92_8cec_7adad38256f2-1-----&sectionName=top

https://medium.com/@blanchon.vincent/go-goroutine-os-thread-and-cpu-management-2f5a5eaf518a?source=email-a31d0d6d29a8-1574445753784-digest.reader------0-58------------------90e0a977_d54a_4db2_9fa2_74736dd26dbf-1-----&sectionName=top

https://medium.com/@blanchon.vincent/go-work-stealing-in-go-scheduler-d439231be64d?source=email-a31d0d6d29a8-1575631391501-digest.reader------0-72------------------45a42352_c358_4c8e_b152_f3c2ae24207f-28-----&sectionName=quickReads

https://www.ardanlabs.com/blog/2017/05/language-mechanics-on-stacks-and-pointers.html

https://blog.golang.org/ismmkeynote

https://blog.learngoprogramming.com/a-visual-guide-to-golang-memory-allocator-from-ground-up-e132258453ed

# Toolchain (`go`)

{{% details summary="Enlaces de interés" %}}
* <https://golang.org/pkg/go/build/>
{{% /details %}}

GOPATH

GOROOT

GOTPMDIR

<https://getstream.io/blog/how-a-go-program-compiles-down-to-machine-code/>

https://medium.com/@blanchon.vincent/go-overview-of-the-compiler-4e5a153ca889?source=email-a31d0d6d29a8-1568035050392-digest.reader------1-59------------------fffcbd55_d07d_4594_b621_6aedfb0601b4-1-----&sectionName=top

El compilador ofrece dos métodos para ejecutarlo: el primero y más sencillo es
usando el comando `go run`.

```shell-session
$ go run hola_mundo.go
hola, mundo
```

El segundo método es compilar el código fuente y ejecutar el archivo binario
que se genere.

```shell-session
$ go build -o hola hola_mundo.go
$ ./hola
hola, mundo
```

El comando `go run` hace esto mismo, solo que crea un archivo temporal y lo
ejecuta automáticamente.

## Módulos (`go mod`)

{{% note %}}
Esta sección no contiene información sobre qué son los módulos, ver
[Módulos](#módulos) para obtener esta información.
{{% /note %}}

El comando `go mod` permite crear y modificar el archivo `go.mod`; obtener
información del módulo y sus dependencias; y descargar el código fuente de las
dependencias.

{{% details "Ejemplo" %}}
`main.go`

```go
package main

import (
  "fmt"
  "io/ioutil"
  "os"
  "path/filepath"

  "github.com/ghodss/yaml"
  "go.ntrrg.dev/ntgo/reflect/arithmetic"
)

func main() {
  cfgFile := os.Args[1]

  data, err := ioutil.ReadFile(filepath.Clean(cfgFile))
  if err != nil {
    panic(err)
  }

  if err := yaml.Unmarshal(data, &cfg); err != nil {
    panic(err)
  }

  var fn func(...interface{}) float64

  switch cfg.Operation {
  case "add":
    fn = arithmetic.Add
  case "sub":
    fn = arithmetic.Sub
  case "mul":
    fn = arithmetic.Mul
  case "div":
    fn = arithmetic.Div
  default:
    panic(fmt.Errorf("Invalid operation: %s", cfg.Operation))
  }

  r := fn(cfg.Operands...)
  fmt.Println(arithmetic.GetVal(r))
}

var (
  cfg struct {
    Operation string        `json="operation"`
    Operands  []interface{} `json="operands"`
  }
)
```

`config.yaml`

```yaml
operation: add
operands:
  - 1
  - 2
  - 3
```
{{% /details %}}

Para crear el archivo `go.mod` se usa el comando `go mod init`.

```shell-session
$ go mod init github.com/ntrrg/calc
```

`go.mod`:

```
module github.com/ntrrg/calc

go 1.14
```

Para modificar la ruta del módulo se usa el comando `go mod edit`.

```shell-session
$ go mod edit -module github.com/ntrrg/calc
```

Para seleccionar una versión de Go diferente a la actual se usa el comando `go
mod edit`.

```shell-session
$ go mod edit -go 1.14
```

Las dependencias son detectadas automáticamente cuando alguno de los comandos
`go run`, `go build`, `go get`, `go install`, `go list`, `go test`, `go mod
graph`, `go mod tidy` o `go mod why` es ejecutado.

```shell-session
$ go run main.go config.yaml
go: finding module for package go.ntrrg.dev/ntgo/reflect/arithmetic
go: finding module for package github.com/ghodss/yaml
...
```

`go.mod`:

```
module github.com/ntrrg/calc

go 1.14

require (
  github.com/ghodss/yaml v1.0.0 // indirect
  go.ntrrg.dev/ntgo v0.6.0 // indirect
  gopkg.in/yaml.v2 v2.3.0 // indirect
)
```

Se usarán las últimas versiones estables de las dependencias al momento de
ejecutar el comando, pero esto puede no ser conveniente pues alguna dependencia
podría haber hecho cambios que rompen la compatibilidad con versiones
anteriores y generar algún error.

Para asegurar la versión apropiada de una dependencia se usa el comando `go mod
edit`.

```shell-session
$ go mod edit -require go.ntrrg.dev/ntgo@v0.5.0
```

Pero este comando es de bajo nivel y su uso es recomendado solo para
herramientas que se encarguen del manejo de las dependencias, por lo que es
mejor usar el comando `go get`.

```shell-session
$ go get go.ntrrg.dev/ntgo@v0.5.0
```

`go.mod`:

```
module github.com/ntrrg/calc

go 1.14

require (
  github.com/ghodss/yaml v1.0.0 // indirect
  go.ntrrg.dev/ntgo v0.5.0 // indirect
  gopkg.in/yaml.v2 v2.3.0 // indirect
)
```

Suponiendo que el módulo tenga las versiones `v1.0.0`, `v1.0.1`, `v1.1.0`,
`v1.2.0` y `v1.3.0-rc.1`; es posible especificar cual seleccionar de diferente
maneras:

* Con la versión completa (`vX.Y.Z`), que apunta a la versión especificada.

* Con el prefijo de una versión (`vX`, `vX.Y`), que apunta a la versión más
  reciente que tenga ese prefijo. Si se usa `v1.0` la versión apropiada es
  `v1.0.1` y si se usa `v1` la versión apropiada es `v1.2.0`.

* Con una comparación (`(< | <= | > | >=)vX.Y.X`), que apunta la versión más
  reciente que cumpla la condición. Si se usa `<v1.1.0` la versión apropiada es
  `v1.0.1`, si se usa `<=v1.1.0` la versión apropiada es `v1.1.0` y si se usa
  `>=v1.1.0` la versión apropiada es `v1.2.0`

* Con el nombre de una referencia de Git, puede ser una rama, una etiqueta, un
  hash de confirmación, etc...

* Con la palabra `latest`, que apunta a la versión estable más reciente. Si se
  usa, la versión apropiada es `v1.2.0`

* Con la palabra `upgrade`, que apunta a la versión estable más reciente si la
  versión actual no es la más reciente, o a la versión de pruebas más reciente
  si la versión actual es la más reciente. Si se usa y la versión actual es
  `v1.1.0`, la versión apropiada es `v1.2.0`, pero si se usa y la versión
  actual es `v1.2.0`, la versión apropiada es `v1.3.0-rc.1`.

* Con la palabra `patch`, que apunta al parche más reciente de la versión
  actual o a la versión estable más reciente si no se ha seleccionado una
  ninguna versión anteriormente (como `latest`). Si se usa y la versión actual
  es `v1.0.0`, la versión apropiada es `v1.0.1`.

Para excluir versiones se usa el comando `go mod edit`. Esto hará que `go get`
las ignore al momento de procesar las dependencias, por ejemplo, si se excluye
la versión `v1.2.0` y se usa `go get` con `latest`, la versión apropiada es
`v1.1.0`.

```shell-session
$ go mod edit -exclude 'go.ntrrg.dev/ntgo@v0.6.0'
```

`go.mod`:

```
module github.com/ntrrg/calc

go 1.14

require (
  github.com/ghodss/yaml v1.0.0 // indirect
  go.ntrrg.dev/ntgo v0.5.0 // indirect
  gopkg.in/yaml.v2 v2.3.0 // indirect
)

exclude go.ntrrg.dev/ntgo v0.6.0
```

Para agregar `replace`s se usa el comando `go mod edit`.

```shell-session
$ go mod edit -replace github.com/ghodss/yaml=../yaml
```

`go.mod`:

```
module github.com/ntrrg/calc

go 1.14

require (
  github.com/ghodss/yaml v1.0.0 // indirect
  go.ntrrg.dev/ntgo v0.5.0 // indirect
  gopkg.in/yaml.v2 v2.3.0 // indirect
)

exclude go.ntrrg.dev/ntgo v0.6.0

replace github.com/ghodss/yaml => ../yaml
```

También es posible eliminar declaraciones con el comando `go mod edit`.

```shell-session
$ go mod edit -droprequire gopkg.in/yaml.v2
$ go mod edit -dropexclude go.ntrrg.dev/ntgo@v0.6.0
$ go mod edit -dropreplace github.com/ghodss/yaml
```

`go.mod`:

```
module github.com/ntrrg/calc

go 1.14

require (
  github.com/ghodss/yaml v1.0.0 // indirect
  go.ntrrg.dev/ntgo v0.5.0 // indirect
)
```

Para descargar las dependencias se usa el comando `go mod download`.

```shell-session
$ go mod download
```

Y para verificar que el código fuente de las dependencias no se ha modificado
localmente, se usa el comando `go mod verify`.

```shell-session
$ go mod verify
all modules verified.
```

Para descargar las dependencias y guardarlas en la carpeta `vendor` se usa el
comando `go mod vendor`

```shell-session
$ go mod vendor
```

Para agregar o eliminar dependencias respectivamente de manera automática
cuando no existan en el archivo `go.mod` pero son usadas por algún paquete o
cuando ya no son usadas por ningún paquete se usa el comando `go mod tidy`.

```shell-session
$ go mod tidy
```

`go.mod`:

```
module github.com/ntrrg/calc

go 1.14

require (
  github.com/ghodss/yaml v1.0.0
  go.ntrrg.dev/ntgo v0.5.0
  gopkg.in/yaml.v2 v2.3.0 // indirect
)
```

Para obtener la lista de dependencias recursivamente se usa el comando `go mod
graph`.

```shell-session
$ go mod graph
github.com/ntrrg/calc github.com/ghodss/yaml@v1.0.0
github.com/ntrrg/calc go.ntrrg.dev/ntgo@v0.5.0
github.com/ntrrg/calc gopkg.in/yaml.v2@v2.3.0
gopkg.in/yaml.v2@v2.3.0 gopkg.in/check.v1@v0.0.0-20161208181325-20d25e280405
```

## Condiciones de compilación

{{% details summary="Enlaces de interés" %}}
* <https://golang.org/pkg/go/build/#hdr-Build_Constraints>
* <https://www.youtube.com/watch?v=COCUqAwAbD0&t=0s&index=31&list=PL5MnW0XCND7IjWv810mg4H81BxYN8BPQh>
{{% /details %}}

Permiten establecer condiciones para el compilador, como usar el archivo para
ciertas arquitecturas o sistemas operativos, deben aparecer entre las primeras líneas, incluso antes de `package`. Para usarlas, solo hace falta un comentario
como este `// +build CONDICION [...]`

# Buenas prácticas

1. Early return
2. License
3. Documenting
4. Short names for local variables
5. Split code in files
6. Split code in reusable and main files (pkg, cmd)
7. Use interfaces as parameters instead types
8. Avoid concurrency for APIs
9. Use channels to manage state (avoid abrupt stops)

## Estructura de proyectos

https://medium.com/@shaonshaonty/beautify-your-golang-project-f795b4b453aa?source=email-a31d0d6d29a8-1564497142241-digest.reader------2-59------------------773798d7_da5c_419e_9336_4ecd4313e2a4-16&sectionName=recommended

# Funcionalidades excluidas

{{% details summary="Enlaces de interés" %}}
* <https://golang.org/doc/faq#Design>
* <https://www.youtube.com/watch?v=k9Zbuuo51go>
{{% /details %}}

* Genéricos. Aunque es posible que en alguna futura versión se agregue, por
  ahora no se ha logrado obtener una solución que compense su complejidad con
  su utilidad. En su lugar pueden usarse las [interfaces](#interfaces), que
  ofrecen abstracción de una manera muy elegante.

* Conjuntos. Por ahora no se cuenta con esta estructura de datos, pero pueden
  implementarse usando otras estructuras como los mapas.

{{< go-playground >}}
```go
x := make(map[int]struct{})

x[1] = struct{}{}
x[2] = struct{}{}
x[1] = struct{}{}

len(x) // 2
```

--- PLAYGROUND ---

```go
package main

import "fmt"

func main() {
  x := make(map[int]struct{})

  x[1] = struct{}{}
  x[2] = struct{}{}
  x[1] = struct{}{}

  fmt.Println(len(x))
}
```
{{< /go-playground >}}

* `while` y `do-while`. Solo hay una estructura de repetición (`for`) y aunque
  parezca limitado, es una ventaja para los programadores no tener que pensar
  en cuál usar. Tal vez suene a exagerar, pero en Internet es muy fácil
  encontrar discusiones largas de otros lenguajes sobre cuál de todas es la más
  rápida, que por cierto se repiten en cada nueva versión del lenguaje.

* La familia de funciones favoritas de los programadores funcionales. Por la
  falta de tipos genéricos aumentaría la complejidad de la sintaxis del
  lenguaje, pero además, ¿por qué llamar 100 funciones para sumar los elementos
  de un arreglo si puede usarse una estructura de repetición muy sencilla?, si
  la reacción a esto es *«No me importa el rendimiento, quiero mis funciones
  😒»*, no hay problema, es muy fácil implementarlas.

{{< go-playground id="oNGlnMctzXv" >}}
```go
func ForEach(s []int, f func(int, int, []int)) {
  for i, v := range s {
    f(v, i, s)
  }
}

func Map(s []int, f func(int) int) (ns []int) {
  for _, v := range s {
    ns = append(ns, f(v))
  }

  return ns
}

func Filter(s []int, f func(int) bool) (ns []int) {
  for _, v := range s {
    if f(v) {
      ns = append(ns, v)
    }
  }

  return ns
}

func Reduce(s []int, f func(int, int) int, a int) int {
  for _, v := range s {
    a = f(a, v)
  }

  return a
}
```
{{< /go-playground >}}

* Aritmética de punteros. Es una funcionalidad muy poderosa, pero puede causar
  errores inesperados si no sabe manejar, además que es un comportamiento muy
  confuso para los programadores con menos experiencia.

* Hilos de procesos (threads), una de las tareas que suele agregar muchísima
  complejidad al código fuente es la programación multithreading, aunque claro,
  si se pretende programar una aplicación que se usará en computadoras potentes
  (como servidores o computadores personales con procesadores de múltiples
  núcleos) y se hará toda la computación en un solo hilo, sería un descaro
  decir que Go es un lenguaje de alto rendimiento. La verdad es que no hacen
  falta, ya se que suena a locura y probablemente se pueda pensar *«Claaaro, un
  programa con gran demanda de cómputo que corre en un hilo puede ser tan
  rápido como uno que corre en múltiples hilos.. 😒»*, pensamiento sarcástico
  que sería muy merecido, pero el hecho es que Go cuenta con goroutines, que
  son funciones que se ejecutan independientemente del hilo principal y son
  automáticamente distribuidas entre más hilos para evitar el bloqueo de las
  operaciones, esto genera una abstracción de más alto nivel para este tipo de
  tareas, por lo que el programador no debe lidiar directamente con hilos (ver
  la sección de [Concurrencia](#concurrencia)).

# Filosofía, proverbios y citas

{{% details summary="Enlaces de interés" %}}
* <https://www.youtube.com/watch?v=PAAkCSZUG1c>

https://go-proverbs.github.io/
{{% /details %}}

> Don't communicate by sharing memory, share memory by communicating.

<!-- -->

> Concurrency is not parallelism.

<!-- -->

> Channels orchestrate; mutexes serialize.

<!-- -->

> The bigger the interface, the weaker the abstraction.

<!-- -->

> Make the zero value usefull.

<!-- -->

> interface{} says nothing.

<!-- -->

> Gofmt's style is no one's favorite, yet gofmt is everyone's favorite.

<!-- -->

> A little copying is better than a little dependency.

<!-- -->

> Syscall must always be guarded with build tags.

<!-- -->

> Cgo must always be guarded with build tags.

<!-- -->

> Cgo is not Go.

<!-- -->

> With the unsafe package there are no guarantees.

<!-- -->

> Clear is better than clever.

<!-- -->

> Reflection is never clear.

<!-- -->

> Errors are values.

<!-- -->

> Don't just check errors, handle them gracefully.

<!-- -->

> Design the architectura, name the components, document the details.

<!-- -->

> Documentation is for users.

# Preguntas frecuentes

## ¿Por qué los binarios son tan grandes en comparación a C?

https://stackoverflow.com/questions/28576173/reason-for-huge-size-of-compiled-executable-of-go

https://blog.filippo.io/shrink-your-go-binaries-with-this-one-weird-trick/

# Recursos académicos

* [A Tour of Go](https://tour.golang.org/)

# Atribuciones

**Go Team.** *Documentation* <https://golang.org/doc/>

**Ariel Mashraki.** *An overview of Go syntax and features.* <https://github.com/a8m/go-lang-cheat-sheet>

