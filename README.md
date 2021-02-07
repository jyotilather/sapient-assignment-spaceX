# SpaceX

## Live Demo

[SpaceX](https://space-launch-coding.herokuapp.com/) 

## Technical Stack 

1. **Angular 11** Framework
2. **HTML/CSS** for design (**Media Query** for Responsiveness)
3. **Server Side rendering** implementation
4. Deployment on **Heroku** `https://space-launch-coding.herokuapp.com/`

## Pre Requisites to run the application locally
1. Clone https://github.com/jyotilather/sapient-assignment-spaceX
2. Checkout branch `main`
3. Run `npm install` for all dependencies
4. To run the project `npm run dev:ssr`

*Angular application will start on `http://localhost:4200/` which will navigate you to `http://localhost:4200/spaceX`. The app will automatically reload if you change any of the source files.*

---
## Routing Approach in Application

1. By default, page will be loaded on **/spaceX** ,loading all products without any filter
2. Once any filter is applied, page url will be appended with query parameters to indicate the filter.
   
   *For eg., /spaceX?launchYear=2007&launchSuccess=All&landingSuccess=All
             /spaceX?launchYear=2007&launchSuccess=true&landingSuccess=All
             /spaceX?launchYear=2007&launchSuccess=true&landingSuccess=true*
             
3. Query parameters will be appended in the url until **any** filter is applied.
4. As and when all filters are cleared, query parameters are removed and gets redirected back to **/spaceX** 
---

## Server Side Rendering 

1. To facilitate web crawlers through search engine optimization(SEO)
2. To improve performance on mobile and low-powered devices
3. Show the first page quickly with a first-contentful paint

## Responsiveness in Application

1. Page has single column layout until 700px. (Mobile device)
   ![mobile-view](/src/assets/mobile-view.png)
2. Page has two column layout between 700px and 1024px. (Tablet device)
   ![tablet-view](/src/assets/tablet-view.png)
3. Page has three column layout from 1024 px and beyond 1440px. (Desktop device)
   ![desktop-view](/src/assets/desktop-view.png)
   
---

## Lighthouse Screenshots

SEO & Accessibility
![SEO-Accessibility-image](/src/assets/SEO-accessibility-report.png)
