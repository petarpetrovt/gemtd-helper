import { GemLevelObj } from "./GemLevelObj";
import { GemSubTypeObj } from "./GemSubTypeObj";
import { GemTypeObj } from "./GemTypeObj";

export interface Gems {
	levels: GemLevelObj[];
	subTypes: GemSubTypeObj[];
	types: GemTypeObj[];
}
