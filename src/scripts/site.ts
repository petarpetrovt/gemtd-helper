import "../styles/site.css";
import * as v154 from "../data/v1.5.4/types";

export {
	v154
}

export interface IHomeItemViewModel {
	type: string;
	name: string;
	subType: string;
	url: string;
	isSelected: boolean;
}

export interface IHomeItemRequirementViewModel {
	type: string;
	name: string;
	subType: string;
	url: string;
	level: string;
}

export class HomeViewModel {
	data: v154.GemsJSON;

	items: KnockoutObservableArray<IHomeItemViewModel>;

	requirements: KnockoutObservableArray<IHomeItemRequirementViewModel>;

	searchValue: KnockoutObservable<string>;

	subTypeValue: KnockoutObservable<v154.GemSubType>;

	selectedItemValue: KnockoutObservable<IHomeItemViewModel>;

	public constructor(data: v154.GemsJSON) {
		this.data = data;
		this.items = ko.observableArray([]);
		this.requirements = ko.observableArray([]);
		this.subTypeValue = ko.observable(<v154.GemSubType>null);
		this.selectedItemValue = ko.observable(<IHomeItemViewModel>null);
		this.selectedItemValue.subscribe(() => {
			this.ensureRequirements();
		});
		this.searchValue = ko.observable("");
		this.searchValue.subscribe(() => {
			this.ensureItems();
		});

		this.ensureItems();
	}

	public onItemClicked(item: IHomeItemViewModel, event: Event): void {
		const selected: IHomeItemViewModel = this.selectedItemValue();

		if (selected && selected.type === item.type) {
			this.selectedItemValue(null);
		} else {
			this.selectedItemValue(item);
		}

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
		const types: v154.GemTypeObj[] = this.filterItems();
		const items: IHomeItemViewModel[] = [];

		for (const type of types) {
			const item: IHomeItemViewModel = this.convert(type);

			items.push(item);
		}

		this.items.removeAll();
		this.items.push(...items);
	}

	private ensureRequirements(): void {
		this.requirements.removeAll();

		const selected: IHomeItemViewModel = this.selectedItemValue();
		if (selected === null) {
			return;
		}

		const items: IHomeItemRequirementViewModel[] = [];

		const selectedType: v154.GemTypeObj = this.data.gems.types.filter(x => x.type === selected.type)[0];
		if (selectedType.requirements) {
			for (const requirement of selectedType.requirements) {
				const type: v154.GemTypeObj = this.data.gems.types.filter(x => x.type === requirement.type)[0];
				const item: IHomeItemRequirementViewModel = this.convertRequirement(type, requirement);

				items.push(item);
			}
		}

		this.requirements.push(...items);
	}

	private convert(type: v154.GemTypeObj): IHomeItemViewModel {
		const subType: v154.GemSubTypeObj = this.data.gems.subTypes.filter(x => x.type === type.subType)[0];
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

		const selectedItemType: string = this.selectedItemValue()
			? this.selectedItemValue().type
			: null;

		const result: IHomeItemViewModel = {
			name: type.name,
			type: type.type,
			subType: subType.name,
			url: `/data/${v154.DataImagesPath}/${url}.png`,
			isSelected: selectedItemType === type.type
		};

		return result;
	}

	private convertRequirement(type: v154.GemTypeObj, requirement: v154.GemRequirement): IHomeItemRequirementViewModel {
		const subType: v154.GemSubTypeObj = this.data.gems.subTypes.filter(x => x.type === type.subType)[0];
		const level: v154.GemLevelObj = this.data.gems.levels.filter(x => x.type === requirement.level)[0];
		let url: string = type.type;

		switch (type.subType) {
			case v154.GemSubType.BASIC: {
				url += `_${level.type}`;
				break;
			}
			case v154.GemSubType.SLATE: {
				url += `_${v154.GemSubType.SLATE}`;
				break;
			}
		}

		const result: IHomeItemRequirementViewModel = {
			name: type.name,
			type: type.type,
			subType: subType.name,
			url: `/data/${v154.DataImagesPath}/${url}.png`,
			level: level ? level.name : "-"
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