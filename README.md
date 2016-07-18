# puggy

Utility filters of pug/jade.

## Installation

```bash
$ npm install puggy
```

## Usage

```js
const pug = require('pug'); // You can also use jade.
const puggy = require('puggy');

const pugOptions = {
  pretty: true,
};

// set filters by names you want
pug.filters['block-element'] = puggy.blockElement;
pug.filters['comment-out-newline'] = puggy.commentOutNewline;
pug.filters['comment-out'] = puggy.commentOut;
pug.filters['preserve'] = puggy.preserve;

// initialize
puggy.init(pug, pugOptions);

pug.render('pug string', pugOptions);
```

## filters

Currently, there are 4 filters in puggy.

### blockElement

Make specified element be rendered as a block element.

No filter:

```jade
p
  a(href="#") Link
  span Text
```

becomes

```html
<p><a href="#">Link</a><span>Text</span></p>
```

blockElement filter:

```jade
:block-element(a span)
  p
    a(href="#") Link
    span Text
```

becomes

```html
<p>
  <a href="#">Link</a>
  <span>Text</span>
</p>
```

You need to specify tag names as filter arguments.

And it's possible to control indent by specifying `lv` option.

```jade
:block-element(lv=2 a span)
  p
    a(href="#") Link
    span Text
```

becomes

```html
    <p>
      <a href="#">Link</a>
      <span>Text</span>
    </p>
```

if you want to make SSI include code be a block, just specify `comment`;

```jade
div
  <!--#include file="header.html" -->
```

becomes

```html
<div><!--#include file="header.html" --></div>
```

```jade
:block-element(comment)
  div
    <!--#include file="header.html" -->
```

becomes

```html
<div>
  <!--#include file="header.html" -->
</div>
```

### commentOutNewline

Comment out newlines of html. It's useful for removing gaps of inline blocks.

```jade
:comment-out-newline
  ul
    li Item1
    li Item2
```

becomes

```html
<ul><!--
  --><li>Item1</li><!--
  --><li>Item2</li><!--
--></ul>
```

Also available `lv` option.

### commentOut

Comment out a code block after rendering by pug.

```jade
//
  ul
    li Item1
    li Item2
```

becomes

```html
<!--
ul
  li Item1
  li Item2
-->
```

If this is not your desired behavior, try below.

```jade
:comment-out
  ul
    li Item1
    li Item2
```

becomes

```html
<!--
<ul>
  <li>Item1</li>
  <li>Item2</li>
</ul>
-->
```

Also available `lv` and `indent` option. `indent` makes a code block have one more indent.

```jade
:comment-out(indent)
  ul
    li Item1
    li Item2
```

becomes

```html
<!--
  <ul>
    <li>Item1</li>
    <li>Item2</li>
  </ul>
-->
```

### preserve

Render a code block keeping its looks.

```jade
:preserve
  <p>
            <a href="#">Link</a>
        <span>Text</span>
    </p>
```

becomes

```html
<p>
          <a href="#">Link</a>
      <span>Text</span>
  </p>
```

Also available `lv` option.
