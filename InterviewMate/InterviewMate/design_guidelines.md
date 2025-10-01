# AI Interview Assistant Design Guidelines

## Design Approach
**Selected Approach**: Design System Approach using Material Design
**Justification**: This is a utility-focused application prioritizing efficiency and learnability for both interviewees and interviewers. The dual-tab interface with complex data displays and form interactions benefits from Material Design's established patterns for productivity applications.

## Core Design Elements

### A. Color Palette
**Primary Colors**:
- Light mode: 210 100% 50% (Professional blue)
- Dark mode: 210 85% 45% (Muted professional blue)

**Secondary Colors**:
- Success (completed interviews): 142 76% 36%
- Warning (in progress): 45 93% 47%
- Error (timeouts/issues): 0 84% 60%

**Background Colors**:
- Light mode: 0 0% 98% (Off-white)
- Dark mode: 220 13% 9% (Deep charcoal)

### B. Typography
- **Primary Font**: Inter (Google Fonts)
- **Code Font**: JetBrains Mono (for technical questions)
- **Hierarchy**: 
  - Headers: 600 weight, varying sizes
  - Body: 400 weight, 16px base
  - Labels: 500 weight, 14px

### C. Layout System
**Spacing Units**: Tailwind units of 2, 4, 8, and 16
- Micro spacing: p-2, m-2
- Standard spacing: p-4, gap-4
- Section spacing: p-8, mb-8
- Large spacing: p-16 for major sections

### D. Component Library

**Navigation**:
- Tab-based navigation with active state indicators
- Material Design tab styling with subtle shadows

**Chat Interface (Interviewee Tab)**:
- Message bubbles with distinct styling for AI vs candidate
- Timer component with color-coded urgency (green → yellow → red)
- Progress indicator showing question count (2/6)
- File upload area with drag-and-drop styling

**Dashboard (Interviewer Tab)**:
- Data table with sortable columns and search functionality
- Score visualization using progress bars or circular indicators
- Candidate cards with summary information
- Modal overlays for detailed candidate views

**Forms & Inputs**:
- Material Design text fields with floating labels
- File upload with visual feedback and validation states
- Resume field extraction display with editable inputs

**Data Displays**:
- Score badges with color-coded performance levels
- Timeline view for interview progress
- Question difficulty indicators (Easy/Medium/Hard chips)

**Overlays**:
- Welcome Back modal with session restoration options
- Confirmation dialogs for actions like ending interviews
- Loading states for AI question generation

### E. Key Interactions

**Chat Flow**:
- Smooth message appearance animations
- Timer countdown with visual emphasis as time runs low
- Auto-submit with clear feedback when time expires

**Dashboard Interactions**:
- Hover states on candidate cards
- Expandable rows for detailed question/answer view
- Sort and filter controls with immediate feedback

**File Processing**:
- Upload progress indicators
- Success/error states for resume parsing
- Clear messaging for missing field collection

## Special Considerations

- **Accessibility**: Ensure timer alerts are announced to screen readers
- **Responsive Design**: Mobile-friendly chat interface, tablet-optimized dashboard
- **Error Handling**: Friendly messaging for file upload failures and AI service interruptions
- **Performance**: Lazy loading for candidate history, optimized file processing feedback

This design prioritizes clarity and efficiency while maintaining a professional appearance suitable for interview scenarios.