# Test Coverage Analysis: Truono Health Lab v2.0

## Executive Summary

**Current Test Coverage: 0%**

The codebase currently has no test infrastructure:
- No testing framework installed
- No test files exist
- No test configuration files
- No test scripts in package.json

This document provides a prioritized roadmap for implementing comprehensive test coverage.

---

## Current Codebase Structure

| File | Lines | Purpose |
|------|-------|---------|
| `src/App.jsx` | ~1,354 | Main application with all components |
| `src/main.jsx` | ~10 | React entry point |
| `src/index.css` | ~25 | TailwindCSS imports |

### Key Components in App.jsx

| Component/Function | Lines | Type | Testability |
|-------------------|-------|------|-------------|
| `formatDate()` | 545-548 | Utility | High - Pure function |
| `getHRVStatus()` | 550-555 | Utility | High - Pure function |
| `getBodyFatStatus()` | 557-562 | Utility | High - Pure function |
| `CustomTooltip` | 568-582 | Component | Medium |
| `DetailModal` | 588-674 | Component | Medium |
| `StatCard` | 680-698 | Component | Medium |
| `PersonalBestCard` | 704-719 | Component | Medium |
| `App` | 725-end | Component | Complex |

### Data Processing Logic (useMemo hooks)

| Logic Block | Lines | Complexity | Priority |
|-------------|-------|------------|----------|
| Stats computation | 732-770 | High | Critical |
| Time range filtering | 773-780 | Medium | High |
| Combined correlation data | 788-796 | Medium | High |
| Monthly HRV aggregation | 799-814 | Medium | High |

---

## Recommended Testing Strategy

### Phase 1: Setup Testing Infrastructure

**Recommended Stack:**
- **Vitest** - Fast, Vite-native test runner (preferred over Jest for Vite projects)
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - Browser environment simulation

**Installation:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**Add to package.json:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

**Create vitest.config.js:**
```js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
});
```

---

## Phase 2: Priority Test Areas

### Priority 1: Unit Tests for Utility Functions (High Impact, Low Effort)

These pure functions are the easiest to test and provide immediate value.

#### 1.1 `formatDate()` (Line 545)

**Current Implementation:**
```javascript
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
};
```

**Recommended Tests:**
```javascript
// src/utils/__tests__/formatDate.test.js
describe('formatDate', () => {
  it('formats date string correctly', () => {
    expect(formatDate('2024-03-15')).toBe('Mar 15, 24');
  });

  it('handles edge case: year boundary', () => {
    expect(formatDate('2024-12-31')).toBe('Dec 31, 24');
    expect(formatDate('2025-01-01')).toBe('Jan 1, 25');
  });

  it('handles edge case: leap year date', () => {
    expect(formatDate('2024-02-29')).toBe('Feb 29, 24');
  });

  it('handles invalid date gracefully', () => {
    // Document current behavior for invalid input
    expect(() => formatDate('invalid')).not.toThrow();
  });
});
```

#### 1.2 `getHRVStatus()` (Line 550)

**Current Implementation:**
```javascript
const getHRVStatus = (hrv) => {
  if (hrv >= 20) return { label: 'Excellent', color: '#10b981', bg: 'bg-emerald-500/20' };
  if (hrv >= 15) return { label: 'Good', color: '#22c55e', bg: 'bg-green-500/20' };
  if (hrv >= 12) return { label: 'Fair', color: '#eab308', bg: 'bg-yellow-500/20' };
  return { label: 'Low', color: '#ef4444', bg: 'bg-red-500/20' };
};
```

