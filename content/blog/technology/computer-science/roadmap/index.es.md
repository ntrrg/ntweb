---
title: Ciencia de la Computación
date: 2021-05-06T18:00:00-04:00
description: Una compilación de artículos ordenados con la intención de hacer más sencillo familiarizarse con la informática, e incluso profundizar en diferentes temas, sin tener que pasar por esos momentos en los que no se tiene ni idea por donde empezar o qué hacer después, algo parecido a ir a la universidad.
keywords:
  - computer-science-roadmap
tags:
  - tecnología
  - ciencia-de-la-computación
  - fundamentos
  - series
draft: true
---

# Introducción

{{< card "blog/technology/computer-science/intro" >}}

{{< card "blog/math/intro" >}}

https://introtcs.org/public/index.html

https://www.coursera.org/learn/computational-thinking-problem-solving

https://www.udacity.com/course/intro-to-theoretical-computer-science--cs313

http://i.stanford.edu/~ullman/focs.html

https://medium.freecodecamp.org/a-software-engineering-survival-guide-fe3eafb47166

```
1. Hardware
  1. Tarjeta madre
  2. CPU
    1. Arquitecturas
  3. RAM
  4. Almacenamiento
    1. Tipos
      1. Magnéticos
      2. Flash
    2. Tablas de particiones
  5. Fuente de poder
  6. GPU
  7. Periféricos

2. Sistemas operativos
  1. Tipos
    * Linux
      1. Distribuciones
        1. Alpine
          1. Instalación
            1. Medios de instalación
            2. Particiones
            3. Sistemas de archivo compatibles
        2. Debian
          1. Instalación
            1. Medios de instalación
            2. Particiones
            3. Sistemas de archivo compatibles
      2. Terminal
        1. Shells
          * sh
          * bash
          * zsh
        2. Comandos
          1. pwd y ls
          2. mkdir
          3. cd
          4. touch y nano
          5. echo, >, >>
          6. more, less y cat
          7. cp
          8. mv
          9. tar
          10. find
          11. chmod y chown
          12. rm
          13. aptitude
          14. dpkg
        3. Patrones GLOB
        4. Ejecutar varios comandos en una linea y operadores lógicos
        5. Redireccionar salidas de comandos a comandos
        6. Leyenda de comandos
    * Windows
    * MacOS
  2. Puertos
  3. Protocolos

Terminal avanzado:
  1. Variables de entorno
  2. Comandos:
    .1. hostname
    .2. uname
    .3. free

  Terminator:
    1. Instalación
    2. Atajos del teclado (Hotkeys)

  Screen:

  Zsh:

Scripting Shell:

Git:
  1. Instalación
  2. Uso
    .1. Iniciar un repositorio
      .1. Nuevo
      .2. Clonado
    .2. Trabajo en el repositorio
      .1. Verificar el estado del repositorio
      .2. Agregar archivos
      .3. Ignorar archivos
      .4. Modificar archivos
        .1. Diferencias entre archivos
      .5. Eliminar archivos
      .6. Renombrar/Mover archivos
      .7. Confirmar los cambios
      .8. Registro de confirmaciones
      .9. Etiquetas
      .10. Deshacer cambios
        .1. Archivos
        .2. Preparación
        .3. Confirmación
    .3. Ramas
      .1. Mostrar
      .2. Crear
      .3. Mezclar
      .4. Diferencias
      .5. Eliminar
    .4. Repositorios remotos
      .1. Mostrar
      .2. Agregar
      .3. Modificar
        .1. Renombrar
        .2. Cambiar ruta
      .4. Eliminar
      .5. Descargar información
        .1. Sin afectar el área de trabajo
        .2. Actualización automática del área de trabajo
      .6. Cargar información
    .5. Exportar el proyecto
  3. Buenas practicas
  4. Utilidades
    .1. Guardar el área de trabajo sin confirmaciones
    .2. Modo interactivo
    .3. Busqueda binaria de errores
    .4. Repositorios dentro de un repositorio (submodulos)
    .5. Atributos de Git
  5. Configuración avanzada
    .1. Alias
    .2. Autor
    .3. Colores
    .4. Editor de texto
    .5. Herramienta de fusión
    .6. Ignorar archivos
    .7. Plantilla para mensaje de confirmación

Paradigmas de programación:
```

# Algoritmos y estructuras de datos

