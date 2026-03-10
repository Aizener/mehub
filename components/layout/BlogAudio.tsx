'use client';

import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { Disc3, Menu } from 'lucide-react';
import type Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { AUDIO_PLAYLIST } from '@/config/audio';
import { cn } from '@/lib/utils';

const PLAYLIST = AUDIO_PLAYLIST;

/** 根据 audio 当前播放的 src 反推在 PLAYLIST 中的下标（统一用 pathname 比较，兼容完整 URL） */
function getIndexFromSource(el: HTMLAudioElement | null): number {
  if (!el?.currentSrc && !el?.src) return -1;
  const url = (el.currentSrc || el.src) as string;
  const path = url.startsWith('http') ? new URL(url).pathname : url;
  const idx = PLAYLIST.findIndex((item) => {
    const itemPath = item.src.startsWith('http') ? new URL(item.src).pathname : item.src;
    return path === itemPath || path.endsWith(itemPath) || itemPath.endsWith(path);
  });
  return idx >= 0 ? idx : -1;
}

/** 底部播放条：音频 + 歌词（PC 当前/下一句，手机当前句）+ 播放列表 */
const MyAudio = ({
  showAudio,
  showPlaylist,
  onPlayingChange,
  onShowPlaylistChange,
  audioBarRef,
}: {
  showAudio: boolean;
  showPlaylist: boolean;
  onPlayingChange?: (playing: boolean) => void;
  onShowPlaylistChange: (show: boolean) => void;
  audioBarRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<Plyr | null>(null);
  const onPlayingChangeRef = useRef(onPlayingChange);
  const [playingIndex, setPlayingIndex] = useState(0);
  /** 当前歌全部歌词行（来自 WebVTT cues），用于取上一行/当前行/下一行 */
  const [lyricsLines, setLyricsLines] = useState<
    { startTime: number; endTime: number; text: string }[]
  >([]);
  /** 当前播放到的歌词行下标，-1 表示无 */
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState(-1);
  /** PC 为 true 显示 3 行歌词，手机为 false 只显示 1 行（当前行） */
  const [isDesktop, setIsDesktop] = useState(true);

  onPlayingChangeRef.current = onPlayingChange;

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);
    const fn = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  /** PC 两句（当前/下一句），手机一句（当前）；isCurrent 用于高亮 */
  const lyricsToShow = useMemo(() => {
    if (isDesktop) {
      return [
        { text: lyricsLines[currentCaptionIndex]?.text ?? '', isCurrent: currentCaptionIndex >= 0 },
        { text: lyricsLines[currentCaptionIndex + 1]?.text ?? '', isCurrent: false },
      ];
    }
    return [
      { text: lyricsLines[currentCaptionIndex]?.text ?? '', isCurrent: currentCaptionIndex >= 0 },
    ];
  }, [isDesktop, lyricsLines, currentCaptionIndex]);

  /** 切歌：设 src、插入 track（有 vtt 时）、canplay 后播放；歌词在 track load 里解析并同步 */
  const playAduio = (index: number) => {
    const item = PLAYLIST[index];
    if (!item) return;
    const player = playerRef.current;
    const el = audioRef.current;
    setLyricsLines([]);
    setCurrentCaptionIndex(-1);
    if (player && el) {
      // Plyr 换源后 ready 不触发，故直接操作底层 <audio>：设 src，canplay 时再 play
      el.addEventListener('canplay', () => player.play()?.catch(() => {}), { once: true });

      el.src = item.src;
      el.querySelectorAll('track').forEach((t) => t.remove());
      if (item.vtt) {
        const trackEl = document.createElement('track');
        trackEl.kind = 'captions';
        trackEl.label = '歌词';
        trackEl.srclang = 'zh';
        trackEl.src = item.vtt;
        trackEl.default = true;
        el.appendChild(trackEl);
        trackEl.addEventListener('load', () => {
          const t = trackEl.track;
          if (!t?.cues) return;
          t.mode = 'showing';
          const lines: { startTime: number; endTime: number; text: string }[] = [];
          for (let i = 0; i < t.cues.length; i++) {
            const c = t.cues[i] as VTTCue;
            lines.push({ startTime: c.startTime, endTime: c.endTime, text: c.text });
          }
          setLyricsLines(lines);
          t.oncuechange = () => {
            const cues = t.activeCues;
            if (!cues?.length) {
              setCurrentCaptionIndex(-1);
              return;
            }
            const first = cues[0] as VTTCue;
            const idx = lines.findIndex((l) => Math.abs(l.startTime - first.startTime) < 0.01);
            setCurrentCaptionIndex(idx >= 0 ? idx : -1);
          };
        });
      }
    } else if (el) {
      el.src = item.src;
      el.play();
    }
    setPlayingIndex(index);
  };

  /** 根据 audio 当前 src 同步播放列表高亮下标 */
  const syncIndexFromSource = () => {
    const idx = getIndexFromSource(audioRef.current);
    if (idx >= 0) setPlayingIndex(idx);
  };

  /** 挂载时动态加载 Plyr、绑定事件；卸载时销毁 */
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    import('plyr').then(({ default: Plyr }) => {
      playerRef.current = new Plyr(el, {
        captions: { active: true, update: true },
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'duration',
          'mute',
          'volume',
          'captions',
          'settings',
        ],
      });
      playAduio(0);
      const player = playerRef.current;
      const notify = () => onPlayingChangeRef.current?.(true);
      const notifyPaused = () => onPlayingChangeRef.current?.(false);
      player.on('loadedmetadata', syncIndexFromSource);
      player.on('playing', () => {
        syncIndexFromSource();
        notify();
      });
      player.on('pause', notifyPaused);
      player.on('ended', () => {
        const current = getIndexFromSource(audioRef.current);
        console.log('ended...', current);
        if (current >= 0 && current < PLAYLIST.length - 1) {
          playAduio(current + 1);
        } else if (current === PLAYLIST.length - 1) {
          playAduio(0);
        }
      });
    });

    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  return (
    <motion.div
      ref={audioBarRef}
      className="fixed bottom-0 left-0 z-90 flex w-full flex-col border-t border-gray-200 bg-white"
      initial={false}
      animate={{
        y: showAudio ? 0 : '100%',
        opacity: showAudio ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* 有歌词才显示：PC 三行（上一行/当前行/下一行），手机仅当前行 */}
      {lyricsLines.length > 0 && (
        <div className="flex min-h-6 shrink-0 items-center justify-start border-b border-dashed border-gray-200 py-2">
          {lyricsToShow.map((line, i) =>
            line.text.trim().length > 0 ? (
              <div
                key={i}
                className={cn(
                  'px-4 py-0.5 text-center text-sm transition-colors',
                  line.isCurrent ? 'font-semibold text-purple-600' : 'text-gray-500'
                )}
              >
                {line.text}
              </div>
            ) : (
              ''
            )
          )}
        </div>
      )}
      <div className="flex h-16 flex-1 items-center">
        <audio ref={audioRef} controls className="flex-1 shrink-0"></audio>
        <div className="flex h-full shrink-0 items-center px-4">
          <div
            className="cursor-pointer rounded-md p-0 text-gray-700 hover:bg-gray-100 md:p-2"
            onClick={() => onShowPlaylistChange(!showPlaylist)}
          >
            <Menu />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showPlaylist && (
          <motion.ul
            key="playlist"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'absolute right-0 bottom-13 w-96 max-w-full origin-bottom overflow-hidden rounded-tl-md rounded-tr-md border border-gray-200 bg-white'
            )}
          >
            {PLAYLIST.map((item, index) => (
              <li
                key={item.title}
                className={cn(
                  'cursor-pointer border-b border-dashed border-gray-200 p-2 text-gray-700 hover:bg-purple-500 hover:text-white',
                  playingIndex === index && 'bg-purple-500 text-white',
                  index === PLAYLIST.length - 1 && 'border-b-0'
                )}
                onClick={() => playAduio(index)}
              >
                {item.title}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/** 页面右下角浮动唱片按钮：点击展开/收起底部播放条，可拖拽；播放时唱片旋转 */
export default function BlogAudio() {
  const [showAudio, setShowAudio] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const audioBarRef = useRef<HTMLDivElement | null>(null);
  const discButtonRef = useRef<HTMLDivElement | null>(null);

  /** 点击/触摸屏幕其他地方：有播放列表时先关闭列表，否则关闭音乐栏（pointerdown 兼容鼠标与触摸） */
  useEffect(() => {
    if (!showAudio || !mounted) return;
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (discButtonRef.current?.contains(target) || audioBarRef.current?.contains(target)) {
        return;
      }
      if (showPlaylist) {
        setShowPlaylist(false);
      } else {
        setShowAudio(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [showAudio, showPlaylist, mounted]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const didDragRef = useRef(false);

  return (
    <>
      <motion.div
        ref={discButtonRef}
        drag="y"
        dragMomentum={false}
        dragElastic={0}
        style={{ x, y }}
        onDragStart={(e: MouseEvent | TouchEvent | PointerEvent) => {
          // 桌面端拖拽后易误触点击，用标记跳过下一次 click；移动端不标记以保留点击
          if ('pointerType' in e && e.pointerType === 'mouse') didDragRef.current = true;
        }}
        data-lenis-prevent
        className={cn(
          'fixed right-4 bottom-12 z-100 cursor-pointer rounded-md bg-gray-100 p-3 shadow-md hover:bg-gray-200 hover:shadow-lg active:translate-y-px active:shadow-sm md:right-6 md:bottom-16'
        )}
        onClick={(evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          if (didDragRef.current) {
            didDragRef.current = false;
            return;
          }
          const next = !showAudio;
          if (!next) setShowPlaylist(false);
          setShowAudio(next);
        }}
      >
        <Disc3
          className={cn(
            'text-gray-700 transition-colors',
            playing && 'animate-[spin_2s_linear_infinite] text-purple-400'
          )}
        />
      </motion.div>
      {mounted &&
        createPortal(
          <MyAudio
            showAudio={showAudio}
            showPlaylist={showPlaylist}
            onPlayingChange={setPlaying}
            onShowPlaylistChange={setShowPlaylist}
            audioBarRef={audioBarRef}
          />,
          document.body
        )}
    </>
  );
}
