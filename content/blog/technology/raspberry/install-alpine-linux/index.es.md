---
title: Instalar Alpine Linux en una Raspberry Pi
date: 2021-05-18T18:00:00-04:00
description: Hardware minimalista + Sistema operativo minimalista = Felices por siempre. A veces menos es más.
image: images/rpi-alpine.png
tags:
  - tecnología
  - guías
  - instalaciones
  - sistemas-operativos
  - linux
  - alpine
draft: true
---

Así que decidieron comprar una Raspberry Pi, son geniales ¿no? Ocupan poco
espacio, consumen poca energía, tienen una capacidad de computo y memoria
decente, en fin, el sueño de un minimalista.

Pero estas maquinitas no hacen todo solas, necesitan ayuda del software, un
sistema operativo para ser más específicos, y aunque hay bastantes opciones,
sería igual de genial elegir una que tenga características similares a las de
nuestro juguete nuevo.

Alpine Linux es mi distribución favorita, acepto que puede ser un poco
complicada de configurar las primeras veces, pero después de estar
familiarizado con estos procesos, sin duda alguna, la flexibilidad y el control
que se obtienen, es algo que no cambiaría.

Por suerte no todo es tan complicado, Alpine provee oficialmente soporte para
el proyecto Raspberry Pi, con imágenes que contienen Linux y firmware
precompilado, así que no hay que preocuparse por hacer magia negra y pactos con
demonios para lograr que todo funcione correctamente.

Dependiendo de la función que vaya a cumplir la Raspberry se deberán seguir
ciertos procedimientos.

| Arquitectura | Modelos |
| --- | --- |
| `aarch64` | 4B |
| `armhf` | Zero, Zero W |

```shell-session
$ wget 'https://dl-cdn.alpinelinux.org/alpine/v3.13/releases/aarch64/alpine-rpi-3.13.5-aarch64.tar.gz'
```

```shell-session
$ sha256sum -c <(echo "87e25beb3bd3a43d7f430b98aa3cee529b743940f804a7b8bbb9c05dc526a6f4  alpine-rpi-3.13.5-aarch64.tar.gz")
alpine-rpi-3.13.5-aarch64.tar.gz: OK
```

# Instalación parcial

# Instalación completa

```shell-session
# fdisk /dev/mmcblk0
Command: o
Command: n
Select: [Enter]
Partition number: [Enter]
First sector: [Enter]
Last sector: +256M
Command: a
Command: t
Hex code or alias: 0c  # Que es "W95 FAT32 (LBA)"
Command: n
Select: [Enter]
Partition number: [Enter]
First sector: [Enter]
Last sector: [Enter]
Command: w
```

```shell-session
# mkfs.fat -F 32 /dev/mmcblk0p1
```

```shell-session
# mount -t vfat -o uid=1000,gid=1000 /dev/mmcblk0p1 /mnt
```

```shell-session
# tar -xf alpine-rpi-3.13.5-aarch64.tar.gz -C /mnt
```

```shell-session
# umount /mnt
```

Ahora en la Raspberry

```shell-session
# setup-alpine
```

```shell-session
# apk add btrfs-progs cryptsetup dosfstools lvm2 util-linux
```

```shell-session
# mkfs.btrfs -f /dev/mmcblk0p2
```

```shell-session
# mount -t btrfs /dev/mmcblk0p2 /mnt
```

```shell-session
# mount -o remount,rw /media/mmcblk0p1
```

```shell-session
# mkdir -p /mnt/boot
```

```shell-session
# mount -o bind /media/mmcblk0p1 /mnt/boot
```

```shell-session
# setup-disk -m sys /mnt
```

```shell-session
# echo "dtparam=audio=on" >> /media/mmcblk0p1/usercfg.txt
```

```shell-session
# reboot
```

Después de instalar

```shell-session
# rm -r /boot/apks /boot/boot
```

```shell-session
# sed -i '/cdrom/d' /mnt/etc/fstab
```

```shell-session
# sed -i '/floppy/d' /mnt/etc/fstab
```

