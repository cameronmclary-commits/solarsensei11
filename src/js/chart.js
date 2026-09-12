const CHART_COLORS = {
  solar: 'var(--amber)',
  grid: 'var(--orange)',
  battery: '#997aee',
  export: 'var(--teal2)'
};

const CHART_LABELS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 24;
  return hour === 0 ? '12am' : hour < 12 ? `${hour}am` : hour === 12 ? '12pm' : `${hour - 12}pm`;
});

const CHART_DATA = {
  labels: CHART_LABELS,
  datasets: [
    {
      label: 'Solar Generation (kWh)',
      data: [0, 0, 0, 0, 0, 0, 0.2, 1.8, 4.2, 5.8, 6.5, 6.8, 6.5, 5.8, 4.2, 2.8, 1.2, 0.3, 0, 0, 0, 0, 0, 0],
      borderColor: CHART_COLORS.solar,
      backgroundColor: (ctx) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(246, 173, 25, 0.4)');
        gradient.addColorStop(1, 'rgba(246, 173, 25, 0)');
        return gradient;
      },
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointBackgroundColor: CHART_COLORS.solar,
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    },
    {
      label: 'Grid Import (kWh)',
      data: [0.8, 0.7, 0.6, 0.5, 0.5, 0.6, 1.2, 1.5, 0.8, 0.3, 0.1, 0, 0, 0, 0, 0, 0.2, 0.8, 1.5, 1.8, 1.6, 1.4, 1.1, 0.9],
      borderColor: CHART_COLORS.grid,
      backgroundColor: (ctx) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(214, 74, 33, 0.3)');
        gradient.addColorStop(1, 'rgba(214, 74, 33, 0)');
        return gradient;
      },
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointBackgroundColor: CHART_COLORS.grid,
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    },
    {
      label: 'Battery Discharge (kWh)',
      data: [0.3, 0.3, 0.3, 0.3, 0.3, 0.4, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0.8, 1.2, 1.0, 0.7, 0.5, 0.4],
      borderColor: CHART_COLORS.battery,
      backgroundColor: (ctx) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(153, 122, 238, 0.3)');
        gradient.addColorStop(1, 'rgba(153, 122, 238, 0)');
        return gradient;
      },
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointBackgroundColor: CHART_COLORS.battery,
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    },
    {
      label: 'Solar Export (kWh)',
      data: [0, 0, 0, 0, 0, 0, 0, 0.5, 2.0, 3.5, 4.2, 4.5, 4.2, 3.5, 2.0, 0.8, 0, 0, 0, 0, 0, 0, 0, 0],
      borderColor: CHART_COLORS.export,
      backgroundColor: (ctx) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(17, 168, 144, 0.3)');
        gradient.addColorStop(1, 'rgba(17, 168, 144, 0)');
        return gradient;
      },
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointBackgroundColor: CHART_COLORS.export,
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }
  ]
};

const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'var(--surface)',
      titleColor: 'var(--text)',
      bodyColor: 'var(--text)',
      borderColor: 'var(--line)',
      borderWidth: 1,
      padding: 16,
      cornerRadius: 12,
      displayColors: true,
      usePointStyle: true,
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(1)} kWh`
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: 'var(--muted)',
        font: { size: 11, weight: 500 },
        maxTicksLimit: 8,
        callback: (value, index) => index % 3 === 0 ? CHART_LABELS[index] : ''
      }
    },
    y: {
      grid: {
        color: 'var(--line)',
        drawBorder: false
      },
      ticks: {
        color: 'var(--muted)',
        font: { size: 11 },
        stepSize: 1
      },
      min: 0,
      max: 7
    }
  },
  animation: {
    duration: 1000,
    easing: 'easeOutQuart'
  }
};

let chartInstance = null;

function initChart() {
  const canvas = document.getElementById('energyChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: CHART_DATA,
    options: CHART_OPTIONS
  });

  const legendContainer = document.getElementById('chartLegend');
  if (!legendContainer) return;

  const legendItems = CHART_DATA.datasets.map((ds) => `
    <span class="legend-item">
      <i style="background:${ds.borderColor}"></i>
      ${ds.label}
    </span>
  `).join('');
  legendContainer.innerHTML = legendItems;
}

function updateChartTheme() {
  if (chartInstance) {
    chartInstance.update('none');
  }
}

function initChartWhenReady() {
  if (typeof Chart === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
    script.onload = initChart;
    document.head.appendChild(script);
  } else {
    initChart();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChartWhenReady);
} else {
  initChartWhenReady();
}

const observer = new MutationObserver(() => {
  updateChartTheme();
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

export { initChart, updateChartTheme };