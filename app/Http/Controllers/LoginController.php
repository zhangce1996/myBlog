<?php

namespace App\Http\Controllers;

use App\Active;
use App\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;



class LoginController extends Controller
{
    //执行登录
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function dologin()
    {
        //获取提交数据
        $name=$_POST['username']?$_POST['username']:'';
        $pass=$_POST['password']?$_POST['password']:'';
        //判断表中是否存在
        $bool = Member::where('name',$name)->where('pass',$pass) ->get()->toarray();
        //dump($bool);
        //表格数据

        $list = Active::get();
//        dd($list);

        //存在则跳转
        if($bool){
            $id=$bool[0]['id'];
//            dd($id);
            Session::put('id',$id);
            return view('welcome',[
                'list'=>$list
            ]);
        }else{
        //不存在则返回
            return back();
        }


    }

    //退出登录
    public function logout()
    {
        Session::put('id','');
        return view('login');
    }

    //修改密码
    public function expass()
    {
        $oldpwd = $_POST['oldpwd'];
        $id = Session::get('id');
        $pass = Member::where('id', $id)->pluck('pass');
        if ($oldpwd == $pass[0]) {
                $newpwd = $_POST['newpwd'];
                $bool = Member::where('id', $id)->update(['pass' => $newpwd]);
                if ($bool) {
                    return back()->with('res', 'yes');
                } else {
                    return back()->with('res', 'no');
                }
        } else {
            return back()->with('res', 1);
        }
    }

    //停止活动
    public function stopact()
    {
        $id = $_GET['id'];
//        dd($id);
        $bool = Active::where('id',$id)->update([
            'status'=>2
        ]);
        if($bool){
            return;
        }
    }

    //删除活动
    public function remove()
    {
        $id = $_GET['id'];
//        dd($id);
        $bool = Active::where('id',$id)->delete();
        if($bool){
            return;
        }
    }

    //添加活动
    public function editact(Request $request)
    {
//        dd($request->name);
        $result = Active::create(
           $request->all()
        );
//        dd($result);
        if ($result){
            return back()->with('res',1);
        }
    }





}
