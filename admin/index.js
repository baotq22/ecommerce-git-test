$(document).ready(function () {
    // const $table = document.getElementsByTagName("tbody");
    let products = []
    let selProducts = null;
    currentPage = 1;
    itemPerPage = 5;
    perListItem = [];
    totalElements = 0;

    // $.ajax("http://localhost:3000/products", {
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     method: "GET"
    // }).done(function (data) {
    //     products = [...data]
    //     displayProducts(perListItem);
    // })

    $.ajax({
        url: "http://localhost:3000/products",
        method: "GET",
        headers: {
            "Content-type": "application/json"
        },
        dataType: "json",
        success: function (data) {
            products = data;
            perListItem = products.slice(
                (currentPage - 1) * itemPerPage, (currentPage - 1) * itemPerPage + itemPerPage
            );
            displayProducts(perListItem);
            renderPagination();
        },
        failed: function (error) {

        }
    })

    changePage = (index) => {
        currentPage = index;
        perListItem = products.slice(
            (currentPage - 1) * itemPerPage, (currentPage - 1) * itemPerPage + itemPerPage
        );
        displayProducts(perListItem);
        renderPagination();
    }

    renderPagination = () => {
        $("#pagination").empty();
        totalElements = Math.ceil(products.length / itemPerPage);
        for (let i = 1; i <= totalElements; i++) {
            $("#pagination").append(`
                <li onclick="changePage(${i})">${i}</li>
            `)
            if (currentPage == i) {
                $('#pagination li').removeClass('active');
                $('#pagination li').addClass('active');
            }
            $('#pagination li').not(`:nth-child(${currentPage})`).removeClass('active');
        }
    }

    $("#btn-search").on("click", function (event) {
        event.preventDefault();
        const keyword = products.filter((product) =>
            product.name
                .toLowerCase().includes($("#input-search").val().trim().toLowerCase())
        )
        displayProducts(keyword);
    })

    $("#btn-add-new").on("click", function (event) {
        openPopUp();
    })

    $("#btn-closes").on("click", function (event) {
        event.preventDefault();
        closePopUp();
        emptyError();
        emptyFill();
    })

    $("#btn-no").on("click", function (event) {
        event.preventDefault();
        deletePopupClose();
    })

    $("#modal").on("click", function (event) {
        // console.log("nhiễu");
        // console.log(this);
        if (event.target === this) {
            closePopUp();
            emptyError();
            emptyFill();
        }
    })

    $("#productImage").on("change", function (event) {
        $("#product-image").text(this.files[0].name)

    })

    $("#popup__close").on("click", function (event) {
        // console.log("nhiễu");
        // console.log(this);
        if (event.target === this) {
            deletePopupClose();
        }
    })

    $("#btn-reset").on("click", function (event) {
        event.preventDefault();
        emptyFill();
    })

    $("#productName").keydown(function () {
        $("#name-error").empty();
    })
    $("#productPrice").keydown(function () {
        $("#price-error").empty();
    })
    $("#productRate").keydown(function () {
        $("#rate-error").empty();
    })
    $("#productQuantity").keydown(function () {
        $("#sold-error").empty();
    })
    $("#productInstall").change(function () {
        $("#install-error").empty();
    })
    $("#productImage").keydown(function () {
        $("#image-error").empty();
    })

    $("#btn-submit-form").on("click", function (event) {
        event.preventDefault();
        const name = $("#productName").val();
        const price = $("#productPrice").val();
        const ratingStar = $("#productRate").val();
        const quantity = $("#productQuantity").val();
        const sale = $("#productSale option:selected").val();
        const install = $("#productInstall option:selected").val();
        const image = $("#product-image").text();

        if (!name.trim().length) {
            $("#name-error").text("  Please fill Product Name")
        }
        if (!price.trim().length) {
            $("#price-error").text("  Please fill Product Price")
        }
        if (!ratingStar.trim().length) {
            $("#rate-error").text("  Please fill Product Rate")
        }
        if (ratingStar > 5) {
            $("#rate-error").text("  Only accepted lower or same 5")
        }
        if (!quantity.trim().length) {
            $("#sold-error").text("  Please fill Product Sold Quantity")
        }
        if (!install.trim().length) {
            $("#install-error").text("  Please select Product Special")
        }
        if (!image.length) {
            $("#image-error").text("  Please select an image")
        }
        if (name.trim().length &&
            price.trim().length &&
            ratingStar.trim().length &&
            ratingStar <= 5 &&
            quantity.trim().length &&
            install.trim().length &&
            image.trim().length
        ) {
            if (!selProducts) {

                // lay du lieu tu api: GET
                // tao du lieu moi: POST
                // sua du lieu: PUT
                // xoa du lieu: DELETE

                const product = {
                    name: name,
                    price: price,
                    ratingStar: ratingStar,
                    quantity: quantity,
                    sale: sale,
                    install: install,
                    image: image
                }

                $.ajax("http://localhost:3000/products", {
                    headers: {
                        "Content-type": "application/json"
                    },
                    method: "POST",
                    data: JSON.stringify(product),
                })

                emptyError();
                emptyFill();

                closePopUp();
            } else {

                const product = {
                    name: $("#productName").val(),
                    price: $("#productPrice").val(),
                    ratingStar: $("#productRate").val(),
                    quantity: $("#productQuantity").val(),
                    sale: $("#productSale").val(),
                    install: $("#productInstall").val(),
                    image: $("#product-image").text()
                }

                $.ajax(`http://localhost:3000/products/${String(selProducts.id)}`, {
                    headers: {
                        "Content-type": "application/json"
                    },
                    method: "PUT",
                    data: JSON.stringify(product)
                })


                emptyError();

                closePopUp();
            }
        }
    })

    $("#display").on("click", "#btn-delete", function () {
        // products
        // 1. phải biết là đanq chọn product nào để xóa
        // 2. lấy ra id của product vừa chọn
        // 3. lặp qua lít products để tìm ra product nào có id = id  của product chuẩn bị xóa
        // 4. xóa product có id tương ứng
        console.log(products);
        const selectedRow = this.parentElement.parentElement;
        // console.dir(selectedRow);
        selProducts = products.find(
            (product) => String(product.id) === String(selectedRow.children[0].textContent)
        )
        console.log("selProducts", selProducts);
        deletePopupOpen();

        $("#btn-yes").on("click", function (event) {


            console.log(selProducts);

            $.ajax(`http://localhost:3000/products/${String(selProducts.id)}`, {
                headers: {
                    "Content-type": "application/json"
                },
                method: "DELETE"
            })

            deletePopupClose();
        })
    })

    $("#display").on("click", "#btn-update", function () {
        $("#modal__heading").text("Update present product");
        $("#btn-submit-form").text("Update");

        openPopUp();
        const selectedRow = this.parentElement.parentElement;
        selProducts = products.find(
            (product) => String(product.id) === String(selectedRow.children[0].textContent)
        )
        // console.log(selProducts);

        $("input#productName").val(selProducts.name);
        $("input#productPrice").val(selProducts.price);
        $("#productRate").val(selProducts.ratingStar);
        $("#productQuantity").val(selProducts.quantity);
        $("#productSale").val(selProducts.sale);
        $("#productInstall").val(selProducts.install);
        $("#product-image").text(selProducts.image);
    })


})

