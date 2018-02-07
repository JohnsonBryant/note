require.config({
    paths:{
        jquery:"lib/jquery1.11.3",
        fullpage:"lib/jquery.fullpage",
        sub:"app/sub"
    }
})

define(["jquery", "fullpage", "sub"], function($ ,fullpage ,sub){
    let arr = [];
    arr.push($);arr.push(fullpage);arr.push(sub);
    console.log(arr);
})

// define({
//     color:"#fff",
//     size:"normal"
// })