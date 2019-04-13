import { GemSubType } from "./GemSubType";
import { GemRequirement } from "./GemRequirement";

export interface GemTypeObj {
	type: string;
	subType: GemSubType;
	name: string;
	requirements: GemRequirement;
}
