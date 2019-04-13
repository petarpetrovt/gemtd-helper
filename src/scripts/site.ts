import * as v154 from "../data/v1.5.4";

export interface IHomeItemViewModel {
	type: string;
	subType: string;
	url: string;
}

export class HomeViewModel {
	items: KnockoutObservable<IHomeItemViewModel[]>

	constructor(items: IHomeItemViewModel[]) {
		this.items = ko.observable(items);
	}
}

$(function () {
	$.getJSON(`/data/${v154.DataJSONPath}`)
		.done(function (data: v154.GemsJSON) {
			const items: IHomeItemViewModel[] = [];

			for (var i = 0; i < data.gems.types.length; i++) {
				var type = data.gems.types[i];
				var subType = data.gems.subTypes.filter(x => x.type === type.subType)[0];
				var url = type.type;

				switch (type.subType) {
					case v154.GemSubType.BASIC: {
						url += `_${v154.GemLevel.NORMAL}`;
						break;
					}
					case v154.GemSubType.SLATE: {
						url += `_${v154.GemSubType.SLATE}`;
						break;
					}
					case v154.GemSubType.SPECIAL: {
						break;
					}
				}

				const item: IHomeItemViewModel = {
					type: type.name,
					subType: subType.name,
					url: `/data/${v154.ImagesPath}/${url}.png`
				};

				items.push(item);
			}

			ko.applyBindings(new HomeViewModel(items));
		});
});