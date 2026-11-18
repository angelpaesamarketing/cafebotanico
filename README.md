# Café Botánico — Zaragoza

Boceto de web para Café Botánico (C/ Santiago 3-5, Pasaje del Ciclón, Zaragoza).
HTML/CSS/JS plano, sin build ni dependencias: se abre `index.html` y funciona.

```bash
python3 -m http.server 4321
```

## Estética

Sacada de su Instagram, no de una plantilla:

- **Pared crema con grano de carrete** sobre toda la página.
- **Letras desparejadas** en el titular: son fotos de letras de rastro
  recortadas sobre transparente, una por archivo, en `assets/img/letras/`.
  Cada una lleva su propia altura, giro y sombra. El orden reproduce la pared
  del local: B negra de madera, O blanca esmaltada, T roja, A negra, n
  galvanizada minúscula, I roja, C azul y O galvanizada.
- **Fotos como copias de laboratorio**: borde blanco, giro ligero, sombra y, en
  el hero, un trozo de cinta de carrocero.
- **A oscuras, alumbrada por las lámparas.** La web está de noche: la pared se
  apaga y lo único que ilumina son seis lámparas distintas repartidas por la
  página — un **foco de cuadro** de latón que apunta directo a BOTÁNICO, un
  **farolillo de globo**, una **lámpara de alabastro** art déco, una **opalina**
  de sobremesa, una **bombilla colgante** y una **guirnalda de bolitas** que
  cruza el bloque de cócteles. Cada
  una echa su charco de luz cálida (`mix-blend-mode:screen`), de modo que el
  papel pintado y las plantas sólo se ven de verdad donde hay luz. Las esquinas
  se van a negro con una viñeta.
- **Papel pintado floral en toda la web**: el fondo es el estampado de la
  pared del local —flores de coral, hojas y pajaritos— dibujado en SVG. Hay dos
  versiones del mismo dibujo, de día y de noche: taparlo con un velo negro
  aplastaba el contraste y lo hacía desaparecer, así que la nocturna tiene su
  propia paleta apagada. El contenido va sobre un panel apenas más claro que la
  pared y el pie queda directamente sobre el estampado.
- **Enredaderas colgando** por los dos lados, de arriba del todo hasta el
  último píxel del pie, sin desvanecerse al final. Son SVG en dos piezas: la
  mata de arriba y un tramo que se repite todo lo largo que haga falta, con dos
  tallos trenzados que encajan consigo mismos por arriba y por abajo. Cada hoja tiene una
  de tres formas, nervadura secundaria, medio tono de luz y, a veces, una
  mancha clara de variegada.
- **Pizarra con marco de madera** para las tartitas.
- **Bloque de noche** para tés y cócteles, con la luz de las guirnaldas.
- Paleta tomada de sus fotos: crema, rojo teja, verde monstera, azul desvaído,
  rosa del papel pintado.
- Tipografías: **Oswald** (condensada, como el logotipo y los rótulos antiguos)
  y **Fraunces** con los ejes `SOFT` y `WONK` para los titulares.

## La intro

Sólo el logo, ~2,4 s. Se reproduce **una vez por sesión** (`sessionStorage`),
se salta con el botón o un clic, se desactiva sola con `prefers-reduced-motion`
y se puede repetir desde el pie.

El logo es grafito oscuro, así que de noche va invertido: se lee como trazo
claro sobre el fondo, casi como una tiza.

El dibujo es una sola imagen, así que se parte en tres capas con `clip-path`.
Los cortes salen de medir la tinta del propio dibujo por filas:

```
flor            0 – 28,6 %
tallo y hojas  28,6 – 60,7 %
taza y plato   60,7 – 100 %
```

- La **taza** entra con un fundido corto.
- El **tallo** no se corta con una línea recta: se descubre con una máscara de
  degradado que sube, así que el borde va difuminado y parece que crece en vez
  de aparecer por trozos. El degradado se mueve con una custom property
  registrada (`@property --brote`), que es lo que permite interpolarla.
  Su recorrido está ajustado justo a la banda del tallo para que el crecimiento
  ocupe toda la duración.
- La **flor** se abre aparte, escalando desde el punto donde acaban las hojas,
  con un poco de rebote.

| t | qué pasa |
|---|---|
| 0,05 s | entra la taza con el plato |
| 0,32 s | asoma el tallo por el borde de la taza |
| ~0,6 s | se abre el primer par de hojas |
| ~0,9 s | el segundo par |
| 0,82 s | empieza a abrirse la flor |
| 1,34 s | entra **CAFE BOTANICO** en Anton |

![La planta saliendo de la taza](storyboard-intro.png)

Las animaciones arrancan en pausa y no se sueltan hasta que el dibujo está
decodificado (`img.decode()`): si no, el crecimiento ocurre mientras la imagen
todavía no se ha pintado y te pierdes media secuencia.

## Estructura

```
index.html
assets/css/style.css
assets/js/main.js
assets/img/logo-dibujo.webp   el logo, recortado sobre transparente
assets/img/letras/            las ocho letras del titular
assets/img/papel-pintado.svg  el estampado de la pared (baldosa)
assets/img/rama-*.svg         la enredadera: mata y tramo repetible
assets/img/foco.svg           foco de cuadro, el que apunta al titular
assets/img/lampara-deco.svg   lámpara de alabastro art déco
assets/img/tulipa.svg         opalina de sobremesa
assets/img/farolillo.svg      farolillo de globo
assets/img/bombilla.svg       bombilla colgante
assets/img/guirnalda.svg      guirnalda de bolitas
assets/img/                   fotos
```

## Pendiente de datos reales

- **Horario**: el del bloque "Visítanos" es inventado.
- **Carta**: las tartitas salen de su pizarra, pero los precios son de ejemplo.
  Lo mismo con tés y cócteles.
- **Textos**: redactados a ojo, a validar con el local.
- **Fotos**: casi todas son recortes de la retícula de Instagram, de baja
  resolución. Hacen falta los originales.
- **Papel pintado y enredaderas**: están dibujados a partir de las fotos, no
  escaneados. Si algún día hay una foto frontal y bien iluminada de la pared,
  el estampado se puede afinar para clavarlo.
- **Logo**: el dibujo actual está generado, no es el archivo original del
  local. Si aparece el vectorial (`.ai`, `.eps`, `.svg`), merece la pena
  cambiarlo: escalaría sin pérdida y pesaría mucho menos.
