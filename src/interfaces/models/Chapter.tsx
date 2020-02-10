/**
 * Chapter interface that contains image, audio loc, duration 
 * and all audio info for the current chapter
 */

export interface Chapter {
	ISBN: number,
	TITLE: string,
	CHAPTER: number,
	AUDIO_LOC: string,
	PHOTO_LOC: string,
	DURATION: number
}
