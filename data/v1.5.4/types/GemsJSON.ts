import { Gems } from "./Gems";

export interface GemsJSON {
	title: string;
	version: string;
	repositoryUrl: string;
	versionUrl: string;
	gems: Gems;
}
