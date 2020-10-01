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
authors:
  - john
series:
  - demo
tags:
  - tag1
  - tag2
  - tag3
toc: true
aside: true
comments: true
draft: true
---

