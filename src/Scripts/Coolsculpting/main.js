//var app = angular.module("allerganApp", ["ngCookies"]);
var app = angular.module("allerganApp", ['ngRoute', 'ngCookies', 'angularPagination', 'angular.filter']);
//Country Language Constant
var cThailand = "th";
var cItaly = "it";
var cJapan = "jp";
var cSouthKorea = "kr";
var cMEA = "mea";
var cLATAM = "la";
var cAPAC = "apac";
var cMEA_CountryData = null;
var cMexico = "mx";
var cCanada = "ca";
var cSingapore = "sg";
var cFrance = "fr";
var cGermany = "de";
var apac = "apac";
var searchParamValue = "";
var tempPageName = "";
//var GlobalLocatorApproach = GetQueryParameterValues('sf'); 
var GlobalLocatorApproach = $("#settings-SFGlobalcliniclocator").attr("data-iclapproach");
var IsScrollAnimateEnabled = $('input#IsScrollAnimateEnabled').val();
var ICLCountrycode = $("#settings-ICLCountryCode").attr("data-ICLCountryCodevalue");
var ICLclusterCountrycode = $("#settings-ICLClustercountrycode").attr("data-Clustercountrycodevalue");
var websitecountrycode = "";
$(document).ready(function() {  
    
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function (predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                } var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1]; // 5. Let k be 0.
                var k = 0; // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                } // 7. Return undefined.
                return undefined;
            }
        });
    }

    ////Hero Banner Carousel Script
    //$('.carousel').attr('data-interval', '3000');
    //var noOfSlides = $('.carousel-inner .item').length;
    //var carouselIndicatorUl = $('<ol/>')
    //    .attr('class', 'carousel-indicators');

    //for (i = 0; i < noOfSlides; i++) {
    //    var carouselIndicatorli = $('<li/>')
    //        .attr('data-iseeditor', i)
    //        .attr('data-slide-to', i)
    //        .attr('tabindex', 0)
    //        .attr('data-target', '.carousel')
    //    if (i == 0) {
    //        carouselIndicatorli.attr('class', 'active');
    //    }
    //    carouselIndicatorUl.append(carouselIndicatorli);
    //}
    //$('.carousel-inner').after(carouselIndicatorUl);
    //$('.carousel .item:first-child').addClass('active');
    //$('.carousel').carousel({
    //    'interval': false
    //});

    // India new campaign page to hide clinic locator mapview
    if ($('body').hasClass("IndiaCoolsculpting") && $('body').attr('pagename') == "reduce-extra-bulges" || $('body').attr('pagename') == "non-surgical-body-contouring") {
        $('#mapView').css("display", "none");
    }

    if ($('#lightboxmodalpopup').attr('data-iseeditor') == '1') {
        $('#lightboxmodalpopup .close').click(function(e) { event.preventDefault() })
    }
    // GlobalLocatorApproach = GetQueryParameterValues('sf');
    var GlobalLocatorApproach = $("#settings-SFGlobalcliniclocator").attr("data-iclapproach");
    ICLCountrycode = $("#settings-ICLCountryCode").attr("data-ICLCountryCodevalue");
    ICLclusterCountrycode = $("#settings-ICLClustercountrycode").attr("data-Clustercountrycodevalue");
    if ($("#settings-countrycode").data("country").toLowerCase().trim() != 'es') {
        $('body').removeClass('es');
    }
    //added for Not a Coolsculpting Patient text smaller
    if ($("#settings-countrycode").data("country").toLowerCase().trim() == cCanada) {
        $('.slide-container .image-container .bottom-left-text').css("font-size", "11px");
        $('.all-clinics-wrapper').hide();
    }

    if ($("#settings-countrycode").data("country").toLowerCase().trim() == apac) {
        if ($("#SearchParamValue").html() != undefined) {
            searchParamValue = $("#SearchParamValue").html();
        }
        if (getQueryStringValue("search") != "" && getQueryStringValue("search").toLowerCase() == searchParamValue.toLowerCase()) {
            if ($("#TemporaryPageName").html() != undefined) {
                tempPageName = $("#TemporaryPageName").html();
                var validUrl = window.location.origin + "/" + tempPageName;
                if (validateURL(validUrl)) {
                    window.location.href = validUrl;
                }
            }
        }
    }

    function validateURL(surl) {
        var url = parseURL(surl);
        var urlHostname = url.hostname.trim();

        if (urlHostname == '') {
            return true;
        } else {
            if (urlHostname.toUpperCase() == location.hostname.trim().toUpperCase()) {
                return true;
            } else
                return false;
        }
    }

    function parseURL(url) {
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            hostname: a.hostname,
            host: a.host,
            port: a.port,
            query: a.search,
            params: (function() {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for (; i < len; i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    }

    function getQueryStringValue(key) {
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    $(document).on('click', '.phonebtn', function() {

        $(this).parents(".clinicInfo-address").find('.phonebtn').hide();
        $(this).parents(".clinicInfo-address").find('.showclinicphoneno').css("display", "inline-block !important");
        //$(this).parents(".clinicInfo-address").children("a:nth-child(3)").addClass("importantRed");
        $(this).parents(".clinicInfo-address").find('.showclinicphoneno').addClass("importantRed");

        $(this).parents(".clinic-description").find('.phonebtn').hide();
        $(this).parents(".clinic-description").find('.showclinicphoneno').css("display", "inline-block !important");
        //$(this).parents(".clinic-description").children("a:nth-child(4)").addClass("importantRed");
        $(this).parents(".clinic-description").find('.showclinicphoneno').addClass("importantRed");

    });

    $(document).off("click", '.openpdf_link').on("click", '.openpdf_link', function(event) {
        event.preventDefault();
        var path = $(this).attr('href');

        if (path.indexOf(".ashx") >= 0 || (path.indexOf(".pdf") >= 0)) {
            window.open("/pdf/openpdf" + "?pdfpath=/" + path);
        } else {
            window.location.href = path;
        }
    });

});

$(document).on("click", "#landing-btn", function(e) {
    window.location = '/home';
    sessionStorage.setItem('fromLanding', 'true');
});
$(document).on("click", "#landing-btn1", function(e) {
    if ($("#settings-countrycode").data("country").toLowerCase().trim() == cItaly) {
        window.location = 'https://www.criolipolisiallergan.it';
    } else if ($("#settings-countrycode").data("country").toLowerCase().trim() == cJapan) {
        window.location = 'https://www.allergan.jp';
    }
    sessionStorage.setItem('fromLanding', 'false');
});
app.directive("banner", function() {
    return {
        restrict: "A",
        //templateUrl: "views/banner_view.html",
        scope: true,
        transclude: false,
        controller: ""
    };
});

app.directive("footer", function() {
    return {
        restrict: "A",
        //templateUrl: "views/footer_view.html",
        scope: true,
        transclude: false,
        controller: "footerController"
    };
});

app.directive("eslanding", function() {
    return {
        restrict: "A",
        //templateUrl: "views/footer_view.html",
        scope: true,
        transclude: false,
        controller: "footerController"
    };
});

app.directive("header", function() {
    return {
        restrict: "A",
        //templateUrl: "views/header_view.html",
        scope: true,
        transclude: false,
        controller: "headerController"
    };
});

app.directive("cookie", function() {
    return {
        restrict: "A",
        //templateUrl: "views/cookie_view.html",
        scope: true,
        transclude: false,
        controller: "cookieController"
    };
});

app.directive("managecookie", function() {
    return {
        restrict: "A",
        //templateUrl: "views/cookie_view.html",
        scope: true,
        transclude: false,
        controller: "managecookieController"
    };
});

app.directive("homePanel", function() {
    return {
        restrict: "A",
        //templateUrl: "views/homePanel_view.html",
        scope: true,
        transclude: false,
        controller: "homePanelController"
    };
});
app.directive("landingpagecountry", function() {
    return {
        restrict: "A",
        scope: true,
        transclude: false,
        controller: "LandingPageCountryController"
    };
});
app.directive("clinicLocator", function() {
    return {
        restrict: "A",
        //templateUrl: "views/clinicLocator_view.html",
        scope: true,
        transclude: false,
        controller: "clinicLocatorController"
    };
});
app.directive("quickResults", function() {
    return {
        restrict: "A",
        //templateUrl: "views/quickSearch_view.html",
        scope: true,
        transclude: false,
        controller: "clinicLocatorController"
    };
});

app.directive("allClinics", function() {
    return {
        restrict: "A",
        //templateUrl: "views/allClinics_view.html",
        scope: true,
        transclude: false,
        controller: "allClinicsController"
    };
});

app.directive("clinicSearch", function() {
    return {
        restrict: "A",
        //templateUrl: "views/clinicSearchResult_view.html",
        scope: true,
        transclude: false,
        controller: "clinicSearchController"
    };
});

app.directive("imageMap", function() {
    return {
        restrict: "A",
        //templateUrl: "views/hotspot_view.html",
        scope: true,
        transclude: false,
        controller: "imageMapController"
    };
});

app.directive("links", function() {
    return {
        restrict: "A",
        //templateUrl: "views/link_view.html",
        scope: true,
        transclude: false,
        controller: "linksController"
    };
});

app.directive("beforeAfter", function() {
    return {
        restrict: 'A',
        //templateUrl: "views/beforeAfter_view.html",
        scope: true,
        transclude: false,
        controller: 'beforeafterController'
    };
});

app.directive("pageOverview", function() {
    return {
        restrict: "A",
        //templateUrl: "views/pageOverview_view.html",
        scope: true,
        transclude: false,
        controller: "PageOverviewController"
    };
});

app.directive("faq", function() {
    return {
        restrict: 'A',
        //templateUrl: "views/faq_view.html",
        scope: true,
        transclude: false,
        controller: 'faqcontroller',
    };
});

app.directive("videoPanel", function() {
    return {
        restrict: 'A',
        //templateUrl: "views/video_view.html",
        scope: true,
        transclude: false,
        controller: 'videoPanelController'
    };
});

app.directive("countrySelection", function() {
    return {
        restrict: "A",
        //templateUrl: "views/countrySelection_view.html",
        scope: true,
        transclude: false,
        controller: "countrySelectionController"
    };
});

app.directive("featurecomp", function() {
    return {
        restrict: 'A',
        //templateUrl: "views/featureComp_view.html",
        scope: true,
        transclude: false,
        controller: 'featureController'
    };
});

app.directive("doublechin", function() {
    return {
        restrict: 'A',
        // templateUrl : "views/doubleChin_view.html",
        scope: true,
        transclude: false,
        controller: 'doublechinController'
    };
});
app.directive("blogdashboard", function() {
    return {
        restrict: 'A',
        // templateUrl : "views/doubleChin_view.html",
        scope: true,
        transclude: false,
        controller: 'blogdashboardController'
    };
});
app.directive("blogrelatedarticle", function() {
    return {
        restrict: 'A',
        // templateUrl : "views/doubleChin_view.html",
        scope: true,
        transclude: false,
        controller: 'blogrelatedarticleController'
    };
});

app.controller("featureController", function($scope, $window, $element, $cookies) {
    if ($("#settings-countrycode").data("country") != undefined) {
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMexico) {
            $('.featurecomp_container .featureBox-two .fc_p').css("text-align", "justify");
            $('.featurecomp_container .featureBox-one .fc_p').css("text-align", "justify");
        }
    }
    var x = window.matchMedia("(min-device-width : 768px)")
    var y = window.matchMedia("(max-device-width : 1024px)")
    if ($("#settings-countrycode").data("country") != undefined) {
        if (($("#settings-countrycode").data("country").toLowerCase().trim() == cMEA) && (x.matches) && (y.matches)) {
            $('.featurecomp_container .featureBox-three .item:nth-child(2) img').css("width", "100%");
            $('.featurecomp_container .featureBox-three .item:nth-child(1) img').css("width", "100%");
        }
    }
    angular.element(document).ready(function() {
        setHeaderHight();
    });

    $(window).resize(function() {
        setHeaderHight();
    });

    $(window).on('load', function() {
        setHeaderHight();
    });

    function setHeaderHight() {
        if ($(window).width() > 991) {
            var featureContainers = angular.element('.featurecomp_container');
            angular.forEach(featureContainers, function(value, key) {
                var items = angular.element(value).find('.feature-box-content .item');
                if (angular.element(value).find('.info-header').length > 0) {
                    var headerHeights = [];
                    angular.forEach(items, function(value, key) {
                        headerHeights.push(angular.element(value).find('.info-header').height());
                    });
                    var maxHeight = Math.max.apply(null, headerHeights);
                    angular.element(value).find('.feature-box-content .item .info-header').height(maxHeight);
                }
            });
        } else {
            angular.element('.featurecomp_container .feature-box-content .item .info-header').height("auto");
        }
    }

});




//For Geo location service
app.service("geoloc", ['$q', function($q) {

    this.getLocation = function(url) {
        deferred = $q.defer();
        var coordinates = {
            coords: {}
        };
        return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(function(position) {
                    resolve(position);
                },
                function(error) {
                    jQuery.post(url, function(success) {
                        coordinates.coords = { latitude: success.location.lat, longitude: success.location.lng }
                        resolve(coordinates);
                    })
                }, { maximumAge: 600000, timeout: 5000, enableHighAccuracy: true }
            );
        });

    }

    //fetch current city
    this.fetchCurrentCity = function(coordinates) {
        deferred = $q.defer();
        latlng = new google.maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude);
        new google.maps.Geocoder().geocode({ 'latLng': latlng }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var city = null;
                    var c, lc, component;
                    var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
                    city = results[0].address_components[0];
                    city.long_name = results[0].formatted_address;

                }
                deferred.resolve(city);
            }

        });
        return deferred.promise;
    }

}]);


app.service("leaveWebsiteModalService",
    function() {
        this.sendRequest = function(event) {
            if (event.target.classList.contains("disable")) {
                event.preventDefault();
            } else if (event.target.parentElement.classList.contains("disable")) {
                event.preventDefault();
            } else {
                if ($('#leavingWebsiteModal').length) {
                    event.preventDefault();
                    $('#leavingWebsiteModal .btn.confirm').data('url', event.target.href);
                    $('#leavingWebsiteModal').modal();
                }
            }
        };

        this.initializeLeavingWebsiteModal = function() {
            $('#leavingWebsiteModal .btn.confirm').off('click').on('click', function() {
                var url = $(this).data('url');
                window.open(url, "_blank");
            });
        }
    });

app.controller("countrySelectionController", ['$scope', 'geoloc', '$q', '$cookies', function($scope, geoloc, $q, $cookies) {
    var domain = "";
    if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMEA || $("#settings-countrycode").data("country").toLowerCase().trim() == cAPAC) {
        domain = $.cookie('CountryCode');
    } else {
        domain = $("#settings-countrycode").data("country");
    }
    // var domain = $("#settings-countrycode").data("country"),
    var countryCode, coordinates = {},
        latlng,
        deferred = $q.defer(),
        url = $("#settings-geolocation").data("geolocationapi");

    $("#cs-model").on("hidden.bs.modal", function() {
        // put your default event here
        //$cookies.put("csPopoverTriggered", true);
        enableBgActions();
    });
    $("#cs-model").on("shown.bs.modal", function() {
        disableBgActions();
    });
    $(".cs-close-wrap").keypress(function(e) {
        if (e.keyCode == 13) {
            $("#cs-model").modal("hide");
        }
    });
    //if (location.search.indexOf("cs_internal_flag") > -1) {
    //    $cookies.put("csPopoverTriggered", true);
    //} 
    //if (!$cookies.get('csPopoverTriggered')) {
    //    //show popover block
    //    $.post(url, function (success) {
    //        fetchCountryCode(success).then(function (countrycode) {
    //            if (countrycode != domain) {
    //                $('#cs-model').modal({ backdrop: 'static', keyboard: false }, 'show');
    //            }
    //        });
    //    })
    //}

    //fetch country code block
    function fetchCountryCode(coordinates) {
        latlng = new google.maps.LatLng(coordinates.location.lat, coordinates.location.lng);
        new google.maps.Geocoder().geocode({ 'latLng': latlng }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var country = null,
                        countryCode = null,
                        city = null,
                        cityAlt = null;
                    var c, lc, component;
                    for (var r = 0, rl = results.length; r < rl; r += 1) {
                        var result = results[r];
                        if (!country && result.types[0] === 'country') {
                            country = result.address_components[0].long_name;
                            countryCode = result.address_components[0].short_name;
                        }

                        if (city && country) {
                            break;
                        }
                    }
                    if (countryCode == null && results[1].formatted_address.length != 0) {

                        var formAddressArray = results[1].formatted_address.split(',');

                        var country = (formAddressArray[formAddressArray.length - 1]).trim();
                        angular.forEach(results[1].address_components, function(value, key) {
                            if (value.long_name == country) {
                                countryCode = value.short_name.toLowerCase();
                            }
                        });
                    }
                }
                deferred.resolve(countryCode);
            }

        });
        return deferred.promise;
    }

    var blockElements, ariaHiddenElements, tabDisabledElements, tabEnabledElements, linkElements, inputs;

    function disableBgActions() {
        blockElements = angular.element("header,footer,main,section").not("section[country-selection]");
        ariaHiddenElements = angular.element("[aria-hidden='true']").not("#cs-model [aria-hidden='true']");
        tabDisabledElements = angular.element("[tabindex='-1']").not("#cs-model [tabindex='-1']");
        tabEnabledElements = angular.element("[tabindex='0']").not("#cs-model [tabindex='0']");
        linkElements = angular.element("a").not("#cs-model a");
        inputs = angular.element("input, button").not("#cs-model input, #cs-model button");
        disabledInputs = angular.element("input[tabindex='-1'], button[tabindex='-1']").not("#cs-model input[tabindex='-1'], #cs-model button[tabindex='-1']");
        blockElements.attr("aria-hidden", "true");
        tabEnabledElements.attr("tabindex", "-1");
        linkElements.attr("tabindex", "-1");
        inputs.attr("tabindex", "-1");
    }

    function enableBgActions() {
        blockElements.attr("aria-hidden", "false");
        tabEnabledElements.attr("tabindex", "0");
        linkElements.attr("tabindex", "0");
        tabDisabledElements.attr("tabindex", "-1");
        ariaHiddenElements.attr("aria-hidden", "true");
        inputs.attr("tabindex", "0");
        disabledInputs.attr("tabindex", "-1");
    }
}]);


app.controller("videoPanelController", function($scope) {
    $scope.setvideo = function(event) {
        var _this = $(event.currentTarget),
            videoId = _this.attr('data-video-id');
            videoTitle = _this.attr('data-video-title');
        _this.find('.vimeo-video').remove();
        var videoEmbed = '<iframe class="vimeo-video" src="https://player.vimeo.com/video/' + videoId + '?autoplay=1" allow="autoplay" width="740" height="456" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
        _this.append(videoEmbed);

        var $allVideos = $("iframe[src^='https://player.vimeo.com'], iframe[src^='https://www.youtube.com'], object, embed");

        if(videoTitle == ""){
			videoTitle = "How CoolSculpting® Works? from CoolSculpting® on Vimeo";
		}
        $allVideos.each(function() {
            var player = new Vimeo.Player($(this));
          	player.on('seeked', function(s) {
				player.getCurrentTime().then(function (seconds)	{
					if(seconds != 0){
						console.log('seeked the video!');
						dataLayer.push({
							videoEventType: 'drag',
							videoTitle: videoTitle,
							event: 'videoEvent'
						});
					}					
				}).catch(function(error) {
					// an error occurred
				});				
			});
			player.on('ended', function(s) {
				console.log('ended the video!');
				dataLayer.push({
					videoEventType: 'ended',
					videoTitle: videoTitle,
					event: 'videoEvent'
				});
			});
player.on('play', function(s) {
	player.getCurrentTime().then(function (seconds)	{
		if(seconds == 0){
			console.log('Start video');
			dataLayer.push({
				videoEventType: 'Start',
				videoTitle: videoTitle,
				event: 'videoEvent'
			});
		}
		else{
			console.log('Resume video');
			dataLayer.push({
				videoEventType: 'Resume',
				videoTitle: videoTitle,
				event: 'videoEvent'
			});
		}
	}).catch(function(error) {
		// an error occurred
	});
});
			player.on('pause', function(s) { 
				var ended = false;
				player.getEnded().then(function(e) {
				ended = e;
				}).catch(function(error) {
					// an error occurred
				});

				player.pause().then(function() { 
				if(!ended){
					console.log('Pause');
					dataLayer.push(
					{
						videoEventType: 'Pause',
						videoTitle: videoTitle,
						event: 'videoEvent'
					});
				}
				}).catch(function(error) {
					// an error occurred
				});
			});
        });
    };
});

app.controller("faqcontroller", function($scope) {
    var uri = window.location.hash.substring(1);
    if (uri.length > 0) {
        var id = uri.split('=')[1];
        var idAttr = angular.element('#' + id).attr('href');
        $(idAttr).collapse('show');
    }
    angular.element('.collapse').on('shown.bs.collapse hidden.bs.collapse', function() {
        var anchor = angular.element(this).parent(".panel.panel-default").find("a"),
            checkArrow = angular.element(anchor).hasClass("collapsed"),
            arrow = angular.element(this).parent(".panel.panel-default").find("img");
        checkArrow ? arrow.removeClass("up_arw").addClass("dwn_arw") : arrow.removeClass("dwn_arw").addClass("up_arw");
    });

    angular.element('.quicklink a').on('click', function() {
        $('html, body').animate({
            'scrollTop': $($(this).attr('href')).position().top - parseInt($(".sticky-header").css("padding-top"))
        });
    });

    $scope.setDeepLink = function(id) {
        window.location.hash = "id=" + id;
    }

    $(window).on('load', function () {
        setTimeout(function () {
            if (window.location.href.contains('#id')) {

                $('html, body').animate({
                    'scrollTop': $('.panel #collapse' + window.location.href.split('#id=')[1]).parent('.panel').offset().top - parseInt($(".sticky-header").css("padding-top"))
                }, 500);
                //angular.element('.panel #collapse' + window.location.href.split('#id=')[1]).parent('.panel').find('a.collapsed').trigger('click');
            }
        }, 1000);
    });
});
app.controller("LandingPageCountryController", function($scope) {
    $scope.cookieapac = function(countrycode, countryname) {
        $.cookie('CountryCode', countrycode, { path: '/' });
        $.cookie('CountryName', countryname, { path: '/' });
    }
});
app.controller("PageOverviewController", function($scope) {
    //if ($(window).width() > 992) {
    //    setTimeout(function () { getdynamicHeight(); }, 1000);
    //    function getdynamicHeight() {
    //        angular.forEach($('.overview-container'), function (value, key) {
    //            var $boxReact = $(value).find('.box-toreact'),
    //                $boxDynamic = $(value).find('.box-dynamic');
    //            $($boxReact).height(0);
    //            var height = $($boxDynamic)[0].offsetHeight;
    //            $($boxReact).height(height);
    //        });
    //    }
    //    $(window).resize(function () {
    //        getdynamicHeight();
    //    });
    //}

    $scope.setvideo = function(event) {
        var _this = $(event.currentTarget),
            videoId = _this.attr('data-video-id');
            videoTitle = _this.attr('data-video-title');
        _this.find('.vimeo-video').remove();
        var videoEmbed = '<iframe class="vimeo-video" src="https://player.vimeo.com/video/' + videoId + '?autoplay=1" allow="autoplay" width="740" height="456" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
        _this.append(videoEmbed);

        var $allVideos = $("iframe[src^='https://player.vimeo.com'], iframe[src^='https://www.youtube.com'], object, embed");

        if(videoTitle == ""){
			videoTitle = "How CoolSculpting® Works? from CoolSculpting® on Vimeo";
		}
        $allVideos.each(function() {
            var player = new Vimeo.Player($(this));
			player.on('seeked', function(s) {
				player.getCurrentTime().then(function (seconds)	{
					if(seconds != 0){
						console.log('seeked the video!');
						dataLayer.push({
							videoEventType: 'drag',
							videoTitle: videoTitle,
							event: 'videoEvent'
						});
					}					
				}).catch(function(error) {
					// an error occurred
				});				
			});
			player.on('ended', function(s) {
				console.log('ended the video!');
				dataLayer.push({
					videoEventType: 'ended',
					videoTitle: videoTitle,
					event: 'videoEvent'
				});
			});
player.on('play', function(s) {
	player.getCurrentTime().then(function (seconds)	{
		if(seconds == 0){
			console.log('Start video');
			dataLayer.push({
				videoEventType: 'Start',
				videoTitle: videoTitle,
				event: 'videoEvent'
			});
			$(".vp-sidedock").style.display = "none";
		}
		else{
			console.log('Resume video');
			dataLayer.push({
				videoEventType: 'Resume',
				videoTitle: videoTitle,
				event: 'videoEvent'
			});
			$(".vp-sidedock").style.display = "none";
		}
	}).catch(function(error) {
		// an error occurred
	});
});
			player.on('pause', function(s) { 
				var ended = false;
				player.getEnded().then(function(e) {
				ended = e;
				}).catch(function(error) {
					// an error occurred
				});

				player.pause().then(function() { 
				if(!ended){
					console.log('Pause');
					dataLayer.push(
					{
						videoEventType: 'Pause',
						videoTitle: videoTitle,
						event: 'videoEvent'
					});
				}
				}).catch(function(error) {
					// an error occurred
				});
			});
        });
    };

    function getdynamicHeight() {
        if (!$("div").hasClass("australiavideo")) {           
            if (window.innerWidth > 991) {
                angular.forEach($('.overview-container'), function(value, key) {
                    var $boxReact = $(value).find('.box-toreact'),
                        $boxDynamic = $(value).find('.box-dynamic'),
                        $boxReactImg = $(value).find('.box-toreact img');
                    
                    if ($($boxDynamic)[0] != undefined) {
                        var height = "";
                            var imglazyload = $("#settings-ImageLazyload").attr("data-ImageLazyload");
                            if (imglazyload != undefined && imglazyload == "1") {
                                 height = $($boxDynamic)[0].offsetHeight;
                            }
                            else {
                                height = $($boxDynamic)[0].offsetHeight > $($boxReact)[0].offsetHeight ? $($boxDynamic)[0].offsetHeight : $($boxReact)[0].offsetHeight;
                            }
                            $($boxReact).css("height", height);
                            $($boxDynamic).css("height", height);
                            $($boxReactImg).css("height", height);
                        }
                   
                });
            } else {
                angular.forEach($('.overview-container'), function(value, key) {
                    var $boxReact = $(value).find('.box-toreact'),
                        $boxDynamic = $(value).find('.box-dynamic'),
                        $boxReactImg = $(value).find('.box-toreact img');
                    $($boxReact).height("auto");
                    $($boxDynamic).height("auto");
                    $($boxReactImg).height("auto");
                });
            }
        }
    }
    ////$(window).resize(function () {
    ////    getdynamicHeight();
    ////});
    $(window).on('load', function () {       
            getdynamicHeight();
       
        $(window).resize(function() {
            getdynamicHeight();
        });
    });
});

app.controller("linksController", function($scope) {
    setTimeout(function() { getdynHeight(); }, 1000);
    //set dynamic height via script
    function getdynHeight() {
        //angular.forEach($('.action-block'), function (value, key) {
        //    var $boxReact = $(value).find('.box-toreactLink'),
        //        $boxDynamic = $(value).find('.box-dynamicLink');
        //    $($boxReact).height(0);
        //    var height = $($boxDynamic)[0].offsetHeight;
        //    $($boxReact).height(height);
        //});
        angular.forEach($('.action-block'), function(value, key) {
            var $boxReact = $(value).find('.box-toreactLink'),
                $boxDynamic = $(value).find('.box-dynamicLink');
            $($boxReact).css("min-height", "0px");
            $($boxDynamic).css("min-height", "0px");
            if ($($boxDynamic)[0] != undefined) {
                var height = $($boxDynamic)[0].offsetHeight > $($boxReact)[0].offsetHeight ? $($boxDynamic)[0].offsetHeight : $($boxReact)[0].offsetHeight;
                $($boxReact).css("min-height", height);
                $($boxDynamic).css("min-height", height);
            }
        });
    }
    $(window).resize(function() {
        getdynHeight();
    });
});


app.controller("footerController", function($scope) {
    var unbranded = $("#settings-unbranded").data("unbranded");
    var Fheight = $('#cookie-law-info-bar').outerHeight();
    var cookieVal = getCookie('coolsculpting_cp');
    if (cookieVal == 'false' || cookieVal === undefined || cookieVal == "") {
        $(".footer-section").css("padding-bottom", Fheight + 'px');
    } else {
        $(".footer-section").css("padding-bottom", '0px');
    }
    if (unbranded.trim().toLowerCase() == "true") {
        $(".footer-inner").addClass("unbranded-footer");
    }
    var domain = "";
    if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMEA || $("#settings-countrycode").data("country").toLowerCase().trim() == cAPAC) {
        if ($.cookie('CountryCode') != null) {
            domain = $.cookie('CountryCode');
        } else {
            domain = "" || $("#settings-countrycodefilter").data("countries");
        }
    } else {
        domain = "" || $("#settings-countrycodefilter").data("countries");
    }
    var MobileDevice = navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry/i);
    if (domain.trim() == "") {
        $(".find-clinic-input").geocomplete().bind("geocode:result", function() {
            if (MobileDevice) {
                $("#fcSearchIcon").trigger("click");
            }
        });
    } else {
        domain = domain.split(",").map(function(value, index) {
            return value.trim();
        });
        if (domain[0].toLowerCase() == cLATAM) {
            $(".find-clinic-input").geocomplete();
        } else if (domain[0].toLowerCase() != cFrance) {
            //Auto complete places
            //$(".find-clinic-input").geocomplete();
            $(".find-clinic-input").geocomplete({
                componentRestrictions: { country: domain }
            }).bind("geocode:result", function() {
                if (MobileDevice) {
                    $("#fcSearchIcon").trigger("click");
                }
            });
        }
    }
    if ($("#settings-countrycode").data("country").toLowerCase().trim() == cAPAC) {
        $(".burger-menu.ft-left").css("display", "none");
    }
    var addressInputElement1 = $('#footerSearch');
    addressInputElement1.on('focus', function() {
        var pacContainer1 = $('.pac-container');
        $(addressInputElement1.parent()).append(pacContainer1);
    });

    var eslandingaddressInputElement1 = $('#esLandingfooterSearch');
    eslandingaddressInputElement1.on('focus', function() {
        var pacContainer2 = $('.pac-container');
        $(eslandingaddressInputElement1.parent()).append(pacContainer2);
    });

    $scope.footerLocSearch = function(event) {
        event.preventDefault();
        var srchTerm = angular.element('#footerSearch').val(),
            //pageName = angular.element('.pin-nav').attr('href').split("/"),
            //pageNav = pageName[(pageName.length) - 1];
            pageNav = angular.element('.pin-nav').attr('href');
        if (srchTerm != null && srchTerm != '' && srchTerm != "undefined") {
            dataLayer.push({
                'searchTerm': srchTerm,
                'event': 'searchPerformed'
            });
            if ($('#footerSearch').val() != '' && $('#footerSearch').val() != null && typeof($('#footerSearch').val()) != "undefined") {
                //window.location.href = pageNav + "?search=" + srchTerm;

                if (GlobalLocatorApproach == "1" && ICLclusterCountrycode != "") {
                    var twolettercountrycode = "";
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ 'address': srchTerm }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {                            
                            var addrComponents = results[0].address_components;
                            for (var i = 0; i < addrComponents.length; i++) {
                                if (addrComponents[i].types[0] == "country") {
                                    twolettercountrycode = addrComponents[i].short_name;
                                }
                            } 
                            window.open(pageNav + "?search=" + srchTerm + "&iclcountrycode=" + twolettercountrycode, '_blank');
                        }
                    });
                 
                }
                else {
                    window.open(pageNav + "?search=" + srchTerm, '_blank');
                }
               
            }
        } else {
            $('#footerErrorModal').modal();
            $('#footerErrorModal').on('shown.bs.modal', function() {});
        }
    };
    $scope.eslandingfooterLocSearch = function(event) {
        event.preventDefault();
        var srchTerm = angular.element('#esLandingfooterSearch').val(),
            //pageName = angular.element('.pin-nav').attr('href').split("/"),
            //pageNav = pageName[(pageName.length) - 1];
            pageNav = angular.element('.pin-nav').attr('href');
        if (srchTerm != null && srchTerm != '' && srchTerm != "undefined") {
            dataLayer.push({
                'searchTerm': srchTerm,
                'event': 'searchPerformed'
            });
            if ($('#esLandingfooterSearch').val() != '' && $('#esLandingfooterSearch').val() != null && typeof($('#esLandingfooterSearch').val()) != "undefined") {
                //window.location.href = pageNav + "?search=" + srchTerm;
                window.open(pageNav + "?search=" + srchTerm, '_blank');
            }
        } else {
            $('#footerErrorModal').modal();
            $('#footerErrorModal').on('shown.bs.modal', function() {});
        }
    };

    $scope.searchftrClinic = function(event) {
        if (event.which == 13) {
            var srchTerm = angular.element('#footerSearch').val(),
                //pageName = angular.element('.pin-nav').attr('href').split("/"),
                //pageNav = pageName[(pageName.length) - 1];
                pageNav = angular.element('.pin-nav').attr('href');
            if (srchTerm != null && srchTerm != '' && srchTerm != "undefined") {
                dataLayer.push({
                    'searchTerm': $('.find-clinic-input').val(),
                    'event': 'searchPerformed'
                });
                if ($('#footerSearch').val() != '' && $('#footerSearch').val() != null && typeof($('#footerSearch').val()) != "undefined") {
                    window.open(pageNav + "?search=" + srchTerm, '_blank');
                }
            }
        }
    };


    $scope.searcheslandingClinic = function(event) {
        if (event.which == 13) {
            var srchTerm = angular.element('#esLandingfooterSearch').val(),
                //pageName = angular.element('.pin-nav').attr('href').split("/"),
                //pageNav = pageName[(pageName.length) - 1];
                pageNav = angular.element('.pin-nav').attr('href');
            if (srchTerm != null && srchTerm != '' && srchTerm != "undefined") {
                dataLayer.push({
                    'searchTerm': $('.find-clinic-input').val(),
                    'event': 'searchPerformed'
                });
                if ($('#esLandingfooterSearch').val() != '' && $('#esLandingfooterSearch').val() != null && typeof($('#esLandingfooterSearch').val()) != "undefined") {
                    window.open(pageNav + "?search=" + srchTerm, '_blank');
                }
            }
        }
    };


    $(window).resize(function() {
        setTimeout(function() {
            changeFooterLogo();
        }, 10)
    }).resize();


    function changeFooterLogo() {
        var logoSection = $('.footer-sec2');

        if ($(window).width() < 1024) {
            $('.footer-sec1').after($(logoSection));
        } else {
            $('.footer-sec1').before($(logoSection));
        }
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }




});

