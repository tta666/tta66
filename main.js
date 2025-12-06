import { startRealTimeUpdate } from './modules/timeCalculator.js';
import { optimizeImageLoading } from './modules/imageOptimizer.js';
// 引入新的路由模块
import { SpaRouter } from './modules/spaRouter.js';
import { initializeBackgroundMusic } from './modules/musicManager.js';
import { initializeVisitorTracking } from './modules/visitorTracker.js';

// 将初始化逻辑暴露给全局，以便路由切换后调用
window.initGlobalFunctions = function() {
    // 这里放所有页面都通用的逻辑
    startRealTimeUpdate('2010-07-24', 'timeInfo');
    optimizeImageLoading();
    initializeVisitorTracking();
    initializeBackgroundMusic(); // 确保音乐管理器在页面切换后重新挂载
    
    // 重新应用玻璃拟态样式（防止样式丢失）
    const cards = document.querySelectorAll('.bg-white\\/90, .comfort-card');
    cards.forEach(card => card.classList.add('glass-morphism'));
};

// 页面首次加载
document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化全局功能
    window.initGlobalFunctions();
    
    // 2. 启动 SPA 路由
    new SpaRouter();
});