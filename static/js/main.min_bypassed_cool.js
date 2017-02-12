function submitSearchForm() {
    var e = $("#query").val(),
        t = encodeURIComponent(e),
        n = $("#cat").val(),
        o = $("#search-form"),
        a = "";
    switch (n) {
        case "tpb":
            a = "https://thepiratebay.bypassed.cool/search/" + t + "/0/0/0";
            break;
        case "kickass":
            a = "https://kickass-cd.bypassed.cool/usearch/" + t + "/";
            break;
        case "yify":
            a = "https://yts-ag.bypassed.cool/browse-movies/" + t + "/all/all/0/latest";
            break;
        case "btscene":
            a = "http://www-btsone-cc.bypassed.cool/results_.php?q=" + t;
            break;
		case "katcr":
            a = "https://katcr-co.bypassed.cool/new/torrents-search.php?search=" + t;
            break;
        case "ET":
            a = "https://extratorrent-cc.bypassed.cool/search/?search=" + t;
            break;
        case "Torrentz":
            a = "https://torrentz.bypassed.cool/search?q=" + t;
            break;
        case "Zooqle":
            a = "https://zooqle-com.bypassed.cool/search?q=" + t;
            break;
        case "Rarbg":
            a = "https://rarbg.bypassed.cool/torrents.php?search=" + t;
            break;
        case "1337x":
            a = "https://1337x.bypassed.cool/search/" + t + "/1/";
            break;
        case "bitsnoop":
            a = "http://bitsnoop-com.bypassed.cool/search/all/" + t + "/c/d/1/"
    }
    return a && (_gaq.push(["_trackEvent", "Searchtorrents", n]), window.location.href = a), !1
}