app.controller("headerController", function($scope, $window, $element, $cookies, globalservice) {

    if (angular.element('.lan-select').length > 0) {
        lanInit();
    }

    $scope.active = false;
    var docAll = angular.element(window.document),
        lanSelect = angular.element('.lan-select .lan'),
        navbarToggle = angular.element(".nav-title");
    //angular.element('.sticky-header').css('padding-top', angular.element('.main-header')[0].offsetHeight);

    $scope.menuToggled = function() {
        $(".main-nav").slideToggle();
        $(".lan-select").slideToggle();
        if ($(".menu-btn").attr('aria-expanded') == false || $(".menu-btn").attr('aria-expanded') == "false") {

            $(".menu-btn").removeAttr("aria-expanded");

            $(".menu-btn").attr("aria-expanded", true);

        } else {

            $(".menu-btn").removeAttr("aria-expanded");

            $(".menu-btn").attr("aria-expanded", false);

        }
    };

    function lanInit() {
        $scope.active = false;
        angular.element(document.querySelector('.lan-select .lan')).addClass('active');

    }

    //watch height on load--cookie height varies
    if (angular.element('.ng-coolsculpting.cookie-avl').length > 0) {
        if ($(".cookie-wrapper").length > 0) {
            var cookie_ht = $('.cookie-wrapper')[0].offsetHeight,
                header_ht = $('.main-header')[0].offsetHeight;
            angular.element('.main-header').css('top', cookie_ht);
            angular.element('main').css('margin-top', cookie_ht);
            angular.element('.sticky-header').css('padding-top', cookie_ht + header_ht);
        }
    }

    docAll.bind("click", function(event) {
        if ($(".list-container.expanded").length > 0 && !$(event.target).hasClass("nav-title")) {
            $(".list-container").removeClass("expanded");
            hideOverlay();
        }
    });

    lanSelect.bind('click', function(event) {
        $('.lan-select .lan').removeClass('active');
        $(event.currentTarget).addClass('active');
    });

    $scope.navigateNxt = function($event) {
        if ($window.innerWidth < "769") {
            $($event.target).addClass("active");
        }
    };
    navbarToggle.bind("click", function(event) {
        event.stopPropagation();
        if (globalservice.isRTL() == true) {
            var $elemParent = $(event.currentTarget).closest(".list-container"),
                slidewidth = ($(event.currentTarget).offset().left - $("body").offset().left);
            console.log("Is RTL: " + globalservice.isRTL());
        } else {

            var $elemParent = $(event.currentTarget).parent(),
                slidewidth = $('body').width() - ($(event.currentTarget).offset().left - $('body').offset().left);
        }

        $elemParent.toggleClass("expanded");
        hideOverlay();
        $(".list-container").not($elemParent).removeClass("expanded");

        if ($elemParent.hasClass("expanded")) {
            $elemParent.find("a img").css("transform", "rotate(270deg)");
            $elemParent.find(".overlay").slideDown(100, function() {
                $elemParent.find(".sub-menu").slideDown(100, function() {
                    $(this).animate({
                        width: slidewidth
                    }, 150);
                    $(this).find("a").css("opacity", 1);
                });
            });
            $elemParent.find(".nav-title").attr("aria-expanded", "true");
        } else {
            $elemParent.find(".nav-title").attr("aria-expanded", "false");
        }

    });
    // Rc deployment Merge conflict issue fix
    //if (($("#settings-countrycode").data("country").toLowerCase().trim() == cJapan)) {
    //if (cJapan == ($("#settings-countrycode").data("country").toLowerCase().trim())) {
    //    var data = sessionStorage.getItem("fromLanding");
    //    var include = $("#settings-site").attr("data-isEEditor");
    //    if (((data == false || sessionStorage.length != 1)) && include == "0") {
    //        window.location = "/";

    //        //var page = document.getElementsByClassName('exp-header').length;
    //        //var data = sessionStorage.getItem("fromLanding");
    //        //if (page != null) {
    //        //    data = true;
    //        //}
    //        //if (data == false || sessionStorage.length != 1) {
    //        //    window.location = "/";
    //    }
    //}

    angular.element(".exp-open .nav-title img").bind("mouseover", function() {
        event.stopPropagation();
        var $elemParent = $(event.currentTarget).closest(".list-container"),
            slidewidth = $("body").width() - ($(event.currentTarget).offset().left - $("body").offset().left);
        $elemParent.toggleClass("expanded");
        hideOverlay();
        $(".list-container").not($elemParent).removeClass("expanded");
        if ($elemParent.hasClass("expanded")) {
            $elemParent.find("a img").css("transform", "rotate(270deg)");
            $elemParent.find(".overlay").slideDown(100, function() {
                $elemParent.find(".sub-menu").slideDown(100, function() {
                    $(this).animate({
                        width: slidewidth
                    }, 150);
                    $(this).find("a").css("opacity", 1);
                });
            });
            $elemParent.find(".nav-title").attr("aria-expanded", "true");
        } else {
            $elemParent.find(".nav-title").attr("aria-expanded", "false");
        }
    });
    setTimeout(function () {
        angular.element('.sticky-header').css('padding-top', angular.element('.main-header')[0].offsetHeight);
    }, 100);
   
    function resetHeaderPosition() {
        if ($(window).innerWidth() > 991) {
            setTimeout(function () { 
            angular.element(".cta-group").css("left", angular.element(".lan-select").outerWidth());
            angular.element(".lan-select").css("left", -angular.element(".cta-group").outerWidth());
         }, 3000);
        } else {
            angular.element(".lan-select").css("left", "auto");
            angular.element(".cta-group").css("left", "auto");
        }
    }

    function hideOverlay() {
        $(".overlay").hide();
        $(".sub-menu").hide().css("width", "100%");
        $(".sub-menu a").css("opacity", "0");
        $(".nav-title img").css("transform", "rotate(90deg)");
    }
    //watch height on resize==cookie height varies
    $(window).resize(function() {
        resetHeaderPosition();
        var header_ht = $('.main-header')[0].offsetHeight;
        //if (!$cookies.get('displayed')) {
        //    var cookie_ht = $('.cookie-wrapper')[0].offsetHeight;
        //    $('.main-header').css('top', cookie_ht);
        //    $('.sticky-header').css('padding-top', cookie_ht + header_ht);
        //}
        //else {
        //    $('.sticky-header').css('padding-top', header_ht);
        //}
        $('.sticky-header').css('padding-top', header_ht);
    });
    //var paddingwidth = 0;
    //if ($(window).width() > 768 && $(window).width() < 1024) 
    //    paddingwidth = angular.element('.nav-menu').width() - 90 - angular.element('.main-nav').width() - angular.element('.cta-group').width();
    //else if ($(window).width() > 1366)
    //    paddingwidth = angular.element('.nav-menu').width() - 120 - angular.element('.main-nav').width() - angular.element('.cta-group').width();
    //else
    //    paddingwidth = angular.element('.nav-menu').width() - 130 - angular.element('.main-nav').width() - angular.element('.cta-group').width();
    //console.log(paddingwidth);
    //angular.element('.lan-select').css('padding-left', paddingwidth);

    $scope.openMenuUnbounceForm = function(event) {
        event.preventDefault();
        var element = event.currentTarget;

        if (document.getElementsByClassName('ub-emb-container').length < 1 || document.getElementsByClassName('ub-emb-iframe').length < 1) {
            return;
        }

        var ubContainer = document.getElementsByClassName('ub-emb-container')[0];

        ubContainer.classList.add('show');
    }
});
app.service("globalservice", function() {
    this.isRTL = function() {
        var isRTL = angular.element("body").css("direction") == "rtl" ? true : false;
        return isRTL;
    };
});

app.controller("cookieController", function($scope, $cookies) {
    loadModal = function() {
        $("#advtModal").modal();
    }
    $("#advtdropClosebtn").on("click", function(event) {
        $("#advtModal").modal('hide');
    });
    var countrycode = $("#settings-countrycode").data("country").toLowerCase().trim();
    if (countrycode == cSouthKorea) {
        loadModal();
    }

    var isgdpr = $("#settings-isgdpr").data("gdpr").toString().toLowerCase();
    if (isgdpr == "false" && $("#settings-countrycode").data("country").toLowerCase().trim() == cMEA) {
        $(document).ready(function($) {
            var moretext = $("#readmore").text();
            var lesstext = $("#lesstext").text();
            $('#cookie-reveal').on('hide.bs.collapse', function() {
                $('#cookie-reveal-toggle').text(moretext);
            });
            $('#cookie-reveal').on('show.bs.collapse', function() {
                $('#cookie-reveal-toggle').text(lesstext);
            });
            $("#cookie-reveal").on('shown.bs.collapse', function() {
                var Fheight = $('#cookie-law-info-bar').outerHeight();
                $(".footer-section").css("padding-bottom", Fheight + 'px');
            });
            $("#cookie-reveal").on('hidden.bs.collapse', function() {
                var Fheight = $('#cookie-law-info-bar').outerHeight();
                $(".footer-section").css("padding-bottom", Fheight + 'px');
            });
        });
        var cookieVal = getCookie('coolsculpting_cp');
        var selectedLanguage = $('html').attr('data-lang');
        var countryname = $("#settings-countryname").data("countryname").toString().trim().toLowerCase();
        var cookielang = countryname + "coolsculpting#lang";
        var countrycode = $("#settings-countrycodefilter").data("countries").toString().trim().toLowerCase();
        if (cookieVal == 'false' || cookieVal === undefined || cookieVal == "") {
            $('#cookie-law-info-bar').show();
        } else {
            $('#cookie-law-info-bar').hide();
            window.dataLayer.push({
                event: "cookieConsentPageLoadAlreadyAccepted",
                cookieConsented: 1
            });
        }
        $('#newconfirmCookieSubmit').on('click', function(event) {
            window.location.reload();
            $(".footer-section").css("padding-bottom", '0px');
            setCookie('coolsculpting_cp', true, 7);
            window.dataLayer.push({
                event: "cookieConsentPopupAccepted",
                cookieConsented: 1
            });

            if (countrycode == cThailand) {
                setCookie('default-language', true, 7);
                setCookie(cookielang, selectedLanguage, 7)
            }
            $("#cookie-law-info-bar").animate({
                height: "0",
                marginBottom: "-20"
            }, 1000, function() {
                //$('#cookie-law-info-bar').hide();
                $('#newcookieModal').hide();
                $(".footer-section").css("padding-bottom", '0px');
            });
        });

    } else if (isgdpr == "false") {
        //set cookie
        var redirectingUrl = $("#cookieModal").data("redirectingurl") || "http://www.allergan.com";
        var isDefaultPopup = $("#cookieModal").data("defaultcookiepopoup");
        if (!$cookies.get('displayed')) {
            angular.element('.ng-coolsculpting').addClass('cookie-avl');

        }
        // $cookies.NameOfMyCookie = "Setting a value";
        $scope.closeCookie = function() {
            $cookies.put("displayed", true);
            var header_ht = $('.main-header')[0].offsetHeight;
            angular.element('.ng-coolsculpting').removeClass('cookie-avl');
            $('.main-header').css('top', '0');
            $('main').css('margin-top', '0');
            $('.sticky-header').css('padding-top', header_ht);
        }
        if (cookieVal == 'false' || cookieVal === undefined || cookieVal == "") {
            $('#cookieModal').modal({ backdrop: 'static', keyboard: false });

            $('#cookieSubmit').on('click', function(event) {

                if ($('#cookieAccept').is(":checked")) {
                    //$cookies.put("coolsculpting_cp", true);
                    setCookie('coolsculpting_cp', true, 7);
                    window.dataLayer.push({
                        event: "cookieConsentPopupAccepted",
                        cookieConsented: 1
                    });
                } else if (isDefaultPopup == "True") {
                    $('#confirmCookieModal').modal({ backdrop: 'static', keyboard: false }, 'show');
                    //$cookies.put("coolsculpting_cp", false);
                    setCookie('coolsculpting_cp', false, 7);
                } else {
                    setCookie('coolsculpting_cp', false, 7);
                    $('#cookieSubmit').modal('hide');
                    window.location.replace(redirectingUrl);
                }

                $('#cookieModal').modal('hide');
            });

            $('#cookieModal').on('shown.bs.modal', function() {
                disableBgActions("#cookieModal");
            });

            $('#cookieModal').on('hidden.bs.modal', function() {
                enableBgActions();
                var cookieVal = getCookie('coolsculpting_cp');
                if (cookieVal == 'false' || cookieVal === undefined || cookieVal == "") {
                    if (isDefaultPopup == "True") {
                        $('#confirmCookieModal').modal({ backdrop: 'static', keyboard: false }, 'show');
                        //$cookies.put("coolsculpting_cp", false);
                        setCookie('coolsculpting_cp', false, 7);
                    } else {
                        setCookie('coolsculpting_cp', false, 7);
                        $('#cookieSubmit').modal('hide');
                        window.location.replace(redirectingUrl);
                    }
                }
            });


            $('#confirmCookieModal').on('show.bs.modal', function() {
                $(document.body).addClass('modal-open');
                disableBgActions('#confirmCookieModal');
            });

            $('#confirmCookieModal').on('hidden.bs.modal', function() {
                var cookieVal = getCookie('coolsculpting_cp');
                if (cookieVal == 'false' || cookieVal === undefined || cookieVal == "") {
                    //$cookies.put("coolsculpting_cp", false);
                    setCookie('coolsculpting_cp', false, 7);
                    $('#confirmCookieModal').modal('hide');
                    window.location.replace(redirectingUrl);
                }
                enableBgActions();
            });

            $('#confirmCookieSubmit').on('click', function(event) {

                if ($('#confirmCookieAccept').is(":checked")) {
                    //add cookie 
                    //$cookies.put("coolsculpting_cp", true);
                    setCookie('coolsculpting_cp', true, 7);
                    window.dataLayer.push({
                        event: "cookieConsentPopupAccepted",
                        cookieConsented: 1
                    });
                } else {
                    //$cookies.put("coolsculpting_cp", false);
                    setCookie('coolsculpting_cp', false, 7);
                    $('#confirmCookieModal').modal('hide');
                    window.location.replace(redirectingUrl);
                }
            });
        } else {
            window.dataLayer.push({
                event: "cookieConsentPageLoadAlreadyAccepted",
                cookieConsented: 1
            });
        }
    } else {
        //Getting Language Browser Cookie
        //var decodedCookie = decodeURIComponent(document.cookie);
        //var ca = decodedCookie.split(';');
        //var lan = "";
        //var cookielang = "";

        //for (var i = 0; i < ca.length; i++) {
        //    var c = ca[i];
        //    while (c.charAt(0) == ' ') {
        //        c = c.substring(1);
        //    }
        //    if (c.indexOf('#lang') > 0) {
        //        cookielang = c.split('=');
        //        cookielang = cookielang[0];
        //    }
        //}

        // Set cookie if they accept cookie policy
        //console.log($cookies.get("coolsculpting_cp"));
        $(document).ready(function($) {
            var moretext = $("#readmore").text();
            var lesstext = $("#lesstext").text();
            $('#cookie-reveal').on('hide.bs.collapse', function() {
                $('#cookie-reveal-toggle').text(moretext);
            });
            $('#cookie-reveal').on('show.bs.collapse', function() {
                $('#cookie-reveal-toggle').text(lesstext);
            });
            $("#cookie-reveal").on('shown.bs.collapse', function() {
                var Fheight = $('#cookie-law-info-bar').outerHeight();
                $(".footer-section").css("padding-bottom", Fheight + 'px');
            });
            $("#cookie-reveal").on('hidden.bs.collapse', function() {
                var Fheight = $('#cookie-law-info-bar').outerHeight();
                $(".footer-section").css("padding-bottom", Fheight + 'px');
            });
        });

        if ($("#settings-countrycode").data("country").toLowerCase().trim() == cGermany) {
            var cookieVal = getCookie('CookieConsent');
            if (cookieVal == "") {
                $('#cookie-law-info-bar').show();
            } else {
                $('#cookie-law-info-bar').hide();
            }



            cs_germany_CookieDataLayerPush();


        } else {
            var cookieVal = getCookie('coolsculpting_cp');
            var selectedLanguage = $('html').attr('data-lang');
            var countryname = $("#settings-countryname").data("countryname").toString().trim().toLowerCase();
            var cookielang = countryname + "coolsculpting#lang";
            var countrycode = $("#settings-countrycodefilter").data("countries").toString().trim().toLowerCase();
            if (cookieVal == 'false' || cookieVal === undefined || cookieVal == "") {
                $('#cookie-law-info-bar').show();
            } else {
                $('#cookie-law-info-bar').hide();
                if ($("body#exp-open").length < 1) {
                    window.dataLayer.push({
                        event: "cookieConsentPageLoadAlreadyAccepted",
                        cookieConsented: 1
                    });
                }
            }
            $('#newconfirmCookieSubmit').on('click', function(event) {
                $(".footer-section").css("padding-bottom", '0px');
                setCookie('coolsculpting_cp', true, 7);
                window.dataLayer.push({
                    event: "cookieConsentPopupAccepted",
                    cookieConsented: 1
                });

                if (countrycode == cThailand) {
                    setCookie('default-language', true, 7);
                    setCookie(cookielang, selectedLanguage, 7)
                }
                $("#cookie-law-info-bar").animate({
                    height: "0",
                    marginBottom: "-20"
                }, 1000, function() {
                    //$('#cookie-law-info-bar').hide();
                    $('#newcookieModal').hide();
                    $(".footer-section").css("padding-bottom", '0px');
                });
            });

        }


    }


    //set a cookie
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";secure" + ";" + expires + ";path=/";
    }

    // get a cookie
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    var blockElements, ariaHiddenElements, tabDisabledElements, tabEnabledElements, linkElements;

    function disableBgActions(id) {
        blockElements = angular.element("header,footer,main,section").not("section[cookie]");
        ariaHiddenElements = angular.element("[aria-hidden='true']").not("" + id + " [aria-hidden='true']");
        tabDisabledElements = angular.element("[tabindex='-1']").not("" + id + " [tabindex='-1']");
        tabEnabledElements = angular.element("[tabindex='0']").not("" + id + " [tabindex='0'], #cs-model [tabindex='0']");
        linkElements = angular.element("a").not("" + id + " a, #cs-model a");
        blockElements.attr("aria-hidden", "true");
        tabEnabledElements.attr("tabindex", "-1");
        linkElements.attr("tabindex", "-1");
    }

    function enableBgActions() {
        blockElements.attr("aria-hidden", "false");
        tabEnabledElements.attr("tabindex", "0");
        linkElements.attr("tabindex", "0");
        tabDisabledElements.attr("tabindex", "-1");
        ariaHiddenElements.attr("aria-hidden", "true");
    }




});


app.controller("homePanelController", function($scope) {

    $scope.activetab = "";
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        angular.element(".add-ons").attr("aria-hidden", "true");
    }
    $scope.navigateNext = function(event, tab) {
        event.preventDefault();
        $scope.activetab = tab;
        $('.bottom-left-text').hide();
        angular.element($('#tab-' + tab + ' .bottom-left-text')).show();
    }

    //$(window).resize(function () {
    //    if (angular.element(window).width() > 991) {
    //        angular.element(".add-ons").attr("aria-hidden", "false");
    //    } else {
    //        angular.element(".add-ons").attr("aria-hidden", "true");
    //    }
    //}).resize();

    $scope.bannerImageClick = function(tab) {
        //var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (!isMobile) {
            $scope.activetab = $scope.activetab == tab ? '' : tab;
            angular.element('.bottom-left-text').not(angular.element('#tab-' + tab + ' .bottom-left-text')).fadeOut();
            if ($scope.activetab == '') {
                angular.element($('.bottom-left-text')).fadeIn(1000);
            } else {
                //var datalayerevent = $('#tab-' + tab).attr('data-datalayerevent');
                window.dataLayer = window.dataLayer || [];
                dataLayer.push({
                    'event': $('#tab-' + tab).attr('data-datalayereventvalue'),
                    'slideName': $('#tab-' + tab).attr('data-datalayerbannername')
                });
            }

            angular.element($('#tab-' + tab + ' .bottom-left-text')).fadeIn(1000);
        }
    }
    if ($("#settings-countrycode").data("country").toLowerCase().trim() == "uk") {
        $('.image-container #tab-1').addClass('col-xs-6 col-sm-4 col-md-4 col-lg-4').removeClass('col-xs-4');
        $('.image-container #tab-2').addClass('col-sm-4 col-md-4 col-lg-4 hidden-xs').removeClass('col-xs-4');
        $('.image-container #tab-3').addClass('col-xs-6  col-sm-4 col-md-4 col-lg-4').removeClass('col-xs-4');
    }

    if ($("#settings-countrycode").data("country").toLowerCase().trim() == "in") {
        $('.image-container #tab-1').addClass('col-xs-6 col-sm-4 col-md-4 col-lg-4').removeClass('col-xs-4');
        $('.image-container #tab-2').addClass('col-sm-4 col-md-4 col-lg-4 hidden-xs').removeClass('col-xs-4');
        $('.image-container #tab-3').addClass('col-xs-6  col-sm-4 col-md-4 col-lg-4').removeClass('col-xs-4');
    }

    //angular.element(".img-feature").hover(function () {
    //    //var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    //    var tab = 1;
    //    if (!isMobile) {
    //        $scope.activetab = $scope.activetab == tab ? '' : tab;
    //        angular.element('.bottom-left-text').not(angular.element('#tab-' + tab + ' .bottom-left-text')).fadeOut();
    //        if ($scope.activetab == '') {
    //            angular.element($('.bottom-left-text')).fadeIn(1000);
    //        }

    //        angular.element($('#tab-' + tab + ' .bottom-left-text')).fadeIn(1000);
    //    }
    //});
});

app.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; i++)
            input.push(i);
        return input;
    };
});

/*
snowflakescore 1 - Gold
snowflakescore 2 - Silver
snowflakescore 3 - Blue
*/

//var rateCenter = [
//    { id: 'a7q1o000000IN0KAAW', snowflakescore: 1, coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN0LAAW', snowflakescore: 1, coolsculptingimage: 2 },
//    { id: 'a7q1o000000IMx9AAG', snowflakescore: 2, coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN0SAAW', snowflakescore: 2, coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN14AAG', snowflakescore: 3, coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN6DAAW', snowflakescore: 3 },
//    { id: 'a7q1o000000IMzJAAW', snowflakescore: 3, coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN58AAG', snowflakescore: 3, coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN5bAAG', snowflakescore: 3 },
//    { id: 'a7q1o000000IN12AAG', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN7GAAW', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN7SAAW', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN7wAAG', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN6TAAW', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IMz6AAG', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN45AAG', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IMwmAAG', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN4ZAAW', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IMz9AAG', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IMxbAAG', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN8IAAW', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN1uAAG', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN0NAAW', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IN6hAAG', coolsculptingimage: 2 },
//    { id: 'a7q1o000000IMyHAAW', coolsculptingimage: 2 }
//];

