<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class MemberTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('member')->insert([
           ['name'=>'zhangsan','pass'=>'13579'],
           ['name'=>'lisi','pass'=>'1234555'],

        ]);
    }
}
