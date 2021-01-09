---
title: Demo page
publishdate: 2028-07-05T18:35:00-04:00
date: 2028-07-05T19:35:00-04:00
description: This is a demo page to see the Markdown styles.
image: images/ntrrg.png
authors:
  - john
series:
  - demo
tags:
  - tag1
  - tag2
  - tag3
draft: true
---

# Paragraphs

Any line with blank lines before and after it is a paragrah, consequent lines
are joined.

You need a blank line for a new paragraph.

# Separators

---

# Heading (h1)

## Heading (h2)

### Heading (h3)

#### Heading (h4)

##### Heading (h5)

# Text decoration

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~This is dashed text~~

<https://ntrrg.dev>

[This is a link](https://ntrrg.dev)

[This is a link with a title](https://ntrrg.dev "This is the title!").

[ntweb]: https://ntrrg.dev

[ntweb][]

[My site][ntweb]

<abbr title="Graphics Interchange Format">GIF</abbr>.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

<kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Delete</kbd>

Miguel Angel (<mark>ntrrg</mark>) Rivera Notararigo.

# Lists

* Create a list by starting a line with `+`, `-`, or `*`
* Sub-lists are made by indenting 2 spaces:
  * This is a sublist
* And everything become normal again

1. This is
2. an ordered
3. list

This
: is a definition list.

Term:
: definition, you can add the `:` in the term.

# Quotes

This paragraph has a footnote[^1].

[^1]: And here is the footnote.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs, if you like.
>
> And **Markdown**!.
>
> -- The Author

# Tables

| Heading | Another heading |
| ------- | --------------- |
| text    | text            |
| text    | text            |
| text    | text            |

| Heading | Another heading |
| :-----: | :-------------: |
|  text   |      text       |
|  text   |      text       |
|  text   |      text       |

| Heading | Another heading |
| ------: | --------------: |
|    text |            text |
|    text |            text |
|    text |            text |

# Images

![Alternative text](images/ntrrg.png "This is the title")

# Code

Inline `code`.

```go
package main

import "fmt"

func main() {
  fmt.Println("hello, world")
}
```

```go {linenos=true,hl_lines=["1", "5-7"],linenostart=1}
package main

import "fmt"

func main() {
  fmt.Println("hello, world")
}
```

# Shortcodes

## TOC

```
< toc [title=TITLE] [open=true|false] >
```

**Parameters:**

{{< params >}}

{{% param name="title" %}}
TOC title.
{{% /param %}}

{{% param name="open" type="Boolean" default="false" %}}
Opens the TOC block by default.
{{% /param %}}

{{< /params >}}

**Examples:**

{{< toc >}}

```html
<details class="toc">
  <summary class="toc-title"><strong>Table of Contents</strong></summary>

  <nav id="TableOfContents">
    <ul>
      <li><a href="#paragraphs">Paragraphs</a></li>
      <li><a href="#separators">Separators</a></li>
      <li><a href="#heading-h1">Heading (h1)</a>
        <ul>
          <li><a href="#heading-h2">Heading (h2)</a>
            <ul>
              <li><a href="#heading-h3">Heading (h3)</a>
                <ul>
                  <li><a href="#heading-h4">Heading (h4)</a>
                    <ul>
                      <li><a href="#heading-h5">Heading (h5)</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li><a href="#text-decoration">Text decoration</a></li>
      <li><a href="#lists">Lists</a></li>
      <li><a href="#quotes">Quotes</a></li>
      <li><a href="#tables">Tables</a></li>
      <li><a href="#images">Images</a></li>
      <li><a href="#code">Code</a></li>
      <li><a href="#shortcodes">Shortcodes</a>
        <ul>
          <li><a href="#toc">TOC</a></li>
          <li><a href="#taks-list">Task List</a></li>
          <li><a href="#images-1">Images</a></li>
          <li><a href="#figures">Figures</a></li>
          <li><a href="#notes">Notes</a></li>
          <li><a href="#details">Details</a></li>
          <li><a href="#math-formulas">Math formulas</a></li>
          <li><a href="#charts">Charts</a></li>
          <li><a href="#imports">Imports</a></li>
          <li><a href="#cards">Cards</a></li>
          <li><a href="#snippets">Snippets</a></li>
          <li><a href="#go-playground">Go Playground</a></li>
          <li><a href="#params">Params</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</details>
```

## Task List

```
< task-list >
CONTENT
< /task-list >
```

**Parameters:**

{{< params >}}

{{% param name="CONTENT" %}}
Unordered list prefixed by `* [ ]` for unchecked elements and `* [x]` for
checked elements.
{{% /param %}}

{{< /params >}}

**Examples:**

{{< task-list >}}
* [ ] This is
* [x] a task list
{{< /task-list >}}

## Images

```
< img src=URL [alt=ALTERNATIVE_TEXT] [lazy=true|false] \
    [class=CLASSES] [style=STYLES] >
```

**Parameters:**

{{< params >}}

{{% param name="src" %}}
Image URL.
{{% /param %}}

{{% param name="alt" %}}
Image alternative text.
{{% /param %}}

{{% param name="lazy" type="Boolean" default="false" %}}
Generates lazy loading friendly `img` HTML tags with `data-src` attribute and
`lazy-load` class.
{{% /param %}}

{{% param name="class" %}}
Image `class` HTML attribute.
{{% /param %}}

{{% param name="style" %}}
Image `style` HTML attribute.
{{% /param %}}

{{< /params >}}

**Examples:**

Inline image with {{< img src="images/hugo.png" style="height: 1em" >}}

```html
<img src="images/hugo.png" alt="" style="height: 1em">
```

---

{{< img src="images/merida.jpg" style="display: block; margin: 0 auto" >}}

```html
<img src="images/merida.jpg" alt="" style="display: block; margin: 0 auto">
```

---

{{< img src="images/ntrrg.png" alt="ntrrg" class="logo" lazy=true >}}

```html
<img data-src="images/ntrrg.png" alt="ntrrg" class="logo lazy-load">
```

## Figures

```
< figure src=URL [alt=ALTERNATIVE_TEXT] [lazy=true|false] \
    [imgclass=CLASSES] [imgstyle=STYLES] [class=CLASSES] [style=STYLES] >
```

**Parameters:**

{{< params >}}

{{% param name="src" %}}
Image URL.
{{% /param %}}

{{% param name="alt" %}}
Image alternative text.
{{% /param %}}

{{% param name="caption" %}}
Figure caption.
{{% /param %}}

{{% param name="lazy" type="Boolean" default="false" %}}
Generates lazy loading friendly `img` HTML tags with `data-src` attribute and
`lazy-load` class.
{{% /param %}}

{{% param name="imgclass" %}}
Image `class` HTML attribute.
{{% /param %}}

{{% param name="imgstyle" %}}
Image `style` HTML attribute.
{{% /param %}}

{{% param name="class" %}}
Figure `class` HTML attribute.
{{% /param %}}

{{% param name="style" %}}
Figure `style` HTML attribute.
{{% /param %}}

{{< /params >}}

**Examples:**

{{< figure src="images/merida.jpg" caption="Mérida, Venezuela." >}}

```html
<figure>
  <img src="images/merida.jpg" alt="">

  <figcaption>
    Mérida, Venezuela.
  </figcaption>
</figure>
```

---

{{< figure src="images/ntrrg.png" caption="[ntrrg](https://ntrrg.dev)" style="text-align: center" >}}

```html
<figure style="text-align: center">
  <img src="images/ntrrg.png" alt="">

  <figcaption>
    <a href="https://ntrrg.dev" target="_blank" rel="noopener noreferrer">
      ntrrg
    </a>
  </figcaption>
</figure>
```

## Notes

```
% note [TITLE] %
CONTENT
% /note %

% note [title=TITLE] [class=CLASSES] %
CONTENT
% /note %
```

**Parameters:**

{{< params >}}

{{% param name="title" %}}
Custom title.
{{% /param %}}

{{% param name="class" %}}
Note `class` HTML attribute.
{{% /param %}}

{{% param name="CONTENT" %}}
Note content.
{{% /param %}}

{{< /params >}}

**Examples:**

{{% note %}}
This is a note.
{{% /note %}}

```html
<div class="note">
  <div class="note-header">Note</div>

  <div class="note-body">
    <p>This is a note.</p>
  </div>
</div>
```

---

{{% note "My title" %}}
This is a note with a **custom title**.
{{% /note %}}

```html
<div class="note">
  <div class="note-header">My title</div>

  <div class="note-body">
    <p>This is a note with a <strong>custom title</strong>.</p>
  </div>
</div>
```

## Details

```
% details [SUMMARY] %
CONTENT
% /details %

% details [summary=SUMMARY] [open=true|false] [class=CLASSES] %
CONTENT
% /details %
```

**Parameters:**

{{< params >}}

{{% param name="summary" %}}
Details summary. Supports Markdown.
{{% /param %}}

{{% param name="open" type="Boolean" default="false" %}}
Opens the details block by default.
{{% /param %}}

{{% param name="class" %}}
Details `class` HTML attribute.
{{% /param %}}

{{% param name="CONTENT" %}}
Details block content.
{{% /param %}}

{{< /params >}}

**Examples:**

{{% details %}}
This is a details block.
{{% /details %}}

```html
<details class="details">
  <p>This is a details block.</p>
</details>
```

---

{{% details "Custom summary" %}}
This is a details block with a **custom summary**.
{{% /details %}}

```html
<details class="details">
  <summary>Custom summary</summary>
  <p>This is a details block with a <strong>custom summary</strong>.</p>
</details>
```

---

{{% details open=true %}}
This is a details block with `open=true`.
{{% /details %}}

```html
<details open="open" class="details">
  <p>This is a details block with <code>open=true</code>.</p>
</details>
```

## Wrapping

```
% wrap CLASSES %
CONTENT
% /wrap %

% wrap [id=ID] [class=CLASSES] [style=STYLES] %
CONTENT
% /wrap %
```

**Parameters:**

{{< params >}}

{{% param name="id" %}}
Wrapper `id` HTML attribute.
{{% /param %}}

{{% param name="class" %}}
Wrapper `class` HTML attribute.
{{% /param %}}

{{% param name="style" %}}
Wrapper `style` HTML attribute.
{{% /param %}}

{{% param name="CONTENT" %}}
Wrapped content.
{{% /param %}}

{{< /params >}}

**Examples:**

{{% wrap "center small muted" %}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.
{{% /wrap %}}

```html
<div class="center small muted">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat.  Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum.
  </p>
</div>
```

---

{{< wrap style="display: flex" >}}

{{% wrap class="col" %}}
![ntrrg](images/ntrrg.png)
{{% /wrap %}}

{{% wrap class="col" %}}
This is a **Markdown** text.
{{% /wrap %}}

{{< wrap class="col" >}}
{{< img src="images/ntrrg.png" alt="ntrrg" >}}
{{< /wrap >}}

{{< /wrap >}}

```html
<div style="display: flex">
  <div class="col">
    <p><img src="images/ntrrg.png" alt="ntrrg"></p>
  </div>

  <div class="col">
    <p>This is a <strong>Markdown</strong> text.</p>
  </div>

  <div class="col">
    <img src="images/ntrrg.png" alt="ntrrg">
  </div>
</div>
```

## Math formulas

```
< math >
CONTENT
< /math >
```

**Parameters:**

{{< params >}}

{{% param name="CONTENT" %}}
Math syntax. See http://docs.mathjax.org/en/latest/basic/mathematics.html for
more information about the syntax.
{{% /param %}}

{{< /params >}}

**Examples:**

This is text with inline math {{< math >}}\\(\sum\_{n=1}^{\infty} 2^{-n} = 1\\){{< /math >}}
and this is a math block:

{{< math >}}
$$
\sum\_{n=1}^{\infty} 2^{-n} = 1
$$
{{< /math >}}

## Charts

```
< mermaid [CAPTION] >
SOURCE_CODE
< /mermaid >

< mermaid [caption=CAPTION] [font=FONT_FAMILY] [theme=THEME] \
    [code=true|false] [class=CLASSES] >
SOURCE_CODE
< /mermaid >
```

**Parameters:**

{{< params >}}

{{% param name="caption" %}}
Chart caption. Supports Markdown.
{{% /param %}}

{{% param name="font" %}}
Chart font family. This works only the first time the shortcode is called,
after that, every chart will use this value.
{{% /param %}}

{{% param name="theme" %}}
Chart theme. This works only the fist time the shortcode is called, after that,
every chart will use this value.
{{% /param %}}

{{% param name="code" type="Boolean" default="false" %}}
Displays the chart source code.
{{% /param %}}

{{% param name="class" %}}
Figure `class` HTML attribute.
{{% /param %}}

{{% param name="SOURCE_CODE" %}}
Mermaid source code.
{{% /param %}}

{{< /params >}}

**Examples:**

{{< mermaid caption="Chart caption." theme="forest" font="monospace" >}}
```mermaid
graph TD
  A[Christmas] -->|Get money| B(Go shopping)
  B --> C{Let me think}
  C -->|One| D[Laptop]
  C -->|Two| E[Phone]
  C -->|Three| F[fa:fa-car Car]
```
{{< /mermaid >}}

```html
<figure class="mermaid-chart">
  <div class="mermaid-output">...</div>
  <figcaption>Chart caption.</figcaption>
  <div class="mermaid-code" style="display: none">...</div>
</figure>
```

---

{{< mermaid code=true >}}
```mermaid
graph TD
  A[Christmas] -->|Get money| B(Go shopping)
  B --> C{Let me think}
  C -->|One| D[Laptop]
  C -->|Two| E[Phone]
  C -->|Three| F[fa:fa-car Car]
```
{{< /mermaid >}}

```html
<figure class="mermaid-chart">
  <div class="mermaid-output">...</div>
  <div class="mermaid-code">...</div>
</figure>
```

## Imports

```
< import PATH >
```

**Parameters:**

{{< params >}}

{{% param name="PATH" %}}
File path. It may be a relative path to the current file or an absolute path
from the project root.
{{% /param %}}

{{< /params >}}

**Examples:**

{{< import "files/imports.en.md" >}}

## Cards

```
< card SLUG >
```

**Parameters:**

{{< params >}}

{{% param name="SLUG" %}}
Relative page path from the `content` directory.
{{% /param %}}

{{< /params >}}

**Examples:**

{{< card "/blog/demo/" >}}

```html
<article class="page-card has-image">
  <a href="/en/blog/demo-page/">
    <img class="page-card-image" alt="Demo page" src="/en/blog/demo-page/images/ntrrg.png"/>
  </a>

  <header>
    <strong class="page-card-title">
      <a href="/en/blog/demo-page/">Demo page</a>
    </strong>

    <p class="page-card-description">
        This is a demo page to see the Markdown styles.
    </p>
  </header>

  <section class="page-card-metadata">
    <div>
      <strong>Published:</strong>

      <time datetime="2028/07/05 18:35:00 -04:00">
        2028/07/05 18:35:00 -04:00
      </time>
    </div>

    <div>
      <strong>Modified:</strong>

      <time datetime="2028/07/05 19:35:00 -04:00">
        2028/07/05 19:35:00 -04:00
      </time>
    </div>

    <div>
      <strong>Authors:</strong>
      <a href="/en/authors/john/">John Doe</a>
    </div>

    <div>
      <strong>Series:</strong>
      <a href="/en/series/demo/">Demo serie</a>
    </div>

    <div>
      <strong>Tags:</strong>
      <a href="/en/tags/tag1/">#tag1</a>
      <a href="/en/tags/tag2/">#tag2</a>
      <a href="/en/tags/tag3/">#tag3</a>
    </div>
  </section>
</article>
```

## Snippets

```
< snippets [PATH] >

< snippets [path=PATH] [hl=SYNTAX_HIGHLIGHT] \
    [foldable=true|false [name=FILE_NAME] [open=true|false]] >
```

**Parameters:**

{{< params >}}

{{% param name="path" %}}
Snippet path. It may be a relative path to the current file or an absolute path
from the project root.
{{% /param %}}

{{% param name="hl" %}}
Syntax highlight mode.
{{% /param %}}

{{% param name="foldable" type="Boolean" default="false" %}}
Creates a foldable snippet.
{{% /param %}}

{{% param name="name" %}}
File name to display in the foldable menu.
{{% /param %}}

{{% param name="open" type="Boolean" default="false" %}}
Opens the foldable snippet.
{{% /param %}}

{{< /params >}}

**Examples:**

{{< snippet "files/hello.go" >}}

---

{{< snippet path="files/hello.go" hl="go {linenos=true,hl_lines=[\"1\", \"5-7\"],linenostart=1}" foldable=true name="main.go" open=true >}}

```html
<details class="foldable-snippet" open="open">
  <summary><code>main.go</code></summary>
  <div class="highlight">...</div>
</details>
```

## Go Playground

```
< go-playground >
SOURCE_CODE
< /go-playground >

< go-playground >
[SAMPLE]

"--- PLAYGROUND ---"

SOURCE_CODE
< /go-playground >

< go-playground ID >
[SAMPLE]
< /go-playground >

```

**Parameters:**

{{< params >}}

{{% param name="ID" %}}
Go Playground snippet identifier. Useful for linking snippets that already
exist.
{{% /param %}}

{{% param name="SAMPLE" %}}
Source code to display.
{{% /param %}}

{{% param name="SOURCE_CODE" %}}
Source code to send to the Go Playgroud.
{{% /param %}}

{{< /params >}}

**Examples:**

{{< go-playground >}}
```go
package main

import "fmt"

func main() {
  fmt.Println("hello, world")
}
```
{{< /go-playground >}}

---

{{< go-playground >}}
```go
fmt.Println("hello, world")
```

--- PLAYGROUND ---

```go
package main

import "fmt"

func main() {
  fmt.Println("hello, world")
}
```
{{< /go-playground >}}

---

The first line is the package name

```go
package main
```

Next, the external packages used in this program

```go
import "fmt"
```

Finally the program body

```go
func main() {
  fmt.Println("hello, world")
}
```

{{< go-playground >}}
--- PLAYGROUND ---

```go
package main

import "fmt"

func main() {
  fmt.Println("hello, world")
}
```
{{< /go-playground >}}

---

{{< go-playground "hR9ZBMz-Pst" >}}
```go
fmt.Println("hola, mundo")
```
{{< /go-playground >}}

## Params

```
< params >
% param [name=NAME] [type=DATA_TYPE] [default=DEFAULT_VALUE] %
DESCRIPTION
% /param %
< /params >
```

**Parameters:**

{{< params >}}

{{% param name="name" %}}
Parameter name.
{{% /param %}}

{{% param name="type" default=`"String"` %}}
Parameter data type.
{{% /param %}}

{{% param name="default" %}}
Parameter default value.
{{% /param %}}

{{% param name="DESCRIPTION" %}}
Parameter description.
{{% /param %}}

{{< /params >}}

**Examples:**

{{< params >}}

{{% param name="s" %}}
String variable.
{{% /param %}}

{{% param name="n" type="Integer" %}}
Numeric variable.
{{% /param %}}

{{% param name="b" type="Boolean" default="true" %}}
Boolean variable.
{{% /param %}}

{{% param name="-f" %}}
Short CLI flag.
{{% /param %}}

{{% param name="--flag" %}}
Long CLI flag.
{{% /param %}}

{{% param name="-f | --flag" %}}
Double CLI flags.
{{% /param %}}

{{% param name="/f" %}}
MS-DOS flag.
{{% /param %}}

{{< /params >}}

```html
<div class="params">
  <div class="param">
    <div class="param-header">
      <span class="param-name"><code>s</code></span>
      - <span class="param-type">String</span>
    </div>

    <div class="param-body">
      <p>String variable.</p>
    </div>
  </div>

  <div class="param">
    <div class="param-header">
      <span class="param-name"><code>n</code></span>
      - <span class="param-type">Integer</span>
    </div>

    <div class="param-body">
      <p>Numeric variable.</p>
    </div>
  </div>

  <div class="param">
    <div class="param-header">
      <span class="param-name"><code>b</code></span>
      - <span class="param-type">Boolean</span>
      <span class="param-default">(<code>true</code>)</span>
    </div>

    <div class="param-body">
      <p>Boolean variable.</p>
    </div>
  </div>

  <div class="param">
    <div class="param-header">
      <span class="param-name"><code>-f</code></span>
      - <span class="param-type">String</span>
    </div>

    <div class="param-body">
      <p>Short CLI flag.</p>
    </div>
  </div>

  <div class="param">
    <div class="param-header">
      <span class="param-name"><code>--flag</code></span>
      - <span class="param-type">String</span>
    </div>

    <div class="param-body">
      <p>Long CLI flag.</p>
    </div>
  </div>

  <div class="param">
    <div class="param-header">
      <span class="param-name"><code>-f | --flag</code></span>
      - <span class="param-type">String</span>
    </div>

    <div class="param-body">
      <p>Double CLI flags.</p>
    </div>
  </div>

  <div class="param">
    <div class="param-header">
      <span class="param-name"><code>/f</code></span>
      - <span class="param-type">String</span>
    </div>

    <div class="param-body">
      <p>MS-DOS flag.</p>
    </div>
  </div>
</div>
```

