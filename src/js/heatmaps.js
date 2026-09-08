function usageVal(day, hour) {
  const weekend = day >= 5;
  if (hour < 5) return 0;
  if (hour < 8) return 2;
  if (hour < 15) return weekend ? 2 : 1;
  if (hour < 17) return 1;
  if (hour < 22) return 3;
  return 0;
}

function costTouClass(day, hour) {
  if (hour >= 16 && hour < 21) return 'heatmap-tou-peak';
  if (hour >= 7 && hour < 12) return 'heatmap-tou-shoulder';
  if (hour >= 12 && hour < 16) return 'heatmap-tou-mid';
  if (hour >= 22 || hour < 7) return 'heatmap-tou-offpeak';
  return 'heatmap-tou-shoulder';
}

function renderHeatmaps() {
  document.querySelectorAll('.heatmap[data-heat]').forEach((grid) => {
    if (grid.childElementCount > 0) return;
    const type = grid.dataset.heat;
    for (let d = 0; d < 7; d++) {
      for (let h = 0; h < 24; h++) {
        const cell = document.createElement('div');
        if (type === 'usage') {
          const v = usageVal(d, h);
          const opacity = 0.05 + (v / 3) * 0.5;
          cell.style.background = `rgba(3, 105, 161, ${opacity})`;
        } else {
          cell.className = costTouClass(d, h);
        }
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