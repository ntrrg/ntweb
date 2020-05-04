---
title: ¿Por qué usar contenedores?
publishdate: 2019-05-14T22:54:00-07:00
date: 2020-05-15T10:50:00-04:00
description: La forma más fácil de implemetar aplicaciones para programadores y administradores de sistemas.
tags:
  - tecnología
  - fundamentos
  - contenedores
  - sysadmin
  - devops
toc: true
comments: true
---

Básicamente, le permiten a los programadores y administradores de sistemas
desarrollar e implementar aplicaciones de una manera mucho más sencilla. Antes
de entrar en detalles sobre el tema y para poder notar las ventajas de usar
contenedores, haré un ejemplo de como se implementaría una aplicación web (no
es que los contenedores solo sirvan para aplicaciones web, es un ejemplo) con
otros métodos:

# Con servidores físicos (bare-metal)

1. El programador escribe la aplicación en su computadora.

2. El programador se asegura de que la aplicación funciona en su computadora.

3. El programador sube el código fuente al repositorio Git.

4. El administrador de sistemas clona/actualiza el repositorio en el servidor
de pruebas.

5. El administrador de sistemas inicia la instalación de la aplicación y sus
dependencias (otras aplicaciones, archivos, carpetas y cualquier otra cosa que
necesite la aplicación para instalarse y ejecutarse) en el servidor siguiendo
las instrucciones o corriendo algún script del programador.

6. Todos los integrantes del equipo hacen una plegaria al dios de su creencia
y esperan que todo salga bien.

7. Existen dos posibilidades en este punto: la primera es que la instalación
   finalice correctamente; y la segunda es que ocurra un error porque el
   administrador de sistemas se saltó accidentalmente unos pasos o porque
   alguna de las dependencias no se cumple (esta es bastante común, ya que los
   entornos de desarrollo suelen tener preinstalados muchos más paquetes que
   los servidores). Aquí en donde normalmente se escucha el famoso *«Que raro,
   en mi máquina sí funciona»*.

8. El administrador de sistemas, y probablemente otros miembros del equipo,
   auditan la aplicación y si todo funciona correctamente se implementa en
   producción.

Por cierto, cada programador que forme parte del equipo tendrá que hacer el
mismo proceso en su computadora, por lo que todos deberían trabajar bajo el
mismo entorno (o muy parecido) para evitar problemas de compatibilidad.

**Ventajas:**

1. La aplicación trabajará al máximo rendimiento posible.

2. La aplicación tiene acceso directo al hardware (para algunas aplicaciones
   esto puede ser una desventaja).

**Desventajas:**

1. Las probabilidades de fallo son muy altas.

2. El equipo debe estar muy organizado para evitar otro tipo de fallas (las de
   la aplicación no son las únicas que podrían generarse).

3. Si alguien rompe la seguridad de la aplicación (que no es que sea fácil de
   hacer, solo es en el caso de que logre hacerlo), tendrá acceso directo al
   servidor y no es que haga falta ser super usuario o {{< img  src="images/mr-robot.png" alt="Mr. Robot" style="height: 1.25em;" >}}
   para afectarlo, con solo correr un `while true; do; echo 'Muajaja! 😈'; done`
   ya habrá un consumo relevante de CPU que podría ser aprovechado en otra
   tarea.

4. Si la aplicación consume pocos recursos, los demás recursos del servidor no
   podrán ser aprovechados para realizar otras tareas.

El resultado, una estructura parecida a esto:

{{< figure src="images/architectures-bare-metal-es.jpg" caption="Arquitectura de una aplicación en un servidor físico" class="center" >}}

# Con máquinas virtuales

1. El administrador de sistemas le asigna una imagen base de una máquina
   virtual al programador para que la replique en su computadora o en el peor
   de los casos, le crea una máquina virtual en donde podrá conectarse de
   manera remota.

2. El programador escribe la aplicación en su computadora.

3. El programador se asegura de que la aplicación funciona en la máquina
   virtual.

