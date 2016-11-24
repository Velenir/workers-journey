## The problem

Have you ever experienced a script lagging. Page rendered unresponsive if only for a brief moment. But that one moment capable of disrupting an otherwise smooth animation or scrolling. What about times when it's not just a singular moment but what seems to be an eternity. And then a **Warning: Unresponsive script** prompt.

You probably know why it happens: JavaScript by its nature is single-threaded. Meaning, everything happens on the **main thread**. UI renders on the main thread (actually main thread is mostly called **UI thread** in browser context), JavaScript executes on the main thread, response to user input events are handled on the main thread. So sometimes it gets so bogged down in script executions that it can't process everything at a reliable framerate. And while some pesky script takes too long to execute, everything else waits... and waits... and waits... **Warning: Unresponsive script**.

![Unresponsive Script](../images/unresponsive.png)

---

## The workaround

You, the developer, care about smooth animation, framerate and ultimately pleasant user-experience. You delay execution till the most opportune moment with `setTimeout` and `setInterval`, you [throttle and debounce](https://css-tricks.com/debouncing-throttling-explained-examples/), you ask for at least a window of opportunity every *~16.6ms* with [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame),
you settle for *if you are not busy* with [`requestIdleCallback`](https://hacks.mozilla.org/2016/11/cooperative-scheduling-with-requestidlecallback/). But if you try to do some heavy lifting (calculating prime numbers is usually given a somewhat impractical but viable example), you stumble into **Warning: Unresponsive script**.

---

## The answer

Enter **Web Workers**. Worker runs in its own thread in the background. That way you can leave **UI thread** to UI and offload a time-consuming script to run in the background. Here is how the process looks at a glance:

&nbsp; |Main Thread | Worker Thread
-------|------------|-------------:
1 | sends data | receives data
2 | renders UI, idles, etc.| processes data
3 | renders UI, idles, etc. | sends result
4 | receives and processes result | idles
5 | sends data | receives data
6 | ... | ...

This essentially happens in parallel with **Worker Thread** doing the heavy lifting and **UI thread** only having to deal with the end result.
