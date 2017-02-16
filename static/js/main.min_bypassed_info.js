function submitSearchForm() {
    var e = $("#query").val(),
        t = encodeURIComponent(e),
        n = $("#cat").val(),
        o = $("#search-form"),
        a = "";
    switch (n) {
        case "tpb":
            a = "https://thepiratebay.bypassed.info/search/" + t + "/0/0/0";
            break;
        case "kickass":
            a = "https://kickass-cd.bypassed.info/usearch/" + t + "/";
            break;
        case "yify":
            a = "https://yts-ag.bypassed.info/browse-movies/" + t + "/all/all/0/latest";
            break;
        case "btscene":
            a = "http://www-btsone-cc.bypassed.info/results_.php?q=" + t;
            break;
		case "katcr":
            a = "https://katcr-co.bypassed.info/new/torrents-search.php?search=" + t;
            break;
        case "ET":
            a = "https://extratorrent-cc.bypassed.info/search/?search=" + t;
            break;
        case "Torrentz":
            a = "https://torrentz.bypassed.info/search?q=" + t;
            break;
        case "Zooqle":
            a = "https://zooqle-com.bypassed.info/search?q=" + t;
            break;
        case "Rarbg":
            a = "https://rarbg.bypassed.info/torrents.php?search=" + t;
            break;
        case "1337x":
            a = "https://1337x.bypassed.info/search/" + t + "/1/";
            break;
        case "bitsnoop":
            a = "http://bitsnoop-com.bypassed.info/search/all/" + t + "/c/d/1/"
    }
    return a && (_gaq.push(["_trackEvent", "Searchtorrents", n]), window.location.href = a), !1
}