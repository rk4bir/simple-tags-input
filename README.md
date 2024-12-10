# simple-tags-input
> Check the [CodePen examples](https://codepen.io/collection/KpWNGN) here.

Simple and extremely easy tags input for anything that runs on browser 🌐 🚀

## Quick start
**Installation with CDN**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rk4bir/simple-tags-input@latest/src/simple-tag-input.min.css">

...

<script src="https://cdn.jsdelivr.net/gh/rk4bir/simple-tags-input@latest/src/simple-tag-input.min.js"></script>
```

**Quick start html example**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--Simple tags input style-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rk4bir/simple-tags-input@latest/src/simple-tag-input.min.css">
</head>

<body>
    <div>
        <ul id="tagsList"></ul>
        <input 
            type="text" 
            id="tagsInput" 
            spellcheck="false" 
        />
    </div>

    <!--Simple tags input plugin-->
     <script src="https://cdn.jsdelivr.net/gh/rk4bir/simple-tags-input@latest/src/simple-tag-input.min.js"></script>
     <!--Simple tags input implementation-->
     <script>
         let options = { inputEl: "tagsInput", listEl: "tagsList"};
         const tagsInput = new simpleTagsInput(options);
     </script>
</body>
</html>
        
```
## Usage
### Simple usecase
> Check the [codepen example](https://codepen.io/rk4bir/pen/wvpVKEz).
```html
<!--HTML code-->
<div>
    <ul id="tagsList"></ul>
    <input 
        type="text" 
        class="form-control" 
        id="tagsInput" 
        spellcheck="false" 
    />
</div>
```
```javascript
/* JavaScript code */
let options = {
    inputEl: "tagsInput", 
    listEl: "tagsList",
};
var tagsInput = new simpleTagsInput(options);
// get the tags list/array [tag1, tag2, ...]
tagsInput.getTags();
```

**Demo**
> Basic usecase demo

![basic-demo](./example/media/basic-demo.gif)


### Autocomplete search usecase
> Check the [codepen example](https://codepen.io/rk4bir/pen/QWaejYg).
```html
<!--HTML code-->
<div>
    <ul id="tagsList2"></ul>
    <input 
        type="text" 
        class="form-control" 
        id="tagsInput2" 
        spellcheck="false" 
    />
</div>
```
```javascript
/* JavaScript code */
let options = {
    inputEl: "tagsInput2", 
    listEl: "tagsList2",
    autocompleteSearchList: [
        "Afganistan", 
        "Bangladesh", 
        "China", 
        "India", 
        "Pakistan", 
        "Sri Lanka", 
        "United States", 
        "United Kingdom", 
        "Vietnam", 
        "Zimbabwe"
    ]
};
var tagsInputWithSearch = new simpleTagsInput(options);
// get the tags list/array [tag1, tag2, ...]
tagsInput.getTags();
```

**Demo**
> Autocomplete usecase demo

![basic-demo](./example/media/autocomplete-demo.gif)

---

## Contributors
> Thanks to these wonderful people for contributing to this project:

<ul style="display: flex; list-style: none; padding: 0; gap: 10px;">
    <a href="https://github.com/rk4bir" target="_blank">
        <img 
            style="height: 50px; width: 50px; border-radius: 50%; object-fit: cover;" 
            src="https://avatars.githubusercontent.com/u/25036102?v=4" 
            alt="rk4bir's avatar"
        />
    </a>
    <a style="margin-left: 20px" href="https://github.com/mindflowgo" target="_blank">
        <img 
            style="height: 50px; width: 50px; border-radius: 50%; object-fit: cover;" 
            src="https://avatars.githubusercontent.com/u/908459?v=4" 
            alt="mindflowgo's avatar"
        />
    </a>
</ul>



