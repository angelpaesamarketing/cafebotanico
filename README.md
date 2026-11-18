# Café Botánico — Zaragoza

Boceto de web para Café Botánico (C/ Santiago 3-5, Pasaje del Ciclón, Zaragoza).
HTML/CSS/JS plano, sin build ni dependencias: se abre `index.html` y funciona.

```bash
python3 -m http.server 4321
```

## La intro

Secuencia de ~5,8 s que se reproduce **una vez por sesión** (`sessionStorage`).
Se puede saltar con el botón o haciendo clic en cualquier sitio, se desactiva
sola con `prefers-reduced-motion`, y se puede repetir desde el pie de página.

| t | qué pasa |
|---|---|
| 0,0 s | aparece la fachada real, centrada, con el fondo desenfocado |
| 0,6 s | las dos hojas de madera se abren en 3D sobre el vano |
| 1,0 s | la luz cálida del interior se derrama por la puerta |
| 1,45 s | la cámara entra por el vano (zoom a 15×) |
| 2,2 s | fundido a crema |
| 2,55 s | se dibuja la taza, trazo a trazo, y la **B** |
| 3,25 s | sale el tallo de la taza y se abren las dos hojas |
| 3,95 s | florece la flor y se abren los gajos |
| 4,5 s | aparece **CAFE BOTÁNICO** letra a letra |
| 5,05 s | la intro se disuelve en la web |

Las hojas de la puerta se colocan sobre el vano real de la foto con las
variables de `:root` (`--door-x/y/w/h` y el centro `--door-cx/cy`). Si se cambia
la foto de fachada hay que reajustar esos seis valores.

El logo es un SVG redibujado a partir del original, para poder animar el trazo.

## Estructura

```
index.html
assets/css/style.css
assets/js/main.js
assets/img/      fachada · porches · logo original
```

## Pendiente de datos reales

- **Horario**: el del bloque "Visítanos" es inventado.
- **Carta**: platos y precios son de ejemplo.
- **Textos**: redactados a ojo, a validar con el local.
- **Fotos**: las dos actuales son capturas de baja resolución (382×510 px).
  Hacen falta originales y, además, fotos de interior/plantas, latte art y
  brunch para los tres huecos marcados en la galería.
