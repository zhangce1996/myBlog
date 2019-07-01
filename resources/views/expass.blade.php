
<!DOCTYPE html>
<html class="js cssanimations"><head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>加权神器</title>
    <meta name="description" content="这是一个 index 页面">
    <meta name="keywords" content="index">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <script src="{{asset('js/sq-pass')}}/ajax.js" type="text/javascript"></script>
    <script src="{{asset('js/sq-pass')}}/amazeui.js"></script>
    <script src="{{asset('js/sq-pass')}}/pagination.js"></script>
    <script src="{{asset('js/sq-pass')}}/dateUtils.js"></script>
    <script src="{{asset('js/sq-pass')}}/jquery-1.js"></script>


</head>
<body data-type="index">


<div class="tpl-page-container tpl-page-header-fixed">

    <div class="tpl-content-wrapper">
        <div class="tpl-portlet-components">
            <div class="portlet-title">
                <div class="caption font-green bold">
                    系统设置
                </div>
            </div>
            <div class="tpl-block ">
                <div class="am-g tpl-amazeui-form">
                    <div class="am-u-sm-12 am-u-md-9">
                        <form action="{{url('expass')}}" method="post" class="am-form am-form-horizontal">
                            {{csrf_field()}}
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-form-label" for="oldpwd">旧密码</label>
                                <div class="am-u-sm-9">
                                    <input type="password" placeholder="输入你的旧密码" name="oldpwd" id="oldpwd">
                                </div>
                            </div>
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-form-label" for="newpwd">新密码</label>
                                <div class="am-u-sm-9">
                                    <input type="password" placeholder="输入新密码" name="newpwd" id="newpwd">
                                </div>
                            </div>
                            <div class="am-form-group">
                                <label class="am-u-sm-3 am-form-label" for="renewpwd">重复密码</label>
                                <div class="am-u-sm-9">
                                    <input type="password" placeholder="输入重复密码" name="renewpwd" id="renewpwd">
                                </div>
                            </div>
                            <div class="am-form-group">
                                <div class="am-u-sm-9 am-u-sm-push-3">
                                    <input type="submit" class="sub" value="确认修改"/>
                                    <button class="am-btn" type="button" onclick="history.go(-1);">返回</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    if('{{session('res')}}'==1) {
       alert('原密码错误')
    }

    if('{{session('res')}}'=='yes'){
        alert('修改成功')
        location.href='/';
    }else if('{{session('res')}}'=='no'){
        alert('修改失败')
    }

</script>

</body></html>