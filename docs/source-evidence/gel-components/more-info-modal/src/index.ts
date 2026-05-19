import { MoreInfoModal as MoreInfoModalDeprecated } from './MoreInfoModal'
import { deprecatedComponent } from '@snsw-gel/utils'

/**
 * @deprecated
 * The MoreInfoModal component, also referred to as Sliding tooltip is deprecated. Please use `<MoreInfoPanel/>` instead.
 * For more information, see [MoreInfoModal Deprecation](https://kiama.testservicensw.net/storybook/?path=/docs/resources-releases-lifecycle-deprecations-25-12-11-moreinfomodal--docs).
 */
export const MoreInfoModal = deprecatedComponent(
    'MoreInfoModal',
    MoreInfoModalDeprecated,
)
