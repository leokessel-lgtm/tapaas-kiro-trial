/**
 * GEL component adapter.
 *
 * Preview-only local components. Replace src/gel.ts exports with
 * @snsw-gel/react exports when registry access is available.
 *
 * When @snsw-gel/react is installable, change this file to:
 *
 *   export {
 *     GlobalStyle,
 *     gel3Themes,
 *     ContentContainer,
 *     Section,
 *     Heading,
 *     RadioButtonList,
 *     ErrorSummary,
 *     Button,
 *     TextLink,
 *   } from '@snsw-gel/react'
 */

export {
  GlobalStyle,
  ContentContainer,
  Section,
  Heading,
  RadioButtonList,
  ErrorSummary,
  Button,
  TextLink,
  Checkbox,
  InPageAlert,
  Field,
  Input,
  Textarea,
  Select,
  ProgressStepper,
} from './gel-preview'
