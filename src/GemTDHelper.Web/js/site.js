"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gem_1 = require("./gem");
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
    $.getJSON("gems.json")
        .done(function (data) {
        tableContent.empty();
        for (var i = 0; i < data.gems.types.length; i++) {
            var type = data.gems.types[i];
            var url = type.type;
            switch (type.subType) {
                case gem_1.GemSubType.BASIC: {
                    url += "_" + gem_1.GemLevel.NORMAL;
                    break;
                }
                case gem_1.GemSubType.SLATE: {
                    url += "_" + gem_1.GemSubType.SLATE;
                    break;
                }
                case gem_1.GemSubType.SPECIAL: {
                    break;
                }
            }
            var subType = data.gems.subTypes.filter(function (x) { return x.type === type.subType; })[0];
            var tr = $("<tr />");
            var td0 = $("<td><img style='max-width: 50px;' src='gems/" + url + ".png' /></td>");
            var td1 = $("<td>" + type.name + "</td>");
            var td2 = $("<td>" + subType.name + "</td>");
            td0.appendTo(tr);
            td1.appendTo(tr);
            td2.appendTo(tr);
            tr.appendTo(tableContent);
        }
    });
});
