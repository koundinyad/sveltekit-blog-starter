---
title: Markdown Posts
date: 26-05-2023
slug: md
type: installation
---

<script>
    const handleAlert = () => {
        alert("Aha!")
    }
    </script>

# Extended Markdown

You can edit this file or add new posts from `src/posts/`

All this is just plain markdown

![cat](./images/cat.jpg)

But... you can also use HTML in these posts

For example

`<button>Don't click</button>` -> <button>Don't click</button>

And even some JavaScript

`<button on:click={handleAlert}>Don't click</button>` -> <button on:click={handleAlert}>Don't click</button>

And of course embed videos

<iframe width="560" height="315" src="https://www.youtube.com/embed/sIlNIVXpIns" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
