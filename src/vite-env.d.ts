/// <reference types="vite/client" />

declare module '*.PNG' {
  const src: string
  export default src
}

declare module '*.JPG' {
  const src: string
  export default src
}

interface ImportMetaEnv {
  readonly VITE_ACCESS_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