**Recommended Tests:**
```javascript
// src/utils/__tests__/getHRVStatus.test.js
describe('getHRVStatus', () => {
  // Boundary tests
  it('returns Excellent for HRV >= 20', () => {
    expect(getHRVStatus(20)).toEqual({ label: 'Excellent', color: '#10b981', bg: 'bg-emerald-500/20' });
    expect(getHRVStatus(25)).toHaveProperty('label', 'Excellent');
    expect(getHRVStatus(51.89)).toHaveProperty('label', 'Excellent'); // Max from data
  });

  it('returns Good for HRV 15-19.99', () => {
    expect(getHRVStatus(15)).toHaveProperty('label', 'Good');
    expect(getHRVStatus(19.99)).toHaveProperty('label', 'Good');
  });

  it('returns Fair for HRV 12-14.99', () => {
    expect(getHRVStatus(12)).toHaveProperty('label', 'Fair');
    expect(getHRVStatus(14.99)).toHaveProperty('label', 'Fair');
  });

  it('returns Low for HRV < 12', () => {
    expect(getHRVStatus(11.99)).toHaveProperty('label', 'Low');
    expect(getHRVStatus(7.29)).toHaveProperty('label', 'Low'); // Min from data
    expect(getHRVStatus(0)).toHaveProperty('label', 'Low');
  });

  // Edge cases
  it('handles negative values', () => {
    expect(getHRVStatus(-5)).toHaveProperty('label', 'Low');
  });

  it('handles undefined/null gracefully', () => {
    // Document expected behavior
    expect(getHRVStatus(undefined)).toHaveProperty('label', 'Low');
    expect(getHRVStatus(null)).toHaveProperty('label', 'Low');
  });
});
```

#### 1.3 `getBodyFatStatus()` (Line 557)

**Current Implementation:**
```javascript
const getBodyFatStatus = (bf) => {
  if (bf < 20) return { label: 'Athletic', color: '#10b981' };
  if (bf < 25) return { label: 'Fit', color: '#22c55e' };
  if (bf < 28) return { label: 'Average', color: '#eab308' };
  return { label: 'Above Avg', color: '#f97316' };
};
```

**Recommended Tests:**
```javascript
// src/utils/__tests__/getBodyFatStatus.test.js
describe('getBodyFatStatus', () => {
  it('returns Athletic for body fat < 20%', () => {
    expect(getBodyFatStatus(15)).toHaveProperty('label', 'Athletic');
    expect(getBodyFatStatus(19.9)).toHaveProperty('label', 'Athletic');
  });

  it('returns Fit for body fat 20-24.9%', () => {
    expect(getBodyFatStatus(20)).toHaveProperty('label', 'Fit');
    expect(getBodyFatStatus(24.9)).toHaveProperty('label', 'Fit');
  });

  it('returns Average for body fat 25-27.9%', () => {
    expect(getBodyFatStatus(25)).toHaveProperty('label', 'Average');
    expect(getBodyFatStatus(27.9)).toHaveProperty('label', 'Average');
  });

  it('returns Above Avg for body fat >= 28%', () => {
    expect(getBodyFatStatus(28)).toHaveProperty('label', 'Above Avg');
    expect(getBodyFatStatus(35)).toHaveProperty('label', 'Above Avg');
  });

  it('handles zero body fat', () => {
    expect(getBodyFatStatus(0)).toHaveProperty('label', 'Athletic');
  });
});
```

---

### Priority 2: Component Tests (Medium Impact, Medium Effort)

#### 2.1 `StatCard` Component

**Recommended Tests:**
```javascript
// src/components/__tests__/StatCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Heart } from 'lucide-react';
import { StatCard } from '../StatCard';

describe('StatCard', () => {
  const defaultProps = {
    icon: Heart,
    label: 'Average HRV',
    value: '15.3 ms',
    color: 'text-cyan-400',
  };

  it('renders with required props', () => {
    render(<StatCard {...defaultProps} />);
    expect(screen.getByText('Average HRV')).toBeInTheDocument();
    expect(screen.getByText('15.3 ms')).toBeInTheDocument();
  });

  it('renders subValue when provided', () => {
    render(<StatCard {...defaultProps} subValue="Last 30 days" />);
    expect(screen.getByText('Last 30 days')).toBeInTheDocument();
  });

  it('renders positive trend indicator', () => {
    render(<StatCard {...defaultProps} trend={5.2} />);
    expect(screen.getByText('5.2%')).toBeInTheDocument();
  });

  it('renders negative trend indicator', () => {
    render(<StatCard {...defaultProps} trend={-3.1} />);
    expect(screen.getByText('3.1%')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<StatCard {...defaultProps} onClick={handleClick} />);
    fireEvent.click(screen.getByText('Average HRV').closest('div'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not have cursor-pointer class without onClick', () => {
    const { container } = render(<StatCard {...defaultProps} />);
    expect(container.firstChild).not.toHaveClass('cursor-pointer');
  });
});
```

