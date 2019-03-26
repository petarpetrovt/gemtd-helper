"use strict";
var GemLevel;
(function (GemLevel) {
    GemLevel["CHIPPED"] = "CHIPPED";
    GemLevel["FLAWED"] = "FLAWED";
    GemLevel["NORMAL"] = "NORMAL";
    GemLevel["FLAWLESS"] = "FLAWLESS";
    GemLevel["PERFECT"] = "PERFECT";
    GemLevel["GREAT"] = "GREAT";
})(GemLevel || (GemLevel = {}));
var GemSubType;
(function (GemSubType) {
    GemSubType["BASIC"] = "BASIC";
    GemSubType["SLATE"] = "SLATE";
    GemSubType["SPECIAL"] = "SPECIAL";
})(GemSubType || (GemSubType = {}));
$(function () {
    var tableContent = $("#table-content");
    $.getJSON("gems.json")
        .done(function (data) {
        tableContent.empty();
        for (var i = 0; i < data.gems.types.length; i++) {
            var type = data.gems.types[i];
            var url = type.type;
            switch (type.subType) {
                case GemSubType.BASIC: {
                    url += "_" + GemLevel.NORMAL;
                    break;
                }
                case GemSubType.SLATE: {
                    url += "_" + GemSubType.SLATE;
                    break;
                }
                case GemSubType.SPECIAL: {
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
