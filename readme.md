#### You can find me on [Linkedin!](https://www.linkedin.com/in/aitor-navarrete/)

# Wall-Epapers

Wall-Epapers is an application made with REACT, EXPRESS and NodeJS that provides to the user wallpapers with a simple image viewer and infinite scrolling. The images are taken from the api of [AlphaCoders](https://wall.alphacoders.com/api.php)  
  
:warning: There is no download button due to CORS Policy, but you can easily download the image with right click on desktop or hold finger and save image as in mobile!

### Features
- Search Images by name
- Infinte Scroll
- Random Images
- Image previewer with next and previous image functions
- API with CRUD
- Desktop and mobile wallpapers, with his responsive styles

### TODO
- Do the script to get images of mobile

### Get started
`npm install` To get all the packages  
Create an .env file at the root folder with the next params:
```
PORT=PORT_EXPRESS
MONGODB_LOCAL=MongoDB_URL
API_KEY=API_KEY_ALPHACODERS
```
  
Then run these scripts to get categories and images or import the collections that you will find on the folder testDB!   
`npm run addCategories` Gets all categories from AlphaCoders
`npm run getImages -- --mobile=false` Gets all Desktop images from the Categories, not Sub Categories! "Working on mobile images mode at the moment"
  
`npm run start` To start the server on http://localhost:PORT_FROM_ENV
  
## Demo
#### Desktop
![](https://user-content.gitlab-static.net/bacb484711b4d52b5910683d3e7aed44cf13ab14/68747470733a2f2f73382e67696679752e636f6d2f696d616765732f77616c6c657061706572735f656469745f302e676966)
  
#### Mobile
![](https://s8.gifyu.com/images/wallepapers_edit_1.gif)