export const DataJSONPath: string = "v1.5.4/data.json";
export const ImagesPath: string = "v1.5.4/images";

export enum GemLevel {
	CHIPPED = "CHIPPED",
	FLAWED = "FLAWED",
	NORMAL = "NORMAL",
	FLAWLESS = "FLAWLESS",
	PERFECT = "PERFECT",
	GREAT = "GREAT"
}

export enum GemSubType {
	BASIC = "BASIC",
	SLATE = "SLATE",
	SPECIAL = "SPECIAL"
}

export interface GemLevelObj {
	value: number;
	type: GemLevel;
	name: string;
}

export interface GemRequirement {
	type: string;
	level: GemLevel;
}

export interface GemSubTypeObj {
	type: GemSubType;
	name: string;
}

export interface GemTypeObj {
	type: string;
	subType: GemSubType;
	name: String;
	requirements: GemRequirement;
}

export interface Gems {
	levels: GemLevelObj[];
	subTypes: GemSubTypeObj[];
	types: GemTypeObj[];
}

export interface GemsJSON {
	title: string;
	version: string;
	gems: Gems;
}