var rateCenter = [];
var radiusSelectedFlag = 0;
app.controller("clinicLocatorController", ['$scope', '$http', 'geoloc', '$q', '$compile', 'leaveWebsiteModalService', function($scope, $http, geoloc, $q, $compile, leaveWebsiteModalService) {
    var url = angular.element('.clinic-wrapper-inner').attr('data-geolocationapi'),
        deferred = $q.defer();
    var markers = [];
    var selectedcountrycode,
        selectedcountryname,
        countrydisplayname,
        veeva,
        countrydropdownselect = false;
    var markset, map, count, currentCount = 0,
        zoomDefault = 0;
    var domain = "";
    var changecountrydomain = "";
    var changecountrycode = "";
    var usemylocation = false;
    var url = window.location.href.toString();
    //APAC Hide All Clinic list link
    if ($("#settings-countrycode").data("country").toLowerCase().trim() == cAPAC) {
        $('.all-clinics-wrapper').hide();
    }

    //LATAM Country Dropdown
    if ($("#settings-isveeva").data("isveeva") == undefined && $("#settings-countrycode").data("country").toLowerCase().trim() == cLATAM && !(url.indexOf("quicksearch") >= 0)) {
        $('.cl-anchorsmea').hide();
        $("#searchbarmea").addClass("disabledbutton");
        var e = document.getElementById("selectCountryList");
        var defaultOption = e.options[e.selectedIndex].text;
        $("#fccountryselect").text(defaultOption);
        var op = document.getElementById("selectCountryList").getElementsByTagName("option");
        for (var i = 0; i < op.length; i++) {
            // lowercase comparison for case-insensitivity
            (op[i].label.toLowerCase() == "select your country") ?
            op[i].disabled = true: op[i].disabled = false;
        }
    }

    //On load Country Detection Function For MEA
    if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMEA && !(url.indexOf("quicksearch") >= 0)) {
        //other than MEA country
        veeva = $("#settings-isveeva").data("isveeva");
        if (veeva != "" && veeva != undefined) {
            var op = document.getElementById("selectCountryList").getElementsByTagName("option");
            var nonveeva = $("#nonveevacountryclinic").data("nonveevacountry");
            for (var i = 0; i < op.length; i++) {
                // lowercase comparison for case-insensitivity
                (op[i].label.toLowerCase() == "select your country") ?
                op[i].disabled = true: op[i].disabled = false;
            }
            domain = $.cookie('CountryCode');
            var optionvalue = "option" + "[" + "value=" + domain + "]";
            if ($(optionvalue)[0] != null) {
                veeva = $(optionvalue)[0].attributes[1].nodeValue;
            }
            $("#searchbarmea").removeClass("disabledbutton");


            //Non Veeva Countries
            if (veeva == "false") {
                $scope.srchTerm = $.cookie('CountryName');
                var noclinics = document.getElementById("noclinicsmea");
                //if (noclinics != null) {
                //    document.getElementById("allclinicsmea").style.display = "none";
                //}
                $('.cl-anchorsmea').hide();
                $("#searchbarmea").addClass("disabledbutton");
                $("#txt-center .all-clinics-wrapper").hide();
                if (history.pushState && $scope.srchTerm != '' && $scope.srchTerm != null && nonveeva.toLowerCase() == $scope.srchTerm.toLowerCase()) {
                    var sf = GlobalLocatorApproach == "1" ? "sf=1&" : "";
                    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?search=' + $scope.srchTerm;
                    window.history.pushState({ path: newurl }, '', newurl);
                    radiusSelectedFlag = 0;
                    currentCount = 0;
                    radius = 16.09;
                    $('section#noclinicsmea').css('display', 'none');
                } else {
                    $('section#noclinicsmea').css('display', 'block');
                }
            }

            //Veeva Countries
            else {
                $('section#noclinicsmea').css('display', 'none');
            }

            //CountryDropdown Clicked
            if (countrydropdownselect == true) {
                domain = selectedcountrycode;
            } else {
                domain = $.cookie('CountryCode');
                countrynamecookie = $.cookie('CountryName');
                $("#fccountryselect").text(countrynamecookie);
                $('.cl-anchorsmea ul li').hide();
                $('.meaquicksearch').show();
                $('.cl-anchorsmea ul li.' + domain.toLowerCase()).show();
            }
        }
        //Other country rather than MEA in MEA Site
        else {
            $('section#noclinicsmea').css('display', 'none');
            $('.cl-anchorsmea').hide();
            //document.getElementById("allclinicsmea").style.display = "none";
            domain = $.cookie('CountryCode');
            $("#searchbarmea").addClass("disabledbutton");
            var e = document.getElementById("selectCountryList");
            var defaultOption = e.options[e.selectedIndex].text;
            $("#fccountryselect").text(defaultOption);
            //$("#fccountryselect").text("Select your Country");
            //document.getElementById("contacusmea").style.display = "none";
            var op = document.getElementById("selectCountryList").getElementsByTagName("option");
            for (var i = 0; i < op.length; i++) {
                // lowercase comparison for case-insensitivity
                (op[i].label.toLowerCase() == "select your country") ?
                op[i].disabled = true: op[i].disabled = false;
            }
        }
    }
    //Other Countries
    else {
        domain = $("#settings-countrycode").data("country");
    }
      if ($("#settings-countrycode").data("country") != undefined && $("#settings-countrycode").data("country").toLowerCase().trim() == cLATAM) {
        $("#search").on('focus', function () {
            InitDynamicFilter();
        });
        $("#footerSearch").on('focus', function () {
            InitftrDynamicFilter();
        });
    }

    //Country Drop Down Select Function
    $("#selectCountryList").on("change", function() {
        selectedcountrycode = $(this).find(':selected').val().toLowerCase();
        websitecountrycode = selectedcountrycode;
        selectedcountryname = $(this).find(':selected').text().toLowerCase();
        countrydisplayname = $(this).find(':selected')[0].dataset.name.toLowerCase();
        veeva = $(this).find(':selected')[0].dataset.veeva;
        //if ($("#settings-countrycode").data("country").toLowerCase().trim() != cLATAM) {
        //    document.getElementById("contacusmea").style.display = "block";
        //}
        $(".btn-cs-wrapper.txt-center").css("display", "none");
        var nonveeva = $("#nonveevacountryclinic").data("nonveevacountry");
        $('.cl-anchorsmea').show();
        $("#searchbarmea").removeClass("disabledbutton");
        $('section#noclinicsmea').css('display', 'none');
        $('.clinicInfo-inner').css('display', 'none');
        $(".btn-cs.load-more").css("display", "none");
        var uri = window.location.href.toString();
        countrydropdownselect = true;
        changecountrydomain = selectedcountryname.trim();
        changecountrycode = selectedcountrycode.trim();
        var searchvalue = $('.find-clinic-input').val();
        if (uri.indexOf("?search") > 0 && searchvalue != null) {
            var clean_uri = uri.substring(0, uri.indexOf("?"));
            window.history.replaceState({}, document.title, clean_uri);
            $('.clinicInfo-inner').css('display', 'none');
        } else {
            $('div#meacountry').css('display', 'block');
        }
        if ($("#settings-countrycode").data("country").toLowerCase().trim() != cLATAM) {

            //Non Veeva Countries
            if (veeva == "false") {
                var value = true;
                $scope.srchTerm = countrydisplayname;
                var noclinics = document.getElementById("noclinicsmea");
                //if (noclinics != null) {
                //    document.getElementById("allclinicsmea").style.display = "none";
                //}
                $('section#noclinicsmea').css('display', 'block');
                if (history.pushState && $scope.srchTerm != '' && $scope.srchTerm != null) {
                    var sf = GlobalLocatorApproach == "1" ? "&iclcountrycode=" + selectedcountrycode : "";
                    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?search=' + $scope.srchTerm + sf;
                    window.history.pushState({ path: newurl }, '', newurl);
                    radiusSelectedFlag = 0;
                    currentCount = 0;
                    radius = 16.09;
                    $('section#noclinicsmea').css('display', 'none');
                    $('.clinicInfo-inner').css('display', 'block');
                    $('div#loadingDiv').css('display', 'block');
                }
                $('.cl-anchorsmea').hide();
                $("#searchbarmea").addClass("disabledbutton");
            }

            //Veeva Countries
            else {
                var noclinicvalue = document.getElementById("noclinicsmea");
                if (noclinicvalue != null) {
                    document.getElementById("noclinicsmea").style.display = "none";
                }
            }
        }
        value = false;
        $('.cl-anchorsmea ul li').hide();
        $('.meaquicksearch').show();
        $('.latamquicksearch').show();
        $('.cl-anchorsmea ul li.' + selectedcountrycode).show();
        $scope.initClinicLocator(count, value);
        setcountrytext($(this).find(':selected').text().trim());
        InitDynamicFilter();
        InitftrDynamicFilter();
        input = document.getElementById('search')
        input.value = '';
    });

    //// Dynamic AutoComplete 
    function InitDynamicFilter() {
        function fillInAddress() {
            //some custom logic
            console.log('place-name:' + this.getPlace().name);
        }
        var list = document.getElementById('selectCountryList'),
            input = document.getElementById('search'),
            autocomplete = new google.maps.places.Autocomplete(input, {
                types: ['(cities)']
            });
        google.maps.event.addListener(autocomplete, 'place_changed', fillInAddress);
        google.maps.event.addDomListener(list, 'change', function(e) {
            $('.pac-container').remove();
            var componentRestrictions = {};
            if (this.value !== '') {
                componentRestrictions.country = this.value
            }
            autocomplete.setComponentRestrictions(componentRestrictions);
            //input.value = '';
            if (e) {
                autocomplete.set('place', { name: '' });
            }
        });
        google.maps.event.trigger(list, 'change', null);
    }
    //End - Dynamic Autocomplete

function InitftrDynamicFilter() {
        function fillInAddress() {
            //some custom logic
            console.log('place-name:' + this.getPlace().name);
        }
        var list1 = document.getElementById('selectCountryList'),
            input1 = document.getElementById('footerSearch'),
            autocomplete1 = new google.maps.places.Autocomplete(input1, {
                types: ['(cities)']
            });
        google.maps.event.addListener(autocomplete1, 'place_changed', fillInAddress);
        google.maps.event.addDomListener(list1, 'change', function (e) {
            //$('.pac-container').remove();
            var componentRestrictions = {};
            if (this.value !== '') {
                componentRestrictions.country = this.value
            }
            autocomplete1.setComponentRestrictions(componentRestrictions);
            //input1.value = '';
            if (e) {
                autocomplete1.set('place', { name: '' });
            }
        });
        google.maps.event.trigger(list1, 'change', null);
}


    /*Singapore Email Service*/
    $scope.allclinicsemail = function() {
        //var email = $("input#Email").val();
        //if (($("input#Email").val() != "") && (document.getElementById("agreeconditions").checked == true)) {
        //    var formData = {
        //        "toAddress": $("input#Email").val(),
        //        "origin": document.location.origin
        //    };
        //    var emailvalidate = validateEmail(email);
        //    if (emailvalidate == true) {
        //        sendEmail(formData);
        //        document.getElementById("Email").value = '';
        //        $("#Invalidemail").css("display", "none");
        //    } else {
        //        $("#Invalidemail").css("display", "block");
        //        $("#errormessage").css("display", "none");
        //        $("#successmail").css("display", "none");
        //    }
        //} else {
        //    $("#errormessage").css("display", "block");
        //    $("#successmail").css("display", "none");
        //    $("#Invalidemail").css("display", "none");
        //}

        //function validateEmail(email) {
        //    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //    return re.test(String(email).toLowerCase());
        //}
        
        if ((document.getElementById("agreeconditions").checked == true)) {
            var clinicURL = document.getElementById("allclinicsURL").value;
            window.location.href = window.location.origin + clinicURL;
        }
        else {
            $("#errormessage").css("display", "block");           
        }
        
    }

    function sendEmail(formData) {
        var url = location.origin + "/sc/api/EmailNotification/SendMail";
        $.ajax({
            //url: '@Url.Action("SendMail", "EmailNotification")',
            url: url,
            cache: false,
            type: 'POST',
            dataType: 'json',
            data: formData,
            success: function(response) {
                $("#successmail").css("display", "block");
                $("#Invalidemail").css("display", "none");
                $("#errormessage").css("display", "none");
                document.getElementById("agreeconditions").checked = "";
            },
            error: function(request, error) {
                $("#Invalidemail").css("display", "block");
            }
        });
    }
    /* Singapore Email Service END */

    var glUrl = angular.element('#settings-cliniclocatorapi').data("api"),
        locationObject = {
            LogicFilter: domain,
            SearchTerm: "",
            SearchType: "",
            Radius: "",
            Latitude: "",
            Longitude: "",
            Apiurl: ""
        },

        myStyles = [{
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }],

        allClincsParam = '';
    if (($("#settings-isradius").data("radius") != undefined) && ($("#settings-isradius").data("radius") != null)) {
        var rad = $("#settings-isradius").data("radius");
        radius = rad;
    } else {
        radius = 16.09;
    }

    //if ($("#enableSorting").length > 0) {
    //if ($("#settings-countrycode").data("country").toLowerCase() == "uk") {
    //    radius = 80.4672;
    //}
    //Find a clinic page text alignment in search for poland site
    if ($("#settings-countrycode").data("country") == 'PL') {
        if ($(window).width() < 450) {
            $('#search').css('font-size', '12px');
        } else {
            $('#search').css('font-size', '14px');
        }
    }

    var zoomLevelCustom = 4;
    //initClinicLocator();
    $scope.initClinicLocator = function(limit, val) {
        if (val == true) {
            var url = $("#settings-geolocation").data("geolocationapi");
            $scope.srchTerm = "";
            count = limit;
            $scope.latitude = "";
            $scope.longitude = "";
            $scope.SearchType = "";
            $scope.countrySelected = false;
            $scope.locationRecords = [];
            var uri = window.location.href.toString();
            if (uri.indexOf("?") > 0) {
                var searchfield = window.location.href.slice(window.location.href.indexOf('?') + 1);
                //crm
                if (searchfield.toLowerCase().indexOf("quicksearch") >= 0) {
                    //GlobalLocatorApproach = GetQueryParameterValues('sf');
                    GlobalLocatorApproach == $("#settings-SFGlobalcliniclocator").attr("data-iclapproach");
                    ICLCountrycode = $("#settings-ICLCountryCode").attr("data-ICLCountryCodevalue");
                   // websitecountrycode = supportLowercaseURL ? getUrlParameter('iclcountrycode').toLowerCase() : getUrlParameter('iclcountrycode');
                }
                if (decodeURIComponent(searchfield.split('=')[0]).toLowerCase() == "quicksearch") {
                    //if ($("#settings-countrycode").data("country").toLowerCase().trim() != cMEA) {
                    //    $scope.srchTerm = getUrlQuery() + (($("#settings-countrycode") != undefined && $("#settings-countrycode").data("country") != undefined) ? (" " + $("#settings-countrycode").data("country")) : "");
                    //}
                    if ($("#settings-countrycode").data("country").toLowerCase().trim() == cSingapore) {
                        $scope.srchTerm = getUrlSgQuery() + (($("#settings-countrycode") != undefined && $("#settings-countrycode").data("country") != undefined) ? (" " + $("#settings-countrycode").data("country")) : "");                       
                    } else {
                        $scope.srchTerm = getUrlQuery();
                    }
                } else {
                    $scope.srchTerm = getUrlQuery();
                }
                $scope.latitude = getURLlat();
                $scope.longitude = getURLlong();
                $scope.SearchType = "City";
                //getGeoJSONsg($scope.srchTerm, $scope.latitude, $scope.longitude, $scope.SearchType);
                //GlobalLocatorApproach = GetQueryParameterValues('sf');
                if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
                    var urlquery = getUrlQuery();
                    if (urlquery.indexOf("&") > 0) {
                        urlquery = urlquery.split('&')[0];
                        $scope.srchTerm = urlquery;
                    } 

                    getGeoJSON_V2($scope.srchTerm);
                } else if ($scope.latitude != null && $scope.latitude != undefined && $scope.longitude != null && $scope.longitude != undefined && $scope.SearchType != null && $scope.SearchType != undefined) {
                    getGeoJSONsg($scope.srchTerm, $scope.latitude, $scope.longitude, $scope.SearchType);
                } else {
                    getGeoJSON($scope.srchTerm);
                }
            } else {
                geoloc.getLocation(url).then(function(coordinates) {
                    initMap(coordinates.coords.latitude, coordinates.coords.longitude);
                });
            }
        } else {
            var geocoder = new google.maps.Geocoder();
            var lat;
            var lon;
            count = limit;
            var uri = window.location.href.toString();
            if (uri.indexOf("?search") > 0) {
                $scope.srchTerm = getUrlQuery();
                $scope.srchTerm = $scope.srchTerm.capitalize();
                if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
                    var urlquery = getUrlQuery();
                    if (urlquery.indexOf("&") > 0) {
                        urlquery = urlquery.split('&')[0];
                    }                   
                    $scope.srchTerm = urlquery;
                    getGeoJSON_V2($scope.srchTerm);
                } else {
                    getGeoJSON($scope.srchTerm);
                }
            }
            var countryName = $("#settings-countryname").data("countryname");
            if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMEA || $("#settings-countrycode").data("country").toLowerCase().trim() == cAPAC) {
                if (countrydropdownselect == true) {
                    countryName = selectedcountryname;
                } else {
                    countryName = $.cookie('CountryName');
                }
            }
            if ($("#settings-countrycode").data("country").toLowerCase().trim() == cLATAM) {
                if (countrydropdownselect == true) {
                    countryName = selectedcountryname;
                } else {
                    countryName = "argentina";
                }
            }

            if (countryName != undefined) {
                geocoder.geocode({ 'address': countryName }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        lat = results[0].geometry.location.lat();
                        lon = results[0].geometry.location.lng();
                    } else {
                        setTimeout(function() { resultError() }, 1000);
                    }
                    zoomLevelCustom = 4;
                    zoomLevelCustom = parseInt($("#clinic-search").attr("data-zoom-level"));
                    initMap(lat, lon);
                });

            }
        }
        var moretext = $("#readmore").text();
        var lesstext = $("#lesstext").text();
        $('#cookie-reveal').on('hide.bs.collapse', function() {
            $('#cookie-reveal-toggle').text(moretext);
        });
        $('#cookie-reveal').on('show.bs.collapse', function() {
            $('#cookie-reveal-toggle').text(lesstext);
        });
        $("#cookie-reveal").on('shown.bs.collapse', function() {
            var Fheight = $('#cookie-law-info-bar').outerHeight();
            $(".footer-section").css("padding-bottom", Fheight + 'px');
        });
        $("#cookie-reveal").on('hidden.bs.collapse', function() {
            var Fheight = $('#cookie-law-info-bar').outerHeight();
            $(".footer-section").css("padding-bottom", Fheight + 'px');
        });
    }
    $scope.openWebsite = function(event) {
        leaveWebsiteModalService.initializeLeavingWebsiteModal();
        leaveWebsiteModalService.sendRequest(event);
    }

    $scope.openConsultationUnbounceForm = function(event) {
        event.preventDefault();
        var element = event.currentTarget;

        if (document.getElementsByClassName('ub-emb-container').length < 1 || document.getElementsByClassName('ub-emb-iframe').length < 1) {
            return;
        }

        var ubContainer = document.getElementsByClassName('ub-emb-container')[0];
        var ubIframe = document.getElementsByClassName('ub-emb-iframe')[0];
        var iframeSrc = ubIframe.src;

        var iframeLoaded = function() {
            ubContainer.classList.add('show');
        }

        ubContainer.classList.remove('show');
        ubIframe.addEventListener('load', iframeLoaded, true);
        ubIframe.src =
            iframeSrc + "&clinicName=" + encodeURIComponent(element.dataset.clinicName) +
            "&clinicAddress=" + encodeURIComponent(element.dataset.clinicAddress) +
            "&clinicPhone=" + encodeURIComponent(element.dataset.clinicPhone) +
            "&clinicEmail=" + encodeURIComponent(element.dataset.clinicEmail);
    }
    $("select#selectRadiusList").change(function() {
        $(this).find("option:selected").each(function() {
            setradiustext($(this).text());
            if ($(this).val() > 0)
                radiusSelectedFlag = 1;
            else
                radiusSelectedFlag = 0;
        });
    });

    setradiustext($("#selectRadiusList option:selected").text());
    $scope.disableIECloseIcon = function() {
        if (domain != undefined && domain.toLowerCase().trim() === "uk") {
            $("#search").addClass("fcsearch");
        }
    }

    $("select#selectRadiusList").keydown(function(event) {
        if (event.which == 13) {
            event.stopImmediatePropagation();
            $(this).blur();
        }
    });
    // $(window).on('hashchange', function(e) {
    //     init();
    // }); 
    function initMap(latitude, longitude) {
        if ($("#settings-countrycode").data("country").toLowerCase() == cSingapore) {
            zoomLevelCustom = 12;
        }
        var latlon = new google.maps.LatLng(latitude, longitude); // sample location to start with: Chennai, India
        var myOptions = {
            center: latlon,
            zoom: zoomLevelCustom,
            styles: myStyles,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true
        }
        if (document.getElementById("mapView") != null) {
            map = new google.maps.Map(document.getElementById("mapView"), myOptions);
            //var GeoMarker = new GeolocationMarker(map);
            var im = angular.element('#markerIcon').attr('data-src');
            var userMarker = new google.maps.Marker({
                position: latlon,
                map: map,
                icon: im
            });
        }
    }
    //use my location -click
    $scope.curLocSelect = function() {
        var cookieVal = getCookie('coolsculpting_cp');
        var gdpr = $("#settings-isgdpr").data("gdpr");
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMEA) {
            $("#fccountryselect").text("Select your Country");
            $(".cl-anchorsmea").css("display", "none");
        }
        IsUseMyLocationSelected = true;
        usemylocation = true;
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMEA) {
            if (countrydropdownselect == true) {
                $('div#meacountry').css('display', 'block');
                $('.clinicInfo-inner').css('display', 'block');
            }
        }
        gdpr = gdpr.toLowerCase();
        if (gdpr == "true") {
            if (cookieVal == 'false' || cookieVal === undefined || cookieVal == "") {
                $('#usemylocation').modal({ backdrop: 'static', keyboard: false }, 'show');
            } else {
                //   fetch curnt city
                url = angular.element('#settings-geolocation').attr('data-geolocationapi');
                geoloc.getLocation(url).then(function(coordinates) {
                    geoloc.fetchCurrentCity(coordinates).then(function(city) {
                        $scope.srchTerm = city.long_name;
                        if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
                            getGeoJSON_V2($scope.srchTerm);
                        } else {
                            getGeoJSON($scope.srchTerm);
                        }

                    });
                });
                zoomLevelCustom = 13;
                //  tryGeolocation();
            }
        } else {
            //fetch curnt city
            url = angular.element('#settings-geolocation').attr('data-geolocationapi');
            geoloc.getLocation(url).then(function(coordinates) {
                geoloc.fetchCurrentCity(coordinates).then(function(city) {
                    $scope.srchTerm = city.long_name;
                    if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
                        getGeoJSON_V2($scope.srchTerm);
                    } else {
                        getGeoJSON($scope.srchTerm);
                    }
                });
            });
            zoomLevelCustom = 13;
            // tryGeolocation();
        }
    }

    var tryAPIGeolocation = function() {
        url = angular.element('#settings-geolocation').attr('data-geolocationapi');
        geoloc.getLocation(url).then(function(coordinates) {
            geoloc.fetchCurrentCity(coordinates).then(function(city) {
                $scope.srchTerm = city.long_name;
                if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
                    getGeoJSON_V2($scope.srchTerm);
                } else {
                    getGeoJSON($scope.srchTerm);
                }

            });
        });
        zoomLevelCustom = 13;
    };


    var browserGeolocationSuccess = function(position) {
        //alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        geoloc.fetchCurrentCity(position).then(function(city) {
            $scope.srchTerm = city.long_name;
            if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
                getGeoJSON_V2($scope.srchTerm);
            } else {
                getGeoJSON($scope.srchTerm);
            }
        });

        // need to implement the our code. we can able to fetch the lat long of the device.


    };


    var browserGeolocationFail = function(error) {
        switch (error.code) {
            case error.TIMEOUT:
                tryAPIGeolocation();
                break;
            case error.PERMISSION_DENIED:
                if (error.message.indexOf("Only secure origins are allowed") == 0) {
                    tryAPIGeolocation();
                }
                break;
            case error.POSITION_UNAVAILABLE:
                tryAPIGeolocation();
                break;
        }
    };

    var tryGeolocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                browserGeolocationSuccess,
                browserGeolocationFail, { maximumAge: 50000, timeout: 20000, enableHighAccuracy: true });
        }
    };

    //$("#enableSorting").on("change", function () {
    //    radius = 80.4672;
    //    $scope.sortClinic();
    //});

    var IsUseMyLocationSelected = false;
    $('#usemylocationSubmit').on('click', function(event) {
        setCookie('coolsculpting_cp', true, 7);
        $('#usemylocation').modal('hide');
        $scope.curLocSelect();
        $("#cookie-law-info-bar").animate({
            height: "0",
            marginBottom: "-20"
        }, 1000, function() {
            //$('#cookie-law-info-bar').hide();
            $('#newcookieModal').hide();
            $(".footer-section").css("padding-bottom", '0px');
        });
    });
    $(document).click(function(event) {
        if ($(event.target).closest("#usemylocation").get(0) != null) {
            $('#usemylocation').modal('hide');
        }
    });

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";secure" + ";" + expires + ";path=/";
    }

    // get a cookie
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    var cs_lat = "";
    var cs_long = "";
    var cs_type = "";
    $scope.fninitializeautocomplete = function() {
        var addressInputElement = $('#search');
        addressInputElement.on('focus', function() {
            var pacContainer = $('.pac-container');
            $(addressInputElement.parent()).append(pacContainer);
        });


        var input = document.getElementById('search');
        var options = {
            componentRestrictions: { country: domain }
        };
        var autocomplete = new google.maps.places.Autocomplete(input, options);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();

            if (place.geometry) {
                cs_lat = place.geometry.location.lat();
                cs_long = place.geometry.location.lng();
                console.log(cs_lat);
                console.log(cs_long);
            }
            if (place.types) {
                cs_type = place.types[0];
                console.log(place.types[0]);
            }
        });
    }
    $(document).on('keypress', function(event) {
        event.stopPropagation();
        searchClinicEvent(event);
    });
    $scope.searchClinic = function(event) {
        searchClinicEvent(event);
    }

    function searchClinicEvent(event) {
        var value = true;
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMEA) {
            if (countrydropdownselect == true) {
                $('div#meacountry').css('display', 'block');
                $('.clinicInfo-inner').css('display', 'block');
                $(".btn-cs.load-more").css("display", "");
                $(".btn-cs-wrapper.txt-center").css("display", "block");
            }
        }
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == cLATAM) {
            if (countrydropdownselect == true) {
                $('div#meacountry').css('display', 'block');
                $('.clinicInfo-inner').css('display', 'block');
            }
        }
        if (event.which == 13) {
            radiusSelectedFlag = 0;
            $scope.srchTerm = $('.find-clinic-input').val();
            //setQuerystring(srchTerm);
            //getGeoJSON($scope.srchTerm);
            //window.location.href = "findaclinic?search=" + $scope.srchTerm;
            if (history.pushState && $scope.srchTerm != '' && $scope.srchTerm != null) {
                var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?search=' + $scope.srchTerm;
                window.dataLayer = window.dataLayer || [];

                dataLayer.push({
                    'searchTerm': $('.find-clinic-input').val(),
                    'event': 'searchPerformed'
                });
                window.history.pushState({ path: newurl }, '', newurl);
                $scope.initClinicLocator(count, value);
            }
        }
    }
    $scope.sortClinic = function() {
        var value = true;

        $scope.srchTerm = $('.find-clinic-input').val();
        //setQuerystring(srchTerm);
        //getGeoJSON($scope.srchTerm);
        //window.location.href = "findaclinic?search=" + $scope.srchTerm;
        if (history.pushState && $scope.srchTerm != '' && $scope.srchTerm != null) {
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?search=' + $scope.srchTerm;
            //window.dataLayer = window.dataLayer || [];

            //dataLayer.push({
            //    'searchTerm': $('.find-clinic-input').val(),
            //    'event': 'searchPerformed'
            //});
            //window.history.pushState({ path: newurl }, '', newurl);
            $scope.initClinicLocator(count, value);
        }
    }
    $scope.searchIconClick = function() {
        var value = true;
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMEA) {
            if (countrydropdownselect == true) {
                $('div#meacountry').css('display', 'block');
                $('.clinicInfo-inner').css('display', 'block');
                $(".btn-cs.load-more").css("display", "");
                $(".btn-cs-wrapper.txt-center").css("display", "block");
            }
        }
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == cLATAM) {
            if (countrydropdownselect == true) {
                $('div#meacountry').css('display', 'block');
                $('.clinicInfo-inner').css('display', 'block');
            }
        }
        //setQuerystring(srchTerm);
        //getGeoJSON($scope.srchTerm);
        $scope.srchTerm = $('.find-clinic-input').val();
        //$(event.currentTarget).attr('href', "findaclinic?search=" + $scope.srchTerm);
        if ($scope.srchTerm == '' || $scope.srchTerm == null) {
            $('#errorModal').modal();
            $('#errorModal').on('shown.bs.modal', function() {
                $("#errorModal .modal-body").html($("#searchErr").html());
            });
        } else if (history.pushState) {
            var sf = GlobalLocatorApproach == "1" ? "sf=1&" : "";
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?search=' + $scope.srchTerm;
            if (GlobalLocatorApproach == "1" && selectedcountrycode != undefined && selectedcountrycode != "") {
                newurl = newurl + "&iclcountrycode=" + selectedcountrycode;
            }

            window.history.pushState({ path: newurl }, '', newurl);
            radiusSelectedFlag = 0;
            currentCount = 0;
            if ($('#selectRadiusList').val() == 0) {
                radius = 16.09;
            }
            $scope.initClinicLocator(count, value);
        }
        //dataLayer.push({
        //    searchTerm: '[' + $scope.srchTerm + ']',
        //    event: 'searchPerformed'
        //}); 
    }
    String.prototype.capitalize = function() {
        return this.replace(/(^|\s)([a-z])/g, function(m, p1, p2) { return p1 + p2.toUpperCase(); });
    };

    function getGeoJSON(searchTerm) {
        var convertedRadius = "Default";
        var domain = "";
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMEA || $("#settings-countrycode").data("country").toLowerCase().trim() == cAPAC) {
            var countryCodeParameter = GetUrlParameter("countryCode");
            if (countryCodeParameter) {
                domain = countryCodeParameter
            } else if (countrydropdownselect == true) {
                domain = selectedcountrycode;
            } else {
                domain = $.cookie('CountryCode');
            }
        } else {
            domain = $("#settings-countrycode").data("country");
        }
        $scope.locationLimit = count;
        if (!$scope.$$phase) {
            $scope.$apply(function() {
                $scope.loader = true;
            });
        } else {
            $scope.loader = true;
        }
        locationObject = {
            LogicFilter: domain,
            SearchTerm: searchTerm.capitalize(),
            SearchType: "",
            Radius: radius,
            Latitude: "",
            Longitude: "",
            Apiurl: glUrl,
            ChangeCountry: countrydisplayname,
            ChangeCountryCode: changecountrycode,
            Usemyloc: usemylocation
        };

        //Find Lat/Long/SearchType

        var geocoder = new google.maps.Geocoder();
        var lat_val;
        var lng_val;
        var IsUsrCountryUS = false;
        var IszipCountryUS = false;
        var addressSearch;
        var cTaiwan = "TW";
        //if ($('#quick-search').length > 0) {
        //    addressSearch = searchTerm + ',' + domain;
        //}
        //else {
        //    addressSearch = searchTerm;
        //}
        addressSearch = searchTerm + ',' + domain;
        if (IsUseMyLocationSelected) {
            cs_lat = "";
            cs_long = "";
        }
        if (cs_lat.length == 0 || cs_long.length == 0) {
            if (geocoder) {
                IsUseMyLocationSelected = false;
                geocoder.geocode({ 'address': addressSearch }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var indexToUse = 0;
                        if (IsUsrCountryUS) {
                            for (var k = 0; k < results[0].address_components.length; k++) {
                                var usrResult = results[0].address_components[k];
                                //Loop through result types until matching one found
                                //Set logic filter once country is found
                                if (usrResult.types[0] == "country") {
                                    var usrCountrycode = usrResult.short_name;
                                    if (usrCountrycode == "US") {
                                        IszipCountryUS = true;
                                    }
                                    break;
                                }
                            }
                        } else {
                            searchTerm = results[indexToUse].formatted_address;
                        }

                        //Get Lat/Long
                        //Set search location pin to search term lat/long
                        locationObject.Latitude = results[indexToUse].geometry.location.lat();
                        locationObject.Longitude = results[indexToUse].geometry.location.lng();

                        //Get SearchType
                        //Valid options: Proximity, Address, City, StateProvince, PostalCode, Country
                        var type;
                        switch (results[indexToUse].types[0]) {

                            case "locality":
                            case "sublocality_level_1":
                            case "sublocality_level_2":
                                if (IsUsrCountryUS) {
                                    resultError();
                                    return false;
                                } else {
                                    locationObject.SearchType = "City"
                                        //If locality, look through address components, and find the one labelled "locality"
                                        //This pulls out the city name, and ignores other address components.
                                    getSearchTerm(results, results[indexToUse].types[0]);
                                    getCountry(results);
                                    break;
                                }

                            case "postal_code":
                                if (IsUsrCountryUS) {
                                    if (IszipCountryUS) {
                                        locationObject.SearchType = "PostalCode";
                                        getCountry(results);
                                        break;
                                    } else {
                                        locationObject.SearchType = "PostalCode";
                                        getCountry(results);
                                        break;
                                        //resultError(0);
                                        //return false;
                                    }
                                } else {
                                    locationObject.SearchType = "PostalCode";
                                    getCountry(results);
                                    break;
                                }

                            case "country":
                                locationObject.SearchType = "Country";
                                getSearchTerm(results, "Country");
                                // Set logic filter based on country name
                                setLogicFilter(locationObject.SearchTerm.capitalize());
                                break;

                            case "administrative_area_level_1":
                                //If administrative_area_level_1, look through address components, and find the one labelled "locality"
                                //This pulls out the state/province name, and ignores other address components.
                                if (IsUsrCountryUS) {
                                    resultError();
                                    return false;
                                } else {
                                    getSearchTerm(results, "administrative_area_level_1");
                                    locationObject.SearchType = "StateProvince";
                                    getCountry(results);
                                    break;
                                }

                            case "administrative_area_level_2":
                                //If administrative_area_level_2, look through address components, and find the one labelled "locality"
                                //This pulls out the state/province name, and ignores other address components.
                                if (IsUsrCountryUS) {
                                    resultError();
                                    return false;
                                } else {
                                    getSearchTerm(results, "administrative_area_level_2");
                                    locationObject.SearchType = "StateProvince";
                                    getCountry(results);
                                    break;
                                }

                                //ignore continents, "grand canyon", "pacific ocean", etc.
                            case "natural_feature":
                            case "continent":
                                resultError();
                                //Kill the function.
                                return false;

                            case "street_address":
                            default:
                                if (IsUsrCountryUS) {
                                    locationObject.SearchType = "PostalCode";
                                    getCountry(results);
                                    break;
                                } else {
                                    if (locationObject.LogicFilter == cTaiwan) {
                                        locationObject.SearchType = "Country";
                                    } else {
                                        locationObject.SearchType = "Proximity";
                                    }
                                    getCountry(results);
                                    break;
                                }
                        }

                        //Here Be Hacky Exceptions

                        if (locationObject.SearchTerm.capitalize() == "Phoenix" && locationObject.Radius == -1) {
                            locationObject.Radius = 22.53;
                        }

                        var ddlradius = $("#selectRadiusList option:selected").val();
                        var radiusparsed = 0;
                        if (ddlradius !== undefined) {
                            radiusparsed = parseInt(ddlradius);
                        }
                        if (radiusparsed > 0) {
                            locationObject.Radius = radiusparsed / 0.62137;
                        }
                        if (locationObject.SearchTerm.toLowerCase().indexOf("ireland") >= 0 && radiusparsed === 0) {
                            radius = 160.93470;
                            locationObject.Radius = radius;
                        }
                        if (locationObject.SearchTerm.toLowerCase().indexOf("london") >= 0 &&
                            locationObject.Radius < 40 &&
                            radiusparsed == 0) {
                            radius = 40.2336;
                            locationObject.Radius = radius;
                        }
                        /*$http.get('json/cliniLoc.json')
                       .success(function (data) {
                           pulledData = data;
                           setTimeout(function () { geoJSONCallback(); }, 1000);
                           function geoJSONCallback() {
                               //if state search or country search error code:
                               if (pulledData.locations_count < 0) {
                                   resultError();
                               }
                               else if (pulledData.locations_count != 0) {
    
                                   $.each(data.locations, function (i, item) {
                                       this.distance = (this.distance * 0.621371192).toFixed(2);;
                                   });
    
                                   sortPractices(data, searchTerm);
    
                               } else {
                                   resultError();
                               }
                           }
                           deferred.resolve();
                       });*/


                        var url = location.origin + "/sc/api/findclinic/GetClinicResults";
                        $.ajax({
                            url: url,
                            cache: false,
                            type: 'POST',
                            dataType: 'json',
                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            data: {
                                __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val(),
                                'requestdata': locationObject
                            },
                            success: function(response) {

                                if (response.data.IsValid && response.data.Code == "200" && response.data.Message != null) {

                                    var pulledData = JSON.parse(response.data.Message);
                                    setTimeout(function() { geoJSONCallback(); }, 1000);

                                    function geoJSONCallback() {
                                        //if state search or country search error code:
                                        if (pulledData.locations_count <= 0) {
                                            resetmap(locationObject.Latitude, locationObject.Longitude);
                                            resultError();
                                        } else {
                                            var KMdistance = $("#settings-isdistanceinkm").data("distanceinkm");
                                            if (KMdistance.toLowerCase() == "true") {
                                                $.each(pulledData.locations, function(i, item) {
                                                    this.distance = (this.distance * 1).toFixed(2);
                                                    this.distancekey = " km";

                                                    var uid = this.id;
                                                    var obj = rateCenter.find(function(element) {
                                                        if (element.id == uid)
                                                            return element;
                                                    });
                                                    if (obj != undefined && obj.snowflakescore != undefined) {
                                                        this.snowflakescore = obj.snowflakescore;
                                                    }
                                                });
                                            } else {
                                                $.each(pulledData.locations, function(i, item) {
                                                    if (this.distance == undefined) {
                                                        $(".ci-distance.ng-binding").css("display", "none");
                                                    } else {
                                                        this.distance = (this.distance * 0.621371192).toFixed(2);
                                                        this.distancekey = " mi";
                                                        var uid = this.id;
                                                        var obj = rateCenter.find(function(element) {
                                                            if (element.id == uid)
                                                                return element;
                                                        });
                                                    }

                                                    if (obj != undefined && obj.snowflakescore != undefined) {
                                                        this.snowflakescore = obj.snowflakescore;
                                                    }
                                                });
                                            }
                                            if (ddlradius !== undefined) {
                                                if (radiusparsed !== 0) {
                                                    pulledData.locations = $.map(pulledData.locations, function(value, key) {
                                                        if (value.distance <= radiusparsed) {
                                                            return value;
                                                        }
                                                    });
                                                }
                                            }
                                            if (currentCount < pulledData.locations_count) {
                                                sortPractices(pulledData, searchTerm);
                                            } else {
                                                if (!$scope.$$phase) {
                                                    $scope.$apply(function() {
                                                        $scope.loader = false;
                                                    });
                                                } else {
                                                    $scope.loader = false;
                                                }
                                            }

                                        }
                                    }


                                } else if (response.data.Code == "505" && response.data.Message != null) {
                                    $('section#noclinicsmea').css('display', 'block');
                                    $('div#loadingDiv').css('display', 'none');
                                    $('.clinicInfo-inner').css('display', 'none');
                                } else {
                                    resultError();
                                }
                            },
                            error: function(response) {
                                resultError();
                            }
                        });

                    } else {
                        $scope.loader = false;
                        $('div#loadingDiv').css('display', 'none');
                        $('#errorModal').modal();
                        $('#errorModal').on('shown.bs.modal', function() {
                            $("#errorModal .modal-body").html($("#searchErr").html());
                        });
                    }
                })
            };
        } else {

            //Get Lat/Long
            //Set search location pin to search term lat/long
            locationObject.Latitude = cs_lat;
            locationObject.Longitude = cs_long;

            //Get SearchType
            //Valid options: Proximity, Address, City, StateProvince, PostalCode, Country
            var type;
            switch (cs_type) {
                case "locality":
                case "sublocality_level_1":
                case "sublocality_level_2":
                    locationObject.SearchType = "City";
                    break;
                case "postal_code":
                    locationObject.SearchType = "PostalCode";
                    break;
                case "country":
                    locationObject.SearchType = "Country";
                    break;
                case "administrative_area_level_1":
                    locationObject.SearchType = "StateProvince";
                    break;
                case "administrative_area_level_2":
                    locationObject.SearchType = "StateProvince";
                    break;
                    //ignore continents, "grand canyon", "pacific ocean", etc.
                case "natural_feature":
                case "continent":
                    resultError();
                    //Kill the function.
                    return false;
                case "street_address":
                default:
                    if (IsUsrCountryUS) {
                        locationObject.SearchType = "PostalCode";
                        break;
                    } else {
                        if (locationObject.LogicFilter == cTaiwan) {
                            locationObject.SearchType = "Country";
                        } else {
                            locationObject.SearchType = "Proximity";
                        }
                        break;
                    }
            }

            //Here Be Hacky Exceptions

            if (locationObject.SearchTerm.capitalize() == "Phoenix" && locationObject.Radius == -1) {
                locationObject.Radius = 22.53;
            }

            var ddlradius = $("#selectRadiusList option:selected").val();
            var radiusparsed = 0;
            if (ddlradius !== undefined) {
                radiusparsed = parseInt(ddlradius);
            }
            if (radiusparsed > 0) {
                locationObject.Radius = radiusparsed / 0.62137;
            }
            if (locationObject.SearchTerm.toLowerCase().indexOf("ireland") >= 0 && radiusparsed === 0) {
                radius = 160.93470;
                locationObject.Radius = radius;
            }
            if (locationObject.SearchTerm.toLowerCase().indexOf("london") >= 0 &&
                locationObject.Radius < 40 &&
                radiusparsed == 0) {
                radius = 40.2336;
                locationObject.Radius = radius;
            }


            var url = location.origin + "/sc/api/findclinic/GetClinicResults";
            $.ajax({
                url: url,
                cache: false,
                type: 'POST',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val(),
                    'requestdata': locationObject
                },
                success: function(response) {

                    if (response.data.IsValid && response.data.Code == "200" && response.data.Message != null) {

                        var pulledData = JSON.parse(response.data.Message);
                        setTimeout(function() { geoJSONCallback(); }, 1000);

                        function geoJSONCallback() {
                            //if state search or country search error code:
                            if (pulledData.locations_count <= 0) {
                                resetmap(locationObject.Latitude, locationObject.Longitude);
                                resultError();
                            } else {
                                var KMdistance = $("#settings-isdistanceinkm").data("distanceinkm");
                                if (KMdistance.toLowerCase() == "true") {
                                    $.each(pulledData.locations, function(i, item) {
                                        this.distance = (this.distance * 1).toFixed(2);
                                        this.distancekey = " km";

                                        var uid = this.id;
                                        var obj = rateCenter.find(function(element) {
                                            if (element.id == uid)
                                                return element;
                                        });
                                        if (obj != undefined && obj.snowflakescore != undefined) {
                                            this.snowflakescore = obj.snowflakescore;
                                        }
                                    });
                                } else {
                                    $.each(pulledData.locations, function(i, item) {
                                        if (this.distance == undefined) {
                                            $(".ci-distance.ng-binding").css("display", "none");
                                        } else {
                                            this.distance = (this.distance * 0.621371192).toFixed(2);
                                            this.distancekey = " mi";
                                            var uid = this.id;
                                            var obj = rateCenter.find(function(element) {
                                                if (element.id == uid)
                                                    return element;
                                            });
                                        }

                                        if (obj != undefined && obj.snowflakescore != undefined) {
                                            this.snowflakescore = obj.snowflakescore;
                                        }
                                    });
                                }
                                if (ddlradius !== undefined) {
                                    if (radiusparsed !== 0) {
                                        pulledData.locations = $.map(pulledData.locations, function(value, key) {
                                            if (value.distance <= radiusparsed) {
                                                return value;
                                            }
                                        });
                                    }
                                }
                                if (currentCount < pulledData.locations_count) {
                                    sortPractices(pulledData, searchTerm);
                                } else {
                                    if (!$scope.$$phase) {
                                        $scope.$apply(function() {
                                            $scope.loader = false;
                                        });
                                    } else {
                                        $scope.loader = false;
                                    }
                                }

                            }
                        }


                    } else if (response.data.Code == "505" && response.data.Message != null) {
                        $('section#noclinicsmea').css('display', 'block');
                        $('div#loadingDiv').css('display', 'none');
                        $('.clinicInfo-inner').css('display', 'none');
                    } else {
                        resultError();
                    }
                },
                error: function(response) {
                    resultError();
                }
            });
        }

    }

    //****************************************************Singapore clinic locator approach*********************************************************************
    function getGeoJSONsg(searchTerm, latitude, longitude, searchType) {
        var convertedRadius = "Default";
        var domain = "";
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMEA) {
            domain = $.cookie('CountryCode');
        } else {
            domain = $("#settings-countrycode").data("country");
        }
        $scope.locationLimit = count;
        if (!$scope.$$phase) {
            $scope.$apply(function() {
                $scope.loader = true;
            });
        } else {
            $scope.loader = true;
        }
        locationObject = {
            LogicFilter: domain,
            SearchTerm: searchTerm.capitalize(),
            SearchType: searchType,
            Radius: radius,
            Latitude: latitude,
            Longitude: longitude,
            Apiurl: glUrl
        };

        //Find Lat/Long/SearchType

        var geocoder = new google.maps.Geocoder();
        //var lat_val;
        //var lng_val;
        var IsUsrCountryUS = false;
        var IszipCountryUS = false;
        var addressSearch;
        //if ($('#quick-search').length > 0) {
        //    addressSearch = searchTerm + ',' + domain;
        //}
        //else {
        //    addressSearch = searchTerm;
        //}
        addressSearch = searchTerm + ',' + domain;
        if (geocoder) {
            geocoder.geocode({ 'address': addressSearch }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var indexToUse = 0;
                    if (IsUsrCountryUS) {
                        for (var k = 0; k < results[0].address_components.length; k++) {
                            var usrResult = results[0].address_components[k];
                            //Loop through result types until matching one found
                            //Set logic filter once country is found
                            if (usrResult.types[0] == "country") {
                                var usrCountrycode = usrResult.short_name;
                                if (usrCountrycode == "US") {
                                    IszipCountryUS = true;
                                }
                                break;
                            }
                        }
                    } else {
                        searchTerm = results[indexToUse].formatted_address;
                    }

                    //Get Lat/Long
                    //Set search location pin to search term lat/long
                    locationObject.Latitude = latitude;
                    locationObject.Longitude = longitude;
                    locationObject.SearchType = searchType;
                    //Get SearchType
                    //Valid options: Proximity, Address, City, StateProvince, PostalCode, Country
                    var type;
                    //Here Be Hacky Exceptions

                    if (locationObject.SearchTerm.capitalize() == "Phoenix" && locationObject.Radius == -1) {
                        locationObject.Radius = 22.53;
                    }

                    var ddlradius = $("#selectRadiusList option:selected").val();
                    var radiusparsed = 0;
                    if (ddlradius !== undefined) {
                        radiusparsed = parseInt(ddlradius);
                    }
                    if (radiusparsed > 0) {
                        locationObject.Radius = radiusparsed / 0.62137;
                    }
                    if (locationObject.SearchTerm.toLowerCase().indexOf("ireland") >= 0 && radiusparsed === 0) {
                        radius = 160.93470;
                        locationObject.Radius = radius;
                    }
                    if (locationObject.SearchTerm.toLowerCase().indexOf("london") >= 0 &&
                        locationObject.Radius < 40 &&
                        radiusparsed == 0) {
                        radius = 40.2336;
                        locationObject.Radius = radius;
                    }
                    /*$http.get('json/cliniLoc.json')
                        .success(function (data) {
                            pulledData = data;
                            setTimeout(function () { geoJSONCallback(); }, 1000);
                            function geoJSONCallback() {
                                //if state search or country search error code:
                                if (pulledData.locations_count < 0) {
                                    resultError();
                                }
                                else if (pulledData.locations_count != 0) {

                                    $.each(data.locations, function (i, item) {
                                        this.distance = (this.distance * 0.621371192).toFixed(2);;
                                    });

                                    sortPractices(data, searchTerm);

                                } else {
                                    resultError();
                                }
                            }
                            deferred.resolve();
                        });*/


                    var url = location.origin + "/sc/api/findclinic/GetClinicResults";
                    $.ajax({
                        url: url,
                        cache: false,
                        type: 'POST',
                        dataType: 'json',
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        data: {
                            __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val(),
                            'requestdata': locationObject
                        },
                        success: function(response) {

                            if (response.data.IsValid && response.data.Code == "200" && response.data.Message != null) {

                                var pulledData = JSON.parse(response.data.Message);
                                setTimeout(function() { geoJSONCallback(); }, 1000);

                                function geoJSONCallback() {
                                    //if state search or country search error code:
                                    if (pulledData.locations_count <= 0) {                                       
                                        resultError();
                                    } else {
                                        var KMdistance = $("#settings-isdistanceinkm").data("distanceinkm");
                                        if (KMdistance.toLowerCase() == "true") {
                                            $.each(pulledData.locations, function(i, item) {
                                                this.distance = (this.distance * 1).toFixed(2);
                                                this.distancekey = " km";

                                                var uid = this.id;
                                                var obj = rateCenter.find(function(element) {
                                                    if (element.id == uid)
                                                        return element;
                                                });
                                                if (obj != undefined && obj.snowflakescore != undefined) {
                                                    this.snowflakescore = obj.snowflakescore;
                                                }
                                            });
                                        } else {
                                            $.each(pulledData.locations, function(i, item) {
                                                this.distance = (this.distance * 0.621371192).toFixed(2);
                                                this.distancekey = " mi";
                                                var uid = this.id;
                                                var obj = rateCenter.find(function(element) {
                                                    if (element.id == uid)
                                                        return element;
                                                });

                                                if (obj != undefined && obj.snowflakescore != undefined) {
                                                    this.snowflakescore = obj.snowflakescore;
                                                }
                                            });
                                        }
                                        if (ddlradius !== undefined) {
                                            if (radiusparsed !== 0) {
                                                pulledData.locations = $.map(pulledData.locations, function(value, key) {
                                                    if (value.distance <= radiusparsed) {
                                                        return value;
                                                    }
                                                });
                                            }
                                        }
                                        if (currentCount < pulledData.locations_count) {
                                            sortPractices(pulledData, searchTerm);
                                        } else {
                                            if (!$scope.$$phase) {
                                                $scope.$apply(function() {
                                                    $scope.loader = false;
                                                });
                                            } else {
                                                $scope.loader = false;
                                            }
                                        }

                                    }
                                }


                            } else {
                                resultError();
                            }
                        },
                        error: function(response) {
                            resultError();
                        }
                    });

                } else {
                    $scope.loader = false;
                    $('div#loadingDiv').css('display', 'none');
                    $('#errorModal').modal();
                    $('#errorModal').on('shown.bs.modal', function() {
                        $("#errorModal .modal-body").html($("#searchErr").html());
                    });
                }
            })
        };
    }
    //**************************************************** END Singapore clinic locator approach*********************************************************************


    // Global clinic locator approach
    function getGeoJSON_V2(searchTerm) {

       
        var countrysearch = "Country";
        var convertedRadius = "Default";
        var domain = "";
        var countryCodeParameter = GetUrlParameter("countrycode");
        if (countryCodeParameter) {
            domain = countryCodeParameter;
        } else if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMEA) {
            if (countrydropdownselect == true) {
                domain = selectedcountrycode;
            } else {
                domain = $.cookie('CountryCode').capitalize();
            }
        } else {
            domain = $("#settings-countrycode").data("country");
        }
        $scope.locationLimit = count;
        if (!$scope.$$phase) {
            $scope.$apply(function() {
                $scope.loader = true;
            });
        } else {
            $scope.loader = true;
        }
        locationObject = {
            LogicFilter: domain,
            SearchTerm: searchTerm.capitalize(),
            SearchType: "",
            Radius: radius,
            Latitude: "",
            Longitude: "",
            Apiurl: glUrl
        };

        //Find Lat/Long/SearchType


        var lat_val;
        var lng_val;
        var IsUsrCountryUS = false;
        var IszipCountryUS = false;
        var addressSearch;
        addressSearch = searchTerm + ',' + domain;


        if (IsUseMyLocationSelected) {
            cs_lat = "";
            cs_long = "";
        }
        if (cs_lat.length == 0 || cs_long.length == 0) {
            var geocoder = new google.maps.Geocoder();
            if (geocoder) {
                IsUseMyLocationSelected = false;
                geocoder.geocode({ 'address': addressSearch }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var indexToUse = 0;
                        if (IsUsrCountryUS) {
                            for (var k = 0; k < results[0].address_components.length; k++) {
                                var usrResult = results[0].address_components[k];
                                //Loop through result types until matching one found
                                //Set logic filter once country is found
                                if (usrResult.types[0] == "country") {
                                    var usrCountrycode = usrResult.short_name;
                                    if (usrCountrycode == "US") {
                                        IszipCountryUS = true;
                                    }
                                    break;
                                }
                            }
                        } else {
                            searchTerm = results[indexToUse].formatted_address;
                        }

                        //Get Lat/Long
                        //Set search location pin to search term lat/long
                        locationObject.Latitude = results[indexToUse].geometry.location.lat();
                        locationObject.Longitude = results[indexToUse].geometry.location.lng();

                        //Get SearchType
                        //Valid options: Proximity, Address, City, StateProvince, PostalCode, Country
                        var type;
                        switch (results[indexToUse].types[0]) {

                            case "locality":
                            case "sublocality_level_1":
                            case "sublocality_level_2":
                                if (IsUsrCountryUS) {
                                    resultError();
                                    return false;
                                } else {
                                    locationObject.SearchType = "City"
                                        //If locality, look through address components, and find the one labelled "locality"
                                        //This pulls out the city name, and ignores other address components.
                                    getSearchTerm(results, results[indexToUse].types[0]);
                                    getCountry(results);
                                    break;
                                }

                            case "postal_code":
                                if (IsUsrCountryUS) {
                                    if (IszipCountryUS) {
                                        locationObject.SearchType = "PostalCode";
                                        getCountry(results);
                                        break;
                                    } else {
                                        locationObject.SearchType = "PostalCode";
                                        getCountry(results);
                                        break;
                                        //resultError(0);
                                        //return false;
                                    }
                                } else {
                                    locationObject.SearchType = "PostalCode";
                                    getCountry(results);
                                    break;
                                }

                            case "country":
                                locationObject.SearchType = "Country";
                                getSearchTerm(results, "Country");
                                // Set logic filter based on country name
                                setLogicFilter(locationObject.SearchTerm.capitalize());
                                break;

                            case "administrative_area_level_1":
                                //If administrative_area_level_1, look through address components, and find the one labelled "locality"
                                //This pulls out the state/province name, and ignores other address components.
                                if (IsUsrCountryUS) {
                                    resultError();
                                    return false;
                                } else {
                                    getSearchTerm(results, "administrative_area_level_1");
                                    locationObject.SearchType = "StateProvince";
                                    getCountry(results);
                                    break;
                                }

                            case "administrative_area_level_2":
                                //If administrative_area_level_2, look through address components, and find the one labelled "locality"
                                //This pulls out the state/province name, and ignores other address components.
                                if (IsUsrCountryUS) {
                                    resultError();
                                    return false;
                                } else {
                                    getSearchTerm(results, "administrative_area_level_2");
                                    locationObject.SearchType = "StateProvince";
                                    getCountry(results);
                                    break;
                                }

                                //ignore continents, "grand canyon", "pacific ocean", etc.
                            case "natural_feature":
                            case "continent":
                                resultError();
                                //Kill the function.
                                return false;

                            case "street_address":
                            default:
                                if (IsUsrCountryUS) {
                                    locationObject.SearchType = "PostalCode";
                                    getCountry(results);
                                    break;
                                } else {
                                    locationObject.SearchType = "Proximity";
                                    getCountry(results);
                                    break;
                                }
                        }
                       
                        var ICLdistancevalue = "";
                        if (($("#settings-ICLDistance").data("icldistancevalue") != undefined) && ($("#settings-ICLDistance").data("icldistancevalue") != null) && ($("#settings-ICLDistance").data("icldistancevalue") != "")) {
                            ICLdistancevalue = $("#settings-ICLDistance").data("icldistancevalue");

                        }
                        else if (locationObject.SearchType == countrysearch)
                        {
                            ICLdistancevalue = "-1";
                        }
                        else {
                            ICLdistancevalue = "20";
                        }
                        //Here Be Hacky Exceptions

                        if (locationObject.SearchTerm.capitalize() == "Phoenix" && locationObject.Radius == -1) {
                            locationObject.Radius = 22.53;
                        }

                        var ddlradius = $("#selectRadiusList option:selected").val();
                        var radiusparsed = 0;
                        if (ddlradius !== undefined) {
                            radiusparsed = parseInt(ddlradius);
                        }
                        if (radiusparsed > 0) {
                            ICLdistancevalue = radiusparsed * 1.60934;
                        }
                        if (locationObject.SearchTerm.toLowerCase().indexOf("ireland") >= 0 && radiusparsed === 0) {
                            radius = 160.93470;
                            locationObject.Radius = radius;
                        }

                        if (locationObject.SearchTerm.toLowerCase().indexOf("london") >= 0 &&
                            locationObject.Radius < 40 &&
                            radiusparsed == 0) {
                            radius = 40.2336;
                            locationObject.Radius = radius;
                        }
                        /*$http.get('json/cliniLoc.json')
                            .success(function (data) {
                                pulledData = data;
                                setTimeout(function () { geoJSONCallback(); }, 1000);
                                function geoJSONCallback() {
                                    //if state search or country search error code:
                                    if (pulledData.locations_count < 0) {
                                        resultError();
                                    }
                                    else if (pulledData.locations_count != 0) {
        
                                        $.each(data.locations, function (i, item) {
                                            this.distance = (this.distance * 0.621371192).toFixed(2);;
                                        });
        
                                        sortPractices(data, searchTerm);
        
                                    } else {
                                        resultError();
                                    }
                                }
                                deferred.resolve();
                            });*/



                        // global clinic locator


                        var sf_lat = results[indexToUse].geometry.location.lat();
                        var sf_lng = results[indexToUse].geometry.location.lng();
                        locationObject.Radius
                        var apiObject = {
                            Latitude: sf_lat,
                            Longitude: sf_lng,
                            DistanceFrom: "0",
                            DistanceTo: ICLdistancevalue,
                            BrandName: "coolsculpting"
                        };


                     
                        if (ICLCountrycode == "" && websitecountrycode == "" && changecountrycode == "") {
                            websitecountrycode = GetUrlParameter('iclcountrycode');
                        }
                        else if (ICLCountrycode == "" && websitecountrycode == "") {
                            websitecountrycode = changecountrycode;                           
                        }

                        var jsonresults;

                        $.ajax({
                            type: "POST",
                            url: "/sc/api/FindClinic/GetICLClinicResults",
                            cache: false,
                            dataType: "json",
                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            data: {
                                __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val(),
                                Latitude: sf_lat,
                                Longitude: sf_lng,
                                DistanceFrom: "0",
                                DistanceTo: ICLdistancevalue,
                                Selectedcountrycode: websitecountrycode,
                                BrandName: "coolsculpting",
                                NewCountry: 'TH'   // 5-30-2023 support AEM api
                            },
                            success: function(response) {
                                if (response.IsValid && response.data != null && response.data != "") {

                                    jsonresults = JSON.parse(response.data);
                                    setTimeout(function() { geoJSONCallback(); }, 1000);

                                    function geoJSONCallback() {
                                        //if state search or country search error code:
                                        if (jsonresults.length <= 0) {
                                            resetmap(sf_lat, sf_lng);
                                            NoResultError();
                                        } else {
                                            var KMdistance = $("#settings-isdistanceinkm").data("distanceinkm");
                                            if (KMdistance.toLowerCase() == "true") {
                                                $.each(jsonresults, function(i, item) {

                                                    var distt = Getdistance(sf_lat, sf_lng, this.lat, this.longi);
                                                    this.distance = (distt * 1).toFixed(2);
                                                    this.distancekey = " km";

                                                    var uid = this.id;
                                                    var obj = rateCenter.find(function(element) {
                                                        if (element.id == uid)
                                                            return element;
                                                    });
                                                    if (obj != undefined && obj.snowflakescore != undefined) {
                                                        this.snowflakescore = obj.snowflakescore;
                                                    }
                                                });
                                            } else {
                                                $.each(jsonresults, function(i, item) {

                                                    var distt = Getdistance(sf_lat, sf_lng, this.lat, this.longi);
                                                    this.distance = (distt * 0.621371192).toFixed(2);
                                                    this.distancekey = " mi";
                                                    var uid = this.id;
                                                    var obj = rateCenter.find(function(element) {
                                                        if (element.id == uid)
                                                            return element;
                                                    });

                                                    if (obj != undefined && obj.snowflakescore != undefined) {
                                                        this.snowflakescore = obj.snowflakescore;
                                                    }
                                                });
                                            }
                                            if (ddlradius !== undefined) {
                                                if (radiusparsed !== 0) {
                                                    jsonresults = $.map(jsonresults, function(value, key) {
                                                        if (value.distance <= radiusparsed) {
                                                            return value;
                                                        }
                                                    });
                                                }
                                            }
                                            if (currentCount < jsonresults.length) {
                                                sortPractices_V2(jsonresults, searchTerm);
                                            } else {
                                                if (!$scope.$$phase) {
                                                    $scope.$apply(function() {
                                                        $scope.loader = false;
                                                    });
                                                } else {
                                                    $scope.loader = false;
                                                }
                                            }

                                        }
                                    }
                                    if (domain == "SG") {
                                        var sgnewurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                                        window.history.pushState({ path: sgnewurl }, '', sgnewurl);
                                    }


                                } else {
                                    resultError();
                                }
                            },
                            error: function(response) {
                                resultError();
                            }
                        });
                    } else {
                        $scope.loader = false;
                        $('div#loadingDiv').css('display', 'none');
                        $('#errorModal').modal();
                        $('#errorModal').on('shown.bs.modal', function() {
                            $("#errorModal .modal-body").html($("#searchErr").html());
                        });
                    }

                })
            };

        } else {

            //Get Lat/Long
            //Set search location pin to search term lat/long
            locationObject.Latitude = cs_lat;
            locationObject.Longitude = cs_long;

            //Here Be Hacky Exceptions

            if (locationObject.SearchTerm.capitalize() == "Phoenix" && locationObject.Radius == -1) {
                locationObject.Radius = 22.53;
            }

            var ICLdistancevalue = "";
            if (($("#settings-ICLDistance").data("icldistancevalue") != undefined) && ($("#settings-ICLDistance").data("icldistancevalue") != null) && ($("#settings-ICLDistance").data("icldistancevalue") != "")) {
                ICLdistancevalue = $("#settings-ICLDistance").data("icldistancevalue");

            } else {
                ICLdistancevalue = "20";
            }
            var ddlradius = $("#selectRadiusList option:selected").val();
            var radiusparsed = 0;
            if (ddlradius !== undefined) {
                radiusparsed = parseInt(ddlradius);
            }
            if (radiusparsed > 0) {
                ICLdistancevalue = radiusparsed * 1.60934;
            }
            if (locationObject.SearchTerm.toLowerCase().indexOf("ireland") >= 0 && radiusparsed === 0) {
                radius = 160.93470;
                locationObject.Radius = radius;
            }

            if (locationObject.SearchTerm.toLowerCase().indexOf("london") >= 0 &&
                locationObject.Radius < 40 &&
                radiusparsed == 0) {
                radius = 40.2336;
                locationObject.Radius = radius;
            }

            // global clinic locator 

            var sf_lat = cs_lat;
            var sf_lng = cs_long;
            locationObject.Radius
            var apiObject = {
                Latitude: sf_lat,
                Longitude: sf_lng,
                DistanceFrom: "0",
                DistanceTo: "20",
                BrandName: "coolsculpting"
            };
            var jsonresults;

            $.ajax({
                type: "POST",
                url: "/sc/api/FindClinic/GetICLClinicResults",
                cache: false,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val(),
                    Latitude: sf_lat,
                    Longitude: sf_lng,
                    DistanceFrom: "0",
                    DistanceTo: ICLdistancevalue,
                    BrandName: "coolsculpting",
                    NewCountry: 'TH'   // 5-30-2023 support AEM api
                },
                success: function(response) {
                    if (response.IsValid && response.data != null && response.data != "") {

                        jsonresults = JSON.parse(response.data);
                        setTimeout(function() { geoJSONCallback(); }, 1000);

                        function geoJSONCallback() {
                            //if state search or country search error code:
                            if (jsonresults.length <= 0) {
                                resetmap(sf_lat, sf_lng)
                                NoResultError();
                            } else {
                                var KMdistance = $("#settings-isdistanceinkm").data("distanceinkm");
                                if (KMdistance.toLowerCase() == "true") {
                                    $.each(jsonresults, function(i, item) {

                                        var distt = Getdistance(sf_lat, sf_lng, this.lat, this.longi);
                                        this.distance = (distt * 1).toFixed(2);
                                        this.distancekey = " km";

                                        var uid = this.id;
                                        var obj = rateCenter.find(function(element) {
                                            if (element.id == uid)
                                                return element;
                                        });
                                        if (obj != undefined && obj.snowflakescore != undefined) {
                                            this.snowflakescore = obj.snowflakescore;
                                        }
                                    });
                                } else {
                                    $.each(jsonresults, function(i, item) {

                                        var distt = Getdistance(sf_lat, sf_lng, this.lat, this.longi);
                                        this.distance = (distt * 0.621371192).toFixed(2);
                                        this.distancekey = " mi";
                                        var uid = this.id;
                                        var obj = rateCenter.find(function(element) {
                                            if (element.id == uid)
                                                return element;
                                        });

                                        if (obj != undefined && obj.snowflakescore != undefined) {
                                            this.snowflakescore = obj.snowflakescore;
                                        }
                                    });
                                }
                                if (ddlradius !== undefined) {
                                    if (radiusparsed !== 0) {
                                        jsonresults = $.map(jsonresults, function(value, key) {
                                            if (value.distance <= radiusparsed) {
                                                return value;
                                            }
                                        });
                                    }
                                }
                                if (currentCount < jsonresults.length) {
                                    sortPractices_V2(jsonresults, searchTerm);
                                } else {
                                    if (!$scope.$$phase) {
                                        $scope.$apply(function() {
                                            $scope.loader = false;
                                        });
                                    } else {
                                        $scope.loader = false;
                                    }
                                }

                            }
                        }
                        if (domain == "SG") {
                            var sgnewurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                            window.history.pushState({ path: sgnewurl }, '', sgnewurl);
                        }

                    } else {
                        resultError();
                    }
                },
                error: function(response) {
                    resultError();
                }
            });

        }

        cs_lat = "";
        cs_long = "";
    }

    function GetUrlParameter(key) {
        var queryString = window.location.search;
        
        key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp(key + '=([^&#]*)');
        var results = regex.exec(queryString);
        var param = results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));      
             
        //var urlParams = new URLSearchParams(queryString);
        //var param = urlParams.get(key);

        return param;
    }

    //Get search term from Google Geocoder
    function getSearchTerm(results, searchType) {
        for (var i = 0; i < results[0].address_components.length; i++) {
            var currentResult = results[0].address_components[i];
            if (locationObject.SearchType.capitalize() == "Country") {
                //Pull long name if country search
                locationObject.SearchTerm = currentResult.long_name.capitalize();
                break;
            }
            //Loop through result types until matching one found otherwise
            else if (currentResult.types[0] == searchType) {
                locationObject.SearchTerm = currentResult.long_name.capitalize();
                break;
            }
        }
    }

    //Sort Practices
    function sortPractices(locationArray, searchTerm) {
        locationArray.locations.sort(function(a, b) {
            //if ($("#enableSorting").length > 0) {
            //    if ($("#enableSorting")[0].checked) {


            //        var a_clinicname = a.name.toLowerCase();
            //        var b_clinicname = b.name.toLowerCase();

            //        if (a_clinicname.indexOf("the ")==0) {
            //            a_clinicname = a_clinicname.replace("the ", "")
            //        }
            //        if (b_clinicname.indexOf("the ")==0) {
            //            b_clinicname = b_clinicname.replace("the ", "")
            //        }

            //        var c = 0;
            //        if (a_clinicname < b_clinicname) { c = -1; }
            //        if (a_clinicname > b_clinicname) { c = 1; }

            //        return a.distance - b.distance || c;
            //    }
            //    else {
            //        var a_snowflakescore = 100;
            //        var b_snowflakescore = 100;
            //        if (a.snowflakescore != undefined) {
            //            a_snowflakescore = a.snowflakescore;
            //        }

            //        if (b.snowflakescore != undefined) {
            //            b_snowflakescore = b.snowflakescore;
            //        }

            //        var a_clinicname = a.name.toLowerCase();
            //        var b_clinicname = b.name.toLowerCase();

            //        if (a_clinicname.indexOf("the ") == 0) {
            //            a_clinicname = a_clinicname.replace("the ", "")
            //        }
            //        if (b_clinicname.indexOf("the ") == 0) {
            //            b_clinicname = b_clinicname.replace("the ", "")
            //        }

            //        var c = 0;
            //        if (a_clinicname < b_clinicname) { c = -1; }
            //        if (a_clinicname > b_clinicname) { c = 1; }
            //        return a_snowflakescore - b_snowflakescore || c;
            //    }
            //}
            if ($("#settings-countrycode").data("country").toLowerCase() == cSingapore) {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            }
            if ($("#settings-countrycode").data("country").toLowerCase() == "uk") {
                var a_clinicname = a.name.toLowerCase();
                var b_clinicname = b.name.toLowerCase();

                if (a_clinicname.indexOf("the ") == 0) {
                    a_clinicname = a_clinicname.replace("the ", "")
                }
                if (b_clinicname.indexOf("the ") == 0) {
                    b_clinicname = b_clinicname.replace("the ", "")
                }

                var c = 0;
                if (a_clinicname < b_clinicname) { c = -1; }
                if (a_clinicname > b_clinicname) { c = 1; }

                return a.distance - b.distance || c;
            } else {
                return a.distance - b.distance;
            }
        });

        addPracticesToResults(locationArray, searchTerm);
    }

    // Global clinic locator approach
    function sortPractices_V2(jsonresults, searchTerm) {
        jsonresults.sort(function(a, b) {
            //if ($("#enableSorting").length > 0) {
            //    if ($("#enableSorting")[0].checked) {


            //        var a_clinicname = a.name.toLowerCase();
            //        var b_clinicname = b.name.toLowerCase();

            //        if (a_clinicname.indexOf("the ")==0) {
            //            a_clinicname = a_clinicname.replace("the ", "")
            //        }
            //        if (b_clinicname.indexOf("the ")==0) {
            //            b_clinicname = b_clinicname.replace("the ", "")
            //        }

            //        var c = 0;
            //        if (a_clinicname < b_clinicname) { c = -1; }
            //        if (a_clinicname > b_clinicname) { c = 1; }

            //        return a.distance - b.distance || c;
            //    }
            //    else {
            //        var a_snowflakescore = 100;
            //        var b_snowflakescore = 100;
            //        if (a.snowflakescore != undefined) {
            //            a_snowflakescore = a.snowflakescore;
            //        }

            //        if (b.snowflakescore != undefined) {
            //            b_snowflakescore = b.snowflakescore;
            //        }

            //        var a_clinicname = a.name.toLowerCase();
            //        var b_clinicname = b.name.toLowerCase();

            //        if (a_clinicname.indexOf("the ") == 0) {
            //            a_clinicname = a_clinicname.replace("the ", "")
            //        }
            //        if (b_clinicname.indexOf("the ") == 0) {
            //            b_clinicname = b_clinicname.replace("the ", "")
            //        }

            //        var c = 0;
            //        if (a_clinicname < b_clinicname) { c = -1; }
            //        if (a_clinicname > b_clinicname) { c = 1; }
            //        return a_snowflakescore - b_snowflakescore || c;
            //    }
            //}

            if ($("#settings-countrycode").data("country").toLowerCase() == cSingapore) {
                var a_cname = a.clinicName.toLowerCase();
                var b_cname = b.clinicName.toLowerCase();

                if (a_cname < b_cname) { return -1; }
                if (a_cname > b_cname) {
                    return 1;
                }
                return 0;
            }

            if ($("#settings-countrycode").data("country").toLowerCase() == "uk") {
                var a_clinicname = a.clinicName.toLowerCase();
                var b_clinicname = b.clinicName.toLowerCase();

                if (a_clinicname.indexOf("the ") == 0) {
                    a_clinicname = a_clinicname.replace("the ", "")
                }
                if (b_clinicname.indexOf("the ") == 0) {
                    b_clinicname = b_clinicname.replace("the ", "")
                }

                var c = 0;
                if (a_clinicname < b_clinicname) { c = -1; }
                if (a_clinicname > b_clinicname) { c = 1; }

                //crm
                return a.distance - b.distance || c;
            } else {
                //crm
                return a.distance - b.distance;
            }
        });           
        addPracticesToResults_V2(jsonresults, searchTerm);

    }

    //Add practices to list
    function addPracticesToResults(data, searchTerm) {

        var icon = angular.element('#map-web-icon').attr('data-icon');
        var linkText = angular.element("#link-text").text();
        $scope.loader = false;
        var locationsList = [],
            locInfo = {},
            locationArray = [];
        $scope.locationRecords = [];
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == "th") {
            $(".clinicInfo-wrapper,.cs-info-wrapper").addClass("hide-physician");
        }
        $.each(data.locations, function(i, item) {
            locInfo = {};
            //Build Address
            var isCanada = false;
            var isUSA = false;
            var isNull = false;

            switch (this.country.toLowerCase()) {
                case "united states of america":
                case "united states":
                case "usa":
                case "us":
                    isUSA = true;
                    break;

                case "ca":
                case "canada":
                    isCanada = true;
                    break;

                case "":
                case "-":
                    isNull = true;
                    break;

            }
            /** Note required fields for address are as follows:
             *  -Should match SFLocationRepository.cs logic
             * Country
             * City
             **/

            var addressObj = "",
                physician = "";

            addressObj += (this.address1 != "") ? this.address1 + "\n" : "";
            addressObj += (this.address2 != "") ? this.address2 + "\n" : "";
            addressObj += (this.address3 != "") ? this.address3 + "\n" : "";

            if (isUSA || isCanada) {
                //add "city, "
                addressObj += (this.city != "") ? this.city + ", " : "";
                //add "state "
                addressObj += (this.state != "") ? this.state + " " : "";
                //add "zip"
                addressObj += (this.zipcode != "") ? this.zipcode : "";

            } else { //Int'l case
                //add "city, "
                addressObj += (this.city != "") ? this.city + ", " : "";
                //add "state, "
                addressObj += (this.state != "") ? this.state + ", " : "";
                //add "country"
                addressObj += (this.country != "") ? this.country : "";
                //add break before zip
                addressObj += "\n";
                //add zip(postal code)
                addressObj += (this.zipcode != "") ? this.zipcode : "";
            }
            physician = this.physician1 != "" ? this.physician1 : "";

            if (this.physician2 != "-" && this.physician2 != "") {
                physician = physician + ' ' + this.physician2
            }
            if (domain != undefined && domain.toLowerCase().trim() == "uk") {
                $scope.showsnowflakediv = true;
                var checkid;
                checkid = this.id;
                var checkRate = 0;
                var checkCSRate = 0;
                angular.forEach(rateCenter, function(value, key) {
                    if (value.id === checkid) {
                        locInfo["snowflake"] = value.snowflakescore;
                        if (!isNaN(value.coolsculptingimage) && value.coolsculptingimage != "") {
                            locInfo["coolsculptingimage"] = value.coolsculptingimage;
                        }
                    } else {
                        checkRate = 0;
                        checkCSRate = 0;
                    }
                });
            }
            locInfo["id"] = this.id;
            locInfo["lat"] = this.lat;
            locInfo["lng"] = this.lng;
            locInfo['address'] = addressObj;
            locInfo["website"] = this.website;
            locInfo["email"] = this.email;
            locInfo["name"] = this.name;
            locInfo["distance"] = this.distance;
            locInfo["phone"] = this.phone;
            locInfo["physician"] = physician;
            locInfo["distancekey"] = this.distancekey;
            locInfo["book_consultation_url"] = this.book_consultation_url;
            //Map Icon Info HTML

            var mapHTML = "";
            var hideclinicdetail = $("#clinic-search").attr("data-hideclinicinfo");
            
            mapHTML += "<div class=\"map-info \">";
            if (this.name) {
                mapHTML += "<a href=\"javascript:void(0)\" target=\"\" data-id='" + this.id + '\'' + " class=\"ci-title js-title-click practice mar_bt10\">" + this.name + "</a>";
            }

            if (hideclinicdetail == "True") {
                mapHTML += "<div class=\"clinicInfo-address\" style=\"display: none;\">";
            }
            else {
                mapHTML += "<div class=\"clinicInfo-address\">";
            }          

           
            if (physician) {
                mapHTML += "<span class=\"physician mar_bt10\">" + physician + "</span>";
            }
            if (addressObj) {
                mapHTML += "<span class=\"address mar_bt10\">" + addressObj + "</span>";
            }

            var showphbtn = $("#clinic-search").attr("data-showphbtn");
            var showphbtnqs = $("#quick-search").attr("data-showphbtn");
            var phlbl = $("#clinichelperr").attr("data-phlbl");
            var maillbl = $("#clinichelperr").attr("data-emaillbl");
            if (this.clinic_contact) {

                if (showphbtn == "True" || showphbtnqs == "True") {
                    mapHTML += "<a href='" + "javascript:void(0)" + '\'' + "class=\"mar_bt10 phonebtn ci-bluefont\"" + ">" + phlbl + "<img src=\"" + icon + "\" ></a>"
                    mapHTML += "<a href='" + 'tel:' + this.phone + '\'' + "class=\"mar_bt10 phone showclinicphoneno\"" + ">" + 'T:' + this.phone + "</a>"
                } else {
                    mapHTML += "<a href='" + 'tel:' + this.phone + '\'' + "class=\"mar_bt10 phone\"" + ">" + 'T:' + this.phone + "</a>"
                }

            }
            if (this.email) {
                if (showphbtn == "True" || showphbtnqs == "True") {
                    mapHTML += "<a href='" + 'mailto:' + this.email + '\'' + "class=\"mar_bt10 email ci-bluefont\"" + ">" + maillbl + "<img src=\"" + icon + "\" ></a>"
                } else {
                    mapHTML += "<a href='" + 'mailto:' + this.email + '\'' + "class=\"mar_bt10 email\"" + ">" + this.email + "</a>"
                }

            }

            /* mapHTML += "<a href=\"javascript:void(0);\" target=\"_blank\" class=\"mar_bt10 info-wrap\">"+
             "<span class=\"moreInfo\"> more info</span>"+
             "<img src=\"media/svg/chevron-right_bl.svg\" alt=\"moreInfo link\">"+"</a>";*/

            if (this.website) {
                if ($("#settings-countrycode").data("country").toLowerCase().trim() != cMexico && $("#settings-countrycode").data("country").toLowerCase().trim() != cAPAC) {
                    mapHTML += "<a href='" + this.website + '\'' + "target=\"_blank\" class=\"mar_bt10 ci-website\"" + ">" + linkText + "<img src=\"" + icon + "\" ></a>";
                }
            }

            mapHTML += "</div>"
            mapHTML += "</div>";
            //Add location into LocationList
            var location = {
                lat: this.lat,
                lon: this.lng,
                html: mapHTML
            };
            locationsList.push(location);
            locationArray.push(locInfo)
        })
        if (!$scope.$$phase) {
            $scope.$apply(function() {
                $scope.countrySelected = locationArray != '' || locationArray != null || typeof(locationArray) != 'undefined' ? true : false;
                $scope.locationRecords.push(locationArray);
                $scope.count = $scope.locationRecords[0].length;
                $scope.toggleButtonState = $scope.count <= 6 ? true : false;
                $scope.location = searchTerm;
            });
        } else {
            $scope.countrySelected = locationArray != '' || locationArray != null || typeof(locationArray) != 'undefined' ? true : false;
            $scope.locationRecords.push(locationArray);
            $scope.count = $scope.locationRecords[0].length;
            $scope.toggleButtonState = $scope.count <= 6 ? true : false;
            $scope.location = searchTerm;
        }

        setAutoHeight(chunkSize());
        addPracticesToMap(locationsList);
    }

    // Global Clinic Locator approach
    function addPracticesToResults_V2(jsonresults, searchTerm) {

        var icon = angular.element('#map-web-icon').attr('data-icon');
        var linkText = angular.element("#link-text").text();
        $scope.loader = false;
        var locationsList = [],
            locInfo = {},
            locationArray = [];
        $scope.locationRecords = [];
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == "th") {
            $(".clinicInfo-wrapper,.cs-info-wrapper").addClass("hide-physician");
        }
        $.each(jsonresults, function(i, item) {
            locInfo = {};
            //Build Address
            var isCanada = false;
            var isUSA = false;
            var isNull = false;

            switch (this.clinic_address.country.toLowerCase()) {
                case "united states of america":
                case "united states":
                case "usa":
                case "us":
                    isUSA = true;
                    break;

                case "ca":
                case "canada":
                    isCanada = true;
                    break;

                case "":
                case "-":
                    isNull = true;
                    break;

            }
            /** Note required fields for address are as follows:
             *  -Should match SFLocationRepository.cs logic
             * Country
             * City
             **/

            var addressObj = "",
                physician = "";

            addressObj += (this.clinic_address.street != "") ? this.clinic_address.street + "\n" : "";
            //addressObj += (this.address2 != "") ? this.address2 + "\n" : "";
            //addressObj += (this.address3 != "") ? this.address3 + "\n" : "";

            if (isUSA || isCanada) {
                //add "city, "
                addressObj += (this.clinic_address.city != "") ? this.clinic_address.city + ", " : "";
                //add "state "
                addressObj += (this.clinic_address.state != "") ? this.clinic_address.state + " " : "";
                //add "zip"
                addressObj += (this.clinic_address.zip_code != "") ? this.clinic_address.zip_code : "";

            } else { //Int'l case
                //add "city, "
                addressObj += (this.clinic_address.city != "") ? this.clinic_address.city + ", " : "";
                //add "state, "
                addressObj += (this.clinic_address.state != "") ? this.clinic_address.state + ", " : "";
                //add "country"
                addressObj += (this.clinic_address.country != "") ? this.clinic_address.country : "";
                //add break before zip
                addressObj += "\n";
                //add zip(postal code)
                addressObj += (this.clinic_address.zip_code != "") ? this.clinic_address.zip_code : "";
            }

            // crm
            //physician = this.physician1 != "" ? this.physician1 : "";

            //if (this.physician2 != "-" && this.physician2 != "") {
            //    physician = physician + ' ' + this.physician2
            //}
            if (domain != undefined && domain.toLowerCase().trim() == "uk") {
                $scope.showsnowflakediv = true;
                var checkid;
                checkid = this.clinicId;
                var checkRate = 0;
                var checkCSRate = 0;
                angular.forEach(rateCenter, function(value, key) {
                    if (value.clinicId === checkid) {
                        locInfo["snowflake"] = value.snowflakescore;
                        if (!isNaN(value.coolsculptingimage) && value.coolsculptingimage != "") {
                            locInfo["coolsculptingimage"] = value.coolsculptingimage;
                        }
                    } else {
                        checkRate = 0;
                        checkCSRate = 0;
                    }
                });
            }
            var clinicwebsite = "";
            var bookConsultationWebsite = "";
            if (this.website_url != null && this.website_url != "") {

                clinicwebsite = this.website_url.indexOf('http') !== -1 ? this.website_url : "https://" + this.website_url;
            }

            if (this.book_consultation_url != null && this.book_consultation_url != "") {
                bookConsultationWebsite = this.book_consultation_url.indexOf('http') !== -1 ? this.book_consultation_url : "https://" + this.book_consultation_url;
            }

            // crm
            locInfo["id"] = this.clinicId;
            locInfo["lat"] = this.lat;
            locInfo["lng"] = this.longi;
            locInfo['address'] = addressObj;
            locInfo["website"] = clinicwebsite;
            locInfo["email"] = this.email;
            locInfo["name"] = this.clinicName;
            // crm
            locInfo["distance"] = this.distance;
            locInfo["phone"] = this.clinic_contact;
            locInfo["physician"] = physician;
            //crm
            locInfo["distancekey"] = this.distancekey;
            locInfo["book_consultation_url"] = bookConsultationWebsite;
            //Map Icon Info HTML

            var mapHTML = "";
            var hideclinicdetail = $("#clinic-search").attr("data-hideclinicinfo");

            mapHTML += "<div class=\"map-info \">";
            if (this.clinicName) {
                // crm id
                mapHTML += "<a href=\"javascript:void(0)\" target=\"\" data-id='" + this.clinicId + '\'' + " class=\"ci-title js-title-click practice mar_bt10\">" + this.clinicName + "</a>";
            }
            if (hideclinicdetail == "True") {
                mapHTML += "<div class=\"clinicInfo-address\" style=\"display: none;\">";
            }
            else {
                mapHTML += "<div class=\"clinicInfo-address\">";
            }

           // mapHTML += "<div class=\"clinicInfo-address\">";
            if (physician) {
                mapHTML += "<span class=\"physician mar_bt10\">" + physician + "</span>";
            }
            if (addressObj) {
                mapHTML += "<span class=\"address mar_bt10\">" + addressObj + "</span>";
            }
            var showphbtn = $("#clinic-search").attr("data-showphbtn");
            var showphbtnqs = $("#quick-search").attr("data-showphbtn");
            var phlbl = $("#clinichelperr").attr("data-phlbl");
            var maillbl = $("#clinichelperr").attr("data-emaillbl");
            var hidewebsitelink = $("#clinic-search").attr("data-hidewebsitelink");
            var hidewebsitelinkqs = $("#quick-search").attr("data-hidewebsitelink");
            hidewebsitelink = (hidewebsitelink == 'True' || hidewebsitelinkqs == 'True') ? 'True' : 'False';
            if (this.clinic_contact) {

                if (showphbtn == "True" || showphbtnqs == "True") {
                    mapHTML += "<a href='" + "javascript:void(0)" + '\'' + "class=\"mar_bt10 phonebtn ci-bluefont\"" + ">" + phlbl + "<img src=\"" + icon + "\" ></a>"
                    mapHTML += "<a href='" + 'tel:' + this.clinic_contact + '\'' + "class=\"mar_bt10 phone showclinicphoneno\"" + ">" + 'T:' + this.clinic_contact + "</a>"
                } else {
                    mapHTML += "<a href='" + 'tel:' + this.clinic_contact + '\'' + "class=\"mar_bt10 phone\"" + ">" + 'T:' + this.clinic_contact + "</a>"
                }

            }
            if (this.email) {
                if (showphbtn == "True" || showphbtnqs == "True") {
                    mapHTML += "<a href='" + 'mailto:' + this.email + '\'' + "class=\"mar_bt10 email ci-bluefont\"" + ">" + maillbl + "<img src=\"" + icon + "\" ></a>"
                } else {
                    mapHTML += "<a href='" + 'mailto:' + this.email + '\'' + "class=\"mar_bt10 email\"" + ">" + this.email + "</a>"
                }

            }

            /* mapHTML += "<a href=\"javascript:void(0);\" target=\"_blank\" class=\"mar_bt10 info-wrap\">"+
             "<span class=\"moreInfo\"> more info</span>"+
             "<img src=\"media/svg/chevron-right_bl.svg\" alt=\"moreInfo link\">"+"</a>";*/

            // hidewebsite if True           
            if (hidewebsitelink != 'True') {
                if (this.website_url) {
                mapHTML += "<a href='" + clinicwebsite + '\'' + "target=\"_blank\" class=\"mar_bt10 ci-website\"  onclick=\"openLeaveWebsiteDisclaimerModal(event)\"  " + ">" + linkText + "<img src=\"" + icon + "\" ></a>";
                }
            }

            mapHTML += "</div>"
            mapHTML += "</div>";
            //Add location into LocationList
            var location = {
                lat: this.lat,
                lon: this.longi,
                html: mapHTML
            };
            locationsList.push(location);
            locationArray.push(locInfo)
        })
        if (!$scope.$$phase) {
            $scope.$apply(function() {
                $scope.countrySelected = locationArray != '' || locationArray != null || typeof(locationArray) != 'undefined' ? true : false;
                $scope.locationRecords.push(locationArray);
                $scope.count = $scope.locationRecords[0].length;
                $scope.toggleButtonState = $scope.count <= 6 ? true : false;
                $scope.location = searchTerm;
            });
        } else {
            $scope.countrySelected = locationArray != '' || locationArray != null || typeof(locationArray) != 'undefined' ? true : false;
            $scope.locationRecords.push(locationArray);
            $scope.count = $scope.locationRecords[0].length;
            $scope.toggleButtonState = $scope.count <= 6 ? true : false;
            $scope.location = searchTerm;
        }

        setAutoHeight(chunkSize());
        addPracticesToMap(locationsList);

        if (document.body.classList.contains('GermanyCoolsculpting')) {
            var listviews = Array.from(document.querySelectorAll('.clinicInfo-item'));
            var options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.5
            };
            var observer = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry, i) {
                    if (entry.isIntersecting) {
                        var dataObj = {
                            name: entry.target.querySelector('.clinicInfo-title .ci-title').innerText,
                            id: '',
                            brand: 'Coolsculpting',
                            list: 'Search results',
                            address: entry.target.querySelector('.clinicInfo-address .address').innerText,
                            position: listviews.indexOf(entry.target) + 1,
                        }
                        window.dataLayer = window.dataLayer || [];
                        dataLayer.push({
                            event: 'promotionView',
                            searchTerm: searchTerm,
                            ecommerce: {
                                promoView: {
                                    promotions: [
                                        dataObj
                                    ]
                                }
                            }
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, options);
            var pushPromoToDataLayer = function(name, address, indexListView) {
                dataLayer.push({
                    event: 'promotionClick',
                    searchTerm: searchTerm,
                    ecommerce: {
                        promoClick: {
                            promotions: [{
                                name: name,
                                address: address,
                                id: '',
                                list: 'Search results',
                                position: indexListView + 1,
                                brand: 'Coolsculpting',
                            }]
                        }
                    }
                });
            };
            listviews.forEach(function(listview, indexListView) {
                observer.observe(listview);
                var clinicName = listview.querySelector('.clinicInfo-title .ci-title');
                var clinicAddress = listview.querySelector('.clinicInfo-address .address');
                var phone = listview.querySelector('.clinicInfo-address .phonebtn');
                var phone2 = listview.querySelector('.clinicInfo-address .phone');
                var email = listview.querySelector('.clinicInfo-address a[href*="mailto"]');
                var website = listview.querySelector('.clinicInfo-address a.btnwithBg[href*="http"]');
                var website2 = listview.querySelector('.clinicInfo-footer a.ci-website[href*="http"]');
                if (clinicName) {
                    clinicName.addEventListener('click', function() {
                        pushPromoToDataLayer(clinicName.innerText, clinicAddress.innerText, indexListView);
                    });
                }
                if (phone) {
                    phone.addEventListener('click', function() {
                        pushPromoToDataLayer(clinicName.innerText, clinicAddress.innerText, indexListView);
                    });
                }
                if (phone2) {
                    phone2.addEventListener('click', function() {
                        pushPromoToDataLayer(clinicName.innerText, clinicAddress.innerText, indexListView);
                    });
                }
                if (email) {
                    email.addEventListener('click', function() {
                        pushPromoToDataLayer(clinicName.innerText, clinicAddress.innerText, indexListView);
                    });
                }
                if (website) {
                    website.addEventListener('click', function() {
                        pushPromoToDataLayer(clinicName.innerText, clinicAddress.innerText, indexListView);
                    });
                }
                if (website2) {
                    website2.addEventListener('click', function() {
                        pushPromoToDataLayer(clinicName.innerText, clinicAddress.innerText, indexListView);
                    });
                }
            });
        }
    }

    //Get Country Name for Logic Filter
    function getCountry(results) {
        for (var i = 0; i < results[0].address_components.length; i++) {
            var currentResult = results[0].address_components[i];
            //Loop through result types until matching one found
            //Set logic filter once country is found
            if (currentResult.types[0].capitalize() == "country") {
                setLogicFilter(currentResult.long_name.capitalize());
                break;
            }
        }
    }

    //Set Logic Filter by comparing strings
    function setLogicFilter(stringCompare) {
        //var domain = $("#settings-countrycode").data("country").capitalize();
        var domain = "";
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMEA || $("#settings-countrycode").data("country").toLowerCase().trim() == cAPAC) {
            if (countrydropdownselect == true) {
                domain = selectedcountrycode;
            } else {
                domain = $.cookie('CountryCode').capitalize();
            }
        } else {
            domain = $("#settings-countrycode").data("country").capitalize();
        }
        switch (stringCompare) {
            case "United States":
            case "United States of America":
                locationObject.LogicFilter = domain; //US
                break;
            case "United Kingdom":
                locationObject.LogicFilter = domain;
                break;
            default:
                locationObject.LogicFilter = domain;
        }
    }

    function setAutoHeight(size) {

        var $listItem = angular.element('.clinicInfo-item');
        var newArr = [],
            maxHeightBody, maxHeightHeader;
        for (var i = 0; i < $listItem.length; i += size) {
            newArr.push($listItem.slice(i, i + size));
        }

        angular.forEach(newArr, function(data) {
            maxHeightHeader = Math.max.apply(null, $(data).find('.clinicInfo-title').map(function() {
                return $(this).outerHeight();
            }).get());
            maxHeightBody = Math.max.apply(null, $(data).find('.clinicInfo-address').map(function() {
                return $(this).outerHeight();
            }).get());
            maxHeightFooter = Math.max.apply(null, $(data).find('.clinicInfo-footer').map(function() {
                return $(this).outerHeight();
            }).get());
            angular.forEach(data, function(elem) {
                $(elem).find('.clinicInfo-title').css("height", maxHeightHeader);
                $(elem).find('.clinicInfo-address').css("height", maxHeightBody);
                $(elem).find('.clinicInfo-footer').css("height", maxHeightFooter);
            });
        });

    }

    function addPracticesToMap(locationsList) {
        var icons = $('#markerImage').attr('data-src');
        var bounds = new google.maps.LatLngBounds();
        //clearmap
        setMapOnAll(null);
        markers = [];
        var bool = true;
        for (i = 0; i < locationsList.length; i++) {
            if (i == 0) {
                var latlon = new google.maps.LatLng(locationsList[i].lat, locationsList[i].lon);
                map = new google.maps.Map(document.getElementById('mapView'), {
                    center: latlon,
                    zoom: 13,
                    styles: myStyles
                });

                var im = angular.element('#markerIcon').attr('data-src');
                var myLatLng = new google.maps.LatLng(locationObject.Latitude, locationObject.Longitude);
                //initMap(coordinates.location.lat, coordinates.location.lng);
                var userMarker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: im
                });
                bounds.extend(myLatLng);
                google.maps.event.addListener(map, 'zoom_changed', function() {
                    if (radiusSelectedFlag > 0) {
                        //$('#selectRadiusList').val(0);
                        setradiustext($("#selectRadiusList option:selected").text());
                        radiusSelectedFlag = 0;
                        radius = 16.09;
                        if (locationObject.SearchTerm.capitalize() == "Phoenix" && locationObject.Radius == -1) {
                            radius = 22.53;
                        }
                        if (locationObject.SearchTerm.toLowerCase().indexOf("london") >= 0) {
                            radius = 40.2336;
                        }
                        if (locationObject.SearchTerm.toLowerCase().indexOf("ireland") >= 0) {
                            radius = 160.93470;
                        }
                        var zoomLevel = map.getZoom();
                        if (zoomLevel != 0 && zoomLevel < zoomDefault) {
                            zoomDefault = map.getZoom();
                            currentCount = 0;
                            //if ($("#enableSorting").length > 0) {
                            if ($("#settings-countrycode").data("country").toLowerCase() == "uk") {
                                locationObject.Radius = radius;
                                if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
                                    getGeoJSON_V2($scope.srchTerm);
                                } else {
                                    getGeoJSON($scope.srchTerm);
                                }

                            } else if (radius <= 160) {
                                locationObject.Radius = radius;
                                if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
                                    getGeoJSON_V2($scope.srchTerm);
                                } else {
                                    getGeoJSON($scope.srchTerm);
                                }
                            }
                        }
                        bool = false;
                    }
                    if (!bool) {
                        var zoomLevel = map.getZoom();
                        if (zoomLevel != 0 && zoomLevel < zoomDefault) {
                            zoomDefault = map.getZoom();
                            currentCount = $scope.count;
                            //if ($("#enableSorting").length > 0) {
                            if ($("#settings-countrycode").data("country").toLowerCase() == "uk") {
                                radius += 80.4672;
                                locationObject.Radius = radius;
                                if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
                                    getGeoJSON_V2($scope.srchTerm);
                                } else {
                                    getGeoJSON($scope.srchTerm);
                                }

                            } else if (radius <= 160) {
                                radius += 16.09;
                                locationObject.Radius = radius;
                                if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
                                    getGeoJSON_V2($scope.srchTerm);
                                } else {
                                    getGeoJSON($scope.srchTerm);
                                }

                            }
                        }
                    }
                    bool = false;
                    if (radiusSelectedFlag == 0) {
                        var ddlradius = $("#selectRadiusList option:selected").val();
                        var radiusparsed = 0;
                        if (ddlradius !== undefined) {
                            radiusparsed = parseInt(ddlradius);
                        }
                        if (radiusparsed > 0) {
                            radiusSelectedFlag = 1;
                        }
                    }
                })

            }
            var locationInfowindow = new google.maps.InfoWindow({
                content: locationsList[i].html
            });

            //map info view title click
            google.maps.event.addListener(locationInfowindow, 'domready', function() {
                angular.element('.js-title-click').on("click", function(event) {
                    var id = $(event.target).attr('data-id');
                    setQueryParam(event, id);
                });
                angular.element('.map-info .clinicInfo-address .address,.map-info .clinicInfo-address .phone').on("click", function() {
                    setdataLayer('clinicClickToCall');
                });
                angular.element('.map-info .clinicInfo-address .email').on("click", function() {
                    setdataLayer('clinicClickToEmail');
                });
                angular.element('.map-info .clinicInfo-address .ci-website').on("click", function() {
                    setdataLayer('clinicVisitWebsite');
                });
                var phdatalayer = $("#clinichelperr").attr("data-ShowPhoneEventName");
                if (phdatalayer != undefined && phdatalayer != "") {
                    angular.element('.map-info .clinicInfo-address .address,.map-info .clinicInfo-address .phonebtn').on("click", function() {
                        setdataLayer(phdatalayer);
                    });
                }
                window.dataLayer = window.dataLayer || [];
                var clickedAreainMap = $.parseHTML(this.content);
                var selectedAreaName = $(clickedAreainMap).find('.js-title-click').text();
                var selectedAreaAddress = $(clickedAreainMap).find('.address').text();
                dataLayer.push({
                    clinicName: selectedAreaName,
                    clinicAddress: selectedAreaAddress,
                    event: 'mapClinicClicked'
                });
            })

            var placeLoc = new google.maps.LatLng(locationsList[i].lat, locationsList[i].lon);

            var marker = new google.maps.Marker({
                position: placeLoc,
                map: map,
                infowindow: locationInfowindow,
                icon: icons,
                label: {
                    text: (i + 1).toString(),
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "bold"
                }
            });
            bounds.extend(placeLoc);
            markers.push(marker);
            google.maps.event.addListener(marker, 'click', function() {
                hideAllInfoWindows(map);
                this.infowindow.open(map, this);
            });

        }
        showMarkers();
        map.fitBounds(bounds);
        google.maps.event.addListenerOnce(map, 'idle', function() {
            if (map.getZoom() > 16) {
                map.setZoom(16);
            }
            zoomDefault = map.getZoom();
        });
        // angular.element('.js-title-click').addEventListener('click', dummy.bind(this));
    }

    function setdataLayer(event) {
        var title = $('.map-info').find(".js-title-click").text();
        var address = $('.map-info').find(".address").text();
        dataLayer.push({
            clinicName: title,
            clinicAddress: address,
            event: event
        });
    }
    $scope.showallClinics = function() {
            var pageNav = angular.element('.all-clinics-wrapper').attr('data-nav');
            window.open(
                pageNav,
                '_blank'
            );
        }
        //load more logic
    $scope.loadMoreLocation = function() {
        var increment = $scope.locationLimit + count;
        $scope.toggleButtonState = increment >= $scope.count ? true : false;
        $scope.locationLimit = increment >= $scope.count ? increment : $scope.locationLimit + count;
        setTimeout(function() { setAutoHeight(chunkSize()); }, 1000);
    }

    //close all marker
    function hideAllInfoWindows(map) {
        markers.forEach(function(marker) {
            marker.infowindow.close(map, marker);
        });
    }

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Shows any markers currently in the array.
    function showMarkers() {
        setMapOnAll(map);
    }
    //clinic list detail column count in a row
    function chunkSize() {
        var size;
        if ($(window).width() > 992) {
            size = 3;
        } else if ($(window).width() >= 768 && $(window).width() < 992) {
            size = 2;
        } else {
            size = 1;
        }
        return size;
    }
    //autoheight on resize
    $(window).resize(function() {
        setAutoHeight(chunkSize());
    });

    //error scenario
    function NoResultError() {
        if (!$scope.$$phase) {
            $scope.$apply(function() {
                $scope.loader = false;
            });
        } else {
            $scope.loader = false;
        }
        angular.element('#errorModal').modal();
        $('#errorModal').on('shown.bs.modal', function() {
            var errorMessage = $("#GeoLocationAPINoResultText").html() ? $("#GeoLocationAPINoResultText").html() : "No data available for this city";
            $("#errorModal .modal-body").html(errorMessage);
        });
    }

    //error scenario
    function resultError() {
        if (!$scope.$$phase) {
            $scope.$apply(function() {
                $scope.loader = false;
            });
        } else {
            $scope.loader = false;
        }
        angular.element('#errorModal').modal();
        $('#errorModal').on('shown.bs.modal', function() {
            $("#errorModal .modal-body").html($("#Apigeolocationerr").html());
        });
        // clear map
        geoloc.getLocation(url).then(function(coordinates) {
            initMap(coordinates.coords.latitude, coordinates.coords.longitude);
        });
    }


    // Reset map when no clinics
    function resetmap(lat, lng) {
        //rest map
        var latlon = new google.maps.LatLng(lat, lng);
        var myOptions = {
            center: latlon,
            zoom: zoomLevelCustom,
            styles: myStyles,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true
        }
        if (document.getElementById("mapView") != null) {
            map = new google.maps.Map(document.getElementById("mapView"), myOptions);
            //var GeoMarker = new GeolocationMarker(map);
            var im = angular.element('#markerIcon').attr('data-src');
            var userMarker = new google.maps.Marker({
                position: latlon,
                map: map,
                icon: im
            });
        }
    }

    //quick search trigger
    $scope.loadMap = function (event) {

        // India new campaign pagequicksearch will show clinic on same page
        if ($('body').hasClass("IndiaCoolsculpting") && $('body').attr('pagename') == "reduce-extra-bulges" || $('body').attr('pagename') == "non-surgical-body-contouring") {

            $scope.srchTerm = $(event.target).data("searchcountry");
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?search=' + $scope.srchTerm;

            window.history.pushState({ path: newurl }, '', newurl);
            $scope.initClinicLocator(count, true);


        }
        else {


        var srchTerm = $(event.target).data("searchcountry"),
            pageNav = angular.element('.cl-anchors').attr('data-nav'),
            lat = $(event.target).data("latitude"),
            long = $(event.target).data("longitude");
        countryCode = $(event.target).data("countrycode");
        if ($("#settings-countrycode").data("country").toLowerCase() == cMEA || $("#settings-countrycode").data("country").toLowerCase().trim() == cLATAM) {
            pageNav = angular.element('.cl-anchorsmea').attr('data-nav');
        }
        if ($("#settings-countrycode").data("country").toLowerCase() != cSingapore) {
            var countryCodeExtension = countryCode ? "&countrycode=" + countryCode : "";
            if (ICLclusterCountrycode != undefined && ICLclusterCountrycode != "") {
                // $(event.currentTarget).attr('href', pageNav + "?quicksearch=" + srchTerm + countryCodeExtension + "&iclcountrycode=" + changecountrycode);
                var newpageurl = pageNav + "?quicksearch=" + srchTerm + countryCodeExtension + "&iclcountrycode=" + changecountrycode;
                window.open(newpageurl, '_blank');
            }
            else {

                // $(event.currentTarget).attr('href', pageNav + "?quicksearch=" + srchTerm + countryCodeExtension);
                var newpageurl = pageNav + "?quicksearch=" + srchTerm + countryCodeExtension;
                window.open(newpageurl, '_blank');
            }


        } else {

            //$(event.currentTarget).attr('href', pageNav + "?quicksearch=" + srchTerm + "&" + "latitude=" + lat + "&&" + "longitude=" + long);
            var newpageurl = pageNav + "?quicksearch=" + srchTerm + "&" + "latitude=" + lat + "&&" + "longitude=" + long;
            window.open(newpageurl, '_blank');

        }
    }
    }

    //check for extra url params
    function getUrlQuery() {
        var searchfield = window.location.href.slice(window.location.href.indexOf('?') + 1);
        var searchTerm;
        try {
            //crm
            if (searchfield.toLowerCase().indexOf("quicksearch") >= 0) {
                searchTerm = GetUrlParameter("quicksearch");
                websitecountrycode = GetUrlParameter('iclcountrycode');

            } else {
                searchTerm = decodeURIComponent(searchfield.split('=')[1]);
            }
            if ($("#settings-countrycode").data("country").toLowerCase().trim() == cSingapore) {
                searchTerm = searchTerm.split("&")[0];
            }
        } catch (e) {
            console.log('Error :' + e);
            searchTerm = searchfield.split('=')[1];
            $('#errorModal').modal();
            $('#errorModal').on('shown.bs.modal', function() {
                $("#errorModal .modal-body").html($("#searchErr").html());
            });
        }

        setScopeVar(searchfield.split('=')[0], searchTerm);
        /*var uri = window.location.href.toString();
        if (uri.indexOf("?") > 0) {
            var clean_uri = uri.substring(0, uri.indexOf("?"));
            window.history.replaceState({}, document.title, clean_uri);
        }*/
        return searchTerm;
    }

    function getUrlSgQuery() {
        var searchfield = window.location.href.slice(window.location.href.indexOf('?') + 1);
        var searchTerm;
        //crm
        if (searchfield.toLowerCase().indexOf("quicksearch") >= 0) {
            searchTerm = GlobalLocatorApproach == "1" ? decodeURIComponent(searchfield.split('=')[2]) : decodeURIComponent(searchfield.split('=')[1]);
            searchTerm = searchTerm.split("&")[0];
        } else {
            searchTerm = decodeURIComponent(searchfield.split('=')[1]);
        }

        setScopeVar(searchfield.split('=')[0], searchTerm);
        searchTerm = searchTerm.split("&")[0];
        /*var uri = window.location.href.toString();
        if (uri.indexOf("?") > 0) {
            var clean_uri = uri.substring(0, uri.indexOf("?"));
            window.history.replaceState({}, document.title, clean_uri);
        }*/
        return searchTerm;
    }

    function getURLlat() {
        var latitude = window.location.toString().split("&")[1];
        if (latitude != null && latitude != undefined) {
            latitude = latitude.toString().split("=")[1];
        }
        return latitude;
    }

    function getURLlong() {
        var longitude = window.location.toString().split('&&')[1];
        if (longitude != null & longitude != undefined) {
            longitude = longitude.toString().split("=")[1];
        }
        return longitude;
    }

    //set search term in quick search page
    function setScopeVar(key, searchTerm) {
        if (key == 'quicksearch') {
            if (searchTerm.indexOf("&") > 1) {
                searchTerm = searchTerm.split("&")[0];
            }
            $scope.searchLoc = searchTerm.capitalize();
        }
    }

    // set url params for individual clinic search
    $scope.setSearchClinicURL = function (event, info) {

        if ($('body').hasClass("IndiaCoolsculpting") && $('body').attr('pagename') == "reduce-extra-bulges" || $('body').attr('pagename') == "non-surgical-body-contouring") {
            //no action
        }
        else {

            var id = info.id;
            setQueryParam(event, id);
        }
    }

    function setQueryParam(event, clinicId) {
        var params = {};
        params = locationObject;
        params['id'] = clinicId,
            pageNav = angular.element('.clinicInfo-inner').attr('data-nav');
        //crm
        var sf = "";
        if (GlobalLocatorApproach == "1" & ICLclusterCountrycode != "") {
            sf = GlobalLocatorApproach == "1" ? "sf=1&iclcountrycode=" + GetUrlParameter("iclcountrycode") + "&" : "";
        }
        else if(GlobalLocatorApproach == "1")
        {
            sf = "sf=1&";
        }
       
       //$(event.target).attr('href', pageNav + "?" + sf + "params=" + $.param(params));  
        var newpageurl = pageNav + "?" + sf + "params=" + $.param(params);
        window.open(newpageurl, '_blank');
           
    }

}]);

