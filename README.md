Herosaver
=========

Save Configuration and STL from websites like heroforge.com for academic purposes

Usage
-----

  1. Go to the intended website
  2. Open the Javascript Console [F12], then click on Console
  3. Paste the following
  
```
var xhr=new XMLHttpRequest;xhr.open("get","https://raw.githubusercontent.com/TeaWithLucas/Herosaver/master/herosaver.js",true);xhr.onreadystatechange=function(){if(xhr.readyState==4){var script=document.createElement("script");script.type="text/javascript";script.text=xhr.responseText;document.body.appendChild(script)}};xhr.send(null);
```

Limitations
-----------

Some details of the figures are implemented via shaders. These are not exported :( This is also the reason, the exported figures look a bit _blocky_. If you want hight quality exports, consider purchasing the stl files :)
