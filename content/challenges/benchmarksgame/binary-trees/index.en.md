---
title: "binary-trees"
date: 2020-12-05T17:00:00-04:00
metadata:
  difficulty: Medium
  platform: The Computer Language Benchmarks Game
  url: https://benchmarksgame-team.pages.debian.net/benchmarksgame/performance/binarytrees.html
tags:
  - challenges-medium
  - challenges-benchmarksgame
  - go
---

In this challenge, you will be given a string. You must remove characters until
the string is made up of any two alternating characters. When you choose a
character to remove, all instances of that character must be removed. Your goal
is to create the longest string possible that contains just two alternating
letters.

As an example, consider the string `"abaacdabd"`. If you delete the character
`'a'`, you will be left with the string `"bcdbd"`. Now, removing the character
`'c'` leaves you with a valid string `"bdbd"` having a length of 4. Removing
either `'b'` or `'d'` at any point would not result in a valid string.

Given a string `s`, convert it to the longest possible string `t` made up only
of altrenating characters. Print the length of string `t` on a new line. If no
string `t` can be formed, print `0` instead.

# Input Format

A single integer, `max`.

**Constraints:**

* 1 <= |`max`| <= 62

# Output Format

Print a single integer denoting the maximum length of `t` for the given `s`; if
it is not possible to form string `t`, print `0` instead.

# Sample

{{< challenge-sample >}}

# Solution

{{< snippet path="main.go" hl="go" foldable=true >}}

