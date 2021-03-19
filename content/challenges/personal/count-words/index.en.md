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

Write a program to count the frequencies of unique words from standard input,
then print them out with their frequencies, ordered most frequent first.

A word is a case insensitive sequence of non-white-space characters, it means
`Hello` and `hello` are the same word, but `bye` and `bye.` are different.

**Rules:**

* Do not load the whole input to memory, read it by chunks (unless it is a
  small piece of text).

* Don't parallelize the algorithm.

* Don't implement fancy hash tables (unless the language doesn't have a
  built-in hash table).

* Use only the language standard library.

# Input Format

The whole input is a single test case. It may contain multiple lines.

**Constraints:**

* Text will be only ASCII character.

# Output Format

The output should be a line-separated list of words and their frequency.

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

