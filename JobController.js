

$('.doc-container').on("click", "btn-edit", function (event) {
    $.get('-partialHTML.html', (html) => {
        $('.thingYourePuttingHtmlIn').html(html)
    })
})

$('.doc-container').on("click", "btn-table", function (event) {
    $.get('-partialHTML.html', (html) => {
        $('.thingYourePuttingHtmlIn').html(html)
    })
})

$('.doc-container').on("click", "btn-swipe", function (event) {
    $.get('-partialHTML.html', (html) => {
        $('.thingYourePuttingHtmlIn').html(html)
    })
})

$('.doc-container').on("click", ".btn-create", function (event) {
    $.get('-partialHTML.html', (html) => {
        $('.thingYourePuttingHtmlIn').html(html)
    })
})


