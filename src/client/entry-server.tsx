import {
  renderToPipeableStream,
  RenderToPipeableStreamOptions,
} from 'react-dom/server';
import { App, IApplicationProps } from './App';
import { StaticRouter } from 'react-router';
import { ServerRenderFunction } from '@shared/ServerRenderFunction';
import { join } from 'path';

export const render: ServerRenderFunction<IApplicationProps> = (
  url: string,
  data: IApplicationProps,
  options: RenderToPipeableStreamOptions,
) => {
  return renderToPipeableStream(
    <StaticRouter location={url}>
      <App {...data} />
    </StaticRouter>,
    {
      bootstrapModules: [join('entry-client.tsx')],
      bootstrapScriptContent: `window.INITIAL_STATE = ${JSON.stringify(data)}`,
      ...options,
    },
  );
};
