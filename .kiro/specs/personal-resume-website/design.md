# 设计文档

## 概述

个人简历网站将采用单页应用（SPA）架构，使用现代前端技术栈构建。网站将以响应式设计为核心，提供流畅的动画效果和清晰的内容展示。整体设计遵循简洁、专业、现代的风格，通过视觉层次和动画效果提升用户体验。

## 技术栈

- **HTML5**: 语义化标签构建页面结构
- **CSS3**: 样式设计、动画效果、响应式布局
- **JavaScript (ES6+)**: 交互逻辑、动画控制、滚动监听
- **html2pdf.js**: PDF生成库
- **可选框架**: 可使用 Vue.js 或 React 简化开发（根据实际需求选择）

## 架构设计

### 整体架构

网站采用单页滚动式布局，所有内容区块垂直排列在同一页面中。通过固定导航栏实现快速跳转，通过滚动监听实现动画触发。

```
┌─────────────────────────────────┐
│      固定导航栏 (Header)         │
├─────────────────────────────────┤
│    个人介绍区 (Hero Section)     │
├─────────────────────────────────┤
│   教育背景区 (Education)         │
├─────────────────────────────────┤
│   技术能力区 (Skills)            │
├─────────────────────────────────┤
│   项目经历区 (Projects)          │
├─────────────────────────────────┤
│   自我评价区 (About)             │
├─────────────────────────────────┤
│      页脚 (Footer)               │
└─────────────────────────────────┘
```

### 文件结构

```
personal-resume-website/
├── index.html              # 主HTML文件
├── css/
│   ├── reset.css          # CSS重置样式
│   ├── variables.css      # CSS变量（颜色、字体等）
│   ├── layout.css         # 布局样式
│   ├── components.css     # 组件样式
│   └── animations.css     # 动画效果
├── js/
│   ├── main.js           # 主JavaScript文件
│   ├── animations.js     # 动画控制逻辑
│   ├── navigation.js     # 导航交互逻辑
│   ├── theme.js          # 主题切换逻辑
│   └── pdf.js            # PDF生成逻辑
├── lib/
│   └── html2pdf.min.js   # PDF生成库
├── assets/
│   ├── images/           # 图片资源
│   └── icons/            # 图标资源
└── data/
    └── resume.json       # 简历数据（可选）
```

## 组件设计

### 1. 导航栏组件 (Navigation Bar)

**功能**: 提供快速导航、主题切换和简历下载

**设计要点**:
- 固定在页面顶部，背景半透明带模糊效果
- 包含Logo/姓名和导航链接
- 右侧包含深色模式切换按钮和PDF下载按钮
- 当前激活的导航项高亮显示
- 移动端转换为汉堡菜单

**响应式行为**:
- 桌面端: 水平排列的导航链接，右侧功能按钮
- 移动端: 汉堡菜单图标，点击展开侧边栏或下拉菜单，功能按钮保持可见

**动画效果**:
- 滚动时导航栏背景透明度变化
- 导航项悬停时下划线动画
- 移动端菜单展开/收起动画
- 主题切换时平滑过渡动画

### 2. 个人介绍区组件 (Hero Section)

**功能**: 展示个人基本信息和第一印象

**设计要点**:
- 全屏或接近全屏高度
- 居中显示头像、姓名、职位
- 简短的个人介绍文字
- 联系方式图标链接
- 可选背景图或渐变色背景

**布局**:
```
┌─────────────────────────────────┐
│                                 │
│         [头像/照片]              │
│                                 │
│          姓名                   │
│        职位标题                 │
│                                 │
│      简短介绍文字               │
│                                 │
│   [邮箱] [GitHub] [LinkedIn]    │
│                                 │
└─────────────────────────────────┘
```

**动画效果**:
- 页面加载时头像淡入+缩放
- 姓名和职位依次从下方滑入
- 联系图标依次弹出

