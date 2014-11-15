---
layout: post
title: HTML & CSS structure at StreetHub
subtitle: Namespacing, context, and portability
author: Jeremy
categories: design
cover: html-css-structure
<!-- published: false -->
---



Undertaking a complete overhaul of a front-end design is the opportunity to setup a readable, meaningful and hopefully maintainable structure for both HTML and CSS, as they are obviously closely related.

As anything you can **iterate** upon, it's hard to reach the point where you finally decide:

> "Ok, that's the structure I'm going for."

There's *always* room for a better approach. You want to prevent your future-self from having to go through all the templates and stylesheets again. But you need to ship the new website in time.

So where do you start? With the **content** of course.

## HTML Structure

Writing HTML is a constant compromise between **conciseness** and **flexibility**: enough structure to cover all elements, while avoiding injecting superfluous markup. After all, your CSS will end up populating your HTML with more hierarchy anyway.

You want your **structure** to be **future-proof**, which means being able to:

* **add new pages** easily, without having to think twice about what structure to adopt
* **alter existing pages** without disrupting the whole layout
* prevent potential **conflicts** between common elements (header, footer) of different pages
* insert **re-usable** elements throughout the website
* provide **context** for these re-usable elements

Overview:

<figure>
  <a href="/html/structure.html">
    <img src="/images/hub-structure.png" alt="Hub structure">
  </a>
</figure>

<table>
  <tr>
    <th>route-</th>
    <td><code>body</code> class</td>
    <td>Can alter the body itself, or any global element (header, footer)</td>
  </tr>
  <tr>
    <th>header, footer</th>
    <td>global elements</td>
    <td>Present on each page of the website.</td>
  </tr>
  <tr>
    <th>template-</th>
    <td>page container</td>
    <td>Encompasses the whole template. Sibling of global elements.</td>
  </tr>
  <tr>
    <th>layout-</th>
    <td>visual structure</td>
    <td>Main sections of a page, mainly columns.</td>
  </tr>
  <tr>
    <th>page-</th>
    <td>template-specific blocks</td>
    <td>Level of hierarchy meant to contextualize the children to this template <em>only</em>.</td>
  </tr>
  <tr>
    <th>bloc-</th>
    <td>containers for elements</td>
    <td>Blocks that are only meant to contain <em>other</em> elements, and don't carry much styling of their own.</td>
  </tr>
  <tr>
    <th>element-</th>
    <td>reusable elements</td>
    <td>Self-sufficient elements, that have a styling of their own, can be reused throughout the website, and be altered by the context.</td>
  </tr>
</table>

### *"Use the route, Luke!"*

The 3rd level in the HTML hierarchy is where all **template-specific** blocks are. Their CSS classes are systematically **prepended** with the route's name.

Why? **Namespacing**.

It becomes harder overtime to come up with *accurate* names for your elements. It's especially true if you mostly elements that *aren't* meant to be **reused**. The homepage (`/index`) almost only comprises single-use blocks. If I were to find relevant names for each of them, I'd populate the namespace with selectors that might have made more sense for reusable elements.

The prefix provides the ability to reuse the second part of the CSS class: `products-controls` and `boutiques-controls` can exist simultaneously, without actually needing to look alike.

This **automatic** naming approach makes it very easy to name this level of blocks whenever another template is created. It's simply: the route + a dash + and anything that makes sense. Any naming conflict is avoided.

It also makes the CSS easier to read **vertically**.

### Direct-child influence

CSS priority can become overwhelming. For one, I only use **CSS classes**, considering how ids are powerful and how generic selectors aren't.

I also limit the scope of **descendant** selectors by *trying* to stick to a simple rule:

> Any element can only be altered by its **direct** parent.

<figure>
  <img src="/images/collapsed-structure.png" alt="Collapsed structure">
</figure>

* `route-products` can alter the header, but not any `layout`
* a `template` can only alter a `layout`
* template-specific containers like `products-menu` can only alter the `menu` that's inside

Because the **route** is *appended* to `route-` and to `template-`, there's no need to use `.route-products .template` because `.template-products` can be used.

And because the **route** is *prepended* to all template-specific selectors like `products-menu`, there's no need to make use of an ancestor like `route-products` or `template-products`.

## (S)CSS sanity

It's the first time I use a CSS pre-processor in production. I've always managed to keep my CSS short (I write in line for a higher density of information and better vertical readibility of selectors), but mostly **meaningful**, by combining selectors with *shared* properties, keeping *descriptive* names for selectors, avoiding repeating myself, and altering styles according to *context*.

