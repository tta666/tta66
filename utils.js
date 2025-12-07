// 通用工具函数模块

/**
 * 生成唯一ID
 * @param {string} prefix - ID前缀
 * @returns {string} 唯一ID
 */
export function generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 检查用户是否偏好减少动画
 * @returns {boolean} 是否偏好减少动画
 */
export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖处理后的函数
 */
export function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 时间限制（毫秒）
 * @returns {Function} 节流处理后的函数
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 安全地获取DOM元素
 * @param {string} selector - CSS选择器
 * @param {HTMLElement} parent - 父元素，默认为document
 * @returns {HTMLElement|null} DOM元素或null
 */
export function getElement(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * 安全地获取多个DOM元素
 * @param {string} selector - CSS选择器
 * @param {HTMLElement} parent - 父元素，默认为document
 * @returns {NodeList} DOM元素列表
 */
export function getElements(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

/**
 * 检查元素是否在视口中
 * @param {HTMLElement} element - 要检查的元素
 * @param {number} threshold - 阈值（0-1），默认为0
 * @returns {boolean} 是否在视口中
 */
export function isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * (1 - threshold) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}

/**
 * 平滑滚动到指定元素
 * @param {HTMLElement} element - 目标元素
 * @param {number} duration - 动画持续时间（毫秒）
 */
export function smoothScrollTo(element, duration = 500) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

/**
 * 批量添加CSS类
 * @param {HTMLElement} element - 目标元素
 * @param {string[]} classes - 要添加的类名数组
 */
export function addClasses(element, classes) {
    element.classList.add(...classes);
}

/**
 * 批量移除CSS类
 * @param {HTMLElement} element - 目标元素
 * @param {string[]} classes - 要移除的类名数组
 */
export function removeClasses(element, classes) {
    element.classList.remove(...classes);
}

/**
 * 切换CSS类
 * @param {HTMLElement} element - 目标元素
 * @param {string} className - 要切换的类名
 */
export function toggleClass(element, className) {
    element.classList.toggle(className);
}

/**
 * 检查元素是否有指定的CSS类
 * @param {HTMLElement} element - 目标元素
 * @param {string} className - 要检查的类名
 * @returns {boolean} 是否有指定的类名
 */
export function hasClass(element, className) {
    return element.classList.contains(className);
}

/**
 * 从localStorage获取数据
 * @param {string} key - 存储键名
 * @param {*} defaultValue - 默认值
 * @returns {*} 存储的数据或默认值
 */
export function getFromLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error getting data from localStorage:', error);
        return defaultValue;
    }
}

/**
 * 向localStorage存储数据
 * @param {string} key - 存储键名
 * @param {*} value - 要存储的数据
 */
export function setToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting data to localStorage:', error);
    }
}

/**
 * 从sessionStorage获取数据
 * @param {string} key - 存储键名
 * @param {*} defaultValue - 默认值
 * @returns {*} 存储的数据或默认值
 */
export function getFromSessionStorage(key, defaultValue = null) {
    try {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error getting data from sessionStorage:', error);
        return defaultValue;
    }
}

/**
 * 向sessionStorage存储数据
 * @param {string} key - 存储键名
 * @param {*} value - 要存储的数据
 */
export function setToSessionStorage(key, value) {
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting data to sessionStorage:', error);
    }
}
