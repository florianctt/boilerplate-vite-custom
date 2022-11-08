import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from '../App'

describe('test', () => {
  test('store', () => {
    render(<App />)
    /* Check on App components if h2 with Store content exist */
    expect(screen.getByRole('heading', { level: 3, name: /Store/ }))
  })
})
