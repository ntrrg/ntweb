---
title: Buscar
type: custom
layout: search
_build:
  list: false
---

{{% details summary="Ayuda:" class="no-border small muted" %}}
Cada palabra de la búsqueda representa un termino, que es un elemento de
comparación, si se escribe la palabra `contenedores`, el resultado será todos
los documentos que contengan este término en su título, descripción o
contenido. Si se realiza una búsqueda con múltiples términos, el resultado
serán todos los documentos que contengan al menos uno de ellos. Para
especificar que todos los documentos deben contener o no un término se usan los
prefijos `+` y `-` respectivamente, por ejemplo, `-contenedores` mostrará los
documentos que no contengan este termino.

El símbolo `*` se puede usar para representar cualquier caracter, cualquier
cantidad de veces, por ejemplo `foo*` mostraría cualquier documento que
contenga una palabra que comience con `foo`, y `*oo` mostraría cualquiera con
una palabra que termine con `oo`.

También es posible restringir cada término a un campo, por ejemplo, `title:go`
mostrará cualquier documento con `go` en su título. Los campos soportados son:
`type`, `title`, `description`, `content` y `tags`.

[Documentación de Lunr]: https://lunrjs.com/guides/searching.html

Si se necesitan búsquedas más complejas, la [documentación de Lunr][] puede ser
de ayuda.
{{% /details %}}

