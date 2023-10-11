from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import random
import json

# Create your views here.
def shinysame_data(request):
    ############閃炫方塊 ##############
    datas = ['BOSS傷害+40%','BOSS傷害+30%','BOSS傷害+20%',
             '無視傷害+40%','無視傷害+30%','無視傷害+20%',
             '暴擊機率+10%','暴擊機率+7%','暴擊機率+5%',
             '暴擊傷害+10%','暴擊傷害+7%','暴擊傷害+5%',
             '掉寶率+20%','掉寶率+15%','掉寶率+10%',
             '防禦力+20%','防禦力+15%','防禦力+10%']
    
    #type為串列型態，抓取不重複的6個值
    choices = random.sample(datas,6)
    #防止下方的remove影響到閃炫方塊這的choice值
    choicescopy = list(choices)
    
                ############### 對等方塊 ##############
                
    secondchoices=[]
    first_choice = random.choice(choices)
    #second_choice = None
    
    if first_choice in datas[::3]:
        #如果機率是90%的話
        if random.random()<0.9:
            second_choice = first_choice
            choicescopy.remove(first_choice)
            secondchoices.extend([first_choice,second_choice] + random.sample(choicescopy,1))
    
        else:
            secondchoices.append(first_choice)
            choicescopy.remove(first_choice)
            secondchoices.extend(random.sample(choicescopy,2))
    else:
        secondchoices.extend(random.sample(choicescopy,3))
        
    data = {'choices':choices,'secondchoices':secondchoices}

    return JsonResponse(data)



def profile_up(request):
         
           
    return render(request,'pro/up.html')
    

def profile_draw(request):
    
    return render(request,'pro/draw.html')


def profile_index(request):

    return render(request,'pro/profile.html')