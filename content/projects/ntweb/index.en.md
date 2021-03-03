---
metadata:
  source-code: https://github.com/ntrrg/ntweb
  license: CC-BY-4.0
title: ntWeb
description: A small site with great intentions.
tags:
  - website
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

**ntWeb** is a small site with great intentions. It provides a portfolio, a
blogging platform, a coding challenges collection, a gallery, documentation for
Go packages and a JSON API.

Probably anyone could think of this as a really simple project and its author
is a bad frontend developer, and actually, it is true in some way because it is
not my profile, but its simplicity is intentional (and it is written with
modern web technologies).

[Hugo]: https://gohugo.io
[Go]: https://golang.org
[Mage]: https://magefile.org

The website is created by [Hugo][] and some parts of the content are generated
by [Go][] and [Mage][] (specifically the projects and the Go packages
documentation pages).

For been printed in the web browser, the home page downloads ~30 KB (~12 KB
without favicons), this page downloads ~265 KB (including its images). It is
functional without JavaScript and can be visualized on TUI web browsers.

{{< figure src="images/elinks-home-en.png" class="center" caption="Home page on TUI" >}}

{{< figure src="images/elinks-projects-en.png" class="center" caption="Projects on TUI" >}}

{{< figure src="images/elinks-ntweb-en.png" class="center" caption="This page on TUI" >}}

Its content may be fetched as JSON, so creating new complex frontends is
trivial without the need for content duplication. Since it is a static API, it
has good performance because of the lack of computing complexity (just reading
a file), it is more resistant to cyber-attacks because there is no database
server and it can be hosted in any service supporting static files.

# API

Almost any HTML page has a JSON output format, it could be fetched by appending
`index.json` to its URL, so the JSON URL of this page should be
`https://ntrrg.dev/en/projects/ntweb/index.json`.

Every page has the following properties:

{{< params >}}

{{% param name="url" %}}
Resource URL.
{{% /param %}}

{{% param name="kind" %}}
Resource type. It may be one of `home`, `section`, `taxonomy`, `term` or
`page`.
{{% /param %}}

{{% param name="type" %}}
Content type. It may be one of `blog`, `gallery`, `projects`, `tag` or `page`.
{{% /param %}}

{{% param name="lang" %}}
Resource language.
{{% /param %}}

{{% param name="title" %}}
Resource title.
{{% /param %}}

{{% param name="image" %}}
Resource image URL.
{{% /param %}}

{{% param name="params" %}}
Resource frontmatter parameters. This may be different from page types.
{{% /param %}}

{{% param name="content" %}}
Resource rendered Markdown content (HTML). Notice that this contains a Base64
encoded UTF-8 string and JavaScript strings are UTF-16.
{{% /param %}}

{{% param name="data" type="Object" %}}
Resource specific data. For the main page, this contains all the sections,
taxonomies and top-level pages; for collections this contains its elements and
pagination information; and for single elements this contains a list of related
content.
{{% /param %}}

{{% param name="altLang" type="Array of Object" %}}
Resource translations. Every object has the `lang` and `url` properties.
{{% /param %}}

{{% param name="altMediaType" type="Array of Object" %}}
Resource alternative formats. Every object has the `mediaType` and `url`
properties.
{{% /param %}}

{{< /params >}}

```shell-session
$ wget -qO - https://ntrrg.dev/en/projects/ntweb/index.json | jq
{
  "url": "https://ntrrg.dev/es/en/projects/ntweb/",
  "kind": "page",
  "type": "projects",
  "lang": "en",
  "title": "ntWeb",
  "image": "",
  "params": {
    "comments": true,
    "description": "A small site with great intentions.",
    "draft": false,
    "iscjklanguage": false,
    "metadata": {
      "license": "CC-BY-4.0",
      "source-code": "https://github.com/ntrrg/ntweb"
    },
    "tags": [
      "website",
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
  "data": {
    "related": [...]
  },
  "altLang": [
    {
      "lang": "es",
      "url": "https://ntrrg.dev/es/es/projects/ntweb/"
    }
  ],
  "altMediaType": [
    {
      "mediaType": "text/html",
      "url": "https://ntrrg.dev/es/en/projects/ntweb/"
    }
  ]
}
```

## Endpoints

### Main

<https://ntrrg.dev/en/index.json>

