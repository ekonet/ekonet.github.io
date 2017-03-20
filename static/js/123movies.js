/**
 * @param {string} node
 * @param {number} dataAndEvents
 * @param {string} callback
 * @return {undefined}
 */
function favorite(node, dataAndEvents, callback) {
  if (is_login) {
    if ("undefined" == typeof callback) {
      /** @type {string} */
      callback = "add";
    }
    $(".btn-favorite-" + node).prop("disabled", true);
    $(".bp-btn-like").prop("disabled", true);
    $.ajax({
      url : base_url + "ajax/user_favorite",
      method : "POST",
      data : {
        movie_id : node,
        action : callback
      },
      dataType : "json",
      /**
       * @param {Object} response
       * @return {undefined}
       */
      success : function(response) {
        $(".btn-favorite-" + node).removeAttr("disabled");
        $(".bp-btn-like").removeAttr("disabled");
        if (1 == response.status) {
          if (1 == dataAndEvents) {
            $("#message-content").html(response.message);
            $("#pop-alert").modal("show");
            if ("user" == window.location.pathname.split("/")[1]) {
              $("[data-movie-id=" + node + "]").addClass("ml-item-remove");
            }
          } else {
            $("#favorite-alert").show();
            $("#favorite-message").html(response.message);
            setTimeout(function() {
              $("#favorite-alert").hide();
            }, 5E3);
            $("#button-favorite").html(response.content);
            $(".popover-like").hide();
          }
        }
      }
    });
  } else {
    $("#pop-login").modal("show");
  }
}
/**
 * @param {string} loc
 * @return {undefined}
 */
function goRequestPage(loc) {
  if (is_login) {
    /** @type {string} */
    window.location.href = loc;
  } else {
    $("#pop-login").modal("show");
  }
}
/**
 * @return {undefined}
 */
function clearNotify() {
  var here = confirm("Are you sure delete all notify?");
  if (here) {
    $.ajax({
      url : base_url + "ajax/user_clear_notify",
      method : "POST",
      dataType : "json",
      /**
       * @param {Object} jqXHR
       * @return {undefined}
       */
      success : function(jqXHR) {
        if (1 == jqXHR.status) {
          window.location.reload();
        }
      }
    });
  }
}
/**
 * @return {undefined}
 */
function loadNotify() {
  if (0 == $("#list-notify .notify-item").length) {
    $.ajax({
      url : base_url + "ajax/user_load_notify",
      type : "GET",
      dataType : "json",
      /**
       * @param {Object} data
       * @return {undefined}
       */
      success : function(data) {
        if (1 == data.status) {
          $("#notify-loading").remove();
          $("#list-notify").html(data.html);
          if (data.notify_unread > 0) {
            $(".feed-number").text(data.notify_unread);
          } else {
            $(".feed-number").text("");
          }
        }
      }
    });
  }
}
/**
 * @param {string} i
 * @return {undefined}
 */
function ajaxContentBox(i) {
  if ($("div#" + i + " #content-box").is(":empty")) {
    $.ajax({
      url : base_url + "ajax/get_content_box/" + i,
      type : "GET",
      dataType : "json",
      /**
       * @param {Object} data
       * @return {undefined}
       */
      success : function(data) {
        switch(data.type) {
          case "topview-today":
            $("#topview-today #content-box").html(data.content);
            break;
          case "top-favorite":
            $("#top-favorite #content-box").html(data.content);
            break;
          case "top-rating":
            $("#top-rating #content-box").html(data.content);
            break;
          case "top-imdb":
            $("#top-imdb #content-box").html(data.content);
        }
      }
    });
  }
}
/**
 * @param {string} name
 * @return {undefined}
 */
