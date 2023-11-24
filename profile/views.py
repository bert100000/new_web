from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import profile, shopcart, ordercart
from datetime import datetime
from .forms import proForm, changeform, shopcartForm
from django.contrib import messages
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import get_object_or_404

import random
import json
import os


def delete_item(request, item_id):
    item = get_object_or_404(shopcart, id=item_id, user=request.user)
    item.delete()
    messages.success(request, "商品已從購物車中移除")
    return redirect("shopcartname")


def finalsearch(request):
    shopcartlist = []
    message = ""

    if request.method == "POST":
        search = request.POST.get("search")
        checkbox = request.POST.get("mbox")

        order = ordercart.objects.filter(ordernumber=search, user=request.user).first()
        message_box = ordercart.objects.filter(message_box=checkbox)

        if order and message_box:
            shopcartlist = shopcart.objects.filter(order=order)
        else:
            message = "您輸入的編號或信箱有誤"

    return render(request, "pro/finalsearch.html", locals())


def search(request):
    return render(request, "pro/search.html", locals())


def finish(request):
    ordercartlist = ordercart.objects.filter(user=request.user)

    messagelist = []
    ordernumberlist = []
    for item in ordercartlist:
        ordernumberlist.append(item.ordernumber)
        messagelist.append(item.message_box)
    lastordernumber = ordernumberlist[-1] if ordernumberlist else None
    lastmessagebox = messagelist[-1] if messagelist else None

    if request.method == "POST":
        total_prices = []

        if "finish" in request.POST:
            ordernumber = request.POST.get("ordernumber")
            totalPrice = request.POST.get("totalPrice")
            buy_way = request.POST.get("buy_way")
            message_box = request.POST.get("message_box")
            user = request.user

            new_ordercart = ordercart(
                ordernumber=ordernumber,
                totalPrice=totalPrice,
                buy_way=buy_way,
                message_box=message_box,
                user=user,
            )
            new_ordercart.save()

            shopcart_items = shopcart.objects.filter(user=user, order__isnull=True)

            for item in shopcart_items:
                item.order = new_ordercart
                item.is_processed = True
                item.save()

            return redirect("finish")

        if "backshopcart" in request.POST:
            return redirect("shopcartname")

    return render(request, "pro/finish.html", locals())


# 總價設一個函式方便共用取值
def totalprices(shopcartlist):
    total_prices = []
    for prices in shopcartlist:
        total_prices.append(prices.price)
    total_prices = sum(total_prices)
    return total_prices


def paying(request):
    content = ""
    message = ""

    number = []
    for i in range(8):
        number.append(random.randint(0, 9))
        ordernumber = "".join(map(str, number))
    print(ordernumber)

    payings = request.POST.get("pay_method")

    if request.method == "POST":
        if "checkout" in request.POST:
            if payings == "transfer":
                content = "帳戶:(012)8273-9964-5763"
                message = "ATM/匯款繳費"
            elif payings == "store_payment":
                content = "<<查尋超商位置-點選地圖>>"
                message = "超商繳費"
            else:
                message = "請先前往購物車選取付款方式。"
        else:
            if "comeback" in request.POST:
                return redirect("profile")

    shopcartlist = shopcart.objects.filter(user=request.user, is_processed=False)
    total_prices = totalprices(shopcartlist)

    return render(request, "pro/paying.html", locals())


def shopcartname(request):
    if request.method == "POST":
        # 取得form表單傳回的name值
        product_img = request.POST.get("product_img")
        product_name = request.POST.get("product_name")
        price = request.POST.get("price")
        quantity = request.POST.get("quantity")
        user = request.user

        shopcart.objects.create(
            product_img=product_img,
            img_name=os.path.basename(product_img),
            product_name=product_name,
            price=price,
            quantity=quantity,
            user=user,
        )
        messages.success(request, "商品已成功添加到購物車")

        return redirect("shopcartname")

    shopcartlist = shopcart.objects.filter(user=request.user, is_processed=False)
    total_prices = totalprices(shopcartlist)

    items_per_page = 5
    paginator = Paginator(shopcartlist, items_per_page)
    page = request.GET.get("page")

    try:
        shopcartlist = paginator.page(page)
    except PageNotAnInteger:
        shopcartlist = paginator.page(1)
    except EmptyPage:
        shopcartlist = paginator.page(paginator.num_pages)

    page_prices = []
    for per_price in shopcartlist:
        page_prices.append(per_price.price)
    page_prices = sum(page_prices)

    return render(request, "pro/shopcart.html", locals())


