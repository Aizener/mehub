/** 歌单项：title、src 必填；vtt 为可选字幕（WebVTT），填上后显示歌词。LRC 等需自行转为 WebVTT */
export type AudioPlaylistItem = { title: string; src: string; vtt?: string };

export const AUDIO_PLAYLIST: AudioPlaylistItem[] = [
  {
    title: 'Always Online',
    src: 'https://bclrdurhfcngbotyjqke.supabase.co/storage/v1/object/public/blog/Always%20Online.mp3',
    vtt: '/audio/always-online.vtt',
  },
  {
    title: '九万字',
    src: 'https://bclrdurhfcngbotyjqke.supabase.co/storage/v1/object/public/blog/jiuwanzi.mp3',
    vtt: '/audio/jiuwanzi.vtt',
  },
  {
    title: '起风了',
    src: 'https://bclrdurhfcngbotyjqke.supabase.co/storage/v1/object/public/blog/qifengle.mp3',
    vtt: '/audio/qifengle.vtt',
  },
  {
    title: '稻香',
    src: 'https://bclrdurhfcngbotyjqke.supabase.co/storage/v1/object/public/blog/daoxiang.mp3',
    vtt: '/audio/daoxiang.vtt',
  },
  {
    title: '童话镇',
    src: 'https://bclrdurhfcngbotyjqke.supabase.co/storage/v1/object/public/blog/tonghuazhen.mp3',
    vtt: '/audio/tonghuazhen.vtt',
  },
  {
    title: '离开我的依赖',
    src: 'https://bclrdurhfcngbotyjqke.supabase.co/storage/v1/object/public/blog/likaiwodeyilai.mp3',
    vtt: '/audio/likaiwodeyilai.vtt',
  },
  {
    title: '我走后',
    src: 'https://bclrdurhfcngbotyjqke.supabase.co/storage/v1/object/public/blog/wozouhou.mp3',
    vtt: '/audio/wozouhou.vtt',
  },
];
