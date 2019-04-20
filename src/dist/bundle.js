var GemTDHelper =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/site.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./data/v1.5.4/types/GemLevel.ts":
/*!***************************************!*\
  !*** ./data/v1.5.4/types/GemLevel.ts ***!
  \***************************************/
/*! exports provided: GemLevel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GemLevel", function() { return GemLevel; });
var GemLevel;
(function (GemLevel) {
    GemLevel["CHIPPED"] = "CHIPPED";
    GemLevel["FLAWED"] = "FLAWED";
    GemLevel["NORMAL"] = "NORMAL";
    GemLevel["FLAWLESS"] = "FLAWLESS";
    GemLevel["PERFECT"] = "PERFECT";
    GemLevel["GREAT"] = "GREAT";
})(GemLevel || (GemLevel = {}));


/***/ }),

/***/ "./data/v1.5.4/types/GemSubType.ts":
/*!*****************************************!*\
  !*** ./data/v1.5.4/types/GemSubType.ts ***!
  \*****************************************/
/*! exports provided: GemSubType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GemSubType", function() { return GemSubType; });
var GemSubType;
(function (GemSubType) {
    GemSubType["BASIC"] = "BASIC";
    GemSubType["SLATE"] = "SLATE";
    GemSubType["SPECIAL"] = "SPECIAL";
})(GemSubType || (GemSubType = {}));


/***/ }),

/***/ "./data/v1.5.4/types/index.ts":
/*!************************************!*\
  !*** ./data/v1.5.4/types/index.ts ***!
  \************************************/
/*! exports provided: DataJSONPath, DataImagesPath, GemLevel, GemSubType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataJSONPath", function() { return DataJSONPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataImagesPath", function() { return DataImagesPath; });
/* harmony import */ var _GemLevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GemLevel */ "./data/v1.5.4/types/GemLevel.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GemLevel", function() { return _GemLevel__WEBPACK_IMPORTED_MODULE_0__["GemLevel"]; });

/* harmony import */ var _GemSubType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GemSubType */ "./data/v1.5.4/types/GemSubType.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GemSubType", function() { return _GemSubType__WEBPACK_IMPORTED_MODULE_1__["GemSubType"]; });



var DataJSONPath = "v1.5.4/data.json";
var DataImagesPath = "v1.5.4/images";


/***/ }),

/***/ "./scripts/site.ts":
/*!*************************!*\
  !*** ./scripts/site.ts ***!
  \*************************/
/*! exports provided: v154, HomeViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeViewModel", function() { return HomeViewModel; });
/* harmony import */ var _styles_site_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/site.css */ "./styles/site.css");
/* harmony import */ var _styles_site_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_site_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_v1_5_4_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/v1.5.4/types */ "./data/v1.5.4/types/index.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "v154", function() { return _data_v1_5_4_types__WEBPACK_IMPORTED_MODULE_1__; });



