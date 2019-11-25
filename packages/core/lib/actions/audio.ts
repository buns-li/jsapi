import { wrap, notifyHost } from "../api";

enum EAudio {
	startRecord = "audio.startRecord",
	playVoice = "audio.playVoice"
}

export function initAudio(): void {
	wrap(EAudio.startRecord, () => notifyHost(EAudio.startRecord, {}));
	wrap(EAudio.playVoice, (voiceText?: string, cb?: Function) =>
		notifyHost(EAudio.playVoice, { text: voiceText || "" }, cb)
	);
}

export interface AudioApi {
	/**
	 * 开启音频录制
	 *
	 */
	startRecord(): void;
	/**
	 * 播放语音接口
	 *
	 * @param {string} [voiceText] 待播放的音频文本
	 */
	playVoice(voiceText?: string, cb?: Function): void;
}