function setradiustext(selectedText) {
    $("#fcradiusselect").text(selectedText);
}

function setcountrytext(selectedText) {
    $("#fccountryselect").text(selectedText.capitalize());
}

function toggleDataLayerInfo(element) {
    if ($(element).hasClass("disable")) {
        $(element).removeAttr("onclick");
    }
}

if ($("#settings-countrycode").data("country") != undefined) {
    if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMexico) {
        $('.clinicInfo-footer').css("display", "none");
        $('.col-xs-12.cs-result-footer').css("display", "none");
    }
}
if ($("#settings-countrycode").data("country") != undefined) {
    if ($("#settings-countrycode").data("country").toLowerCase().trim() == cAPAC) {
        $('.clinicInfo-footer').css("display", "none");
    }
}

app.controller("clinicSearchController", ['$scope', '$http', '$filter', '$q', 'leaveWebsiteModalService', function($scope, $http, $filter, $q, leaveWebsiteModalService) {
    var glUrl = angular.element('#settings-cliniclocatorapi').data('api'),
        searchParams = {
            LogicFilter: "",
            SearchTerm: "",
            SearchType: "",
            Radius: "-1",
            Latitude: "",
            Longitude: "",
            Apiurl: ""
        },
        myStyles = [{
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }],
        searchItem = '',
        map,
        deferred = $q.defer();
    $scope.clinicRecord = {};
    $scope.loader = true;

    //APAC Hide All Clinic list link
    if ($("#settings-countrycode").data("country").toLowerCase().trim() == cAPAC) {
        $('.all-clinics-wrapper').hide();
    }
    if ($('.cs-result-view').length > 0) {
        searchInit();
    }

    function searchInit() {
        var uri = window.location.href.toString();
        if (uri.indexOf("?") > 0) {
            //searchParams['LogicFilter'] = getUrlParameter('LogicFilter');
            searchParams['SearchTerm'] = supportLowercaseURL ? getUrlParameter('SearchTerm').toLowerCase() : getUrlParameter('SearchTerm');
            searchParams['SearchType'] = supportLowercaseURL ? getUrlParameter('SearchType').toLowerCase() : getUrlParameter('SearchType');
            searchParams['Latitude'] = supportLowercaseURL ? getUrlParameter('Latitude').toLowerCase() : getUrlParameter('Latitude');
            searchParams['Longitude'] = supportLowercaseURL ? getUrlParameter('Longitude').toLowerCase() : getUrlParameter('Longitude');
            searchParams['LogicFilter'] = supportLowercaseURL ? getUrlParameter('LogicFilter').toLowerCase() : getUrlParameter('LogicFilter');
            searchItem = supportLowercaseURL ? getUrlParameter('id').toLowerCase() : getUrlParameter('id');
            //crm
            GlobalLocatorApproach = getUrlParameter('sf');
        }

        if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
            setClinicInfo_V2();
        } else {
            setClinicInfo();
        }

    }

    function getUrlParameter(name) {
        name = supportLowercaseURL ? name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]').toLowerCase() : name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?params=&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    if ($("#settings-countrycode").data("country").toLowerCase().trim() == cAPAC) {
        $("a.ci-website").css("display", "none")
    }


    function setClinicInfo() {
        var url = location.origin + "/sc/api/findclinic/GetClinicResults";
        $.ajax({
            url: url,
            cache: false,
            type: 'POST',
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val(),
                'requestdata': searchParams
            },
            success: function(response) {

                if (response.data.IsValid && response.data.Code == "200" && response.data.Message != null) {

                    var pulledData = JSON.parse(response.data.Message);
                    setTimeout(function() { getclinicCallback(); }, 1000);

                    function getclinicCallback() {
                        //if state search or country search error code:
                        if (pulledData.locations_count <= 0) {
                            resultError();
                        } else {

                            findClinicMatch(pulledData);
                        }
                    }


                } else {
                    resultError();
                }
            },
            error: function(response) {
                resultError();
            }
        });

    }

    // Global clinic locator
    function setClinicInfo_V2() {


        //global sf clinic locator

        var sf_lat = supportLowercaseURL ? getUrlParameter('Latitude').toLowerCase() : getUrlParameter('Latitude');
        var sf_lng = supportLowercaseURL ? getUrlParameter('Longitude').toLowerCase() : getUrlParameter('Longitude');

        
        websitecountrycode = supportLowercaseURL ? getUrlParameter('iclcountrycode').toLowerCase() : getUrlParameter('iclcountrycode');

        var apiObject = {
            Latitude: sf_lat,
            Longitude: sf_lng,
            DistanceFrom: "0",
            DistanceTo: "-1",
            BrandName: "coolsculpting"
        };
        var jsonresults;

        $.ajax({
            type: "POST",
            url: "/sc/api/FindClinic/GetICLClinicResults",
            cache: false,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            data: {
                __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val(),
                Latitude: sf_lat,
                Longitude: sf_lng,
                DistanceFrom: "0",
                DistanceTo: "-1",
                Selectedcountrycode: websitecountrycode,
                BrandName: "coolsculpting",
                NewCountry: 'TH'   // 5-30-2023 support AEM api
            },
            success: function(result) {

                if (result.IsValid && result.data != null && result.data != "") {

                    jsonresults = JSON.parse(result.data);
                    setTimeout(function() { getclinicCallback(); }, 1000);

                    function getclinicCallback() {
                        //if state search or country search error code:
                        if (jsonresults.length <= 0) {
                            resultError();
                        } else {

                            findClinicMatch(jsonresults);
                        }
                    }


                } else {
                    resultError();
                }
            },
            error: function(response) {
                resultError();
            }
        });

    }

    //find the macthcing clinic
    function findClinicMatch(data) {
        // crm       
        var match;
        var latlon;
        if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
            match = $filter('filter')(data, { clinicId: searchItem });
            setfieldValues_V2(match[0]);
            latlon = new google.maps.LatLng(match[0].lat, match[0].longi);
        } else {
            match = $filter('filter')(data.locations, { id: searchItem });
            setfieldValues(match[0]);
            latlon = new google.maps.LatLng(match[0].lat, match[0].lng);
        }

        var icons = $('#markerImage').attr('data-src');

        map = new google.maps.Map(document.getElementById('clinicMarkerView'), {
            center: latlon,
            zoom: 13,
            styles: myStyles
        });
        var marker = new google.maps.Marker({
            position: latlon,
            map: map,
            icon: icons
        });
        marker.setMap(map);
        $scope.$apply(function() {
            $scope.loader = false;
        });
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == "th") {
            $(".clinicInfo-wrapper,.cs-info-wrapper").addClass("hide-physician");
        }
    }

    //error scenario
    function resultError() {
        if (!$scope.$$phase) {
            $scope.$apply(function() {
                $scope.loader = false;
            });
        } else {
            $scope.loader = false;
        }
        angular.element('#errorModal').modal();
        $('#errorModal').on('shown.bs.modal', function() {
            $("#errorModal .modal-body").html($("#Apigeolocationerr").html());
        });
    }

    function setfieldValues(match) {
        var addressObj = "",
            physician = "",
            isCanada = false,
            isUSA = false,
            isNull = false;

        switch (match.country.toLowerCase()) {
            case "united states of america":
            case "united states":
            case "usa":
            case "us":
                isUSA = true;
                break;

            case "ca":
            case "canada":
                isCanada = true;
                break;

            case "":
            case "-":
                isNull = true;
                break;

        }
        addressObj += (match.address1 != "") ? match.address1 + "\n" : "";
        addressObj += (match.address2 != "") ? match.address2 + "\n" : "";
        addressObj += (match.address3 != "") ? match.address3 + "\n" : "";

        if (isUSA || isCanada) {
            //add "city, "
            addressObj += (match.city != "") ? match.city + ", " : "";
            //add "state "
            addressObj += (match.state != "") ? match.state + " " : "";
            //add "zip"
            addressObj += (match.zipcode != "") ? match.zipcode : "";

        } else { //Int'l case
            //add "city, "
            addressObj += (match.city != "") ? match.city + ", " : "";
            //add "state, "
            addressObj += (match.state != "") ? match.state + ", " : "";
            //add "country"
            addressObj += (match.country != "") ? match.country : "";
            //add break before zip
            addressObj += "\n";
            //add zip(postal code)
            addressObj += (match.zipcode != "") ? match.zipcode : "";
        }
        physician = match.physician1 != "" ? match.physician1 : "";

        if (match.physician2 != "-" && match.physician2 != "") {
            physician = physician + ' ' + match.physician2
        }

        var checkid;
        checkid = match.id;
        var checkRate = 0;
        var checkCSImage = 0;
        var idIsMatched = false;
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == "uk") {
            angular.forEach(rateCenter, function(value, key) {
                if (!idIsMatched) {
                    if (value.id === checkid) {
                        idIsMatched = true;
                        checkRate = value.snowflakescore;
                        if (!isNaN(value.coolsculptingimage) && value.coolsculptingimage != "") {
                            checkCSImage = value.coolsculptingimage;
                        }
                    } else {
                        /*checkRate = 0;*/
                        checkRate = 0;
                        checkCSImage = 0;
                    }
                }
            });
        }
        $scope.$apply(function() {
            $scope.clinicRecord['snowflake'] = checkRate;
            $scope.clinicRecord['coolsculptingimage'] = checkCSImage;
            $scope.clinicRecord['address'] = addressObj;
            $scope.clinicRecord['physician'] = physician;
            $scope.clinicRecord["id"] = match.id;
            $scope.clinicRecord["lat"] = match.lat;
            $scope.clinicRecord["lng"] = match.lng;
            $scope.clinicRecord["website"] = match.website;
            $scope.clinicRecord["book_consultation_url"] = match.book_consultation_url;
            $scope.clinicRecord["email"] = match.email;
            $scope.clinicRecord["name"] = match.name;
            $scope.clinicRecord["distance"] = match.distance;
            $scope.clinicRecord["phone"] = match.phone;
            $scope.clinicRecord['image'] = match.physician_image;
            $scope.clinicRecord['about'] = match.about_practice;
        });
    }

    // global clinic locator approach

    function setfieldValues_V2(match) {
        var addressObj = "",
            physician = "",
            isCanada = false,
            isUSA = false,
            isNull = false;

        switch (match.clinic_address.country.toLowerCase()) {
            case "united states of america":
            case "united states":
            case "usa":
            case "us":
                isUSA = true;
                break;

            case "ca":
            case "canada":
                isCanada = true;
                break;

            case "":
            case "-":
                isNull = true;
                break;

        }
        addressObj += (match.clinic_address.street != "") ? match.clinic_address.street + "\n" : "";
        //addressObj += (match.address2 != "") ? match.address2 + "\n" : "";
        //addressObj += (match.address3 != "") ? match.address3 + "\n" : "";

        if (isUSA || isCanada) {
            //add "city, "
            addressObj += (match.clinic_address.city != "") ? match.clinic_address.city + ", " : "";
            //add "state "
            addressObj += (match.clinic_address.state != "") ? match.clinic_address.state + " " : "";
            //add "zip"
            addressObj += (match.clinic_address.zip_code != "") ? match.clinic_address.zip_code : "";

        } else { //Int'l case
            //add "city, "
            addressObj += (match.clinic_address.city != "") ? match.clinic_address.city + ", " : "";
            //add "state, "
            addressObj += (match.clinic_address.state != "") ? match.clinic_address.state + ", " : "";
            //add "country"
            addressObj += (match.clinic_address.country != "") ? match.clinic_address.country : "";
            //add break before zip
            addressObj += "\n";
            //add zip(postal code)
            addressObj += (match.clinic_address.zip_code != "") ? match.clinic_address.zip_code : "";
        }
        // crm doubt
        //physician = match.physician1 != "" ? match.physician1 : "";

        //if (match.physician2 != "-" && match.physician2 != "") {
        //    physician = physician + ' ' + match.physician2
        //}

        var checkid;
        // crm id
        checkid = "1";
        var checkRate = 0;
        var checkCSImage = 0;
        var idIsMatched = false;
        if ($("#settings-countrycode").data("country").toLowerCase().trim() == "uk") {
            angular.forEach(rateCenter, function(value, key) {
                if (!idIsMatched) {
                    if (value.id === checkid) {
                        idIsMatched = true;
                        checkRate = value.snowflakescore;
                        if (!isNaN(value.coolsculptingimage) && value.coolsculptingimage != "") {
                            checkCSImage = value.coolsculptingimage;
                        }
                    } else {
                        /*checkRate = 0;*/
                        checkRate = 0;
                        checkCSImage = 0;
                    }
                }
            });
        }

        var clinicweburl = "";
        if (match.website_url != null && match.website_url != "") {

            clinicweburl = match.website_url.indexOf('http') !== -1 ? match.website_url : "https://" + match.website_url;
        }


        $scope.$apply(function() {
            $scope.clinicRecord['snowflake'] = checkRate;
            $scope.clinicRecord['coolsculptingimage'] = checkCSImage;
            $scope.clinicRecord['address'] = addressObj;
            $scope.clinicRecord['physician'] = physician;
            // crm
            $scope.clinicRecord["id"] = "1";
            $scope.clinicRecord["lat"] = match.lat;
            $scope.clinicRecord["lng"] = match.longi;
            $scope.clinicRecord["website"] = clinicweburl;
            $scope.clinicRecord["book_consultation_url"] = match.book_consultation_url;
            $scope.clinicRecord["email"] = match.email;
            $scope.clinicRecord["name"] = match.clinicName;
            // crm
            //$scope.clinicRecord["distance"] = match.distance;
            $scope.clinicRecord["phone"] = match.clinic_contact;

            if (match.practitioners.length > 0 && match.practitioners[0] != undefined && match.practitioners[0].hasOwnProperty("practitionerimageurl") && match.practitioners[0].practitionerimageurl != "") {
                $scope.clinicRecord['image'] = match.practitioners[0].practitionerimageurl;
            }

            //Clinic open hours
            $scope.clinicRecord['about'] = ClinicopeningHours(match.clinc_hours);

        });
    }

    $scope.openWebsite = function(event) {
        leaveWebsiteModalService.initializeLeavingWebsiteModal();
        leaveWebsiteModalService.sendRequest(event);
    }

    $scope.openConsultationUnbounceForm = function(event) {
        event.preventDefault();
        var element = event.currentTarget;

        if (document.getElementsByClassName('ub-emb-container').length < 1 || document.getElementsByClassName('ub-emb-iframe').length < 1) {
            return;
        }

        var ubContainer = document.getElementsByClassName('ub-emb-container')[0];
        var ubIframe = document.getElementsByClassName('ub-emb-iframe')[0];
        var iframeSrc = ubIframe.src;

        var iframeLoaded = function() {
            ubContainer.classList.add('show');
        }

        ubContainer.classList.remove('show');
        ubIframe.addEventListener('load', iframeLoaded, true);
        ubIframe.src =
            iframeSrc + "&clinicName=" + encodeURIComponent(element.dataset.clinicName) +
            "&clinicAddress=" + encodeURIComponent(element.dataset.clinicAddress) +
            "&clinicPhone=" + encodeURIComponent(element.dataset.clinicPhone) +
            "&clinicEmail=" + encodeURIComponent(element.dataset.clinicEmail);
    }

    $scope.showallClinics = function() {
        var pageNav = angular.element(".all-clinics-wrapper").attr("data-nav");
        window.open(pageNav, "_blank");
    }
}]);

