// 传统脚本版本 - 用于解决ES模块在本地文件系统中的跨域问题

// 全局变量
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    init();
});

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

function startRealTimeUpdate(birthDateStr, elementId, interval = 1000) {
    updateTimeInfo(birthDateStr, elementId);
    
    return setInterval(() => {
        updateTimeInfo(birthDateStr, elementId);
    }, interval);
}

// 图片加载优化
function optimizeImageLoading(selector = 'img') {
    const images = document.querySelectorAll(selector);
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                console.log('图片加载失败:', img.src);
                img.classList.add('error');
            });
        }
    });
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
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('shadow-md');
                nav.classList.remove('shadow-sm');
            } else {
                nav.classList.remove('shadow-md');
                nav.classList.add('shadow-sm');
            }
        });
    }
}

function addCardHoverEffects(selector = '.comfort-card') {
    const cards = document.querySelectorAll(selector);
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function addFadeInAnimations(selector = '.fade-in-element') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const fadeElements = document.querySelectorAll(selector);
        fadeElements.forEach(element => {
            element.classList.add('animate');
        });
    } else {
        const fadeElements = document.querySelectorAll(selector);
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
    function generateVisitorId() {
        return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    const visitorId = localStorage.getItem('visitorId') || generateVisitorId();
    localStorage.setItem('visitorId', visitorId);

    const visitRecords = JSON.parse(localStorage.getItem('visitRecords') || '[]');
    const now = Date.now();
    const currentUrl = window.location.href;
    
    const totalVisits = parseInt(localStorage.getItem('totalVisits') || '0') + 1;
    localStorage.setItem('totalVisits', totalVisits.toString());
    
    visitRecords.push({
        visitorId: visitorId,
        timestamp: now,
        url: currentUrl
    });
    
    if (visitRecords.length > 1000) {
        visitRecords.shift();
    }
    
    localStorage.setItem('visitRecords', JSON.stringify(visitRecords));
    localStorage.setItem('lastVisit', now.toString());
    
    updateVisitCountDisplay();
}

function updateVisitCountDisplay() {
    const totalVisits = parseInt(localStorage.getItem('totalVisits') || '0');
    const visitCountElement = document.getElementById('visitCount');
    if (visitCountElement) {
        visitCountElement.textContent = totalVisits;
    }
}


