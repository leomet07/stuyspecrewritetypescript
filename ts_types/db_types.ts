import { ObjectId } from "mongodb";
export interface RecievedArticle {
	_id: ObjectId | string;
	text: string;
  title: string;
  contributors: Array<string>;
	slug: string;
	volume: Number;
	issue: Number;
	section: string;
	summary: string;
  cover_image: string;
  cover_image_contributor: string;
  is_published: boolean;
}
