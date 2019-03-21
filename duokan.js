// ==UserScript==
// @name         多看阅读复制
// @namespace    https://github.com/YujiaCheng1996/DuokanJSCopy
// @version      0.1
// @description  多看阅读复制文本
// @author       YujiaCheng1996
// @match        http://www.duokan.com/reader/www/app.html?id=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.body.addEventListener('copy', function (e) {
        var text = document.getElementById("button-copy").getAttribute("text");
        var addExtHTML = function(e) {
            if (!e) {
                clipboardData.setData('Text', text);
            } else if (e.clipboardData) {
                e.preventDefault();
                e.clipboardData.setData('text/plain', text);
            } else {
                var selection = window.getSelection();
                var body = document.getElementsByTagName('body')[0];
                var range = selection.getRangeAt(0);
                var extContent = document.createElement('div');
                extContent.style.position = 'absolute';
                extContent.style.left = '-99999px';
                extContent.innerHTML = text;
                body.appendChild(extContent);
                selection.selectAllChildren(extContent);
                window.setTimeout(function() {
                    body.removeChild(extContent);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    body = selection = null;
                },
                0);
            }
        };
        if (typeof(clipboardData) !== 'undefined') {
            document.body.oncopy = function() {
                setTimeout(addExtHTML, 50);
            };
        } else {
            document.oncopy = addExtHTML;
        }
    });
})();
