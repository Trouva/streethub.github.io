---
layout: post
title: HTML & CSS structure at StreetHub
subtitle: Namespacing, context, and portability
author: Jeremy
categories: design
cover: html-css-structure
published: false
---

Undertaking a complete overhaul of a front-end design is the opportunity to setup a readable, meaningful and hopefully maintainable structure for both HTML and CSS, as they are obviously closely related.

As anything you can **iterate** upon, it's hard to reach the point where you finally decide:

> "Ok, that's the structure I'm going for."

There's *always* room for a better approach. You want to prevent your future-self from having to go through all the templates and stylesheets again. But you need to ship the new website in time.

So where do you start? With the **content** of course.

## HTML Structure

Writing HTML is a constant compromise between **conciseness** and **flexibility**: enough to cover all elements, but without adding superfluous markup. After all, your CSS will end up populating your HTML with more hierarchy anyway.

You want your **structure** to be **future-proof**, which means being able to:

* **add new pages** easily, without having to think twice about what structure to adopt
* **alter existing pages**, so that adding/removing parts of it won't disrupt the whole layout
* prevent potential **conflicts** between common elements (header, footer) of different pages
* insert **re-usable** elements throughout the website
* provide **context** for these re-usable elements

### "Use the route, Luke!"

The sitemap is fairly simple:

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

### Direct-child influence



* **00 Reset**: The HTML5 reset, in its own separate file. Weirdly enough, `*{ margin: 0; padding: 0;}` doesn't seem to do the trick anymore.
* **01 Font**: Just the StreetHub icon font really. Initially created for the iPhone app, it made sense to re-use it for the desktop app: as flexible as text (especially for color and size), and kind of Retina-ready.
* **02 Mixins**: First time I use SASS on a large-scale project, and almost mandatory here, considering the compatibility requirements and size of the project. Global variables and custom mixins are located here.
* **03 Global**: For all the elements that appear on *every* page: the header (including the nav), the verstaile container, and the footer. Styling of generic tags is also included.
* **04 Elements**: Includes elements both re-usable *and* self-sufficient. They act like components that appear here and there, in different contexts, even several times within the same page. Examples? Titles, buttons, images, content holders, tags, icons... Classes are ordered alphabetically because it's the best future-proof strategy I could think of.
* **05 Modifiers**: When you alter an element *within* another element. Like an icon within a button. Or a button within a title. Or a dropdown within a title. Or an icon within a dropdown within a title... It's mostly icon variations. This stylesheet must come after 04-elements considering the styling applied are just adjustments of already well-established properties.
* **06 Containers**: Block elements that are *not* self-sufficient and only contain *other* elements. These blocks tend to not have styling applied to them, or not much at least. Best example? The bloc-product. It contains:

* .image.image-thumbnail
* .name
* .price
* .stamp (for "On sale" and/or "Out of stock")

The bloc-product is acts a container for these components, but wouldn't exist without them.
This stylesheet also includes template containers, layout elements, and lists.

### Re-usable blocks Vs. template-specific containers

Why "bloc" and not "block"? Probably a relic of French-nurtured CSS and my fondness for 4-letter words.

### Namespacing for the sane-minded

It's hard to draw the line between what can be an element and what acts as a mere block container for other elements. I just ask myself: "Would this element exists on its own, without its children?". If not, it's a block.

### Abstraction of styling variations

The bloc-boutique has 4 different layouts but possess the *exact* same HTML structure (EmberJS component magic):

How do you define 4 different styles?
* use a parent selector, and define specific styles *within* that context. We could have a .list-boutiques-grid, .list-boutiques-flat, .list-boutiques-vertical
* use an additional class, and have .bloc-boutique.bloc-boutique-grid. It's semantically less inspired than the "grid list".

In any case, considering the power of SCSS, the abstraction can remain within the stylesheet, leaving the HTML structure consistent and identical throughout the templates, and, dare I say, semantic.
