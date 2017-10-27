# mehp: Minimal Javascript Presentations

mehp is a minimal presentation tool written in Vanilla JS and CSS.

## Purpose

Moving to a HiDPI screen, libreoffice impress started to break every time I opened presentation mode. I had also previously tried out [http://lab.hakim.se/reveal-js/#/](reveal.js), but it felt a bit overloaded and restricted creative positioning too much.

## Features

- Switch between text mode and presentation mode
- <aside> tags can be used for notes or the element's full text for the text mode version of a presentation (thanks to reveal.js for the idea)
- Table of contents
- Simple speaker view

## Themes

All positioning and styling is done in CSS files. Two CSS files should be loaded: one general one (`mehp.css`) and one for the theme (e.g. `seoul.css`). 

To use a custom theme, just replace `<path>/themes/seoul.css` with your own theme. For writing one, you may either copy the existing, default theme or copy `themes.css` and start from scratch.

## Usage

To use mehp on an html file, include the following within the <head> tag. Replace `../` with the path of mehp on your server.

```
<script type='text/javascript' src='../mehp.js'></script>
<link rel="stylesheet" href="../mehp.css">
<link rel="stylesheet" href="../themes/seoul.css">
```

mehp then needs to be run. Add this to the bottom of the <body> tag.

```
<script type='text/javascript'>
    mehp();
</script>
```

Every section will now correspond to one slide.

An example can be found in `examples/index.htm`.
