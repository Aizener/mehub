/** 歌单项：title、src 必填；vtt 为可选字幕（WebVTT），填上后显示歌词。LRC 等需自行转为 WebVTT */
export type AudioPlaylistItem = { title: string; src: string; vtt?: string };

export const AUDIO_PLAYLIST: AudioPlaylistItem[] = [
  {
    title: '九万字-黄诗扶',
    src: 'https://bclrdurhfcngbotyjqke.supabase.co/storage/v1/object/public/blog/jiuwanzi-huangshifu.mp3',
    vtt: 'https://bclrdurhfcngbotyjqke.supabase.co/storage/v1/object/public/blog/jiuwanzi-huangshifu.vtt',
  },
  {
    title: '谁-曲肖冰',
    src: 'https://bclrdurhfcngbotyjqke.supabase.co/storage/v1/object/public/blog/shui-quxiaobing.mp3',
    vtt: 'https://bclrdurhfcngbotyjqke.supabase.co/storage/v1/object/public/blog/shui-quxiaobing.vtt',
  },
  {
    title: '忘了(×0.9)-周林枫',
    src: 'https://bclrdurhfcngbotyjqke.supabase.co/storage/v1/object/public/blog/wangle-x0.9-zhoulinfeng.mp3',
    vtt: 'https://bclrdurhfcngbotyjqke.supabase.co/storage/v1/object/public/blog/wangle-x0.9-zhoulinfeng.vtt',
  },
];
