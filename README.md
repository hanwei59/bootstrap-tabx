bootstrap-tabx
==============
bootstrap-tabx为bootstrap-tab添加了新增标签页和关闭标签页的功能。
##用法示例
###静态Html

	<div class="container-fluid">
		<div class="row-fluid">
			<div class="span2">
				<ul class="nav nav-list">
					<li><a href="#tab3" link="http://www.ofpay.com">欧飞网</a></li>
					<li><a href="#tab4" link="http://www.qianmi.com">千米网</a></li>
					<li><a href="#tab5" link="http://www.gonghuo.com">供货网</a></li>
				</ul>
			</div>
			<div class="span10">
		        <ul class="nav nav-tabs">
				  <li class="active"><a href="#home">首页</a></li>
				</ul>
				<div class="tab-content">
				  <div class="tab-pane active" id="home">这是一个静态标签页。</div>
				</div>
		    </div>
		</div>
	</div>

###添加事件

	$(function(){
        $(".nav-tabs").tabx();
		$('.nav-list a').click(function (e) {
			  e.preventDefault();
            $(".nav-tabs").tabx("add",{
                id : $(this).attr("href").substr(1),
                title: $(this).text(),
                href: $(this).attr("link")
            });
		});
	});