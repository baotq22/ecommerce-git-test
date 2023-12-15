
$(document).ready(function () {

    let products = []
    currentPage = 1;
    itemPerPage = 8;
    perListItem = [];
    totalElements = 0;

    // call api to get all item
    // $.ajax("http://localhost:3000/products", {
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     method: "GET"
    // }).done(function (data) {
    //     products = [...data],
    //     displayProducts(products)
    //     renderPagination()
    // })

    $.ajax({
        url: 'http://localhost:3000/products',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            products = data;
            perListItem = products.slice(
                (currentPage - 1) * itemPerPage, (currentPage - 1) * itemPerPage + itemPerPage
            );
            // console.log(products);
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
            $('#pagination').append(`
                    <li onclick="changePage(${i})">${i}</li>
            `)
            if (currentPage == i) {
                $('#pagination li').removeClass('active');
                $('#pagination li').addClass('active');
            }
            $('#pagination li').not(`:nth-child(${currentPage})`).removeClass('active');
        }
    }
})



function displayProducts(perListItem) {
    console.log(perListItem);

    console.log("items00113", perListItem);
    console.log("items00333", perListItem);
    console.log("items002", perListItem);

    console.log("items002234", perListItem);
    console.log("regegdfgf", perListItem);
    console.log("items002rtyh", perListItem);

    console.log("items002e5y", perListItem);
    console.log("hfdhjffdkj", perListItem);
    console.log("items00267455", perListItem);

    console.log("itemsghgh0a02e5y", perListItem);
    console.log("itemsghgh0a02uy64", perListItem);
    console.log("itemsghgh0a0267455", perListItem);
    console.log("itemsghgh0a0267455", perListItem);
    console.log("itemsghgh0a0267455", perListItem);
    console.log("itemsghgh0a0267455", perListItem);
    console.log("itemsghgh0a0267455", perListItem);
    console.log("itemsghgh0a0267455", perListItem);

    const baseURL = "../assets/landing-page/"
    // make all item empty
    $("#products__list").empty();
    if (!perListItem.length) {
        // no items in json case
        $("#error__message").text("No data");
    } else {
        // at least 1 item in json
        for (let index = 0; index < perListItem.length; index++) {
            // display all item from json
            $("#products__list").append(`
                <div class="products__item">
                    <small class="products__sale">Portion pay ${perListItem[index].install}%</small>
                    <div class="products__img">
                        <a href="#" class="products__img">
                            <img src=${baseURL + perListItem[index].image} />
                        </a>
                    </div>
                    <p>
                        <a href="#" class="products__title">${perListItem[index].name}</a>
                    </p>
                    <p class="products__price">
                        <span>${perListItem[index].price} VND</span>
                        <span>-${perListItem[index].sale}% SALE</span>
                    </p>
                    <div class="products__rating">
                        <span>${perListItem[index].ratingStar}</span>
                        <span><i class="fa-solid fa-star" style="color: #f9c61f"></i></span>
                        <span>(${perListItem[index].quantity} sold)</span>
                    </div>
                </div>
            `)
        }
    }
}