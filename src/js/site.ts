enum GemLevel {
    CHIPPED = "CHIPPED",
    FLAWED = "FLAWED",
    NORMAL = "NORMAL",
    FLAWLESS = "FLAWLESS",
    PERFECT = "PERFECT",
    GREAT = "GREAT"
}

interface GemLevelObj {
    value: number;
    type: GemLevel;
    name: string;
}

enum GemSubType {
    BASIC = "BASIC",
    SLATE = "SLATE",
    SPECIAL = "SPECIAL"
}

interface GemSubTypeObj {
    type: GemSubType;
    name: string;
}

interface GemRequirement {
    type: string;
    level: GemLevel;
}

interface GemTypeObj {
    type: string;
    subType: GemSubType;
    name: String;
    requirements: GemRequirement;
}

interface Gems {
    levels: GemLevelObj[];
    subTypes: GemSubTypeObj[];
    types: GemTypeObj[];
}

interface GemsJSON {
    title: string;
    gems: Gems;
}

$(function () {
    var tableContent = $("#table-content");

    $.getJSON("gems.json")
        .done(function (data: GemsJSON) {
            tableContent.empty();

            for (var i = 0; i < data.gems.types.length; i++) {
                var type = data.gems.types[i];
                var url = type.type;

                switch (type.subType) {
                    case GemSubType.BASIC: {
                        url += `_${GemLevel.NORMAL}`;
                        break;
                    }
                    case GemSubType.SLATE: {
                        url += `_${GemSubType.SLATE}`;
                        break;
                    }
                    case GemSubType.SPECIAL: {
                        break;
                    }
                }

                var subType = data.gems.subTypes.filter(x => x.type === type.subType)[0];

                var tr = $("<tr />");
                var td0 = $(`<td><img style='max-width: 50px;' src='gems/${url}.png' /></td>`);
                var td1 = $("<td>" + type.name + "</td>");
                var td2 = $("<td>" + subType.name + "</td>");

                td0.appendTo(tr);
                td1.appendTo(tr);
                td2.appendTo(tr);
                tr.appendTo(tableContent);
            }
        });
});