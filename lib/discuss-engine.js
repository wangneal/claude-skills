const fs = require('fs-extra');
const path = require('path');
const contextManager = require('./context-manager');
const grayAreaDetector = require('./gray-area-detector');
const decisionCapture = require('./decision-capture');

/**
 * Start discussion for a phase
 * @param {number} phaseNumber - Phase number
 * @param {Object} options - Options object
 * @returns {Object} Discussion result
 */
async function startDiscussion(phaseNumber, options = {}) {
  const { mode = 'discuss', auto = false } = options;

  console.log(`\n=== Starting Discussion for Phase ${phaseNumber} ===\n`);

  // 1. Load prior context
  console.log('1. Loading prior context...');
  const context = await contextManager.loadPriorContext(phaseNumber);

  const priorDecisions = [];
  for (const phase of context.priorPhases) {
    priorDecisions.push(...phase.decisions);
  }

  console.log(`   - Loaded ${context.priorPhases.length} prior phases`);
  console.log(`   - Found ${priorDecisions.length} prior decisions`);

  // 2. Scout codebase
  console.log('\n2. Scouting codebase...');
  const codebaseContext = await scoutCodebase(phaseNumber);
  console.log(`   - Has Card component: ${codebaseContext.hasCardComponent || false}`);
  console.log(`   - Has Auth module: ${codebaseContext.hasAuthModule || false}`);

  // 3. Identify gray areas
  console.log('\n3. Identifying gray areas...');
  const phaseGoal = `Phase ${phaseNumber} implementation`; // In real implementation, load from ROADMAP.md
  const grayAreas = grayAreaDetector.identifyGrayAreas(phaseGoal, priorDecisions, codebaseContext);

  console.log(`   - Found ${grayAreas.length} gray areas`);

  if (grayAreas.length === 0) {
    console.log('\n✓ No gray areas found. Ready for planning.');
    return {
      success: true,
      grayAreas: [],
      decisions: [],
      contextPath: null
    };
  }

  // 4. Display gray areas
  console.log('\n4. Gray areas to discuss:\n');
  grayAreas.forEach((area, index) => {
    console.log(`   ${index + 1}. ${area.name}`);
    console.log(`      Question: ${area.question}`);
    if (area.context) {
      console.log(`      Context: ${area.context}`);
    }
  });

  // 5. User selects areas (simulated for now)
  console.log('\n5. Selecting areas for discussion...');
  let selectedAreas = [];

  if (auto) {
    // Auto mode: select first 3 areas
    selectedAreas = grayAreas.slice(0, 3);
    console.log('   - Auto mode: selected first 3 areas');
  } else {
    // Interactive mode: simulate selection of first 2 areas
    selectedAreas = grayAreas.slice(0, 2);
    console.log(`   - Selected ${selectedAreas.length} areas (simulated)`);

    // In real implementation, use askUserMultiSelect()
    // selectedAreas = await askUserMultiSelect('Discuss', 'Which areas do you want to discuss?', grayAreas);
  }

  // 6. Discuss each area
  console.log('\n6. Discussing selected areas...');
  const decisions = [];

  for (const area of selectedAreas) {
    console.log(`\n   Discussing: ${area.name}`);
    const decision = await discussArea(area, decisions, auto);
    decisions.push(decision);
    console.log(`   - Decision: ${decision.id} - ${decision.decision}`);
  }

  // 7. Write CONTEXT.md
  console.log('\n7. Writing CONTEXT.md...');

  const phaseDir = path.join(process.cwd(), '.planning', 'phases', String(phaseNumber).padStart(2, '0') + '-requirement-confirmation');
  const phaseName = 'Requirement Confirmation';
  const specifics = [];
  const deferred = [];

  const contextPath = await decisionCapture.writeContext(
    phaseDir,
    phaseNumber,
    phaseName,
    decisions,
    specifics,
    deferred
  );

  console.log(`   - Written to: ${contextPath}`);

  // 8. Summary
  console.log('\n=== Discussion Complete ===\n');
  console.log(`Decisions captured: ${decisions.length}`);
  console.log(`Context file: ${contextPath}`);

  return {
    success: true,
    grayAreas,
    selectedAreas,
    decisions,
    contextPath
  };
}

