(function($){
    "use strict"; // jshint ;_;

    $.fn.tabx = function (option, args) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('tab'),
                options = $.extend({}, $.fn.tab.defaults, $this.data(), typeof option == 'object' && option);

            if (!data) $this.data('tab', (data = new Tabx(this, options)));
            if (typeof option == 'string') data[option].apply(data, [].concat(args));
        })
    };

    $.fn.tabx.defaults = {};

    var Tabx = function (element, options) {
        this.init(element, options);
    };

    Tabx.prototype = {
        constructor: Tabx,
        init: function (element, options) {
            this.options = options;
            this.$element = $(element);
            this.bindEvent(this.$element.find("li"));
        },
        bindEvent: function(tabLi){
            var that = this;
            var tabItem = tabLi.find("a");

            //点击tab页的事件
            tabItem.click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });

            $("<a class='close' href='#'>&times;</a>").prependTo(tabItem.filter("[closeable=true]").parent())
                .click(function(e){
                    e.preventDefault();
                    var id = $(this).next().attr("href").substr(1);
                    that.removeById(id);
                });
        },
        add: function(option){
            //如果对应ID的tab页已存在
            if($(".tab-content #"+option["id"]).length>0){
                //激活对应ID的tab页
                $('.nav-tabs>li>a[href=#'+option["id"]+']').tab('show');
                return;
            }
            var closeable = true;
            if(option["closeable"] === false || option["closeable"] == "false"){
                closeable = false;
            }
            var tabLi = $("<li><a href='#"+option["id"]+"'"+(closeable?"closeable='true'":"")+" >"+option["title"]+"</a></li>").appendTo(this.$element);
            this.bindEvent(tabLi);
            var content = option["content"];
            if(option["href"]){
                content = '<iframe src="'+option["href"]+'" id="'+option["id"]+'" width="100%" height="100%" scrolling="auto" frameborder="0" marginwidth="0" marginheight="0" style="overflow: hidden;"></iframe>';
            }
            $(".tab-content").append("<div class='tab-pane' id='"+option["id"]+"'>"+content+"</div>");
            tabLi.find("a").not(".close").tab('show');
        },
        removeById: function(tabId){
            //删除tab内容
            $("#"+tabId).remove();
            var tabItem = $('.nav-tabs>li>a[href=#'+tabId+']');
            //如果本tab已被激活，激活前一个tab页
            if(tabItem.parent().is(".active")){
                tabItem.parent().prev().find("a").not(".close").tab('show');
            }
            //删除tab页
            tabItem.parent().remove();
        }
    }

    $.fn.tabx.Constructor = Tabx;
})(window.jQuery);