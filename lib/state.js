const fs = require('fs');
const path = require('path');

const STATE_FILE = path.join(__dirname, '..', 'state.json');

/**
 * Load state from file
 */
function loadState() {
  const data = fs.readFileSync(STATE_FILE, 'utf8');
  return JSON.parse(data);
}

/**
 * Save state to file
 */
function saveState(state) {
  state.last_updated = new Date().toISOString();
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

/**
 * Get phase status
 */
function getPhaseStatus(phaseId) {
  const state = loadState();
  const phase = state.phases.find(p => p.id === phaseId);
  return phase ? phase.status : null;
}

/**
 * Update phase status
 */
function updatePhaseStatus(phaseId, status) {
  const state = loadState();
  const phase = state.phases.find(p => p.id === phaseId);
  if (phase) {
    phase.status = status;
    if (status === 'in_progress' && !phase.started_at) {
      phase.started_at = new Date().toISOString();
    }
    if (status === 'complete') {
      phase.completed_at = new Date().toISOString();
    }
    saveState(state);
  }
  return phase;
}

/**
 * Get current phase
 */
function getCurrentPhase() {
  const state = loadState();
  return state.current_phase;
}

/**
 * Advance to next phase
 */
function advancePhase() {
  const state = loadState();
  if (state.current_phase < state.phases.length) {
    state.current_phase++;
    saveState(state);
  }
  return state.current_phase;
}

module.exports = {
  loadState,
  saveState,
  getPhaseStatus,
  updatePhaseStatus,
  getCurrentPhase,
  advancePhase
};