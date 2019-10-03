# @egstad/marquee

> A straight-forward Marquee

## Install

```bash
npm install @egstad/marquee
```

## Usage

### Markup

```html
<div class="marquee">
  <!-- Can be any html element you wish -->
  <p>Hello World</p>
</div>

<!-- Use the speed dataset to speed it up -->
<div class="marquee" data-speed="5">
  <p>Hello World</p>
</div>
```

### Javascript
```js
// import
import Marquee from '@egstad/marquee'

// init with class
const marquee = new Marquee('.className')

// init with element
const element = document.querySelector('.marquee')
const marquee = new Marquee(element)
```

### Methods
```js
// create instance
const marquee = new Marquee('.className')

// pause animation
marquee.stop()

// start over
marquee.reset()

// destroy events
marquee.destroy()

```
