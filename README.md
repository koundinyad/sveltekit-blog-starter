# Portfolio Website Template

A preview of this site is available at [https://svelte-portfolio-starter.netlify.app/about](https://svelte-portfolio-starter.netlify.app/about)

## Glossary

- **NodeJS**  
   NodeJS is a JavaScript runtime engine. We use this to run a local the website locally on our computers  
  Ref: https://nodejs.org/en/about
- **npm**  
  npm is the package manager for NodeJS. Like pip/conda for python  
  Ref: https://www.npmjs.com/
- **Svelte**  
  Svelte is a modern JS library to built UI. It's just HTML/CSS/JS with some additional functionality  
  Ref: https://svelte.dev/

  `.svelte` file code structure

  ```html
  <!-- JavaScript -->
  <script>
  	// any valid javascript code inside here
  </script>

  <!-- HTML -->
  <div>...</div>

  <!-- CSS -->
  <style>
  	div {
  		background: red;
  	}
  </style>
  ```

- **SvelteKit**  
  SvelteKit is a framework built on top of Svelte. This comes with pre-installed setup for routing pages, managing server-side code etc  
  Ref: https://kit.svelte.dev/
- **Components**  
  A component is a reusable piece of code to create UI. Every `.svelte` file is technically a component (unless it's a route)  
  Ref: https://svelte.dev/tutorial/basics
- **Routing**  
  A route is the link we see on the URL bar on our browsers. Any new page is technically a route- e.g. example.com/about, example.com/contact, example.com/cats  
  Dynamic routing is a pattern to generate multiple routes instead of creating a new file for each of them.  
  For example, if we have the following pages, and all of them follow the same structure on the page, we can create just one dynamic route and display only the relevant page data
- **Markdown**  
  Markdown is a markup language to create structured plain-text documents  
  Ref: https://www.markdownguide.org/getting-started/

## Setup

The project requires NodeJS to run.

1. Download and install [NodeJS](https://nodejs.org/en/download)
2. Clone/download this repository and `cd` into it
3. Run `npm install` (or `yarn`/`pnpm`) to install all the dependencies

**Running the development server**  
Run `npm run dev` in the project terminal to start the development server.  
The server should be running at [localhost:5173](localhost:5173) unless the port is busy

## File Structure

The template follows the SvelteKit dynamic routing pattern to route all the posts located in `/src/posts/`

## Creating New Routes

All routes follow the following pattern
`/src/routes/your-route-name/+page.svelte`

Examples
| URL Path | Routing File |
| ------------------- | ---------------------------------- |
| example.com/about | `/src/routes/about/+page.svelte` |
| example.com/contact | `/src/routes/contact/+page.svelte` |

### Posts

All posts are located in the `/src/posts/` directory, and uses an extended version of markdown syntax using `mdsvex` package

To create a new post-

1. Create a new `.svx` file in your `/src/posts/` directory
2. Add required frontmatter
3. Use markdown syntax for your content

#### MDSVEX

`.svx` files are an extended markdown format built specifically for Svelte. You can use the standard flavoured markdown, as well as, import and use any Svelte component inside the markdown. With this, you can use dynamic components, charts, and custom-built components inside your `.svx` files

---

## Writing Code in Svelte

### Using JavaScript in HTML

We can use JavaScript in HTML on a Svelte component by writing it inside a set of curly braces `{}`

Example:

```html
<script>
	let myName = 'Jorts the Cat';
</script>

<h1>Hello, my name is {myName}</h1>
```

### Events

Any interaction that occurs on the browser is an event. So clicks, scrolls, key presses, mouse moves are all events.

Here is an extensive list of all events - https://www.w3schools.com/jsref/dom_obj_event.asp

#### Handling Events in Svelte

On any HTML element, events can be 'listened' to, with the following syntax

```html
<script>
	function dance() {
		alert('Cha cha real smooth');
	}
</script>

<button on:click="{dance}">Dance</button>
```

We define a function to do a certain thing, and pass it (without the `()` at the end of the function name) to trigger it when the event occurs

### Conditionals

Displaying some content is `x` is true, if not, display something else

```html
{#if x == true}
<p>Some content</p>
{:else}
<p>Some other content</p>
{/if}
```

### Loops

Looping through an array of data is a common pattern in JS, and Svelte comes with a special syntax for doing this easily

```html
{#each posts as post}
<h1>{post.title}</h1>
{/each}
```

In the above code block

- `posts` is an iterable/array
- `post` is each of the items in `posts` in the loop
