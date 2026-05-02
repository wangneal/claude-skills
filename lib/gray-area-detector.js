/**
 * Identify gray areas in requirements
 * @param {string} phaseGoal - The phase goal description
 * @param {Array} priorDecisions - Array of prior decisions
 * @param {Object} codebaseContext - Codebase context information
 * @returns {Array} Array of gray areas with name, question, and options
 */
function identifyGrayAreas(phaseGoal, priorDecisions = [], codebaseContext = {}) {
  const grayAreas = [];

  // Extract decided areas from prior decisions
  const decidedAreas = new Set();
  for (const decision of priorDecisions) {
    if (decision.content) {
      // Extract key terms from decision content
      const terms = decision.content.toLowerCase().split(/\s+/);
      terms.forEach(term => {
        if (term.length > 3) {
          decidedAreas.add(term);
        }
      });
    }
  }

  // Generate gray areas based on keywords in phase goal
  const goalLower = phaseGoal.toLowerCase();

  // UI-related gray areas
  if (goalLower.includes('界面') || goalLower.includes('ui') || goalLower.includes('界面')) {
    if (!decidedAreas.has('layout') && !decidedAreas.has('布局')) {
      grayAreas.push({
        name: 'Layout Style',
        question: 'Cards vs list vs timeline?',
        options: [
          { label: 'Card-based', description: 'Modern feel, shadows, rounded corners' },
          { label: 'List', description: 'Compact, efficient for large datasets' },
          { label: 'Timeline', description: 'Chronological, good for events' }
        ],
        context: codebaseContext.hasCardComponent ? 'You already have a Card component' : null
      });
    }

    if (!decidedAreas.has('loading') && !decidedAreas.has('加载')) {
      grayAreas.push({
        name: 'Loading Behavior',
        question: 'Infinite scroll vs pagination?',
        options: [
          { label: 'Infinite scroll', description: 'Seamless experience, good for mobile' },
          { label: 'Pagination', description: 'Predictable navigation, good for desktop' },
          { label: 'Load more button', description: 'Hybrid approach, user-controlled' }
        ],
        context: null
      });
    }

    if (!decidedAreas.has('interaction') && !decidedAreas.has('交互')) {
      grayAreas.push({
        name: 'Interaction Mode',
        question: 'Click vs hover vs drag?',
        options: [
          { label: 'Click-based', description: 'Explicit actions, accessible' },
          { label: 'Hover-based', description: 'Faster for power users' },
          { label: 'Drag-and-drop', description: 'Intuitive for reordering' }
        ],
        context: null
      });
    }
  }

  // Data-related gray areas
  if (goalLower.includes('数据') || goalLower.includes('data')) {
    if (!decidedAreas.has('datasource') && !decidedAreas.has('数据源')) {
      grayAreas.push({
        name: 'Data Source',
        question: 'Single source vs multiple sources?',
        options: [
          { label: 'Single database', description: 'Simpler, consistent data' },
          { label: 'Multiple sources', description: 'Flexible, may need aggregation' },
          { label: 'External API', description: 'Real-time data, dependency on service' }
        ],
        context: null
      });
    }

    if (!decidedAreas.has('cache') && !decidedAreas.has('缓存')) {
      grayAreas.push({
        name: 'Caching Strategy',
        question: 'No cache vs client cache vs server cache?',
        options: [
          { label: 'No cache', description: 'Always fresh data, more requests' },
          { label: 'Client-side cache', description: 'Faster reads, stale data risk' },
          { label: 'Server-side cache', description: 'Balanced, shared across clients' }
        ],
        context: null
      });
    }

    if (!decidedAreas.has('pagination') && !decidedAreas.has('分页')) {
      grayAreas.push({
        name: 'Pagination Method',
        question: 'Offset vs cursor vs page-based?',
        options: [
          { label: 'Offset-based', description: 'Simple, but may miss items on changes' },
          { label: 'Cursor-based', description: 'Reliable, good for real-time data' },
          { label: 'Page-based', description: 'Traditional, user-friendly navigation' }
        ],
        context: null
      });
    }
  }

  // API-related gray areas
  if (goalLower.includes('api') || goalLower.includes('接口')) {
    if (!decidedAreas.has('error') && !decidedAreas.has('错误')) {
      grayAreas.push({
        name: 'Error Handling',
        question: 'Silent fail vs explicit error vs retry?',
        options: [
          { label: 'Silent fail', description: 'Graceful degradation, may hide issues' },
          { label: 'Explicit error', description: 'Clear feedback, may interrupt flow' },
          { label: 'Auto retry', description: 'Resilient, may cause delays' }
        ],
        context: null
      });
    }

    if (!decidedAreas.has('auth') && !decidedAreas.has('认证')) {
      grayAreas.push({
        name: 'Authentication Method',
        question: 'Session vs token vs OAuth?',
        options: [
          { label: 'Session-based', description: 'Simple, server-side storage' },
          { label: 'Token-based', description: 'Stateless, scalable' },
          { label: 'OAuth', description: 'Delegate to provider, user-friendly' }
        ],
        context: null
      });
    }

    if (!decidedAreas.has('versioning') && !decidedAreas.has('版本')) {
      grayAreas.push({
        name: 'API Versioning',
        question: 'URL vs header vs parameter?',
        options: [
          { label: 'URL-based', description: '/v1/resource, explicit and visible' },
          { label: 'Header-based', description: 'Clean URLs, requires header config' },
          { label: 'Parameter-based', description: '?version=1, simple but less RESTful' }
        ],
        context: null
      });
    }
  }

  // Performance-related gray areas
  if (goalLower.includes('性能') || goalLower.includes('performance')) {
    if (!decidedAreas.has('optimization') && !decidedAreas.has('优化')) {
      grayAreas.push({
        name: 'Optimization Priority',
        question: 'Speed vs memory vs bandwidth?',
        options: [
          { label: 'Speed-first', description: 'Fast response, more memory/bandwidth' },
          { label: 'Memory-first', description: 'Low memory usage, may be slower' },
          { label: 'Bandwidth-first', description: 'Minimal data transfer, may need caching' }
        ],
        context: null
      });
    }
  }

  // Return max 10 gray areas
  return grayAreas.slice(0, 10);
}

module.exports = {
  identifyGrayAreas
};
