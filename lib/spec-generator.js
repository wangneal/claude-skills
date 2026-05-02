const fs = require('fs-extra');
const path = require('path');

/**
 * Calculate ambiguity score
 * @param {Object} scores - Scores object with goalClarity, boundaryClarity, constraintClarity, acceptanceCriteria
 * @returns {number} Ambiguity score (1.0 - clarity)
 */
function calculateAmbiguity(scores) {
  const weights = {
    goalClarity: 0.35,
    boundaryClarity: 0.25,
    constraintClarity: 0.20,
    acceptanceCriteria: 0.20
  };

  const clarity = weights.goalClarity * (scores.goalClarity || 0) +
    weights.boundaryClarity * (scores.boundaryClarity || 0) +
    weights.constraintClarity * (scores.constraintClarity || 0) +
    weights.acceptanceCriteria * (scores.acceptanceCriteria || 0);

  return 1.0 - clarity;
}

/**
 * Check if all minimum scores are met
 * @param {Object} scores - Scores object
 * @returns {boolean} True if all minimums are met
 */
function allMinimumsMet(scores) {
  return (scores.goalClarity || 0) >= 0.75 &&
    (scores.boundaryClarity || 0) >= 0.70 &&
    (scores.constraintClarity || 0) >= 0.65 &&
    (scores.acceptanceCriteria || 0) >= 0.70;
}

/**
 * Generate SPEC.md file
 * @param {string} phaseDir - Phase directory path
 * @param {number} phaseNumber - Phase number
 * @param {string} phaseName - Phase name
 * @param {Array} requirements - Array of requirements
 * @param {Object} boundaries - Boundaries object with inScope and outOfScope
 * @param {Array} acceptanceCriteria - Array of acceptance criteria
 * @param {Object} scores - Ambiguity scores
 * @returns {Object} Object with filePath and ambiguity score
 */
async function generateSpec(phaseDir, phaseNumber, phaseName, requirements = [], boundaries = {}, acceptanceCriteria = [], scores = {}) {
  const paddedPhase = String(phaseNumber).padStart(2, '0');
  const fileName = `${paddedPhase}-SPEC.md`;
  const filePath = path.join(phaseDir, fileName);

  // Read template
  const templatePath = path.join(process.cwd(), '.bos-flow', 'templates', 'SPEC.md');
  let template = '';

  if (await fs.pathExists(templatePath)) {
    template = await fs.readFile(templatePath, 'utf8');
  } else {
    template = getDefaultTemplate();
  }

  // Calculate ambiguity
  const ambiguity = calculateAmbiguity(scores);
  const gatePassed = ambiguity <= 0.20 && allMinimumsMet(scores);

  // Replace placeholders
  const today = new Date().toISOString().split('T')[0];

  let content = template
    .replace(/\[X\]/g, paddedPhase)
    .replace(/\[Phase Name\]/g, phaseName)
    .replace(/\[YYYY-MM-DD\]/g, today)
    .replace(/\[0\.XX\]/g, ambiguity.toFixed(2))
    .replace(/\[N\]/g, requirements.length.toString());

  // Generate goal
  const goal = extractGoal(requirements);
  content = replaceSection(content, '## Goal', '## Background', goal);

  // Generate requirements section
  const requirementsSection = generateRequirementsSection(requirements);
  content = replaceSection(content, '## Requirements', '## Boundaries', requirementsSection);

  // Generate boundaries section
  const boundariesSection = generateBoundariesSection(boundaries);
  content = replaceSection(content, '## Boundaries', '## Acceptance Criteria', boundariesSection);

  // Generate acceptance criteria section
  const acceptanceSection = generateAcceptanceSection(acceptanceCriteria);
  content = replaceSection(content, '## Acceptance Criteria', '## Ambiguity Report', acceptanceSection);

  // Generate ambiguity report
  const ambiguityReport = generateAmbiguityReport(scores, ambiguity, gatePassed);
  content = replaceSection(content, '## Ambiguity Report', '## Risk Assessment', ambiguityReport);

  // Ensure phase directory exists
  await fs.ensureDir(phaseDir);

  // Write file
  await fs.writeFile(filePath, content, 'utf8');

  return {
    filePath,
    ambiguity,
    gatePassed
  };
}

/**
 * Extract goal from requirements
 * @param {Array} requirements - Array of requirements
 * @returns {string} Goal string
 */
