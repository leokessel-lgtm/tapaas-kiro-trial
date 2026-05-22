import type { Preview } from '@storybook/react'
import '../src/gel-preview/styles.css'
import '../src/tapaas-preview/styles.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      element: '#storybook-root',
      config: {},
      options: {},
    },
    layout: 'padded',
  },
}

export default preview