#### 2.2 `DetailModal` Component

**Recommended Tests:**
```javascript
// src/components/__tests__/DetailModal.test.jsx
describe('DetailModal', () => {
  it('returns null when not open', () => {
    const { container } = render(
      <DetailModal isOpen={false} onClose={() => {}} data={{}} type="hrv" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('returns null when data is null', () => {
    const { container } = render(
      <DetailModal isOpen={true} onClose={() => {}} data={null} type="hrv" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders HRV details when type is hrv', () => {
    const hrvData = { date: '2024-01-15', rmssd: 18.5, nremhr: 62, entropy: 2.5 };
    render(<DetailModal isOpen={true} onClose={() => {}} data={hrvData} type="hrv" />);
    expect(screen.getByText('HRV (RMSSD)')).toBeInTheDocument();
    expect(screen.getByText('18.5 ms')).toBeInTheDocument();
  });

  it('renders scale details when type is scale', () => {
    const scaleData = {
      date: '2024-01-15', weight: 175, bodyFat: 22,
      muscle: 128, visceral: 10, metaAge: 40, water: 55, bmr: 1800
    };
    render(<DetailModal isOpen={true} onClose={() => {}} data={scaleData} type="scale" />);
    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText('175 lbs')).toBeInTheDocument();
  });

  it('renders respiratory details when type is respiratory', () => {
    const rrData = { date: '2024-01-15', rr: 14 };
    render(<DetailModal isOpen={true} onClose={() => {}} data={rrData} type="respiratory" />);
    expect(screen.getByText('Respiratory Rate')).toBeInTheDocument();
    expect(screen.getByText('14 brpm')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const handleClose = vi.fn();
    render(<DetailModal isOpen={true} onClose={handleClose} data={{ date: '2024-01-15' }} type="hrv" />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClose).toHaveBeenCalled();
  });
});
```

#### 2.3 `CustomTooltip` Component

**Recommended Tests:**
```javascript
// src/components/__tests__/CustomTooltip.test.jsx
describe('CustomTooltip', () => {
  it('returns null when not active', () => {
    const { container } = render(<CustomTooltip active={false} payload={[]} label="" />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when payload is empty', () => {
    const { container } = render(<CustomTooltip active={true} payload={[]} label="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders formatted date and values', () => {
    const payload = [{ name: 'HRV', value: 15.5, color: '#10b981' }];
    render(<CustomTooltip active={true} payload={payload} label="2024-01-15" />);
    expect(screen.getByText('Jan 15, 24')).toBeInTheDocument();
    expect(screen.getByText('HRV:')).toBeInTheDocument();
    expect(screen.getByText('15.5')).toBeInTheDocument();
  });

  it('handles multiple payload entries', () => {
    const payload = [
      { name: 'HRV', value: 15.5, color: '#10b981' },
      { name: 'HR', value: 65, color: '#ef4444' },
    ];
    render(<CustomTooltip active={true} payload={payload} label="2024-01-15" />);
    expect(screen.getByText('HRV:')).toBeInTheDocument();
    expect(screen.getByText('HR:')).toBeInTheDocument();
  });
});
```

---

### Priority 3: Integration Tests for Data Processing (High Impact, High Effort)

#### 3.1 Stats Computation (useMemo - lines 732-770)

**Recommendation:** Extract stats computation into a separate testable function.

**Refactoring Suggestion:**
```javascript
// src/utils/computeStats.js
export function computeStats(hrvData, scaleData, readinessData, respiratoryData) {
  const recentHRV = hrvData.slice(-30);
  const avgHRV = hrvData.reduce((a, b) => a + b.rmssd, 0) / hrvData.length;
  // ... rest of computation
  return { avgHRV, avgRecentHRV, bestHRV, /* ... */ };
}
```

