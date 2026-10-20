// ==================== 1. 預設東京 5 天 4 夜行程資料庫 ====================
const defaultData = [
    {
        day: 1,
        title: "Day 1｜11/10（二）成田會合 ➔ 淺草老街與抹茶巡禮",
        items: [
            { id: 1, name: "淺草雷門・仲見世通", desc: "東京最古老的寺廟與熱鬧參拜街", url: "https://www.senso-ji.jp/" },
            { id: 2, name: "壽々喜園（淺草本店）", desc: "世界最濃抹茶冰淇淋（Level 1-7）", url: "https://japantravel.navitime.com/zh-cn/area/jp/spot/02301-1400354/" },
            { id: 3, name: "東京晴空塔", desc: "集結購物商場與絕美夜景", url: "https://www.tokyo-skytree.jp/" },
            { id: 4, name: "【午餐】淺草今半", desc: "創業百年以上的頂級壽喜燒老店", url: "https://www.asakusaimahan.co.jp/" },
            { id: 5, name: "【晚餐】晴空塔 Solamachi 景觀餐廳", desc: "天空 LOUNGE TOP of TREE 眺望夜景", url: "https://www.tokyo-solamachi.jp/" }
        ],
        comments: [{ author: "小明", text: "記得先搶壽々喜園整理券！" }]
    },
    {
        day: 2,
        title: "Day 2｜11/11（三）春日部半日小新巡禮 ➔ 池袋追星購物",
        items: [
            { id: 6, name: "春日部車站 / 動感百貨周邊", desc: "蠟筆小新粉絲聖地巡禮", url: "https://www.city.kasukabe.lg.jp/" },
            { id: 7, name: "東京大神宮", desc: "著名的戀愛結緣與祈福神社", url: "https://www.tokyodaijingu.or.jp/" },
            { id: 8, name: "池袋 K-BOOKS K-POP 館 / HARBS", desc: "偶像周邊與美味水果千層蛋糕", url: "https://www.k-books.co.jp/" },
            { id: 9, name: "【晚餐】無敵家拉麵", desc: "池袋超人氣濃郁豚骨拉麵", url: "https://tabelog.com/tokyo/A1305/A130501/13000074/" }
        ],
        comments: []
    },
    {
        day: 3,
        title: "Day 3｜11/12（四）東京迪士尼海洋全日暢玩",
        items: [
            { id: 10, name: "東京迪士尼海洋", desc: "夢幻泉鄉全新園區、聖誕主題氛圍", url: "https://www.tokyodisneyresort.jp/tc/tds/" },
            { id: 11, name: "【園區餐廳】麥哲倫餐廳", desc: "地中海港灣頂級高級餐廳", url: "https://www.tokyodisneyresort.jp/tc/tds/" }
        ],
        comments: []
    },
    {
        day: 4,
        title: "Day 4｜11/13（五・🎂 生日快樂）小網神社 ➔ 澀谷 ➔ 六本木點燈",
        items: [
            { id: 12, name: "小網神社", desc: "強運厄除、洗錢求財運", url: "https://www.koamijinja.or.jp/" },
            { id: 13, name: "代官山 Forestgate", desc: "隈研吾操刀建築與 JYP 快閃", url: "https://www.gltjp.com/zh-hans/directory/item/15635/" },
            { id: 14, name: "表參道 The Matcha Tokyo", desc: "時尚手刷抹茶與澀谷十字路口", url: "https://www.the-matcha.tokyo/" },
            { id: 15, name: "六本木之丘櫸木坂點燈", desc: "冬季藍白雪景燈海＋東京鐵塔同框", url: "https://www.roppongihills.com/" },
            { id: 16, name: "【生日晚餐】敘敘苑（六本木/鐵塔店）", desc: "頂級和牛燒肉與絕美夜景", url: "https://www.jojoen.co.jp/" }
        ],
        comments: []
    },
    {
        day: 5,
        title: "Day 5｜11/14（六）秋葉原/上野最後採買 ➔ 返程",
        items: [
            { id: 17, name: "上野阿美橫町 / 秋葉原", desc: "藥妝、伴手禮與動漫電器採買", url: "https://www.uenotour.com/" },
            { id: 18, name: "【午餐】鴨to蔥（御徒町）", desc: "排隊超人氣美味鴨肉拉麵", url: "https://tabelog.com/tokyo/A1311/A131101/13210371/" }
        ],
        comments: []
    }
];

// ==================== 2. 本地 LocalStorage 狀態儲存與讀取 ====================
function loadData() {
    const saved = localStorage.getItem('tokyo_maple_trip_data');
    return saved ? JSON.parse(saved) : defaultData;
}

function saveData(data) {
    localStorage.setItem('tokyo_maple_trip_data', JSON.stringify(data));
    render();
}

let tripData = loadData();

