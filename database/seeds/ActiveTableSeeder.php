<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ActiveTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('active')->insert([
           ['name'=>123,'time'=>"2019-06-28",'link'=>'fafaf.com','status'=>1],
           ['name'=>455,'time'=>"2019-06-24",'link'=>'fagdgaf.com','status'=>1],
        ]);
    }
}
