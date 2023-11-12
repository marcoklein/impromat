# First Time Visitor Flow

We want to offer the best possible experience for first time visitors. When they visit [impromat.app](https://impromat.app) they must be able to see available improv exercises and games and possibly a workshop so that they can directly start using Impromat for their improv workshop.

## Scenarios

**Just browsing**: A user might have heard of Impromat and wants to check it out. They go to the website just to see what is there. We should present them with as much content as possible (e.g. especially available games and exercises).

**Nobody planned a workshop**: Groups might have dedicated facilitators but sometimes it happens that nobody planned the session. Now, it should be easy for the group to open up Impromat and play one sample workshop from the site.

## Decisions

- Require a login for the workshop page
- Require no login for the exercises and games page
- Detect language automatically from browser settings
- First page is the elements & exercises page
- Hide actions that are unavailable to users without login