4. El programador sube el código fuente al repositorio Git.

5. El programador genera una imagen con la aplicación funcionando y la entrega
   al administrador de sistemas para que la implemente o si se tiene
   automatizado, se crea una nueva máquina virtual de pruebas basada en la
   imagen. En caso de que se le haya asignado una máquina virtual, deberá
   avisar al administrador de sistemas para que inicie la auditoría.

6. El administrador de sistemas, y probablemente otros miembros del equipo,
   auditan la aplicación y si todo funciona correctamente se implementa en
   producción.

**Ventajas:**

1. Las probabilidades de fallo son muy bajas.

2. Es bastante fácil replicar el entorno de desarrollo (si se usan imágenes).

3. Si alguien rompe la seguridad de la aplicación, solo tendrá acceso a la
   máquina virtual y no afectará a otros servicios.

4. No hace falta que el equipo esté tan organizado para implementar una versión
   de la aplicación.

**Desventajas:**

1. El host (que es la máquina real, donde están ejecutándose las máquinas
   virtuales) estará corriendo múltiples sistemas operativos, lo que se traduce
   en muchas más tareas para el CPU y un mayor consumo de RAM.

2. La aplicación no tiene acceso al hardware (dependiendo de la aplicación,
   esto puede ser irrelevante e incluso una ventaja), según el software de
   virtualización que se use, pueden hacerse algunas configuraciones especiales
   que le otorguen acceso, pero en este caso sería mucho mejor usar otra
   alternativa para implementar la aplicación, si requiere acceso al hardware
   para qué virtualizarlo 😂 (a menos que se necesite exclusivamente un sistema
   operativo diferente al del host).

Se generan dos estructuras, la primera para el entorno de producción y la otra
en la computadora de cada programador respectivamente:

{{< figure src="images/architectures-vm-es.jpg" caption="Arquitectura de una aplicación una máquina virtual" class="center" >}}

# Contenedores (¡¡POR FIN!!)

{{% note %}}
Ya se que todo lo que escribí arriba depende de la técnica de trabajo de cada
equipo, pero es un ejemplo.. no hay que ser fastidiosos 😒 😂, es como ver una
de esas publicidades exageradas de productos como *«La aspiradora que también
lava, hace la comida y le canta canciones de cuna»*, igual que ellos, yo
también tengo que vender mí producto 😄 (en este caso, el uso de los
contenedores, porque yo no inventé los contenedores 😂).
{{% /note %}}

Ahora que ya hay algo de contexto, los contenedores pueden definirse como
entornos aislados y previamente configurados en los que se ejecutará
determinado software sin tener que preocuparse por cumplir sus dependencias
(son los *Plug & Play* del software). Su funcionalidad es muy parecida a la de
las máquinas virtuales, solo que en este caso no se virtualiza el hardware y
comparten el sistema operativo del host (esto quiere decir que los contenedores
no tienen sistema operativo, sino que usan el del host), lo que los hace mucho
más ligeros y fáciles de compartir con el equipo de trabajo.

No se debe confundir sistema operativo con distribuciones. El sistema operativo
es Linux (el kernel) y Alpine, Arch, CentOS, Debian, Deepin, Elementary,
Fedora, Mind, Ubuntu, etc x 10e<sup>∞</sup> 😂 son distribuciones, que se
encargan de agregar aplicaciones sobre Linux para facilitar su uso. Todos los
contenedores corren en el mismo sistema operativo, pero pueden tener diferentes
distribuciones.

{{< figure src="images/os-definition-es.jpg" caption="Arquitecture del sistema operativo" class="center" >}}

Existen muchas herramientas para manipular contenedores y cada una tiene
métodos específicos de trabajar con ellos, pero normalmente todas tienen un
ciclo de trabajo parecido a este:

1. Se crea o descarga una imagen de contenedor, que es una especie de plantilla
   que contiene todas las configuraciones y la estructura del sistema de
   archivos (las carpetas y esas cosas).

