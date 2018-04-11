# Offline First Blog Example

An example of how to enhance a simple blog by adding offline first technologies to improve user experience. This project uses Craft CMS, React, Redux, Service Worker, and IndexedDB.

When visited in browsers that support service worker, the site will use React to render templates, IndexedDB to store blog posts, and Redux to keep IndexedDB up to date. When visited in a browser that doesn't support service worker the user still a standard server-side rendered website.

A live demo of this can be found [here](https://offlinefirst-blog.jonfarrell.io/).
  
## CMS Platform

At it's core, this example uses Craft to handle the CMS side of the offline first blog. Craft 2 comes with a news channel and template right out of the box so these were used in the example. The only plugin that is used is ElementAPI which creates a JSON enpoint that will later be consumed by our progressive web app.

## PWA Enhancements

This example turns the above mentioned blog into a progressive web app by using a service worker and IndexedDB to cache content and serve information from the cache before reaching out to the server to get the latest content. By doing this, the user experiences a near instant page load regardless of internet connection strength or if there even is an internet connection. Browsers that support service worker will work offline after the service worker has installed and is running.

## Service Worker

When the website first loads, there's only one javascript file listed at the bottom of the page. The contents of this file is simply:

```
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/offlinefirst-blog/public/sw.js');
}
```

This checks to see if the browser supports service workers, and if so it registers the service worker located at `/sw.js`. Once the service worker has installed and is active it will act as a proxy, is capable of re-routing all network requests, and can work with the Cache API to store static assets. In this case, it will route traffic to a simple skeleton page where a React application will take over and will cache the Javascript for that React application.

## IndexedDB

The application will store all blog posts in IndexedDB and on every page load, what is in IndexedDB will be shown to the user first before reaching out to the server to get any updated information. This project uses Jake Archibalds IDB library to make working with IndexedDB easier.

## React/Redux Application

The service worker will re-route traffic from `/` and `/news/:slug` to `/skeleton`, which is a very simple webpage that will load quickly and contains a javascript file that will load a React application inside of the body of the page. After the hompage component mounts, two actions are dispatched:

1. An initial action is dispatched and will take everything already stored in IndexedDB and use it to populate the Redux store. If there is anything in IndexedDB at this point the user will see a list of blog post and will be able to interact with the page.

2. A second action is dispatched that will make a request to the server to get the latest version of all of the blog posts. If this is successful, the response will be sent to the reducer which will trigger an update showing the user the updated information.

When the user goes to an individual blog page from the homepage three actions are dispatched:

1. The props sent from the homepage will be sent to the `currentItem` piece of state. This will trigger a re-render and the page will be populated with the information provided by the props.

2. A second action will be dispatched in case the user navigates directly to the page instead of using the links on the homepage. This will take the slug and look for a post with a matching slug in IndexedDB. The result of that will be sent to the reducer and will trigger a re-render of the page.

3. A third action will be dispatched to get the latest information from the server in regards to that blog post. If this is successful, the response will be sent to the reducer which will trigger an update showing the user the updated information.