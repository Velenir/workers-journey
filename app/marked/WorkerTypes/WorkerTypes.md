# Types of Workers

Different types of workers are suitable for different purposes and situations. Fortunately the underlying API is mostly the same across all worker types.

The workers you are more likely to make use of are:

+ **Dedicated Worker** is a Worker that is started by and communicate with one script (usually your web page).
+ **Shared Worker** can be shared by multiple scripts. These scripts can run in different windows, tabs, iframes and other workers.
+ **Service Worker** acts as a proxy between your application code and the browser. It is often used to facilitate offline interaction by intercepting network requests from your app.

In this guide we will examine **Dedicated Workers** and to a lesser extent **Shared Workers**.

Other worker types are:

+ **Audio Worker** — part of [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). It allows audio processing in a background thread.
+ [**Chrome Worker**](https://developer.mozilla.org/en-US/docs/Web/API/ChromeWorker) — You will only ever encounter it when developing an add-on for Firefox.
