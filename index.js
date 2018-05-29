document.body.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, {passive: false});

let page1 = document.querySelector('.page1');
page1.addEventListener('transitionend', () => {
    if(page1.style.marginTop === '-300vh') {
        //发送数据，因为不知道发什么所以就先不写ajax了
        showMessage('.page4-message', '数据发送成功');
    }
})

let nextPages = document.querySelectorAll('.nextPage');
for(let item of nextPages) {
    item.addEventListener('click', pageMove, false);
}

let page3Select = document.querySelector('.page3-select');
page3Select.addEventListener('click', (e) => {
    if(e.target.nodeName === 'INPUT') {
        let selectedItem = e.target;
        selectedItem.parentNode.style.background = '#e0dede';
        let msg = selectedItem.value === '1'?'选择正确':'选择错误';
        showMessage('.page3-message', msg);
        let selectItems = document.querySelectorAll('.page3-select-item');
        for(let item of selectItems) {
            item.disabled = true;
        }
        setTimeout(pageMove, 4000);
        setTimeout(() => {
            selectedItem.parentNode.style.background = '';
            selectedItem.checked = false;
        }, 4000)
    }
}, false);

let backToTop = document.querySelector('#backToTop');
backToTop.addEventListener('click', () => {
    page1.style.marginTop = '0vh';
    let selectItems = document.querySelectorAll('.page3-select-item');
    for(let item of selectItems) {
        item.disabled = false;
    }
}, false)

function pageMove() {
    if(page1.style.marginTop === '') {
        page1.style.marginTop = '-100vh';
    }
    else {
        page1.style.marginTop = parseInt(page1.style.marginTop) - 100 + 'vh';
    }
}

function showMessage (selector, msg) {
    let message = document.querySelector(selector);
    message.innerText = msg;
    message.style.cssText = 'visibility: visible; animation: message-appear 0.5s;';
    setTimeout(() => {
        message.style.animation = '';
    }, 500);
    setTimeout(() => {
        message.style.animation = 'message-appear 0.5s reverse';
    }, 3500);
    setTimeout(() => {
        message.style.cssText = '';
    }, 4000);
}