function extractGoal(requirements) {
  if (requirements.length === 0) {
    return '## Goal\n\n[待填充]\n';
  }

  const firstReq = requirements[0];
  return `## Goal\n\n${firstReq.target || firstReq.description || 'Implement the specified functionality'}\n`;
}

/**
 * Generate requirements section
 * @param {Array} requirements - Array of requirements
 * @returns {string} Formatted requirements section
 */
function generateRequirementsSection(requirements) {
  if (requirements.length === 0) {
    return `## Requirements\n\nNo requirements specified yet.\n`;
  }

  let content = '## Requirements\n\n';

  requirements.forEach((req, index) => {
    const num = index + 1;
    content += `### Requirement ${num}: ${req.label || 'Requirement ' + num}\n\n`;
    content += `**Description:** ${req.description || 'TBD'}\n\n`;
    content += `**Current State:**\n`;

    if (req.current && Array.isArray(req.current)) {
      req.current.forEach(item => {
        content += `- ${item}\n`;
      });
    } else {
      content += `- ${req.current || 'Not implemented'}\n`;
    }

    content += `\n**Target State:**\n`;
    if (req.target && Array.isArray(req.target)) {
      req.target.forEach(item => {
        content += `- ${item}\n`;
      });
    } else {
      content += `- ${req.target || 'To be implemented'}\n`;
    }

    content += `\n**Acceptance Criteria:**\n`;
    if (req.acceptance && Array.isArray(req.acceptance)) {
      req.acceptance.forEach(item => {
        content += `- [ ] ${item}\n`;
      });
    } else {
      content += `- [ ] Verify implementation\n`;
    }

    content += `\n`;
  });

  return content;
}

/**
 * Generate boundaries section
 * @param {Object} boundaries - Boundaries object
 * @returns {string} Formatted boundaries section
 */
function generateBoundariesSection(boundaries) {
  let content = '## Boundaries\n\n### In Scope\n\n';

  if (boundaries.inScope && boundaries.inScope.length > 0) {
    content += '**明确列出此阶段产生的内容:**\n\n';
    boundaries.inScope.forEach(item => {
      content += `- [ ] ${item}\n`;
    });
  } else {
    content += '**明确列出此阶段产生的内容:**\n\n- [ ] [待填充]\n';
  }

  content += '\n### Out of Scope\n\n';

  if (boundaries.outOfScope && boundaries.outOfScope.length > 0) {
    content += '**明确列出此阶段不做的内容 — 原因:**\n\n';
    boundaries.outOfScope.forEach(item => {
      content += `- **${item.name}** — ${item.reason || 'No reason provided'}\n`;
    });
  } else {
    content += '**明确列出此阶段不做的内容 — 原因:**\n\n- **[待填充]** — [原因]\n';
  }

  return content + '\n';
}

/**
 * Generate acceptance criteria section
 * @param {Array} acceptanceCriteria - Array of acceptance criteria
 * @returns {string} Formatted acceptance criteria section
 */
function generateAcceptanceSection(acceptanceCriteria) {
  if (acceptanceCriteria.length === 0) {
    return `## Acceptance Criteria\n\n**通过/失败标准 — 明确、可验证:**\n\n- [ ] [待填充]\n`;
  }

  let content = '## Acceptance Criteria\n\n**通过/失败标准 — 明确、可验证:**\n\n';

  acceptanceCriteria.forEach(item => {
    content += `- [ ] ${item}\n`;
  });

  return content + '\n';
}

/**
 * Generate ambiguity report
 * @param {Object} scores - Scores object
 * @param {number} ambiguity - Ambiguity score
 * @param {boolean} gatePassed - Whether gate passed
 * @returns {string} Formatted ambiguity report
 */