**Recommended Tests:**
```javascript
// src/utils/__tests__/computeStats.test.js
describe('computeStats', () => {
  const mockHRVData = [
    { date: '2024-01-01', rmssd: 15, nremhr: 65, entropy: 2.5 },
    { date: '2024-01-02', rmssd: 20, nremhr: 60, entropy: 2.8 },
    { date: '2024-01-03', rmssd: 10, nremhr: 70, entropy: 2.2 },
  ];

  it('calculates average HRV correctly', () => {
    const stats = computeStats(mockHRVData, [], [], []);
    expect(stats.avgHRV).toBe(15); // (15 + 20 + 10) / 3
  });

  it('identifies best HRV day', () => {
    const stats = computeStats(mockHRVData, [], [], []);
    expect(stats.bestHRV).toBe(20);
    expect(stats.bestHRVDay.date).toBe('2024-01-02');
  });

  it('identifies lowest sleep HR', () => {
    const stats = computeStats(mockHRVData, [], [], []);
    expect(stats.lowestSleepHR).toBe(60);
  });

  it('handles empty arrays gracefully', () => {
    expect(() => computeStats([], [], [], [])).not.toThrow();
  });
});
```

#### 3.2 Time Range Filtering (useMemo - lines 773-780)

**Recommendation:** Extract into a testable utility function.

```javascript
// src/utils/filterByTimeRange.js
export function filterByTimeRange(data, timeRange) {
  if (timeRange === 'all') return data;
  const cutoff = new Date();
  if (timeRange === '30d') cutoff.setDate(cutoff.getDate() - 30);
  if (timeRange === '90d') cutoff.setDate(cutoff.getDate() - 90);
  if (timeRange === '1y') cutoff.setFullYear(cutoff.getFullYear() - 1);
  return data.filter(d => new Date(d.date) >= cutoff);
}
```

**Recommended Tests:**
```javascript
describe('filterByTimeRange', () => {
  const mockData = [
    { date: '2023-01-01' },
    { date: '2024-06-01' },
    { date: '2024-12-01' },
    { date: '2025-01-15' },
  ];

  it('returns all data when timeRange is "all"', () => {
    expect(filterByTimeRange(mockData, 'all')).toHaveLength(4);
  });

  it('filters to last 30 days', () => {
    const result = filterByTimeRange(mockData, '30d');
    // Actual assertions depend on current date
  });

  it('filters to last 90 days', () => {
    const result = filterByTimeRange(mockData, '90d');
    // Assertions based on relative dates
  });

  it('filters to last year', () => {
    const result = filterByTimeRange(mockData, '1y');
    // Assertions based on relative dates
  });
});
```

#### 3.3 Monthly HRV Aggregation (useMemo - lines 799-814)

```javascript
// src/utils/aggregateMonthlyHRV.js
export function aggregateMonthlyHRV(hrvData) {
  const monthly = {};
  hrvData.forEach(d => {
    const month = d.date.substring(0, 7);
    if (!monthly[month]) monthly[month] = { sum: 0, count: 0, best: 0 };
    monthly[month].sum += d.rmssd;
    monthly[month].count++;
    monthly[month].best = Math.max(monthly[month].best, d.rmssd);
  });
  return Object.entries(monthly).map(([month, data]) => ({
    month,
    avg: data.sum / data.count,
    best: data.best,
    count: data.count
  })).sort((a, b) => a.month.localeCompare(b.month));
}
```

**Recommended Tests:**
```javascript
describe('aggregateMonthlyHRV', () => {
  it('groups data by month correctly', () => {
    const data = [
      { date: '2024-01-05', rmssd: 15 },
      { date: '2024-01-15', rmssd: 20 },
      { date: '2024-02-10', rmssd: 18 },
    ];
    const result = aggregateMonthlyHRV(data);
    expect(result).toHaveLength(2);
    expect(result[0].month).toBe('2024-01');
    expect(result[0].avg).toBe(17.5);
    expect(result[0].best).toBe(20);
    expect(result[0].count).toBe(2);
  });

  it('sorts by month ascending', () => {
    const data = [
      { date: '2024-03-01', rmssd: 15 },
      { date: '2024-01-01', rmssd: 15 },
      { date: '2024-02-01', rmssd: 15 },
    ];
    const result = aggregateMonthlyHRV(data);
    expect(result.map(r => r.month)).toEqual(['2024-01', '2024-02', '2024-03']);
  });
});
```

---

### Priority 4: Main App Component Tests (Critical, High Effort)

#### 4.1 App Rendering Tests

