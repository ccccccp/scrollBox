/**
 * Created by dell on 2017/2/9.
 */
require.config({
    paths:{
        public:['public','http://127.0.0.1:88/require_public'],
        scrollBox:'scrollBox'
    }
});
require(['scrollBox'],function(scrollBox){
    scrollBox.init("scroll","box","ul");
});