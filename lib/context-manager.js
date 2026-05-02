const fs = require('fs-extra');
const path = require('path');

/**
 * Load prior context for a given phase
 * @param {number} phaseNumber - The phase number
 * @returns {Object} Context object with project, priorPhases, and spikeSketchFindings
 */
async function loadPriorContext(phaseNumber) {
  const context = {
    project: {},
    priorPhases: [],
    spikeSketchFindings: []
  };

  try {
    // 1. Read project-level files
    const projectMdPath = path.join(process.cwd(), '.planning', 'PROJECT.md');
    const requirementsMdPath = path.join(process.cwd(), '.planning', 'REQUIREMENTS.md');
    const stateMdPath = path.join(process.cwd(), '.planning', 'STATE.md');

    context.project = {
      projectMd: await fs.pathExists(projectMdPath) ? await fs.readFile(projectMdPath, 'utf8') : null,
      requirementsMd: await fs.pathExists(requirementsMdPath) ? await fs.readFile(requirementsMdPath, 'utf8') : null,
      stateMd: await fs.pathExists(stateMdPath) ? await fs.readFile(stateMdPath, 'utf8') : null
    };

    // 2. Read prior phases' CONTEXT.md (max 3)
    const phasesDir = path.join(process.cwd(), '.planning', 'phases');
    if (await fs.pathExists(phasesDir)) {
      const phaseDirs = await fs.readdir(phasesDir);

      // Parse phase numbers and sort
      const phaseNumbers = phaseDirs
        .filter(dir => dir.match(/^\d{2}-/))
        .map(dir => {
          const match = dir.match(/^(\d{2})-/);
          return match ? parseInt(match[1], 10) : 0;
        })
        .filter(num => num > 0 && num < phaseNumber)
        .sort((a, b) => b - a)
        .slice(0, 3);

      // Read each prior phase's CONTEXT.md
      for (const phaseNum of phaseNumbers) {
        const paddedPhase = String(phaseNum).padStart(2, '0');
        const phaseDirName = phaseDirs.find(dir => dir.startsWith(paddedPhase + '-'));

        if (phaseDirName) {
          const contextPath = path.join(phasesDir, phaseDirName, 'CONTEXT.md');
          if (await fs.pathExists(contextPath)) {
            const contextMd = await fs.readFile(contextPath, 'utf8');
            const decisions = extractDecisions(contextMd);
            const specifics = extractSpecifics(contextMd);

            context.priorPhases.push({
              phase: phaseNum,
              decisions,
              specifics
            });
          }
        }
      }
    }

    // 3. Check for spike/sketch findings (optional)
    const spikePath = path.join(process.cwd(), '.planning', 'spike-findings.md');
    const sketchPath = path.join(process.cwd(), '.planning', 'sketch-findings.md');

    if (await fs.pathExists(spikePath)) {
      context.spikeSketchFindings.push({
        type: 'spike',
        content: await fs.readFile(spikePath, 'utf8')
      });
    }

    if (await fs.pathExists(sketchPath)) {
      context.spikeSketchFindings.push({
        type: 'sketch',
        content: await fs.readFile(sketchPath, 'utf8')
      });
    }

    return context;
  } catch (error) {
    console.error('Error loading prior context:', error.message);
    return context;
  }
}

/**
 * Extract decisions from CONTEXT.md text
 * @param {string} contextMd - The CONTEXT.md content
 * @returns {Array} Array of decisions with id and content
 */
function extractDecisions(contextMd) {
  if (!contextMd) return [];

  const decisions = [];
  const lines = contextMd.split('\n');

  for (const line of lines) {
    // Match pattern: **D-XX:** decision content
    const match = line.match(/\*\*D-(\d+):\*\*\s*(.+)/);
    if (match) {
      decisions.push({
        id: `D-${match[1]}`,
        content: match[2].trim()
      });
    }
  }

  return decisions;
}

/**
 * Extract specifics from CONTEXT.md
 * @param {string} contextMd - The CONTEXT.md content
 * @returns {Array} Array of specific requirements
 */
function extractSpecifics(contextMd) {
  if (!contextMd) return [];

  const specifics = [];
  const specificsMatch = contextMd.match(/<specifics>([\s\S]*?)<\/specifics>/);

  if (specificsMatch) {
    const specificsSection = specificsMatch[1];
    const lines = specificsSection.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      // Extract list items (starting with -)
      if (trimmed.startsWith('-') && trimmed.length > 1) {
        specifics.push(trimmed.substring(1).trim());
      }
    }
  }

  return specifics;
}

module.exports = {
  loadPriorContext,
  extractDecisions,
  extractSpecifics
};
