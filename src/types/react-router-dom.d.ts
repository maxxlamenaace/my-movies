import 'react-router-dom';

declare module 'react-router-dom' {
  export function useParams<Key extends string = string>(): Readonly<Params<Key>>;
  export function useParams<
    P extends Record<string, string | undefined> = {
      [key: string]: string | undefined;
    },
  >(): Partial<P>;
}
