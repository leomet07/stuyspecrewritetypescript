import { ObjectId } from "mongodb";

export type mongoObjectId = ObjectId | string;
export interface ReceivedArticle {
	_id: mongoObjectId;
	text: string;
	title: string;
	slug: string;
	contributors: ReceivedStaff[];
	volume: number;
	issue: number;
	section_id: number;
	summary: string;
	cover_image: string;
	cover_image_summary: string;
	cover_image_contributor: ReceivedStaff[];
	cover_image_source: string;
	sub_section: string | undefined;
	rank: number | undefined;
	publicationDate: string;
}

export interface ReceivedStaff {
	_id: mongoObjectId;
	name: string;
	email: string;
	position: string;
	role: string;
	description: string;
	pfp_url: string;
	years: number[];
	slug: string;
	first_time_login: boolean | undefined;
}

export interface ReceivedArticleExtra {
	_id: mongoObjectId;
	article: mongoObjectId;
	contributors: ReceivedStaff[];
	type: string;
	index: number;
	image_src: string;
}

export type Department =
	| "news"
	| "features"
	| "opinions"
	| "science"
	| "humor"
	| "sports"
	| "ae"
	| "media"
	| "spec-plus";

export const DepartmentsArray = [
	"news",
	"features",
	"opinions",
	"science",
	"humor",
	"sports",
	"ae",
	"media",
	"spec-plus",
];

export const DepartmentsArrayDisplay = [
	"News",
	"Features",
	"Opinions",
	"Science",
	"Humor",
	"Sports",
	"Arts and Entertainment",
	"Media",
	"Spec+",
];
