---
title: Settings
type: custom
layout: settings
actions:
  - id: theme-selector
    text: Theme
    options:
      - text: Light
        value: light
      - text: Dark
        value: dark
      - text: Black
        value: black
  - id: code-theme-selector
    text: Code theme
    options:
      - text: Monokai Light
        value: monokailight
      - text: Monokai
        value: monokai
  - id: cache-mode
    text: Cache
    help: Populating cache will make the whole site available offline, this actions is done in background.
    options:
      - text: Enable
        value: enable
      - text: Disable
        value: enable
      - text: Populate
        value: populate
      - text: Clean
        value: clean
_build:
  list: false
---

# Sample

Inline `code`.

```go {linenos=true,hl_lines=["1", "5-7"],linenostart=0}
package main

import "fmt"

func main() {
  fmt.Println("hello, world")
}
```

