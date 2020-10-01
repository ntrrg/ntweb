---
title: Introducción a la Informática
publishdate: 2020-03-17T11:00:00-04:00
date: 2020-06-05T15:20:00-04:00
description: Fundamentos de la informática. Orientado a personas sin conocimiento previo, pero también puede ser interesante para los que ya están familiarizados con la tecnología.
series:
  - computer-science
tags:
  - tecnología
  - ciencia-de-la-computación
  - fundamentos
  - programación
  - hardware
toc: true
comments: true
---

El término informática fue usado académicamente por primera vez en el libro
*Informatik: Automatische Informationsverarbeitung* (Informática: procesamiento
automático de información) por Karl Steinbuch en 1957. Proviene de la unión de
las palabras alemanas *Informationen* (información) y *Automatik* (automática).

Consiste en estudiar los métodos para el almacenamiento, procesamiento y
transmisión de la información, con el fin de sistematizar y/o automatizar
tareas de manera óptima.

No se debe confundir sistematización con automatización. La sistematización se
refiere a la organización de los procesos, que en todo caso podrían realizarse
manualmente. Por otro lado, la automatización se trata de que los procesos sean
realizados por máquinas o cualquier otro organismo sin voluntad (autómata).

Teniendo claro estos conceptos, puede decirse que la informática se ha ido
aplicando desde la antigüedad, solo que sin la participación de las máquinas
que hoy se conocen como computadoras. Por ejemplo:

* En la antigua Grecia, aproximadamente unos 500 años antes de Cristo, se usaba
  un herramienta llamada escítala para cifrar y descifrar mensajes.

* En varios lugares del mundo entre los años 500a.C y 300a.C, se usaba un
  instrumento llamado ábaco para realizar cálculos matemáticos.

* En la antigua Grecia, cerca del año 300a.C el matemático Euclides desarrolló
  un método para el cálculo del máximo común divisor (El Algoritmo de
  Euclides).

Todas estas aplicaciones tienen algo en común, deben seguirse metódicamente
unos pasos para obtener el resultado esperado.

# Máquinas (Hardware)

La tecnología es la característica más importante del ser humano, tanto para
bien cómo para mal, ha sido el principal elemento de la evolución humana y
probablemente lo seguirá siendo.

Dentro de la gran variedad de herramientas que se han desarrollado a través de
la historia, tristemente las armas son las que han tenido más importancia, pero
no muy lejos de ellas están las máquinas. Las máquinas son objetos que permiten
aprovechar la energía de los elementos que las componen para realizar tareas
específicas. 

En sus inicios, las máquinas tenían como función principal realizar tareas
físicas, pero a algunos intelectuales se les ocurrió que también podrían ser de
ayuda para realizar cálculos matemáticos complejos y analizar grandes
cantidades de información eficientemente. Luego de varias décadas de estudio y
mucha evolución, se crearon las computadoras.

Las computadoras son un conjunto de elementos electrónicos que pueden recibir,
procesar, almacenar y transmitir información. Pueden ser configuradas para
realizar una gran variedad de tareas por medio de secuencias de instrucciones
llamadas programas.

Su nombre proviene de una ocupación que existía desde el siglo XVII, una
persona con este cargo tenía como función realizar cálculos matemáticos. La
palabra computadora en sí, proviene del latín *computare*, que significa
calcular.

Algunas de las computadoras que se usan a diario son:

* Relojes
* Calculadoras
* Teléfonos
* Tabletas
* Computadoras personales

Otros objetos que usualmente contienen computadoras son:

* Electrodomésticos
* Vehículos

# Algoritmos (Software)

La palabra algoritmo proviene de la latinización del nombre del matemático
persa Muhammad ibn Musa al-Khwarizmi, que en el mundo hispano-hablante es muy
conocido, pero poco reconocido por aparecer en la portada del libro *Álgebra de
Baldor*.

Por su nombre, puede parecer que hace falta estudiar matemática avanzada para
entenderlos, pero la verdad es que son simplemente un conjunto de instrucciones
para realizar una tarea. Los pasos a seguir para cambiar un bombillo o la
receta para preparar una pizza son buenos ejemplos de lo que es un algoritmo.

Aunque un algoritmo puede ser ejecutado por cualquier entidad, tanto seres
vivos como autómatas, por lo general serán autómatas quienes lo lleven acabo,
pues estos pueden realizar cálculos matemáticos y análisis con mayor rapidez.

Expresar algoritmos en lenguaje natural sin ambigüedad es una tarea compleja,
pues nuestro modo de comunicación es muy amplio y los autómatas todavía no son
capaces de entenderlo completamente, pero a su vez permite que sea mucho más
fácil explicar su funcionamiento a otros humanos.

