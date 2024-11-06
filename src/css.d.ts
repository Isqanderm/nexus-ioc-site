declare module '*.module.css' {
  const styles: {
    [key: string]: string;
    readonly [key: `${string}__${string}`]: string;
  };
  export = styles;
}

declare module '*.css' {
  const css: string;
  export default css;
}