/**
 * Scout codebase for context
 * @param {number} phaseNumber - Phase number
 * @returns {Object} Codebase context
 */
async function scoutCodebase(phaseNumber) {
  const codebaseContext = {
    hasCardComponent: false,
    hasAuthModule: false,
    hasDataService: false
  };

  try {
    // Check for common components
    const srcDir = path.join(process.cwd(), 'src');

    if (await fs.pathExists(srcDir)) {
      const files = await fs.readdir(srcDir, { recursive: true });

      // Simple check for component files
      for (const file of files) {
        if (typeof file === 'string') {
          const fileLower = file.toLowerCase();
          if (fileLower.includes('card') && fileLower.endsWith('.js')) {
            codebaseContext.hasCardComponent = true;
          }
          if (fileLower.includes('auth') && fileLower.endsWith('.js')) {
            codebaseContext.hasAuthModule = true;
          }
          if (fileLower.includes('service') && fileLower.endsWith('.js')) {
            codebaseContext.hasDataService = true;
          }
        }
      }
    }

    return codebaseContext;
  } catch (error) {
    console.error('Error scouting codebase:', error.message);
    return codebaseContext;
  }
}

/**
 * Discuss a single gray area
 * @param {Object} area - Gray area object
 * @param {Array} existingDecisions - Existing decisions
 * @param {boolean} auto - Auto mode flag
 * @returns {Object} Decision object
 */
async function discussArea(area, existingDecisions, auto = false) {
  console.log(`   Question: ${area.question}`);

  if (area.options && area.options.length > 0) {
    console.log('   Options:');
    area.options.forEach((opt, index) => {
      console.log(`     ${index + 1}. ${opt.label}: ${opt.description}`);
    });
  }

  let choice;

  if (auto) {
    // Auto mode: select first option
    choice = area.options && area.options[0] ? area.options[0].label : 'Default choice';
    console.log(`   - Auto-selected: ${choice}`);
  } else {
    // Interactive mode: simulate selection of first option
    choice = area.options && area.options[0] ? area.options[0].label : 'Default choice';
    console.log(`   - Selected: ${choice} (simulated)`);

    // In real implementation, use askUser()
    // choice = await askUser(area.name, 'Which option?', area.options.map(o => o.label));
  }

  // Capture decision
  const decision = decisionCapture.captureDecision(area.name, choice, existingDecisions);

  return decision;
}

/**
 * Ask user to select multiple options (placeholder for future interactive implementation)
 * @param {string} title - Question title
 * @param {string} question - Question text
 * @param {Array} options - Options array
 * @returns {Array} Selected options (simulated: returns first 2)
 */
async function askUserMultiSelect(title, question, options) {
  console.log(`\n${title}: ${question}`);

  options.forEach((opt, index) => {
    const label = typeof opt === 'string' ? opt : opt.name || opt.label;
    console.log(`  ${index + 1}. ${label}`);
  });

  // Simulate selection of first 2 options
  const selected = options.slice(0, 2);
  console.log(`\n  Selected: ${selected.map(o => typeof o === 'string' ? o : o.name || o.label).join(', ')} (simulated)`);

  return selected;

  // In real implementation with inquirer:
  // const inquirer = require('inquirer');
  // const answers = await inquirer.prompt([
  //   {
  //     type: 'checkbox',
  //     name: 'selected',
  //     message: question,
  //     choices: options.map(o => ({ name: typeof o === 'string' ? o : o.name || o.label }))
  //   }
  // ]);
  // return answers.selected;
}

module.exports = {
  startDiscussion,
  scoutCodebase,
  askUserMultiSelect
};