2. Se implementa la imagen (que es lo mismo que crear un contenedor con la
   imagen, solo que en un lenguaje más pompudo 😂).

3. Se inicia y ejecutan los procesos del contenedor.

4. Si el contenedor terminó de ejecutar sus procesos u ocurrió un error, se
   detiene.

5. Si se (re)quiere, se reinicia el contenedor.

6. Si el contenedor ya no es de utilidad, se elimina.

Algunas de las herramientas más conocidas para la gestión de contenedores son:

* [Docker](https://www.docker.com/)

* [rkt](https://coreos.com/rkt/)

* [runC](https://github.com/opencontainers/runc)

* [LXC](https://linuxcontainers.org/)

* [systemd-nspawn](https://www.freedesktop.org/software/systemd/man/systemd-nspawn.html)

Por la gran popularidad que se han ganado y lo bien que hacen su trabajo,
muchas empresas han estado preparando sus plataformas para trabajar con esta
tecnología, y durante ese proceso se han ido generando nuevas herramientas
llamadas orquestadores de contenedores, que automatizan gran parte de las
tareas repetitivas al momento de llevar los contenedores a entornos de
producción (sí, a producción, no me equivoqué escribiendo), algunas de estos
orquestadores son:

* [Kubernetes](https://kubernetes.io/)

* [Docker Swarm](https://docs.docker.com/engine/swarm/)

* [Mesos](http://mesos.apache.org/)

* [Mesosphere](https://mesosphere.com/product/)

* [Nomad](https://www.nomadproject.io/)

## Implementación

1. El programador escribe la aplicación en su computadora.

2. El programador se asegura de que la aplicación funciona en el contenedor.

3. El programador sube el código fuente al repositorio Git.

4. El programador genera una imagen con la aplicación funcionando y la entrega
   al administrador de sistemas para que la implemente, o si se tiene
   automatizado, se crea un nuevo contenedor de pruebas basado en la imagen.

5. El administrador de sistemas, y probablemente otros miembros del equipo,
   auditan la aplicación y si todo funciona correctamente se implementa en
   producción.

**Ventajas:**

1. Todas las ventajas de usar máquinas virtuales, pero con menor consumo de
   recursos.

**Desventajas:**

1. El host estará corriendo múltiples distribuciones, lo que se traduce en
   más tareas para el CPU, pero la sobrecarga es mínima si se compara con una
   máquina virtual.

2. La barrera de seguridad entre el host y los contenedores no es tan grande
   como la de una máquina virtual.

En este caso, las estructuras del entorno de desarrollo y de producción son
iguales, con la excepción de los programadores que usen Windows o macOS, pero
dudo que les importe el consumo desproporcionado de recursos, normalmente
tienen un hardware potente, por algo usan Windows o macOS no? 😅.

{{< figure src="images/architectures-container-es.jpg" caption="Arquitectura de una aplicación en contenedores" class="center" >}}

# En conclusión

A pesar de que todo lo que escribí pareciera una charla de Herbalife y que la
única solución a todos los problemas (hasta el hambre y la pobreza mundial) se
solucionan con contenedores, cada uno de los métodos de implementación que usé
de ejemplo tienen propósitos y enfoques diferentes, por lo que al usarlos cómo
y dónde deben, pueden mitigarse sus desventajas y obtener más ventajas que
usando contenedores. Lo importante es siempre aplicar la arquitectura correcta,
y conocer una nueva que hace muy bien su trabajo nunca está de más 😄.

# Atribuciones

Las imágenes fueron creadas con [Draw.io](https://www.draw.io/).

<br/>

**OCI Team.** *OCI Runtime Specification.* <https://github.com/opencontainers/runtime-spec>

**Docker Team.** *Get Started, Part 1: Orientation and setup.* <https://docs.docker.com/get-started/#containers-and-virtual-machines>

**Wikipedia Authors.** *Operating system.* <https://en.wikipedia.org/wiki/Operating_system>

