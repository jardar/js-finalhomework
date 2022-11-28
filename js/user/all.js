
let gProducts = [];
//
const productSelect = document.querySelector(".productSelect");
productSelect.addEventListener("change", (e) => {
    renderFilteredProductWrap(e.target.value)
});

const productWrap = document.querySelector(".productWrap");
productWrap.addEventListener("click", (e) => {
    const productId = e.target.getAttribute("data-id")
    if (!productId) { return }
    e.preventDefault()
    // console.log(productId)
    handleAddProduct(productId)
});

const shoppingCartTbl = document.querySelector(".shoppingCart-table")
shoppingCartTbl.addEventListener("click", (e) => {
    e.preventDefault()
    const cartId = e.target.getAttribute("data-id")
    if (!!cartId) {
        // delete one item
        // console.log("delete one", cartId)
        handleDeleteCart(cartId)

    } else if (e.target.getAttribute("class") === "discardAllBtn") {
        // delete all items
        // console.log("delete all")
        handleDeleteAllCart()
    }

});

const orderInfoBtn = document.querySelector(".orderInfo-btn")
orderInfoBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (!validateAll()) {
        showError("預訂資料錯誤，請修正過再送出")
        return
    }
    const formVals = validate.collectFormValues(myForm)
    console.log(formVals)
    handleCreateOrder({
        "name": formVals['姓名'],
        "tel": formVals['電話'],
        "email": formVals['Email'],
        "address": formVals['寄送地址'],
        "payment": formVals['交易方式']
    })
})


addFormEventListeners()
init();

//== functions ==============
function init() {
    reloadProducts();
    reloadCarts()
}

function handleCreateOrder(userInfo) {
    const loading = showLoading()
    apiCreateOrders(userInfo)
        .then(result => {
            console.log(result)
            if (!result.ok) {
                showError(result.msg);
            } else {
                renderCarts({})
                myForm.reset()
                showInfo(result.msg);
            }
        })
        .finally(() => {
            loading.close()
        })
}
function handleDeleteAllCart() {
    const loading = showLoading()
    apiDeleteAllCarts()
        .then(result => {
            if (!result.ok) {
                showError(result.msg);
            } else {
                renderCarts(result.data);
            }
        })
        .finally(() => {
            loading.close()
        })
}
function handleDeleteCart(cartId) {

    const loading = showLoading()
    apiDeleteCarts(cartId)
        .then(result => {
            if (!result.ok) {
                showError(result.msg);
            } else {
                renderCarts(result.data);
            }
        })
        .finally(() => {
            loading.close()
        })
}
function handleAddProduct(id) {
    // console.log(id);
    const loading = showLoading()
    apiCreateCarts(id)
        .then(result => {
            if (!result.ok) {
                showError(result.msg);
            } else {
                renderCarts(result.data);
            }
        })
        .finally(() => {
            loading.close()
        })
}

function reloadCarts() {
    const loading = showLoading()
    apiReadCarts()
        .then(function (result) {
            // console.log(result);
            if (!result.ok) {
                showError(result.msg);
            } else {
                renderCarts(result.data);
            }
        })
        .finally(() => {
            loading.close()
        })
}

function reloadProducts() {
    const loading = showLoading()

    apiReadProducts()
        .then(function (result) {
            // console.log(result);
            if (!result.ok) {
                showError(result.msg);
            } else {
                gProducts = result.data
                //
                renderProductSelect()
                // 
                renderFilteredProductWrap();
            }
        })
        .finally(() => {
            loading.close()
        })
}

// == render methods
function renderProductSelect() {

    const cats = gProducts.map(item => {
        return item.category
    })

    let uCats = cats.filter((item, idx) => {

        return cats.indexOf(item) === idx
    })
    console.log(uCats)

    str = `<option value="全部" selected>全部</option>`
    uCats.forEach(item => {
        str += `<option value="${item}">${item}</option>`
    })

    productSelect.innerHTML = str
}

function renderCarts(data) {
    // console.log(data)
    let str = `<tr>
    <th width="40%">品項</th>
    <th width="15%">單價</th>
    <th width="15%">數量</th>
    <th width="15%">金額</th>
    <th width="15%"></th>
</tr>`
    if (data.carts) {
        data.carts.forEach(item => {
            str += `<tr>
        <td>
            <div class="cardItem-title">
                <img src="${item.product.images}" alt="${item.product.title}">
                <p>${item.product.title}</p>
            </div>
        </td>
        <td>NT$${formatThousand(item.product.price)}</td>
        <td>${item.quantity}</td>
        <td>NT$${formatThousand(item.product.price * item.quantity)}</td>
        <td class="discardBtn">
            <a href="#" class="material-icons" data-id="${item.id}">
                clear
            </a>
        </td>
    </tr>`
        })
    }
    str += `<tr>
    <td>
        <a href="#" class="discardAllBtn">刪除所有品項</a>
    </td>
    <td></td>
    <td></td>
    <td>
        <p>總金額</p>
    </td>
    <td>NT$${formatThousand(data?.finalTotal)}</td>
</tr>`

    shoppingCartTbl.innerHTML = str
}
function renderFilteredProductWrap(filter = "全部") {
    const data =
        filter === "全部"
            ? gProducts
            : gProducts.filter((item) => item?.category === filter);

    let str = "";

    data.forEach((item) => {
        str += `<li class="productCard">
                <h4 class="productType">新品</h4>
                <img src="${item.images}" alt="${item.title}">
                <a href="#" class="addCardBtn" data-id="${item.id}" >加入購物車</a>
                <h3>${item.title}</h3>
                <del class="originPrice">NT$${formatThousand(
            item.origin_price
        )}</del>
                <p class="nowPrice">NT$${formatThousand(item.price)}</p>
            </li>`;
    });
    productWrap.innerHTML = str;
}

function formatThousand(num) {
    if (!num) { return "0" }
    const num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

function showInfo(message = "成功") {

    Swal.fire({
        icon: "success",
        title: "Great Job !!",
        text: message,
    });

}
function showError(message = "錯誤") {

    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
    });

}
function showLoading() {
    return Swal.fire({
        position: 'center',
        icon: 'info',
        title: '資料載入中',
        didOpen: () => {
            Swal.showLoading()
        }
    })

}

