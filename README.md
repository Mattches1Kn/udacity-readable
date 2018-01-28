# MyReads MyReads

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.    
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   ├── manifest.json
│   └── index.html # DO NOT MODIFY
└── src
    ├── actions #folder with actions
    │   ├── categoryList.js
    │   ├── comments.js
    │   └── posts.js
    ├── components #folder with components
        │   ├── Comment.css
        │   ├── Comment.js
        │   ├── Navigation.js
        │   ├── NoRouteMatch.js
        │   ├── PostList.js
        │   ├── PostSortBar.js
        │   ├── Vote.css        
        │   └── Vote.js
    ├── containers #folder with containers
    │   ├── App.css
    │   ├── App.js
    │   ├── CommentForm.js
    │   ├── PostDetail.css
    │   ├── PostDetail.js
    │   ├── PostForm.js
    │   ├── PostPreview.css
    │   ├── PostPreview.js
    │   └── Posts.js
    ├── reducers #folder with reducers
    │   ├── categoryList.js
    │   ├── forms.js
    │   ├── index.js
    │   ├── postDetail.js
    │   └── posts.js
    ├── history.js
    ├── index.css # Global styles. You probably won't need to change anything here.
    ├── index.js # You should not need to modify this file. It is used for DOM rendering only.
    ├── registerServiceWorker.js # You should not need to modify this file.
    ├── utils
    │   └── API.js # A JavaScript API for the provided Udacity backend.
