# Example of a Dedicated Worker

Let's build a minimalistc example of a **Dedicated Worker**.

First our `worker.js` code:

<div>
<input class="hide-panel__control" type="checkbox" id="chk1" checked>
<label class="hide-panel__label" for="chk1"></label>

<div class="hide-panel__object">

```js
!!!include(./Dedicated/worker.js)!!!
```

</div>
</div>

And interaction logic on the **Main thread**:

<div>
<input class="hide-panel__control" type="checkbox" id="chk2" checked>
<label class="hide-panel__label" for="chk2"></label>

<div class="hide-panel__object">

```html
!!!include(./Dedicated/example.html)!!!
<script id="main-thread__script">
!!!include(./Dedicated/script.js)!!!
</script>
```

</div>
</div>

With styling applied it can be represented like the panel below. Try interacting with it.

---
