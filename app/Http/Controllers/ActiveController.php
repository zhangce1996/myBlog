<?php


namespace App\Http\Controllers;


class ActiveController extends Controller
{
    //宣传页
    public function activity0()
    {
        return '活动马上开始，敬请期待';
    }

    //活动页
    public function activity1()
    {
        return '活动进行中，感谢您的光临';
    }

    //结束页
    public function activity2()
    {
        return '您来晚了，活动结束了';
    }








}