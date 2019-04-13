(function () {
    var defines = {};
    var entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies: dependencies, factory: factory };
        entry[0] = name;
    }
    define("require", ["exports"], function (exports) {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: function (name) { return resolve(name); } });
    });
    define("data/v1.5.4/index", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.DataJSONPath = "v1.5.4/data.json";
        exports.ImagesPath = "v1.5.4/images";
        var GemLevel;
        (function (GemLevel) {
            GemLevel["CHIPPED"] = "CHIPPED";
            GemLevel["FLAWED"] = "FLAWED";
            GemLevel["NORMAL"] = "NORMAL";
            GemLevel["FLAWLESS"] = "FLAWLESS";
            GemLevel["PERFECT"] = "PERFECT";
            GemLevel["GREAT"] = "GREAT";
        })(GemLevel = exports.GemLevel || (exports.GemLevel = {}));
        var GemSubType;
        (function (GemSubType) {
            GemSubType["BASIC"] = "BASIC";
            GemSubType["SLATE"] = "SLATE";
            GemSubType["SPECIAL"] = "SPECIAL";
        })(GemSubType = exports.GemSubType || (exports.GemSubType = {}));
    });
    define("js/site", ["require", "exports", "data/v1.5.4/index"], function (require, exports, v154) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        $(function () {
            // Toggle the side navigation
            $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
                $("body").toggleClass("sidebar-toggled");
                $(".sidebar").toggleClass("toggled");
                if ($(".sidebar").hasClass("toggled")) {
                    $('.sidebar .collapse').collapse('hide');
                }
                ;
            });
            // Close any open menu accordions when window is resized below 768px
            $(window).resize(function () {
                if ($(window).width() < 768) {
                    $('.sidebar .collapse').collapse('hide');
                }
                ;
            });
            // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
            $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
                if ($(window).width() > 768) {
                    var e0 = e.originalEvent, delta = e0.wheelDelta || -e0.detail;
                    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
                    e.preventDefault();
                }
            });
            // Scroll to top button appear
            $(document).on('scroll', function () {
                var scrollDistance = $(this).scrollTop();
                if (scrollDistance && scrollDistance > 100) {
                    $('.scroll-to-top').fadeIn();
                }
                else {
                    $('.scroll-to-top').fadeOut();
                }
            });
            // Smooth scrolling using jQuery easing
            $(document).on('click', 'a.scroll-to-top', function (e) {
                var $anchor = $(this);
                var href = $anchor.attr('href');
                var $href = $(href);
                $('html, body').stop().animate({
                    scrollTop: $href.offset().top
                }, 1000, 'easeInOutExpo');
                e.preventDefault();
            });
            var tableContent = $("#table-content");
            $.getJSON("/data/" + v154.DataJSONPath)
                .done(function (data) {
                tableContent.empty();
                for (var i = 0; i < data.gems.types.length; i++) {
                    var type = data.gems.types[i];
                    var url = type.type;
                    switch (type.subType) {
                        case v154.GemSubType.BASIC: {
                            url += "_" + v154.GemLevel.NORMAL;
                            break;
                        }
                        case v154.GemSubType.SLATE: {
                            url += "_" + v154.GemSubType.SLATE;
                            break;
                        }
                        case v154.GemSubType.SPECIAL: {
                            break;
                        }
                    }
                    var subType = data.gems.subTypes.filter(function (x) { return x.type === type.subType; })[0];
                    var tr = $("<tr />");
                    var td0 = $("<td><img style='max-width: 50px;' src='/data/" + v154.ImagesPath + "/" + url + ".png' /></td>");
                    var td1 = $("<td>" + type.name + "</td>");
                    var td2 = $("<td>" + subType.name + "</td>");
                    td0.appendTo(tr);
                    td1.appendTo(tr);
                    td2.appendTo(tr);
                    tr.appendTo(tableContent);
                }
            });
        });
    });
    //# sourceMappingURL=bundle.js.map
    'marker:resolver';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            var dependencies = ['exports'];
            var factory = function (exports) {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch (_a) {
                    throw Error(['module "', name, '" not found.'].join(''));
                }
            };
            return { dependencies: dependencies, factory: factory };
        }
    }
    var instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        var define = get_define(name);
        instances[name] = {};
        var dependencies = define.dependencies.map(function (name) { return resolve(name); });
        define.factory.apply(define, dependencies);
        var exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports.default : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();