function updateMovieView(name) {
  if (!$.cookie("view-" + name)) {
    $.ajax({
      url : base_url + "ajax/movie_update_view",
      type : "POST",
      dataType : "json",
      data : {
        id : name
      },
      /**
       * @param {?} textStatus
       * @return {undefined}
       */
      success : function(textStatus) {
        /** @type {Date} */
        var date = new Date;
        /** @type {number} */
        var d = 2;
        date.setTime(date.getTime() + 60 * d * 1E3);
        $.cookie("view-" + name, true, {
          expires : date,
          path : "/"
        });
      }
    });
  }
}
/**
 * @param {Array} email
 * @return {?}
 */
function validateEmail(email) {
  /** @type {RegExp} */
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return email.length > 0 && emailRegex.test(email);
}
/**
 * @return {undefined}
 */
function subscribe() {
  if (!$.cookie("subscribed")) {
    $("#error-email-subs").hide();
    var email = $("input[name=email]").val();
    if ("" == email.trim()) {
      $("#error-email-subs").text("Please enter your email.");
      $("#error-email-subs").show();
    } else {
      if (validateEmail(email)) {
        $("#subscribe-submit").prop("disabled", true);
        $("#subscribe-loading").show();
        $.ajax({
          url : base_url + "site/subscribe",
          type : "POST",
          dataType : "json",
          data : {
            email : email
          },
          /**
           * @param {Object} jqXHR
           * @return {undefined}
           */
          success : function(jqXHR) {
            if (1 == jqXHR.status) {
              $("#pop-subc").modal("hide");
              $.cookie("subscribed", 1, {
                expires : 365,
                path : "/"
              });
              $.cookie("subscribe", 1, {
                expires : 365,
                path : "/"
              });
            }
            $("#subscribe-loading").hide();
            $("#subscribe-submit").removeAttr("disabled");
          }
        });
      } else {
        $("#error-email-subs").text("Please enter a valid email.");
        $("#error-email-subs").show();
      }
    }
  }
}
/**
 * @return {undefined}
 */
function subscribe_home() {
  if (!$.cookie("subscribed")) {
    $("#error-email-subs").hide();
    $("#success-subs").hide();
    var email = $("input[name=email-home]").val();
    if ("" == email.trim()) {
      $("#error-email-subs").text("Please enter your email.");
      $("#error-email-subs").show();
    } else {
      if (validateEmail(email)) {
        $("#subscribe-submit-home").prop("disabled", true);
        $.ajax({
          url : base_url + "site/subscribe",
          type : "POST",
          dataType : "json",
          data : {
            email : email
          },
          /**
           * @param {Object} jqXHR
           * @return {undefined}
           */
          success : function(jqXHR) {
            if (1 == jqXHR.status) {
              $("#success-subs").text("Thank you for subscribing!");
              $("#success-subs").show();
              $.cookie("subscribed", 1, {
                expires : 365,
                path : "/"
              });
              $.cookie("subscribe", 1, {
                expires : 365,
                path : "/"
              });
            } else {
              $("#error-email-subs").text("Subscribe failed.");
              $("#error-email-subs").show();
            }
            $("#subscribe-submit-home").removeAttr("disabled");
          }
        });
      } else {
        $("#error-email-subs").text("Please enter a valid email.");
        $("#error-email-subs").show();
      }
    }
  }
}
/**
 * @return {undefined}
 */
function subscribe_footer() {
  if (!$.cookie("subscribed")) {
    $("#error-email-subs-footer").hide();
    $("#success-subs-footer").hide();
    var email = $("input[name=email-footer]").val();
    if ("" == email.trim()) {
      $("#error-email-subs-footer").text("Please enter your email.");
      $("#error-email-subs-footer").show();
    } else {
      if (validateEmail(email)) {
        $("#subscribe-submit-footer").prop("disabled", true);
        $.ajax({
          url : base_url + "site/subscribe",
          type : "POST",
          dataType : "json",
          data : {
            email : email
          },
          /**
           * @param {Object} jqXHR
           * @return {undefined}
           */
          success : function(jqXHR) {
            if (1 == jqXHR.status) {
              $("#success-subs-footer").text("Thank you for subscribing!");
              $("#success-subs-footer").show();
              $.cookie("subscribed", 1, {
                expires : 365,
                path : "/"
              });
              $.cookie("subscribe", 1, {
                expires : 365,
                path : "/"
              });
            } else {
              $("#error-email-subs-footer").text("Subscribe failed.");
              $("#error-email-subs-footer").show();
            }
            $("#subscribe-submit-footer").removeAttr("disabled");
          }
        });
      } else {
        $("#error-email-subs-footer").text("Please enter a valid email.");
        $("#error-email-subs-footer").show();
      }
    }
  }
}
/**
 * @return {?}
 */
