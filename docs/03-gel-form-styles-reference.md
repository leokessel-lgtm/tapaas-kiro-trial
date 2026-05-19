# GEL Form Styles Reference

## Source

These values are extracted from the live `service.nsw.gov.au` CSS and verified against the GEL source snapshot. Use these when building preview components.

## CSS Variables (from live site)

```css
/* Typography */
--snsw-font-family: "Public Sans", Arial, sans-serif;
--snsw-font-size-s: 0.875rem;    /* 14px */
--snsw-font-size-m: 1rem;        /* 16px */
--snsw-font-size-l: 1.125rem;    /* 18px */
--snsw-font-size-xl: 1.25rem;    /* 20px — desktop: 1.375rem */
--snsw-font-size-xxl: 1.75rem;   /* desktop */
--snsw-font-size-xxxl: 2.25rem;  /* desktop — mobile: 2rem */
--snsw-line-height: 1.5;
--snsw-line-height-h: 1.4;

/* Colours */
--snsw-link-blue: #002664;
--snsw-text-black: #242934;
--snsw-text-grey: #646974;
--snsw-white: #fff;
--snsw-black: #242934;
--snsw-error-red: #b81237;
--snsw-error-red-light: #f7e7eb;
--snsw-info-blue: #2e5299;
--snsw-success-green: #008a07;
--snsw-warning-orange: #c95000;

/* Form elements */
--snsw-form-element-border: #646974;
--snsw-form-element-border-width: 2px;
--snsw-form-element-border-radius: 6px;
--snsw-form-element-height: 48px;
--snsw-form-element-padding: 0.825rem;
--snsw-form-element-width: 372px;       /* max-width for inputs */
--snsw-form-element-width-s: 174px;
--snsw-form-label-spacing: 1.5rem;      /* margin below label */
--snsw-form-focus-border: #2e5299;

/* Focus */
--snsw-focus-border: 3px solid #0085b3;
--snsw-focus-offset: 2px;

/* Spacing */
--snsw-spacing-xs: 0.5rem;
--snsw-spacing-s: 1rem;         /* mobile — desktop: same */
--snsw-spacing-m: 1rem;         /* mobile — desktop: 1.5rem */
--snsw-spacing-l: 1.5rem;       /* mobile — desktop: 2rem */
--snsw-spacing-xl: 1.5rem;      /* mobile — desktop: 2.5rem */
--snsw-spacing-xxl: 2rem;       /* mobile — desktop: 3rem */
--snsw-spacing-xxxl: 2rem;      /* mobile — desktop: 3.5rem */

/* Layout */
--snsw-container-width: 76.5rem;        /* 1224px */
--snsw-container-padding: 1.25rem;      /* mobile — desktop: 1.875rem */
--snsw-line-length: 48rem;              /* 768px — max content width */
--snsw-border-radius-s: 6px;
--snsw-touch-target-size: 44px;
```

## Form element rules

### Text inputs
- Height: `48px`
- Border: `2px solid #646974`
- Border-radius: `6px`
- Padding: `0 0.825rem`
- Max-width: `372px`
- Font: `16px` (prevents iOS zoom)
- Error state: `border-color: #b81237`
- Focus: `outline: 3px solid #0085b3; outline-offset: 2px`

### Input width variants
| Size | Width |
|------|-------|
| xxs | 56px |
| xs | 92px |
| sm | 132px |
| md | 200px |
| lg | 268px |
| xl | 416px |

### Labels
- Font-weight: `500` (regular fields) or `700` (fieldset legends)
- Margin-bottom: `1.5rem`
- Colour: `#242934`

### Radio buttons
- Size: `2rem × 2rem`
- Border: `2px solid #646974`
- Border-radius: `50%` (circle)
- Checked indicator: filled circle `#646974`
- Spacing between options: `1.25rem`
- Hidden native input + custom visual indicator

### Checkboxes
- Size: `2rem × 2rem`
- Border: `2px solid #646974`
- Border-radius: `4px`
- Checked indicator: checkmark SVG fill `#646974`
- Hidden native input + custom visual indicator

### Select dropdowns
- Same as text input + custom chevron SVG
- Chevron: navy blue `#002664` pointing down
- `appearance: none` with background-image

### Buttons
- Font-weight: `600`
- Border-radius: `6px`
- Height: auto (padding-based)
- Min-width: `200px` (desktop), `100%` (mobile < 480px)
- Primary: `background: #d7153a; color: #fff; border: 2px solid #d7153a`
- Secondary: `background: transparent; border: 2px solid #002664; color: #002664`
- Transition: `border-color 0.5s ease, background-color 0.5s ease, color 0.5s ease`
- Disabled: `opacity: 0.4; cursor: not-allowed`

### Field errors (inline)
- Background: `#f7e7eb`
- Left padding with error icon (20×20 SVG, fill `#b81237`)
- Font-weight: `700`
- No border-left (that's for InPageAlert)

### Error Summary (top of form)
- Uses InPageAlert error variant
- Left border: `4px solid #b81237`
- Background: `#f7e7eb`
- Error icon positioned left
- Title: bold
- Error links: bold, colour `#b81237`
- `role="alert"` + `tabIndex={-1}` for focus management

## Typography from Figma tokens

| Style | Font | Size / Line-height |
|-------|------|-------------------|
| H1 Desktop | Public Sans Bold | 48px / 60px |
| H1 Mobile | Public Sans Bold | 28px / 36px |
| H2 Desktop | Public Sans Bold | 32px / 40px |
| H2 Mobile | Public Sans Bold | 24px / 30px |
| H3 Desktop | Public Sans Bold | 24px / 32px |
| H3 Mobile | Public Sans Bold | 20px / 24px |
| H4 Desktop | Public Sans Bold | 20px / 28px |
| H5 Desktop | Public Sans Bold | 16px / 24px |
| Body | Public Sans Regular | 16px / 24px |
| Body bold | Public Sans Bold | 16px / 24px |
| Small text | Public Sans Regular | 14px / 20px |
| Label | Public Sans Bold | 16px / 24px |
| Help text | Public Sans Regular | 14px / 20px |
| Validation text | Public Sans Bold | 16px / 20px |

## Font loading

Add to `index.html`:
```html
<link rel="stylesheet" href="https://fonts.service.nsw.gov.au/public-sans-min.css" />
```
