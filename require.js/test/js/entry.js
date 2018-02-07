require.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery1.11.3",
        fullpage: "lib/jquery.fullpage",
        sub: "app/sub",
        sup: "app/sup"
    }
})

require(["jquery", "fullpage", "sub", "sup"],
    function($, fullpage, sub, sup){
        sub.addToCart()
    }
)