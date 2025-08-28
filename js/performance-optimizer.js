/**
 * DoganConsult Performance Optimizer
 * Comprehensive performance optimization and monitoring
 */

class DoganConsultPerformanceOptimizer {
    constructor() {
        this.metrics = {
            loadTime: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            cumulativeLayoutShift: 0,
            firstInputDelay: 0
        };
        this.optimizations = [];
        this.recommendations = [];
    }

    // Initialize performance monitoring
    initialize() {
        console.log('🚀 DoganConsult Performance Optimizer initialized');
        this.setupPerformanceMonitoring();
        this.runPerformanceAudit();
        this.optimizeImages();
        this.optimizeCSS();
        this.optimizeJavaScript();
        this.setupLazyLoading();
        this.enableCaching();
    }

    // Setup performance monitoring
    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            // First Contentful Paint
            const fcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    this.metrics.firstContentfulPaint = entry.startTime;
                    console.log('FCP:', entry.startTime);
                });
            });
            fcpObserver.observe({ entryTypes: ['paint'] });

            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.largestContentfulPaint = lastEntry.startTime;
                console.log('LCP:', lastEntry.startTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // Cumulative Layout Shift
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                this.metrics.cumulativeLayoutShift = clsValue;
                console.log('CLS:', clsValue);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });

            // First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
                    console.log('FID:', this.metrics.firstInputDelay);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        }

        // Monitor page load time
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.metrics.loadTime = loadTime;
            console.log('Page Load Time:', loadTime);
            this.generatePerformanceReport();
        });
    }

    // Run comprehensive performance audit
    runPerformanceAudit() {
        console.log('🔍 Running performance audit...');
        
        // Check for common performance issues
        this.checkImageOptimization();
        this.checkCSSOptimization();
        this.checkJavaScriptOptimization();
        this.checkResourceLoading();
        this.checkCaching();
        this.checkCompression();
        
        console.log('✅ Performance audit completed');
    }

    // Check image optimization
    checkImageOptimization() {
        const images = document.querySelectorAll('img');
        let unoptimizedImages = 0;
        let totalImageSize = 0;

        images.forEach(img => {
            const src = img.src;
            const width = img.naturalWidth || img.width;
            const height = img.naturalHeight || img.height;

            // Check for missing alt attributes
            if (!img.alt) {
                this.recommendations.push('Add alt attributes to images for accessibility');
            }

            // Check for large images
            if (width > 1920 || height > 1080) {
                unoptimizedImages++;
                this.recommendations.push(`Optimize large image: ${src}`);
            }

            // Check for missing lazy loading
            if (!img.loading) {
                this.recommendations.push('Add lazy loading to images');
            }
        });

        if (unoptimizedImages > 0) {
            this.optimizations.push(`Found ${unoptimizedImages} unoptimized images`);
        }
    }

    // Check CSS optimization
    checkCSSOptimization() {
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        let inlineStyles = 0;
        let externalStylesheets = stylesheets.length;

        // Check for inline styles
        const styleTags = document.querySelectorAll('style');
        inlineStyles = styleTags.length;

        if (inlineStyles > 0) {
            this.recommendations.push('Consider moving inline styles to external stylesheets');
        }

        if (externalStylesheets > 5) {
            this.recommendations.push('Consider combining multiple stylesheets');
        }

        // Check for unused CSS
        this.checkUnusedCSS();
    }

    // Check JavaScript optimization
    checkJavaScriptOptimization() {
        const scripts = document.querySelectorAll('script');
        let inlineScripts = 0;
        let externalScripts = 0;

        scripts.forEach(script => {
            if (script.src) {
                externalScripts++;
            } else {
                inlineScripts++;
            }
        });

        if (inlineScripts > 0) {
            this.recommendations.push('Consider moving inline scripts to external files');
        }

        if (externalScripts > 10) {
            this.recommendations.push('Consider bundling JavaScript files');
        }

        // Check for render-blocking scripts
        this.checkRenderBlockingScripts();
    }

    // Check resource loading
    checkResourceLoading() {
        const resources = performance.getEntriesByType('resource');
        let slowResources = 0;

        resources.forEach(resource => {
            if (resource.duration > 1000) {
                slowResources++;
                this.recommendations.push(`Slow resource: ${resource.name} (${resource.duration}ms)`);
            }
        });

        if (slowResources > 0) {
            this.optimizations.push(`Found ${slowResources} slow-loading resources`);
        }
    }

    // Check caching
    checkCaching() {
        const resources = performance.getEntriesByType('resource');
        let uncachedResources = 0;

        resources.forEach(resource => {
            // Check if resource is cached (simplified check)
            if (resource.transferSize > 0 && resource.transferSize === resource.encodedBodySize) {
                uncachedResources++;
            }
        });

        if (uncachedResources > 0) {
            this.recommendations.push('Implement proper caching headers for static resources');
        }
    }

    // Check compression
    checkCompression() {
        // This would typically be checked server-side
        this.recommendations.push('Ensure gzip/brotli compression is enabled on the server');
    }

    // Optimize images
    optimizeImages() {
        console.log('🖼️ Optimizing images...');
        
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add lazy loading
            if (!img.loading) {
                img.loading = 'lazy';
            }

            // Add decoding attribute
            if (!img.decoding) {
                img.decoding = 'async';
            }

            // Add alt attribute if missing
            if (!img.alt) {
                img.alt = 'DoganConsult image';
            }
        });

        this.optimizations.push('Applied lazy loading to images');
    }

    // Optimize CSS
    optimizeCSS() {
        console.log('🎨 Optimizing CSS...');
        
        // Critical CSS inlining (simplified)
        const criticalStyles = `
            body { font-family: 'Inter', sans-serif; }
            .hero { height: 100vh; }
            .services-section { padding: 100px 0; }
        `;

        // Add critical CSS inline
        if (!document.querySelector('#critical-css')) {
            const style = document.createElement('style');
            style.id = 'critical-css';
            style.textContent = criticalStyles;
            document.head.insertBefore(style, document.head.firstChild);
        }

        this.optimizations.push('Inlined critical CSS');
    }

    // Optimize JavaScript
    optimizeJavaScript() {
        console.log('⚡ Optimizing JavaScript...');
        
        // Defer non-critical scripts
        const scripts = document.querySelectorAll('script:not([async]):not([defer])');
        scripts.forEach(script => {
            if (!script.src.includes('critical')) {
                script.defer = true;
            }
        });

        this.optimizations.push('Deferred non-critical JavaScript');
    }

    // Setup lazy loading
    setupLazyLoading() {
        console.log('🔄 Setting up lazy loading...');
        
        // Intersection Observer for lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        this.optimizations.push('Implemented lazy loading with Intersection Observer');
    }

    // Enable caching
    enableCaching() {
        console.log('💾 Setting up caching...');
        
        // Service Worker for caching (simplified)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered');
                    this.optimizations.push('Service Worker caching enabled');
                })
                .catch(error => {
                    console.log('Service Worker registration failed');
                });
        }
    }

    // Check unused CSS (simplified)
    checkUnusedCSS() {
        // This would typically use tools like PurgeCSS
        this.recommendations.push('Consider using PurgeCSS to remove unused CSS');
    }

    // Check render-blocking scripts
    checkRenderBlockingScripts() {
        const scripts = document.querySelectorAll('script');
        let renderBlocking = 0;

        scripts.forEach(script => {
            if (!script.async && !script.defer && script.src) {
                renderBlocking++;
            }
        });

        if (renderBlocking > 0) {
            this.recommendations.push(`Found ${renderBlocking} render-blocking scripts`);
        }
    }

    // Generate performance report
    generatePerformanceReport() {
        const report = {
            timestamp: new Date().toISOString(),
            metrics: this.metrics,
            optimizations: this.optimizations,
            recommendations: this.recommendations,
            score: this.calculatePerformanceScore()
        };

        console.log('📊 Performance Report:', report);
        this.displayPerformanceReport(report);
        return report;
    }

    // Calculate performance score
    calculatePerformanceScore() {
        let score = 100;

        // Deduct points for poor metrics
        if (this.metrics.loadTime > 3000) score -= 20;
        if (this.metrics.firstContentfulPaint > 1800) score -= 15;
        if (this.metrics.largestContentfulPaint > 2500) score -= 15;
        if (this.metrics.cumulativeLayoutShift > 0.1) score -= 10;
        if (this.metrics.firstInputDelay > 100) score -= 10;

        // Deduct points for optimization issues
        score -= this.optimizations.length * 2;
        score -= this.recommendations.length;

        return Math.max(0, Math.min(100, score));
    }

    // Display performance report
    displayPerformanceReport(report) {
        const reportContainer = document.createElement('div');
        reportContainer.className = 'performance-report';
        reportContainer.innerHTML = `
            <div class="report-header">
                <h3>🚀 Performance Report</h3>
                <div class="performance-score">
                    <span class="score">${report.score}</span>
                    <span class="score-label">/100</span>
                </div>
            </div>
            <div class="report-metrics">
                <h4>Core Web Vitals</h4>
                <div class="metric-grid">
                    <div class="metric">
                        <span class="metric-label">Load Time</span>
                        <span class="metric-value">${report.metrics.loadTime.toFixed(0)}ms</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">FCP</span>
                        <span class="metric-value">${report.metrics.firstContentfulPaint.toFixed(0)}ms</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">LCP</span>
                        <span class="metric-value">${report.metrics.largestContentfulPaint.toFixed(0)}ms</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">CLS</span>
                        <span class="metric-value">${report.metrics.cumulativeLayoutShift.toFixed(3)}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">FID</span>
                        <span class="metric-value">${report.metrics.firstInputDelay.toFixed(0)}ms</span>
                    </div>
                </div>
            </div>
            <div class="report-optimizations">
                <h4>Applied Optimizations</h4>
                <ul>
                    ${report.optimizations.map(opt => `<li>✅ ${opt}</li>`).join('')}
                </ul>
            </div>
            <div class="report-recommendations">
                <h4>Recommendations</h4>
                <ul>
                    ${report.recommendations.map(rec => `<li>💡 ${rec}</li>`).join('')}
                </ul>
            </div>
        `;

        // Add styles for the report
        const styles = `
            <style>
                .performance-report {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
                    border: 2px solid #ffd700;
                    border-radius: 15px;
                    padding: 25px;
                    max-width: 400px;
                    color: white;
                    z-index: 1000;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }
                .report-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid rgba(255, 215, 0, 0.3);
                }
                .report-header h3 {
                    color: #ffd700;
                    margin: 0;
                }
                .performance-score {
                    text-align: center;
                }
                .score {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #ffd700;
                }
                .score-label {
                    color: #c0c0c0;
                }
                .report-metrics h4,
                .report-optimizations h4,
                .report-recommendations h4 {
                    color: #ffd700;
                    margin-bottom: 15px;
                }
                .metric-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .metric {
                    background: rgba(0, 0, 0, 0.3);
                    padding: 10px;
                    border-radius: 8px;
                    text-align: center;
                }
                .metric-label {
                    display: block;
                    font-size: 0.9rem;
                    color: #c0c0c0;
                    margin-bottom: 5px;
                }
                .metric-value {
                    display: block;
                    font-weight: bold;
                    color: #4CAF50;
                }
                .report-optimizations ul,
                .report-recommendations ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .report-optimizations li,
                .report-recommendations li {
                    padding: 8px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    font-size: 0.9rem;
                }
                .report-optimizations li:last-child,
                .report-recommendations li:last-child {
                    border-bottom: none;
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.appendChild(reportContainer);

        // Auto-hide after 10 seconds
        setTimeout(() => {
            reportContainer.style.opacity = '0';
            reportContainer.style.transform = 'translateX(100%)';
            setTimeout(() => reportContainer.remove(), 500);
        }, 10000);
    }

    // Run Lighthouse audit (simplified simulation)
    runLighthouseAudit() {
        console.log('🔍 Running Lighthouse audit simulation...');
        
        // Simulate Lighthouse metrics
        const lighthouseResults = {
            performance: this.calculatePerformanceScore(),
            accessibility: 95,
            bestPractices: 90,
            seo: 92,
            progressiveWebApp: 85
        };

        console.log('📊 Lighthouse Results:', lighthouseResults);
        return lighthouseResults;
    }
}

// Initialize performance optimizer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.performanceOptimizer = new DoganConsultPerformanceOptimizer();
    window.performanceOptimizer.initialize();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DoganConsultPerformanceOptimizer;
}
