const ElleftImg = document.querySelector('#leftImg');

const Elattack = document.querySelector('#attack');
const Eldefence = document.querySelector('#defence');
const Ellucky = document.querySelector('#lucky');
const Elmagic = document.querySelector('#magic');

const Elbox1_yes = document.querySelector('#box1_yes');
const Elbox2_yes = document.querySelector('#box2_yes');

const Elright_td = document.querySelector('#right-td');
const Elsix_power = document.querySelector('#six-power');
const Elthree_power = document.querySelector('#three-power');

const Elpowerall = document.querySelectorAll('.powerall');
const Elpowera22 = document.querySelectorAll('.powera22');

const Elrightyes = document.querySelector('#rightyes');
const Elrightyes2 = document.querySelector('#rightyes2');
const Eldownp1 = document.querySelector('#downp1');
const Eldownp2 = document.querySelector('#downp2');
const Eldownp3 = document.querySelector('#downp3');

const Elshiny_box = document.querySelector('.shiny-box');
const Elsame_box = document.querySelector('.same-box');

const Elbox1 = document.querySelector('.box1');
const Elbox11 = document.querySelector('.box11');
const Elbox2 = document.querySelector('.box2');
const Elbox22 = document.querySelector('.box22');

const Elrechoice = document.querySelectorAll('.rechoice');

const Elreuse = document.querySelector('#reuse');
const Elreuse2 = document.querySelector('#reuse2');

const Elbox1_refuse = document.querySelector('#box1_refuse');
const Elbox2_refuse = document.querySelector('#box2_refuse');

const Elfinalsend = document.querySelector('#finalsend');
const ElequipName = document.querySelector('#equipName');
const Elstarta = document.querySelector('#starta');

let choices = [];
let secondchoices = [];

//設定兩個方塊的值以方便後續更新使用AJAX
function fetchData() {
    fetch('/profile/shinySame/')
        .then(response => response.json())
        .then(data => {
            choices = data.choices;
            secondchoices = data.secondchoices;
        })
        .catch(error => {
            console.error('錯誤:', error);
        });
}
fetchData();

//兩方塊因監聽方式相同用forEach去跑
const boxes = [
    {
        trigger: Elshiny_box,
        box: Elbox11,
        addbox: Elbox1,
    },
    {
        trigger: Elsame_box,
        box: Elbox22,
        addbox: Elbox2,
    },
];


//抽獎頁面最後的圖片帶入到這頁的html
let finalImgPath = localStorage.getItem('finalImgPath');
let finalValue = localStorage.getItem('finalValue');
console.log(finalValue);

//const requestData = { equipName: finalValue };
ElleftImg.innerHTML = `<Img src="${finalImgPath}" alt="">`;
ElequipName.innerText = finalValue;

//定義屬性閃爍初始狀態
let animationInterval;
let currentValue = 0;
let min = 45;
let max = 99;

//選出6選3
function choiceThree() {
    let checkCount = 0;
    Elpowerall.forEach(checkbox => {
        if (checkbox.checked) {
            checkCount++;
        }
    });
    return checkCount;
};

//設定若不足或超過3之情形
function notThree() {
    const checkCount = choiceThree();
    if (checkCount === 3) {
        Elrightyes.disabled = false;
    } else {
        alert("請選擇三個潛能");
        Elrightyes.disabled = true;
    }
};

//設定點選重新選擇會讓使用者重新選擇方塊
Elrechoice.forEach((recho) => {
    recho.addEventListener('click', () => {
        Elsix_power.style.display = 'none';
        Elthree_power.style.display = 'none';
        Elright_td.innerHTML = `<table border="3" width="100px" height="100px"></table>`;
        isClicked = false;//讓鼠標移過去可以顯示
        Elsame_box.addEventListener('click', boxClick1);
        Elshiny_box.addEventListener('click', boxClick2);
        Eldownp1.innerText = '';
        Eldownp2.innerText = '';
        Eldownp3.innerText = '';
        Elfinalsend.style.display = 'none';


    })
});

//設定點選再用一次後續功能
Elreuse.addEventListener('click', () => {
    fetchData();
    Elpowerall.forEach((checkbox, index) => {
        checkbox.nextSibling.textContent = choices[index]
        checkbox.checked = false;
        Elrightyes.disabled = true;
        console.log(choices[index])
    });

})

Elreuse2.addEventListener('click', () => {
    fetchData();
    Elpowera22.forEach((checkbox, index) => {
        const secondchoiceValue = secondchoices[index];
        console.log(secondchoiceValue)
        checkbox.innerText = secondchoiceValue;
    });

})


//設定變更之情形
Elpowerall.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const checkCount = choiceThree();
        if (checkCount > 3) {
            checkbox.checked = false;
        }
        else if (checkCount === 3) {
            Elrightyes.disabled = false;
        }
        else {
            Elrightyes.disabled = true;
        }
    });
});

//左下取閃炫方塊使用者勾選的三個值
function finalPower() {
    const finalPlist = [];
    Elpowerall.forEach(checkbox => {
        if (checkbox.checked) {
            finalPlist.push(checkbox.nextSibling.textContent.trim());
        }
    })
    console.log(finalPlist);
    return finalPlist;
}