function isCookieEnabled() {
  /** @type {boolean} */
  var testcookie = !!navigator.cookieEnabled;
  return "undefined" != typeof navigator.cookieEnabled || (testcookie || (document.cookie = "testcookie", testcookie = document.cookie.indexOf("testcookie") != -1)), testcookie;
}
/**
 * @return {undefined}
 */
function searchMovie() {
  var hash = $("input[name=keyword]").val();
  if ("" !== hash.trim()) {
    hash = hash.replace(/(<([^>]+)>)/gi, "").replace(/[`~!@#$%^&*()_|\=?;:'",.<>\{\}\[\]\\\/]/gi, "");
    hash = hash.split(" ").join("+");
    window.location.href = base_url + "movie/search/" + hash;
  }
}
/** @type {Array} */
var domains = ["123movies.to", "123movies.is", "123movies.ru", "123movies.unblockmy.stream", "123movies.cz", "123movies.gs", "123movies.vc", "123-movie.ru", "123movies.cloud", "123movies.moscow", "123movies.msk.ru", "123movies.net.ru", "123movies.pp.ru", "123movie.tech", "123movie.space", "123data.ru", "123movies.center", "123movies.group", "123moviesbackup.ru", "123moviesvip.ru", "123movieshd.to", "123movieshd.is", "f9movies.com", "365movies.net", "123movies.dev", "123movies.local", 
"web1.123movies.is", "web2.123movies.is", "web3.123movies.is", "web4.123movies.is", "web5.123movies.is", "web1.123movies.to", "web2.123movies.to", "web3.123movies.to", "web4.123movies.to", "web5.123movies.to"];
if (domains.indexOf(document.domain) < 0) {
  /** @type {string} */
  window.location.href = "https://123movies.unblockmy.stream" + window.location.pathname;
}
/** @type {string} */
var base_url = "//" + document.domain + "/";
if (!$.cookie("user_geo")) {
  $.getJSON("//" + document.domain + "/site/user_geo", function(fmt) {
    if ("GB" == fmt.country || ("US" == fmt.country || ("AUS" == fmt.country || "CA" == fmt.country))) {
      $.cookie("user_geo", 1, {
        expires : 1
      });
    } else {
      $.cookie("user_geo", 1, {
        expires : 1
      });
    }
    console.log(fmt);
  });
}
/** @type {boolean} */
var is_login = false;
/** @type {string} */
var s7euu24fblrg914z = "x6a4moj7q8xq6dk5";
$(document).ready(function() {
  /**
   * @return {undefined}
   */
  function handler() {
    $(this).find(".sub-container").css("display", "block");
  }
  /**
   * @return {undefined}
   */
  function resize() {
    $(this).find(".sub-container").css("display", "none");
  }
  $.ajax({
    url : base_url + "ajax/load_login_status",
    type : "GET",
    dataType : "json",
    /**
     * @param {?} data
     * @return {undefined}
     */
    success : function(data) {
      $("#top-user").html(data.content);
      if (1 == data.is_login) {
        /** @type {boolean} */
        is_login = true;
      }
    }
  });
  $("#search a.box-title").click(function(dataAndEvents) {
    $("#search .box").toggleClass("active");
  });
  $(".mobile-menu").click(function(dataAndEvents) {
    $("#menu,.mobile-menu").toggleClass("active");
    $("#search, .mobile-search").removeClass("active");
  });
  $(".mobile-search").click(function(dataAndEvents) {
    $("#search,.mobile-search").toggleClass("active");
    $("#menu, .mobile-menu").removeClass("active");
  });
  $(".filter-toggle").click(function(dataAndEvents) {
    $("#filter").toggleClass("active");
    $(".filter-toggle").toggleClass("active");
  });
  $(".bp-btn-light").click(function(dataAndEvents) {
    $(".bp-btn-light, #overlay, #media-player, #content-embed, #comment-area").toggleClass("active");
  });
  $("#overlay").click(function(dataAndEvents) {
    $(".bp-btn-light, #overlay, #media-player, #content-embed, #comment-area").removeClass("active");
  });
  $(".bp-btn-auto").click(function(dataAndEvents) {
    $(".bp-btn-auto").toggleClass("active");
  });
  $("#toggle, .cac-close").click(function(dataAndEvents) {
    $("#comment").toggleClass("active");
  });
  $(".top-menu> li").bind("mouseover", handler);
  $(".top-menu> li").bind("mouseout", resize);
  /** @type {number} */
  var c = 0;
  $(window).on("scroll", function() {
    if ($(window).scrollTop() < c) {
      if ("fixed" != $("header").css("position")) {
        $("header").css({
          position : "fixed",
          top : -$("header").outerHeight(),
          backgroundColor : "#fff"
        });
        $("header").animate({
          top : "0px"
        }, 500);
        $("#main").css("padding-top", $("header").outerHeight());
      }
    } else {
      $("header").css({
        position : "relative",
        top : "0px"
      });
      $("#main").css("padding-top", "0px");
    }
    c = $(window).scrollTop();
  });
  $(function() {
    /**
     * @return {undefined}
     */
    function show() {
      var $content = $(this);
      var slide_content = $content.find(".modal-dialog");
      $content.css("display", "block");
      slide_content.css("margin-top", Math.max(0, ($(window).height() - slide_content.height()) / 2));
    }
    $(".modal").on("show.bs.modal", show);
    $(window).on("resize", function() {
      $(".modal:visible").each(show);
    });
  });
  /** @type {boolean} */
  var d = true;
  $(".search-suggest").mouseover(function() {
    /** @type {boolean} */
    d = false;
  });
  $(".search-suggest").mouseout(function() {
    /** @type {boolean} */
    d = true;
  });
  $("input[name=keyword]").keyup(function() {
    var password = $(this).val();
    var token = md5(password + s7euu24fblrg914z);
    if (password.trim().length > 2) {
      $.ajax({
        url : base_url + "ajax/suggest_search",
        type : "POST",
        dataType : "json",
        data : {
          keyword : password,
          token : token
        },
        /**
         * @param {?} data
         * @return {undefined}
         */
        success : function(data) {
          $(".search-suggest").html(data.content);
          if ("" !== data.content.trim()) {
            $(".search-suggest").show();
          } else {
            $(".search-suggest").hide();
          }
        }
      });
    } else {
      $(".search-suggest").hide();
    }
  });
  $("input[name=keyword]").blur(function() {
    if (d) {
      $(".search-suggest").hide();
    }
  });
  $("input[name=keyword]").focus(function() {
    if ("" !== $(".search-suggest").html()) {
      $(".search-suggest").show();
    }
  });
  $("input[name=keyword]").keypress(function(event) {
    if (13 == event.which) {
      searchMovie();
    }
  });
  $("#login-form").submit(function(types) {
    $("#login-submit").prop("disabled", true);
    $("#login-loading").show();
    var task = $(this).serializeArray();
    var action = $(this).attr("action");
    $.ajax({
      url : action,
      type : "POST",
      data : task,
      dataType : "json",
      /**
       * @param {Object} result
       * @return {undefined}
       */
      success : function(result) {
        if (0 == result.status) {
          $("#error-message").show();
          $("#error-message").text(result.message);
          $("#login-submit").removeAttr("disabled");
          $("#login-loading").hide();
        }
        if (1 == result.status) {
          window.location.reload();
        }
      }
    });
    types.preventDefault();
  });
  $("#register-form").submit(function(types) {
    var plainPass = $("#username").val();
    var hash = md5(plainPass + s7euu24fblrg914z);
    $("#register-submit").prop("disabled", true);
    $("#register-loading").show();
    var sorted = $(this).serializeArray();
    sorted.push({
      name : "token",
      value : hash
    });
    var action = $(this).attr("action");
    $.ajax({
      url : action,
      type : "POST",
      data : sorted,
      dataType : "json",
      /**
       * @param {Object} result
       * @return {undefined}
       */
      success : function(result) {
        if ($(".error-block").hide(), 0 == result.status) {
          var key;
          for (key in result.messages) {
            $("#error-" + key).show();
            $("#error-" + key).text(result.messages[key]);
          }
          $("#register-submit").removeAttr("disabled");
          $("#register-loading").hide();
          grecaptcha.reset();
        }
        if (1 == result.status) {
          window.location.reload();
        }
      }
    });
    types.preventDefault();
  });
  $("#forgot-form").submit(function(types) {
    $("#forgot-submit").prop("disabled", true);
    $("#forgot-loading").show();
    var task = $(this).serializeArray();
    $.ajax({
      url : base_url + "user/forgotPassword",
      type : "POST",
      data : task,
      dataType : "json",
      /**
       * @param {Object} result
       * @return {undefined}
       */
      success : function(result) {
        if (0 == result.status) {
          $("#forgot-error-message").show();
          $("#forgot-error-message").text(result.message);
        }
        if (1 == result.status) {
          $("#forgot-success-message").show();
          $("#forgot-success-message").text(result.message);
        }
        $("#forgot-submit").removeAttr("disabled");
        $("#forgot-loading").hide();
      }
    });
    types.preventDefault();
  });
  $("#request-form").submit(function(types) {
    var plainPass = $("#movie_name").val();
    var hash = md5(plainPass + s7euu24fblrg914z);
    $("#request-submit").prop("disabled", true);
    $("#request-loading").show();
    var sorted = $(this).serializeArray();
    sorted.push({
      name : "token",
      value : hash
    });
    var action = $(this).attr("action");
    $.ajax({
      url : action,
      type : "POST",
      data : sorted,
      dataType : "json",
      /**
       * @param {Object} result
       * @return {undefined}
       */
      success : function(result) {
        if ($(".error-block").hide(), 0 == result.status) {
          var key;
          for (key in result.messages) {
            $("#error-" + key).show();
            $("#error-" + key).text(result.messages[key]);
          }
        }
        if (1 == result.status) {
          $("#message-success").show();
          setTimeout(function() {
            $("#message-success").hide();
          }, 5E3);
          document.getElementById("request-form").reset();
        }
        $("#request-submit").removeAttr("disabled");
        $("#request-loading").hide();
        grecaptcha.reset();
      }
    });
    types.preventDefault();
  });
}), $("#donate-gift-card-form").submit(function(types) {
  var task = $(this).serializeArray();
  var action = $(this).attr("action");
  $.ajax({
    url : action,
    type : "POST",
    data : task,
    dataType : "json",
    /**
     * @param {Object} result
     * @return {undefined}
     */
    success : function(result) {
      if ($(".error-block").hide(), 0 == result.status) {
        var key;
        for (key in result.messages) {
          $("#error-" + key).show();
          $("#error-" + key).text(result.messages[key]);
        }
      }
      if (1 == result.status) {
        $("#message-success").show();
        setTimeout(function() {
          $("#message-success").hide();
        }, 5E3);
        document.getElementById("donate-gift-card-form").reset();
      }
    }
  });
  types.preventDefault();
}), $.cookie("subscribe") || setTimeout(function() {
  $("#pop-subc").modal("show");
  $.cookie("subscribe", 1, {
    expires : 1,
    path : "/"
  });
}, 1E4), $.cookie("subscribed") || $("#subs-block-home").show();
