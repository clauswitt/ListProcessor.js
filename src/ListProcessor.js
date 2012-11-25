/*
 * ListProcessor.js
 * https://github.com/clauswitt/ListProcessor.js
 *
 * Copyright (c) 2012 Claus Witt
 * Licensed under the MIT license.
 */

var ListProcessor;
ListProcessor = function(list, timeout, itemsPerRun, copyInsteadOfReference, context, global) {
    timeout = timeout || 100;
    context = context || this;
    global = global || window;
    itemsPerRun = itemsPerRun || 1;
    if(typeof copyInsteadOfReference === 'undefined') {
        copyInsteadOfReference = false;
    }
    if(copyInsteadOfReference===true) {
        list = list.concat();
    }
    var onEnd;
    var processFunction;
    var process = function() {
        var item;
        var max = itemsPerRun;
        if(max>list.length) {
            max = list.length;
        }
        for(var i=0;i<max;i++) {
            item = list.shift();
            processFunction.call(context, item);
        }

        if(list.length>0) {
            setTimeout(process, timeout);
        } else {
            onEnd();
        }
    };

    this.run = function(processor, callback) {
        processFunction = processor || function(item) {console.log(item);};
        onEnd = callback || function() {console.log('ended');};
        process();
    };
};
