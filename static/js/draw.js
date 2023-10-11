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

let lastImageSrc = '';
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
    switchImg();
});

run1Element.addEventListener("click", () => {
    changeimg.disabled = true;
    run1Element.disabled = true; //禁用按鈕
    Elnextport.disabled = false;
    Elretry.disabled = false;


    startDraw((lastImgSrc) => {
        console.log("最後圖片位置:" + lastImgSrc);

        Eltext2.innerText = '恭喜獲得裝備'
        Elretry.style.display = 'block';
        Elnextport.style.display = 'block'
    });
});

Elretry.addEventListener("click", () => {

    changeimg.disabled = false; // 恢复按钮可用状态
    run1Element.disabled = false; // 恢复按钮可用状态
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
    changeimg.disabled = false; // 恢复按钮可用状态
    run1Element.disabled = false; // 恢复按钮可用状态
    finalEl.innerHTML = '';
    Elretry.style.display = 'none';
    Elnextport.style.display = 'none';
    Eltext2.innerText = '請至上方再次"點選"進行抽獎!!!'

})


function switchImg() {
    let datas = getNumber(start, end);
    console.log('第一次結果' + datas[0])
    for (let i = 1; i <= 12; i++) {
        const cellImgElement = document.querySelector(`#img_${i}`);
        const imgSrc = `/static/image/draw_${datas[i - 1]}.PNG`;

        //const = `'<table border="2.5">'+'<tr>'`
        if (cellImgElement) {
            cellImgElement.innerHTML = `<img src="${imgSrc}" alt="">`;
        }
        lastImageSrc = imgSrc;
    }
    click = !click;
}

let intervalId;
let currentIndex = 0;

let finalImgPath = '';

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
            finalImgPath = finalImgSrc;
            localStorage.setItem('finalImgPath', finalImgPath);//儲存最後圖片網址以讓下個js使用
            //console.log(finalImgSrc);

            if (typeof callback === 'function') {
                finalEl.innerHTML = `<img src="${finalImgSrc}" alt="">`;
                callback(finalImgSrc);
            }
        }
    }, 100);
}