### 3. 教育背景组件 (Education Section)

**功能**: 展示学历信息

**设计要点**:
- 时间轴或卡片式布局
- 每个学历包含: 学校、专业、学位、时间、荣誉
- 按时间倒序排列

**布局示例** (卡片式):
```
┌──────────────────────────────────┐
│  [学校Logo]  学校名称             │
│              专业 - 学位          │
│              时间: 2018-2022      │
│              荣誉: XXX奖学金      │
└──────────────────────────────────┘
```

**动画效果**:
- 滚动进入视口时卡片从左/右滑入
- 悬停时卡片轻微上浮+阴影加深

### 4. 技术能力组件 (Skills Section)

**功能**: 展示技术技能分类和熟练度

**设计要点**:
- 分类展示（如：前端、后端、工具、语言）
- 每个技能使用标签或进度条展示
- 支持图标展示常见技术

**布局示例**:
```
前端开发
[HTML] [CSS] [JavaScript] [React] [Vue]

后端开发
[Node.js] [Python] [MySQL]

开发工具
[Git] [Docker] [VS Code]
```

**动画效果**:
- 滚动进入时标签依次弹出
- 进度条从0到目标值动画填充
- 悬停时标签放大或颜色变化

### 5. 项目经历组件 (Projects Section)

**功能**: 展示代表性项目

**设计要点**:
- 网格或卡片布局
- 每个项目包含: 名称、描述、技术栈、时间、链接
- 可选项目截图或图标

**布局示例** (网格式):
```
┌──────────────┐  ┌──────────────┐
│ [项目图片]   │  │ [项目图片]   │
│ 项目名称     │  │ 项目名称     │
│ 简短描述     │  │ 简短描述     │
│ [技术标签]   │  │ [技术标签]   │
│ [链接] [代码]│  │ [链接] [代码]│
└──────────────┘  └──────────────┘
```

**响应式**:
- 桌面: 2-3列网格
- 平板: 2列网格
- 移动: 1列堆叠

**动画效果**:
- 滚动进入时卡片依次淡入
- 悬停时卡片上浮+阴影效果
- 图片悬停时轻微缩放

### 6. 自我评价组件 (About Section)

**功能**: 展示个人特质和职业态度

**设计要点**:
- 突出的视觉样式（如背景色块或边框）
- 支持多段文字展示
- 可选引用样式或图标装饰

**布局示例**:
```
┌─────────────────────────────────┐
│        "  自我评价  "            │
│                                 │
│  第一段个人评价文字...          │
│                                 │
│  第二段个人评价文字...          │
│                                 │
└─────────────────────────────────┘
```

**动画效果**:
- 滚动进入时整体淡入
- 文字段落依次显示
- 装饰元素（引号、图标）动画出现

### 7. 深色模式切换组件 (Theme Toggle)

**功能**: 在浅色和深色主题间切换

**设计要点**:
- 位于导航栏右侧的切换按钮
- 使用太阳/月亮图标表示当前主题
- 记住用户的主题偏好（localStorage）
- 支持系统主题自动检测

**实现方式**:
```javascript
// 检测系统主题偏好
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// 切换主题
function toggleTheme() {
  document.documentElement.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
```

**动画效果**:
- 主题切换时所有颜色平滑过渡（300ms）
- 图标旋转或淡入淡出切换

### 8. PDF下载组件 (PDF Download)

**功能**: 生成并下载简历PDF文件

**设计要点**:
- 位于导航栏右侧的下载按钮
- 使用下载图标
- 点击后生成PDF并自动下载

**实现方式**:
使用 html2pdf.js 或 jsPDF 库生成PDF

```javascript
// 使用html2pdf.js
function downloadPDF() {
  const element = document.getElementById('resume-content');
  const opt = {
    margin: 10,
    filename: '个人简历.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}
```

**动画效果**:
- 按钮悬停时图标轻微下移
- 生成PDF时显示加载动画

