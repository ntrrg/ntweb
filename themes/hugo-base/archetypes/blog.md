---
title: {{ replace .Name "-" " " | title }}
author:
  type: Person
  name: John Doe
  email: john@example.com
  website: https://example.com/en/authors/john
publishdate: {{ .Date }}
date: {{ .Date }}
description: Short description.
image: https://via.placeholder.com/350x350
rels:
  - .authors.john
  - .series.demo
relsweight:
  .series.demo: 1
tags:
  - tag1
  - tag2
  - tag3
toc: false
math: false
comments: false
draft: true
---