function generateAmbiguityReport(scores, ambiguity, gatePassed) {
  const status = (score, min) => score >= min ? '✓ PASS' : '✗ FAIL';

  let content = `## Ambiguity Report

| Dimension          | Score | Min  | Status | Notes                              |
|--------------------|-------|------|--------|------------------------------------|
| Goal Clarity       | ${(scores.goalClarity || 0).toFixed(2)} | 0.75 | ${status(scores.goalClarity || 0, 0.75)} | ${scores.goalClarity >= 0.75 ? '目标清晰明确' : '目标不够清晰'} |
| Boundary Clarity   | ${(scores.boundaryClarity || 0).toFixed(2)} | 0.70 | ${status(scores.boundaryClarity || 0, 0.70)} | ${scores.boundaryClarity >= 0.70 ? '范围边界明确' : '范围边界不够明确'} |
| Constraint Clarity | ${(scores.constraintClarity || 0).toFixed(2)} | 0.65 | ${status(scores.constraintClarity || 0, 0.65)} | ${scores.constraintClarity >= 0.65 ? '约束明确' : '约束不够明确'} |
| Acceptance Criteria| ${(scores.acceptanceCriteria || 0).toFixed(2)} | 0.70 | ${status(scores.acceptanceCriteria || 0, 0.70)} | ${scores.acceptanceCriteria >= 0.70 ? '验收标准可测试' : '验收标准不够可测试'} |
| **Ambiguity**      | ${ambiguity.toFixed(2)} | ≤0.20| ${gatePassed ? '✓ PASS' : '✗ FAIL'} | ${gatePassed ? '模糊度低于门控阈值' : '模糊度高于门控阈值'} |

**Scoring Guide:**

- **Goal Clarity (权重 35%):** 目标是否具体、可衡量、可实现、相关、有时限（SMART 原则）
- **Boundary Clarity (权重 25%):** 范围边界是否明确，in/out of scope 是否清晰
- **Constraint Clarity (权重 20%):** 技术约束、安全约束、时间约束是否明确
- **Acceptance Criteria (权重 20%):** 验收标准是否可测试，是否有明确的通过/失败标准

**Ambiguity Calculation:**

\`\`\`
Ambiguity = 1.0 - Clarity
Clarity = 0.35 × Goal + 0.25 × Boundary + 0.20 × Constraint + 0.20 × Acceptance

Example:
Clarity = 0.35 × ${(scores.goalClarity || 0).toFixed(2)} + 0.25 × ${(scores.boundaryClarity || 0).toFixed(2)} + 0.20 × ${(scores.constraintClarity || 0).toFixed(2)} + 0.20 × ${(scores.acceptanceCriteria || 0).toFixed(2)}
        = ${(0.35 * (scores.goalClarity || 0) + 0.25 * (scores.boundaryClarity || 0) + 0.20 * (scores.constraintClarity || 0) + 0.20 * (scores.acceptanceCriteria || 0)).toFixed(4)}
Ambiguity = 1.0 - ${(0.35 * (scores.goalClarity || 0) + 0.25 * (scores.boundaryClarity || 0) + 0.20 * (scores.constraintClarity || 0) + 0.20 * (scores.acceptanceCriteria || 0)).toFixed(4)} = ${ambiguity.toFixed(2)}
\`\`\`

**Gate Check:**
- ${ambiguity <= 0.20 ? '✓' : '✗'} Ambiguity ≤ 0.20 (${ambiguity <= 0.20 ? 'PASS' : 'FAIL'})
- ${allMinimumsMet(scores) ? '✓' : '✗'} All dimensions meet minimums (${allMinimumsMet(scores) ? 'PASS' : 'FAIL'})
`;

  return content;
}

/**
 * Replace section between headers
 * @param {string} content - Full content
 * @param {string} startMarker - Start marker (header)
 * @param {string} endMarker - End marker (next header)
 * @param {string} newSection - New section content
 * @returns {string} Updated content
 */
function replaceSection(content, startMarker, endMarker, newSection) {
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    return content;
  }

  return content.substring(0, startIndex) + newSection + '\n' + content.substring(endIndex);
}

/**
 * Get default SPEC.md template
 * @returns {string} Default template
 */
function getDefaultTemplate() {
  return `# Phase [X]: [Phase Name] — Specification

**Created:** [YYYY-MM-DD]
**Phase:** [Phase Number]
**Ambiguity score:** [0.XX] (gate: ≤ 0.20)
**Requirements:** [N] locked

---

## Goal

[待填充]

---

## Background

**Current State:**

[待填充]

---

## Requirements

[待填充]

---

## Boundaries

[待填充]

---

## Acceptance Criteria

[待填充]

---

## Ambiguity Report

[待填充]

---

## Risk Assessment

[待填充]

---

*Generated by bos-flow requirement confirmation phase*
*Last updated: [YYYY-MM-DD]*
`;
}

module.exports = {
  calculateAmbiguity,
  allMinimumsMet,
  generateSpec
};
