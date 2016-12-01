# Example of a Dedicated Worker

Let's build a minimalistc example of a **Dedicated Worker**.

First our `worker.js` code:

```js
!!!include(./Dedicated/worker.js)!!!
```

And interaction logic on the **Main thread**:

```html
!!!include(./Dedicated/example.html)!!!
<script id="main-thread__script">
!!!include(./Dedicated/script.js)!!!
</script>
```

With styling applied it can be represented like the panel below. Try interacting with it.

---
