// This file will add both p5 instanced and global intellisence 
import * as p5Global from 'p5/global'
//import p5 and p5 sound   
import module = require('p5');
export = module;
export as namespace p5;


declare global {
    interface p5InstanceExtensions {
        loadSound: (path: string, successCallback?: () => void, errorCallback?: () => void, whileLoading?: () => void) => any;
    }
}