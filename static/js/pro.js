const Elfirst_image = document.querySelector('#first-image');

let finalImgPath = localStorage.getItem('finalImgPath');

Elfirst_image.innerHTML = `<Img src="${finalImgPath}" alt="">`;








