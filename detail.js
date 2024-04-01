$(document).ready(function(){
    if(location.search.substr(1).indexOf('_escaped_fragment_')){
        var ctsr = 20;
        var data2 = decodeURI(location.search.substr(ctsr));
    }else{
        var ctsr = 2;
        var data2 = decodeURI(location.hash.substr(ctsr));
    }
    $.ajax({
        type: "GET",
        url: "https://smn.glitch.me/orgdb-relay.php",
        data: { orgid: data2 }
    })
        .done(function (data) {
            document.getElementById("lb").style.display="none";
            var resultDiv = document.getElementById("result");
            console.log(data);
            if (data.length === 0) {
                resultDiv.innerHTML = "一致する団体が見つかりませんでした。";
            } else {

                var resultDiv = document.getElementById("result");

                data.forEach(function (item) {

                    var listItem = document.createElement("div");
                    var hed = document.head;
                    document.getElementById("kaniwiki").innerHTML=item.meisho+"("+item.meishokatakana+")の組織情報の詳細、組織番号は"+item.orgid+"で、現在の所在地は"+item.region+"である。";
                    var description1 = document.createElement("meta");
                    description1.setAttribute("name","description");
                    description1.setAttribute("content",item.meisho+"("+item.meishokatakana+")の組織情報の詳細を見る 組織番号は"+item.orgid+"で、現在の所在地は"+item.region+"である。");
                    hed.appendChild(description1);
                    listItem.innerHTML = "<table><tr><td>組織番号</td><td><span style='color:orange;font-size:18px;'>" + item.orgid + "</span></td></tr>" +
                        "<tr><td>名称のカタカナ表記</td><td>" + item.meishokatakana + "<br></td></tr><tr><td>名称</td><td><span style='font-size:21px;'>" +
                        item.meisho + "</span></td></tr><tr><td>活動地域</td><td>" +
                        item.region + "</td></tr><tr><td>最終更新日</td><td>" +
                        item.lastupdate + "</td></tr>" + "</table>"
                    resultDiv.appendChild(listItem);
                    document.title = item.meisho + "の情報 DanJou(ダンジョウ)団体情報検索";
                    document.getElementById("titls").innerHTML = item.meisho + "の情報";
                    document.getElementById("lsta").innerHTML = "登録の変更/作成履歴<br><br>" + item.history;
                });

            }

        })
        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("読み込めませんでした、vpnや広告ブロッカーなどでブロックされていないかご確認ください。", XMLHttpRequest, textStatus, errorThrown);
        });
    });
