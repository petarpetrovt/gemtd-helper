import "../styles/site.css";
import * as v154 from "../data/v1.5.4/types";
import { type } from "os";

export {
	v154
}

export interface IHomeItemViewModel {
	type: string;
	subType: string;
	url: string;
}

export class HomeViewModel {
	data: v154.GemsJSON;

	items: KnockoutObservableArray<IHomeItemViewModel>

	searchValue: KnockoutObservable<string>;

	subTypeValue: KnockoutObservable<v154.GemSubType>;

	public constructor(data: v154.GemsJSON) {
		this.data = data;
		this.items = ko.observableArray([]);
		this.subTypeValue = ko.observable(<v154.GemSubType>null);
		this.searchValue = ko.observable("");
		this.searchValue.subscribe(() => {
			this.ensureItems();
		});

		this.ensureItems();
	}

	public onFilterSubTypeClicked(subType: v154.GemSubType = null): void {
		this.subTypeValue(subType);
		this.ensureItems();
	}

	private filterItems(): v154.GemTypeObj[] {
		let types: v154.GemTypeObj[] = this.data.gems.types;

		if (this.subTypeValue()) {
			types = types.filter(x => x.subType == this.subTypeValue());
		}

		if (this.searchValue()) {
			types = types.filter(x => {
				const value: string = this.searchValue().toLowerCase();
				let index: number = -1;

				index = x.name.toLowerCase().indexOf(value);
				if (index >= 0) {
					return true;
				}

				return false;
			});
		}

		return types;
	}

	private ensureItems(): void {
		const subTypes: v154.GemSubTypeObj[] = this.data.gems.subTypes;
		const types: v154.GemTypeObj[] = this.filterItems();
		const items: IHomeItemViewModel[] = [];

		for (const type of types) {
			const item: IHomeItemViewModel = this.convert(type, subTypes);

			items.push(item);
		}

		this.items.removeAll();
		this.items.push(...items);
	}

	private convert(type: v154.GemTypeObj, subTypes: v154.GemSubTypeObj[]): IHomeItemViewModel {
		const subType: v154.GemSubTypeObj = subTypes.filter(x => x.type === type.subType)[0];
		let url: string = type.type;

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

		const result: IHomeItemViewModel = {
			type: type.name,
			subType: subType.name,
			url: `/data/${v154.DataImagesPath}/${url}.png`
		};

		return result;
	}
}

$(function () {
	$.getJSON(`/data/${v154.DataJSONPath}`)
		.done(function (data: v154.GemsJSON) {
			ko.applyBindings(new HomeViewModel(data));
		});
});