---
title: "Counting Words"
date: 2021-03-18T16:20:00-04:00
metadata:
  difficulty: Easy
  platform: Ben Hoyt's website
  url: https://benhoyt.com/writings/count-words/
tags:
  - challenges-easy
  - challenges-personal
  - go
---

See the [challenge description](https://benhoyt.com/writings/count-words/).

# Usage

```shell-session
$ go build -o solution main.go

$ wget 'https://raw.githubusercontent.com/benhoyt/countwords/master/kjvbible.txt'

$ for _ in $(seq 10); do cat kjvbible.txt; done | ./solution
```

# Sample

{{< challenge-sample >}}

# Solution

{{< snippet path="main.go" hl="go" foldable=true >}}

