setTimeout(function () {
    let request = new XMLHttpRequest();
    let urlParam = location.search;
    let phone2 = document.querySelector('meta[name="phone2"]') ? document.querySelector('meta[name="phone2"]').getAttribute('content') : null;

    let pixelId = null;
    urlParam = urlParam.split('&');
    for (let i = 0; i < urlParam.length; i++) {
        if (urlParam[i].search(/pixel_id/) > -1 && pixelId === null) {
            pixelId = urlParam[i].split('=')[1]
        }
        if (urlParam[i].search(/phone2/) > -1 && phone2 === null) {
            phone2 = urlParam[i].split('=')[1]
        }
    }
    let url = "https://starlab-app.io/api/statusLead?phone=" + phone2;
    request.open('GET', url);
    request.addEventListener("readystatechange", () => {
        console.log(request.responseText);
        if (request.responseText === "{\"success\":\"false\"}") {
        } else if (request.responseText === "{\"success\":\"true\"}") {
            document.querySelector(".completeReg").setAttribute("src", `https://www.facebook.com/tr?id=${pixelId}&ev=CompleteRegistration&noscript=1`);
        }
    });
    request.send();
}, 1000);
