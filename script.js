const { createApp, ref, computed, onMounted, watch, nextTick } = Vue;

// Icon Component
const IconSvg = {
    props: ['name'],
    template: `
        <svg class="icon-svg" viewBox="0 0 24 24" v-html="path"></svg>
    `,
    setup(props) {
        const icons = {
            'toolbox': '<path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>',
            'code': '<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>',
            'link': '<path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>',
            'shield-halved': '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>',
            'brackets-curly': '<path d="M8.795 10.005L10.205 8.595L7.8 6.195C7.2 5.595 7.2 4.595 7.8 3.995C8.4 3.395 9.4 3.395 10 3.995L12.4 6.395L13.81 4.985L11.41 2.585C10.03 1.205 7.77 1.205 6.39 2.585C5.01 3.965 5.01 6.225 6.39 7.605L8.795 10.005ZM15.205 13.995L13.795 15.405L16.2 17.805C16.8 18.405 16.8 19.405 16.2 20.005C15.6 20.605 14.6 20.605 14 20.005L11.6 17.605L10.19 19.015L12.59 21.415C13.97 22.795 16.23 22.795 17.61 21.415C18.99 20.035 18.99 17.775 17.61 16.395L15.205 13.995Z"/>',
            'file-code': '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>',
            'code-compare': '<path d="M10 21v-2H3V5h7V3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7zm11-16h-7v2h7v14h-7v2h7c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-6 8l-5-6v4H5v4h5v4l5-6z"/>',
            'clock': '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>',
            'qrcode': '<path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm8 2h2v2h-2v-2zm4 0h2v2h-2v-2zm2-2h2v2h-2v-2zm-4 0h2v2h-2v-2zm2 4h2v2h-2v-2zm-4 0h2v2h-2v-2zm2-6h2v2h-2v-2zm4-2h2v2h-2v-2z"/>',
            'palette': '<path d="M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>',
            'sun': '<path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/>',
            'moon': '<path d="M9.37 5.51C9.19 6.15 9.1 6.82 9.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 18.55 13.4 21.5 8.5 21.5c-5.52 0-10-4.48-10-10 0-4.9 2.95-8.95 6.87-9.99z"/>',
            'arrow-down': '<path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>',
            'arrow-up': '<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>',
            'copy': '<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>',
            'rotate-right': '<path d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"/>',
            'chevron-left': '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>',
            'chevron-right': '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>',
            'close': '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>'
        };
        const path = computed(() => icons[props.name] || '');
        return { path };
    }
};

