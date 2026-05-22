/**
 * Preview-only Service NSW page shell.
 *
 * This is NOT a GEL component. No header/footer package exists in the GEL source snapshot.
 * This shell matches the target design image for local prototyping only.
 *
 * Icons are verified SVG paths from @snsw-gel/ui-icons source.
 * Colours are sourced from gel3ColorValue in @snsw-gel/theming (Verified from source).
 * Logo assets are placeholders — real SVG vector files are not available.
 *
 * Do not claim WCAG compliance, accessibility approval, or production readiness.
 */

import { PropsWithChildren } from 'react'
import { IconGlobe, IconAvatar, IconSignOut, IconSearch } from './icons'
import servicenswLogo from '../assets/servicensw-logo.svg'
import './serviceNSWChrome.css'

interface ServiceNSWChromeProps {
  pageTitle?: string
  serviceLabel?: string
  pageSubtitle?: string
}

export function ServiceNSWChrome({
  children,
  pageTitle,
  serviceLabel,
  pageSubtitle,
}: PropsWithChildren<ServiceNSWChromeProps>) {
  return (
    <div className='snsw-shell'>
      {/* Utility bar */}
      <div className='snsw-utility-bar'>
        <div className='snsw-utility-bar__inner'>
          <a href='#!' onClick={(e) => e.preventDefault()} className='snsw-utility-bar__link'>
            <IconGlobe size={14} />
            Change language
          </a>
          <a href='#!' onClick={(e) => e.preventDefault()} className='snsw-utility-bar__link'>
            <IconAvatar size={14} />
            Account
          </a>
          <a href='#!' onClick={(e) => e.preventDefault()} className='snsw-utility-bar__link'>
            <IconSignOut size={14} />
            Log out
          </a>
        </div>
      </div>

      {/* Header */}
      <header className='snsw-header'>
        <div className='snsw-header__inner'>
          <a href='#!' onClick={(e) => e.preventDefault()} className='snsw-header__logo' aria-label='Service NSW home'>
            <img src={servicenswLogo} alt='Service NSW' className='snsw-header__logo-img' />
          </a>
          <nav className='snsw-header__nav' aria-label='Main navigation'>
            <a href='#!' onClick={(e) => e.preventDefault()}>Home</a>
            <a href='#!' onClick={(e) => e.preventDefault()}>Find services</a>
            <a href='#!' onClick={(e) => e.preventDefault()}>Business</a>
            <a href='#!' onClick={(e) => e.preventDefault()}>Find locations</a>
          </nav>
          <div className='snsw-header__search'>
            <input
              type='search'
              className='snsw-header__search-input'
              placeholder='Search'
              aria-label='Search Service NSW'
            />
            <button className='snsw-header__search-btn' type='button' aria-label='Search'>
              <IconSearch size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero band */}
      {pageTitle && (
        <div className='snsw-hero'>
          <div className='snsw-hero__inner'>
            {serviceLabel && (
              <p className='snsw-hero__service-label'>{serviceLabel}</p>
            )}
            <h1 className='snsw-hero__title'>{pageTitle}</h1>
            {pageSubtitle && (
              <p className='snsw-hero__subtitle'>{pageSubtitle}</p>
            )}
          </div>
        </div>
      )}

      {/* Main content — no card, content sits directly on grey background */}
      <main className='snsw-main' id='main-content'>
        <div className='snsw-main__inner'>
          <div className='snsw-main__content'>
            {children}
          </div>
        </div>
      </main>

      {/* Acknowledgement of Country */}
      <div className='snsw-acknowledgement'>
        <div className='snsw-acknowledgement__inner'>
          <p className='snsw-acknowledgement__heading'>Acknowledgement of Country</p>
          <p style={{ margin: 0 }}>
            We acknowledge the Traditional Custodians of NSW, and their continued connection
            to land, water and culture. We pay our respects to Elders past and present.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className='snsw-footer'>
        <div className='snsw-footer__inner'>
          <div className='snsw-footer__col'>
            <h3>Find services</h3>
            <ul>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Births, relationships and deaths</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Boating, fishing and outdoors</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Business, industries and employment</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Concessions, rebates and assistance</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Driving and transport</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Education</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Emergencies and natural disasters</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Environment, parks and wildlife</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Health and care</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Housing and property</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Legal and Police services</a></li>
            </ul>
          </div>
          <div className='snsw-footer__col'>
            <h3>Service NSW</h3>
            <ul>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>About us</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Jobs at Service NSW</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>News</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Service status</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Performance dashboard</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Download the Service NSW app</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Help in your language</a></li>
            </ul>
          </div>
          <div className='snsw-footer__col'>
            <h3>Contact</h3>
            <ul>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Contact form</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Phone 13 77 88</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Find a Service NSW location</a></li>
              <li><a href='#!' onClick={(e) => e.preventDefault()}>Find a NSW Government agency</a></li>
            </ul>
            <div className='snsw-footer__social'>
              <a href='#!' onClick={(e) => e.preventDefault()} className='snsw-footer__social-icon' aria-label='Facebook'>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'><path d='M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z'/></svg>
              </a>
              <a href='#!' onClick={(e) => e.preventDefault()} className='snsw-footer__social-icon' aria-label='LinkedIn'>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'><path d='M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z'/></svg>
              </a>
              <a href='#!' onClick={(e) => e.preventDefault()} className='snsw-footer__social-icon' aria-label='Instagram'>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'><path d='M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z'/></svg>
              </a>
              <a href='#!' onClick={(e) => e.preventDefault()} className='snsw-footer__social-icon' aria-label='YouTube'>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'><path d='M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z'/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className='snsw-footer__bottom'>
          <div className='snsw-footer__bottom-inner'>
            <a href='#!' onClick={(e) => e.preventDefault()}>Accessibility</a>
            <a href='#!' onClick={(e) => e.preventDefault()}>Privacy</a>
            <a href='#!' onClick={(e) => e.preventDefault()}>Terms of use</a>
            <a href='#!' onClick={(e) => e.preventDefault()}>Copyright and disclaimer</a>
            <a href='#!' onClick={(e) => e.preventDefault()}>Accessing information</a>
            <a href='#!' onClick={(e) => e.preventDefault()}>NSW Government</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