https://medium.com/@joey_colon/a-practical-introduction-to-big-o-a9f9c416aaaf?source=email-a31d0d6d29a8-1569248761489-digest.reader------0-38------------------f453a1a2_4118_48b5_b4f7_29f68664931e-1-----&sectionName=top

https://visualgo.net/en

https://www.freecodecamp.org/news/these-are-the-best-free-courses-to-learn-data-structures-and-algorithms-in-depth-4d52f0d6b35a/

https://www.udacity.com/course/intro-to-algorithms--cs215

https://www.geeksforgeeks.org/top-algorithms-and-data-structures-for-competitive-programming/

* Version Control Systems and semantic versioning
* Licensing

# Sistemas Operativos

http://www.linuxfromscratch.org/

https://medium.com/@c_bata_/the-internal-of-go-prompt-how-to-control-the-rich-terminal-ui-part-i-7d22bdfe6b9a

http://www.linusakesson.net/programming/tty/index.php

https://specifications.freedesktop.org/desktop-entry-spec/latest/index.html

```
Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
TTY era un dispositivo que se usaba para enviar mensajes, como una m'aquina de escribir que no sacaba hojas sino que las enviaba a otras TTY

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
https://es.wikipedia.org/wiki/Teletipo

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
Los computadores era equipos grand'isimos que recib'ian datos en formatos espec'ificos, los precesaban y eran mostrados por medio de luces, tarjetas perforadas y otros medios no tan amigables al humano, creo que lo m'as humano eran datos impresos en hojas, que imagino no ten'ian negrita ni cursiva 😂

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
Pinche Markdown no exist'ia todav'ia 😂

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
Despu'es de bastante investigaci'on (y mucha historia que no me se, hay que ver documentales 😅), se les ocurri'o crear dispositivos parecidos a las TTY pero con pantallas que permit'ian ingresar y obtener los datos mucho m'as r'apido. Estos dispositivos se llamaron terminales

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
Un terminal capta ordenes, las env'ia a donde ser'an procesadas, obtiene los resultados y los entrega al usuario. Suena parecido a lo que siempre nos han dicho que es una computadora com'un y corriente (recibe datos, los procesa y los muestra), pero la diferencia es que no realiza procesamiento sino que solo cumple la tarea de interfaz entre el usuario y el computador, algunos terminales pueden tener capacidad de procesamiento, pero realmente la usan para manejar las utilidades que le permitir'an al usuario conectarse con el computador, por ejemplo, un dispositivo multimedia que se traiga pel'iculas de un servidor, no almacena ni procesa la pel'icula como tal, pero puede tener una aplicaci'on que le permita gestionar el flujo de la pel'icula (algo as'i como una m'aquina con solo VLC instalado, incluso sin sistema operativo jaja)

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
Otra vez, despu'es de much'isima investigaci'on, lo enfermos de esos d'ias crearon sistemas multitarea (no literal, porque no hac'ian dos tareas al mismo tiempo, eso solo lo pueden hacer las m'aquinas con procesadores de m'as de un n'ucleo, pero lo emulaban con algoritmos que encolaban los procesos) y dijeron: vamos a hacer un sistema que soporte varios usuarios y que con terminales, la gente se conecte y puedan hacer sus cosas

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
Desde ah'i fue evolucionando la cosa, le eliminaron la dependencia de computo a los terminales para que funcionaran sin conexi'on y ah'i se crearon las computadoras personales

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
(puede que me est'e equivocando en ciertas cosas hist'oricas, pero lo importante es entender que era un terminal y como se diferencian de las computadoras, despu'es podemos buscar documentales y vainas as'i interesantes sobre eso y verlas en el local jaja)

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
Como las computadoras eran una mezcla entre un servidor y un terminal, el trabajo era algo parecido, solo que se hac'ia en el mismo dispositivo

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
Una persona usaba el terminal (el teclado) para enviar datos a la computadora (el CPU) y visualizarlos en el mismo terminal (la pantalla)

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
Eso quiere decir que yo estaba equivocado, en realidad siempre usamos el terminal 😂 solo que ya no es simplemente un terminal

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
Por eso a la aplicaci'on terminal le dicen "Emulador de terminal" o "Terminal emulator"

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
Porque es como agarrar uno de esos terminales viejos que no ten'ian nada gr'afico y comunicarse con el sistema operativo de nuestra m'aquina

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
Todo tiene su raz'on 😂

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
En los sistemas UNIX (no se si Windows tenga eso) existen varios tipos de terminales virtuales (pa no decir solo dos porque hasta hay m'as): las TTY (que se llamana as'i por los dispositivos de arriba) y los PTY (que se llaman as'i por pseudotermial)

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
Las TTY son representaciones de pantallas f'isicas, algo as'i como un archivo que cumple la funci'on de monitor y solo se usan cuando se tiene acceso f'isico a la computadora. Para acceder a ellas se usa la combinaci'on de teclas Ctrl + Alt + F1-F6, las que est'an despu'es de F7 tambi'en son TTY, solo que est'an apartadas para montar interfaces gr'aficas (solo es un convenio, no es que no se pueda), esto no quiere decir que solo existan 12 TTY, en verdad hay un charquero jaja con el comando ls /dev/tty* se pueden ver (las que tienen una S (/dev/ttyS*) son terminales para dispostivos de puerto serial, hardware espec'ifico). Si se quisiera activar alguna de las que est'a apartada para interfaces o del charquero que existen (creo que son 63, o depende de la configuraci'on de kernel) se debe usar el comando agetty (con varias opciones que ahorita no me se 😢) y para acceder a ellas se usa el comando chvt <TTY> (por ejemplo, si se va a la TTY 1, se inicia sesi'on y se ejecuta chvt 2, se cambiar'a a la TTY 2)

Pins, [09.03.19 11:16]
[Forwarded from Miguel Angel]
Los PTY son una t'ecnica que permiten crear emuladores de terminales sin necesidad de usar la pantalla completa (o incluso sin usarla 😂), de esta manera es que podemos tener un terminal en herramientas de interfaz gr'afica o tener terminales remotos (como telnet, SSH, MOSH...). La t'ecnica consiste solicitar un terminal virtual al archivo /dev/ptmx, este crea dos nuevos archivos, uno (master) que recibe todo los datos para procesarlos (como un computador) y otro (slave) que env'ia y recibe datos (como un terminal), este 'ultimo se almacena en la carpeta /dev/pts/. Si se redireccionan datos a alguno de los archivos en /dev/pts/ se mostrar'an en la sesi'on activa en ese terminal virtual, por ejemplo:  echo "Muajaja" > /dev/pts/0 har'ia que se muestre Muajaja en la sesi'on activa del terminal virtual 0
```