createApp({
    components: {
        'icon-svg': IconSvg
    },
    setup() {
        // --- Toast ---
        const toast = ref({ show: false, message: '' });
        const showToast = (msg) => {
            toast.value.message = msg;
            toast.value.show = true;
            setTimeout(() => {
                toast.value.show = false;
            }, 2000);
        };

        // --- Navigation ---
        const tabs = [
            { id: 'base64', name: 'Base64 加解密', icon: 'code' },
            { id: 'url', name: 'URL 编解码', icon: 'link' },
            { id: 'md5', name: 'MD5 加密', icon: 'shield-halved' },
            { id: 'json', name: 'JSON 工具', icon: 'brackets-curly' },
            { id: 'xmljson', name: 'XML <> JSON', icon: 'file-code' },
            { id: 'diff', name: '文本对比', icon: 'code-compare' },
            { id: 'diffIde', name: '文本对比IDE', icon: 'code-compare' },
            { id: 'cron', name: 'Cron 表达式', icon: 'clock' },
            { id: 'timestamp', name: '时间戳转换', icon: 'clock' },
            { id: 'color', name: '颜色转换', icon: 'palette' },
            { id: 'qrcode', name: '二维码生成', icon: 'qrcode' },
            { id: 'sqlin', name: 'SQL IN格式化', icon: 'brackets-curly' },
        ];
        const currentTab = ref('base64');
        const currentTabName = computed(() => tabs.find(t => t.id === currentTab.value)?.name);
        
        // --- Sidebar Collapse ---
        const sidebarCollapsed = ref(false);
        const toggleSidebar = () => {
            sidebarCollapsed.value = !sidebarCollapsed.value;
        };

        // --- Theme ---
        const isDark = ref(false);
        const toggleTheme = () => {
            isDark.value = !isDark.value;
            document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
            localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
        };

        onMounted(() => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                isDark.value = savedTheme === 'dark';
            } else {
                isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
            
            // Initialize line numbers
            nextTick(() => {
                updateLineNumbers();
                updateDiffIdeLineNumbers();
            });
        });

        // --- Common ---
        const copyToClipboard = async (text) => {
            if (!text) return;
            try {
                await navigator.clipboard.writeText(text);
                showToast('已复制到剪贴板');
            } catch (err) {
                console.error('Failed to copy:', err);
                showToast('复制失败');
            }
        };

        // --- Base64 ---
        const base64 = ref({ input: '', output: '' });
        const base64Encode = () => {
            try {
                // Handle UTF-8
                base64.value.output = btoa(unescape(encodeURIComponent(base64.value.input)));
            } catch (e) {
                base64.value.output = 'Error: ' + e.message;
            }
        };
        const base64Decode = () => {
            try {
                base64.value.output = decodeURIComponent(escape(atob(base64.value.input)));
            } catch (e) {
                base64.value.output = 'Error: ' + e.message;
            }
        };

        // --- URL ---
        const url = ref({ input: '', output: '' });
        const urlEncode = () => {
            try {
                url.value.output = encodeURIComponent(url.value.input);
            } catch (e) {
                url.value.output = 'Error: ' + e.message;
            }
        };
        const urlDecode = () => {
            try {
                url.value.output = decodeURIComponent(url.value.input);
            } catch (e) {
                url.value.output = 'Error: ' + e.message;
            }
        };

        // --- MD5 ---
        const md5 = ref({ input: '', output: '', output16: '' });
        const calculateMD5 = () => {
            if (!md5.value.input) {
                md5.value.output = '';
                md5.value.output16 = '';
                return;
            }
            const hash = CryptoJS.MD5(md5.value.input).toString();
            md5.value.output = hash;
            md5.value.output16 = hash.substring(8, 24);
        };

        // --- JSON ---
        const json = ref({ input: '', output: '', error: false });
        const jsonFormat = () => {
            try {
                const obj = JSON.parse(json.value.input);
                json.value.output = JSON.stringify(obj, null, 4);
                json.value.error = false;
            } catch (e) {
                json.value.output = 'Invalid JSON: ' + e.message;
                json.value.error = true;
            }
        };
        const jsonMinify = () => {
            try {
                const obj = JSON.parse(json.value.input);
                json.value.output = JSON.stringify(obj);
                json.value.error = false;
            } catch (e) {
                json.value.output = 'Invalid JSON: ' + e.message;
                json.value.error = true;
            }
        };

        // --- XML <-> JSON ---
        const xmljson = ref({ input: '', output: '', error: false });

        // Helper to get parser
        const getParser = () => {
            if (window.fxp) return window.fxp;
            // Fallback for some CDN versions
            if (window.XMLParser && window.XMLBuilder) return { XMLParser: window.XMLParser, XMLBuilder: window.XMLBuilder };
            throw new Error("XML Parser library not loaded");
        };

        const xmlToJson = () => {
            try {
                const lib = getParser();
                const parser = new lib.XMLParser();
                const result = parser.parse(xmljson.value.input);
                xmljson.value.output = JSON.stringify(result, null, 4);
                xmljson.value.error = false;
            } catch (e) {
                xmljson.value.output = 'Error converting XML: ' + e.message;
                xmljson.value.error = true;
            }
        };
        const jsonToXml = () => {
            try {
                const lib = getParser();
                const builder = new lib.XMLBuilder({ format: true });
                const obj = JSON.parse(xmljson.value.input);
                xmljson.value.output = builder.build(obj);
                xmljson.value.error = false;
            } catch (e) {
                xmljson.value.output = 'Error converting JSON: ' + e.message;
                xmljson.value.error = true;
            }
        };

        // --- Diff ---
        const diff = ref({ old: '', new: '', result: '' });
        const diffIde = ref({ left: '', right: '' });
        const diffModalVisible = ref(false);
        const diffMarkers = ref([]);
        const diffIdeRows = ref([]);
        const diffIdeSummary = ref({ blocks: 0, added: 0, removed: 0 });
        const diffIdeChangeIndexes = ref([]);
        const diffIdeActiveIndex = ref(-1);
        const diffIdeMarkers = ref([]);
        const diffIdeLanguage = ref('text'); // 当前选中的语言
        
        // Refs for line numbers
        const oldLineNumbers = ref(null);
        const newLineNumbers = ref(null);
        const resultLineNumbers = ref(null);
        const diffResult = ref(null);
        const ideOldLineNumbers = ref(null);
        const ideNewLineNumbers = ref(null);
        const diffIdeGrid = ref(null);
        
        const refreshDiffMarkers = () => {
            nextTick(() => {
                if (!diffResult.value) return;
                const container = diffResult.value;
                const totalHeight = container.scrollHeight || 1;
                const nodes = container.querySelectorAll('.diff-added, .diff-removed');
                const occupied = new Set();
                const markers = [];
                
                nodes.forEach(node => {
                    const offsetTop = node.offsetTop;
                    const ratio = Math.min((offsetTop / totalHeight) * 100, 99);
                    const diffType = node.classList.contains('diff-added') ? 'added' : 'removed';
                    const bucketKey = `${diffType}-${Math.round(ratio * 2)}`; // reduce dense markers
                    if (occupied.has(bucketKey)) return;
                    occupied.add(bucketKey);
                    
                    markers.push({
                        type: diffType,
                        position: ratio,
                        scrollTop: offsetTop
                    });
                });
                
                diffMarkers.value = markers;
            });
        };
        
        const scrollToMarker = (marker) => {
            if (!diffResult.value) return;
            diffResult.value.scrollTop = marker.scrollTop;
            if (resultLineNumbers.value) {
                resultLineNumbers.value.scrollTop = marker.scrollTop;
            }
        };
        
        // 简单的语法高亮函数
        const highlightCode = (code, language) => {
            if (!code) return '';
            
            // HTML 转义
            let highlighted = code.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
            
            // JavaScript/JSON 高亮
            if (language === 'javascript' || language === 'json') {
                // 字符串高亮 (单引号和双引号)
                highlighted = highlighted.replace(/(['"`])(?:(?=(\\?))\2.)*?\1/g, '<span class="token string">$&</span>');
                
                // 数字高亮
                highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span class="token number">$1</span>');
                
                // 关键字高亮
                const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'extends', 'import', 'export', 'from', 'new', 'this', 'true', 'false', 'null', 'undefined', 'async', 'await', 'try', 'catch', 'throw', 'typeof', 'instanceof', 'delete', 'void', 'break', 'continue', 'switch', 'case', 'default'];
                const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
                highlighted = highlighted.replace(keywordPattern, '<span class="token keyword">$1</span>');
                
                // 注释高亮
                highlighted = highlighted.replace(/\/\/.*$/gm, '<span class="token comment">$&</span>');
                highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, '<span class="token comment">$&</span>');
                
                // 函数名高亮
                highlighted = highlighted.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, '<span class="token function">$1</span>');
            }
            
            // SQL 高亮
            else if (language === 'sql') {
                const sqlKeywords = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'INDEX', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'NOT', 'NULL', 'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET'];
                const sqlPattern = new RegExp(`\\b(${sqlKeywords.join('|')})\\b`, 'gi');
                highlighted = highlighted.replace(sqlPattern, '<span class="token keyword">$1</span>');
                
                highlighted = highlighted.replace(/(['"`])(?:(?=(\\?))\2.)*?\1/g, '<span class="token string">$&</span>');
                highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="token number">$1</span>');
                highlighted = highlighted.replace(/--.*$/gm, '<span class="token comment">$&</span>');
            }
            
            return highlighted;
        };
        
        // Detect code language
        const detectLanguage = (text) => {
            // Check for JSON
            if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
                try {
                    JSON.parse(text);
                    return 'json';
                } catch (e) {}
            }
            // Check for SQL
            const sqlKeywords = /^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|WITH)\s+/i;
            if (sqlKeywords.test(text)) {
                return 'sql';
            }
            // Check for Java
            if (/^\s*(package|import|public\s+class|@Override|@Autowired)/.test(text)) {
                return 'java';
            }
            // Check for JavaScript
            if (/^\s*(function|const|let|var|export|import)/.test(text)) {
                return 'javascript';
            }
            // Check for Python
            if (/^\s*(def |import |from |class |#!\/usr\/bin\/env python)/.test(text)) {
                return 'python';
            }
            // Check for XML/HTML
            if (/^\s*<[?!]?[a-z]/i.test(text)) {
                return 'xml';
            }
            return 'text';
        };
        
        // Update line numbers
        const updateLineNumbers = () => {
            nextTick(() => {
                updateLineNumbersForPane('old', diff.value.old);
                updateLineNumbersForPane('new', diff.value.new);
            });
        };
        
        const updateLineNumbersForPane = (pane, text) => {
            const lineNumbersEl = pane === 'old' ? oldLineNumbers.value : newLineNumbers.value;
            if (!lineNumbersEl) return;
            
            const lines = text.split('\n');
            const lineCount = lines.length || 1;
            lineNumbersEl.textContent = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
        };
        
        const updateResultLineNumbers = (text) => {
            nextTick(() => {
                if (!resultLineNumbers.value) return;
                const lines = text.split('\n');
                const lineCount = lines.length || 1;
                resultLineNumbers.value.textContent = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
            });
        };
        
        // Sync scroll between textarea and line numbers
        const syncScroll = (event) => {
            const textarea = event.target;
            const pane = textarea.dataset.pane;
            const lineNumbersEl = pane === 'old' ? oldLineNumbers.value : newLineNumbers.value;
            if (lineNumbersEl) {
                lineNumbersEl.scrollTop = textarea.scrollTop;
            }
        };
        
        // Watch for changes to update line numbers
        watch(() => diff.value.old, () => {
            updateLineNumbers();
        });
        
        watch(() => diff.value.new, () => {
            updateLineNumbers();
        });
        
        const compareDiff = () => {
            const oldText = diff.value.old;
            const newText = diff.value.new;
            const language = detectLanguage(oldText || newText);
            
            // Use line-based diff for better visualization
            const diffs = Diff.diffLines(oldText, newText);
            
            let html = '';
            let plainText = '';
            
            diffs.forEach(part => {
                const lines = part.value.split('\n');
                // Remove last empty line if exists
                if (lines[lines.length - 1] === '') {
                    lines.pop();
                }
                
                lines.forEach((line, idx) => {
                    if (idx === lines.length - 1 && line === '') return;
                    
                    const colorClass = part.added ? 'diff-added' :
                        part.removed ? 'diff-removed' : '';
                    
                    // Escape HTML
                    const escapedLine = line.replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#039;");
                    
                    plainText += line + '\n';
                    
                    if (colorClass) {
                        html += `<span class="${colorClass}">${escapedLine}</span>\n`;
                    } else {
                        html += `${escapedLine}\n`;
                    }
                });
            });
            
            diff.value.result = html;
            diffModalVisible.value = true;
            
            // Apply syntax highlighting after modal is visible
            nextTick(() => {
                updateResultLineNumbers(html);
                refreshDiffMarkers();
                
                if (diffResult.value && window.Prism && language !== 'text') {
                    try {
                        // Create a temporary element for Prism highlighting
                        const tempCode = document.createElement('code');
                        tempCode.className = `language-${language}`;
                        tempCode.textContent = plainText.trim();
                        Prism.highlightElement(tempCode);
                        
                        // Merge Prism highlighting with diff highlighting
                        const highlightedLines = tempCode.innerHTML.split('\n');
                        const diffLines = html.split('\n');
                        let mergedHtml = '';
                        
                        for (let i = 0; i < Math.max(highlightedLines.length, diffLines.length); i++) {
                            const diffLine = diffLines[i] || '';
                            const highlightLine = highlightedLines[i] || '';
                            
                            if (diffLine.includes('diff-added') || diffLine.includes('diff-removed')) {
                                // Preserve diff highlighting, but try to merge syntax highlighting
                                const diffContent = diffLine.replace(/<span class="diff-(added|removed)">|<\/span>/g, '');
                                if (highlightLine) {
                                    // Wrap highlighted content with diff class
                                    const diffType = diffLine.includes('diff-added') ? 'added' : 'removed';
                                    mergedHtml += `<span class="diff-${diffType}">${highlightLine}</span>\n`;
                                } else {
                                    mergedHtml += diffLine + '\n';
                                }
                            } else if (highlightLine) {
                                mergedHtml += highlightLine + '\n';
                            } else {
                                mergedHtml += (diffLine || '') + '\n';
                            }
                        }
                        
                        diffResult.value.innerHTML = mergedHtml;
                        refreshDiffMarkers();
                    } catch (e) {
                        console.error('Syntax highlighting error:', e);
                        // Fallback to plain diff
                    }
                }
                
                // Sync scroll for result
                if (resultLineNumbers.value && diffResult.value) {
                    const syncResultScroll = () => {
                        if (resultLineNumbers.value) {
                            resultLineNumbers.value.scrollTop = diffResult.value.scrollTop;
                        }
                    };
                    diffResult.value.addEventListener('scroll', syncResultScroll);
                }
            });
        };
        
        const closeDiffModal = () => {
            diffModalVisible.value = false;
            diffMarkers.value = [];
        };

        // --- Diff IDE ---
        const normalizeLines = (value) => {
            const lines = value.split('\n');
            if (lines.length && lines[lines.length - 1] === '') {
                lines.pop();
            }
            return lines;
        };

        const buildDiffIdeRows = (oldText, newText, language) => {
            const diffs = Diff.diffLines(oldText, newText);
            let leftNumber = 1;
            let rightNumber = 1;
            const rows = [];
            let addedCount = 0;
            let removedCount = 0;
            let blockCount = 0;

            const pushRow = (leftText, rightText, type, hasLeft, hasRight) => {
                const row = {
                    leftNumber: hasLeft ? leftNumber : '',
                    rightNumber: hasRight ? rightNumber : '',
                    leftText: leftText ?? '',
                    rightText: rightText ?? '',
                    leftTextHighlighted: '',
                    rightTextHighlighted: '',
                    type
                };
                
                // 添加语法高亮
                if (leftText && language !== 'text') {
                    row.leftTextHighlighted = highlightCode(leftText, language);
                } else if (leftText) {
                    row.leftTextHighlighted = escapeHtml(leftText);
                }
                
                if (rightText && language !== 'text') {
                    row.rightTextHighlighted = highlightCode(rightText, language);
                } else if (rightText) {
                    row.rightTextHighlighted = escapeHtml(rightText);
                }
                
                if (hasLeft) leftNumber += 1;
                if (hasRight) rightNumber += 1;
                rows.push(row);
            };
            
            // HTML 转义函数
            const escapeHtml = (text) => {
                return text.replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            };

            const pushNeutralRow = (text) => {
                return text.replace(/\t/g, '    ');
            };

            let i = 0;
            while (i < diffs.length) {
                const part = diffs[i];
                if (part.removed && i + 1 < diffs.length && diffs[i + 1].added) {
                    const removedLines = normalizeLines(part.value);
                    const addedLines = normalizeLines(diffs[i + 1].value);
                    const maxLen = Math.max(removedLines.length, addedLines.length);
                    blockCount += 1;
                    for (let idx = 0; idx < maxLen; idx++) {
                        const leftLine = removedLines[idx];
                        const rightLine = addedLines[idx];
                        const hasLeft = typeof leftLine === 'string';
                        const hasRight = typeof rightLine === 'string';
                        if (hasLeft) removedCount += 1;
                        if (hasRight) addedCount += 1;
                        pushRow(
                            hasLeft ? pushNeutralRow(leftLine) : '',
                            hasRight ? pushNeutralRow(rightLine) : '',
                            'changed',
                            hasLeft,
                            hasRight
                        );
                    }
                    i += 2;
                    continue;
                }

                if (part.added) {
                    const addedLines = normalizeLines(part.value);
                    if (addedLines.length) blockCount += 1;
                    addedLines.forEach(line => {
                        addedCount += 1;
                        pushRow('', pushNeutralRow(line), 'added', false, true);
                    });
                    i += 1;
                    continue;
                }

                if (part.removed) {
                    const removedLines = normalizeLines(part.value);
                    if (removedLines.length) blockCount += 1;
                    removedLines.forEach(line => {
                        removedCount += 1;
                        pushRow(pushNeutralRow(line), '', 'removed', true, false);
                    });
                    i += 1;
                    continue;
                }

                const commonLines = normalizeLines(part.value);
                commonLines.forEach(line => {
                    pushRow(pushNeutralRow(line), pushNeutralRow(line), 'equal', true, true);
                });
                i += 1;
            }

            return {
                rows,
                summary: {
                    blocks: blockCount,
                    added: addedCount,
                    removed: removedCount
                }
            };
        };

        const updateDiffIdeLineNumbers = () => {
            nextTick(() => {
                updateLineNumbersForDiffIdePane('left', diffIde.value.left);
                updateLineNumbersForDiffIdePane('right', diffIde.value.right);
            });
        };

        const updateLineNumbersForDiffIdePane = (side, text) => {
            const target = side === 'left' ? ideOldLineNumbers.value : ideNewLineNumbers.value;
            if (!target) return;
            const lines = text.split('\n');
            const count = lines.length || 1;
            target.textContent = Array.from({ length: count }, (_, idx) => idx + 1).join('\n');
        };

        const syncIdeScroll = (event) => {
            const textarea = event.target;
            if (textarea.dataset.pane === 'ide-old' && ideOldLineNumbers.value) {
                ideOldLineNumbers.value.scrollTop = textarea.scrollTop;
            }
            if (textarea.dataset.pane === 'ide-new' && ideNewLineNumbers.value) {
                ideNewLineNumbers.value.scrollTop = textarea.scrollTop;
            }
        };

        watch(() => diffIde.value.left, () => {
            updateDiffIdeLineNumbers();
        });

        watch(() => diffIde.value.right, () => {
            updateDiffIdeLineNumbers();
        });

        const refreshDiffIdeMarkers = () => {
            nextTick(() => {
                const leftPane = document.querySelector('.diff-ide-pane.left-pane');
                if (!leftPane) {
                    diffIdeMarkers.value = [];
                    return;
                }

                const totalHeight = leftPane.scrollHeight || 1;
                const rows = Array.from(leftPane.querySelectorAll('.diff-ide-row-single'));
                const occupied = new Set();
                const markers = [];

                rows.forEach(rowEl => {
                    const typeClass = Array.from(rowEl.classList).find(c =>
                        c === 'diff-ide-row--added' ||
                        c === 'diff-ide-row--removed' ||
                        c === 'diff-ide-row--changed'
                    );
                    if (!typeClass) return;

                    const type = typeClass.replace('diff-ide-row--', '');
                    const offsetTop = rowEl.offsetTop;
                    const ratio = Math.min((offsetTop / totalHeight) * 100, 99);
                    const bucketKey = `${type}-${Math.round(ratio * 2)}`;
                    if (occupied.has(bucketKey)) return;
                    occupied.add(bucketKey);

                    markers.push({
                        type,
                        position: ratio,
                        scrollTop: offsetTop,
                        title: type === 'added' ? '新增行' : type === 'removed' ? '删除行' : '修改行'
                    });
                });

                diffIdeMarkers.value = markers;
            });
        };

        const scrollToDiffIdeMarker = (marker) => {
            const leftPane = document.querySelector('.diff-ide-pane.left-pane');
            const rightPane = document.querySelector('.diff-ide-pane.right-pane');
            if (!leftPane || !rightPane || !marker) return;
            leftPane.scrollTop = marker.scrollTop;
            rightPane.scrollTop = marker.scrollTop;
        };

        const compareDiffIde = () => {
            // 检测语言类型
            const detectedLanguage = detectLanguage(diffIde.value.left || diffIde.value.right);
            diffIdeLanguage.value = detectedLanguage;
            
            const { rows, summary } = buildDiffIdeRows(diffIde.value.left, diffIde.value.right, detectedLanguage);
            diffIdeRows.value = rows;
            diffIdeSummary.value = summary;
            diffIdeChangeIndexes.value = rows
                .map((row, idx) => row.type !== 'equal' ? idx : -1)
                .filter(idx => idx >= 0);
            diffIdeActiveIndex.value = diffIdeChangeIndexes.value[0] ?? -1;
            nextTick(() => {
                scrollToDiffIdeRow(diffIdeActiveIndex.value);
                refreshDiffIdeMarkers();
                syncDiffIdePaneScroll();
            });
        };

        const scrollToDiffIdeRow = (rowIndex) => {
            if (rowIndex === undefined || rowIndex === null || rowIndex < 0) return;
            nextTick(() => {
                const leftPane = document.querySelector('.diff-ide-pane.left-pane');
                const rightPane = document.querySelector('.diff-ide-pane.right-pane');
                if (!leftPane || !rightPane) return;
                const rowEl = leftPane.querySelector(`[data-diff-row="${rowIndex}"]`);
                if (rowEl) {
                    rowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        };

        const jumpDiffIde = (direction) => {
            if (!diffIdeChangeIndexes.value.length) return;
            const currentIndex = diffIdeChangeIndexes.value.indexOf(diffIdeActiveIndex.value);
            let targetIndex = currentIndex + direction;
            if (targetIndex < 0) targetIndex = diffIdeChangeIndexes.value.length - 1;
            if (targetIndex >= diffIdeChangeIndexes.value.length) targetIndex = 0;
            diffIdeActiveIndex.value = diffIdeChangeIndexes.value[targetIndex];
            scrollToDiffIdeRow(diffIdeActiveIndex.value);
        };

        const clearDiffIde = () => {
            diffIde.value.left = '';
            diffIde.value.right = '';
            diffIdeRows.value = [];
            diffIdeSummary.value = { blocks: 0, added: 0, removed: 0 };
            diffIdeChangeIndexes.value = [];
            diffIdeActiveIndex.value = -1;
            diffIdeMarkers.value = [];
            diffIdeLanguage.value = 'text';
        };
        
        // 语言切换处理
        const onLanguageChange = () => {
            if (!diffIdeRows.value.length) return;
            
            // 使用新语言重新构建对比结果
            const { rows, summary } = buildDiffIdeRows(
                diffIde.value.left, 
                diffIde.value.right, 
                diffIdeLanguage.value
            );
            diffIdeRows.value = rows;
            diffIdeSummary.value = summary;
            
            nextTick(() => {
                refreshDiffIdeMarkers();
            });
        };

        // 同步左右两侧的横向滚动
        const syncDiffIdePaneScroll = () => {
            nextTick(() => {
                const leftPane = document.querySelector('.diff-ide-pane.left-pane');
                const rightPane = document.querySelector('.diff-ide-pane.right-pane');
                
                if (!leftPane || !rightPane) return;
                
                let isLeftScrolling = false;
                let isRightScrolling = false;
                
                // 左侧滚动时同步右侧（横向和纵向）
                leftPane.addEventListener('scroll', () => {
                    if (isRightScrolling) return;
                    isLeftScrolling = true;
                    rightPane.scrollLeft = leftPane.scrollLeft;
                    rightPane.scrollTop = leftPane.scrollTop;
                    setTimeout(() => { isLeftScrolling = false; }, 10);
                });
                
                // 右侧滚动时同步左侧（横向和纵向）
                rightPane.addEventListener('scroll', () => {
                    if (isLeftScrolling) return;
                    isRightScrolling = true;
                    leftPane.scrollLeft = rightPane.scrollLeft;
                    leftPane.scrollTop = rightPane.scrollTop;
                    setTimeout(() => { isRightScrolling = false; }, 10);
                });
            });
        };

        // --- Cron ---
        const cronUnits = [
            { key: 'second', label: '秒' },
            { key: 'minute', label: '分钟' },
            { key: 'hour', label: '小时' },
            { key: 'day', label: '日' },
            { key: 'month', label: '月' },
            { key: 'week', label: '周' },
            { key: 'year', label: '年' }
        ];
        const cronActiveUnit = ref('second');

        const createUnitState = (min, max, defaultType = 'every') => ({
            type: defaultType,
            cycle: { start: min, end: min + 1 },
            interval: { start: min, step: 1 },
            specific: []
        });

        const cronState = ref({
            second: createUnitState(0, 59),
            minute: createUnitState(0, 59),
            hour: createUnitState(0, 23),
            day: createUnitState(1, 31),
            month: createUnitState(1, 12),
            week: createUnitState(1, 7),
            year: createUnitState(2023, 2099, 'every') // Year is often optional or every
        });

        // Defaults adjustments
        cronState.value.day.type = 'every';
        cronState.value.week.type = 'none'; // Usually day or week is ?
        cronState.value.year.type = 'none';

        const generateUnitCron = (unit, key) => {
            switch (unit.type) {
                case 'every': return '*';
                case 'none': return key === 'day' || key === 'week' ? '?' : ''; // Year empty
                case 'cycle': return `${unit.cycle.start}-${unit.cycle.end}`;
                case 'interval': return `${unit.interval.start}/${unit.interval.step}`;
                case 'specific':
                    if (unit.specific.length === 0) return '*'; // Fallback
                    return unit.specific.sort((a, b) => a - b).join(',');
            }
            return '*';
        };

        const parseUnit = (val, key, min, max) => {
            const state = createUnitState(min, max);
            if (val === '*') {
                state.type = 'every';
            } else if (val === '?') {
                state.type = 'none';
            } else if (val.includes('-')) {
                const [start, end] = val.split('-').map(Number);
                if (!isNaN(start) && !isNaN(end)) {
                    state.type = 'cycle';
                    state.cycle = { start, end };
                }
            } else if (val.includes('/')) {
                const [start, step] = val.split('/').map(Number);
                if (!isNaN(start) && !isNaN(step)) {
                    state.type = 'interval';
                    state.interval = { start, step };
                }
            } else {
                // Specific or single number
                const parts = val.split(',').map(Number).filter(n => !isNaN(n));
                if (parts.length > 0) {
                    state.type = 'specific';
                    state.specific = parts;
                } else {
                    // Fallback/Default
                    state.type = key === 'year' ? 'none' : 'every';
                }
            }
            return state;
        };

        const generatedCron = computed({
            get() {
                const s = cronState.value;
                const second = generateUnitCron(s.second, 'second');
                const minute = generateUnitCron(s.minute, 'minute');
                const hour = generateUnitCron(s.hour, 'hour');
                const day = generateUnitCron(s.day, 'day');
                const month = generateUnitCron(s.month, 'month');
                const week = generateUnitCron(s.week, 'week');
                const year = generateUnitCron(s.year, 'year');

                let parts = [second, minute, hour, day, month, week];
                if (year && year !== '') parts.push(year);
                return parts.join(' ');
            },
            set(newValue) {
                if (!newValue) return;
                const parts = newValue.trim().split(/\s+/);
                if (parts.length < 6) return;

                cronState.value.second = parseUnit(parts[0], 'second', 0, 59);
                cronState.value.minute = parseUnit(parts[1], 'minute', 0, 59);
                cronState.value.hour = parseUnit(parts[2], 'hour', 0, 23);
                cronState.value.day = parseUnit(parts[3], 'day', 1, 31);
                cronState.value.month = parseUnit(parts[4], 'month', 1, 12);
                cronState.value.week = parseUnit(parts[5], 'week', 1, 7);

                if (parts.length >= 7) {
                    cronState.value.year = parseUnit(parts[6], 'year', 2023, 2099);
                } else {
                    cronState.value.year.type = 'none';
                }
            }
        });

        const cronExplanation = computed(() => {
            try {
                return cronstrue.toString(generatedCron.value, { locale: "zh_CN" });
            } catch (e) {
                return '无法解析';
            }
        });

        // --- Timestamp ---
        const timestamp = ref({
            now: '',
            nowUnix: 0,
            unixInput: '',
            dateOutput: '',
            dateInput: '',
            unixOutput: ''
        });

        const updateNow = () => {
            const d = new Date();
            timestamp.value.now = d.toLocaleString();
            timestamp.value.nowUnix = Math.floor(d.getTime() / 1000);
        };

        // Auto update every second
        setInterval(updateNow, 1000);
        updateNow();

        const unixToDate = () => {
            try {
                let ts = parseInt(timestamp.value.unixInput);
                if (isNaN(ts)) return;
                // Check if ms or s (heuristic: if > 10000000000, probably ms)
                if (ts < 10000000000) ts *= 1000;
                timestamp.value.dateOutput = new Date(ts).toLocaleString();
            } catch (e) {
                timestamp.value.dateOutput = 'Invalid';
            }
        };

        const dateToUnix = () => {
            try {
                const d = new Date(timestamp.value.dateInput);
                if (isNaN(d.getTime())) {
                    timestamp.value.unixOutput = 'Invalid Date';
                    return;
                }
                timestamp.value.unixOutput = Math.floor(d.getTime() / 1000);
            } catch (e) {
                timestamp.value.unixOutput = 'Error';
            }
        };

        // --- Color ---
        const color = ref({
            hexInput: '',
            rgbOutput: '',
            rgbInput: '',
            hexOutput: '',
            rgbOutputHex: '' // for preview
        });

        const hexToRgb = () => {
            let hex = color.value.hexInput.replace('#', '');
            if (hex.length === 3) {
                hex = hex.split('').map(c => c + c).join('');
            }
            if (hex.length !== 6) {
                color.value.rgbOutput = 'Invalid Hex';
                return;
            }
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            color.value.rgbOutput = `rgb(${r}, ${g}, ${b})`;
        };

        const rgbToHex = () => {
            const match = color.value.rgbInput.match(/(\d+),\s*(\d+),\s*(\d+)/);
            if (!match) {
                color.value.hexOutput = 'Invalid RGB';
                color.value.rgbOutputHex = '';
                return;
            }
            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            const toHex = (c) => {
                const hex = c.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            };
            const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
            color.value.hexOutput = hex;
            color.value.rgbOutputHex = hex;
        };

        // --- QRCode ---
        const qrcode = ref({ input: '', instance: null });
        const generateQRCode = () => {
            const container = document.getElementById('qrcode-container');
            container.innerHTML = ''; // Clear previous
            if (!qrcode.value.input) return;

            new QRCode(container, {
                text: qrcode.value.input,
                width: 200,
                height: 200,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        };

        // --- SQL IN Format ---
        const sqlin = ref({ input: '', output: '' });
        
        const sqlInFormat = () => {
            if (!sqlin.value.input.trim()) {
                sqlin.value.output = '';
                return;
            }
            
            let text = sqlin.value.input.trim();
            
            // 如果已经是格式化的（包含引号和逗号），则还原
            if (text.includes("'") && text.includes(",")) {
                // 移除所有引号和逗号，保留换行
                text = text.replace(/'/g, '').replace(/,/g, '');
                sqlin.value.output = text.trim();
            } else {
                // 格式化：将每行或每个项添加引号和逗号
                // 支持多种分隔符：换行、空格、逗号等
                let items = text.split(/[\n\r]+/).map(line => line.trim()).filter(line => line);
                
                // 如果没有换行，尝试按空格分割
                if (items.length === 1) {
                    items = text.split(/\s+/).filter(item => item.trim());
                }
                
                // 格式化为每行一条，带引号和逗号
                sqlin.value.output = items.map(item => `'${item}'`).join(',\n');
            }
        };
        
        const sqlInRestore = () => {
            if (!sqlin.value.input.trim()) {
                sqlin.value.output = '';
                return;
            }
            
            let text = sqlin.value.input.trim();
            
            // 移除所有引号和逗号
            text = text.replace(/'/g, '').replace(/"/g, '').replace(/,/g, '\n');
            
            // 清理多余的空行
            sqlin.value.output = text.split('\n').map(line => line.trim()).filter(line => line).join('\n');
        };

        return {
            tabs,
            currentTab,
            currentTabName,
            isDark,
            toggleTheme,
            copyToClipboard,
            base64, base64Encode, base64Decode,
            url, urlEncode, urlDecode,
            md5, calculateMD5,
            json, jsonFormat, jsonMinify,
            xmljson, xmlToJson, jsonToXml,
            diff, compareDiff, diffModalVisible, closeDiffModal, updateLineNumbers, syncScroll,
            diffIde, diffIdeRows, diffIdeSummary, diffIdeActiveIndex, diffIdeChangeIndexes,
            compareDiffIde, clearDiffIde, jumpDiffIde, updateDiffIdeLineNumbers,
            diffIdeLanguage, onLanguageChange,
            oldLineNumbers, newLineNumbers, resultLineNumbers, diffResult,
            ideOldLineNumbers, ideNewLineNumbers, diffIdeGrid, syncIdeScroll,
            diffIdeMarkers, scrollToDiffIdeMarker,
            diffMarkers, scrollToMarker,
            cronUnits, cronActiveUnit, cronState, generatedCron, cronExplanation,
            timestamp, updateNow, unixToDate, dateToUnix,
            color, hexToRgb, rgbToHex,
            qrcode, generateQRCode,
            sqlin, sqlInFormat, sqlInRestore,
            toast,
            sidebarCollapsed, toggleSidebar
        };
    }
}).mount('#app');
