<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>添加活动</title>
</head>
<body>
<form action="{{url('editact')}}" method="post">
    {{ csrf_field() }}
    活动名称<input name="name" type="text" id="name"/> <br/>
    活动时间<input name="time" type="text" id="time"/> <br/>
    活动链接<input name="link" type="text" id="link"/> <br/>
    活动状态<input name="status" type="text" id="status"/> <br/>
    <input name="" type="submit" value="提交"/>
</form>
</body>
</html>

<script>
    if('{{session('res')}}'==1){
        alert('添加成功')
    }
</script>