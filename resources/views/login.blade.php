<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>登录</title>
</head>
<body>
    <form action="{{url('dologin')}}" method="post">
        {{ csrf_field() }}
        用户名<input name="username" type="text" id="name"/> <br/>
        密码<input name="password" type="password" id="pass"/><br/>
        <input name="提交" type="submit" value="提交"/>
    </form>



</body>
</html>
