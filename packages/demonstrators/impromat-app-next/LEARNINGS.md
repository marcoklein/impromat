# 2023-03-26 Next 13 and Mantine will not replace the Ionic framework for Impromat (yet)

Since Next 13 [got released in October 2022](https://nextjs.org/blog/next-13) I wanted to test the framework to see if it is a viable option for Impromat, potentially replacing the Ionic framework.

Main motivations are:
- Customized styling with the styling framework Mantine.
- Trying out cutting-edge technology with newest Server Side Rendering (SSR) improvements.


However, Impromat is not meant to be a website but it is targeting mainly mobile devices through an installable application. Technically, this is implemented via a Progressive Web App (PWA) to retain one code base for several target devices. Next 13 may offer great improvements regarding SSR and implements cutting edge patterns and newest React improvements. Nonetheless, one of the main questions remained: why should I implement a bleeding edge SSR framework, if I am going to wrap it into a PWA either way?

An additional argument for Ionic is its support for Android and IOS devices including a easy component framework that offers most app requirement needs out of the box. Switching technologies would imply a re-implementation of the whole styling framework and developing most of the components from scratch.

Nonetheless, for the future I might still consider a switch to Next 13 to try out latest technology and benefit from SSR that Impromat could leverage for an improved Search Engine Optimization (SEO). Right now switching costs would just be to high.
