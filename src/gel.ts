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
  Breadcrumb,
  Callout,
  Checkbox,
  CheckboxList,
  DateInput,
  DateMultiInput,
  FileInput,
  FileUpload,
  Loader,
  InPageAlert,
  Field,
  Fieldset,
  Input,
  Skeleton,
  Textarea,
  Select,
  ProgressStepper,
  StatusLabel,
  MoreInfoDisclosure,
  MoreInfoPanel,
  Accordion,
} from './gel-preview'
