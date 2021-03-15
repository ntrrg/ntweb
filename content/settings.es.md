---
url: /es/ajustes
title: Ajustes
type: custom
layout: settings
actions:
  - id: theme-selector
    text: Tema
    options:
      - text: Claro
        value: light
      - text: Oscuro
        value: dark
      - text: Negro
        value: black
  - id: code-theme-selector
    text: Tema de código
    options:
      - text: Monokai Light
        value: monokailight
      - text: Monokai
        value: monokai
  - id: cache-mode
    text: Cache
    help: Cargar el cache hará que todo el sitio web esté disponible sin conexión.
    options:
      - text: Activar
        value: enable
      - text: Desactivar
        value: disable
      - text: Cargar
        value: populate
      - text: Limpiar
        value: clean
codetheme:
_build:
  list: false
---

# Muestra

Este es `código` de línea.

```go {linenos=true,hl_lines=["1", "5-7"],linenostart=0}
package main

import "fmt"

func main() {
  fmt.Println("hello, world")
}
```