Using a CSS framework hasn't even crossed my mind. A framework has its benefits though, especially for developers who don't want to touch any stylesheet, or for functional dashboards that solely comprise forms, columns, and buttons. But I would have spent more time overriding default styles, which would have restricted my ability to design distinct elements.

### CSS structure

[StreetHub.com](https://www.streethub.com) is a large-enough project for me to separate my stylesheet into multiple files.

<table>
  <tr>
    <th><code>00-reset.scss</code></th>
    <td><a href="https://github.com/murtaugh/HTML5-Reset/blob/master/assets/css/reset.css)">HTML5 reset</a></td>
    <td><code>*{ margin: 0; padding: 0;}</code> doesn't seem to do the trick anymore</td>
  </tr>
  <tr>
    <th><code>01-font.scss</code></th>
    <td>Icon font</td>
    <td>Initially created for the iPhone app, it made sense to reuse it for the desktop app: as flexible as text (especially for color and size), and kind of Retina-ready.</td>
  </tr>
  <tr>
    <th><code>02-mixins.scss</code></th>
    <td>SCSS variables and mixins</td>
    <td>Mandatory, considering the compatibility requirements and size of the project.</td>
  </tr>
  <tr>
    <th><code>03-global.scss</code></th>
    <td>Global elements</td>
    <td>For elements that appear on <strong>every</strong> page:<br>
      the header (including the nav), the verstaile container, and the footer. Styling of generic tags is also included.</td>
  </tr>
  <tr>
    <th><code>04-elements.scss</code></th>
    <td>Reusable elements</td>
    <td>Both <strong>reusable</strong> <em>and</em> <strong>self-sufficient</strong>. They act like components that appear here and there, in different contexts, even several times within the same page.<br>
      Titles, buttons, images, dropdowns, tags, icons... Classes are ordered alphabetically because it's the best future-proof strategy there is.</td>
  </tr>
  <tr>
    <th><code>05-modifiers.scss</code></th>
    <td>Context variations</td>
    <td>When you alter an element <em>within</em> another element. Like an icon within a button. Or a button within a title. Or a dropdown within a title. Or an icon within a dropdown within a title... It's mostly icon variations. This stylesheet must come after <code>04-elements</code> considering the styling applied are just adjustments of already defined properties.</td>
  </tr>
  <tr>
    <th><code>06-containers.scss</code></th>
    <td>Blocks containing other elements</td>
    <td>They are <strong>not</strong> self-sufficient and only contain <strong>other</strong> elements, meaning they only exist <em>because</em> of their children.<br>
    Example: <code>bloc-product</code> which contains <code>image</code> <code>name</code> <code>price</code> <code>stamp</code> and <code>circle</code>.<br>
    The <code>bloc-product</code> acts a container for these components, but wouldn't exist without them.<br>
    This stylesheet also includes template containers, layout elements, and lists.</td>
  </tr>
</table>

### Container vs. element

It's hard to draw the line between what can be an *element* and what acts as a mere *block container* for **other** elements. I just ask myself:

> "Would this element exists on its own, without its children?"

If not, it's a **block**.

### Template-specific vs. reusable blocks

On the homepage, there is a **mosaic** of images. It's called `index-pentagon`, because it's on the homepage (`/index` route) and it has 5 images.

Is it unique throughout the website? **Yes**. It can keep its route-prefixed CSS class because it won't be reused anywhere else.

### Namespacing for the sane-minded

### Abstraction of styling variations

The bloc-boutique has 4 different layouts but possess the *exact* same HTML structure (EmberJS component magic):

How do you define 4 different styles?

* use a **parent selector**, and define specific styles *within* that context. We could have `.list-boutiques-grid` `.list-boutiques-flat` and `.list-boutiques-vertical`
* use an **additional** class, and have `.bloc-boutique.bloc-boutique-grid`. It's semantically less inspired than the "grid list".

In any case, considering the power of SCSS, the abstraction can remain **within the stylesheet**, leaving the HTML structure consistent and identical throughout the templates, and, dare I say, semantic.

<!--

* `index`
* `products`
  * `product`
* `boutiques`
  * `boutique`
* `trending`
* `collections`
  * `collection`
* `blog`
  * `blog/archive`
* `pages`
  * `pages/faq`
  * `pages/team`
  * `pages/contact`
  * etc.
* `user`
  * `user/wishlist`
  * `user/following`
* `cart`
  * `cart/checkout`
  * `cart/payment`
  * `cart/completed`

-->