```javascript
describe('App', () => {
  it('renders header with title', () => {
    render(<App />);
    expect(screen.getByText('TRUONO HEALTH LAB')).toBeInTheDocument();
  });

  it('renders all navigation tabs', () => {
    render(<App />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('HRV Deep Dive')).toBeInTheDocument();
    expect(screen.getByText('Body Composition')).toBeInTheDocument();
  });

  it('starts with overview tab active', () => {
    render(<App />);
    // Check overview content is visible
  });
});
```

#### 4.2 Tab Navigation Tests

```javascript
describe('App tab navigation', () => {
  it('switches to HRV tab when clicked', async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByText('HRV Deep Dive'));
    // Assert HRV content is now visible
  });

  it('switches to Body Composition tab', async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByText('Body Composition'));
    // Assert body composition content is visible
  });
});
```

#### 4.3 Time Range Filter Tests

```javascript
describe('App time range filtering', () => {
  it('updates HRV chart when time range changes', async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByText('30d'));
    // Assert chart data has been filtered
  });
});
```

---

### Priority 5: End-to-End Tests (Nice-to-Have)

For E2E tests, consider using **Playwright** or **Cypress**.

```javascript
// e2e/health-dashboard.spec.ts (Playwright)
test('user can navigate between tabs and view data', async ({ page }) => {
  await page.goto('/');

  // Check initial state
  await expect(page.locator('text=TRUONO HEALTH LAB')).toBeVisible();

  // Navigate to HRV tab
  await page.click('text=HRV Deep Dive');
  await expect(page.locator('text=HRV Trend')).toBeVisible();

  // Open a modal
  await page.click('.stat-card:first-child');
  await expect(page.locator('.modal')).toBeVisible();
});
```

---

## Test Coverage Goals

| Phase | Target Coverage | Timeline |
|-------|-----------------|----------|
| Phase 1 | 20% (utility functions) | Week 1 |
| Phase 2 | 40% (+ component tests) | Week 2 |
| Phase 3 | 60% (+ integration tests) | Week 3 |
| Phase 4 | 80% (+ App tests) | Week 4 |

---

## Recommended Architecture Improvements

### 1. Extract Utility Functions
Move utility functions from `App.jsx` to separate files:
```
src/
  utils/
    formatDate.js
    getHRVStatus.js
    getBodyFatStatus.js
    computeStats.js
    filterByTimeRange.js
    aggregateMonthlyHRV.js
```

### 2. Extract Components
Move components to their own files:
```
src/
  components/
    CustomTooltip.jsx
    DetailModal.jsx
    StatCard.jsx
    PersonalBestCard.jsx
```

### 3. Extract Data
Move raw data to separate data files:
```
src/
  data/
    hrvDailyData.js
    scaleData.js
    readinessData.js
    respiratoryData.js
```

This separation enables:
- Easier testing
- Better code organization
- Improved maintainability
- Potential for lazy loading data

---

## Identified Test Gaps and Risk Areas

### High Risk (No Tests, Critical Logic)

| Area | Risk | Impact |
|------|------|--------|
| Stats computation | Incorrect averages/bests displayed | User sees wrong data |
| HRV status thresholds | Wrong health classification | Misleading health info |
| Time range filtering | Wrong data displayed for period | User confusion |
| Modal type switching | Wrong details shown | Data mismatch |

### Medium Risk (No Tests, UI Logic)

| Area | Risk | Impact |
|------|------|--------|
| Tab navigation | Tab content not switching | Poor UX |
| Trend calculations | Wrong trend indicators | Misleading progress |
| Chart rendering | Charts not displaying | Missing visualizations |
| Personal bests | Wrong records identified | Incorrect achievements |

### Edge Cases to Test

1. **Empty data arrays** - App should handle gracefully
2. **Zero values in data** (e.g., `nremhr: 0.00`) - Should not break calculations
3. **Invalid dates** - Should not crash date formatting
4. **Missing optional fields** - Components should render without crashing
5. **Extreme values** (HRV of 51.89 ms) - Should display correctly

---

## Summary

This codebase has **zero test coverage** and would greatly benefit from implementing tests at all levels:

1. **Start with utility functions** - Quick wins with high value
2. **Add component tests** - Ensure UI renders correctly
3. **Add integration tests** - Verify data processing
4. **Add App-level tests** - End-to-end user flows

The recommended test stack (Vitest + React Testing Library) integrates seamlessly with the existing Vite build system and provides an excellent developer experience.
