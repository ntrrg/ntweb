---
title: {{ replace .Name "-" " " | title }}
publishdate: {{ .Date }}
date: {{ .Date }}
description: Short description.
image: https://via.placeholder.com/350x350
rels:
  - .authors.john
relsweight:
  .authors.john: 1
tags:
  - tag1
  - tag2
  - tag3
toc: true
math: false
autolist: true
comments: true
draft: true
---

