---
metadata:
  source-code: https://github.com/ntrrg/ntweb
  license: CC-BY-4.0
title: ntWeb
description: Un pequeño sitio web con grandes intenciones.
tags:
  - sitio-web
  - json-api
  - go
  - html
  - css
  - javascript
  - hugo
  - mage
  - docker
  - netlify
---

[![GitHub Actions](https://github.com/ntrrg/ntweb/workflows/Site/badge.svg)](https://github.com/ntrrg/ntweb/actions?query=workflow:Site)
[![GitHub Actions](https://github.com/ntrrg/ntweb/workflows/Challenges/badge.svg)](https://github.com/ntrrg/ntweb/actions?query=workflow:Challenges)
[![Netlify Status](https://api.netlify.com/api/v1/badges/2f18cd17-5e78-45fa-a95d-0ae120ffc603/deploy-status)](https://app.netlify.com/sites/ntweb/deploys)

**ntWeb** es un pequeño sitio web con grandes intenciones. Funciona como un
portafolio, una plataforma de blog, una colección de retos de programación, una
galería, documentación para paquetes Go y una API JSON.

Probablemente cualquiera podría pensar que este proyecto es muy sencillo y que
su autor no tiene buenas capacidades en desarrollo frontend, y de hecho es
cierto en algunos aspectos porque no es mi especialidad, pero su sencillez es
intencional (y está escrito con tecnologías web modernas).

[Hugo]: https://gohugo.io
[Go]: https://golang.org
[Mage]: https://magefile.org

El sitio web es creado con [Hugo][] y parte de su contenido es generado con
[Go][] y [Mage][] (los proyectos y la documentación de los paquetes Go).

Para mostrar la pagina principal solo se descargan ~30 KB (~12 KB sin los
favicons), para esta página se descargan ~265 KB (incluyendo sus imágenes). Es
usable sin JavaScript y puede visualizarse en navegadores web TUI.

{{< figure src="images/elinks-home-es.png" class="center" caption="Página principal en TUI" >}}

{{< figure src="images/elinks-projects-es.png" class="center" caption="Proyectos en TUI" >}}

{{< figure src="images/elinks-ntweb-es.png" class="center" caption="Esta página en TUI" >}}

Todo su contenido también puede obtenerse como JSON, por lo que es posible
crear nuevos frontends más complejos sin necesidad de tener que repetir el
contenido. Por ser una API estática se obtiene un buen rendimiento pues no se
realiza ningún computo extra al de leer el archivo, es bastante segura porque
no hay servidor de base de datos que pueda ser atacado y puede hospedarse en
cualquier servicio que soporte archivos estáticos.

# API

Casi todas las páginas HTML tienen JSON como formato alternativo, que puede ser
obtenido agregando `index.json` al final de su URL. Por ejemplo, para esta
página, el URL de su formato JSON sería `https://ntrrg.dev/es/projects/ntweb/index.json`.

Cada página tiene los siguientes propiedades:

{{% params %}}

{{% param name="url" type="Cadena" %}}
URL del recurso.
{{% /param %}}

{{% param name="kind" type="Cadena" %}}
Tipo de recurso. Puede ser `home`, `section`, `taxonomy`, `term` o `page`.
{{% /param %}}

{{% param name="type" type="Cadena" %}}
Tipo de contenido. Puede ser `blog`, `gallery`, `projects`, `tag` o `page`.
{{% /param %}}

{{% param name="lang" type="Cadena" %}}
Idioma del recurso.
{{% /param %}}

{{% param name="title" type="Cadena" %}}
Título del recurso.
{{% /param %}}

{{% param name="image" type="Cadena" %}}
URL de la imagen del recurso.
{{% /param %}}

{{% param name="params" type="Cadena" %}}
Parámetros del frontmatter del recurso. Puede variar segur el tipo del
contenido.
{{% /param %}}

{{% param name="content" type="Cadena" %}}
Contenido Markdown procesado del recurso (HTML). Se debe tener en cuenta que
esta propiedad contiene una cadena UTF-8 y las cadenas de JavaScript son
UTF-16.
{{% /param %}}

{{% param name="data" type="Objeto" %}}
Datos específicos del recurso. Para la página principal, contiene todos los
elementos de primer nivel; para colecciones, contiene los elementos que la
componen e información sobre la paginación; y para recursos individuales, es un
objeto vacío.
{{% /param %}}

{{% param name="altLang" type="Vector de Objeto" %}}
Traducciones del recurso. Cada objeto tiene las propiedades `lang` y `url`.
{{% /param %}}

{{% param name="altMediaType" type="Vector de Objeto" %}}
Formatos alternativos del recurso. Cada objeto tiene las propiedades
`mediaType` y `url`.
{{% /param %}}

{{% /params %}}

```shell-session
$ wget -qO - https://ntrrg.dev/es/projects/ntweb/index.json | jq
{
  "url": "https://ntrrg.dev/es/projects/ntweb/",
  "kind": "page",
  "type": "projects",
  "lang": "es",
  "title": "ntWeb",
  "image": "",
  "params": {
    "comments": true,
    "description": "Un pequeño sitio web con grandes intenciones.",
    "draft": false,
    "iscjklanguage": false,
    "metadata": {
      "license": "MIT",
      "source-code": "https://github.com/ntrrg/ntweb"
    },
    "tags": [
      "sitio-web",
      "json-api",
      "go",
      "html",
      "css",
      "javascript",
      "hugo",
      "mage",
      "docker",
      "netlify"
    ],
    "title": "ntWeb",
    "toc": true
  },
  "content": "...",
  "data": {},
  "altLang": [
    {
      "lang": "en",
      "url": "https://ntrrg.dev/en/projects/ntweb/"
    }
  ],
  "altMediaType": [
    {
      "mediaType": "text/html",
      "url": "https://ntrrg.dev/es/projects/ntweb/"
    }
  ]
}
```

## Endpoints

### Principal

<https://ntrrg.dev/es/index.json>

Obtiene todos los elementos de primer nivel. Ver [API](#api) para mas
información sobre las propiedades en común.

**Propiedades:**

{{< params >}}

{{% param name="data.sections" type="Vector de Objeto" %}}
Secciones. Cada objeto tiene las propiedades `url`, `title` y `pages`. La
propiedad `pages` es la cantidad de páginas dentro de la sección.
{{% /param %}}

{{% param name="data.taxonomies" type="Vector de Objeto" %}}
Taxonomías. Cada objeto tiene las propiedades `url`, `title` y `terms`. La
propiedad `terms` es la cantidad de términos dentro de la taxonomía.
{{% /param %}}

{{% param name="data.pages" type="Vector de Objeto" %}}
Páginas de primer nivel. Cada objeto tiene las propiedades `url` y `title`.
{{% /param %}}

{{< /params >}}

### Colecciones

<https://ntrrg.dev/es/:section/index.json>

<https://ntrrg.dev/es/:section/page/:pageNumber/index.json>

<https://ntrrg.dev/es/tags/:tag/index.json>

**Parámetros:**

{{< params >}}

{{% param name=":section" type="Cadena" %}}
Nombre de la sección. Puede ser `blog`, `gallery` o `projects`.
{{% /param %}}

{{% param name=":pageNumber" type="Entero" %}}
Número de página. La primera página es obtenida sin `page/:pageNumber/`.
{{% /param %}}

{{% param name=":tag" type="Cadena" %}}
Nombre de la etiqueta. Debe ser [una etiqueta existente](./../../tags).
{{% /param %}}

{{< /params >}}

Obtiene la lista de elementos de una colección específica. Ver [API](#api) para
mas información sobre las propiedades en común.

**Propiedades:**

{{< params >}}

{{% param name="data.pages" type="Vector de Objeto" %}}
Lista de elementos. Cada página tiene las propiedades `url`, `title`, `image`,
`publishDate`, `date`, `description`, `refs`, `rels` y `taxonomies`. Ver
[Elementos individuales](#elementos-individuales) para más información acerca
de sus propiedades.
{{% /param %}}

{{% param name="data.pagination" type="Objeto" %}}
Información de paginación. Contiene las propiedades `prefix`, `first`, `prev`,
`next` y `last`.
{{% /param %}}

{{< /params >}}

### Elementos individuales

<https://ntrrg.dev/es/:id/index.json>

**Parámetros:**

{{< params >}}

{{% param name=":id" type="Cadena" %}}
Identificador único del elemento. Generalmente es el nombre de la sección a la
que pertenece y su título codificado para URLs.
{{% /param %}}

{{< /params >}}

Obtiene un elemento. Ver [API](#api) para mas información sobre las propiedades
en común.

### Índice de búsqueda

<https://ntrrg.dev/es/search-index/index.json>

Obtiene todos los elementos que pueden ser procesados por motores de búsqueda.
Este recurso no tiene las propiedades comunes. Para invalidación de índices de
búsqueda ver [Información de compilación](#información-de-compilación)

**Propiedades:**

{{< params >}}

{{% param name="documents" type="Vector de Objeto" %}}
Lista de elementos indexables. Cada objeto tiene las propiedades `url`, `type`,
`title`, `publishdate`, `date`, `description`, `content` y `taxonomies`. El
valor de la propiedad `content` es texto plano (sin etiquetas HTML) y está
codificado en Base64. Se debe tener en cuenta que esta propiedad contiene una
cadena UTF-8 y las cadenas de JavaScript son UTF-16.
{{% /param %}}

{{< /params >}}

### Cache

<https://ntrrg.dev/cache.json>

Obtiene los URLs de cada objeto generado, útil para descargar previamente
contenido, por ejemplo con Service Workers.

### Información de compilación

<https://ntrrg.dev/es/build-info/index.json>

Obtiene información acerca de la compilación del proyecto.

**Propiedades:**

{{< params >}}

{{% param name="environment" type="Cadena" %}}
Entorno de compilación.
{{% /param %}}

{{% param name="hash" type="Cadena" %}}
Hash de la última confimación de Git usada para compilar el sitio.
{{% /param %}}

{{% param name="date" type="Cadena" %}}
Fecha de compilación.
{{% /param %}}

{{% param name="hugoVersion" type="Cadena" %}}
Versión de Hugo usada para compilar el sitio.
{{% /param %}}

{{< /params >}}

# Modo sin conexión

Cada vez que un recurso es abierto, este es almacenado en cache (con la ayuda
de un Service Worker), lo que permite acceso sin conexión. Es posible eliminar
los archivos almacenados desde la página de [Ajustes](./../../settings) o
incluso descargar el sitio web completo para obtener acceso sin conexión a
todos los recursos.

## Código fuente

**Requerimientos:**

* Hugo >= 0.78

Descargar el código fuente

```shell-session
$ # Paquete
$ wget https://github.com/ntrrg/ntweb/archive/master.tar.gz
$
$ # Repositorio Git
$ git clone --depth 1 https://github.com/ntrrg/ntweb.git
```

Ejecutar el servidor de Hugo en la carpeta raíz del proyecto:

```shell-session
$ hugo server
```

Ir a <http://localhost:1313/> con un navegador web.

## Docker

```shell-session
$ docker run --rm -p 1313:80 ntrrg/ntweb
```

Ir a <http://localhost:1313/> con un navegador web.

# Atribuciones

Trabando en este proyecto uso/usé:

* [Debian](https://www.debian.org/)

* [XFCE](https://xfce.org/)

* [st](https://st.suckless.org/)

* [Zsh](http://www.zsh.org/)

* [GNU Screen](https://www.gnu.org/software/screen)

* [Git](https://git-scm.com/)

* [EditorConfig](http://editorconfig.org/)

* [Vim](https://www.vim.org/)

* [GNU make](https://www.gnu.org/software/make/)

* [Hugo](https://gohugo.io)

* [Chrome](https://www.google.com/chrome/browser/desktop/index.html)

* [GitHub](https://github.com)

* [Gitlab](https://gitlab.com/)

* [Gogs](https://gogs.io/)

* [Travis CI](https://travis-ci.org)

* [Drone](https://drone.io/)

* [Docker](https://docker.com)

* [Netlify](https://www.netlify.com/)

* [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)

* [Normalize.css](https://necolas.github.io/normalize.css/)

* [Google Tag Manager](https://www.google.com/analytics/tag-manager/)

* [Forestry](https://forestry.io) 

* [FontAwesome](https://fontawesome.com/) 

* [Disqus](https://disqus.com/) 

* [MathJax](https://www.mathjax.org/) 

* [Mage](https://magefile.org/)

* [Termux](https://termux.com)

* [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/)

* [GitHub Actions](https://github.com/features/actions)

* [Lunr](https://lunrjs.com)

