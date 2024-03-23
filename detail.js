var kensuu = 0;
$.ajax({
    type: "GET",
    url: "https://script.google.com/macros/s/AKfycbw7LGlAZx6yYTf37wRM7HoMRMayOalEQcb3razeqBhKAW18vBsPIwe3_eH7BlkeMs24/exec",
    data: { key: decodeURI(location.search.substr(5)) },
})
    .done(function (data) {
        var resultDiv = document.getElementById("result");
        console.log(data);
        if (data.length === 0) {
            resultDiv.innerHTML = "一致する団体が見つかりませんでした。<hr>HINT ヒント<br>もしかしたら、名称のみで都道府県を指定しない。もしくはその逆でやってみてください。<br>読み方で検索する場合は完全にわからない場合、カタカナでわかる途中までを入力してみてください。";
            document.getElementById("resultl").style.display = "none";
        } else {

            var resultDiv = document.getElementById("result");
            data.forEach(function (item) {
                kensuu++;
                var listItem = document.createElement("div");
                listItem.innerHTML = "<a style='color:#000;' href='details?_escaped_fragment_=" + item.orgid + "'>組織番号:" + item.orgid + "<br>" +
                    item.meishokatakana + "<br><span style='font-size:21px;'>" +
                    item.meisho + "</span><br>" +
                    item.region + "<br><hr></a>"
                resultDiv.appendChild(listItem);
            });
            var dispken = document.createElement("p");
            resultDiv.appendChild(dispken);
            dispken.innerHTML = "<center>件数:<span style='font-size:20px;font-weight:bold;'>" + kensuu + "</span>件</center>";
            document.getElementById("resultl").style.display = "none";
        }

    })
    .fail(function (XMLHttpRequest, textStatus, errorThrown) {
        alert("読み込めませんでした", XMLHttpRequest, textStatus, errorThrown);
    });