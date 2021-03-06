# Caveats

**Web Workers** is a relatively new technology, but it is already well supported by modern browsers (at least **Dedicated Workers** are):

<div class="hide-panel">
	<input class="hide-panel__control" type="checkbox" id="chk1">
	<label class="hide-panel__label" for="chk1"></label>
	<p class="ciu_embed hide-panel__object" data-feature="webworkers" data-periods="future_1,current,past_1,past_2">   <a href="http://caniuse.com/#feat=webworkers">Can I Use webworkers?</a> Data on support for the webworkers feature across the major browsers from caniuse.com. </p>
</div>

There is less support for **Shared Workers**:

<div class="hide-panel">
	<input class="hide-panel__control" type="checkbox" id="chk2">
	<label class="hide-panel__label" for="chk2"></label>
	<p class="ciu_embed hide-panel__object" data-feature="sharedworkers" data-periods="future_1,current,past_1,past_2">   <a href="http://caniuse.com/#feat=sharedworkers">Can I Use sharedworkers?</a> Data on support for the sharedworkers feature across the major browsers from caniuse.com. </p>
</div>

Not to mention **Service Workers**

<div class="hide-panel">
	<input class="hide-panel__control" type="checkbox" id="chk3">
	<label class="hide-panel__label" for="chk3"></label>
	<p class="ciu_embed hide-panel__object" data-feature="serviceworkers" data-periods="future_1,current,past_1,past_2">   <a href="http://caniuse.com/#feat=serviceworkers">Can I Use serviceworkers?</a> Data on support for the serviceworkers feature across the major browsers from caniuse.com. </p>
</div>

So it woud be a good idea to first check for `Worker` presence:

```js
if("Worker" in window) {
	// ...
}

if("SharedWordker" in window) {
	// ...
}

if("ServiceWorker" in window) {
	
}
```

An even then you can't be sure that everything you expect of a **Worker** will be supported universally.

1. Different technologies available in **Worker** scope have different degrees of support across browsers.[^1]
2. Chrome and Safari don't support subworkers (Worker within Worker).[^2]

[^1]: [APIs available in workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers#APIs_available_in_workers)

[^2]: [HTML5 nested workers are not supported in chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=31666)
