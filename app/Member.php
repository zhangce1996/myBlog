<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $table = 'member';//模型关联表
    public $timestamps = false;//关闭 自动维护时间戳
    protected $guarded = [];//不允许批量赋值的字段 为空
}