app.controller("allClinicsController", ['$scope', '$http', '$filter', function($scope, $http, $filter) {
    $scope.loader = false;
    var glUrl = angular.element('#settings-cliniclocatorapi').data('api'),
    domain = $("#settings-countrycode").data("country");
    var domainSettings = "";
    var countryName = "";
    var urlParams = "";
    domainSettings = $("#settings-countrycode").data("country");
    var domainArray = [];
    function setQueryParam(event, clinicId) {
        var params = {};
        params = locationObject;
        params['id'] = clinicId,
            pageNav = angular.element('.clinicInfo-inner').attr('data-nav');
        //crm
        var sf = "";
        if (GlobalLocatorApproach == "1" & ICLclusterCountrycode != "") {
            sf = GlobalLocatorApproach == "1" ? "sf=1&iclcountrycode=" + GetUrlParameter("iclcountrycode") + "&" : "";
        }
        else if (GlobalLocatorApproach == "1") {
            sf = "sf=1&";
        }

        //$(event.target).attr('href', pageNav + "?" + sf + "params=" + $.param(params));  
        var newpageurl = pageNav + "?" + sf + "params=" + $.param(params);
        window.open(newpageurl, '_blank');

    }
    if (domainSettings) {
        domainArray = domainSettings.toLowerCase().trim().split(",");
    }
    var markset, map, count, currentCount = 0,
        zoomDefault = 0;
    countryName = $("#settings-countryname").data("countryname");
    setDomainAndCountry();
    //countryName = $("#settings-countryname").data("countryname"),
    if ($("#settings-countrycode").data("country").toLowerCase() == cSingapore) {
        locationObject = {
            LogicFilter: domainSettings,
            SearchTerm: countryName,
            SearchType: "Country",
            Radius: radius,
            Latitude: "",
            Longitude: "",
            Apiurl: glUrl,
            //ChangeCountry: countrydisplayname,
            // ChangeCountryCode: changecountrycode,
            //Usemyloc: usemylocation
        };

        //Find Lat/Long/SearchType

        var geocoder = new google.maps.Geocoder();
        var lat_val;
        var lng_val;
        var IsUsrCountryUS = false;
        var IszipCountryUS = false;
        var addressSearch;
        var cTaiwan = "TW";
        var locationsList = [],
            locInfo = {},
            locationArray = [];

        addressSearch = countryName + ',' + domainSettings;
        if (geocoder) {
            IsUseMyLocationSelected = false;
            geocoder.geocode({ 'address': addressSearch }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var indexToUse = 0;
                    if (IsUsrCountryUS) {
                        for (var k = 0; k < results[0].address_components.length; k++) {
                            var usrResult = results[0].address_components[k];
                            //Loop through result types until matching one found
                            //Set logic filter once country is found
                            if (usrResult.types[0] == "country") {
                                var usrCountrycode = usrResult.short_name;
                                if (usrCountrycode == "US") {
                                    IszipCountryUS = true;
                                }
                                break;
                            }
                        }
                    } else {
                        searchTerm = results[indexToUse].formatted_address;
                    }

                    //Get Lat/Long
                    //Set search location pin to search term lat/long
                    locationObject.Latitude = results[indexToUse].geometry.location.lat();
                    locationObject.Longitude = results[indexToUse].geometry.location.lng();

                    //Get SearchType
                    //Valid options: Proximity, Address, City, StateProvince, PostalCode, Country
                    var type;

                    //Here Be Hacky Exceptions

                    if (locationObject.SearchTerm.capitalize() == "Phoenix" && locationObject.Radius == -1) {
                        locationObject.Radius = 22.53;
                    }

                    var ddlradius = $("#selectRadiusList option:selected").val();
                    var radiusparsed = 0;
                    if (ddlradius !== undefined) {
                        radiusparsed = parseInt(ddlradius);
                    }
                    if (radiusparsed > 0) {
                        locationObject.Radius = radiusparsed / 0.62137;
                    }
                    if (locationObject.SearchTerm.toLowerCase().indexOf("ireland") >= 0 && radiusparsed === 0) {
                        radius = 160.93470;
                        locationObject.Radius = radius;
                    }
                    if (locationObject.SearchTerm.toLowerCase().indexOf("london") >= 0 &&
                        locationObject.Radius < 40 &&
                        radiusparsed == 0) {
                        radius = 40.2336;
                        locationObject.Radius = radius;
                    }
                }
            })
        }


        var markers = [];
        myStyles = [{
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }]

    }
        function addPracticesToMap(results) {
            var icons = $('#markerImage').attr('data-src');
            var bounds = new google.maps.LatLngBounds();
            //clearmap
            setMapOnAll(null);
            markers = [];
            var bool = true;
            var linkText = angular.element("#link-text").text();
            var icon = angular.element('#map-web-icon').attr('data-icon');


            $.each(results, function (i, item) {
                locInfo = {};
                //Build Address
                var isCanada = false;
                var isUSA = false;
                var isNull = false;

                switch (this.clinic_address.country.toLowerCase()) {
                    case "united states of america":
                    case "united states":
                    case "usa":
                    case "us":
                        isUSA = true;
                        break;

                    case "ca":
                    case "canada":
                        isCanada = true;
                        break;

                    case "":
                    case "-":
                        isNull = true;
                        break;

                }
                /** Note required fields for address are as follows:
                 *  -Should match SFLocationRepository.cs logic
                 * Country
                 * City
                 **/

                var addressObj = "",
                    physician = "";

                addressObj += (this.clinic_address.street != "") ? this.clinic_address.street + "\n" : "";
                //addressObj += (this.address2 != "") ? this.address2 + "\n" : "";
                //addressObj += (this.address3 != "") ? this.address3 + "\n" : "";

                if (isUSA || isCanada) {
                    //add "city, "
                    addressObj += (this.clinic_address.city != "") ? this.clinic_address.city + ", " : "";
                    //add "state "
                    addressObj += (this.clinic_address.state != "") ? this.clinic_address.state + " " : "";
                    //add "zip"
                    addressObj += (this.clinic_address.zip_code != "") ? this.clinic_address.zip_code : "";

                } else { //Int'l case
                    //add "city, "
                    addressObj += (this.clinic_address.city != "") ? this.clinic_address.city + ", " : "";
                    //add "state, "
                    addressObj += (this.clinic_address.state != "") ? this.clinic_address.state + ", " : "";
                    //add "country"
                    addressObj += (this.clinic_address.country != "") ? this.clinic_address.country : "";
                    //add break before zip
                    addressObj += "\n";
                    //add zip(postal code)
                    addressObj += (this.clinic_address.zip_code != "") ? this.clinic_address.zip_code : "";
                }

                // crm
                //physician = this.physician1 != "" ? this.physician1 : "";

                //if (this.physician2 != "-" && this.physician2 != "") {
                //    physician = physician + ' ' + this.physician2
                //}
                if (domain != undefined && domain.toLowerCase().trim() == "uk") {
                    $scope.showsnowflakediv = true;
                    var checkid;
                    checkid = this.clinicId;
                    var checkRate = 0;
                    var checkCSRate = 0;
                    angular.forEach(rateCenter, function (value, key) {
                        if (value.clinicId === checkid) {
                            locInfo["snowflake"] = value.snowflakescore;
                            if (!isNaN(value.coolsculptingimage) && value.coolsculptingimage != "") {
                                locInfo["coolsculptingimage"] = value.coolsculptingimage;
                            }
                        } else {
                            checkRate = 0;
                            checkCSRate = 0;
                        }
                    });
                }
                var clinicwebsite = "";
                var bookConsultationWebsite = "";
                if (this.website_url != null && this.website_url != "") {

                    clinicwebsite = this.website_url.indexOf('http') !== -1 ? this.website_url : "https://" + this.website_url;
                }

                if (this.book_consultation_url != null && this.book_consultation_url != "") {
                    bookConsultationWebsite = this.book_consultation_url.indexOf('http') !== -1 ? this.book_consultation_url : "https://" + this.book_consultation_url;
                }

                // crm
                locInfo["id"] = this.clinicId;
                locInfo["lat"] = this.lat;
                locInfo["lng"] = this.longi;
                locInfo['address'] = addressObj;
                locInfo["website"] = clinicwebsite;
                locInfo["email"] = this.email;
                locInfo["name"] = this.clinicName;
                // crm
                locInfo["distance"] = this.distance;
                locInfo["phone"] = this.clinic_contact;
                locInfo["physician"] = physician;
                //crm
                locInfo["distancekey"] = this.distancekey;
                locInfo["book_consultation_url"] = bookConsultationWebsite;
                //Map Icon Info HTML

                var mapHTML = "";
                var hideclinicdetail = $("#clinic-search").attr("data-hideclinicinfo");

                mapHTML += "<div class=\"map-info \">";
                if (this.clinicName) {
                    // crm id
                    mapHTML += "<a href=\"javascript:void(0)\" target=\"\" data-id='" + this.clinicId + '\'' + " class=\"ci-title js-title-click practice mar_bt10\">" + this.clinicName + "</a>";
                }
                if (hideclinicdetail == "True") {
                    mapHTML += "<div class=\"clinicInfo-address\" style=\"display: none;\">";
                }
                else {
                    mapHTML += "<div class=\"clinicInfo-address\">";
                }

                // mapHTML += "<div class=\"clinicInfo-address\">";
                if (physician) {
                    mapHTML += "<span class=\"physician mar_bt10\">" + physician + "</span>";
                }
                if (addressObj) {
                    mapHTML += "<span class=\"address mar_bt10\">" + addressObj + "</span>";
                }
                var showphbtn = $("#clinic-search").attr("data-showphbtn");
                var showphbtnqs = $("#quick-search").attr("data-showphbtn");
                var phlbl = $("#clinichelperr").attr("data-phlbl");
                var maillbl = $("#clinichelperr").attr("data-emaillbl");
                if (this.clinic_contact) {

                    if (showphbtn == "True" || showphbtnqs == "True") {
                        mapHTML += "<a href='" + "javascript:void(0)" + '\'' + "class=\"mar_bt10 phonebtn ci-bluefont\"" + ">" + phlbl + "<img src=\"" + icon + "\" ></a>"
                        mapHTML += "<a href='" + 'tel:' + this.clinic_contact + '\'' + "class=\"mar_bt10 phone showclinicphoneno\"" + ">" + 'T:' + this.clinic_contact + "</a>"
                    } else {
                        mapHTML += "<a href='" + 'tel:' + this.clinic_contact + '\'' + "class=\"mar_bt10 phone\"" + ">" + 'T:' + this.clinic_contact + "</a>"
                    }

                }
                if (this.email) {
                    if (showphbtn == "True" || showphbtnqs == "True") {
                        mapHTML += "<a href='" + 'mailto:' + this.email + '\'' + "class=\"mar_bt10 email ci-bluefont\"" + ">" + maillbl + "<img src=\"" + icon + "\" ></a>"
                    } else {
                        mapHTML += "<a href='" + 'mailto:' + this.email + '\'' + "class=\"mar_bt10 email\"" + ">" + this.email + "</a>"
                    }

                }

                /* mapHTML += "<a href=\"javascript:void(0);\" target=\"_blank\" class=\"mar_bt10 info-wrap\">"+
                 "<span class=\"moreInfo\"> more info</span>"+
                 "<img src=\"media/svg/chevron-right_bl.svg\" alt=\"moreInfo link\">"+"</a>";*/

                if (this.website_url) {
                    mapHTML += "<a href='" + clinicwebsite + '\'' + "target=\"_blank\" class=\"mar_bt10 ci-website\"  onclick=\"openLeaveWebsiteDisclaimerModal(event)\"  " + ">" + linkText + "<img src=\"" + icon + "\" ></a>";
                }

                mapHTML += "</div>"
                mapHTML += "</div>";
                //Add location into LocationList
                var location = {
                    lat: this.lat,
                    lon: this.longi,
                    html: mapHTML
                };
                locationsList.push(location);
                locationArray.push(locInfo)
            })

            for (i = 0; i < results.length; i++) {
                if (i == 0) {
                    var latlon = new google.maps.LatLng(results[i].lat, results[i].longi);
                    map = new google.maps.Map(document.getElementById('mapView'), {
                        center: latlon,
                        zoom: 13,
                        styles: myStyles
                    });

                    var im = angular.element('#markerIcon').attr('data-src');
                    var myLatLng = new google.maps.LatLng(locationObject.Latitude, locationObject.Longitude);
                    //initMap(coordinates.location.lat, coordinates.location.lng);
                    var userMarker = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        icon: im
                    });


                }
                var locationInfowindow = new google.maps.InfoWindow({
                    content: locationsList[i].html
                });

                //map info view title click
                google.maps.event.addListener(locationInfowindow, 'domready', function () {
                    angular.element('.js-title-click').on("click", function (event) {
                        var id = $(event.target).attr('data-id');
                        setQueryParam(event, id);
                    });
                    angular.element('.map-info .clinicInfo-address .address,.map-info .clinicInfo-address .phone').on("click", function () {
                        setdataLayer('clinicClickToCall');
                    });
                    angular.element('.map-info .clinicInfo-address .email').on("click", function () {
                        setdataLayer('clinicClickToEmail');
                    });
                    angular.element('.map-info .clinicInfo-address .ci-website').on("click", function () {
                        setdataLayer('clinicVisitWebsite');
                    });
                    var phdatalayer = $("#clinichelperr").attr("data-ShowPhoneEventName");
                    if (phdatalayer != undefined && phdatalayer != "") {
                        angular.element('.map-info .clinicInfo-address .address,.map-info .clinicInfo-address .phonebtn').on("click", function () {
                            setdataLayer(phdatalayer);
                        });
                    }
                    window.dataLayer = window.dataLayer || [];
                    var clickedAreainMap = $.parseHTML(this.content);
                    var selectedAreaName = $(clickedAreainMap).find('.js-title-click').text();
                    var selectedAreaAddress = $(clickedAreainMap).find('.address').text();
                    dataLayer.push({
                        clinicName: selectedAreaName,
                        clinicAddress: selectedAreaAddress,
                        event: 'mapClinicClicked'
                    });
                })

                var placeLoc = new google.maps.LatLng(results[i].lat, results[i].longi);

                var marker = new google.maps.Marker({
                    position: placeLoc,
                    map: map,
                    infowindow: locationInfowindow,
                    icon: icons,
                    label: {
                        text: (i + 1).toString(),
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "bold"
                    }
                });
                bounds.extend(placeLoc);
                markers.push(marker);
                google.maps.event.addListener(marker, 'click', function () {
                    hideAllInfoWindows(map);
                    this.infowindow.open(map, this);
                });

            }
            showMarkers();
            map.fitBounds(bounds);
            google.maps.event.addListenerOnce(map, 'idle', function () {
                if (map.getZoom() > 16) {
                    map.setZoom(16);
                }
                zoomDefault = map.getZoom();
            });
            // angular.element('.js-title-click').addEventListener('click', dummy.bind(this));
        }

   
    //close all marker
    function hideAllInfoWindows(map) {
        markers.forEach(function (marker) {
            marker.infowindow.close(map, marker);
        });
    }

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Shows any markers currently in the array.
    function showMarkers() {
        setMapOnAll(map);
    }

    function setDomainAndCountry() {
        urlParams = {
            LogicFilter: domainSettings,
            SearchTerm: countryName,
            SearchType: "Country",
            Radius: "-1",
            Latitude: "",
            Longitude: "",
            Apiurl: ""
        };
        if ($('.cs-clinics-view').length > 0) {
            clinicListInit();
        }
    }

    function clinicListInit() {
        $scope.loader = true;
        var geocoder = new google.maps.Geocoder();

        var searchTermKey = "SearchTerm";
        var latitudeKey = "Latitude";
        var longitudeKey = "Longitude";
        var logicFilter = "LogicFilter";

        geocoder.geocode({ 'address': urlParams[searchTermKey] }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                urlParams[latitudeKey] = results[0].geometry.location.lat();
                urlParams[longitudeKey] = results[0].geometry.location.lng();
                if (domainArray.indexOf("uk") != -1) {
                    urlParams[searchTermKey] = "United Kingdom,Northern Ireland";
                    urlParams[logicFilter] = "uk,ie";
                    urlParams[latitudeKey] = results[0].geometry.location.lat() + ",53.1423672";
                    urlParams[longitudeKey] = results[0].geometry.location.lng() + ",-7.692053600000008";
                    //crm
                    if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
                        urlParams[latitudeKey] = results[0].geometry.location.lat();
                        urlParams[longitudeKey] = results[0].geometry.location.lng();
                        getClinicList_V2();
                    } else {
                        getClinicList();
                    }
                } else {
                    if (domainArray.indexOf(cMEA) != -1) {
                        urlParams[searchTermKey] = "Jordan,Soudi Arabia,Kuwait,Bahrain,Lebanon,Oman,Qatar,United Arab Emirates,Morocco";
                        urlParams[logicFilter] = "jo,sa,kw,bh,lb,om,qa,ae,ma";
                        urlParams[latitudeKey] = results[0].geometry.location.lat() + ",24.774265" + ",29.378586" + ",26.219057" + ",33.888630" + ",23.614328" + ",25.286106" + ",25.276987" + ",33.589886";
                        urlParams[longitudeKey] = results[0].geometry.location.lng() + ",46.738586" + ",47.990341" + ",50.592964" + ",35.495480" + ",58.545284" + ",51.534817" + ",55.296249" + ",-7.603869";
                    }
                    if (domainArray.indexOf(cLATAM) != -1) {
                        urlParams[searchTermKey] = "Argentina,Uruguay,Paraguay,Chile,Peru,Bolivia,Panama,Costa Rica,Guatemala,Republica Dominicana,Jamaica,Martinique,Cayman Island,Bermuda,Trinidad Y Tobago,Venezuela,Ecuador";
                        urlParams[logicFilter] = "ar,uy,py,cl,pe,bo,pa,cr,gt,do,jm,mq,ky,bm,tt,ve,ec";
                        urlParams[latitudeKey] = results[0].geometry.location.lat() + ",32.522778" + ",-23.442503" + ",-35.675148" + ",-9.189967" + ",-16.290154" + ",8.537981" + ",9.748917" + ",15.783471" + ",-31.787790" + ",18.109581" + ",14.641528" + ",38.537029" + ",32.307800" + ",-32.907299" + ",6.423750" + ",-1.831239";
                        urlParams[longitudeKey] = results[0].geometry.location.lng() + ",-55.765835" + ",-58.443832" + ",-71.542969" + ",-75.015152" + ",-63.588654" + ",-80.782127" + ",-83.753426" + ",-90.230759" + ",-60.843681" + ",-77.297508" + ",-61.024174" + ",-121.574432" + ",-64.750504" + ",-68.891617" + ",-66.589729" + ",-78.183403";
                    }

                    if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
                        getClinicList_V2();
                    } else {
                        getClinicList();
                    }
                }
            } else {
                setTimeout(function() { resultError() }, 1000);
            }
        });
    }

    function getClinicList() {
        var url = location.origin + "/sc/api/findclinic/GetClinicResults";
        $.ajax({
            url: url,
            cache: false,
            type: 'POST',
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val(),
                'requestdata': urlParams
            },
            success: function(response) {

                if (response.data.IsValid && response.data.Code == "200" && response.data.Message != null) {

                    var pulledData = JSON.parse(response.data.Message);
                    if (response.data.AdditionalMessages != "") {

                        var collection = JSON.parse("[" + response.data.AdditionalMessages + "]");

                        for (icount = 0; icount < collection.length; icount++) {
                            Array.prototype.push.apply(pulledData.locations, collection[icount].locations);
                        }
                    }
                    setTimeout(function() { clinicListCallback(); }, 1000);

                    function clinicListCallback() {
                        //if state search or country search error code:
                        if (pulledData.locations_count <= 0) {
                            resultError();
                        } else {

                            setallClinics(pulledData);
                        }
                    }


                } else {
                    resultError();
                }
            },
            error: function(response) {
                resultError();
            }
        });
    }

    // Global clinic locator
    function getClinicList_V2() {


        var sf_lat = urlParams["Latitude"];
        var sf_lng = urlParams["Longitude"];

        var apiObject = {
            Latitude: sf_lat,
            Longitude: sf_lng,
            DistanceFrom: "0",
            DistanceTo: "-1",
            BrandName: "coolsculpting"
        };
        var jsonresults;
        $.ajax({
            type: "POST",
            url: "/sc/api/FindClinic/GetICLClinicResults",
            cache: false,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val(),
                Latitude: "0",
                Longitude: "0",
                DistanceFrom: "0",
                DistanceTo: "-1",
                clustercountrycode: ICLclusterCountrycode,
                BrandName: "coolsculpting",
                NewCountry: 'TH'   // 5-30-2023 support AEM api
            },
            success: function(response) {

                if (response.IsValid && response.data !== null && response.data !== "") {
                    jsonresults = JSON.parse(response.data);
                    setallClinics(jsonresults);
                    
                }

            }

        });
    }

    function setallClinics(response) {
        $scope.loader = false;
        var scope = GlobalLocatorApproach == "1" ? response : response.locations;
        //sort clinics based on name;
        
        $scope.$apply(function() {
            $scope.clinics = orderingClinics(scope); 
            if ($("#settings-countrycode").data("country").toLowerCase() == cSingapore) {
                addPracticesToMap($scope.clinics);

            }
            if (domainArray.indexOf("uk") != -1) {
                angular.forEach($scope.clinics, function(value1, key1) {
                    angular.forEach(rateCenter, function(value2, key2) {
                        if (value1.id === value2.id) {
                            value1["snowflake"] = value2.snowflakescore;
                            if (!isNaN(value2.coolsculptingimage) && value2.coolsculptingimage != "") {
                                value1["coolsculptingimage"] = value2.coolsculptingimage;
                            }
                        }
                    });
                });
            }
        });
        
    }
    //crm
    function orderingClinics(locationArray) {
        locationArray.sort(function(a, b) {
            if ($("#settings-countrycode").data("country").toLowerCase() == "uk") {
                var a_clinicname = GlobalLocatorApproach == "1" ? a.clinicName.toLowerCase() : a.name.toLowerCase();
                var b_clinicname = GlobalLocatorApproach == "1" ? b.clinicName.toLowerCase() : b.name.toLowerCase();

                if (a_clinicname.indexOf("the ") == 0) {
                    a_clinicname = a_clinicname.replace("the ", "")
                }
                if (b_clinicname.indexOf("the ") == 0) {
                    b_clinicname = b_clinicname.replace("the ", "")
                }

                var c = 0;
                if (a_clinicname < b_clinicname) { c = -1; }
                if (a_clinicname > b_clinicname) { c = 1; }

                return c;
            } else {
                var a_clinicname = GlobalLocatorApproach == "1" ? a.clinicName.toLowerCase() : a.name.toLowerCase();
                var b_clinicname = GlobalLocatorApproach == "1" ? b.clinicName.toLowerCase() : b.name.toLowerCase();
                var c = 0;
                if (a_clinicname < b_clinicname) { c = -1; }
                if (a_clinicname > b_clinicname) { c = 1; }

                return c;
            }
        });

        var cleaned = [];
        locationArray.forEach(function(itm) {
            console.log(itm)
            var unique = true;
            cleaned.forEach(function(itm2) {
                if (angular.equals(itm.name, itm2.name) && angular.equals(itm.lat, itm2.lat) && angular.equals(itm.lng, itm2.lng)) unique = false;
            });
            if (unique) cleaned.push(itm);
        });

        return cleaned;
    }

    // set url params for individual clinic search
    $scope.setURLparam = function(event, info) {
        var clinicId = GlobalLocatorApproach == "1" ? info.clinicId : info.id;
        params = {};
        //crm
        var city;
        var countryname = GlobalLocatorApproach == "1" ? info.clinic_address.country.toLowerCase().trim() : info.country.toLowerCase().trim();
        if (domainArray.indexOf("uk") != -1 && countryname == "ireland") {
            urlParams.LogicFilter = 'ie';
            urlParams.SearchTerm = 'ireland';
            params = urlParams;
        } else
        if (domainArray.indexOf("uk") != -1 && countryname == "ireland {republic}") {
            urlParams.LogicFilter = 'uk';
            urlParams.SearchTerm = 'ireland {republic}';
            params = urlParams;
        } else {
            if ($("#settings-countrycode").data("country").toLowerCase().trim() == cMEA) {
                urlParams.LogicFilter = 'bh';
                urlParams.SearchTerm = countryname;
                params = urlParams;
            } else if ($("#settings-countrycode").data("country").toLowerCase().trim() == cLATAM) {
                urlParams.LogicFilter = 'ar';
                urlParams.SearchTerm = countryname;
                params = urlParams;
            } else {
                urlParams.LogicFilter = $("#settings-countrycode").data("country");
                urlParams.SearchTerm = $("#settings-countryname").data("countryname");
                params = urlParams;
            }
        }
        params['id'] = clinicId;
        // crm
        var sf;
        if (GlobalLocatorApproach != undefined && GlobalLocatorApproach != "" && GlobalLocatorApproach != null && GlobalLocatorApproach == "1") {
            params['Latitude'] = info.lat;
            params['Longitude'] = info.longi;
            if (ICLclusterCountrycode != undefined && ICLclusterCountrycode != "") {
                sf = "sf=1&iclcountrycode=" + info.countrycode + "&";
            }
            else {
                sf = "sf=1&";
            }            
        }

        pageNav = angular.element('.clinic-list-wrapper').attr('data-nav');
        var href = pageNav + "?" + sf + "params=" + $.param(params);
        if (domainArray.indexOf("au") != -1 && countryname.contains("australia")) {
            return href;
        } else {
           // $(event.target).attr('href', href);
            window.open(href, '_blank');
        }
    }

    //error scenario
    function resultError() {
        if (!$scope.$$phase) {
            $scope.$apply(function() {
                $scope.loader = false;
            });
        } else {
            $scope.loader = false;
        }
        angular.element('#errorModal').modal();
        $('#errorModal').on('shown.bs.modal', function() {
            $("#errorModal .modal-body").html($("#Apigeolocationerr").html());
        });
    }
}]);


