# Example of a Shared Worker

Let's build a minimalistc example of a **Shared Worker**.

First our `sharedworker.js` code:

<div class="hide-panel">
<input class="hide-panel__control" type="checkbox" id="chk1" checked>
<label class="hide-panel__label" for="chk1"></label>

<div class="hide-panel__object">

```js
!!!include(./Shared/sharedworker.js)!!!
```

</div>
</div>

And interaction logic on the **Main thread**:

<div class="hide-panel">
<input class="hide-panel__control" type="checkbox" id="chk2" checked>
<label class="hide-panel__label" for="chk2"></label>

<div class="hide-panel__object">

```html
!!!include(./Shared/example.html)!!!
<script id="main-thread__script">
!!!include(./Shared/script.js)!!!
</script>
```

</div>
</div>

Now lets open a few pages/tabs with the code above.

With styling applied it can be represented like the panel below.

First click [here](/example/shared_worker/) to open a couple of new windows/tabs. They will all share the same **Worker** with this page. Then try interacting with that **Shared Worker** across multiple parent pages.

---
