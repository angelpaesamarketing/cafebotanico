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
- **Papel pintado floral** de fondo en "La casa", dibujado en SVG.
- **Pizarra con marco de madera** para las tartitas.
- **Bloque de noche** para tés y cócteles, con la luz de las guirnaldas.
- Paleta tomada de sus fotos: crema, rojo teja, verde monstera, azul desvaído,
  rosa del papel pintado.
- Tipografías: **Oswald** (condensada, como el logotipo y los rótulos antiguos)
  y **Fraunces** con los ejes `SOFT` y `WONK` para los titulares.

## La intro

Sólo el logo, ~3,5 s. Se reproduce **una vez por sesión** (`sessionStorage`),
se salta con el botón o un clic, se desactiva sola con `prefers-reduced-motion`
y se puede repetir desde el pie.

El dibujo es una sola imagen, así que la animación se hace con dos copias
recortadas por `clip-path`: la de abajo (taza y plato) entra con un fundido, y
la de arriba se revela creciendo hacia arriba, de modo que el tallo sale de la
taza, se van abriendo las hojas y al final aparece la flor.

| t | qué pasa |
|---|---|
| 0,15 s | entra la taza con el plato |
| 0,78 s | el tallo empieza a salir de la taza |
| ~1,4 s | se abren el primer par de hojas |
| ~1,8 s | el segundo par |
| ~2,1 s | se abre la flor |
| 2,1 s | aparece **CAFE BOTANICO** en Anton |

![La planta saliendo de la taza](storyboard-intro.png)

## Estructura

```
index.html
assets/css/style.css
assets/js/main.js
assets/img/logo-dibujo.webp   el logo, recortado sobre transparente
assets/img/letras/            las ocho letras del titular
assets/img/                   fotos
```

## Pendiente de datos reales

- **Horario**: el del bloque "Visítanos" es inventado.
- **Carta**: las tartitas salen de su pizarra, pero los precios son de ejemplo.
  Lo mismo con tés y cócteles.
- **Textos**: redactados a ojo, a validar con el local.
- **Fotos**: casi todas son recortes de la retícula de Instagram, de baja
  resolución. Hacen falta los originales.
- **Logo**: el dibujo actual está generado, no es el archivo original del
  local. Si aparece el vectorial (`.ai`, `.eps`, `.svg`), merece la pena
  cambiarlo: escalaría sin pérdida y pesaría mucho menos.
