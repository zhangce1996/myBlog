<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//登录页面
Route::get('/', function () {
    return view('login');
});
//执行登录
Route::any('dologin',['as'=>'login','uses'=>'LoginController@dologin']);

//修改密码页面
Route::get('pass', function () {
    return view('expass');
});

//退出登录
Route::get('logout',['as'=>'logout','uses'=>'LoginController@logout']);

//修改密码
Route::post('expass',['as'=>'expass','uses'=>'LoginController@expass']);

//停止活动
Route::any('stopact',['as'=>'stopact','uses'=>'LoginController@stopact']);

//删除活动
Route::any('remove',['as'=>'remove','uses'=>'LoginController@remove']);

//添加活动页面
Route::get('addact', function () {
    return view('addact');
});

//添加活动
Route::post('editact',['as'=>'editact','uses'=>'LoginController@editact']);