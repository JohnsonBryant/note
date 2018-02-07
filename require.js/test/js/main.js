// require.config({
//     baseUrl: "js",
//     paths: {
//         jquery: "lib/jquery1.11.3",
//         fullpage: "lib/jquery.fullpage",
//         sub: "app/sub"
//     }
// });

// require(["jquery", "fullpage", "sub"] , function($, fullpage, sub){
    
//     $("#fullpage").fullpage();
//     sub.addToCart();
// })



// require.config({
//     paths: {
//         "jquery": ["https://cdn.bootcss.com/jquery/1.11.3/jquery", "js/jquery1.11.3"],
//         "fullpage": ["https://cdn.bootcss.com/fullPage.js/2.9.6/jquery.fullpage", "js/jquery.fullpage"]
//     }
// })
// require(['jquery','fullpage', 'index'], function($ , fullpage, index){
//     // $(function(){
//         $('#fullpage').fullpage({
//             menu: '#navBar',
//             anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
//             navigation: false,
//             navigationPosition: 'right',
//             slidesNavigation: false,
//             slidesNavPosition: 'bottom',

//             controlArrows: true,
//         });
//     // })

// }, function(){
//     console.log("加载失败。");
// })
