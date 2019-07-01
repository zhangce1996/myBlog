<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Active extends Model
{
    protected $table = 'active';
    public $timestamps = false;
    protected $guarded = [];
}
