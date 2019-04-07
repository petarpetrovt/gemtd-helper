import { GemSubTypeObj } from "./GemSubTypeObj";
import { GemTypeObj } from "./GemTypeObj";
import { GemLevelObj } from "./GemLevelObj";

export interface Gems {
    levels: GemLevelObj[];
    subTypes: GemSubTypeObj[];
    types: GemTypeObj[];
}
