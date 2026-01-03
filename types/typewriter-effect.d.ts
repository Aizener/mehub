declare module 'typewriter-effect' {
  import * as React from 'react';

  export interface TypewriterOptions {
    strings?: string[];
    autoStart?: boolean;
    loop?: boolean;
    delay?: number;
    deleteSpeed?: number;
    pauseFor?: number;
    cursor?: string;
  }

  interface TypewriterProps {
    options?: TypewriterOptions;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onInit?: (typewriter: any) => void;
  }

  const Typewriter: React.FC<TypewriterProps>;
  export default Typewriter;
}

/* 🔥 关键：补子路径 */
declare module 'typewriter-effect/dist/core' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TypewriterCore: any;
  export default TypewriterCore;
}
