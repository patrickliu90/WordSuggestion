(function() {
    "use strict";
    angular
        .module("cityResourceMock", ["ngMockE2E"])
        .run(function($httpBackend) {
            var cities = [
                {
                    links: [
                        {
                            href: "http://localhost:8080/api/v1/city/SmartCart",
                            rel: "self"
                        },
                        {
                            href: "http://localhost:8080/api/v1/city/logo/4538764",
                            rel: "logo"
                        },
                        {
                            href: "http://smartcart.futurecity3d.club/",
                            rel: "store"
                        },
                        {
                            href: "http://localhost:8080/api/v1/citizen/1214862",
                            rel: "leader"
                        }
                    ],
                    id: 1,
                    name: "SmartCart",
                    leader: "Jordan Johnson",
                    citySize: "SMALL",
                    logoUrl: "http://localhost:8080/api/v1/city/logo/4538764",
                    url: "http://smartcart.futurecity3d.club/",
                    subdomain: "smartcart",
                    cityStatus: "ENABLED",
                    collectiveBonusWalletAddress: "C9BE3245-031E-4B03-A638-9492A43A43CB",
                    createdDate: "2015-07-15T15:42:37.309Z",
                    lastUpdatedDate: "2015-08-06T21:23:15.912Z"
                }
            ];

            var interceptUrl = "/api/city";

            $httpBackend.whenGET(interceptUrl).respond(function (method, url, data) {
                logHttpIntercept(method, url, data);
                return [200, cities, {}];
            });

            $httpBackend.whenGET(new RegExp(interceptUrl + "/[0-9][0-9]*")).respond(function (method, url, data) {
                logHttpIntercept(method, url, data);

                // get id
                var params = url.split('/');
                var cityId = params.pop();

                var city = { id: 0 };
                for(var i = 0; i < cities.length; i++) {
                    if(cityId == cities[i].id) {
                        city = cities[i];
                        break;
                    }
                }

                return [200, city, {}];
            });

            $httpBackend.whenPOST(interceptUrl).respond(function (method, url, data) {
                logHttpIntercept(method, url, data);
                // TODO: Assumes that largest id used is equal to length of array
                var city = angular.fromJson(data);
                city.id = cities.length + 1;
                cities.push(city);

                return [200, city, {}];
            });

            // Allow non rest service request to pass through the mock service
            $httpBackend.whenGET(/app/).passThrough();

            var logHttpIntercept = function (method, url, data) {
                console.log("Http intercepted: { "
                    + "method: " + method
                    + ", url: " + url
                    + ", data: " + data + " }");
            };
        });
}());