Por esta razón, es común que un algoritmo sea expresado en múltiples lenguajes
que estarán orientados a un público específico y tendrán diferentes niveles
descriptivos. Los niveles descriptivos no están estrictamente estandarizados,
pero podrían agruparse en:

* Alto nivel: cuando se quiere hablar sobre qué hace y para qué es útil un
  algoritmo, el lenguaje natural es la mejor forma de hacerlo gracias a su alto
  nivel descriptivo y a que puede ser entendido por personas sin conocimientos
  técnicos.

```
Algoritmo para calcular el factorial de un número:

Para obtener el factorial de un número positivo n, se deben
multiplicar todos los números enteros desde 1 hasta n (inclusivo).

  4! = 4 x 3 x 2 x 1 = 24

Pseudocódigo:

  1. Inicializar un acumulador r en 1
  2. Mientras n sea mayor que 1, repetir:
     2.1. Multiplicar r por n
     2.2. Restar 1 a n
  3. El factorial de n es r
```

* Implementación: cuando se quiere que un autómata ejecute el proceso, los
  lenguajes de programación permiten traducir los algoritmos a instrucciones
  que el autómata puede entender, al resultado de esta traducción se le llama
  programa. Existe una gran cantidad de lenguajes de programación, que al igual
  que el lenguaje natural, cada uno tiene una sintaxis específica.

{{< snippet path="files/fact.go" hl="go" foldable=true name="fact.go" open="true" >}}
{{< snippet path="files/fact.c" hl="c" foldable=true name="fact.c" >}}
{{< snippet path="files/fact.js" hl="js" foldable=true name="fact.js" >}}

Los algoritmos son escritos de manera generalizada, es decir, sus instrucciones
deben ser seguidas sin importar quién o qué los ejecute. Esto es beneficioso
porque asegura su comportamiento, pero también puede ser una desventaja ya que
asume que quienes los ejecuten tienen las mismas características, por lo que
en algunas ocasiones, la implementación de un algoritmo puede variar según el
autómata que lo siga e incluso el lenguaje de programación que se use.

En pocas palabras, para una persona muy alta, cambiar un bombillo puede ser una
tarea muy sencilla, pero para una persona de estatura promedio probablemente
hagan falta unos pasos extras donde se necesitará una escalera, por lo que el
algoritmo deberá ser un poco diferente dependiendo de la estatura de la persona
que lo ejecute.

# Conclusiones

En resumen, la informática consiste en sistematizar y automatizar procesos,
pero con los grandes avances tecnológicos que se han logrado estos últimos años
y lo complejas que se han vuelto sus aplicaciones, es imposible que una sola
persona pueda cumplir con todos los perfiles del mercado.

Algunas de las actividades que desempeñan los profesionales de la informática
son:

* Desarrollo de Software
  * Desarrollo de Firmware
  * Desarrollo de Aplicaciones de escritorio
  * Desarrollo de Videojuegos
  * Desarrollo Web
    * Desarrollo Frontend
    * Desarrollo Backend
    * Desarrollo Fullstack
  * Desarrollo Móvil
  * Desarrollo de Realidad Virtual/Realidad Aumentada
  * Desarrollo de Aplicaciones distribuidas
* Administración de Sistemas
  * Servicio Técnico
  * Administración de Servidores
    * Administración de Bases de Datos
  * Administración de Sistemas Cloud
* Investigación
  * Educación Universitaria
  * Ciencia de la Computación
    * Inteligencia Artificial
    * Computación Distribuida
* Análisis y Sistematización
  * Sistematización de Procesos
  * Arquitectura de Sistemas Computacionales
  * Modelado de Bases de Datos
  * Análisis de Información y Estadística
* Gerencia y Gestión de proyectos
* ...

**Nota:** se debe resaltar que cada perfil se subdivide en los lenguajes de
programación y herramientas que se usen.

El nivel de complejidad de cada perfil sigue expandiéndose en cada área, por lo
que es muy probable que en un futuro, cada uno de estos temas representen una
carrera universitaria completa cada uno.

# Atribuciones

**HarvardX.** *CS50's Introduction to Computer Science.* <https://courses.edx.org/courses/course-v1:HarvardX+CS50+X/course/>

**Khan Acedemy.** *Computer science.* <https://www.khanacademy.org/computing/computer-science>

**Wikipedia.** *Informática.* <https://es.wikipedia.org/wiki/Inform%C3%A1tica>

**Wikipedia.** *Algorithm.* <https://en.wikipedia.org/wiki/Algorithm>

# Registro de cambios

* **2020/06/04:** Decidí mover la explicación sobre cómo es representada la
  información a su [propio artículo](./../data/) para dedicarle la suficiente
  atención que se merece y disminuir la complejidad de este artículo.

* **2020/06/05:** Agregué la sección de [Conclusiones](#conclusiones) para dar
  ideas sobre que puede hacer un profesional de la informática.

