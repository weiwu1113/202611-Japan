// ==================== 1. 預設行程資料 (已精確定位東京各大景點) ====================
const defaultData = [
    {
        day: 1,
        title: "Day 1｜11/10（二）成田機場會合 ➔ 淺草老街與抹茶巡禮",
        items: [
            { id: 101, name: "成田國際機場 (NRT)", desc: "12:00 抵達成田機場第一航廈會合", lat: 35.771987, lng: 140.39285, type: "airport", url: "https://www.narita-airport.jp/ch2/" },
            { id: 102, name: "Hotaku HOTEL (保田區飯店)", desc: "辦理入住與寄放行李 (千代田區岩本町/秋葉原周邊)", lat: 35.6946, lng: 139.7786, type: "hotel", url: "https://www.booking.com/hotel/jp/hotaku.zh-tw.html" },
            { id: 103, name: "淺草雷門・仲見世通", desc: "參觀古老雷門與吃平民美食", lat: 35.711127, lng: 139.796413, type: "spot", url: "https://www.senso-ji.jp/" },
            { id: 104, name: "壽々喜園（淺草本店）", desc: "體驗 Level 1-7 世界最濃抹茶冰淇淋", lat: 35.717144, lng: 139.796013, type: "spot", url: "https://japantravel.navitime.com/" },
            { id: 105, name: "東京晴空塔", desc: "Solamachi 購物與登高欣賞夜景", lat: 35.710063, lng: 139.8107, type: "spot", url: "https://www.tokyo-skytree.jp/" }
        ],
        comments: [{ author: "緯緯", text: "壽々喜園整理券記得先拿！" }]
    },
    {
        day: 2,
        title: "Day 2｜11/11（三）春日部小新巡禮 ➔ 池袋動漫追星",
        items: [
            { id: 201, name: "春日部車站", desc: "蠟筆小新動感百貨與周邊巡禮", lat: 35.98028, lng: 139.7525, type: "spot", url: "https://www.city.kasukabe.lg.jp/" },
            { id: 202, name: "東京大神宮", desc: "著名的結緣祈福神社", lat: 35.70222, lng: 139.74694, type: "spot", url: "https://www.tokyodaijingu.or.jp/" },
            { id: 203, name: "池袋 K-BOOKS K-POP 館", desc: "池袋商圈挖寶與偶像周邊巡禮", lat: 35.7308, lng: 139.7152, type: "spot", url: "https://www.k-books.co.jp/" },
            { id: 204, name: "池袋無敵家拉麵", desc: "超人氣濃郁豚骨叉燒拉麵", lat: 35.7266, lng: 139.7118, type: "spot", url: "https://tabelog.com/" }
        ],
        comments: []
    },
    {
        day: 3,
        title: "Day 3｜11/12（四）東京迪士尼海洋全日暢玩",
        items: [
            { id: 301, name: "東京迪士尼海洋 (Tokyo DisneySea)", desc: "解鎖新園區夢幻泉鄉 Fantasy Springs", lat: 35.6267, lng: 139.8881, type: "spot", url: "https://www.tokyodisneyresort.jp/" },
            { id: 302, name: "麥哲倫餐廳 (Magellan's)", desc: "位於火山腳下的頂級高級餐廳", lat: 35.6256, lng: 139.8856, type: "spot", url: "" }
        ],
        comments: [{ author: "阿傑", text: "入園第一件事記得點 App 搶預約卡！" }]
    },
    {
        day: 4,
        title: "Day 4｜11/13（五・🎂 生日快樂）小網神社 ➔ 澀谷 ➔ 六本木點燈",
        items: [
            { id: 401, name: "小網神社", desc: "財運與強運厄除神社（洗錢池）", lat: 35.6853, lng: 139.7781, type: "spot", url: "https://www.koamijinja.or.jp/" },
            { id: 402, name: "代官山 Forestgate", desc: "隈研吾大師建築風格與散步", lat: 35.6482, lng: 139.7032, type: "spot", url: "" },
            { id: 403, name: "澀谷十字路口 / The Matcha Tokyo", desc: "時尚有機手刷抹茶與地標打卡", lat: 35.6595, lng: 139.7005, type: "spot", url: "https://www.the-matcha.tokyo/" },
            { id: 404, name: "六本木之丘櫸木坂點燈", desc: "經典藍白燈海＋東京鐵塔景緻", lat: 35.6598, lng: 139.7299, type: "spot", url: "https://www.roppongihills.com/" },
            { id: 405, name: "敘敘苑（六本木本店）", desc: "慶生頂級燒肉夜景美饌", lat: 35.6628, lng: 139.7321, type: "spot", url: "https://www.jojoen.co.jp/" }
        ],
        comments: []
    },
    {
        day: 5,
        title: "Day 5｜11/14（六）秋葉原最後採買 ➔ 成田機場返程",
        items: [
            { id: 501, name: "上野阿美橫町 / 鴨to蔥拉麵", desc: "藥妝採買與享用著名鴨肉拉麵", lat: 35.7088, lng: 139.7744, type: "spot", url: "" },
            { id: 502, name: "成田國際機場 (返程)", desc: "13:30 搭電車前往成田機場 17:00 班機", lat: 35.771987, lng: 140.39285, type: "airport", url: "" }
        ],
        comments: []
    }
];

