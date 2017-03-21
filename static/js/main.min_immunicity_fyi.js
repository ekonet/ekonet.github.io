function submitSearchForm() {
    var e = $("#query").val(),
        t = encodeURIComponent(e),
        n = $("#cat").val(),
        o = $("#search-form"),
        a = "";
    switch (n) {
        case "tpb":
            a = "https://thepiratebay.immunicity.fyi/search/" + t + "/0/0/0";
            break;
        case "kickass":
            a = "https://kickass-cd.immunicity.fyi/usearch/" + t + "/";
            break;
        case "yify":
            a = "https://yts-ag.immunicity.fyi/browse-movies/" + t + "/all/all/0/latest";
            break;
        case "btscene":
            a = "http://www-btsone-cc.immunicity.fyi/results_.php?q=" + t;
            break;
		case "katcr":
            a = "https://katcr-co.immunicity.fyi/new/torrents-search.php?search=" + t;
            break;
        case "ET":
            a = "https://extratorrent-cc.immunicity.fyi/search/?search=" + t;
            break;
        case "Torrentz":
            a = "https://torrentz.immunicity.fyi/search?q=" + t;
            break;
        case "Zooqle":
            a = "https://zooqle-com.immunicity.fyi/search?q=" + t;
            break;
        case "Rarbg":
            a = "https://rarbg.immunicity.fyi/torrents.php?search=" + t;
            break;
        case "1337x":
            a = "https://1337x.immunicity.fyi/search/" + t + "/1/";
            break;
        case "bitsnoop":
            a = "http://bitsnoop-com.immunicity.fyi/search/all/" + t + "/c/d/1/"
    }
    return a && (_gaq.push(["_trackEvent", "Searchtorrents", n]), window.location.href = a), !1
}