## 数据模型

### 简历数据结构

```javascript
const resumeData = {
  personal: {
    name: "姓名",
    title: "职位标题",
    avatar: "头像URL",
    intro: "简短介绍",
    contacts: {
      email: "email@example.com",
      github: "github.com/username",
      linkedin: "linkedin.com/in/username"
    }
  },
  
  education: [
    {
      school: "学校名称",
      major: "专业",
      degree: "学位",
      startDate: "2018-09",
      endDate: "2022-06",
      honors: ["荣誉1", "荣誉2"]
    }
  ],
  
  skills: {
    "前端开发": ["HTML", "CSS", "JavaScript", "React"],
    "后端开发": ["Node.js", "Python", "MySQL"],
    "开发工具": ["Git", "Docker", "VS Code"],
    "其他": ["英语", "团队协作"]
  },
  
  projects: [
    {
      name: "项目名称",
      description: "项目描述",
      technologies: ["React", "Node.js"],
      startDate: "2023-01",
      endDate: "2023-06",
      links: {
        demo: "https://demo.com",
        github: "https://github.com/..."
      },
      image: "项目截图URL"
    }
  ],
  
  about: [
    "第一段自我评价...",
    "第二段自我评价..."
  ]
};
```

## 样式设计

### 配色方案

**浅色主题**:
```css
:root {
  /* 主色调 */
  --primary-color: #2563eb;      /* 蓝色 */
  --primary-light: #60a5fa;
  --primary-dark: #1e40af;
  
  /* 辅助色 */
  --secondary-color: #64748b;    /* 灰蓝色 */
  --accent-color: #f59e0b;       /* 强调色-橙色 */
  
  /* 中性色 */
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --background: #ffffff;
  --background-alt: #f8fafc;
  --border-color: #e2e8f0;
  
  /* 阴影 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

**深色主题**:
```css
.dark-mode {
  /* 主色调 */
  --primary-color: #3b82f6;
  --primary-light: #60a5fa;
  --primary-dark: #2563eb;
  
  /* 辅助色 */
  --secondary-color: #94a3b8;
  --accent-color: #fbbf24;
  
  /* 中性色 */
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --background: #0f172a;
  --background-alt: #1e293b;
  --border-color: #334155;
  
  /* 阴影 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
}
```

**主题切换过渡**:
```css
* {
  transition: background-color 300ms ease, 
              color 300ms ease, 
              border-color 300ms ease;
}
```

### 字体系统

```css
:root {
  /* 字体家族 */
  --font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", 
                  "Microsoft YaHei", sans-serif;
  --font-mono: "Fira Code", "Consolas", monospace;
  
  /* 字体大小 */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  
  /* 行高 */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### 间距系统

```css
:root {
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
  --spacing-24: 6rem;     /* 96px */
}
```

## 动画系统

### 动画时长和缓动

```css
:root {
  /* 动画时长 */
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  
  /* 缓动函数 */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 核心动画效果

1. **淡入动画** (Fade In)
```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

2. **滑入动画** (Slide In)
```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

3. **缩放动画** (Scale)
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

4. **进度条填充动画**
```css
@keyframes progressFill {
  from {
    width: 0%;
  }
  to {
    width: var(--target-width);
  }
}
```

### 滚动触发动画实现

使用 Intersection Observer API 监听元素进入视口:

```javascript
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

## 响应式设计

### 断点定义

```css
/* 移动端 */
@media (max-width: 767px) { }

/* 平板端 */
@media (min-width: 768px) and (max-width: 1023px) { }

/* 桌面端 */
@media (min-width: 1024px) { }
```

### 响应式策略

1. **导航栏**
   - 桌面: 水平导航
   - 移动: 汉堡菜单

2. **个人介绍区**
   - 桌面: 头像和文字左右布局（可选）
   - 移动: 垂直堆叠

3. **技术能力**
   - 桌面: 多列网格
   - 移动: 单列或两列

4. **项目展示**
   - 桌面: 3列网格
   - 平板: 2列网格
   - 移动: 1列堆叠

5. **字体大小**
   - 移动端最小14px
   - 桌面端16-18px

## 性能优化

### 加载性能

1. **图片优化**
   - 使用WebP格式
   - 提供多尺寸响应式图片
   - 懒加载非首屏图片

2. **CSS优化**
   - 关键CSS内联
   - 非关键CSS延迟加载
   - 使用CSS变量减少重复

3. **JavaScript优化**
   - 最小化和压缩
   - 延迟加载非关键脚本
   - 使用防抖节流优化滚动监听

### 动画性能

1. 优先使用transform和opacity属性（GPU加速）
2. 避免动画触发layout和paint
3. 使用will-change提示浏览器优化
4. 限制同时运行的动画数量

```css
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0); /* 触发GPU加速 */
}
```

## 错误处理

### 图片加载失败

```javascript
// 为图片添加默认占位符
img.onerror = function() {
  this.src = 'assets/images/placeholder.png';
  this.alt = '图片加载失败';
};
```

### 数据加载失败

如果使用外部JSON数据:
```javascript
fetch('data/resume.json')
  .then(response => response.json())
  .then(data => renderResume(data))
  .catch(error => {
    console.error('数据加载失败:', error);
    // 显示错误提示或使用默认数据
    renderResume(defaultData);
  });
```

### 浏览器兼容性

1. 使用CSS前缀处理兼容性
2. 为不支持Intersection Observer的浏览器提供polyfill
3. 优雅降级: 不支持动画的浏览器直接显示内容

## 测试策略

### 功能测试

1. **导航测试**
   - 点击导航链接正确跳转
   - 平滑滚动效果正常
   - 移动端菜单展开/收起正常

2. **响应式测试**
   - 在不同设备尺寸下布局正确
   - 断点切换时样式正确应用
   - 移动端触摸交互正常

3. **动画测试**
   - 滚动触发动画正常
   - 悬停效果正常
   - 页面加载动画正常
   - 动画时长符合预期

### 性能测试

1. 使用Lighthouse检测性能指标
2. 确保首次内容绘制(FCP) < 1.5s
3. 确保最大内容绘制(LCP) < 2.5s
4. 确保累积布局偏移(CLS) < 0.1

### 兼容性测试

测试浏览器:
- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)
- 移动端浏览器 (iOS Safari, Chrome Mobile)

