const fs = require('fs-extra');
const path = require('path');

/**
 * Capture a decision and auto-assign ID
 * @param {string} area - The gray area name
 * @param {string} choice - The user's choice
 * @param {Array} existingDecisions - Array of existing decisions
 * @returns {Object} Decision object with id, area, and decision
 */
function captureDecision(area, choice, existingDecisions = []) {
  // Determine next decision ID
  const maxId = existingDecisions.reduce((max, dec) => {
    if (dec.id && dec.id.startsWith('D-')) {
      const num = parseInt(dec.id.substring(2), 10);
      return num > max ? num : max;
    }
    return max;
  }, 0);

  const nextId = `D-${String(maxId + 1).padStart(2, '0')}`;

  return {
    id: nextId,
    area: area,
    decision: choice
  };
}

/**
 * Write CONTEXT.md file
 * @param {string} phaseDir - Phase directory path
 * @param {number} phaseNumber - Phase number
 * @param {string} phaseName - Phase name
 * @param {Array} decisions - Array of decisions
 * @param {Array} specifics - Array of specific requirements
 * @param {Array} deferred - Array of deferred ideas
 * @returns {string} File path of written CONTEXT.md
 */
async function writeContext(phaseDir, phaseNumber, phaseName, decisions = [], specifics = [], deferred = []) {
  const paddedPhase = String(phaseNumber).padStart(2, '0');
  const fileName = `${paddedPhase}-CONTEXT.md`;
  const filePath = path.join(phaseDir, fileName);

  // Read template
  const templatePath = path.join(process.cwd(), '.bos-flow', 'templates', 'CONTEXT.md');
  let template = '';

  if (await fs.pathExists(templatePath)) {
    template = await fs.readFile(templatePath, 'utf8');
  } else {
    // Use default template if file doesn't exist
    template = getDefaultTemplate();
  }

  // Replace placeholders
  const today = new Date().toISOString().split('T')[0];

  let content = template
    .replace(/\[X\]/g, paddedPhase)
    .replace(/\[Phase Name\]/g, phaseName)
    .replace(/\[YYYY-MM-DD\]/g, today)
    .replace(/\[Phase Number\]/g, paddedPhase);

  // Generate decisions section
  const decisionsSection = generateDecisionsSection(decisions);
  content = replaceSection(content, '<decisions>', '</decisions>', decisionsSection);

  // Generate specifics section
  const specificsSection = generateSpecificsSection(specifics);
  content = replaceSection(content, '<specifics>', '</specifics>', specificsSection);

  // Generate deferred section
  const deferredSection = generateDeferredSection(deferred);
  content = replaceSection(content, '<deferred>', '</deferred>', deferredSection);

  // Ensure phase directory exists
  await fs.ensureDir(phaseDir);

  // Write file
  await fs.writeFile(filePath, content, 'utf8');

  return filePath;
}

/**
 * Generate decisions section content
 * @param {Array} decisions - Array of decisions
 * @returns {string} Formatted decisions section
 */
function generateDecisionsSection(decisions) {
  if (decisions.length === 0) {
    return `## Implementation Decisions

No decisions captured yet.`;
  }

  // Group decisions by area
  const grouped = {};
  for (const dec of decisions) {
    const area = dec.area || 'General';
    if (!grouped[area]) {
      grouped[area] = [];
    }
    grouped[area].push(dec);
  }

  let content = '## Implementation Decisions\n\n';

  for (const [area, decs] of Object.entries(grouped)) {
    content += `### ${area}\n\n`;
    for (const dec of decs) {
      content += `- **${dec.id}:** ${dec.decision}\n`;
    }
    content += '\n';
  }

  content += `### Claude's Discretion

The following areas are left to Claude's discretion based on best practices and project context:

- Specific implementation details that don't affect core functionality
- Code organization and naming conventions
- Error handling strategies
- Logging levels and formats
`;

  return content;
}

/**
 * Generate specifics section content
 * @param {Array} specifics - Array of specific requirements
 * @returns {string} Formatted specifics section
 */
function generateSpecificsSection(specifics) {
  if (specifics.length === 0) {
    return `## Specific Ideas

No specific requirements captured yet.`;
  }

  let content = '## Specific Ideas\n\n**User-specific requirements:**\n\n';

  for (const specific of specifics) {
    content += `- ${specific}\n`;
  }

  return content;
}

/**
 * Generate deferred section content
 * @param {Array} deferred - Array of deferred ideas
 * @returns {string} Formatted deferred section
 */
function generateDeferredSection(deferred) {
  if (deferred.length === 0) {
    return `## Deferred Ideas

No ideas deferred to future phases.`;
  }

  let content = '## Deferred Ideas\n\n';
  content += 'The following ideas were mentioned during requirements discussion but deferred to later phases:\n\n';

  for (const item of deferred) {
    content += `- **${item.name || 'Item'}** — ${item.reason || 'No reason provided'}\n`;
  }

  return content;
}

/**
 * Replace section between markers
 * @param {string} content - Full content
 * @param {string} startMarker - Start marker
 * @param {string} endMarker - End marker
 * @param {string} newSection - New section content
 * @returns {string} Updated content
 */
function replaceSection(content, startMarker, endMarker, newSection) {
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    return content;
  }

  return content.substring(0, startIndex + startMarker.length) +
    '\n' + newSection + '\n' +
    content.substring(endIndex);
}

/**
 * Get default CONTEXT.md template
 * @returns {string} Default template
 */
function getDefaultTemplate() {
  return `# Phase [X]: [Phase Name] - Context

**Gathered:** [YYYY-MM-DD]
**Phase:** [Phase Number]
**Status:** Ready for planning

---

<domain>
## Phase Boundary

**Goal:** [来自 ROADMAP.md 的阶段目标]

**Scope:**
- [明确列出此阶段包含的内容]

**Out of Scope:**
- [明确列出此阶段不包含的内容]

**Context from Prior Phases:**
- Phase [X-1]: [前置阶段名称] - [关键决策摘要]

</domain>

<decisions>
## Implementation Decisions

[待填充]

</decisions>

<canonical_refs>
## Canonical References

**下游代理必须阅读这些文档以确保一致性。**

- \`.planning/ROADMAP.md\` — 项目路线图
- \`.planning/REQUIREMENTS.md\` — 需求追踪矩阵

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

**可用组件:**
- [待填充]

**可用模式:**
- [待填充]

</code_context>

<specifics>
## Specific Ideas

[待填充]

</specifics>

<deferred>
## Deferred Ideas

[待填充]

</deferred>

---

*Generated by bos-flow requirement confirmation phase*
*Last updated: [YYYY-MM-DD]*
`;
}

module.exports = {
  captureDecision,
  writeContext
};