//左下取對等方塊的三個值
function finalPower2() {
    const finalPlist2 = [];
    Elpowera22.forEach(checkbox2 => {
        finalPlist2.push(checkbox2.textContent.trim());

    })
    console.log(finalPlist2);
    return finalPlist2;
}

const requestData = {};
console.log('外部', requestData)
Elrightyes.addEventListener('click', () => {
    const finalPlist = finalPower();

    Eldownp1.innerText = finalPlist[0];
    Eldownp2.innerText = finalPlist[1];
    Eldownp3.innerText = finalPlist[2];

    Elfinalsend.style.display = 'block';

    requestData.value1 = finalPlist[0];
    requestData.value2 = finalPlist[1];
    requestData.value3 = finalPlist[2];
    console.log('requestData', requestData);
});

Elrightyes2.addEventListener('click', () => {
    const finalPlist2 = finalPower2()

    Eldownp1.innerText = finalPlist2[0];
    Eldownp2.innerText = finalPlist2[1];
    Eldownp3.innerText = finalPlist2[2];

    Elfinalsend.style.display = 'block';

    requestData.value1 = finalPlist2[0];
    requestData.value2 = finalPlist2[1];
    requestData.value3 = finalPlist2[2];
    console.log('requestData2', requestData);
});


let isClicked = false;
boxes.forEach((twoBox) => {

    twoBox.trigger.addEventListener('mouseover', () => {
        if (!isClicked) {
            twoBox.box.style.display = 'block';
            twoBox.addbox.style.display = 'block';
        }
    });

    twoBox.trigger.addEventListener('mouseout', () => {
        if (!isClicked) {
            twoBox.box.style.display = 'none';
            twoBox.addbox.style.display = 'none';
        }
    });

});

function boxClick1() {
    Elbox22.style.display = 'block';
    Elbox2.style.display = 'block';
    isClicked = true;
    Elshiny_box.removeEventListener('click', boxClick2)
}

function boxClick2() {
    Elbox11.style.display = 'block';
    Elbox1.style.display = 'block';
    isClicked = true;
    Elsame_box.removeEventListener('click', boxClick1)
}

Elsame_box.addEventListener('click', boxClick1);
Elshiny_box.addEventListener('click', boxClick2);


Elbox1_yes.addEventListener("click", () => {
    fetchData();
    Elright_td.innerHTML = `<img src="/static/image/aimg_13.PNG" alt="">`;
    Elsix_power.style.display = "block";
    Elrightyes.disabled = 'true';

    Elpowerall.forEach((checkbox, index) => {
        checkbox.checked = false;
        checkbox.nextSibling.textContent = choices[index]
        console.log(choices[index])
    });

    Elbox11.style.display = 'none';
    Elbox1.style.display = 'none';
    Elshiny_box.removeEventListener('click', boxClick2)

})

Elbox2_yes.addEventListener("click", () => {
    fetchData();
    Elright_td.innerHTML = `<img src="/static/image/aimg_14.PNG" alt="">`;
    Elthree_power.style.display = "block";

    Elpowera22.forEach((checkbox, index) => {
        checkbox.innerText = secondchoices[index];
        console.log(secondchoices[index])
    })

    Elbox22.style.display = 'none';
    Elbox2.style.display = 'none';
    Elsame_box.removeEventListener('click', boxClick1)
});

Elbox1_refuse.addEventListener('click', () => {
    isClicked = false;//讓鼠標移過去可以顯示
    Elsame_box.addEventListener('click', boxClick1);
    Elshiny_box.addEventListener('click', boxClick2);
    Elbox1.style.display = 'none';
    Elbox11.style.display = 'none';
})

Elbox2_refuse.addEventListener('click', () => {
    isClicked = false;//讓鼠標移過去可以顯示
    Elsame_box.addEventListener('click', boxClick1);
    Elshiny_box.addEventListener('click', boxClick2);
    Elbox2.style.display = 'none';
    Elbox22.style.display = 'none';
})

Elstarta.addEventListener('click', () => {
    startClick(Elattack, 'attack');
    startClick(Eldefence, 'defence');
    startClick(Ellucky, 'lucky');
    startClick(Elmagic, 'magic');
})


let lastattrData = [];
function startClick(button, fieldName) {
    let attrData = [];


    button.textContent = ''; //清空
    button.classList.add('red-text');

    const numberElement = document.createElement('span');
    button.appendChild(numberElement);

    const interval = setInterval(() => {
        const randomValue = getRandomValue(min, max);
        button.textContent = randomValue;
        attrData.push(randomValue)

    }, 70);

    setTimeout(() => {
        clearInterval(interval);
        const lastRandomValue = attrData[attrData.length - 1];
        lastattrData.push(lastRandomValue);
        console.log(lastattrData);

    }, 1500);//閃爍的總共時間
}

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

Elfinalsend.addEventListener('click', () => {
    let finalImgPath = localStorage.getItem('finalImgPath');
    console.log('最後資料', lastattrData);
    console.log(requestData);

    const finalrequestData = {
        equipName: finalValue,
        attack: lastattrData[0],
        defence: lastattrData[1],
        lucky: lastattrData[2],
        magic: lastattrData[3],
        value1: requestData.value1,
        value2: requestData.value2,
        value3: requestData.value3,
        finalImgPath: finalImgPath
    };
    console.log(finalrequestData)

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/profile/equipData/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(finalrequestData));

})