Retrieves all the top-level elements. See [API](#api) for more details about
common properties.

**Properties:**

{{< params >}}

{{% param name="data.sections" type="Array of Object" %}}
Website sections. Every object has the `url`, `title` and `pages` properties.
The `pages` property is the count of pages inside the section.
{{% /param %}}

{{% param name="data.taxonomies" type="Array of Object" %}}
Website taxonomies. Every object has the `url`, `title` and `terms` properties.
The `terms` property is the count of terms inside the taxonomy.
{{% /param %}}

{{% param name="data.pages" type="Array of Object" %}}
Top-level pages. Every object has the `url` and `title` properties.
{{% /param %}}

{{< /params >}}

### Collections

<https://ntrrg.dev/en/:section/index.json>

<https://ntrrg.dev/en/:section/page/:pageNumber/index.json>

<https://ntrrg.dev/en/tags/:tag/index.json>

**Parameters:**

{{< params >}}

{{% param name=":section" %}}
Section name. This should be an existent section.
{{% /param %}}

{{% param name=":pageNumber" type="Integer" %}}
Page number. The first page is retrieved without `page/:pageNumber/`.
{{% /param %}}

{{% param name=":tag" %}}
Tag name. This should be [an existent tag](./../../tags).
{{% /param %}}

{{< /params >}}

Retrieves the list of elements from the given collection. See [API](#api) for
more details about common properties.

**Properties:**

{{< params >}}

{{% param name="data.pages" type="Array of Object" %}}
List of elements. Every object has the `url`, `title`, `image`, `publishDate`,
`date`, `description`, `refs`, `rels` and `taxonomies` properties. See
[Single elements](#sigle-elements) for more information about its properties.
{{% /param %}}

{{% param name="data.pagination" type="Object" %}}
Pagination object. It contains the `prefix`, `first`, `prev`, `next` and `last`
properties.
{{% /param %}}

{{< /params >}}

### Single elements

<https://ntrrg.dev/en/:id/index.json>

**Parameters:**

{{< params >}}

{{% param name=":id" %}}
Element unique identifier. Generally it is the section name and the URL encoded
element title.
{{% /param %}}

{{< /params >}}

Retrieves a single element. See [API](#api) for more details about common
properties.

**Properties:**

{{< params >}}

{{% param name="data.related" type="Array of Object" %}}
List of related content. Every object has the `url`, `type`, `title`,
`description` and `image` properties.
{{% /param %}}

{{< /params >}}

### Search index

<https://ntrrg.dev/en/search-index/index.json>

Retrieves all the indexable elements for search engines. This doesn't have the
common properties. For search index invalidation see [build information](#build-information).

**Properties:**

{{< params >}}

{{% param name="documents" type="Array of Object" %}}
List of indexable elements. Every object has the `url`, `type`, `title`,
`publishdate`, `date`, `description`, `content` and `taxonomies` properties.
The value of the `content` property is in plain text (no HTML tags) and it is
Base64 encoded, notice that this contains a UTF-8 string and JavaScript strings
are UTF-16.
{{% /param %}}

{{< /params >}}

### Cache

<https://ntrrg.dev/cache.json>

Retrieves the URLs of every generated object, useful for prefetching content,
with Service Workers for example.

### Build information

<https://ntrrg.dev/en/build-info/index.json>

Retrieves build information about the project.

**Properties:**

{{< params >}}

{{% param name="environment" %}}
Build environment.
{{% /param %}}

{{% param name="hash" %}}
Last Git commit hash used for building the site.
{{% /param %}}

{{% param name="date" %}}
Building date.
{{% /param %}}

{{% param name="hugoVersion" %}}
Hugo version used for building the site.
{{% /param %}}

{{< /params >}}

# Offline mode

Every time a resource is open, it is stored in cache (with a Service Worker),
which allows offline browsing. It is possible to clean the stored files from
the [Settings](./../../settings) page or even download the whole site for a
full offline experience.

## Source code

**Requirements:**

* Hugo >= 0.81

Get the source code

```shell-session
$ # Package
$ wget https://github.com/ntrrg/ntweb/archive/master.tar.gz
$
$ # Git repository
$ git clone --depth 1 https://github.com/ntrrg/ntweb.git
```

Run the Hugo server in the project root directory

```shell-session
$ hugo server
```

Go to <http://localhost:1313/> with a browser.

## Docker

```shell-session
$ docker run --rm -p 1313:80 ntrrg/ntweb
```

Go to <http://localhost:1313/> with a browser.

# Acknowledgment

Working on this project I use/used:

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

