
// define({
//     color: "black",
//     size: "unsize"
// })

// define(function(){
//     // do setup work here

//     return {
//         color: "white",
//         size: "24px"
//     }
// })
// require.config({
//     paths:{
//         jquery: "../lib/jquery1.11.3"
//     }
// })
define(["jquery"], function($){

    return {
        color: "blue",
        size: "large",
        addToCart: function(){
            console.log($)
        }
    }
},function(){
    console.log("载入失败")
})