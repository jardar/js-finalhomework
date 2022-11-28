const myForm = document.querySelector(".orderInfo-form")
const allAlertMsg = document.querySelectorAll("[data-message]")

// https://medium.com/@koten0224/regex-%E5%A6%82%E4%BD%95%E6%AA%A2%E6%9F%A5%E9%9B%BB%E8%A9%B1%E8%99%9F%E7%A2%BC-5bacf88eae8d
var telPattern = /(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}|09\d{2}(\d{6}|-\d{3}-\d{3})/;

const constrains = {
    姓名: {
        presence: {
            message: "^必填"
        }
    },
    電話: {
        presence: {
            message: "^必填"
        },
        format: {
            pattern: telPattern,
            message: "格式為 (02)1234567 或 0988123456"
        }
    },
    Email: {
        presence: {
            message: "^必填"
        },
        email: {
            message: "^不合法電子郵件格式"
        }
    },
    寄送地址: {
        presence: {
            message: "^必填"
        },
    },
};

function addFormEventListeners() {
    // const inputs = document.querySelectorAll("input[type=text],input[type=tel],input[type=email],input[type=tel]");
    const inputs = document.querySelectorAll("input[name]");
    inputs.forEach(item => {
        item.addEventListener("blur", handleFormValidation)
    })
}
function handleFormValidation(e) {
    e.preventDefault()
    validateAndRender()
}
// use data-*
function validateAndRender() {
    const errMsgs = validate(myForm, constrains) || {};
    // console.log(errMsgs)

    allAlertMsg.forEach(item => {
        item.textContent = errMsgs[item.dataset.message]
    })
}

function validateAndRenderV0(target) {
    const errMsgs = validate(myForm, constrains);
    // console.log(errMsgs)
    if (!errMsgs) {
        target.nextElementSibling.textContent = ''
        return
    }

    // console.log(target.nextElementSibling)
    target.nextElementSibling.textContent = errMsgs[target.getAttribute("name")]
}
function validateAll() {
    const errMsgs = validate(myForm, constrains);
    // console.log(errMsgs)

    return !errMsgs
}