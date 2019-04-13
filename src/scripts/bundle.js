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
    define("index", ["require", "exports"], function (require, exports) {
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