var HomeViewModel = /** @class */ (function () {
    function HomeViewModel(data) {
        var _this = this;
        this.data = data;
        this.items = ko.observableArray([]);
        this.requirements = ko.observableArray([]);
        this.subTypeValue = ko.observable(null);
        this.selectedItemValue = ko.observable(null);
        this.selectedItemValue.subscribe(function () {
            _this.ensureRequirements();
        });
        this.searchValue = ko.observable("");
        this.searchValue.subscribe(function () {
            _this.ensureItems();
        });
        this.ensureItems();
    }
    HomeViewModel.prototype.onItemClicked = function (item, event) {
        var selected = this.selectedItemValue();
        if (selected && selected.type === item.type) {
            this.selectedItemValue(null);
        }
        else {
            this.selectedItemValue(item);
        }
        this.ensureItems();
    };
    HomeViewModel.prototype.onFilterSubTypeClicked = function (subType) {
        if (subType === void 0) { subType = null; }
        this.subTypeValue(subType);
        this.ensureItems();
    };
    HomeViewModel.prototype.filterItems = function () {
        var _this = this;
        var types = this.data.gems.types;
        if (this.subTypeValue()) {
            types = types.filter(function (x) { return x.subType == _this.subTypeValue(); });
        }
        if (this.searchValue()) {
            types = types.filter(function (x) {
                var value = _this.searchValue().toLowerCase();
                var index = -1;
                index = x.name.toLowerCase().indexOf(value);
                if (index >= 0) {
                    return true;
                }
                return false;
            });
        }
        return types;
    };
    HomeViewModel.prototype.ensureItems = function () {
        var _a;
        var types = this.filterItems();
        var items = [];
        for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
            var type = types_1[_i];
            var item = this.convert(type);
            items.push(item);
        }
        this.items.removeAll();
        (_a = this.items).push.apply(_a, items);
    };
    HomeViewModel.prototype.ensureRequirements = function () {
        var _a;
        this.requirements.removeAll();
        var selected = this.selectedItemValue();
        if (selected === null) {
            return;
        }
        var items = [];
        var selectedType = this.data.gems.types.filter(function (x) { return x.type === selected.type; })[0];
        if (selectedType.requirements) {
            var _loop_1 = function (requirement) {
                var type = this_1.data.gems.types.filter(function (x) { return x.type === requirement.type; })[0];
                var item = this_1.convertRequirement(type, requirement);
                items.push(item);
            };
            var this_1 = this;
            for (var _i = 0, _b = selectedType.requirements; _i < _b.length; _i++) {
                var requirement = _b[_i];
                _loop_1(requirement);
            }
        }
        (_a = this.requirements).push.apply(_a, items);
    };
    HomeViewModel.prototype.convert = function (type) {
        var subType = this.data.gems.subTypes.filter(function (x) { return x.type === type.subType; })[0];
        var url = type.type;
        switch (type.subType) {
            case _data_v1_5_4_types__WEBPACK_IMPORTED_MODULE_1__["GemSubType"].BASIC: {
                url += "_" + _data_v1_5_4_types__WEBPACK_IMPORTED_MODULE_1__["GemLevel"].NORMAL;
                break;
            }
            case _data_v1_5_4_types__WEBPACK_IMPORTED_MODULE_1__["GemSubType"].SLATE: {
                url += "_" + _data_v1_5_4_types__WEBPACK_IMPORTED_MODULE_1__["GemSubType"].SLATE;
                break;
            }
            case _data_v1_5_4_types__WEBPACK_IMPORTED_MODULE_1__["GemSubType"].SPECIAL: {
                break;
            }
        }
        var selectedItemType = this.selectedItemValue()
            ? this.selectedItemValue().type
            : null;
        var result = {
            name: type.name,
            type: type.type,
            subType: subType.name,
            url: "/data/" + _data_v1_5_4_types__WEBPACK_IMPORTED_MODULE_1__["DataImagesPath"] + "/" + url + ".png",
            isSelected: selectedItemType === type.type
        };
        return result;
    };
    HomeViewModel.prototype.convertRequirement = function (type, requirement) {
        var subType = this.data.gems.subTypes.filter(function (x) { return x.type === type.subType; })[0];
        var level = this.data.gems.levels.filter(function (x) { return x.type === requirement.level; })[0];
        var url = type.type;
        switch (type.subType) {
            case _data_v1_5_4_types__WEBPACK_IMPORTED_MODULE_1__["GemSubType"].BASIC: {
                url += "_" + level.type;
                break;
            }
            case _data_v1_5_4_types__WEBPACK_IMPORTED_MODULE_1__["GemSubType"].SLATE: {
                url += "_" + _data_v1_5_4_types__WEBPACK_IMPORTED_MODULE_1__["GemSubType"].SLATE;
                break;
            }
        }
        var result = {
            name: type.name,
            type: type.type,
            subType: subType.name,
            url: "/data/" + _data_v1_5_4_types__WEBPACK_IMPORTED_MODULE_1__["DataImagesPath"] + "/" + url + ".png",
            level: level ? level.name : "-"
        };
        return result;
    };
    return HomeViewModel;
}());

$(function () {
    $.getJSON("/data/" + _data_v1_5_4_types__WEBPACK_IMPORTED_MODULE_1__["DataJSONPath"])
        .done(function (data) {
        ko.applyBindings(new HomeViewModel(data));
    });
});


/***/ }),

/***/ "./styles/site.css":
/*!*************************!*\
  !*** ./styles/site.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });