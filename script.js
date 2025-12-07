// 传统脚本版本 - 用于解决ES模块在本地文件系统中的跨域问题

// 全局变量
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    init();
});

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 初始化函数
function init() {
    // 添加动画样式
    addAnimationStyles();
    
    // 添加页面进入动画
    addPageEnterAnimation();
    
    // 计算年龄并实时更新
    startRealTimeUpdate('2010-07-24', 'timeInfo');
    
    // 优化图片加载
    optimizeImageLoading();
    
    // 添加页面过渡效果
    addPageTransitions();
    
    // 添加滚动效果
    addScrollEffects();
    
    // 添加卡片悬停效果
    addCardHoverEffects();
    
    // 初始化访问统计
    initializeVisitorTracking();
    
    // 添加渐显动画
    addFadeInAnimations();
}

// 时间计算功能
function calculateTimeDifference(birthDateStr) {
    const birthDate = new Date(birthDateStr);
    const currentDate = new Date();
    
    const diffTime = Math.abs(currentDate - birthDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffSeconds = Math.floor(diffTime / 1000);
    
    return {
        days: diffDays,
        hours: diffHours % 24,
        minutes: diffMinutes % 60,
        seconds: diffSeconds % 60
    };
}

function updateTimeInfo(birthDateStr, elementId) {
    const timeInfoElement = document.getElementById(elementId);
    if (!timeInfoElement) return;
    
    const timeDiff = calculateTimeDifference(birthDateStr);
    
    timeInfoElement.textContent = `来到这个世界已经 ${timeDiff.days} 天 ${timeDiff.hours} 小时 ${timeDiff.minutes} 分钟 ${timeDiff.seconds} 秒`;
}

function startRealTimeUpdate(birthDateStr, elementId) {
    let lastUpdate = 0;
    const updateInterval = 200; // 每200ms更新一次，平衡性能和实时性
    
    function update() {
        const now = Date.now();
        if (now - lastUpdate >= updateInterval) {
            updateTimeInfo(birthDateStr, elementId);
            lastUpdate = now;
        }
        requestAnimationFrame(update);
    }
    
    update();
}

// 图片懒加载实现
function optimizeImageLoading() {
    // 检查浏览器是否支持Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '0px 0px 100px 0px', // 提前100px加载
            threshold: 0.1 // 当图片10%进入视口时加载
        });
        
        // 观察所有带有lazy-load类的图片
        const lazyImages = document.querySelectorAll('img.lazy-load');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 降级方案：立即加载所有图片
        const lazyImages = document.querySelectorAll('img.lazy-load');
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            }
        });
    }
}

// 动画效果管理
function addPageTransitions() {
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.classList.add('fade-out');
                
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            });
        }
    });
}

function addScrollEffects() {
    const nav = document.querySelector('nav');
    if (nav) {
        const handleScroll = throttle(() => {
            if (window.scrollY > 50) {
                nav.classList.add('shadow-md');
                nav.classList.remove('shadow-sm');
            } else {
                nav.classList.remove('shadow-md');
                nav.classList.add('shadow-sm');
            }
        }, 100); // 100ms节流
        
        window.addEventListener('scroll', handleScroll);
    }
}

function addCardHoverEffects(selector = '.comfort-card') {
    // 悬停效果已在CSS中实现，这里不再需要JavaScript处理
    // 保持函数结构以确保向后兼容
}

function addFadeInAnimations(selector = '.fade-in-element') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fadeElements = document.querySelectorAll(selector);
    
    if (!prefersReducedMotion) {
        fadeElements.forEach(element => {
            element.classList.add('animate');
        });
    } else {
        fadeElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
}

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-out {
            animation: fadeOut 0.3s ease-in-out forwards;
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease-in-out forwards;
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(10px);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        img.loaded {
            opacity: 1;
            transform: scale(1);
        }
        
        /* 只对需要懒加载的图片应用初始隐藏样式 */
        img[data-src] {
            opacity: 0;
            transform: scale(0.95);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);
}

function addPageEnterAnimation() {
    document.body.classList.add('fade-in');
}

// 访问统计功能
function initializeVisitorTracking() {
    // 简化访问统计，只统计总访问次数
    const totalVisits = parseInt(localStorage.getItem('totalVisits') || '0') + 1;
    localStorage.setItem('totalVisits', totalVisits.toString());
    
    // 延迟更新DOM，避免阻塞主线程
    requestAnimationFrame(updateVisitCountDisplay);
}

function updateVisitCountDisplay() {
    const totalVisits = parseInt(localStorage.getItem('totalVisits') || '0');
    const visitCountElement = document.getElementById('visitCount');
    if (visitCountElement) {
        visitCountElement.textContent = totalVisits;
    }
}


