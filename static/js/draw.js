const tdElements = document.querySelectorAll('.main_table td');
const changeimg = document.querySelector('#change');
const run1Element = document.querySelector('#run1');
const Eltext2 = document.querySelector('#sec2');
const finalEl = document.querySelector('#finalImg');
const Elretry = document.querySelector('#retry');

const Elnextport = document.querySelector('#nextport');
const Elconfirm = document.querySelector('#confirm');
const Elyes = document.querySelector('#yes');
const Elrefuse = document.querySelector('#refuse');


const start = 1;
const end = 12;

//let lastImageSrc = '';

let click = true;
const getRandNumber = (start, end) => Math.floor(Math.random() * (end - start + 1) + start);

function getNumber(start, end, count = 12) {
    //const imgSrc = "/static/image/draw_" + number + ".PNG";
    let datas = [];
    while (datas.length < count) {
        let number = getRandNumber(start, end);
        if (!datas.includes(number)) {
            datas.push(number);
        }
    }
    return datas;
}

changeimg.addEventListener("click", () => {
    switchImg()

});

run1Element.addEventListener("click", () => {
    changeimg.disabled = true;
    run1Element.disabled = true; //禁用按鈕
    Elnextport.disabled = false;
    Elretry.disabled = false;


    startDraw((lastImgSrc, finalValue) => {
        console.log("最後圖片位置:" + lastImgSrc);


        Eltext2.innerText = `恭喜獲得裝備:${finalValue}`;
        Elretry.style.display = 'block';
        Elnextport.style.display = 'block'
    });
});

Elretry.addEventListener("click", () => {

    changeimg.disabled = false; // 恢復按鈕可以使用
    run1Element.disabled = false;
    Elnextport.disabled = true;
    Elretry.style.display = 'none';
    Elnextport.style.display = 'none';

    finalEl.innerHTML = '';
    Eltext2.innerText = '請至上方再次"點選"進行抽獎!!!'
});

Elnextport.addEventListener("click", () => {
    Elconfirm.style.display = 'block';
    Elretry.disabled = true;

});

Elyes.addEventListener("click", () => {
    console.log(finalImgPath);
});

Elrefuse.addEventListener("click", () => {
    Elconfirm.style.display = 'none';
    changeimg.disabled = false;
    run1Element.disabled = false;
    finalEl.innerHTML = '';
    Elretry.style.display = 'none';
    Elnextport.style.display = 'none';
    Eltext2.innerText = '請至上方再次"點選"進行抽獎!!!'

})

//let finalValue = '';  
let finalImgPath = '';

function switchImg() {
    //console.log('變化後' + finalImgPath)
    //用上方getNumber函式取得一個隨機亂數的串列
    let datas = getNumber(start, end);
    console.log('第一次結果' + datas[0])
    for (let i = 1; i <= 12; i++) {
        //取12張圖片img1、img2...的部分
        const cellImgElement = document.querySelector(`#img_${i}`);
        const cellreplaImg = document.querySelector(`#img_${datas[i - 1]}`);

        const imgSrc = `/static/image/draw_${datas[i - 1]}.PNG`;
        let dataValue = '';

        //本來使用includes但發現draw10.11.12重複裝備名稱而改用
        if (imgSrc.match(/\/draw_(\d+)\.PNG/)) {
            const number = parseInt(RegExp.$1);
            switch (number) {
                case 1:
                    dataValue = '紫色神秘披風';
                    localStorage.setItem('dataValue', dataValue);
                    break;
                case 2:
                    dataValue = '賢者標誌';
                    localStorage.setItem('dataValue', dataValue);
                    break;
                case 3:
                    dataValue = '紅玫瑰戒指';
                    localStorage.setItem('dataValue', dataValue);
                    break;
                case 4:
                    dataValue = '漆黑能量臉飾';
                    localStorage.setItem('dataValue', dataValue);
                    break;
                case 5:
                    dataValue = '頂級陪羅德耳環';
                    localStorage.setItem('dataValue', dataValue);
                    break;
                case 6:
                    dataValue = '雙手血刃盾牌';
                    localStorage.setItem('dataValue', dataValue);
                    break;
                case 7:
                    dataValue = '波賽頓雙刀';
                    localStorage.setItem('dataValue', dataValue);
                    break;
                case 8:
                    dataValue = '紫靈惡魔盾牌';
                    localStorage.setItem('dataValue', dataValue);
                    break;
                case 9:
                    dataValue = '黃金十字耳環';
                    localStorage.setItem('dataValue', dataValue);
                    break;
                case 10:
                    dataValue = '黃石項鍊';
                    localStorage.setItem('dataValue', dataValue);
                    break;
                case 11:
                    dataValue = '菲爾斯戰斧';
                    localStorage.setItem('dataValue', dataValue);
                    break;
                case 12:
                    dataValue = '航海師披風';
                    localStorage.setItem('dataValue', dataValue);
                    break;
            }
        }

        console.log(imgSrc, dataValue);
        if (cellImgElement) {
            cellImgElement.innerHTML = `<img src="${imgSrc}" data-value="${dataValue}" alt="">`;
        }
    }
}

click = !click;

let intervalId;
let currentIndex = 0;



function startDraw(callback) {

    clearInterval(intervalId);
    tdElements.forEach(td => td.classList.remove('highlight'));

    currentIndex = 0;
    let count = 0;

    intervalId = setInterval(() => {
        tdElements[currentIndex].classList.remove('highlight');

        do {
            currentIndex = Math.floor(Math.random() * tdElements.length);
        } while (currentIndex === 5);

        tdElements[currentIndex].classList.add('highlight');
        count++;


        if (count >= 20) {
            clearInterval(intervalId);
            const finalTdElement = tdElements[currentIndex];
            const finalImgSrc = finalTdElement.querySelector('img').getAttribute('src');
            //console.log(finalImgSrc)取得該圖片的src
            const lastDrawDataValue = finalTdElement.querySelector('img').getAttribute('data-value');
            //console.log(lastDrawDataValue)
            finalImgPath = finalImgSrc;
            finalValue = lastDrawDataValue;

            //儲存最後圖片網址以讓下個js使用
            localStorage.setItem('finalImgPath', finalImgPath);
            localStorage.setItem('finalValue', finalValue);


            if (typeof callback === 'function') {
                finalEl.innerHTML = `<img src="${finalImgSrc}" alt="">`;
                console.log('區域變數:' + finalValue);
                //console.log(finalImgSrc);
                callback(finalImgSrc, finalValue);
            }
        }
    }, 100);
}






