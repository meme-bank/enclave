import {
  PipeableStream,
  RenderToPipeableStreamOptions,
} from 'react-dom/server';

export type ServerRenderFunction<IData = any> = (
  url: string,
  data: IData,
  options?: RenderToPipeableStreamOptions,
) => PipeableStream;
