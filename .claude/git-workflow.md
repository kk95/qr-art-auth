# Git Workflow & Version Control

## Commit Messages

- Clear, concise, imperative mood ("Add workspace API" not "Added")
- Reference GitHub issues: `[#2] Install PrimeVue and Tailwind`
- **No** "Generated with Claude Code" or AI attribution
- **No** emojis

## Branching

- Feature branches from `main`
- Branch naming: `feature/issue-{number}-brief-description`
- Example: `feature/issue-2-dependencies`

## Workflow for Each Phase

1. **Start new chat** (for token efficiency)
2. **Create feature branch**: `git checkout -b feature/issue-{N}-description`
3. **Work on phase** (implement, test, document)
4. **Commit changes** with issue reference
5. **Push branch**: `git push -u origin feature/issue-{N}-description`
6. **Create PR** for review
7. **Review with code review tool** (ode rabbit extension)
8. **Merge to main** after approval

## Context/MCP Usage by Phase

### Phase 1: Initialization
- No special MCP needed
- Basic Nuxt setup

### Phase 2: Dependencies
- **Context7**: nuxt 4, primevue 4, tailwind css 4
- Install PrimeVue, Tailwind, Pinia

### Phase 3: Configuration
- **Context7**: tailwind css 4 configuration, primevue aura theme
- Configure theme and styling

### Phase 4: Project Structure
- **MCP filesystem**: Access ai-call-center-subscription for reference
- Create app/ structure

### Phase 5: Volt Components
- **MCP filesystem**: Copy from ai-call-center-subscription
- Copy Volt design system components

## Pre-PR Checklist

- [ ] Run git diff and review every line
- [ ] Remove console.log, debugger statements
- [ ] Commit messages follow standards
- [ ] Documentation updated
- [ ] Self-review complete

## Pull Requests

- Small PRs (~100-200 lines per phase)
- Self-review before requesting review
- Use ode rabbit extension for code review