function emptyFill() {
    $("#productName").val("");
    $("#productPrice").val("");
    $("#productRate").val("");
    $("#productQuantity").val("");
    $("#productSale option:selected").val("7.5");
    $("#productInstall option:selected").val("");
    $("#product-image").empty();
}

function emptyError() {
    $("#name-error").empty();
    $("#price-error").empty();
    $("#rate-error").empty();
    $("#sold-error").empty();
    $("#install-error").empty();
    $("#image-error").empty();
}

function openPopUp() {
    $("#modal").addClass("active");
}

function closePopUp() {
    $("#modal").removeClass("active");
    $("#modal__heading").text("Add new products");
    $("#btn-submit-form").text("Add");
    emptyFill();
}

function deletePopupOpen() {
    $("#popup__close").addClass("active");
}

function deletePopupClose() {
    $("#popup__close").removeClass("active");
}

function displayProducts(perListItem, products) {
    console.log(perListItem);
    $("#display").empty();
    if (!perListItem.length) {
        $("#display").append(`
            <tr>
                <td colspan="10">No Data</td>
            </tr>
        `)
    } else {
        for (let index = 0; index < perListItem.length; index++) {
            

            // let totalOdd;
            // totalOdd += oddID;

            // console.log(totalOdd);

            $("#display").append(`
                <tr>
                    <td>${perListItem[index].id}</td>
                    <td>${perListItem[index].name}</td>
                    <td>${perListItem[index].price}</td>
                    <td>${perListItem[index].ratingStar}</td>
                    <td>${perListItem[index].quantity}</td>
                    <td>${perListItem[index].sale}</td>
                    <td>${perListItem[index].install}</td>
                    <td>${perListItem[index].image}</td>
                    <td>
                        <button class="btn" id="btn-update">Update</button>
                    </td>
                    <td>
                        <button class="btn" id="btn-delete">Delete</button>
                    </td>
                </tr>
            `)
        }
        console.log(totalID);
    }
}