// ==================== 3. 畫面渲染主邏輯 ====================
function render() {
    const container = document.getElementById('itinerary-container');
    container.innerHTML = '';

    tripData.forEach((dayData, dayIndex) => {
        const card = document.createElement('div');
        card.className = 'day-card';
        card.id = `day-${dayIndex}`;

        // 渲染單天內的景點清單
        let itemsHTML = dayData.items.map((item, itemIndex) => `
            <li class="item-card" draggable="true" data-day="${dayIndex}" data-index="${itemIndex}">
                <span class="drag-handle" title="拖曳排序">⣿</span>
                <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    ${item.url ? `<a href="${item.url}" target="_blank" class="item-link">🔗 連結</a>` : ''}
                    <div class="item-desc">${item.desc}</div>
                </div>
                <div class="item-actions">
                    <button class="btn-action" onclick="moveItem(${dayIndex}, ${itemIndex}, -1)" ${itemIndex === 0 ? 'disabled style="opacity:0.3"' : ''}>⬆️</button>
                    <button class="btn-action" onclick="moveItem(${dayIndex}, ${itemIndex}, 1)" ${itemIndex === dayData.items.length - 1 ? 'disabled style="opacity:0.3"' : ''}>⬇️</button>
                    <button class="btn-action btn-delete" onclick="deleteItem(${dayIndex}, ${itemIndex})">刪除</button>
                </div>
            </li>
        `).join('');

        // 渲染留言清單
        let commentsHTML = dayData.comments.map(c => `
            <li class="comment-item">
                <span class="comment-author">${c.author}:</span> ${c.text}
            </li>
        `).join('');

        // 組合 DOM 結構
        card.innerHTML = `
            <div class="day-title">${dayData.title}</div>
            <ul class="item-list" id="list-${dayIndex}">
                ${itemsHTML}
            </ul>
            <div class="add-form">
                <input type="text" id="name-${dayIndex}" placeholder="景點/餐廳名稱">
                <input type="text" id="desc-${dayIndex}" placeholder="說明 (例如: 排隊名店)">
                <input type="url" id="url-${dayIndex}" placeholder="網址/地圖連結 (選填)">
                <button class="btn-add" onclick="addItem(${dayIndex})">＋ 新增</button>
            </div>
            <div class="comments-section">
                <h4>💬 討論留言區</h4>
                <ul class="comments-list">
                    ${commentsHTML.length ? commentsHTML : '<li style="color:#795548; font-size:0.8rem;">尚無留言</li>'}
                </ul>
                <div class="comment-form">
                    <input type="text" id="author-${dayIndex}" placeholder="暱稱">
                    <input type="text" id="comment-${dayIndex}" placeholder="新增備註或想法...">
                    <button class="btn-comment" onclick="addComment(${dayIndex})">送出</button>
                </div>
            </div>
        `;
        container.appendChild(card);
        setupDragAndDrop(dayIndex);
    });
}

// ==================== 4. 拖曳 (Drag and Drop) 行程排序邏輯 ====================
function setupDragAndDrop(dayIndex) {
    const list = document.getElementById(`list-${dayIndex}`);
    let draggedItem = null;

    list.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('item-card')) {
            draggedItem = e.target;
            e.target.classList.add('dragging');
        }
    });

    list.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('item-card')) {
            e.target.classList.remove('dragging');
            const items = Array.from(list.querySelectorAll('.item-card'));
            const newItems = items.map(el => {
                const idx = el.getAttribute('data-index');
                return tripData[dayIndex].items[idx];
            });
            tripData[dayIndex].items = newItems;
            saveData(tripData);
        }
    });

    list.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(list, e.clientY);
        if (draggedItem) {
            if (afterElement == null) {
                list.appendChild(draggedItem);
            } else {
                list.insertBefore(draggedItem, afterElement);
            }
        }
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.item-card:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// ==================== 5. 景點與留言的操作 (新增/刪除/上下按鈕) ====================
function moveItem(dayIndex, itemIndex, direction) {
    const items = tripData[dayIndex].items;
    const targetIndex = itemIndex + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    
    const temp = items[itemIndex];
    items[itemIndex] = items[targetIndex];
    items[targetIndex] = temp;

    saveData(tripData);
}

function addItem(dayIndex) {
    const nameInput = document.getElementById(`name-${dayIndex}`);
    const descInput = document.getElementById(`desc-${dayIndex}`);
    const urlInput = document.getElementById(`url-${dayIndex}`);

    if (!nameInput.value.trim()) {
        alert('請輸入名稱！');
        return;
    }

    tripData[dayIndex].items.push({
        id: Date.now(),
        name: nameInput.value.trim(),
        desc: descInput.value.trim(),
        url: urlInput.value.trim()
    });

    saveData(tripData);
}

function deleteItem(dayIndex, itemIndex) {
    if (confirm('確定要刪除這個項目嗎？')) {
        tripData[dayIndex].items.splice(itemIndex, 1);
        saveData(tripData);
    }
}

function addComment(dayIndex) {
    const authorInput = document.getElementById(`author-${dayIndex}`);
    const commentInput = document.getElementById(`comment-${dayIndex}`);

    if (!authorInput.value.trim() || !commentInput.value.trim()) {
        alert('請輸入暱稱與留言內容！');
        return;
    }

    tripData[dayIndex].comments.push({
        author: authorInput.value.trim(),
        text: commentInput.value.trim()
    });

    saveData(tripData);
}

// 首次載入頁面時進行渲染
render();