@login_required
@csrf_exempt
def equipData(request):
    data = {}
    response_data = {}

    if request.method == "POST":
        try:
            data = json.loads(request.body)

            datalist = [
                "equipName",
                "attack",
                "defence",
                "lucky",
                "magic",
                "value1",
                "value2",
                "value3",
                "finalImgPath",
            ]

            new_profile = profile()
            new_profile.user = request.user
            new_profile.title = data.get("equipName")

            for i in datalist:
                if data.get(i) is not None:
                    setattr(new_profile, i, data.get(i))
            print(response_data)
            new_profile.save()
            return JsonResponse({"message": "success"})

        except json.JSONDecodeError:
            return redirect("profile")
    return JsonResponse({})


def shinysame_data(request):
    ############閃炫方塊 ##############
    datas = [
        "BOSS傷害+40%",
        "BOSS傷害+30%",
        "BOSS傷害+20%",
        "無視傷害+40%",
        "無視傷害+30%",
        "無視傷害+20%",
        "暴擊機率+10%",
        "暴擊機率+7%",
        "暴擊機率+5%",
        "暴擊傷害+10%",
        "暴擊傷害+7%",
        "暴擊傷害+5%",
        "掉寶率+20%",
        "掉寶率+15%",
        "掉寶率+10%",
        "防禦力+20%",
        "防禦力+15%",
        "防禦力+10%",
    ]

    # type為串列型態，抓取不重複的6個值
    choices = random.sample(datas, 6)
    # 防止下方的remove影響到閃炫方塊這的choice值
    choicescopy = list(choices)

    ############### 對等方塊 ##############

    secondchoices = []
    first_choice = random.choice(choices)
    # second_choice = None

    if first_choice in datas[::3]:
        # 如果機率是90%的話
        if random.random() < 0.9:
            second_choice = first_choice
            choicescopy.remove(first_choice)
            secondchoices.extend(
                [first_choice, second_choice] + random.sample(choicescopy, 1)
            )

        else:
            secondchoices.append(first_choice)
            choicescopy.remove(first_choice)
            secondchoices.extend(random.sample(choicescopy, 2))
    else:
        secondchoices.extend(random.sample(choicescopy, 3))

    data = {"choices": choices, "secondchoices": secondchoices}

    return JsonResponse(data)


def create_pro(request):
    message = ""
    form = proForm()
    if request.method == "POST":
        print(request.POST)
        form = proForm(request.POST)
        todo = form.save(commit=False)
        todo.user = request.user
        todo.save()
        message = "建立成功"

    return render(request, "pro/createform.html", {"form": form, "message": message})


def pro(request, id):
    # 還沒按下submit所以是GET
    if request.method == "GET":
        pro = profile.objects.get(pk=id)
        img_filename = os.path.basename(pro.finalImgPath)
        changepro = profile.objects.get(pk=id)
        form = changeform(instance=pro)

    if request.method == "POST":
        pro = profile.objects.get(pk=id)
        form = changeform(request.POST, instance=pro)
        if form.is_valid():
            pro = form.save(commit=False)
            pro.date_completed = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            pro.save()

        # img_filename = ''
        # if pro.finalImgPath:
        #     img_filename = os.path.basename(pro.finalImgPath)
        # return shopcartname(request)

    # 隨機取價格
    number = random.randint(1000, 5000)

    return render(request, "pro/pro.html", locals())


def profile_index(request):
    # 使用者登入可以對應到自己的profile
    user = request.user  # request中會有user
    if user.is_authenticated:
        profiles = profile.objects.filter(user=user)  # 左邊user是models裡的/右邊是request裡的

    return render(request, "pro/profile.html", {"profiles": profiles})


def profile_up(request):
    return render(request, "pro/up.html")


def profile_draw(request):
    return render(request, "pro/draw.html")
