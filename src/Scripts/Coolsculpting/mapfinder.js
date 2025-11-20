app.directive("mapsvg", function () {
    return {
        restrict: "A",
        //templateUrl: "views/clinicSearchResult_view.html",
        scope: true,
        transclude: false,
        controller: "mapSvgController"
    };
});

app.controller("mapSvgController", ['$scope', '$http', '$filter', '$compile', '$q', function ($scope, $http, $filter, $compile, $q) {

    var FR_IL = "Île-de-France",
        FR_ARA = "Auvergne-Rhône-Alpes",
        FR_BFC = "Bourgogne-Franche-Comté",
        FR_Bretagne = "Bretagne",
        FR_CVL = "Centre-Val de Loire",
        FR_C = "Corse",
        FR_GE = "Grand-Est",
        FR_Hauts = "Hauts-de-France",
        FR_Normandie = "Normandie",
        FR_NA = "Nouvelle-Aquitaine",
        FR_O = "Occitanie",
        FR_PL = "Pays de la Loire",
        FR_PAC = "Provence-Alpes-Côte d'Azur";
    $scope.loader = true;
    $scope.initiatemapSvg = function () {
        deferred = $q.defer();
        $scope.IsVisible = false;
        $scope.domain = angular.element("#settings-countrycode").data("country");
        var animateInterval;
        $scope.latitude;
        $scope.longitude;
        $scope.f = true;
        var address = "France";
        var geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({ 'address': address }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    $scope.latitude = results[0].geometry.location.lat();
                    $scope.longitude = results[0].geometry.location.lng();
                    $scope.getdata();
                }
            });
        }


        $scope.pulledData = {};
        $scope.cliniccount = 0;
        $scope.iData = "";
        $scope.clinicRegion = "";
        return deferred.promise;
    }

    $scope.getdata = function () {
        deferred = $q.defer();

        $scope.matchdata = [{}];
        //var url = location.origin + "/sc/api/findclinic/GetICLClinicResults";
        $.ajax({
            url: "/sc/api/findclinic/GetICLClinicResults",
            cache: false,
            type: 'POST',
            //type: 'GET',
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val(),
                Latitude: $scope.latitude,
                Longitude: $scope.longitude,
                DistanceFrom: "0",
                DistanceTo: "-1",
                BrandName: "coolsculpting",
                NewCountry: 'TH'   // 5-30-2023 support AEM api
            },
            success: function (response) {
                if (response.IsValid && response.data != null && response.data != "") {
                    $scope.$apply(function () {
                        $scope.loader = true;
                    });
                    $scope.pulledData = JSON.parse(response.data);
                    $scope.mapsvgcall();

                } else {
                    resultError();
                }
            },
            complete: function () {
                $scope.$apply(function () {
                    $scope.loader = false;
                });
            },
            error: function (response) {
                resultError();
            }
        });

        function resultError() {

            angular.element('#errorModal').modal();
            $('#errorModal').on('shown.bs.modal', function () {
                angular.element('.modal-body').html(angular.element('#searchErr').text());
            });
            // clear map

        }
        return deferred.promise;
    }
    $scope.mapsvgcall = function () {

        function filterdata(id) {
            var match;
            match = $filter('filter')($scope.pulledData, { clinic_address: { state: id } });
            if (match != undefined) {
                $scope.cliniccount = match.length;
                angular.element('.mapsvg-tooltip').html("<p><strong>" + $('#rgText').text() + " " + id + "</strong>" + $scope.cliniccount + " " + $('#cnText').text() + "<span>" + $("#viewmoreText").text() + "</span></p>");
                angular.element('.mapsvg-tooltip').css('display', 'inline-block');
            } else {
                angular.element('.mapsvg-tooltip').css('display', 'none');
            }
        }

        angular.element("#mapsvg").mapSvg({
            width: 600,
            height: 600,
            colors: {
                baseDefault: "#000000",
                background: "#ffff",
                selected: "01b3ef",
                hover: "01b3ef",
                base: "0083cb",
                stroke: "e2edf0"
            },
            mouseOver: function (e, mapsvg) {
                var region = this;
                $scope.f = false;
                $scope.cycle();
                filterdata(this.id);
            },
            mouseOut: function () {
                $scope.f = true;
                $scope.cycle();
            },
            onClick: function (e, mapsvg) {
                var clickedRegion = this;
                $scope.iData = clickedRegion.id;
                dataLayer.push({
                    searchTerm: $('#rgText').text() + " " + $scope.iData,
                    event: 'searchPerformedRegionSelected'
                });
                $scope.datapull();
            },
            afterLoad: function (e, mapsvg) {
                $scope.f = true;
                $scope.cycle();
            },
            regions: {
                'FR_IL': {
                    id: FR_IL,
                    tooltip: "&nbsp;"
                },
                'FR_ARA': {
                    id: FR_ARA,
                    tooltip: "&nbsp;"
                },
                'FR_BFC': {
                    id: FR_BFC,
                    tooltip: "&nbsp;"
                },
                'FR_Bretagne': {
                    id: FR_Bretagne,
                    tooltip: "&nbsp;"
                },
                'FR_CVL': {
                    id: FR_CVL,
                    tooltip: "&nbsp;"
                },
                'FR_C': {
                    id: FR_C,
                    tooltip: "&nbsp;"
                },
                'FR_GE': {
                    id: FR_GE,
                    tooltip: "&nbsp;"
                },
                'FR_Hauts': {
                    id: FR_Hauts,
                    tooltip: "&nbsp;"
                },
                'FR_Normandie': {
                    id: FR_Normandie,
                    tooltip: "&nbsp;"
                },
                'FR_NA': {
                    id: FR_NA,
                    tooltip: "&nbsp;"
                },
                'FR_O': {
                    id: FR_O,
                    tooltip: "&nbsp;"
                },
                'FR_PL': {
                    id: FR_PL,
                    tooltip: "&nbsp;"
                },
                'FR_PAC': {
                    id: FR_PAC,
                    tooltip: "&nbsp;"
                }
            },
            gauge: {
                on: false,
                labels: {
                    low: "low",
                    high: "high"
                },
                colors: {
                    lowRGB: {
                        r: 85,
                        g: 0,
                        b: 0,
                        a: 1
                    },
                    highRGB: {
                        r: 238,
                        g: 0,
                        b: 0,
                        a: 1
                    },
                    low: "#550000",
                    high: "#ee0000",
                    diffRGB: {
                        r: 153,
                        g: 0,
                        b: 0,
                        a: 0
                    }
                },
                min: 0,
                max: false
            },
            source: $('#mapImageUrl').text(),
            title: "",
            responsive: true,

        });

    }
    angular.element('.container-list-pays').niceScroll({
        cursorcolor: "#75787b",
        cursorwidth: "6px",
        cursorborder: "none",
        cursorborderradius: "0px",
        autohidemode: false
    });
    $scope.datapull = function () {
        if ($scope.iData != "") {
            var fltrdata = $filter('filter')($scope.pulledData, { clinic_address: { state: $scope.iData } });
            var fltrdata1 = $filter('orderBy')(fltrdata, 'clinic_address.city');
            var region = $scope.iData;
            $scope.$apply(function () {
                $scope.matchdata = fltrdata1;
                $scope.cliniccount = fltrdata1.length;
                $scope.clinicRegion = region;
            });
            disableBgActions();
            angular.element('.popup-pays, #overlay-popup-maps').show();
            $scope.iData = "";
            $(".container-list-pays").animate({ "scrollTop": (Math.floor('.container-list-pays')) }, 400);
        }

    }

    $scope.sendDetails = function (event) {

        var VeevaId = $(event.currentTarget).attr("VeevaId");
        var Address = '';
        var Telephone = '';
        if (event.currentTarget.className != 'phone-cabinet ng-binding') {
            var searchParams =
                {
                    VeevaId: VeevaId,
                    Address: 'true',
                    Telephone: 'false'
                };
        } else {
            var searchParams =
                {
                    VeevaId: VeevaId,
                    Address: 'false',
                    Telephone: 'true'
                };
        }
        $.ajax({
            url: location.origin + "/sc/api/findclinic/SendData",
            cache: false,
            type: 'POST',
            //type: 'GET',
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val(),
                'requestdata': searchParams
            },
            success: function (response) {
                var res = JSON.parse(response);

                if ((res.data != undefined) && (res.data.Message != null)) {

                }
                else {
                    resultError();
                }
            },
            error: function (response) {
                resultError();
            }
        });
    }

    $scope.hidepopup = function () {
        enableBgActions();
        angular.element('.popup-pays, #overlay-popup-maps').hide();
    }

    angular.element('.close-popups-pays').on('keypress', function (e) {
        if (e.keyCode == 13) {
            $scope.hidepopup();
        }

    })
    angular.element(document).on('keydown', function (e) {
        if (e.keyCode == 9) {
            angular.element('svg path').each(function () {
                if (angular.element(this).is(':focus')) {
                    angular.element(this).addClass('focus');
                    $scope.f = false;
                    $scope.cycle();
                } else {
                    angular.element(this).removeClass('focus');
                }
            });
        }
    });
    //angular.element('svg path').on('keypress', function (event) {
    //    if (event.keyCode == 13) {
    //        angular.element(this).click();
    //    }
    //});
    $scope.cycle = function () {
        if ($scope.f) {
            animateInterval = setInterval(function () {
                var index = Math.floor(Math.random() * angular.element('#mapsvg svg .mapsvg-region').length);
                $("svg .mapsvg-region").attr("class", "mapsvg-region").eq(index).attr("class", "mapsvg-region active-key");
            }, 1000);
        } else {
            clearInterval(animateInterval);
            $("svg .mapsvg-region").attr("class", "mapsvg-region");
        }
    }

    var blockElements, ariaHiddenElements, tabDisabledElements, tabEnabledElements, linkElements, inputs;

    function disableBgActions() {

        blockElements = angular.element("header,footer,main,section").not("section[country-selection]");

        ariaHiddenElements = angular.element("[aria-hidden='true']").not(".popup-pays [aria-hidden='true']");

        tabDisabledElements = angular.element("[tabindex='-1']").not(".popup-pays [tabindex='-1']");

        tabEnabledElements = angular.element("[tabindex='0']").not(".popup-pays [tabindex='0']");

        linkElements = angular.element("a").not(".popup-pays a");

        inputs = angular.element("input, button").not(".popup-pays input, .popup-pays button");

        disabledInputs = angular.element("input[tabindex='-1'], button[tabindex='-1']").not(".popup-pays input[tabindex='-1'], .popup-pays button[tabindex='-1']");

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