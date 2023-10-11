from django.shortcuts import render,redirect
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

# Create your views here.


def index_login(request):
    message=''
    if request.method == 'POST':
        print(request.POST)
        if request.POST.get('register'):
            return redirect('register')
        if request.POST.get('login'):
            
            username=request.POST.get('username')
            password=request.POST.get('password')
            
            if password =='' or username =='':
                message = '帳密不得為空'
            else:
                user = authenticate(request,username=username,password=password)
                print(user)
                if not user:
                    if User.objects.filter(username=username):
                        message = '密碼錯誤'
                    else:
                        message = '帳號錯誤'
                else:
                    login(request,user)
                    message= '登入成功'
                    return redirect('profile')
                
    return render(request,'user/index.html',{'message':message})

def user_register(request):
    message=''
    
    #form = UserCreationForm()
    try:
        if request.method == 'POST':
            username = request.POST.get('username')
            password1 = request.POST.get('password1')
            password2 = request.POST.get('password2')
            email = request.POST.get('email')
    
            if len(password1)<8:
                message = '密碼過短 請加長密碼加強安全性!!!'
                print(type(eval(password1)))
            elif password1 != password2:
                message = '兩次輸入密碼不同 請確認!!!'
            
            
            else:
                if User.objects.filter(username=username).exists():
                    message='帳號重覆 請更換'
                else:
                    user = User.objects.create_user(username=username,password=password1,email=email)
                    user.save()
                    login(request,user)
                    message='註冊成功'
                    return redirect('index')
    except Exception as e:
        print(e)
        message = '註冊失敗'
        
        print(request.POST)
    
    return render(request,'user/register.html',{'message':message})
            

