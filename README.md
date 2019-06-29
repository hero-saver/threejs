# Herosaver


Save Configuration and STL from websites like heroforge.com for academic purposes

## Usage
### Browser Console
  1. Go to the intended website
  2. Open the Javascript Console [F12], then click on Console
  3. Paste the following
  
```
var xhr=new XMLHttpRequest;xhr.open("get","https://raw.githubusercontent.com/TeaWithLucas/Herosaver/master/herosaver.js",true);xhr.onreadystatechange=function(){if(xhr.readyState==4){var script=document.createElement("script");script.type="text/javascript";script.text=xhr.responseText;document.body.appendChild(script)}};xhr.send(null);
```

### Loading via Greecemonkey or other script loader
This method should automatically load the script on page load.

1. Install Greecemonkey Browser Addon (or alternative)
2. Click the icon and select 'New User Script' from the dropdown menu
3. Paste the following, editing the intended website
4. Save

```
// ==UserScript==
// @name		Herosaver
// @include		*example.com*
// ==/UserScript==

var loadHerosaver = setInterval(function() {
  if (!document.getElementById("loading-overlay")) {
    clearInterval(loadHerosaver);
    var xhr=new XMLHttpRequest;xhr.open("get","https://raw.githubusercontent.com/TeaWithLucas/Herosaver/master/herosaver.js",true);xhr.onreadystatechange=function(){if(xhr.readyState==4){var script=document.createElement("script");script.type="text/javascript";script.text=xhr.responseText;document.body.appendChild(script)}};xhr.send(null);
  }	
}, 100);
```

## Buttons
* Export Model (STL) - Exports the current model and downloads a STL of it.
* Export (JSON) - Exports the current model settings in a JSON format.
* Import (JSON) - Imports a previously exported JSON file with model settings.
* Enlarge - Increases the size and rotates the model to match STL output for standard printing ```size:[10,10,10], rotation:[90,0,0]```
* Reset Scale - Resets the model and refreshes it, bug: refresh twice to reset some incorrect models. 

## Limitations

Some details of the figures are implemented via shaders. These are not exported :( This is also is the reason, the exported figures look a bit _blocky_. If you want hight quality exports, consider purchasing the stl files :)