app.controller("imageMapController", ['$scope', '$timeout', '$filter', '$sce', function($scope, $timeout, $filter, $sce) {
    var slide, bxicon;
    $scope.courtesy = " ";
    $scope.hotspotData = {};
    $scope.records = {};
    $scope.tapped = "abdomen";
    var bparts = [];
    $scope.bodyRecords = {};
    $scope.initHotspot = function(data, img) {
            $scope.hotspotData = data;
            bxicon = img
            angular.forEach(data, function(value, key) {
                bparts.push(value.__interceptors[0].Values.Bodyparts);
            });
            $scope.myLength = $scope.hotspotData.length;
            for (i = 0; i < $scope.myLength; i++) {
                $scope.str = $scope.hotspotData[i].__interceptors[0].Values.CourtesyText;
                $scope.str1 = $scope.hotspotData[i].__interceptors[0].Values.SuperscriptCourtesy;
                if ($scope.str1 != "" && $scope.str1 != undefined) {
                    var Courtesy = $scope.hotspotData[i].__interceptors[0].Values.SuperscriptCourtesy;
                    $scope.hotspotData[i].__interceptors[0].Values['Courtesy'] = Courtesy;
                } else if ($scope.str != "") {
                    var Courtesy1 = $scope.hotspotData[i].__interceptors[0].Values.CourtesyText;
                    $scope.hotspotData[i].__interceptors[0].Values['Courtesy'] = Courtesy1;
                }
            }
            bparts = $.unique(bparts);
            angular.forEach(bparts, function(value, key) {
                var info = [];
                angular.forEach($scope.hotspotData, function(patientinfo, key) {
                    if (value == patientinfo.__interceptors[0].Values.Bodyparts) {
                        info.push(patientinfo.__interceptors[0].Values);
                    }
                });
                $scope.bodyRecords[value.toLowerCase()] = info;
            });
            $scope.records = _sort($scope.bodyRecords[$scope.tapped]);
            $scope.selectedMenu = $(".dropdown-select option[value='" + $scope.tapped + "']").data("html");
            $timeout(function() {
                sliderInit();
            }, 0);
        }
        /* $http.get('json/info_new.json')
             .success(function (data) {
                 $scope.hotspotData = data;

                 angular.forEach(data, function (value, key) {
                     bparts.push(value.__interceptors[0].Values.Bodyparts);
                 });
                 bparts = $.unique(bparts);
                 angular.forEach(bparts, function (value, key) {
                     var info = [];
                     angular.forEach($scope.hotspotData, function (patientinfo, key) {
                         if (value == patientinfo.__interceptors[0].Values.Bodyparts) {
                             info.push(patientinfo.__interceptors[0].Values);
                         }
                     });
                     $scope.bodyRecords[value.toLowerCase()] = info;
                 });
                 $scope.records = _sort($scope.bodyRecords[$scope.tapped]);
                 $timeout(function () {
                     sliderInit();
                 }, 0);
                 deferred.resolve();
             })
             .error(function () {
                 deferred.reject('could not find someFile.json');
             });*/

    function sliderInit() {


        if ($('.carousel-inner').length > 1) {
            var prevres = $("#img-prev").data("imageprev");
            var nextres = $("#img-next").data("imagenext");
            slide = $('.bx-slide').bxSlider({
                mode: 'horizontal',
                captions: false,
                pager: false,
                controls: true,
                nextText: '<img alt="' + nextres + '" src="' + bxicon + '" class="angle-right">',
                prevText: '<img alt="' + prevres + '" src="' + bxicon + '" class= "angle-right" > ',
                onSlideAfter: function($slideElement) {
                    $scope.$apply(function() {
                        //$scope.courtesy = $slideElement.find('.slide-tab').attr('data-courtesy');
                        angular.element('.courtesy-text').html($slideElement.find('.slide-tab').attr('data-courtesy'));
                    });
                },
                onSliderLoad: function(currentIndex) {
                    $scope.$apply(function() {
                        angular.element('.courtesy-text').html($($('.carousel-inner')[currentIndex + 1]).find('.slide-tab').attr('data-courtesy'));
                    });

                    angular.element(".bx-prev,.bx-next").attr("role", "button");
                    resizeSlideContentHeight();
                }
            });
        } else {
            angular.element('.courtesy-text').html($($('.carousel-inner')[0]).find('.slide-tab').attr('data-courtesy'));
            resizeSlideContentHeight();
        }
        angular.element(".pills.active").attr({ "aria-expanded": "true", "aria-selected": "true" });

    }

    $scope.sliderReload = function(event, area) {
        $scope.selectedMenu = $(".dropdown-select option[value='" + $scope.tapped + "']").data("html");
        $scope.records = _sort($scope.bodyRecords[$scope.tapped]);
        angular.element(".pills").attr({ "aria-expanded": "false", "aria-selected": "false" });
        angular.element(event.currentTarget).attr({ "aria-expanded": "true", "aria-selected": "true" });
        var imglazyload = $("#settings-ImageLazyload").attr("data-ImageLazyload");
        
       
        $timeout(function() {
            if (slide != null) {
                slide.destroySlider();
            }
            sliderInit();
            if (imglazyload != undefined && imglazyload == "1") {
                
                ImageLazyload();
            }
        }, 0);
    }
    $scope.to_trusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    }

    $scope.expFilter = function($event, filter) {
        if (angular.element('.hs-exp-editor-area').length > 0) {
            var tabs = angular.element('.experience-editor-wrapper .slide-tab'),
                searchText;
            tabs.hide();
            angular.forEach(tabs, function(value, key) {
                searchText = angular.element(value).data('filtertype');
                if (searchText.toLowerCase().trim() == filter.toLowerCase().trim()) {
                    angular.element(value).show();
                }
            });
        }
    }

    //angular.element(document).ready(function ($scope) {
    //    if (angular.element('.hs-exp-editor-area').length > 0) {
    //        var pills = angular.element(".img-hs-container .hs-content .pills"), searchText;
    //        angular.element(".slide-tab").hide();
    //        angular.forEach(pills, function (value, key) {
    //            if (angular.element(value).hasClass('active')) {
    //                angular.element(".slide-tab[data-filtertype='" + angular.element(value).data('filter') + "']").show();
    //            }
    //        });
    //    }
    //});

    function _sort(list) {
        return $filter('orderBy')(list, 'ParentImageOrder');
    }

    function resizeSlideContentHeight() {
        var elem = angular.element('.slide-tab');
        angular.forEach(elem, function(value, key) {
            var labels = angular.element(value).find('.img-label');
            var beforeLebelHeight = angular.element(value).find('.img-before .img-label').height();
            var afterLebelHeight = angular.element(value).find('.img-after .img-label').height();
            var maxHeight = Math.max(beforeLebelHeight, afterLebelHeight);
            labels.height(maxHeight);
        });
    }

}]);

