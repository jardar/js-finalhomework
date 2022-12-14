
const orderPageTable = document.querySelector(".orderPage-table")
orderPageTable.addEventListener("click", e => {
    e.preventDefault()

    if (e.target.dataset.paidId) {
        console.log('paid status=', e.target.dataset.paidId, e.target.dataset.paid)
        handleUpdatePaidState(e.target.dataset.paidId, !(e.target.dataset.paid === "true"))

    } else if (e.target.dataset.delId) {
        console.log('del id=', e.target.dataset.delId)
        handleDeleteOrder(e.target.dataset.delId)
    }

})
const discardAllBtn = document.querySelector(".discardAllBtn")
discardAllBtn.addEventListener("click", e => {
    e.preventDefault()
    console.log("discardAllBtn")
    handleDeleteAllOrders()
})

init()


function init() {
    // get orders then render
    reloadOrders()

}
function handleDeleteAllOrders() {
    const loading = showLoading()
    apiDeleteAllOrders()
        .then(result => {
            console.log(result)
            if (!result.ok) {
                showError(result.msg);
            } else {
                renderOrderTable(result.data)
                renderChart(result.data)
                showInfo(result.msg)
            }
        })
        .finally(() => {
            loading.close()
        })
}
function handleDeleteOrder(orderId) {
    const loading = showLoading()
    apiDeleteOrders(orderId)
        .then(result => {
            console.log(result)
            if (!result.ok) {
                showError(result.msg);
            } else {
                renderOrderTable(result.data)
                renderChart(result.data)
            }
        })
        .finally(() => {
            loading.close()
        })
}
function handleUpdatePaidState(orderId, paidOrNot) {
    const loading = showLoading()
    apiUpdateOrders(orderId, paidOrNot)
        .then(result => {
            console.log(result)
            if (!result.ok) {
                showError(result.msg);
            } else {
                renderOrderTable(result.data)
            }
        })
        .finally(() => {
            loading.close()
        })
}

function reloadOrders() {
    const loading = showLoading()
    apiReadOrders()
        .then(result => {
            console.log(result)
            if (!result.ok) {
                showError(result.msg);
            } else {
                renderOrderTable(result.data)
                renderChart(result.data)
            }
        })
        .finally(() => {
            loading.close()
        })
}
function renderChart(orders = []) {
    // ??????
    const total = {}
    orders.forEach(item => {
        item.products.forEach(prd => {
            if (!total[prd.title]) {
                total[prd.title] = 0
            }
            total[prd.title] += prd.quantity * prd.price
        })
    })
    // console.log(total)

    const rows = []
    Object.keys(total).forEach(item => {
        rows.push([item, total[item]])
    })
    // ???????????????????????????????????????    
    rows.sort((a, b) => {
        return b[1] - a[1]
    })
    console.log("sort=", rows)

    let sumOthers = 0
    for (let i = 3; i < rows.length; i++) {
        sumOthers += rows[i][1]
    }
    rows.splice(3)
    rows.push(["??????", sumOthers])

    // console.log(rows)
    c3.generate({
        bindto: '#chart', // HTML ????????????
        data: {
            type: "pie",
            columns: rows,
            colors: {
                // "??????": "#DACBFF",
                // "??????": "#9D7FEA",
                // "??????": "#5434A7",
                "??????": "#301E5F",
            }
        },
    });

}
function renderChartLV1(orders = []) {
    // ??????
    const total = {}
    orders.forEach(item => {
        item.products.forEach(prd => {
            if (!total[prd.category]) {
                total[prd.category] = 0
            }
            total[prd.category] += prd.quantity * prd.price
        })
    })
    // console.log(total)
    const rows = []
    Object.keys(total).forEach(item => {
        rows.push([item, total[item]])
    })
    // console.log(rows)
    c3.generate({
        bindto: '#chart', // HTML ????????????
        data: {
            type: "pie",
            columns: rows,
            colors: {
                "??????": "#DACBFF",
                "??????": "#9D7FEA",
                "??????": "#5434A7",
                "??????": "#301E5F",
            }
        },
    });

}

function renderOrderTable(orders = []) {
    let str = `<thead>
    <tr>
        <th>????????????</th>
        <th>?????????</th>
        <th>????????????</th>
        <th>????????????</th>
        <th>????????????</th>
        <th>????????????</th>
        <th>????????????</th>
        <th>??????</th>
    </tr>
</thead>`

    orders.forEach(item => {
        pTitles = ''
        item.products.forEach(item => {
            pTitles += `<p>${item.title} x${item.quantity}</p>`
        })

        str += `<tr>
        <td>${item.id}</td>
        <td>
            <p>${item.user.name}</p>
            <p>${item.user.tel}</p>
        </td>
        <td>${item.user.address}</td>
        <td>${item.user.email}</td>
        <td>            
            ${pTitles}
        </td>
        <td>${formatDate(item.createdAt)}</td>
        <td class="orderStatus">
            <a href="#" data-paid-id="${item.id}" data-paid="${item.paid}">${item.paid ? '?????????' : '?????????'}</a>
        </td>
        <td>
            <input type="button" class="delSingleOrder-Btn" value="??????" data-del-id="${item.id}">
        </td>
    </tr>`
    })

    orderPageTable.innerHTML = str

}



// == helpers
function formatDate(ts) {
    const someDay = new Date(ts * 1000);
    // someDay.setTime(ts);

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    return someDay.toLocaleString('zh-TW', { ...options, timeZone: 'Asia/Taipei' })
}

function showInfo(message = "??????") {

    Swal.fire({
        icon: "success",
        title: "Great Job !!",
        text: message,
    });

}
function showError(message = "??????") {

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
        title: '???????????????',
        didOpen: () => {
            Swal.showLoading()
        }
    })

}
