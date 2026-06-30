# A la fresca - maqueta web

Esta carpeta contiene una version navegable de la web de A la fresca, con paginas separadas y fotos en blanco y negro.

## Como abrirla

Abre `index.html` en el navegador.

Tambien puedes verla con una URL local, que es mejor para probar el CMS en otro navegador:

Haz doble clic en `abrir-web-local.bat`.

Tambien se puede arrancar manualmente con:

```bash
node server.js
```

Despues abre `http://127.0.0.1:4173/`.

## Como editar textos y fotos

Abre `cms.html`. Desde ahi puedes cambiar los textos principales, las fotos de cabecera, la imagen del post de ejemplo y la foto de contacto para previsualizar la web.

Si abres la web desde `http://127.0.0.1:4173/`, los cambios se guardan en `cms-data.json` y se pueden ver desde otros navegadores del mismo ordenador. Si abres la web directamente con `file://`, los cambios se guardan solo en ese navegador.

## Que incluye

- Web responsive con paginas separadas: `index.html`, `ayuda.html`, `trabaja.html`, `eventos.html`, `notas.html`, `quien.html` y `contacto.html`.
- Fotos en blanco y negro adaptadas a los espacios principales de la web.
- CMS local en `cms.html` para cambiar textos principales y fotos.
- Formulario, suscripcion, banner de cookies y textos legales en modo maqueta.

## Pendiente antes de publicar

- Sustituir la imagen temporal de `quien.html` por la foto real cuando este disponible.
- Conectar un CMS real, por ejemplo Decap CMS, WordPress, Webflow o Sanity.
- Conectar formulario y suscripcion a servicios reales.
- Revisar textos legales con gestoria o asesoria.
- Configurar dominio, hosting, SSL, Analytics, Search Console y consentimiento de cookies.
