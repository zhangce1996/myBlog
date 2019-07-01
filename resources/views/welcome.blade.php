<!DOCTYPE html>
<html class="js cssanimations">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>加权神器</title>


    <style>
        .sui-modal.fade.in{
            top:330px;
        }
    </style>
    <script src="{{asset('js/sq-pass')}}/ajax.js" type="text/javascript"></script>
    <script src="{{asset('js/sq-pass')}}/amazeui.js"></script>
    <script src="{{asset('js/sq-pass')}}/pagination.js"></script>
    <script src="{{asset('js/sq-pass')}}/dateUtils.js"></script>
    <script src="{{asset('js/sq-pass')}}/jquery-1.js"></script>
</head>



<body>
<header class="sui-navbar" style="margin-bottom: 5px">
    <div class="navbar-inner">
        <a href="http://tcx.aoasp.com/zkHKJ2" class="sui-brand" style="padding: 0 8px">加权神器 </a>
        <ul id="div_navBar" class="sui-nav" style="margin-right: 5px">
            <li><a style="padding: 11px 12px 9px 12px;" href="http://tcx.aoasp.com/zkHKJ2/main">首页</a></li>
        </ul>
        <div style="float: right; width: 140px;">
            <div style="float: right; margin-top: 1px;">2019-05-13到期</div>
            <ul class="sui-nav pull-right nav-links" style="float: right; margin-top: 1px; height: 20px;">
                <li>
                    <a href="{{url('pass')}}" style="padding: 0 0 0 20px;">
                        <font style="line-height: 38px;">密码修改</font>
                    </a>
                </li>
                <li>
                    <a href="{{url('logout')}}" style="padding: 0 0 0 20px;">
                        <font style="line-height: 38px;">退出登陆</font>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</header>
<div class="sui-container" style="width: 98%;">
    <div class="sui-row-fluid">
        <div class="smsContent">
            <div class="sui-msg msg-large msg-warning" style="margin-left: 7px;margin-top: 10px;">
                <div class="msg-con">
                    1、手淘加权神器，您苦苦寻找神器就在这里，不懂咨询客服<br>
                    2、生成的长链接，可以用于手淘，在钻展，首页领劵、爆款海报，宝贝详情页、分类页等各个地方使用。<br>
                    3、生成的短链接，可以用于短信和其他站外wap网站，点击后会自动打开淘宝客户端进行 自动关注、加购物车，送券等。<br>
                    4、生成的二维码，可以通过旺旺，微信群进行传播。<br>
                    5、用途比较广泛，就看你脑洞够不够大<br>
                </div>
                <s class="msg-icon"></s>
            </div>
            <div style=" margin-left:10px;">
                <div class="titleStyled">
                    <p class="sui-text-xxlarge">活动列表
                        <a href="http://tcx.aoasp.com/zkHKJ2/main/addActivity?sellerNick=lYXTEJdvGchcur5I6PbdR2fhKoAv8jzpDMK8/yR1A6E=" class="sui-btn btn-success nav_href">创建活动</a>
                        <a href="http://tcx.aoasp.com/zkHKJ2/activity/accessStatistics?sellerNick=lYXTEJdvGchcur5I6PbdR2fhKoAv8jzpDMK8/yR1A6E=" target="_blank" class="sui-btn nav_href">访客统计</a>
                        <a href="http://tcx.aoasp.com/zkHKJ2/image" target="_blank" class="sui-btn btn-primary">海报素材</a>
                        <a href="http://tcx.aoasp.com/zkHKJ2/static/help.docx" target="_blank" class="sui-btn">操作教程下载 </a>
                        <font style="margin-left: 200px; color: rgb(40, 163, 239); font-size: 15px; display: none;" id="totalFee">当前余额：0元,0钻</font>
                        <a href="" target="_blank" class="sui-btn btn-primary" id="startPay" style="display: none;">立即充值</a>
                    </p>
                </div>
                <div class="topBorder">
                    <div class="sui-row-fluid" style=" margin-top:10px;">
                        <div class="tab-content">
                            <div class="tab-pane active" style="width:80%; float:left;">
                                <table class="sui-table table-bordered" border="1">
                                    <thead>
                                    <tr>
                                        <th>活动名称</th>
                                        <th>活动时间</th>

                                        <th>活动链接</th>
                                        <th>活动状态</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    @foreach($list as $v)
                                    <tbody id="tb_grid">
                                    <tr><td>{{$v->name}}</td>
                                        <td>{{$v->time}}</td>

                                        <td><textarea rows="5" cols="25">{{$v->link}}</textarea></td>
                                        <td class="status{{$v->id}}"><span style="color:red;">
                                                @if($v->status==1)
                                                    进行中
                                                @elseif($v->status==2)
                                                    已结束
                                                @elseif($v->status==3)
                                                    未开始
                                                @endif
                                            </span></td>
                                        <td>
                                            <div>
                                                <a href="javascript:;" onclick="stopActivity({{$v->id}})" class="sui-btn">停止活动</a><br>
                                                <a href="javascript:;" onclick="remove({{$v->id}})" class="sui-btn  btn-danger">删除活动</a><br>
                                                <a href="{{url('addact')}}" class="sui-btn btn-success">添加活动</a><br>
                                                <a href="http://tcx.aoasp.com/zkHKJ2/activity/accessLog?id=62667079967c485190fb31498172fc1f&amp;sellerNick=lYXTEJdvGchcur5I6PbdR2fhKoAv8jzpDMK8/yR1A6E=" target="_blank" class="sui-btn">访客旺旺</a>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                    @endforeach
                                </table>
                                <div class="am-cf">
                                    <span id="myPageCountSpan"><div class="sui-pagination"><ul><li class="prev disabled"><a href="#" data="0">«上一页</a></li><li class="active"><a href="#" data="1">1</a></li><li class="next disabled"><a href="#" data="2">下一页»</a></li></ul></div></span>
                                </div>
                                <div align="center">
                                    <a href="http://tcx.aoasp.com/zkHKJ2/main/addActivity?sellerNick=lYXTEJdvGchcur5I6PbdR2fhKoAv8jzpDMK8/yR1A6E=" style="margin-bottom:50px;line-height: 30px; font-size: 15px;" class="sui-btn btn-success nav_href">创建活动</a>
                                </div>
                            </div>
                            <div class="tab-pane active" style="width: 19%; float: right; text-align: center; display: none;" id="qrcodeDIV">
                                <img src="%E5%8A%A0%E6%9D%83%E7%A5%9E%E5%99%A8_files/qr.png" width="200px">
                                <br> <br>
                                <span>手机淘宝扫一扫</span><br>
                                <span>测试</span><br>
                                <span>自动关注、加购物车</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body></html>
<script>
    //停止活动
    function stopActivity(id)
    {
        url="{{url('stopact')}}";
        $.get(url,{'id':id},function (data) {
                $('.status'+id).text('已结束');
        },'text');
    }

    //删除活动
    function remove(id)
    {
        url="{{url('remove')}}";
        $.get(url,{'id':id},function (data) {
            $('.status'+id).parent().remove();
        },'text');
    }




</script>