### 可访问性测试

1. 键盘导航支持
2. 屏幕阅读器兼容
3. 颜色对比度符合WCAG标准
4. 语义化HTML标签使用

## 部署方案

### 静态托管

推荐使用以下平台之一:
- **GitHub Pages**: 免费，适合开源项目
- **Vercel**: 自动部署，性能优秀
- **Netlify**: 功能丰富，易于配置
- **Cloudflare Pages**: 全球CDN，速度快

### 部署步骤

1. 构建优化后的文件
2. 配置自定义域名（可选）
3. 上传到托管平台
4. 配置HTTPS
5. 测试线上版本

### SEO优化

1. 添加meta标签（title, description, keywords）
2. 使用语义化HTML标签
3. 添加Open Graph标签（社交分享）
4. 生成sitemap.xml
5. 配置robots.txt

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="XXX的个人简历网站">
  <meta name="keywords" content="简历,前端开发,个人网站">
  <meta property="og:title" content="XXX - 个人简历">
  <meta property="og:description" content="XXX的个人简历网站">
  <meta property="og:image" content="头像URL">
  <title>XXX - 个人简历</title>
</head>
```

## 未来扩展

可选的功能扩展:
1. 多语言支持
2. 博客文章展示
3. 访问统计
4. 留言板功能
5. 作品集画廊
6. 打印样式优化
7. 分享到社交媒体功能