app.controller("beforeafterController", ['$scope', '$http', '$q', '$timeout', '$filter', '$compile', function($scope, $http, $q, $timeout, $filter, $compile) {

    $scope.model = [];
    $scope.records = [];
    $scope.disabled = false;

    $scope.toHide = false;

    var bparts = [],
        listCount;
    var elem = angular.element('.selection-pills .pill-item');
    angular.forEach(elem, function(value, key) {
        var item = angular.element(value).find('.pills').attr("id");
        if (item != "all") {
            bparts.push(item);
        }
        angular.element("#" + item).attr("aria-selected", "false");
    });
    elem = angular.element(".option-panel");
    angular.forEach(elem, function(value, key) {
        var item = angular.element(value).find(".panel-item").attr("id");
        angular.element("#" + item).attr("aria-selected", "false");
    });

    var filteredModel = '',
        deferred = $q.defer();
    var prev;
    $scope.galleryInit = function(data, arrowRight, limit, e) {
        prev = arrowRight;
        listCount = limit;
        $scope.limit = listCount;
        if (window.location.hash.substring(1).length > 0) {
            var hashlinks = window.location.hash.substring(1).split('-');
            $scope.activetab = hashlinks[0];
            $scope.filtered = hashlinks[1];
        } else {
            $scope.filtered = 'all';
            $scope.activetab = 'both';
        }
        $scope.model = _orderSort(formatResponse(data), 'ParentImageOrder');
        window.addEventListener('load', function (e) {
            var event = e || undefined;
            $scope.updateModel(event, 'gender');
        })
    }

    $scope.loadMore = function() {
        var increment = $scope.limit + listCount;
        $scope.toggleState = increment >= $scope.records.length ? true : false;
        $scope.limit = increment >= $scope.records.length ? increment : $scope.limit + listCount;
        var imglazyload = $("#settings-ImageLazyload").attr("data-ImageLazyload");
        
        if (imglazyload != undefined && imglazyload == "1") {
            $timeout(function () {
                ImageLazyload();
            }, 0);
        }        
    }

    $scope.updateCarousal = function(event, obj, index) {
        if ($("#settings-countrycode").data("country").toLowerCase().trim() != cJapan) {
            if (event.type == "keypress" && event.keyCode == 13) {
                $(".ba-tab-wrap").attr("tabindex", "-1");
            } else if (event.type == "keypress") {
                return false;
            }
            if (!$(event.currentTarget).hasClass('active')) {
                var template = "";
                var appendIndex;
                $scope.disabled = true;
                $('.ba-tab-wrap').removeClass('active');
                $(".ba-tab-wrap").attr("tabindex", "-1");
                $($(".ba-tab")[index]).find('.ba-tab-wrap').addClass('active');

                /*if ($('.carousal-hdn').length > 0) {
                    $(".carousal-hdn").slideUp(function () {
                        $(this).remove();
                    });
                }*/
                if (index == filteredModel.length - 1 || $(window).width() < 768) {
                    appendIndex = index;
                } else {
                    appendIndex = index % 2 == 0 ? index + 1 : index;
                }

                var template = setTemplate(obj);
                $timeout(function() {
                    $(template).insertAfter($(".ba-tab")[appendIndex]).slideDown();
                    if ($('.ba-tab-expanded').length > 1) {
                        $('#bx-carousal').bxSlider({
                            mode: 'horizontal',
                            captions: false,
                            pager: false,
                            nextText: '<img alt="next" src="' + prev + '" class="angle-right">',
                            prevText: '<img alt="previous" src="' + prev + '" class="angle-right">',
                            onSlideAfter: function($slideElement) {
                                $scope.$apply(function() {
                                    angular.element('.courtesy-text').html($slideElement.attr('data-courtesy'));
                                    angular.element('.extra-note').html($slideElement.find('.img-after .img-label').attr('data-description'));
                                });
                            },
                            onSliderLoad: function(currentIndex) {
                                $scope.$apply(function() {
                                    angular.element('.courtesy-text').html($($('.ba-tab-expanded')[currentIndex + 1]).attr('data-courtesy'));
                                    angular.element('.extra-note').html($($('.ba-tab-expanded')[currentIndex + 1]).find('.img-after .img-label').attr('data-description'));
                                });
                                angular.element(".bx-prev,.bx-next").attr("role", "button");
                            }
                        });
                    } else {
                        angular.element('.courtesy-text').html($($('.ba-tab-expanded')[0]).attr('data-courtesy'));
                        angular.element('.extra-note').html($($('.ba-tab-expanded')[0]).find('.img-after .img-label').attr('data-description'));
                    }
                }, 0);
            }
        }
    }

    $scope.filterResults = function() {
        filteredModel = $filter('filter')($scope.model, { Gender: $scope.activetab }, true);
        disablePills(filteredModel);
    }

    $scope.expandChild = function(event) {
        angular.element('.before-and-after-items').not(angular.element(event.currentTarget).parents(".before-and-after-items")).removeClass('active');
        angular.element('.ba-tab-wrap').not(event.currentTarget).removeClass('active');
        angular.element(event.currentTarget).toggleClass('active');
        angular.element(event.currentTarget).parents(".before-and-after-items").toggleClass("active");
    }

    //function disablePills(filteredModel) {
    //    angular.forEach(bparts, function (value, key) {
    //        var itemCount = $filter('filter')(filteredModel, { Bodyparts: value }, true).length;
    //        if (itemCount == 0) {
    //            angular.element('#' + value).addClass('disabled');
    //        }
    //        else {
    //            angular.element('#' + value).removeClass('disabled');
    //        }
    //    });
    //}
    function disablePills(filteredModel) {
        angular.forEach(bparts, function(value, key) {
            var itemCount = $filter('filter')(filteredModel, { Bodyparts: value }, true).length;
            if (itemCount == 0) {
                angular.element('#' + value).addClass('disabled').attr({ "tabindex": "-1", "aria-disabled": "true" });
            } else {
                angular.element('#' + value).removeClass('disabled').attr({ "tabindex": "0", "aria-disabled": "false" });
            }
        });
    }

    $scope.updateModel = function(event, srcOption, activeTab) {
        if (!angular.element(event.target).hasClass("active")) {
            var elem,
                isKeyPressEvent = false;

            if (event.type == "keypress" && event.keyCode == 13) {
                this.activetab = activeTab;
                isKeyPressEvent = true;
            } else if (event.type == "keypress") {
                return false;
            }


            if (srcOption == 'parts') {
                elem = angular.element('.pills');
                angular.forEach(elem, function(value, key) {
                    elem.attr('aria-expanded', 'false');
                    if ($(value).hasClass('active'))
                        $(value).attr('aria-expanded', 'true');
                });
            }

            if (srcOption == 'gender') {
                elem = angular.element('.panel-item');
                angular.forEach(elem, function(value, key) {
                    elem.attr('aria-selected', 'false');
                    if ($(value).hasClass('active'))
                        $(value).attr('aria-selected', 'true');
                });
            }

            //console.log(elem);
            if (event != undefined) {
                var source = event.target || event.srcElement;
            } else {
                var source = angular.element(document);
            }
            //console.log(source);
            var srcElementId;
            if (srcOption == 'parts') {
                srcElementId = source.id;
                angular.element(document.querySelector('#' + srcElementId)).attr('aria-expanded', 'true');
            } else if (srcOption == 'gender') {
                if (source.id == undefined)
                    srcElementId = 'both';
                else if (isKeyPressEvent)
                    srcElementId = source.id;
                else
                    srcElementId = source.parentElement.id;
                angular.element(document.querySelector('#' + srcElementId)).attr('aria-selected', 'true');
            }
            $scope.limit = listCount;
            var deeplinkurl = '';
            $scope.disabled = false;
            $scope.toggleState = false;
            if ($scope.activetab != 'both' && $scope.filtered != 'all') {
                $scope.filterResults();
                //filteredModel = $filter('filter')($scope.model, { Gender: $scope.activetab }, true);
                filteredModel = $filter('filter')(filteredModel, { Bodyparts: $scope.filtered }, true);
            } else if ($scope.activetab == 'both' && $scope.filtered != 'all') {
                disablePills($scope.model);
                filteredModel = $filter('filter')($scope.model, { Bodyparts: $scope.filtered }, true);
            } else if ($scope.filtered == 'all' && $scope.activetab != 'both') {
                $scope.filterResults();
                //filteredModel = $filter('filter')($scope.model, { Gender: $scope.activetab }, true);
            } else {
                disablePills($scope.model);
                filteredModel = $scope.model;
            }
            checkProperties(filteredModel);
            deeplinkurl = $scope.activetab + '-' + $scope.filtered;
            window.location.hash = deeplinkurl;
            $scope.toggleState = filteredModel.length <= 6 ? true : false;
            $scope.records = filteredModel;
        }
        var imglazyload = $("#settings-ImageLazyload").attr("data-ImageLazyload");
        
        if (imglazyload != undefined && imglazyload == "1") {
            $timeout(function () {
                ImageLazyload();
            }, 0);
        }
                    
    }
    $scope.dropClose = function() {
        $scope.disabled = false;
        $(".carousal-hdn").slideUp(function() {
            $(this).remove();
        });
        $(".ba-tab-wrap.active").focus()
        $('.ba-tab-wrap').removeClass('active').attr("tabindex", "0");
    }

    $scope.expFilter = function($event, filter) {
        if (angular.element('.exp-editor-area').length > 0) {
            var tabs = angular.element('.experience-editor-wrapper .before-and-after-items'),
                searchText;
            tabs.hide();
            if (filter.toLowerCase().trim() == "all") {
                tabs.show();
            } else {
                angular.forEach(tabs, function(value, key) {
                    searchText = angular.element(value).data('filtertype');
                    if (searchText.toLowerCase().trim() == filter.toLowerCase().trim()) {
                        angular.element(value).show();
                    }
                });
            }
        }
    }
    angular.element(document).ready(function($scope) {
        if (angular.element('.exp-editor-area').length > 0) {
            var pills = angular.element(".comp-container .filter-container .pills"),
                searchText;
            angular.element(".before-and-after-items").hide();
            angular.forEach(pills, function(value, key) {
                if (angular.element(value).hasClass('active')) {
                    if (angular.element(value).data('filter').toLowerCase().trim() == "all") {
                        angular.element(".before-and-after-items").show();
                    } else {
                        angular.element(".before-and-after-items[data-filtertype='" + angular.element(value).data('filter') + "']").show();
                    }
                }
            });
        }
    });

    function checkProperties(filteredModel) {
        if (filteredModel.length != 0) {
            var watch = true,
                count = 0;;
            angular.forEach(filteredModel, function(value, key) {
                if (watch) {
                    if (value.hasOwnProperty('AfterImageMin') && value.hasOwnProperty('BeforeImageMin')) {
                        if (value.AfterImageMin.Src != '' && value.AfterImageMin.Src != null && value.BeforeImageMin.Src != '' && value.BeforeImageMin.Src != null) {
                            watch = false;
                            $scope.toHide = false;
                        }
                    } else {
                        count++;
                        if (count == filteredModel.length) {
                            $scope.toHide = true;
                        }
                    }
                }
            });
        } else {
            $scope.toHide = true;
        }
    }

    function _orderSort(list, sortby) {
        return $filter('orderBy')(list, sortby);
    }

    function formatResponse(data) {
        var model = [],
            childArray = [],
            temp = {};
        angular.forEach(data, function(data, key) {
            childArray = [];
            temp = data.__interceptors[0].Values;
            temp['Gender'] = temp['Gender'].toLowerCase();
            temp['Bodyparts'] = temp['Bodyparts'].toLowerCase();
            angular.forEach(temp.Children, function(child, key) {
                childArray.push(child.__interceptors[0].Values);
            });
            temp['Children'] = _orderSort(childArray, 'ImageOrder');
            model.push(temp);
        });
        return model;
    }

    function setTemplate(obj) {
        var carousalTemplate = '',
            description;
        var closeText = $(".ba-close-text").html();
        angular.forEach(obj['Children'], function(value, key) {
            description = (value.Description).replace(/"/g, '\"');
            carousalTemplate += "<div class='ba-tab-expanded' data-courtesy='" + value.Title + "'>" +
                "<div class='img-before crsl-diff-img'>" +
                "<img src='" + obj.BeforeImageMax.Src + "' alt=''>" +
                "<span class='img-label'>" + obj["BeforeSupportingMinText"] + "</span>" +
                "</div>" +
                "<div class='img-after crsl-diff-img'>" +
                "<img src='" + value.AfterImageMax.Src + "' alt=''>" +
                "<span class='img-label' data-description='" + description + "'>" + value["AfterSupportingMaxText"] + "</span>" +
                "</div>" +
                "</div>"
        });
        return $compile(
            "<div class='carousal-hdn clearfix'>" +
            "<div class='crsl-wrap'>" +
            "<div id='crsl-close'>" +
            "<a href='javascript:void(0);' ng-click='dropClose();' class='hidden-xs' >" + closeText + "<span class='cross ft-right'>X</span></a>" +
            "</div>" +
            "<div id='bx-carousal'>" +
            carousalTemplate +
            "</div>" +
            "<div class='carousal-note hidden-xs'>" +
            "<p class='courtesy-text'>{{courtesy}}</p>" +
            "<p class='extra-note'>{{description}}</p>" +
            "</div>" +
            "<div class='carousal-note hidden-sm hidden-md hidden-lg'>" +
            "<p class='courtesy-text '>{{courtesy}}</p>" +
            "</div>" +
            "<div id='crsl-close'>" +
            "<a href='javascript:void(0);' ng-click='dropClose();' class='hidden-sm hidden-md hidden-lg'>" + closeText +
            "<span class='cross ft-right'>X</span>" +
            "</a>" +
            "</div>" +
            "</div>" +
            "</div>")($scope);
    }

}]);


app.controller("doublechinController", ['$scope', '$http', '$q', '$timeout', '$filter', '$compile', function($scope, $http, $q, $timeout, $filter, $compile) {

    $scope.model = [];
    $scope.records = [];
    $scope.disabled = false;

    $scope.toHide = false;

    var bparts = [],
        listCount;
    var elem = angular.element('.selection-pills .pill-item');
    angular.forEach(elem, function(value, key) {
        var item = angular.element(value).find('.pills').attr("id");
        if (item != "all") {
            bparts.push(item);
        }
        angular.element("#" + item).attr("aria-selected", "false");
    });
    elem = angular.element(".option-panel");
    angular.forEach(elem, function(value, key) {
        var item = angular.element(value).find(".panel-item").attr("id");
        angular.element("#" + item).attr("aria-selected", "false");
    });

    var filteredModel = '',
        deferred = $q.defer();
    var prev;
    $scope.galleryInit = function(data, arrowRight, limit) {
        prev = arrowRight;
        listCount = limit;
        $scope.limit = listCount;
        if (window.location.hash.substring(1).length > 0) {
            var hashlinks = window.location.hash.substring(1).split('-');
            $scope.activetab = hashlinks[0];
            $scope.filtered = hashlinks[1];
        } else {
            $scope.filtered = 'all';
            $scope.activetab = 'both';
        }
        $scope.model = _orderSort(formatResponse(data), 'ParentImageOrder');
        $scope.updateModel('gender');
    }

    $scope.loadMore = function() {
        var increment = $scope.limit + listCount;
        $scope.toggleState = increment >= $scope.records.length ? true : false;
        $scope.limit = increment >= $scope.records.length ? increment : $scope.limit + listCount;        
    }

    $scope.updateCarousal = function(event, obj, index) {
        if (!$(event.currentTarget).hasClass('active')) {
            var template = "";
            var appendIndex;
            $scope.disabled = true;
            $('.ba-tab-wrap').removeClass('active');
            $($(".ba-tab")[index]).find('.ba-tab-wrap').addClass('active')
                /*if ($('.carousal-hdn').length > 0) {
                    $(".carousal-hdn").slideUp(function () {
                        $(this).remove();
                    });
                }*/
            if (index == filteredModel.length - 1 || $(window).width() < 768) {
                appendIndex = index;
            } else {
                appendIndex = index % 2 == 0 ? index + 1 : index;
            }

            var template = setTemplate(obj);
            $timeout(function() {
                $(template).insertAfter($(".ba-tab")[appendIndex]).slideDown();
                if ($('.ba-tab-expanded').length > 1) {
                    $('#bx-carousal').bxSlider({
                        mode: 'horizontal',
                        captions: false,
                        pager: false,
                        nextText: '<img alt="next" src="' + prev + '" class="angle-right">',
                        prevText: '<img alt="previous" src="' + prev + '" class="angle-right">',
                        onSlideAfter: function($slideElement) {
                            $scope.$apply(function() {
                                angular.element('.courtesy-text').html($slideElement.attr('data-courtesy'));
                                angular.element('.extra-note').html($slideElement.find('.img-after .img-label').attr('data-description'));
                            });
                        },
                        onSliderLoad: function(currentIndex) {
                            $scope.$apply(function() {
                                angular.element('.courtesy-text').html($($('.ba-tab-expanded')[currentIndex + 1]).attr('data-courtesy'));
                                angular.element('.extra-note').html($($('.ba-tab-expanded')[currentIndex + 1]).find('.img-after .img-label').attr('data-description'));
                            });
                            angular.element(".bx-prev,.bx-next").attr("role", "button");
                        }
                    });
                } else {
                    angular.element('.courtesy-text').html($($('.ba-tab-expanded')[0]).attr('data-courtesy'));
                    angular.element('.extra-note').html($($('.ba-tab-expanded')[0]).find('.img-after .img-label').attr('data-description'));
                }
            }, 0);
        }
    }

    $scope.filterResults = function() {
        filteredModel = $filter('filter')($scope.model, { Gender: $scope.activetab }, true);
        disablePills(filteredModel);
    }

    $scope.expandChild = function(event) {
        angular.element('.before-and-after-items').not(angular.element(event.currentTarget).parents(".before-and-after-items")).removeClass('active');
        angular.element('.ba-tab-wrap').not(event.currentTarget).removeClass('active');
        angular.element(event.currentTarget).toggleClass('active');
        angular.element(event.currentTarget).parents(".before-and-after-items").toggleClass("active");
    }

    function disablePills(filteredModel) {
        angular.forEach(bparts, function(value, key) {
            var itemCount = $filter('filter')(filteredModel, { Bodyparts: value }, true).length;
            if (itemCount == 0) {
                angular.element('#' + value).addClass('disabled');
            } else {
                angular.element('#' + value).removeClass('disabled');
            }
        });
    }

    $scope.updateModel = function(srcOption) {
        var elem;
        if (srcOption == 'parts') {
            elem = angular.element('.pills');
            angular.forEach(elem, function(value, key) {
                elem.attr('aria-expanded', 'false');
                if ($(value).hasClass('active'))
                    $(value).attr('aria-expanded', 'true');
            });
        }

        if (srcOption == 'gender') {
            elem = angular.element('.panel-item');
            angular.forEach(elem, function(value, key) {
                elem.attr('aria-selected', 'false');
                if ($(value).hasClass('active'))
                    $(value).attr('aria-selected', 'true');
            });
        }

        //console.log(elem);
        var source = event.target || event.srcElement;
        //console.log(source);
        var srcElementId;
        if (srcOption == 'parts') {
            srcElementId = source.id;
            angular.element(document.querySelector('#' + srcElementId)).attr('aria-expanded', 'true');
        } else if (srcOption == 'gender') {
            if (source.id == undefined)
                srcElementId = 'both';
            else
                srcElementId = source.parentElement.id;
            angular.element(document.querySelector('#' + srcElementId)).attr('aria-selected', 'true');
        }
        $scope.limit = listCount;
        var deeplinkurl = '';
        $scope.disabled = false;
        $scope.toggleState = false;
        if ($scope.activetab != 'both' && $scope.filtered != 'all') {
            $scope.filterResults();
            //filteredModel = $filter('filter')($scope.model, { Gender: $scope.activetab }, true);
            filteredModel = $filter('filter')(filteredModel, { Bodyparts: $scope.filtered }, true);
        } else if ($scope.activetab == 'both' && $scope.filtered != 'all') {
            disablePills($scope.model);
            filteredModel = $filter('filter')($scope.model, { Bodyparts: $scope.filtered }, true);
        } else if ($scope.filtered == 'all' && $scope.activetab != 'both') {
            $scope.filterResults();
            //filteredModel = $filter('filter')($scope.model, { Gender: $scope.activetab }, true);
        } else {
            disablePills($scope.model);
            filteredModel = $scope.model;
        }
        checkProperties(filteredModel);
        $scope.toggleState = filteredModel.length <= 6 ? true : false;
        $scope.records = filteredModel;
    }
    $scope.dropClose = function() {
        $scope.disabled = false;
        $(".carousal-hdn").slideUp(function() {
            $(this).remove();
        });
        $('.ba-tab-wrap').removeClass('active');
    }

    $scope.expFilter = function($event, filter) {
        if (angular.element('.exp-editor-area').length > 0) {
            var tabs = angular.element('.experience-editor-wrapper .before-and-after-items'),
                searchText;
            tabs.hide();
            if (filter.toLowerCase().trim() == "all") {
                tabs.show();
            } else {
                angular.forEach(tabs, function(value, key) {
                    searchText = angular.element(value).data('filtertype');
                    if (searchText.toLowerCase().trim() == filter.toLowerCase().trim()) {
                        angular.element(value).show();
                    }
                });
            }
        }
    }
    angular.element(document).ready(function($scope) {
        if (angular.element('.exp-editor-area').length > 0) {
            var pills = angular.element(".comp-container .filter-container .pills"),
                searchText;
            angular.element(".before-and-after-items").hide();
            angular.forEach(pills, function(value, key) {
                if (angular.element(value).hasClass('active')) {
                    if (angular.element(value).data('filter').toLowerCase().trim() == "all") {
                        angular.element(".before-and-after-items").show();
                    } else {
                        angular.element(".before-and-after-items[data-filtertype='" + angular.element(value).data('filter') + "']").show();
                    }
                }
            });
        }
    });

    function checkProperties(filteredModel) {
        if (filteredModel.length != 0) {
            var watch = true,
                count = 0;;
            angular.forEach(filteredModel, function(value, key) {
                if (watch) {
                    if (value.hasOwnProperty('AfterImageMin') && value.hasOwnProperty('BeforeImageMin')) {
                        if (value.AfterImageMin.Src != '' && value.AfterImageMin.Src != null && value.BeforeImageMin.Src != '' && value.BeforeImageMin.Src != null) {
                            watch = false;
                            $scope.toHide = false;
                        }
                    } else {
                        count++;
                        if (count == filteredModel.length) {
                            $scope.toHide = true;
                        }
                    }
                }
            });
        } else {
            $scope.toHide = true;
        }
    }

    function _orderSort(list, sortby) {
        return $filter('orderBy')(list, sortby);
    }

    function formatResponse(data) {
        var model = [],
            childArray = [],
            temp = {};
        angular.forEach(data, function(data, key) {
            if (window.location.pathname.toLowerCase().includes('doublechin') && data.__interceptors[0].Values.Bodyparts.toLowerCase() == 'doublechin') {
                childArray = [];
                temp = data.__interceptors[0].Values;
                temp['Gender'] = temp['Gender'].toLowerCase();
                temp['Bodyparts'] = temp['Bodyparts'].toLowerCase();
                angular.forEach(temp.Children, function(child, key) {
                    childArray.push(child.__interceptors[0].Values);
                });
                temp['Children'] = _orderSort(childArray, 'ImageOrder');
                model.push(temp);
            } else if (window.location.pathname.toLowerCase().includes('abdomen') && data.__interceptors[0].Values.Bodyparts.toLowerCase() == 'abdomen') {
                childArray = [];
                temp = data.__interceptors[0].Values;
                temp['Gender'] = temp['Gender'].toLowerCase();
                temp['Bodyparts'] = temp['Bodyparts'].toLowerCase();
                angular.forEach(temp.Children, function(child, key) {
                    childArray.push(child.__interceptors[0].Values);
                });
                temp['Children'] = _orderSort(childArray, 'ImageOrder');
                model.push(temp);
            }
        });
        return model;
    }

    function setTemplate(obj) {
        var carousalTemplate = '',
            description;
        angular.forEach(obj['Children'], function(value, key) {
            description = (value.Description).replace(/"/g, '\"');
            carousalTemplate += "<div class='ba-tab-expanded' data-courtesy='" + value.Title + "'>" +
                "<div class='img-before crsl-diff-img'>" +
                "<img src='" + obj.BeforeImageMax.Src + "' alt='before treatment'>" +
                "<span class='img-label'>" + obj["BeforeSupportingMinText"] + "</span>" +
                "</div>" +
                "<div class='img-after crsl-diff-img'>" +
                "<img src='" + value.AfterImageMax.Src + "' alt='after treatment'>" +
                "<span class='img-label' data-description='" + description + "'>" + value["AfterSupportingMaxText"] + "</span>" +
                "</div>" +
                "</div>"
        });
        return $compile(
            "<div class='carousal-hdn clearfix'>" +
            "<div class='crsl-wrap'>" +
            "<div id='crsl-close'>" +
            "<a href='javascript:void(0);' ng-click='dropClose();' class='hidden-xs' >Close<span class='cross ft-right'>X</span></a>" +
            "</div>" +
            "<div id='bx-carousal'>" +
            carousalTemplate +
            "</div>" +
            "<div class='carousal-note hidden-xs'>" +
            "<p class='courtesy-text'>{{courtesy}}</p>" +
            "<p class='extra-note'>{{description}}</p>" +
            "</div>" +
            "<div class='carousal-note hidden-sm hidden-md hidden-lg'>" +
            "<p class='courtesy-text '>{{courtesy}}</p>" +
            "</div>" +
            "<div id='crsl-close'>" +
            "<a href='javascript:void(0);' ng-click='dropClose();' class='hidden-sm hidden-md hidden-lg'>Close" +
            "<span class='cross ft-right'>X</span>" +
            "</a>" +
            "</div>" +
            "</div>" +
            "</div>")($scope);
    }

}]);
app.controller("blogdashboardController", ["$scope", "$filter", "Pagination", "filterFilter", function($scope, $filter, Pagination, filterFilter) {
    function setHeaderHight() {
        if ($(window).width() > 991) {
            var featureContainers = angular.element('.featurecomp_container');
            angular.forEach(featureContainers, function(value, key) {
                var items = angular.element(value).find('.feature-box-content .item');
                if (angular.element(value).find('.info-header').length > 0) {
                    var headerHeights = [];
                    angular.forEach(items, function(value, key) {
                        headerHeights.push(angular.element(value).find('.info-header').height());
                    });
                    var maxHeight = Math.max.apply(null, headerHeights);
                    angular.element(value).find('.feature-box-content .item .info-header').height(maxHeight);
                }
            });
        } else {
            angular.element('.featurecomp_container .feature-box-content .item .info-header').height("auto");
        }
    }
    $scope.blogrecords = [];
    angular.element(document).ready(function() {
        setHeaderHight();
    });

    $scope.myLength = 0;
    //window.dataLayer = window.dataLayer || [];
    //var params;
    //params = window.location.pathname.replace("/", "");
    //params = params.replace(/%20/g, " ");
    //dataLayer.push({
    //    'event': 'HeroCTAClick',
    //    'CTAlabel': params
    //});
    $scope.linkClicked = function(inner) {
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
            'URL': inner.__interceptors[0].Values.Url,
            'articleTitle': inner.__interceptors[0].Values.Title,
            'event': inner.__interceptors[0].Values.Value
        });
       
        var externalblog = inner.__interceptors[0].Values.IsExternalBlogUrl;
       
        if (externalblog) {
            var link = inner.__interceptors[0].Values.ExternalBlogUrl.Url;
            var linknew = "window.open('" + link + "', '_blank')";
            $("#BlogExternalUrlMsgModal .accept-btn").attr("onclick", linknew);
            $('#BlogExternalUrlMsgModal').modal();           
        }
       
    }

    $scope.blogInit = function(data) {
        $($(".blog-indiaheadimage").parent().parent().parent()).hide();
        $($(".blog-indiaheadimage").parent().parent().parent().parent().parent().parent()).css('background-color', '#fff');
        $scope.firstLoad = 0;
        $scope.blogrecords = data;
        $scope.blogrecords1 = data;
        $scope.myLength = $scope.blogrecords.length;
        $scope.totalItems = $scope.myLength;
        for (var i = 0; i < $scope.myLength; i++) {
            var str = $scope.blogrecords[i].__interceptors[0].Values.Name;
            var newString = str.replace(/\s+/g, '-');
            newString = newString.toLowerCase();
            var innerurl = $scope.blogrecords[i].__interceptors[0].Values.URL.Url + "/" + newString;
            $scope.blogrecords[i].__interceptors[0].Values['innerurl'] = innerurl;
        }
        $scope.mypageint();
    }

    var count = $('#blog-count').data("count");
    $scope.currentPage = 0;
    $scope.pageSize = count;

    /*$scope.$watch('searchkeyword', function(newVal, oldval) {
        $scope.filtered = filterFilter($scope.blogrecords1, newVal);
        $scope.totalItems = $scope.filtered.length;
        $scope.blogrecords = $scope.filtered;
        $scope.firstLoad = $scope.firstLoad + 1;
        $scope.mypageint();
        if ($scope.firstLoad > 1) {
            $scope.currentPage = 0;
        }     
    });*/

    $scope.$watch('searchkeyword', function(newVal, oldval) {
        $scope.filtereddata = [];

        for (var i = 0; i < $scope.myLength; i++) {
            $scope.filtered = "";
            var temparr = [$scope.blogrecords1[i].__interceptors[0].Values.Title, $scope.blogrecords1[i].__interceptors[0].Values.Description];
            $scope.filtered = filterFilter(temparr, newVal);
            if ($scope.filtered != "") {
                $scope.filtereddata.push($scope.blogrecords1[i]);
            }
        }

        $scope.totalItems = $scope.filtereddata.length;
        $scope.blogrecords = $scope.filtereddata;
        $scope.firstLoad = $scope.firstLoad + 1;
        $scope.mypageint();
        if ($scope.firstLoad > 1) {
            $scope.currentPage = 0;
        }
    });

    $scope.mypageint = function() {
        $scope.pages = Math.ceil($scope.totalItems / $scope.pageSize - 1 + 1);
        var pagination = $scope.pagination = Pagination.create({
            itemsPerPage: count,
            itemsCount: $scope.totalItems,
            pages: $scope.pages
        });
        pagination.onChange = function(page) {
            $scope.currentPage = page - 1;
        };
    };

    //$('body').on('click', 'a.blog', function () {
    //    alert("warning");
    //    alert($("#settings-metaurl").data("metaurl"));
    //    alert($("#settings-metatitle").data("metatitle"))
    //    window.dataLayer = window.dataLayer || [];
    //    dataLayer.push({
    //        'event': 'articleLinkClick',
    //        'URL': window.location.href,
    //        'articleTitle': params[1]

    //    });

    //}); 

    $(".pagination").on('click', 'li', function() {

        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
            'event': 'Pagination',
            'currentPage': params[1],
            'buttonLabel': $(this).text().trim()
        });
    });
}]);

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
app.controller("blogrelatedarticleController", ["$scope", "$filter", function($scope, $filter) {
    function setHeaderHight() {
        if ($(window).width() > 991) {
            var featureContainers = angular.element('.featurecomp_container');
            angular.forEach(featureContainers, function(value, key) {
                var items = angular.element(value).find('.feature-box-content .item');
                if (angular.element(value).find('.info-header').length > 0) {
                    var headerHeights = [];
                    angular.forEach(items, function(value, key) {
                        headerHeights.push(angular.element(value).find('.info-header').height());
                    });
                    var maxHeight = Math.max.apply(null, headerHeights);
                    angular.element(value).find('.feature-box-content .item .info-header').height(maxHeight);
                }
            });
        } else {
            angular.element('.featurecomp_container .feature-box-content .item .info-header').height("auto");
        }
    }

    $scope.blogrecords = [];
    angular.element(document).ready(function() {
        setHeaderHight();
    });
    //window.dataLayer = window.dataLayer || [];
    //dataLayer.push({
    //    'event': 'articleLinkClick',
    //    'URL': $("#settings-metaurl").data("metaurl"),
    //    'articleTitle': $("#settings-metatitle").data("metatitle")

    //}); 


    $scope.relatedArticlesClicked = function(inner) {
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
            'URL': inner.__interceptors[0].Values.Url,
            'articleTitle': inner.__interceptors[0].Values.Title,
            'event': inner.__interceptors[0].Values.Value
        });

        var externalblog = inner.__interceptors[0].Values.IsExternalBlogUrl;

        if (externalblog) {
            var link = inner.__interceptors[0].Values.ExternalBlogUrl.Url;
            var linknew = "window.open('" + link + "', '_blank')";
            $("#BlogExternalUrlMsgModal .article-btn").attr("onclick", linknew);
            $('#BlogExternalUrlMsgModal').modal();
        }
        else {
            window.location.href = inner.__interceptors[0].Values.Url;
        }

        
    }

    $scope.articleInit = function(data) {
        $scope.innerrecords = data;
        $scope.pagetitle = $('#settings-title').data("titleblog");
        $scope.pageName = $('#settings-name').data("titleblog");
        $scope.myLength = $scope.innerrecords.length;
        $scope.currentposition;
        $scope.filteredRecords = [];
        $scope.str;
        for (i = 0; i < $scope.myLength; i++) {
            $scope.str = $scope.innerrecords[i].__interceptors[0].Values.Title;
            if ($scope.str == $scope.pagetitle) {
                $scope.currentposition = i;
            }
            if ($scope.pageName != $scope.innerrecords[i].__interceptors[0].Values.Name) {
                $scope.filteredRecords.push($scope.innerrecords[i]);
            }
        }
        for (var i = 0; i < $scope.myLength; i++) {
            var str = $scope.innerrecords[i].__interceptors[0].Values.Name;
            var newString = str.replace(/\s+/g, '-');
            newString = newString.toLowerCase();
            var innerurl = $scope.innerrecords[i].__interceptors[0].Values.URL.Url + "/" + newString;
            $scope.innerrecords[i].__interceptors[0].Values['innerurl'] = innerurl;
        }
        $scope.lastposition = ($scope.innerrecords.length) - 1;
        $scope.relatedarticles = [];
        var length = $scope.innerrecords.length;
        if (length > 3) {
            for (i = 0; i < 3; i++) {
                if ($scope.currentposition == $scope.lastposition) {
                    $scope.currentposition = 0;
                    $scope.relatedarticles.push($scope.innerrecords[$scope.currentposition])
                    $scope.currentposition--;
                } else {
                    $scope.relatedarticles.push($scope.innerrecords[$scope.currentposition + 1])
                }
                $scope.currentposition++;
            }
        } else {
            for (i = 0; i < $scope.filteredRecords.length; i++) {
                $scope.relatedarticles.push($scope.filteredRecords[i]);
            }
        }
        $scope.prevlink;
        $scope.nextlink;
        $scope.currentpos;
        $scope.lastpos = $scope.innerrecords.length - 1;
        $scope.myLength = $scope.innerrecords.length;
        for (i = 0; i < $scope.myLength; i++) {
            $scope.str = $scope.innerrecords[i].__interceptors[0].Values.Title;
            if ($scope.str == $scope.pagetitle) {
                $scope.currentpos = i;
            }
        }
        if ($scope.currentpos == 0) {
            $scope.prevlink = $scope.innerrecords[$scope.currentpos].__interceptors[0].Values.innerurl
            $scope.prevlink = $scope.prevlink.toLowerCase();
            $scope.innerrecords[$scope.currentpos].__interceptors[0].Values['previous'] = $scope.prevlink;
        } else {
            $scope.prevlink = $scope.innerrecords[$scope.currentpos - 1].__interceptors[0].Values.innerurl
            $scope.prevlink = $scope.prevlink.toLowerCase();
            $scope.innerrecords[$scope.currentpos].__interceptors[0].Values['previous'] = $scope.prevlink;
        }
        if ($scope.currentpos == $scope.lastpos) {
            $scope.nextlink = $scope.innerrecords[$scope.lastpos].__interceptors[0].Values.innerurl
            $scope.innerrecords[$scope.currentpos].__interceptors[0].Values['next'] = $scope.nextlink;
        } else {
            $scope.nextlink = $scope.innerrecords[$scope.currentpos + 1].__interceptors[0].Values.innerurl
            $scope.innerrecords[$scope.currentpos].__interceptors[0].Values['next'] = $scope.nextlink;
        }
    }



    //var params = new Array();
    //params = window.location.href.split('.au/');
    //params[1] = params[1].replace(/%20/g, " ");

    //$('body').on('click', 'a.blog', function () {
    //    alert("warning");
    //    alert($("#settings-metaurl").data("metaurl"));
    //    alert($("#settings-metatitle").data("metatitle"))
    //    window.dataLayer = window.dataLayer || [];
    //    dataLayer.push({
    //        'event': 'articleLinkClick',
    //        'URL': $("#settings-metaurl").data("metaurl"),
    //        'articleTitle': $("#settings-metatitle").data("metatitle")

    //    });

    //}); 

    //window.dataLayer = window.dataLayer || [];
    //dataLayer.push({
    //    'event': 'articleLinkClick',
    //    'URL': $("#settings-metaurl").data("metaurl"),
    //    'articleTitle': $("#settings-metatitle").data("metatitle")

    //});
}]);


