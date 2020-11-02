---
title: Alias de correo electrónico con Google Domains
date: 2020-11-02T16:30:00-04:00
image: images/google-domains.png
description: Google Domains permite crear correos electrónicos corporativos sin tener que hacer configuraciones complejas.
tags:
  - tecnología
  - guías
  - redes
  - dns
  - correo-electrónico
---

Un alias de correo electrónico puede interpretarse como un correo electrónico
ficticio que reenvía todos los correos que recibe al correo que apunta. Por
ejemplo, si se crea el alias `ejemplo@ntrrg.dev` y se le asigna
`ntrrgx@gmail.com` como objetivo, cada vez que llegue un correo a
`ejemplo@ntrrg.dev`, este será reenviado a `ntrrgx@gmail.com`.

Para configurar un alias de correo electrónico con Google Domains, el
administrador del dominio debe seguir unos pocos pasos:

1\. Abrir la [interfaz de Google Domains](https://domains.google.com/registrar/).

{{< img src="images/google-domains-interface.png" alt="Interfaz de Google Domains" class="center" >}}

2\. Seleccionar el dominio donde se quiere crear el alias.

3\. Ir a la configuración de correo electrónico.

{{< img src="images/google-domains-select-email.png" alt="Configuración de correo electrónico" class="center" >}}

4\. Buscar la sección de reenvío de correos electrónicos y hacer clic en
*«Agregar un alias de correo electrónico»*.

{{< img src="images/google-domains-add-alias.png" alt="Agregar alias de correo electrónico" class="center" >}}

5\. Definir el alias y su objetivo.

En caso de que el objetivo de un alias no sea el correo del propietario del
dominio, se enviará un correo electrónico de verificación para confirmar que
desean recibir los correos reenviados.

# Filtrar correos de un alias

Por lo general las aplicaciones de correo electrónico permiten aplicar filtros o
etiquetar correos automáticamente para identificarlos con mayor facilidad. Para
lograrlo se deben realizar ciertas acciones dependiendo de la aplicación del dueño
del alias.

## Gmail

1\. Ir a la configuración de Gmail, específicamente a la sección de [Filtros y
direcciones bloqueadas](https://mail.google.com/mail/u/0/#settings/filters).

2\. Hacer clic en *«Crear un nuevo filtro»*.

{{< img src="images/gmail-add-filter.png" alt="Agregar filtro en Gmail" class="center" >}}

3\. Especificar el alias en el campo *«Para»* y hacer clic en *«Crear filtro»*.

{{< img src="images/gmail-add-filter-popup.png" alt="Configurar selectores del filtro en Gmail" class="center" >}}

4\. Tildar cualquier opción que resulte útil, es recomendable usar *«Aplicar la
etiqueta:»* y crear/seleccionar la etiqueta deseada (puede ser el alias, en
este caso `ejemplo@ntrrg.dev`); y *«Nunca enviarlo a Spam»*. Finalmente hacer
clic en *«Crear filtro»*.

{{< img src="images/gmail-add-filter-popup-actions.png" alt="Establecer acciones del filtro en Gmail" class="center" >}}

# Enviar correos electrónicos desde un alias

Es posible enviar correos electrónicos desde un alias, para ello se deben
aplicar ciertas configuraciones en la aplicación de correo electrónico del
dueño del alias.

Idealmente estas configuraciones debe realizarlas el administrador del dominio,
pues entre ellas se deben especificar las credenciales de la cuenta de Google
que figura como propietaria del dominio.

Antes de seguir, es necesario preparar la cuenta propietaria del dominio:

* Si la cuenta **no** tiene activa la autenticación en dos pasos, activar el
  [acceso de aplicaciones menos seguras](https://myaccount.google.com/lesssecureapps).

* Si la cuenta tiene activa la autenticación en dos pasos, generar una
  [contraseña de aplicación](https://myaccount.google.com/lesssecureapps).

## Gmail

1\. Ir a la configuración de Gmail, específicamente a la sección de [Cuentas e
importación](https://mail.google.com/mail/u/0/#settings/accounts).

2\. Hacer clic en *«Agregar otra dirección de correo electrónico»*.

{{< img src="images/gmail-add-alias.png" alt="Agregar alias de correo electrónico en Gmail" class="center" >}}

3\. Especificar el alias y hacer clic en *«Paso siguiente»*.

{{< img src="images/gmail-add-alias-popup.png" alt="Pop-up para agregar alias de correo electrónico en Gmail" class="center" >}}

4\. Usar los siguientes datos y hacer clic en *«Agregar Cuenta»*.

| Campo | Valor |
| --- | --- |
| **Servidor STMP** | `smtp.gmail.com` |
| **Puerto** | `587` |
| **Nombre de usuario** | Cuenta propietaria del dominio |
| **Contraseña** | Contraseña proporcionada por el administrador |

5\. Hacer clic en *«Cerrar ventana»*. Se enviará un correo de verificación al
alias para confirmar la acción.

# Conclusiones

Este tipo de configuración resulta bastante sencilla y conveniente para
empresas pequeñas, ya que se ahorran costos operativos pues no hacen falta
servidores dedicados a esta tarea ni mano de obra especializada.

Por otro lado, para empresas con esquemas organizacionales más amplios el
resultado es opuesto, pues complicaría el manejo de los recursos humanos y de
los servicios internos.
