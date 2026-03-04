declare module 'nprogress' {
  interface NProgressOptions {
    minimum?: number;
    easing?: string;
    speed?: number;
    trickle?: boolean;
    trickleRate?: number;
    trickleSpeed?: number;
    showSpinner?: boolean;
    parent?: string;
  }

  interface NProgress {
    set(n: number): NProgress;
    start(): NProgress;
    done(force?: boolean): NProgress;
    inc(amount?: number): NProgress;
    configure(options: NProgressOptions): NProgress;
    remove(): void;
  }

  const nprogress: NProgress;
  export default nprogress;
}