// Global Clinic locator approach

function GetQueryParameterValues(param) {
    var url = window.location.href.toLowerCase().slice(window.location.href.toLowerCase().indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];

        }
    }

}
//Italy Hcp Modal popup
$(window).on('load', function() {
    //hcp popup
    var countryname = $("#settings-countryname").data("countryname").toString().trim().toLowerCase();
    var siteVisited = sessionStorage.getItem("hcpbtnclicked");
    var notfViewed = sessionStorage.getItem("notfViewed");
    var notifypop = document.querySelector('#cs_notification_modelpopup');
    if (countryname == "italy" || countryname == "japan") {
        if ((countryname == "italy" || countryname == "japan") && siteVisited == undefined) {
            $('#csmodelpopup').modal({ backdrop: 'static', keyboard: false });
            $('html').css('overflow-y', 'hidden');
        } else {
            $('#csmodelpopup').modal('hide');
            $('html').css('overflow-y', 'auto');
        }
    }
    if (countryname == cMEA) {
        var disclaimercookie = sessionStorage.getItem("disclaimer_accept");
        if (countryname == cMEA && disclaimercookie == undefined) {
            $('#csmodelpopup').modal({ backdrop: 'static', keyboard: false });
            $('html').css('overflow-y', 'hidden');
        } else {
            $('#csmodelpopup').modal('hide');
            $('html').css('overflow-y', 'auto');
        }
    }

    $("#landinghcp-btn").on('click', function() {
        sessionStorage.setItem('hcpbtnclicked', 'true');
        $('#csmodelpopup').modal('hide');
        $('html').css('overflow-y', 'auto');

        if ((countryname == "italy") && (notfViewed == undefined && notifypop != null)) {
            $('#cs_notification_modelpopup').modal({ backdrop: 'static', keyboard: false });
            $('html').css('overflow-y', 'hidden');
        }
    })

    $(document).on('shown.bs.modal', '#cs_notification_modelpopup', function() {
        if ($('#cs_notification_modelpopup').data('isexpeditor') != 1) {
            $("body").addClass("modal-open");
            $('.modal-backdrop').css('z-index', '99999');
        } else {
            $('.modal-backdrop').removeClass('in').removeClass('modal-backdrop');
            $("body").removeClass("modal-open");
            $('html').removeAttr('style', 'overflow-y');
        }
    });

    $(document).on('hidden.bs.modal', '#cs_notification_modelpopup', function() {
        if ($('#cs_notification_modelpopup').data('isexpeditor') != 1) {
            $("body").css('padding-right', '0px');
            $('.modal-backdrop').removeAttr('style', 'z-index');
        } else {
            $('.modal-backdrop').removeClass('in').removeClass('modal-backdrop');
            $("body").removeClass("modal-open");
            $('html').removeAttr('style', 'overflow-y');
        }
    });

    if ((countryname == "italy") && (siteVisited != null && notfViewed == undefined && notifypop != null)) {
        $('#cs_notification_modelpopup').modal({ backdrop: 'static', keyboard: false });
        $('html').css('overflow-y', 'hidden');
    }

    //for sites other than italy(with out hcp pop-up): notificaiton should appears first(if exists)

    if ((countryname != "italy") && (notfViewed == undefined) && (notifypop != null)) {
        $('#cs_notification_modelpopup').modal({ backdrop: 'static', keyboard: false });
        $('html').css('overflow-y', 'hidden');
    }




    $("#disclaimer-popup").on('click', function() {
        sessionStorage.setItem('disclaimer_accept', 'true');
        $('#csmodelpopup').modal('hide');
        $('html').css('overflow-y', 'auto');
    })
});


$("#btn_cs_ntf_proceed").on('click', function() {
    sessionStorage.setItem('notfViewed', 'true');
    $('#cs_notification_modelpopup').modal('hide');
    $('html').css('overflow-y', 'auto');
})

$("#btn_cs_ntf_proceed").on('keypress', function(e) {
    if (e.keyCode == 13) {
        $("#btn_cs_ntf_proceed").click();
    }
});

window.addEventListener("orientationchange", function() {
    if(($('iframe[src*="vimeo"]').width() != $(window).width()) && (navigator.userAgent == navigator.userAgent.replace("iPhone",''))){
        window.location.reload();
    }
}, false);

function InitMeaCountryDetails() {
    $.ajax({
        url: "/api/meacountry/getcountrydata?countryCode=" + window.location.pathname.split('/')[1],
        contentType: "json",
        async: false,
        success: function(data) {
            if (data.IsSuccess) {
                cMEA_CountryData = data;
            }
        }
    });
}

if (IsScrollAnimateEnabled) {
    $('#accordion1').on('shown.bs.collapse', function(e) {
        if (!$('body').hasClass('ko')) {
            var offset = $(this).find('.collapse.in').prev('.panel-heading');
            if (offset) {
                $('html,body').animate({
                    scrollTop: $(offset).offset().top - 400
                }, 100);
            }
        }
    });
}


function Getdistance(Slat, Slon, Rlat, Rlon) {
    if ((Slat == Rlat) && (Slon == Rlon)) {
        return 0;
    } else {
        var radlat1 = Math.PI * Slat / 180;
        var radlat2 = Math.PI * Rlat / 180;
        var theta = Slon - Rlon;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        return dist;
    }
}

function ClinicopeningHours(openingHoursData) {

    var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var openingHoursStr = "";
    var showtranslatedday = $('#translatedday').attr('data-showtranslatedday')
    for (var i in weekdays) {
        for (var days in openingHoursData) {
            if (weekdays[i].toLowerCase() === days.toLowerCase() && openingHoursData[days] != null) {
                if (openingHoursData[days] != null) {

                    var hours = openingHoursData[days].split('-');
                    if (hours[0] != null && hours[0] != "") {
                        if (GlobalLocatorApproach == "1" && showtranslatedday == "1") {
                            var translatedday = $('#translatedday').attr('data-Transday' + i);
                            if (translatedday != undefined && translatedday != null && translatedday != "") {
                                openingHoursStr = openingHoursStr + translatedday + " " + openingHoursData[days] + "   ";
                            } else {
                                openingHoursStr = openingHoursStr + days + " " + openingHoursData[days] + "   ";
                            }
                        } else {
                            openingHoursStr = openingHoursStr + days + " " + openingHoursData[days] + "   ";
                        }

                    }
                }
            }
        }
    }
    return openingHoursStr;
};

$(function() {

    var $allVideos = $("iframe[src*='https://player.vimeo.com'], iframe[src*='https://players.brightcove.net'], iframe[src*='https://vimeo.com'], iframe[src*='https://www.youtube.com'], iframe[src*='/-/media/Feature/'], object, embed");

    var $fluidEl1 = document.querySelectorAll(".vimeovideowrp");
    var $fluidEl = [];
    for (var i = 0; i < $fluidEl1.length; i++) {
        $fluidEl[i] = $fluidEl1[i];
    }

    $allVideos.each(function() {
        $(this)
            .attr('data-aspectRatio', this.height / this.width)
            .removeAttr('height')
            .removeAttr('width');
    });

    $(window).resize(function() {

        var i = 0;
        $allVideos.each(function() {

            var newWidth = $fluidEl[i].clientWidth;
            var $el = $(this);
            $el.width(newWidth).height(newWidth * $el.attr('data-aspectRatio'));
            i++;
        });

    }).resize();

    $('.vimeooverlay').click(function() {
        var playerSiblings = $(this).siblings('.vimeovideowrp').find('iframe');
        if (playerSiblings[0].src.contains('showcase')) {
            playerSiblings[0].src = playerSiblings[0].src + "&autoplay=1"
        } else {
            var player = new Vimeo.Player(playerSiblings);
            player.play();
        }
        $(this).css('display', 'none');
    });

    var jsVideoButton = document.querySelector('.js-video-button');
    if (jsVideoButton != null) {
        $(".js-video-button").modalVideo({ channel: 'vimeo' });
    }

    var cs_de_cookieChkBox = document.querySelector('#cs_de_ck_1');
    if (cs_de_cookieChkBox != null) {
        document.getElementById("cs_de_ck_1").disabled = true;
        document.getElementById("cs_de_ck_1").checked = true;
    }


    $('#btn_cs_de_cookieSettings').on('click', function(event) {
        $('#cscookiepopup').css('z-index', '100000');
        $('#cscookiepopup').modal('show');
        $('.modal-backdrop').css('z-index', '99999');
        $('html').css('overflow-y', 'auto');
    });



    $('#cs_de_ck_2').on('change', function() {

        if (this.checked) {

            $("#collapse_2").addClass("in").attr("aria-expanded", "true").removeAttr("style");
            $("#collapse_3").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
            $("#collapse_4").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
            $("#collapse_1").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");

        } else {
            $("#collapse_1").addClass("in").attr("aria-expanded", "true").removeAttr("style");
            $("#collapse_2").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
            $("#collapse_3").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
            $("#collapse_4").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
        }
    });


    $('#cs_de_ck_3').on('change', function() {

        if (this.checked) {

            $("#collapse_3").addClass("in").attr("aria-expanded", "true").removeAttr("style");
            $("#collapse_4").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
            $("#collapse_1").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
            $("#collapse_2").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");

        } else {
            $("#collapse_1").addClass("in").attr("aria-expanded", "true").removeAttr("style");
            $("#collapse_2").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
            $("#collapse_3").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
            $("#collapse_4").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
        }
    });


    $('#cs_de_ck_4').on('change', function() {

        if (this.checked) {

            $("#collapse_4").addClass("in").attr("aria-expanded", "true").removeAttr("style");
            $("#collapse_1").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
            $("#collapse_2").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
            $("#collapse_3").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");

        } else {
            $("#collapse_1").addClass("in").attr("aria-expanded", "true").removeAttr("style");
            $("#collapse_2").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
            $("#collapse_3").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
            $("#collapse_4").removeClass("in").attr("aria-expanded", "false").attr("style", "height: 0px;");
        }
    });


    $('#btn_cs_de_ck_AllowSelect').on('click', function(event) {

        $('#cookie-law-info-bar').hide();
        $('#cscookiepopup').modal('hide');

        $('.modal-backdrop').removeAttr('style');

        var PolicyCookie = getCookie('CookieConsent');



        var allCategoriesChecked = false;
        if ((document.getElementById("cs_de_ck_1").checked) && (document.getElementById("cs_de_ck_2").checked) && (document.getElementById("cs_de_ck_3").checked) && (document.getElementById("cs_de_ck_4").checked)) {
            allCategoriesChecked = true;

        }

        if (allCategoriesChecked) {
            var categoryCount = $(".CP-checkbox-lable").length;
            var containsAllCategories = true;
            for (var i = 1; i <= categoryCount; i++) {
                if (PolicyCookie != null && !PolicyCookie.contains($('#cs_ck_' + i + '_label').text().trim())) {
                    containsAllCategories = false;
                }
            }


            if (!containsAllCategories) {
                window.dataLayer.push({
                    'event': $('#cs_de_ck_1').data('eventvalue1'),
                    'cookieConsented': $('#cs_de_ck_1').data('eventvalue')
                });
            } else {
                window.dataLayer.push({
                    'event': $('#cs_de_ck_1').data('eventvalue2'),
                    'cookieConsented': $('#cs_de_ck_1').data('eventvalue')
                });
            }
        }

        //Necessary selection data push
        if ((document.getElementById("cs_de_ck_1").checked) && (!document.getElementById("cs_de_ck_2").checked) && (!document.getElementById("cs_de_ck_3").checked) && (!document.getElementById("cs_de_ck_4").checked)) {
            var consentValue = $('#cs_de_ck_1').data('value');
            window.dataLayer.push({ cookieConsented: consentValue });

        }

        //ONLY Preference selection data push
        if ((document.getElementById("cs_de_ck_2").checked) && (!document.getElementById("cs_de_ck_3").checked) && (!document.getElementById("cs_de_ck_4").checked)) {
            if (PolicyCookie.contains($('#cs_ck_2_label').text().trim())) {
                var consentValue = $('#cs_de_ck_2').data('value');
                window.dataLayer.push({
                    'event': $('#cs_de_ck_2').data('eventvalue1'),
                    'cookieConsented': consentValue
                });
            } else {
                var consentValue = $('#cs_de_ck_2').data('value');
                window.dataLayer.push({
                    'event': $('#cs_de_ck_2').data('eventvalue'),
                    'cookieConsented': consentValue
                });
            }
        }

        //ONLY analytics selection data push
        if ((document.getElementById("cs_de_ck_3").checked) && (!document.getElementById("cs_de_ck_4").checked) && (!document.getElementById("cs_de_ck_2").checked)) {
            if (PolicyCookie.contains($('#cs_ck_3_label').text().trim())) {
                var consentValue = $('#cs_de_ck_3').data('value');
                window.dataLayer.push({
                    'event': $('#cs_de_ck_3').data('eventvalue1'),
                    'cookieConsented': consentValue
                });
            } else {
                var consentValue = $('#cs_de_ck_3').data('value');
                window.dataLayer.push({
                    'event': $('#cs_de_ck_3').data('eventvalue'),
                    'cookieConsented': consentValue
                });
            }
        }

        // ONLY advertising selection data push
        if ((document.getElementById("cs_de_ck_4").checked) && (!document.getElementById("cs_de_ck_2").checked) && (!document.getElementById("cs_de_ck_3").checked)) {
            if (PolicyCookie.contains($('#cs_ck_4_label').text().trim())) {
                var consentValue = $('#cs_de_ck_4').data('value');
                window.dataLayer.push({
                    'event': $('#cs_de_ck_4').data('eventvalue1'),
                    'cookieConsented': consentValue
                });
            } else {
                var consentValue = $('#cs_de_ck_4').data('value');
                window.dataLayer.push({
                    'event': $('#cs_de_ck_4').data('eventvalue'),
                    'cookieConsented': consentValue
                });
            }
        }

        //preferences and analytics combination datapush
        if ((document.getElementById("cs_de_ck_2").checked) && (document.getElementById("cs_de_ck_3").checked) && (!document.getElementById("cs_de_ck_4").checked)) {
            if (PolicyCookie.contains($('#cs_ck_2_label').text().trim()) && PolicyCookie.contains($('#cs_ck_3_label').text().trim())) {
                window.dataLayer.push({
                    'event': $('#cs_de_ck_2').data('eventvalue1') + '|' + $('#cs_ck_3_label').text().trim(),
                    'cookieConsented': '2|3'
                });
            } else {

                window.dataLayer.push({
                    'event': $('#cs_de_ck_2').data('eventvalue') + '|' + $('#cs_ck_3_label').text().trim(),
                    'cookieConsented': '2|3'
                });
            }
        }

        //preferences and advertising combination datapush
        if ((document.getElementById("cs_de_ck_2").checked) && (document.getElementById("cs_de_ck_4").checked) && (!document.getElementById("cs_de_ck_3").checked)) {
            if (PolicyCookie.contains($('#cs_ck_2_label').text().trim()) && PolicyCookie.contains($('#cs_ck_4_label').text().trim())) {
                window.dataLayer.push({
                    'event': $('#cs_de_ck_2').data('eventvalue1') + '|' + $('#cs_ck_4_label').text().trim(),
                    'cookieConsented': '2|4'
                });
            } else {

                window.dataLayer.push({
                    'event': $('#cs_de_ck_2').data('eventvalue') + '|' + $('#cs_ck_4_label').text().trim(),
                    'cookieConsented': '2|4'
                });
            }
        }

        //analytics and advertising combination datapush
        if ((document.getElementById("cs_de_ck_3").checked) && (document.getElementById("cs_de_ck_4").checked) && (!document.getElementById("cs_de_ck_2").checked)) {
            if (PolicyCookie.contains($('#cs_ck_3_label').text().trim()) && PolicyCookie.contains($('#cs_ck_4_label').text().trim())) {
                window.dataLayer.push({
                    'event': $('#cs_de_ck_3').data('eventvalue1') + '|' + $('#cs_ck_4_label').text().trim(),
                    'cookieConsented': '3|4'
                });
            } else {

                window.dataLayer.push({
                    'event': $('#cs_de_ck_3').data('eventvalue') + '|' + $('#cs_ck_4_label').text().trim(),
                    'cookieConsented': '3|4'
                });
            }
        }


        var cookieSelection = [];
        var categoryCount = $(".CP-checkbox-lable").length;
        for (var i = 1; i <= categoryCount; i++) {
            var CheckedOrNot = document.getElementById("cs_de_ck_" + i).checked;
            var CookieCategory = $('#cs_ck_' + i + '_label').text().trim();
            cookieSelection.push({ CookieCategory: CookieCategory, CheckedOrNot: CheckedOrNot });
        }

        var dataObj = JSON.stringify(cookieSelection);

        $.ajax({
            type: "GET",
            url: "/sc/api/Cookie/SetCookies",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: { cookieSelection: dataObj },
            success: function(result) {
                //do noting
            },
            error: function(request, error) {
                //do noting
            }
        });



    });


    $('#cscookiepopup .close').on('click', function() {
        $('.modal-backdrop').removeAttr('style');
    });


    $('#btn_cs_de_ck_AllowAll').on('click', function(event) {

        $('#cookie-law-info-bar').hide();
        $('#cscookiepopup').modal('hide');
        $('.modal-backdrop').removeAttr('style');

        var PolicyCookie = getCookie('CookieConsent');
        var containsAll = true;
        var categoryCount = $(".CP-checkbox-lable").length;
        for (var i = 1; i <= categoryCount; i++) {
            if (PolicyCookie != null && !PolicyCookie.contains($('#cs_ck_' + i + '_label').text().trim())) {
                containsAll = false;
            }
        }


        if (!containsAll) {
            window.dataLayer.push({
                'event': $('#cs_de_ck_1').data('eventvalue1'),
                'cookieConsented': $('#cs_de_ck_1').data('eventvalue')
            });
        } else {
            window.dataLayer.push({
                'event': $('#cs_de_ck_1').data('eventvalue2'),
                'cookieConsented': $('#cs_de_ck_1').data('eventvalue')
            });
        }


        var cookieSelection = [];
        for (var i = 1; i <= categoryCount; i++) {
            var CheckedOrNot = true;
            var CookieCategory = $('#cs_ck_' + i + '_label').text().trim();
            cookieSelection.push({ CookieCategory: CookieCategory, CheckedOrNot: CheckedOrNot });
        }

        var dataObj = JSON.stringify(cookieSelection);

        $.ajax({
            type: "GET",
            url: "/sc/api/Cookie/SetCookies",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: { cookieSelection: dataObj },
            success: function(result) {
                //do noting
            },
            error: function(request, error) {
                //do noting
            }
        });
    });

});

// get a cookie
function getCookieInfo(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function cs_germany_CookieDataLayerPush() {


    var PolicyCookie = getCookieInfo('CookieConsent');

    if (PolicyCookie !== undefined && PolicyCookie !== null && PolicyCookie !== "") {

        if ((PolicyCookie.contains($('#cs_ck_1_label').text().trim())) &&
            (PolicyCookie.contains($('#cs_ck_2_label').text().trim())) &&
            (PolicyCookie.contains($('#cs_ck_3_label').text().trim())) &&
            (PolicyCookie.contains($('#cs_ck_4_label').text().trim()))) {

            window.dataLayer.push({
                'event': $('#cs_de_ck_1').data('eventvalue2'),
                'cookieConsented': $('#cs_de_ck_1').data('eventvalue')
            });
        }


        //Only 'Necessary' category was selected previously
        if ((PolicyCookie.contains($('#cs_ck_1_label').text().trim())) &&
            (!PolicyCookie.contains($('#cs_ck_2_label').text().trim())) &&
            (!PolicyCookie.contains($('#cs_ck_3_label').text().trim())) &&
            (!PolicyCookie.contains($('#cs_ck_4_label').text().trim()))) {
            var consentValue = $('#cs_de_ck_1').data('value');
            window.dataLayer.push({ 'cookieConsented': consentValue });
        }

        //Only 'Preference' category was selected previously

        if ((PolicyCookie.contains($('#cs_ck_2_label').text().trim())) &&
            (!PolicyCookie.contains($('#cs_ck_3_label').text().trim())) &&
            (!PolicyCookie.contains($('#cs_ck_4_label').text().trim()))) {
            var consentValue = $('#cs_de_ck_2').data('value');
            window.dataLayer.push({
                'event': $('#cs_de_ck_2').data('eventvalue1'),
                'cookieConsented': consentValue
            });
        }

        //Only 'analytics' category was selected previously
        if ((!PolicyCookie.contains($('#cs_ck_2_label').text().trim())) &&
            (PolicyCookie.contains($('#cs_ck_3_label').text().trim())) &&
            (!PolicyCookie.contains($('#cs_ck_4_label').text().trim()))) {
            var consentValue = $('#cs_de_ck_3').data('value');
            window.dataLayer.push({
                'event': $('#cs_de_ck_3').data('eventvalue1'),
                'cookieConsented': consentValue
            });
        }

        //Only 'advertising' category was selected previously
        if ((!PolicyCookie.contains($('#cs_ck_2_label').text().trim())) &&
            (!PolicyCookie.contains($('#cs_ck_3_label').text().trim())) &&
            (PolicyCookie.contains($('#cs_ck_4_label').text().trim()))) {
            var consentValue = $('#cs_de_ck_4').data('value');
            window.dataLayer.push({
                'event': $('#cs_de_ck_4').data('eventvalue1'),
                'cookieConsented': consentValue
            });
        }

        //preferences and analytics were selected previously

        if ((PolicyCookie.contains($('#cs_ck_2_label').text().trim())) &&
            (PolicyCookie.contains($('#cs_ck_3_label').text().trim())) &&
            (!PolicyCookie.contains($('#cs_ck_4_label').text().trim()))) {
            window.dataLayer.push({
                'event': $('#cs_de_ck_2').data('eventvalue1') + '|' + $('#cs_ck_3_label').text().trim(),
                'cookieConsented': '2|3'
            });
        }




        //preferences and advertising were selected previously
        if ((PolicyCookie.contains($('#cs_ck_2_label').text().trim())) &&
            (!PolicyCookie.contains($('#cs_ck_3_label').text().trim())) &&
            (PolicyCookie.contains($('#cs_ck_4_label').text().trim()))) {
            if (PolicyCookie.contains($('#cs_ck_2_label').text().trim()) && PolicyCookie.contains($('#cs_ck_4_label').text().trim())) {
                window.dataLayer.push({
                    'event': $('#cs_de_ck_2').data('eventvalue1') + '|' + $('#cs_ck_4_label').text().trim(),
                    'cookieConsented': '2|4'
                });
            }
        }

        //analytics and advertising were selected previously
        if ((!PolicyCookie.contains($('#cs_ck_2_label').text().trim())) &&
            (PolicyCookie.contains($('#cs_ck_3_label').text().trim())) &&
            (PolicyCookie.contains($('#cs_ck_4_label').text().trim()))) {
            window.dataLayer.push({
                'event': $('#cs_de_ck_3').data('eventvalue1') + '|' + $('#cs_ck_4_label').text().trim(),
                'cookieConsented': '3|4'
            });
        }
    }
}

if (document.querySelectorAll('#mapsvgEE img.EE').length > 0) {
    document.querySelectorAll('#mapsvgEE img.EE').forEach(function(img) {
        var imgID = img.id;
        var imgClass = img.className;
        var imgURL = img.src;

        fetch(imgURL).then(function(response) {
            return response.text();
        }).then(function(text) {

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(text, "text/xml");

            // Get the SVG tag, ignore the rest
            var svg = xmlDoc.getElementsByTagName('svg')[0];

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                svg.setAttribute('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                svg.setAttribute('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            svg.removeAttribute('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
                svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
            }

            // Replace image with new SVG
            img.parentNode.replaceChild(svg, img);

        });

    })
}

$(document).ready(function() {
    $('.ItalyCoolsculpting .country-change, .JapanCoolsculpting .country-change').on('click', function() {
        $('html').css('overflow-y', 'hidden');
        $('#cs-model').addClass('countryModel');
    });
    $(document).on('hidden.bs.modal', '.ItalyCoolsculpting .countryModel, .JapanCoolsculpting .countryModel', function() {
        $('html').css('overflow-y', 'auto');
    });
});

function CreateCookie(name, value, days) {
    $.get("/sc/api/Cookie/SetGenericCookie?cookieName=" + name + "&cookieValue=" + value + "&days=" + days);
}

function openLeaveWebsiteDisclaimerModal(event) {
    if ($('#leavingWebsiteModal').length) {
        event.preventDefault();
        $('#leavingWebsiteModal .btn.confirm').data('url', event.target.href);
        $('#leavingWebsiteModal').modal();
    }

    $('#leavingWebsiteModal .btn.confirm').off('click').on('click', function() {
        var url = $(this).data('url');
        window.open(url, "_blank");
    });
}

$(document).ready(function() {
    var isHealthcareProfessional = getCookieByTag('is_healthcare_professional');
    if (isHealthcareProfessional !== 'true') {
        $(".generic-popup").css("display", "block");
        $('.generic-popup__content-accept-text').on('click', function(event) {
            setCookie('is_healthcare_professional', true, 7);
            $(".generic-popup").css("display", 'none');
        });

        $('.generic-popup__content-reject-text').on('click', function(event) {
            setCookie('is_healthcare_professional', false, 7);
            $(".generic-popup").css("display", 'none');

        });
    } else {
        $(".generic-popup").css("display", "none");
    }
});

function getCookieByTag(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



//UK Navigation and LisaSnowdon

$(document).ready(function () {
    if ($('body').attr('pagename') == "Home" && $('body').attr('class') == "en Coolsculpting") {
        if ($('.lan-select').children().length == 0) {
            $('.main-nav .lan-select').css('display', 'none');
            $('.main-nav .cta-group').css('left', '0');
        }
    }

    if ($('body').attr('pagename') == "Home" && $('body').attr('class') == "en Coolsculpting") {
        var value = "&rel=0";
        $('iframe').each(function () {
            $(this).attr('src', $(this).attr('src') + value);
        });
    }

    if ($('body').attr('pagename') == "lisa-snowdon" && $('body').attr('class') == "en Coolsculpting") {
        var value_video = "&rel=0";
        $('iframe').each(function () {
            $(this).attr('src', $(this).attr('src') + value_video);
        });
    }

});
$(document).ready(function() {
    if ($('body').attr('class') == "fr FranceCoolsculpting") {
        var imglazyload = $("#settings-ImageLazyload").attr("data-ImageLazyload");

        if ($('main > section > section').eq(0).find('.video-wrap a img.video-bg').length > 0) {
            if (imglazyload != undefined && imglazyload == "1") {
                $('main > section > section').eq(0).hide(); $('main').append('<section class="paralleximg"  style="background-image:url(' + $('main > section > section').eq(0).find('.video-wrap a img.video-bg').attr('datasrc') + ')"></section>');

            }
            else {
                $('main > section > section').eq(0).hide(); $('main').append('<section class="paralleximg"  style="background-image:url(' + $('main > section > section').eq(0).find('.video-wrap a img.video-bg').attr('src') + ')"></section>');

            }

        }
             
    }
});
$(document).ready(function () {
    if ($('body').attr('class') == "en SingaporeCoolsculpting" || $('body').hasClass("ThailandCoolsculpting")) {
        $(document).on('click', '.int-link a', function (e) {
            e.preventDefault();
            var id = $(this).attr('href').split('#')[1];
            if ($('.cookie-wrapper').css('display') == "none") {
                navheight = $('header').height();
            } else {
                navheight = $('header').height() + $('.cookie-wrapper').height();
            }
            $('html, body').animate({
                scrollTop: $('#' + id).offset().top - navheight
            }, 500);
        });
    }
});
$(document).ready(function () {
    if ($('body').attr('class') == "en LATAMCoolsculpting") {
        $(document).on('click', '.int-link a', function (e) {
            e.preventDefault();
            var id = $(this).attr('href').split('#')[1];

            navheight = $('header').height();

            $('html, body').animate({
                scrollTop: $('#' + id).offset().top - navheight
            }, 500);
        });
    }
    if ($(window).width() < 992) {
        $($('.ThailandCoolsculpting .img-hs-container .selection-panel ul').clone()).insertAfter('.hs-header');
        $('.ThailandCoolsculpting .img-hs-container .selection-panel ul').css('display', 'none');
    } else {
        $('.ThailandCoolsculpting .img-hs-container .selection-panel ul').css('display', 'block');
        $('.ThailandCoolsculpting .hs-header').siblings('ul').remove();
    }
});
var cachedWidth = $(window).width();
$(window).resize(function () {
    var newWidth = $(window).width();
    if (newWidth !== cachedWidth) {
        if ($(window).width() < 992) {
            $($('.ThailandCoolsculpting .img-hs-container .selection-panel ul').clone()).insertAfter('.hs-header');
            $('.ThailandCoolsculpting .img-hs-container .selection-panel ul').css('display', 'none');
        } else {
            $('.ThailandCoolsculpting .img-hs-container .selection-panel ul').css('display', 'block');
            $('.ThailandCoolsculpting .hs-header').siblings('ul').remove();
        }
    }
});


$(document).ready(function () {
    if ($(window).width() > 992) {
        if ($('.isi-fixed .isi-text').text().length > 200) {
            $('.isi-fixed .isi-wrapper').addClass('expandable');
        } else {
            $('.isi-fixed .isi-wrapper').removeClass('expandable')
        }
    } else {
        $('.isi-fixed .isi-wrapper').addClass('expandable');
    }
    $('.isi-fixed').on('click', '.isi-btn', function () {
        if ($('.isi-fixed .isi-wrapper').hasClass('expanded')) {
            $('.isi-fixed .isi-wrapper').removeClass('expanded')
        } else {
            $('.isi-fixed .isi-wrapper').addClass('expanded');
        }

    });

    if ($('.AustraliaCoolsculpting.Home .australiavideo iframe.vimeo-video') && $('.AustraliaCoolsculpting.Home .australiavideo iframe.vimeo-video').length > 0) {
        $('.AustraliaCoolsculpting.Home .australiavideo iframe.vimeo-video').attr('width', '730');
        $('.AustraliaCoolsculpting.Home .australiavideo iframe.vimeo-video').attr('height', '460');
    }
});

$(window).on('scroll', function () {

    if ($(window).width() > 1024) {
        if ($('.australiafooterintro-container').length > 0) {
            if ($('.australiafooterintro-container').offset() && ($(window).scrollTop() >= ($('.australiafooterintro-container').offset().top - 460))) {
                $('.isi-fixed').removeClass('sticky');
            } else {
                $('.isi-fixed').addClass('sticky');
            }
        } else if ($('footer .footer-inner').length > 0) {
            if (($(window).scrollTop() >= ($('footer .footer-inner').offset().top - 720))) {
                $('.isi-fixed').removeClass('sticky');
                $('.isi-fixed').addClass('custom-margin');
            } else {
                $('.isi-fixed').addClass('sticky');
                $('.isi-fixed').removeClass('custom-margin');
            }
        }
    } else {
        if ($(window).width() > 768 && $(window).width() < 1024) {
            if ($('.australiafooterintro-container').length > 0) {
                if ($('.australiafooterintro-container').offset() && ($(window).scrollTop() >= ($('.australiafooterintro-container').offset().top - 1000))) {
                    $('.isi-fixed').removeClass('sticky');
                } else {
                    $('.isi-fixed').addClass('sticky');
                }
            } else if ($('footer .footer-inner').length > 0) {
                if (($(window).scrollTop() >= ($('footer .footer-inner').offset().top - 1200))) {
                    $('.isi-fixed').removeClass('sticky');
                    $('.isi-fixed').addClass('custom-margin');
                } else {
                    $('.isi-fixed').addClass('sticky');
                    $('.isi-fixed').removeClass('custom-margin');
                }
            }
        } else {
            if ($('.australiafooterintro-container').length > 0) {
                if ($('.australiafooterintro-container').offset() && ($(window).scrollTop() + $(window).height() >= $('.australiafooterintro-container').offset().top)) {
                    $('.isi-fixed').removeClass('sticky');
                } else {
                    $('.isi-fixed').addClass('sticky');
                }
            } else if ($('footer .footer-inner').length > 0) {
                if (($(window).scrollTop() >= ($('footer .footer-inner').offset().top - 980))) {
                    $('.isi-fixed').removeClass('sticky');
                    $('.isi-fixed').addClass('custom-margin');
                } else {
                    $('.isi-fixed').addClass('sticky');
                    $('.isi-fixed').removeClass('custom-margin');
                }
            }
        }
    }
});