const USAGE_COLORS = ['#23403c', '#3fa08a', '#d9a021', '#f0563a'];
const COST_COLORS = ['#2b4c7e', '#d9a021', '#f0563a'];

function usageVal(day, hour) {
  const weekend = day >= 5;
  if (hour < 5) return 0;
  if (hour < 8) return 2;
  if (hour < 15) return weekend ? 2 : 1;
  if (hour < 17) return 1;
  if (hour < 22) return 3;
  return 0;
}

function costVal(day, hour) {
  if (hour < 7 || hour >= 22) return 0;
  if (hour < 14 || hour >= 20) return 1;
  return 2;
}

function renderHeatmaps() {
  document.querySelectorAll('.heat-grid[data-heat]').forEach((grid) => {
    if (grid.childElementCount > 0) return;
    const type = grid.dataset.heat;
    for (let d = 0; d < 8; d++) {
      for (let h = 0; h < 24; h++) {
        const cell = document.createElement('span');
        const v = type === 'usage' ? usageVal(d, h) : costVal(d, h);
        cell.style.background = (type === 'usage' ? USAGE_COLORS : COST_COLORS)[v];
        grid.appendChild(cell);
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderHeatmaps);
} else {
  renderHeatmaps();
}

export { renderHeatmaps };