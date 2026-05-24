import { createElement } from 'react'
import type { Preview } from '@storybook/react-vite'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { GlobalStyle } from '../src/gel'
import { mswHandlers } from './msw-handlers'
import '../src/gel-preview/styles.css'
import '../src/tapaas-preview/styles.css'

const getMswWorkerUrl = () => {
  if (typeof window === 'undefined') {
    return './mockServiceWorker.js'
  }

  return new URL('./mockServiceWorker.js', window.location.href).pathname
}

initialize({
  serviceWorker: {
    url: getMswWorkerUrl(),
  },
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
  decorators: [
    (Story) => createElement(GlobalStyle, null, createElement(Story)),
  ],
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {},
      options: {},
    },
    layout: 'padded',
    msw: {
      handlers: mswHandlers,
    },
  },
}

export default preview
