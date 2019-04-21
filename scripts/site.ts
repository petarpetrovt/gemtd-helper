import "../styles/site.css";
import * as v154 from "../data/v1.5.4/types";

export {
	v154
}

export interface IHomeItemTypeViewModel {
	type: string;
	typeName: string;
	subType: v154.GemSubType;
	subTypeName: string;
	url: string;
	isSelected: boolean;
}

export interface IHomeItemRequirementViewModel {
	type: string;
	typeName: string;
	subType: v154.GemSubType;
	subTypeName: string;
	level: string;
	levelName: string;
	url: string;
	isSeparator: boolean;
}

export class HomeViewModel {
	data: v154.GemsJSON;

	items: KnockoutObservableArray<IHomeItemTypeViewModel>;

	requirements: KnockoutObservableArray<IHomeItemRequirementViewModel>;

	searchValue: KnockoutObservable<string>;

	subTypeValue: KnockoutObservable<v154.GemSubType>;

	levelValue: KnockoutObservable<v154.GemLevel>;

	selectedItemValue: KnockoutObservable<IHomeItemTypeViewModel>;

	selectedItemValueTitle: KnockoutComputed<string>;

	levelVisible: KnockoutComputed<boolean>;

	versionTitle: KnockoutComputed<string>;

	repositoryUrl: KnockoutComputed<string>;

	versionUrl: KnockoutComputed<string>;

	dataTitle: KnockoutComputed<string>;

	public constructor(data: v154.GemsJSON) {
		this.data = data;
		this.items = ko.observableArray([]);
		this.requirements = ko.observableArray([]);
		this.subTypeValue = ko.observable(<v154.GemSubType>null);
		this.levelValue = ko.observable(v154.GemLevel.NORMAL);
		this.selectedItemValue = ko.observable(<IHomeItemTypeViewModel>null);
		this.selectedItemValue.subscribe(() => {
			this.ensureRequirements();
		});
		this.selectedItemValueTitle = ko.pureComputed(() => {
			const selected: IHomeItemTypeViewModel = this.selectedItemValue();

			let result: string = "Requirements";

			if (selected) {
				if (selected.subType == v154.GemSubType.BASIC) {
					//const levelValue: v154.GemLevel = this.levelValue();
					//const level: v154.GemLevelObj = this.data.gems.levels.filter(x => x.type === levelValue)[0];

					//result = `Requirements for ${level.name} ${selected.typeName}`;
					result = `Requirements for ${selected.typeName}`;
				} else {
					result = `Requirements for ${selected.typeName}`;
				}
			}

			return result;
		});
		this.levelVisible = ko.pureComputed(() => this.selectedItemValue() && this.selectedItemValue().subType === v154.GemSubType.BASIC);
		this.searchValue = ko.observable("");
		this.searchValue.subscribe(() => {
			this.ensureItems();
		});
		this.versionTitle = ko.pureComputed(() => `v${this.data.version}`);
		this.repositoryUrl = ko.pureComputed(() => this.data.repositoryUrl);
		this.versionUrl = ko.pureComputed(() => this.data.versionUrl);
		this.dataTitle = ko.pureComputed(() => this.data.title);

		this.ensureItems();
	}

	public onItemClicked(item: IHomeItemTypeViewModel, event: Event): void {
		const selected: IHomeItemTypeViewModel = this.selectedItemValue();

		if (selected && selected.type === item.type) {
			this.selectedItemValue(null);
		} else {
			this.selectedItemValue(item);
		}

		this.ensureItems();
	}

	public onFilterLevelClicked(level: v154.GemLevel): void {
		this.levelValue(level);
		this.ensureRequirements();
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
		const items: IHomeItemTypeViewModel[] = [];

		for (const type of types) {
			// if (this.subTypeValue() == v154.GemSubType.BASIC) {
			// 	// TODO: append all levels

			// 	const levels: v154.GemLevelObj[] = this.data.gems.levels;
			// 	const newTypes: v154.GemTypeObj[] = [];

			// 	for (const type of types) {

			// 	}

			// 	types.push(...newTypes);
			// }

			const item: IHomeItemTypeViewModel = this.convert(type);

			items.push(item);
		}

		this.items.removeAll();
		this.items.push(...items);
	}