// ==================== 2. LocalStorage 狀態管理 ====================
const STORAGE_KEY = 'tokyo_map_trip_website_v6';

function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultData;
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    renderApp();
}

let tripData = loadData();
let map;
let markersGroup;

// ==================== 3. 初始化地圖 (OpenStreetMap 全彩經典東京視角圖資) ====================
function initMap() {
    // 初始化地圖並聚焦在東京市中心
    map = L.map('map').setView([35.6812, 139.7671], 11);

    // 切換回 OpenStreetMap 經典全彩圖資，清楚呈現東京街道、線路與地理全貌
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    markersGroup = L.layerGroup().addTo(map);
    updateMapMarkers('all');
}

function getCustomMarkerIcon(type) {
    let color = '#c0392b'; // 景點 (楓紅)
    let iconClass = 'fa-location-dot';

    if (type === 'hotel') {
        color = '#27ae60'; // 飯店 (綠色)
        iconClass = 'fa-hotel';
    } else if (type === 'airport') {
        color = '#2980b9'; // 機場 (藍色)
        iconClass = 'fa-plane';
    }

    return L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"><i class="fa-solid ${iconClass}"></i></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

function updateMapMarkers(targetDay) {
    markersGroup.clearLayers();
    const bounds = [];

    tripData.forEach((dayData, dayIndex) => {
        if (targetDay !== 'all' && targetDay !== dayIndex) return;

        dayData.items.forEach((item, itemIndex) => {
            if (item.lat && item.lng) {
                const marker = L.marker([item.lat, item.lng], {
                    icon: getCustomMarkerIcon(item.type)
                });

                marker.bindPopup(`
                    <div style="font-family: sans-serif; font-size: 0.85rem;">
                        <b style="color: #c0392b;">${item.name}</b><br>
                        <span style="color: #666;">${item.desc}</span><br>
                        <a href="#day-${dayIndex}" onclick="highlightCard(${dayIndex}, ${itemIndex})" style="color: #d35400; font-weight: bold; font-size: 0.75rem;">👉 在行程卡片中查看</a>
                    </div>
                `);

                marker.on('click', () => {
                    highlightCard(dayIndex, itemIndex);
                });

                markersGroup.addLayer(marker);
                bounds.push([item.lat, item.lng]);
            }
        });
    });

    if (bounds.length > 0 && targetDay === 'all') {
        map.fitBounds(bounds, { padding: [30, 30] });
    }
}

function focusOnMap(lat, lng, name) {
    if (!lat || !lng) {
        alert('此景點尚未設定經緯度座標！');
        return;
    }
    map.flyTo([lat, lng], 15, { duration: 1.2 });

    markersGroup.eachLayer(layer => {
        const latlng = layer.getLatLng();
        if (Math.abs(latlng.lat - lat) < 0.0001 && Math.abs(latlng.lng - lng) < 0.0001) {
            layer.openPopup();
        }
    });
}

function highlightCard(dayIndex, itemIndex) {
    const cardEl = document.getElementById(`item-${dayIndex}-${itemIndex}`);
    if (cardEl) {
        document.querySelectorAll('.item-card').forEach(el => el.classList.remove('active-spot'));
        cardEl.classList.add('active-spot');
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function filterMapDay(day) {
    updateMapMarkers(day);
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// ==================== 4. 主渲染邏輯 (DOM Rendering) ====================
function renderApp() {
    const container = document.getElementById('itinerary-container');
    container.innerHTML = '';

    tripData.forEach((dayData, dayIndex) => {
        const card = document.createElement('div');
        card.className = 'day-card';
        card.id = `day-${dayIndex}`;

        const itemsHTML = dayData.items.map((item, itemIndex) => {
            let itemClass = 'item-card';
            if (item.type === 'hotel') itemClass += ' hotel-type';
            if (item.type === 'airport') itemClass += ' airport-type';

            return `
                <li class="${itemClass}" id="item-${dayIndex}-${itemIndex}">
                    <div class="item-info">
                        <span class="item-name" onclick="focusOnMap(${item.lat}, ${item.lng}, '${item.name}')">
                            <i class="fa-solid fa-location-dot" style="color: var(--primary);"></i> ${item.name}
                        </span>
                        <div class="item-desc">${item.desc}</div>
                        ${item.url ? `<a href="${item.url}" target="_blank" style="font-size: 0.75rem; color: #d35400;"><i class="fa-solid fa-link"></i> 官方/訂房連結</a>` : ''}
                    </div>
                    <div>
                        <button class="btn-locate" onclick="focusOnMap(${item.lat}, ${item.lng}, '${item.name}')"><i class="fa-solid fa-crosshairs"></i> 地圖</button>
                    </div>
                    <div class="item-actions">
                        <button class="btn-action" onclick="moveItem(${dayIndex}, ${itemIndex}, -1)">⬆️</button>
                        <button class="btn-action" onclick="moveItem(${dayIndex}, ${itemIndex}, 1)">⬇️</button>
                        <button class="btn-action btn-delete" onclick="deleteItem(${dayIndex}, ${itemIndex})">刪</button>
                    </div>
                </li>
            `;
        }).join('');

        const commentsHTML = dayData.comments.map(c => `
            <li class="comment-item">
                <strong style="color: var(--primary);">${c.author}:</strong> ${c.text}
            </li>
        `).join('');

        card.innerHTML = `
            <div class="day-title">${dayData.title}</div>
            <ul class="item-list">${itemsHTML}</ul>

            <!-- 新增行程 (中文地址自動定位) -->
            <div class="add-form">
                <input type="text" id="name-${dayIndex}" placeholder="景點名稱 (例: 東京鐵塔)" style="flex:1.5;">
                <input type="text" id="desc-${dayIndex}" placeholder="說明" style="flex:1;">
                <input type="text" id="address-${dayIndex}" placeholder="輸入中文地址/地名 (例: 淺草寺)" style="flex:1.8;">
                <button class="btn-add" onclick="addSpotByAddress(${dayIndex})">＋ 新增</button>
            </div>

            <div class="comments-section">
                <div style="font-size: 0.82rem; font-weight: bold; margin-bottom: 6px;"><i class="fa-regular fa-comments"></i> 討論留言區</div>
                <ul class="comments-list">${commentsHTML.length ? commentsHTML : '<li style="color:#8d6e63;">尚無留言</li>'}</ul>
                <div class="comment-form">
                    <input type="text" id="author-${dayIndex}" placeholder="暱稱" style="width:80px;">
                    <input type="text" id="comment-${dayIndex}" placeholder="輸入留言..." style="flex:1;">
                    <button class="btn-comment" onclick="addComment(${dayIndex})">送出</button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

// ==================== 5. 透過中文地址自動查詢經緯度並新增 ====================
async function addSpotByAddress(dayIndex) {
    const nameInput = document.getElementById(`name-${dayIndex}`);
    const descInput = document.getElementById(`desc-${dayIndex}`);
    const addressInput = document.getElementById(`address-${dayIndex}`);

    const name = nameInput.value.trim();
    const desc = descInput.value.trim();
    const address = addressInput.value.trim();

    if (!name) {
        alert('請輸入景點名稱！');
        return;
    }
    if (!address) {
        alert('請輸入要查詢的地址或地名（例如：淺草寺、東京鐵塔）！');
        return;
    }

    const queryAddr = address.includes('日本') || address.includes('東京') ? address : `日本東京 ${address}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(queryAddr)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);

            tripData[dayIndex].items.push({
                id: Date.now(),
                name: name,
                desc: desc || address,
                lat: lat,
                lng: lng,
                type: 'spot'
            });

            saveData(tripData);
            updateMapMarkers('all');
            alert(`成功加入「${name}」並已自動定位到地圖！`);
        } else {
            alert('找不到該地址，請嘗試輸入更詳細的地名或知名景點名稱！');
        }
    } catch (error) {
        console.error(error);
        alert('地址解析發生錯誤，請檢查網路連線。');
    }
}

// ==================== 6. 資料增刪與排序 ====================
function moveItem(dayIndex, itemIndex, direction) {
    const items = tripData[dayIndex].items;
    const targetIndex = itemIndex + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const temp = items[itemIndex];
    items[itemIndex] = items[targetIndex];
    items[targetIndex] = temp;

    saveData(tripData);
    updateMapMarkers('all');
}

function deleteItem(dayIndex, itemIndex) {
    if (confirm('確定要刪除此行程嗎？')) {
        tripData[dayIndex].items.splice(itemIndex, 1);
        saveData(tripData);
        updateMapMarkers('all');
    }
}

function addComment(dayIndex) {
    const authorInput = document.getElementById(`author-${dayIndex}`);
    const commentInput = document.getElementById(`comment-${dayIndex}`);

    if (!authorInput.value.trim() || !commentInput.value.trim()) {
        alert('請輸入暱稱與留言！');
        return;
    }

    tripData[dayIndex].comments.push({
        author: authorInput.value.trim(),
        text: commentInput.value.trim()
    });

    saveData(tripData);
}

// ==================== 7. 頁面初始化 ====================
window.onload = () => {
    renderApp();
    initMap();
};