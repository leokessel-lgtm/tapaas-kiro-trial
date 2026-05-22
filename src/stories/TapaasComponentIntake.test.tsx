import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CandidateCards, IntakeOverview, PromotionRules, TemplateRelationships } from './TapaasComponentIntake.stories'

describe('TaPaaS component intake Storybook stories', () => {
  it('renders the intake overview and candidate table', () => {
    render(<>{IntakeOverview.render?.({}, {} as never)}</>)

    expect(screen.getByRole('heading', { name: 'TaPaaS component intake board' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Coded preview' })).toBeInTheDocument()

    const table = screen.getByRole('table')
    expect(within(table).getByRole('columnheader', { name: 'Candidate' })).toBeInTheDocument()
    expect(within(table).getByRole('rowheader', { name: 'Privacy card' })).toBeInTheDocument()
    expect(within(table).getByRole('rowheader', { name: 'TaPaaS radio button cards' })).toBeInTheDocument()
    expect(within(table).getByRole('rowheader', { name: 'Backend error examples' })).toBeInTheDocument()
  })

  it('renders candidate cards, template relationships and promotion rules', () => {
    const { rerender } = render(<>{CandidateCards.render?.({}, {} as never)}</>)
    expect(screen.getByRole('heading', { name: 'Candidate detail cards' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Legal info accordion' })).toBeInTheDocument()

    rerender(<>{TemplateRelationships.render?.({}, {} as never)}</>)
    expect(screen.getByRole('heading', { name: 'Template relationships' })).toBeInTheDocument()
    expect(screen.getByRole('rowheader', { name: 'Review' })).toBeInTheDocument()

    rerender(<>{PromotionRules.render?.({}, {} as never)}</>)
    expect(screen.getByRole('heading', { name: 'Promotion rules' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '1. Confirm source evidence' })).toBeInTheDocument()
  })
})