	private ensureRequirements(): void {
		this.requirements.removeAll();

		const selected: IHomeItemTypeViewModel = this.selectedItemValue();
		if (selected === null) {
			return;
		}

		const separator: IHomeItemRequirementViewModel = {
			levelName: null,
			subTypeName: null,
			typeName: null,
			level: null,
			subType: null,
			type: null,
			url: null,
			isSeparator: true
		};
		const items: IHomeItemRequirementViewModel[] = [];
		const selectedType: v154.GemTypeObj = this.data.gems.types.filter(x => x.type === selected.type)[0];

		if (selectedType.requirements) {
			for (const requirement of selectedType.requirements) {
				const type: v154.GemTypeObj = this.data.gems.types.filter(x => x.type === requirement.type)[0];
				const item: IHomeItemRequirementViewModel = this.convertRequirement(type, requirement.level);

				items.push(item);
			}
		} else if (selectedType.subType === v154.GemSubType.BASIC) {
			const levelValue: v154.GemLevel = this.levelValue();

			switch (levelValue) {
				case v154.GemLevel.CHIPPED:
					{
						break;
					}
				case v154.GemLevel.FLAWED:
					{
						const item1: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.CHIPPED);
						const item2: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.CHIPPED);

						items.push(...[item1, item2]);
						break;
					}
				case v154.GemLevel.NORMAL:
					{
						const item1: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.FLAWED);
						const item2: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.FLAWED);

						const item11: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.CHIPPED);
						const item22: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.CHIPPED);
						const item33: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.CHIPPED);

						items.push(...[item1, item2, separator, item11, item22, item33]);
						break;
					}
				case v154.GemLevel.FLAWLESS:
					{
						const item1: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.NORMAL);
						const item2: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.NORMAL);

						const item11: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.FLAWED);
						const item22: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.FLAWED);
						const item33: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.FLAWED);

						const item111: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.CHIPPED);
						const item222: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.CHIPPED);
						const item333: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.CHIPPED);
						const item444: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.CHIPPED);

						items.push(...[item1, item2, separator, item11, item22, item33, separator, item111, item222, item333, item444]);
						break;
					}
				case v154.GemLevel.PERFECT:
					{
						const item1: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.FLAWLESS);
						const item2: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.FLAWLESS);

						const item11: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.NORMAL);
						const item22: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.NORMAL);
						const item33: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.NORMAL);

						const item111: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.FLAWED);
						const item222: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.FLAWED);
						const item333: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.FLAWED);
						const item444: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.FLAWED);

						const item1111: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.CHIPPED);
						const item2222: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.CHIPPED);
						const item3333: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.CHIPPED);
						const item4444: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.CHIPPED);
						const item5555: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.CHIPPED);

						items.push(...[
							item1, item2,
							separator,
							item11, item22, item33,
							separator,
							item111, item222, item333, item444,
							separator,
							item1111, item2222, item3333, item4444, item5555
						]);
						break;
					}
				case v154.GemLevel.GREAT:
					{
						const item1: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.PERFECT);
						const item2: IHomeItemRequirementViewModel = this.convertRequirement(selectedType, v154.GemLevel.PERFECT);

						items.push(...[item1, item2, separator]);
						break;
					}
			}

		}

		this.requirements.push(...items);
	}

	private convert(type: v154.GemTypeObj, level: v154.GemLevel = v154.GemLevel.NORMAL): IHomeItemTypeViewModel {
		const subType: v154.GemSubTypeObj = this.data.gems.subTypes.filter(x => x.type === type.subType)[0];
		let url: string = type.type;

		switch (type.subType) {
			case v154.GemSubType.BASIC: {
				url += `_${level}`;
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

		const result: IHomeItemTypeViewModel = {
			type: type.type,
			typeName: type.name,
			subType: subType.type,
			subTypeName: subType.name,
			url: `data/${v154.DataImagesPath}/${url}.png`,
			isSelected: selectedItemType === type.type
		};

		return result;
	}

	private convertRequirement(type: v154.GemTypeObj, levelValue: v154.GemLevel): IHomeItemRequirementViewModel {
		const subType: v154.GemSubTypeObj = this.data.gems.subTypes.filter(x => x.type === type.subType)[0];
		const level: v154.GemLevelObj = this.data.gems.levels.filter(x => x.type === levelValue)[0];
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
			type: type.type,
			typeName: type.name,
			subType: subType.type,
			subTypeName: subType.name,
			level: level ? level.type : "-",
			levelName: level ? level.name : "-",
			url: `data/${v154.DataImagesPath}/${url}.png`,
			isSeparator: false
		};

		return result;
	}
}

$(function () {
	$.getJSON(`data/${v154.DataJSONPath}`)
		.done(function (data: v154.GemsJSON) {
			ko.applyBindings(new HomeViewModel(data));
		});
});