```
alias, cat, cd, chmod, chown, df, diff, echo, exit, find, finger, free, grep,
groups, gzip, head, history, kill, less, ls, man, mkdir, mv, passwd, ping, ps,
pwd, shutdown, ssh, sudo, tail, tar, top, uname, w, whoami, dirs, pushd, popd,
split, rehash 
```

http://blackskyresearch.net/shelltables.txt

https://www.howtogeek.com/439199/15-special-characters-you-need-to-know-for-bash/

https://medium.com/@indreklasn/here-are-11-console-commands-every-developer-should-know-54e348ef22fa?source=email-a31d0d6d29a8-1573722811021-digest.reader------0-58------------------89f6aa15_5232_4642_9aee_b741a5313d9e-1-----&sectionName=top

# Redes

Dnsmasq-base

Libteam-utils

https://wiki.debian.org/DDNS

https://en.wikipedia.org/wiki/IP_address_management

# Inteligencia Artificial

https://www.ibm.com/developerworks/library/cc-beginner-guide-machine-learning-ai-cognitive/index.html?cm_mmc=dw-_-cognitive-_-TPC2017-_-community&utm_source=Topcoder+Cognitive+Community&utm_campaign=2600ffc7dc-EMAIL_CAMPAIGN_2017_05_10&utm_medium=email&utm_term=0_934e9ffdc5-2600ffc7dc-160764397

# Atribuciones

**Kamran Ahmed.** *Developer Roadmaps.* <https://roadmap.sh/>

**MIT.** *Electrical Engineering and Computer Science.* <http://catalog.mit.edu/subjects/6/>

**MIT OpenCourseWare.** *Electrical Engineering and Computer Science.* <https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/>

**Prakhar Srivastav.** *Awesome CS Courses.* <https://github.com/prakhar1989/awesome-courses>

**EbookFoundation.** *free-programming-books.* <https://ebookfoundation.github.io/free-programming-books/>

**Open Source Society University.** *Path to a free self-taught education in Computer Science! .* <https://github.com/ossu/computer-science>

