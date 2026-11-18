# Jota Café — Zaragoza

Web para Jota Café (Paseo de la Gran Vía 33, Zaragoza): *Coffee, Brunch & Soufflé*.
HTML/CSS/JS plano, sin build ni dependencias. Se abre `index.html` y funciona.

```bash
python3 -m http.server 4321
```

…y luego `http://localhost:4321/jota-cafe/`.

## Qué hay

Una sola página con cinco bloques: el titular con la torre de soufflés, cómo se
hacen, la carta, la historia de la casa y el bloque de visita con horario y mapa.

## Estética

El local es grande, claro y nuevo, y lo que lo distingue es el pancake soufflé,
así que la web va de **aire y temblor**, no de madera y penumbra:

- **Crema de mantel** (`#FDF7EE`) como fondo, con un grano muy suave encima y una
  luz cálida detrás de la torre.
- **La torre de soufflés está dibujada en SVG**, no es una foto: tres pisos,
  mantequilla, sirope escurriendo por el frente y vapor. **Tiembla** —al cargar,
  cada pocos segundos y cada vez que la tocas o le das al Enter con el foco
  encima—. Es el gesto de la casa: el soufflé japonés se reconoce porque se mueve.
- **Titular "Jota"** en Bricolage Grotesque a cuerpo grande, con "café" escrito a
  mano al lado (Caveat) en verde matcha.
- **Paleta** de la carta: crema, mantequilla (`#F2C96A`), sirope de maple
  (`#B9793F`), verde matcha (`#7C9A5B` / `#3F5A33`) y el negro café (`#2B2119`).
- **Cinta negra** con los productos pasando, como la pizarra de la barra.
- **El bloque de la casa va en negro**, para cortar la página por la mitad y que
  la historia se lea como una pausa.
- Las ilustraciones de la carta y de la tienda de ropa (percheros y maniquí)
  también son SVG hechos a mano, para no depender de fotos que todavía no hay.

## Lo que hace el JS

`assets/js/main.js`, unas 180 líneas sin dependencias:

- El temblor del soufflé (y lo deja quieto si el sistema pide menos animación).
- **Abierto / cerrado en vivo**: calcula el estado con el horario real en hora de
  Madrid (`Intl` con `timeZone: 'Europe/Madrid'`, así que da igual dónde esté
  quien mira), marca la fila de hoy en la tabla y escribe "hasta las 21:00" o
  "mañana abrimos a las 9:00". Se refresca cada minuto.
- Menú de móvil, aparición de bloques al hacer scroll, cabecera que se compacta
  y marcado de la sección activa en el menú.

Todo degrada: sin JS se ve la página entera, con el horario en la tabla.

## Accesibilidad y SEO

- Marcado semántico, `aria-label` donde hace falta, foco visible, salto al
  contenido y soporte de `prefers-reduced-motion` (se para todo: temblor, cinta
  y apariciones).
- Sin scroll horizontal a 390 px; probado a 390, 900 y 1440.
- `JSON-LD` de tipo `CafeOrCoffeeShop` con dirección, horario e Instagram, para
  que Google muestre la ficha bien.

## Datos: qué es real y qué falta

Real, de prensa local y de la guía de la ciudad (octubre y septiembre de 2025):

- Dirección: Paseo de la Gran Vía 33, Zaragoza.
- Horario: lunes a viernes 8:00–21:00, fines de semana 9:00–21:00
  (Aragón Digital). **Ojo**: otra fuente da parón de 14:00 a 16:00 y domingos
  sólo de mañana. Hay que confirmarlo con el local; si cambia, se toca en dos
  sitios: la tabla de `index.html` y la constante `HOURS` de `main.js`.
- Soufflés de 6 a 8 €; el de 6 es el de mantequilla y sirope de maple.
- Carta: soufflés, tostas (aguacate; burrata con tomate, pesto y mortadela),
  espresso, cappuccino, flat white, cold brew, café con leche, matcha latte,
  cookies, bizcochos y bollería.
- Historia: Jorge, 22 años, empezó en hostelería a los 16; en 2024 abrió con su
  padre José Antonio un local pequeño en Hernán Cortés llamado Jota Jota Café;
  el nombre se acortó "para hacerlo más fluido"; Gran Vía era una tienda de ropa
  y se quedaron percheros y maniquíes. La frase del final es suya, de la
  entrevista.
- Instagram: [@jotacafe.zgz](https://www.instagram.com/jotacafe.zgz/).

Pendiente de confirmar o de conseguir:

- **Horario**, por lo dicho arriba.
- **Precios** del resto de la carta: a propósito no hay ninguno inventado.
- **Nombres de los soufflés de temporada**: ahora mismo se dice "pregunta por la
  de hoy" porque no tenemos la lista real.
- **Fotos**: no hay ninguna. Todo lo visual está dibujado. Con fotos buenas del
  local, de la barra y de un soufflé recién hecho, el titular puede pasar a foto
  y la web gana mucho.
- **Teléfono, correo y si se puede reservar**: no se menciona nada porque no lo
  sabemos.
- **Logo**: la "J" del menú es tipográfica. Si existe el logotipo original en
  vectorial, sustituirlo.

## Estructura

```
jota-cafe/
  index.html
  assets/css/style.css
  assets/js/main.js
  assets/img/            (vacío: todavía no hay fotos)
```
