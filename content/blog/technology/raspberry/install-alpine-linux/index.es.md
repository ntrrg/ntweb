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

Hace un tiempo me dieron de regalo una Raspberry Pi Zero W, y ahora también
tengo una 4B, son geniales, ocupan poco espacio, son económicas, consumen poca
energía, tienen una capacidad de computo y memoria decente, en fin, el sueño de
un minimalista.

Pero estas maquinitas no hacen todo solas, necesitan ayuda del software, de un
sistema operativo para ser más específicos, y aunque hay bastantes opciones,
sería igual de genial elegir una que tenga características similares a las del
nuevo juguete.

Alpine Linux es mi distribución favorita, y de hecho la uso en mi computadora
personal, acepto que puede ser un poco complicada de configurar las primeras
veces, pero después de estar familiarizado con estos procesos, sin duda alguna,
la flexibilidad y el control que se obtienen, es algo que no cambiaría.

Por suerte no todo es tan complicado, Alpine provee oficialmente soporte para
el proyecto Raspberry Pi, con imágenes que contienen Linux y firmware
precompilado, así que no hay que preocuparse por hacer magia negra y pactos con
demonios para lograr que todo funcione correctamente.

Dependiendo del modelo del hardware, se debe descargar una imagen específica,
aquí está una lista de arquitecturas disponibles y los modelos con los que
corresponden:

[`aarch64`]: https://dl-cdn.alpinelinux.org/alpine/v3.13/releases/aarch64/alpine-rpi-3.13.5-aarch64.tar.gz
[`armhf`]: https://dl-cdn.alpinelinux.org/alpine/v3.13/releases/armhf/alpine-rpi-3.13.5-armhf.tar.gz

| Arquitectura | Modelos |
| --- | --- |
| [`aarch64`][] | 4B |
| [`armhf`][] | Zero, Zero W |

Entonces por ejemplo, para la Raspberry Pi 4B se debe que descargar la imagen
`aarch64`, lo que se puede hacer desde la [página oficial](https://alpinelinux.org/downloads/).

```shell-session
$ wget 'https://dl-cdn.alpinelinux.org/alpine/v3.13/releases/aarch64/alpine-rpi-3.13.5-aarch64.tar.gz'
```

Y luego verificar que se descargó correctamente.

```shell-session
$ sha256sum -c <(echo "87e25beb3bd3a43d7f430b98aa3cee529b743940f804a7b8bbb9c05dc526a6f4  alpine-rpi-3.13.5-aarch64.tar.gz")
alpine-rpi-3.13.5-aarch64.tar.gz: OK
```

Ahora solo queda preparar la micro SD, pero para esto hay que determinar como
será usada la mini computadora. Si se pretende ejecutar un servicio muy
específico y su uso estará limitado a esto, una instalación con [configuración
efímera](#configuración-efímera) será más que suficiente. Si el uso que se le
dará es más cotidiano o si constantemente se estarán realizando cambios a las
configuraciones, probablemente una instalación con [configuración persistente](#configuración-persistente)
sea la más adecuada

# Configuración efímera

# Configuración persistente

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
# cat << EOF > /media/mmcblk0p1/usercfg.txt
dtparam=audio=on

#total_mem=1024
gpu_mem=256
dtoverlay=vc4-kms-v3d-pi4

hdmi_drive=2
hdmi_enable_4kp60=1
#hdmi_safe=1
EOF
```

```shell-session
# reboot
```

Después de instalar

```shell-session
$ # RPi4
# apk add mesa-dri-vc4
```

```shell-session
# rm -r /boot/apks /boot/boot
```

```shell-session
# sed -i '/cdrom/d' /mnt/etc/fstab
```

```shell-session
# sed -i '/floppy/d' /mnt/etc/fstab
```

<https://wiki.alpinelinux.org/wiki/Classic_install_or_sys_mode_on_Raspberry_Pi>
