---
title: Search
type: custom
layout: search
_build:
  list: false
---

{{% details summary="Help:" class="no-border small muted" %}}
Every word in the search query is a term, which is comparison element, if
`containers` is given, all the documents containing this term in its title,
description or content will be printed. If more term are given, all the
documents containing at least one of them will be printed. Forcing a term
existence or absence is done be prefixing it with the symbols `+` and `-`
respectively, so if `-containers` is given, the result will be all the
documents without this term.

The `*` symbol may be used for matching any character, any times, e.g. `foo*`
will print any document that contains a word starting with `foo`, and `*oo`
will print any document with a word ending with `oo`.

It is possible to restrict every term by field, e.g. `title:go` will print
any document containing `go` in its title. The supported fields are: `type`,
`title`, `description`, `content` and `tags`.

[Lunr documentation]: https://lunrjs.com/guides/searching.html

For more complex searching, the [Lunr documentation][] may help.
{{% /details %}}

