import React from 'react';

/**
 * 衣物 SVG 组件
 * 每个衣物都是一个 SVG group，定位在兔子身上对应位置
 * 坐标系基于兔子 SVG 的 viewBox: 0 0 200 250
 */

// ============================================
// ❄️ 雪天主题衣物
// ============================================

// 秋衣（贴身长袖，穿在最里面）
export const SnowThermal: React.FC = () => (
  <g className="clothing-item clothing-layer-1">
    {/* 秋衣身体 */}
    <path
      d="M72 112
         Q68 118 68 140
         Q68 160 75 170
         Q85 175 100 173
         Q115 175 125 170
         Q132 160 132 140
         Q132 118 128 112
         Q118 105 100 105
         Q82 105 72 112 Z"
      fill="#FFE4B5"
    />
    {/* 秋衣领口 */}
    <ellipse cx="100" cy="110" rx="12" ry="5" fill="#F5DEB3" />
    {/* 秋衣袖口 */}
    <ellipse cx="62" cy="160" rx="8" ry="5" fill="#FFE4B5" />
    <ellipse cx="138" cy="160" rx="8" ry="5" fill="#FFE4B5" />
    {/* 秋衣袖子（覆盖手臂） */}
    <ellipse cx="68" cy="140" rx="9" ry="24" fill="#FFE4B5" transform="rotate(-15 68 140)" />
    <ellipse cx="132" cy="140" rx="9" ry="24" fill="#FFE4B5" transform="rotate(15 132 140)" />
  </g>
);

// 秋裤
export const SnowLeggings: React.FC = () => (
  <g className="clothing-item clothing-layer-1">
    {/* 秋裤左腿 */}
    <ellipse cx="78" cy="180" rx="11" ry="28" fill="#FFE4B5" />
    {/* 秋裤右腿 */}
    <ellipse cx="122" cy="180" rx="11" ry="28" fill="#FFE4B5" />
    {/* 秋裤腰部 */}
    <path
      d="M72 160 Q100 155 128 160 L125 170 Q100 165 75 170 Z"
      fill="#F5DEB3"
    />
  </g>
);

// 毛衣（穿在秋衣外面）
export const SnowSweater: React.FC = () => (
  <g className="clothing-item clothing-layer-2">
    {/* 毛衣身体 */}
    <path
      d="M68 110
         Q62 120 62 145
         Q62 165 72 175
         Q85 180 100 178
         Q115 180 128 175
         Q138 165 138 145
         Q138 120 132 110
         Q118 100 100 98
         Q82 100 68 110 Z"
      fill="#E74C3C"
    />
    {/* 毛衣领口 */}
    <path
      d="M88 105 Q100 110 112 105 Q108 98 100 96 Q92 98 88 105 Z"
      fill="#C0392B"
    />
    {/* 毛衣袖子 */}
    <ellipse cx="62" cy="142" rx="10" ry="26" fill="#E74C3C" transform="rotate(-18 62 142)" />
    <ellipse cx="138" cy="142" rx="10" ry="26" fill="#E74C3C" transform="rotate(18 138 142)" />
    {/* 袖口边 */}
    <ellipse cx="56" cy="165" rx="9" ry="5" fill="#C0392B" />
    <ellipse cx="144" cy="165" rx="9" ry="5" fill="#C0392B" />
    {/* 毛衣花纹（雪花） */}
    <text x="85" y="140" fontSize="10" fill="#fff" opacity="0.7">❄</text>
    <text x="105" y="150" fontSize="8" fill="#fff" opacity="0.6">❄</text>
    {/* 毛衣下摆 */}
    <rect x="70" y="170" width="60" height="8" rx="2" fill="#C0392B" />
  </g>
);

// 裤子（穿在秋裤外面）
export const SnowPants: React.FC = () => (
  <g className="clothing-item clothing-layer-3">
    {/* 裤腰 */}
    <ellipse cx="100" cy="158" rx="28" ry="6" fill="#2C3E50" />
    {/* 左腿裤 */}
    <path
      d="M76 158
         Q72 165 72 190
         Q72 205 76 208
         Q82 210 86 208
         Q88 190 88 160
         Q85 156 76 158 Z"
      fill="#34495E"
    />
    {/* 右腿裤 */}
    <path
      d="M124 158
         Q128 165 128 190
         Q128 205 124 208
         Q118 210 114 208
         Q112 190 112 160
         Q115 156 124 158 Z"
      fill="#34495E"
    />
    {/* 裤脚 */}
    <ellipse cx="78" cy="207" rx="10" ry="4" fill="#2C3E50" />
    <ellipse cx="122" cy="207" rx="10" ry="4" fill="#2C3E50" />
    {/* 裤腰带 */}
    <rect x="75" y="155" width="50" height="5" rx="2" fill="#1A252F" />
  </g>
);

// 外套/滑雪服
export const SnowJacket: React.FC = () => (
  <g className="clothing-item clothing-layer-4">
    {/* 外套身体 */}
    <path
      d="M64 108
         Q56 120 56 150
         Q56 172 68 180
         Q82 185 100 182
         Q118 185 132 180
         Q144 172 144 150
         Q144 120 136 108
         Q120 95 100 92
         Q80 95 64 108 Z"
      fill="#E74C3C"
    />
    {/* 外套拉链 */}
    <line x1="100" y1="100" x2="100" y2="178" stroke="#fff" strokeWidth="2.5" strokeDasharray="0" />
    <circle cx="100" cy="115" r="2.5" fill="#fff" />
    <circle cx="100" cy="135" r="2.5" fill="#fff" />
    <circle cx="100" cy="155" r="2.5" fill="#fff" />
    {/* 外套帽子（在背后） */}
    <ellipse cx="100" cy="95" rx="18" ry="10" fill="#C0392B" />
    {/* 外套袖子 */}
    <ellipse cx="56" cy="145" rx="11" ry="28" fill="#E74C3C" transform="rotate(-20 56 145)" />
    <ellipse cx="144" cy="145" rx="11" ry="28" fill="#E74C3C" transform="rotate(20 144 145)" />
    {/* 袖口（收紧） */}
    <ellipse cx="48" cy="170" rx="10" ry="5" fill="#C0392B" />
    <ellipse cx="152" cy="170" rx="10" ry="5" fill="#C0392B" />
    {/* 外套口袋 */}
    <rect x="72" y="145" width="15" height="12" rx="2" fill="#C0392B" opacity="0.7" />
    <rect x="113" y="145" width="15" height="12" rx="2" fill="#C0392B" opacity="0.7" />
    {/* 外套下摆 */}
    <rect x="66" y="175" width="68" height="8" rx="3" fill="#C0392B" />
  </g>
);

// 围巾
export const SnowScarf: React.FC = () => (
  <g className="clothing-item clothing-layer-5">
    {/* 围巾绕脖子 */}
    <ellipse cx="100" cy="105" rx="18" ry="8" fill="#3498DB" />
    {/* 围巾前面交叉 */}
    <path
      d="M85 105 Q90 118 95 128 L105 128 Q110 118 115 105"
      fill="#2980B9"
    />
    {/* 围巾尾巴（左边垂下） */}
    <rect x="80" y="112" width="14" height="25" rx="3" fill="#3498DB" />
    {/* 围巾条纹 */}
    <rect x="80" y="118" width="14" height="3" fill="#F1C40F" opacity="0.7" />
    <rect x="80" y="128" width="14" height="3" fill="#F1C40F" opacity="0.7" />
    {/* 围巾流苏 */}
    <line x1="82" y1="137" x2="82" y2="142" stroke="#2980B9" strokeWidth="1.5" />
    <line x1="86" y1="137" x2="86" y2="143" stroke="#2980B9" strokeWidth="1.5" />
    <line x1="90" y1="137" x2="90" y2="142" stroke="#2980B9" strokeWidth="1.5" />
  </g>
);

// 针织帽
export const SnowHat: React.FC = () => (
  <g className="clothing-item clothing-layer-9">
    {/* 帽子主体 */}
    <path
      d="M62 55
         Q62 15 100 5
         Q138 15 138 55
         Q138 62 128 64
         L72 64
         Q62 62 62 55 Z"
      fill="#E74C3C"
    />
    {/* 帽子翻边 */}
    <rect x="60" y="55" width="80" height="10" rx="3" fill="#C0392B" />
    {/* 针织纹理 */}
    <path d="M70 25 Q100 18 130 25" stroke="#C0392B" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M68 40 Q100 32 132 40" stroke="#C0392B" strokeWidth="1" fill="none" opacity="0.5" />
    {/* 顶部毛球 */}
    <circle cx="100" cy="6" r="10" fill="#fff" />
    <circle cx="97" cy="4" r="3" fill="#f0f0f0" opacity="0.6" />
  </g>
);

// 手套
export const SnowGloves: React.FC = () => (
  <g className="clothing-item clothing-layer-6">
    {/* 左手套 */}
    <ellipse cx="50" cy="172" rx="11" ry="13" fill="#E74C3C" />
    {/* 左手套拇指 */}
    <ellipse cx="42" cy="168" rx="5" ry="7" fill="#C0392B" transform="rotate(-20 42 168)" />
    {/* 左手套腕口 */}
    <rect x="42" y="180" width="16" height="6" rx="2" fill="#C0392B" />

    {/* 右手套 */}
    <ellipse cx="150" cy="172" rx="11" ry="13" fill="#E74C3C" />
    {/* 右手套拇指 */}
    <ellipse cx="158" cy="168" rx="5" ry="7" fill="#C0392B" transform="rotate(20 158 168)" />
    {/* 右手套腕口 */}
    <rect x="142" y="180" width="16" height="6" rx="2" fill="#C0392B" />
  </g>
);

// 滑雪靴
// 滑雪靴
export const SnowBoots: React.FC = () => (
  <g className="clothing-item clothing-layer-7">
    {/* 左滑雪靴 */}
    <g>
      {/* 靴筒 */}
      <path
        d="M70 178
           Q68 188 68 200
           Q68 210 74 214
           Q88 216 92 213
           Q94 200 94 184
           Q91 178 82 178
           Q73 178 70 181 Z"
        fill="#6C3483"
      />
      {/* 靴身（前部） */}
      <path
        d="M72 195
           Q70 202 70 208
           Q70 213 76 215
           Q86 216 90 214
           Q92 205 92 198
           Q90 195 82 195
           Q75 195 72 197 Z"
        fill="#8E44AD"
      />
      {/* 靴子绑带 */}
      <rect x="70" y="188" width="22" height="4" rx="2" fill="#5B2C6F" />
      <rect x="70" y="198" width="22" height="4" rx="2" fill="#5B2C6F" />
      {/* 靴子鞋底 */}
      <ellipse cx="80" cy="215" rx="14" ry="4" fill="#34495E" />
      {/* 鞋底纹路 */}
      <line x1="70" y1="217" x2="90" y2="217" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* 右滑雪靴 */}
    <g>
      {/* 靴筒 */}
      <path
        d="M130 178
           Q132 188 132 200
           Q132 210 126 214
           Q112 216 108 213
           Q106 200 106 184
           Q109 178 118 178
           Q127 178 130 181 Z"
        fill="#6C3483"
      />
      {/* 靴身（前部） */}
      <path
        d="M128 195
           Q130 202 130 208
           Q130 213 124 215
           Q114 216 110 214
           Q108 205 108 198
           Q110 195 118 195
           Q125 195 128 197 Z"
        fill="#8E44AD"
      />
      {/* 靴子绑带 */}
      <rect x="108" y="188" width="22" height="4" rx="2" fill="#5B2C6F" />
      <rect x="108" y="198" width="22" height="4" rx="2" fill="#5B2C6F" />
      {/* 靴子鞋底 */}
      <ellipse cx="120" cy="215" rx="14" ry="4" fill="#34495E" />
      {/* 鞋底纹路 */}
      <line x1="110" y1="217" x2="130" y2="217" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </g>
);

// 滑雪板
export const SnowBoard: React.FC = () => (
  <g className="clothing-item clothing-layer-0">
    {/* 滑雪板主体 - 有弧度的单板 */}
    <path
      d="M28 220
         Q20 224 25 230
         L175 230
         Q180 224 172 220
         Q175 216 170 214
         L30 214
         Q25 216 28 220 Z"
      fill="#2980B9"
    />
    {/* 滑雪板顶面 */}
    <path
      d="M32 218
         Q28 221 32 224
         L168 224
         Q172 221 168 218
         Q170 215 165 215
         L35 215
         Q30 215 32 218 Z"
      fill="#3498DB"
    />
    {/* 固定器（binding） */}
    <rect x="66" y="209" width="26" height="10" rx="3" fill="#E67E22" />
    <rect x="108" y="209" width="26" height="10" rx="3" fill="#E67E22" />
    {/* 固定器绑带 */}
    <rect x="68" y="212" width="22" height="3" rx="1.5" fill="#D35400" />
    <rect x="110" y="212" width="22" height="3" rx="1.5" fill="#D35400" />
    {/* 滑雪板图案 - 雪花 */}
    <text x="50" y="221" fontSize="8" fill="#fff" opacity="0.8">❄</text>
    <text x="140" y="221" fontSize="8" fill="#fff" opacity="0.8">❄</text>
  </g>
);

// ============================================
// 🏊 泳池主题衣物
// ============================================

// 连体泳衣
// 连体泳衣
export const PoolSwimsuit: React.FC = () => (
  <g className="clothing-item clothing-layer-3">
    {/* 泳衣主体 - 连体，覆盖躯干到胯部 */}
    <path
      d="M72 115
         Q68 125 68 150
         Q68 168 76 176
         Q88 182 100 180
         Q112 182 124 176
         Q132 168 132 150
         Q132 125 128 115
         Q118 108 100 105
         Q82 108 72 115 Z"
      fill="#FF6B6B"
    />
    {/* 泳衣肩带 */}
    <path d="M78 115 Q80 100 90 98" stroke="#FF6B6B" strokeWidth="7" fill="none" strokeLinecap="round" />
    <path d="M122 115 Q120 100 110 98" stroke="#FF6B6B" strokeWidth="7" fill="none" strokeLinecap="round" />
    {/* 领口 */}
    <path d="M82 112 Q100 122 118 112 Q115 106 100 104 Q85 106 82 112 Z" fill="#E85555" />
    {/* 腿边（波浪边） */}
    <path d="M76 176 Q88 182 96 178" stroke="#FFD93D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M104 178 Q112 182 124 176" stroke="#FFD93D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* 泳衣小花装饰 */}
    <circle cx="90" cy="140" r="4" fill="#FFD93D" />
    <circle cx="112" cy="155" r="3" fill="#fff" />
    <circle cx="98" cy="162" r="2.5" fill="#FFD93D" opacity="0.8" />
  </g>
);

// 手臂圈（水袖）
export const PoolArmbands: React.FC = () => (
  <g className="clothing-item clothing-layer-5">
    {/* 左手臂圈 */}
    <ellipse cx="58" cy="138" rx="14" ry="16" fill="#FFD93D" opacity="0.9" />
    <ellipse cx="58" cy="138" rx="9" ry="11" fill="#FFE066" opacity="0.7" />
    {/* 左臂圈高光 */}
    <ellipse cx="54" cy="132" rx="3" ry="5" fill="#fff" opacity="0.4" />

    {/* 右手臂圈 */}
    <ellipse cx="142" cy="138" rx="14" ry="16" fill="#FFD93D" opacity="0.9" />
    <ellipse cx="142" cy="138" rx="9" ry="11" fill="#FFE066" opacity="0.7" />
    {/* 右臂圈高光 */}
    <ellipse cx="138" cy="132" rx="3" ry="5" fill="#fff" opacity="0.4" />
  </g>
);

// 泳帽
export const PoolCap: React.FC = () => (
  <g className="clothing-item clothing-layer-9">
    {/* 泳帽主体 */}
    <path
      d="M58 52
         Q58 10 100 2
         Q142 10 142 52
         Q142 58 130 60
         L70 60
         Q58 58 58 52 Z"
      fill="#4ECDC4"
    />
    {/* 泳帽边缘 */}
    <path d="M60 56 Q100 62 140 56" stroke="#3DB8B0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* 泳帽装饰线 */}
    <path d="M70 32 Q100 22 130 32" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.35" />
    <path d="M65 45 Q100 35 135 45" stroke="#fff" strokeWidth="1" fill="none" opacity="0.25" />
  </g>
);

// 泳镜
export const PoolGoggles: React.FC = () => (
  <g className="clothing-item clothing-layer-10">
    {/* 左镜片 */}
    <ellipse cx="82" cy="60" rx="11" ry="8" fill="#87CEEB" stroke="#2D2D2D" strokeWidth="2" />
    {/* 右镜片 */}
    <ellipse cx="118" cy="60" rx="11" ry="8" fill="#87CEEB" stroke="#2D2D2D" strokeWidth="2" />
    {/* 鼻梁连接 */}
    <line x1="93" y1="60" x2="107" y2="60" stroke="#2D2D2D" strokeWidth="2.5" />
    {/* 泳镜带（绕到泳帽后面） */}
    <path d="M71 60 Q55 50 62 32" stroke="#2D2D2D" strokeWidth="2" fill="none" opacity="0.7" />
    <path d="M129 60 Q145 50 138 32" stroke="#2D2D2D" strokeWidth="2" fill="none" opacity="0.7" />
    {/* 镜片反光 */}
    <ellipse cx="78" cy="57" rx="4" ry="2.5" fill="#fff" opacity="0.6" />
    <ellipse cx="114" cy="57" rx="4" ry="2.5" fill="#fff" opacity="0.6" />
  </g>
);

// 拖鞋（穿在脚上）
export const PoolSlippers: React.FC = () => (
  <g className="clothing-item clothing-layer-5">
    {/* 左拖鞋 */}
    <g>
      {/* 鞋底 */}
      <ellipse cx="78" cy="215" rx="14" ry="5" fill="#FF6B6B" />
      <ellipse cx="78" cy="213" rx="12" ry="3.5" fill="#FF8585" />
      {/* 人字拖带子 */}
      <path d="M78 210 Q78 200 78 208" stroke="#FF6B6B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M68 212 Q78 205 88 212" stroke="#FF6B6B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
    {/* 右拖鞋 */}
    <g>
      {/* 鞋底 */}
      <ellipse cx="122" cy="215" rx="14" ry="5" fill="#FF6B6B" />
      <ellipse cx="122" cy="213" rx="12" ry="3.5" fill="#FF8585" />
      {/* 人字拖带子 */}
      <path d="M122 210 Q122 200 122 208" stroke="#FF6B6B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M112 212 Q122 205 132 212" stroke="#FF6B6B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  </g>
);

// 沙滩球
export const PoolBeachBall: React.FC = () => (
  <g className="clothing-item clothing-layer-7">
    {/* 沙滩球 */}
    <circle cx="170" cy="180" r="16" fill="#FF6B6B" />
    <path d="M154 180 Q170 165 186 180" fill="#FFD93D" opacity="0.7" />
    <path d="M154 180 Q170 195 186 180" fill="#4ECDC4" opacity="0.7" />
    <circle cx="166" cy="174" r="4" fill="#fff" opacity="0.5" />
  </g>
);

// 救生圈（放在身旁）
export const PoolFloat: React.FC = () => (
  <g className="clothing-item clothing-layer-6">
    {/* 救生圈（套在腰上） */}
    <ellipse cx="100" cy="165" rx="45" ry="14" fill="#FF6B6B" stroke="#fff" strokeWidth="3" />
    <ellipse cx="100" cy="165" rx="30" ry="9" fill="#87CEEB" opacity="0.3" />
    {/* 救生圈条纹 */}
    <rect x="97" y="151" width="6" height="28" fill="#fff" />
    {/* 救生圈高光 */}
    <ellipse cx="80" cy="158" rx="6" ry="3" fill="#fff" opacity="0.4" />
  </g>
);

// ============================================
// ☔ 雨天主题衣物
// ============================================

// 雨衣
export const RainCoat: React.FC = () => (
  <g className="clothing-item clothing-layer-4">
    {/* 雨衣身体 */}
    <path
      d="M60 105
         Q50 118 50 150
         Q50 175 62 185
         Q80 190 100 187
         Q120 190 138 185
         Q150 175 150 150
         Q150 118 140 105
         Q122 92 100 88
         Q78 92 60 105 Z"
      fill="#F1C40F"
    />
    {/* 雨衣扣子 */}
    <circle cx="100" cy="115" r="3" fill="#D4AC0D" />
    <circle cx="100" cy="135" r="3" fill="#D4AC0D" />
    <circle cx="100" cy="155" r="3" fill="#D4AC0D" />
    <circle cx="100" cy="172" r="3" fill="#D4AC0D" />
    {/* 雨衣口袋 */}
    <rect x="68" y="148" width="18" height="15" rx="2" fill="#D4AC0D" opacity="0.6" />
    <rect x="114" y="148" width="18" height="15" rx="2" fill="#D4AC0D" opacity="0.6" />
    {/* 雨衣腰带 */}
    <rect x="58" y="162" width="84" height="5" rx="2" fill="#D4AC0D" />
    {/* 雨衣袖子 */}
    <ellipse cx="52" cy="142" rx="12" ry="30" fill="#F1C40F" transform="rotate(-22 52 142)" />
    <ellipse cx="148" cy="142" rx="12" ry="30" fill="#F1C40F" transform="rotate(22 148 142)" />
    {/* 袖口 */}
    <ellipse cx="42" cy="168" rx="11" ry="5" fill="#D4AC0D" />
    <ellipse cx="158" cy="168" rx="11" ry="5" fill="#D4AC0D" />
    {/* 雨衣下摆 */}
    <path d="M58 182 Q100 192 142 182 L138 188 Q100 196 62 188 Z" fill="#D4AC0D" opacity="0.7" />
    {/* 雨衣帽（在背后竖起） */}
    <path
      d="M75 92
         Q80 78 100 75
         Q120 78 125 92
         Q122 98 115 95
         Q100 90 85 95
         Q78 98 75 92 Z"
      fill="#D4AC0D"
    />
  </g>
);

// 雨靴
export const RainBoots: React.FC = () => (
  <g className="clothing-item clothing-layer-5">
    {/* 左雨靴 */}
    <g>
      <path
        d="M66 182
           Q64 195 64 208
           Q64 215 72 218
           Q88 220 92 216
           Q94 200 94 186
           Q91 178 79 178
           Q68 178 66 182 Z"
        fill="#4ECDC4"
      />
      {/* 靴筒翻边 */}
      <path d="M66 190 Q80 186 94 190 L92 196 Q80 192 68 196 Z" fill="#3DB8B0" />
      {/* 靴筒拉环 */}
      <ellipse cx="72" cy="184" rx="3" ry="5" fill="none" stroke="#3DB8B0" strokeWidth="1.5" />
      {/* 鞋底 */}
      <ellipse cx="79" cy="218" rx="14" ry="4" fill="#2C3E50" />
      {/* 鞋底防滑纹 */}
      <line x1="72" y1="220" x2="72" y2="222" stroke="#1A252F" strokeWidth="1.5" />
      <line x1="80" y1="220" x2="80" y2="222" stroke="#1A252F" strokeWidth="1.5" />
      <line x1="88" y1="220" x2="88" y2="222" stroke="#1A252F" strokeWidth="1.5" />
      {/* 鞋头反光 */}
      <ellipse cx="70" cy="214" rx="4" ry="3" fill="#fff" opacity="0.35" />
    </g>

    {/* 右雨靴 */}
    <g>
      <path
        d="M134 182
           Q136 195 136 208
           Q136 215 128 218
           Q112 220 108 216
           Q106 200 106 186
           Q109 178 121 178
           Q132 178 134 182 Z"
        fill="#4ECDC4"
      />
      <path d="M134 190 Q120 186 106 190 L108 196 Q120 192 132 196 Z" fill="#3DB8B0" />
      <ellipse cx="128" cy="184" rx="3" ry="5" fill="none" stroke="#3DB8B0" strokeWidth="1.5" />
      <ellipse cx="121" cy="218" rx="14" ry="4" fill="#2C3E50" />
      <line x1="112" y1="220" x2="112" y2="222" stroke="#1A252F" strokeWidth="1.5" />
      <line x1="120" y1="220" x2="120" y2="222" stroke="#1A252F" strokeWidth="1.5" />
      <line x1="128" y1="220" x2="128" y2="222" stroke="#1A252F" strokeWidth="1.5" />
      <ellipse cx="130" cy="214" rx="4" ry="3" fill="#fff" opacity="0.35" />
    </g>
  </g>
);

// 雨伞（右手举着）
// 雨伞 - 高高举在头顶上方
export const RainUmbrella: React.FC = () => (
  <g className="clothing-item clothing-layer-10">
    {/* 伞柄 - 从右手（大约x=150, y=160）向上延伸到头顶上方 */}
    <line x1="150" y1="155" x2="142" y2="45" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
    {/* 伞柄底部（手握处） */}
    <ellipse cx="150" cy="157" rx="5" ry="3" fill="#6B3410" />
    {/* 伞面 - 半圆弧形，在头顶上方 */}
    <path
      d="M90 42
         Q95 10 142 5
         Q190 10 195 42
         Q180 45 142 43
         Q105 45 90 42 Z"
      fill="#E74C3C"
    />
    {/* 伞面底部边 */}
    <ellipse cx="142" cy="43" rx="52" ry="4" fill="#C0392B" opacity="0.6" />
    {/* 伞面分割线（伞骨） */}
    <path d="M142 7 L110 42" stroke="#C0392B" strokeWidth="1.2" opacity="0.5" />
    <path d="M142 7 L142 43" stroke="#C0392B" strokeWidth="1.2" opacity="0.5" />
    <path d="M142 7 L175 42" stroke="#C0392B" strokeWidth="1.2" opacity="0.5" />
    {/* 伞面白点装饰 */}
    <circle cx="115" cy="28" r="2.5" fill="#fff" opacity="0.7" />
    <circle cx="160" cy="22" r="3" fill="#fff" opacity="0.7" />
    <circle cx="180" cy="32" r="2" fill="#fff" opacity="0.6" />
    <circle cx="135" cy="35" r="2" fill="#fff" opacity="0.5" />
    {/* 伞尖 */}
    <circle cx="142" cy="5" r="3" fill="#C0392B" />
  </g>
);

// 围巾
export const RainScarf: React.FC = () => (
  <g className="clothing-item clothing-layer-5">
    <ellipse cx="100" cy="103" rx="17" ry="7" fill="#E91E63" />
    <path d="M86 103 Q92 115 97 125 L103 125 Q108 115 114 103" fill="#C2185B" />
    <rect x="82" y="110" width="13" height="22" rx="3" fill="#E91E63" />
    <rect x="82" y="116" width="13" height="2.5" fill="#FFD93D" opacity="0.6" />
    <rect x="82" y="125" width="13" height="2.5" fill="#FFD93D" opacity="0.6" />
    <line x1="84" y1="132" x2="84" y2="136" stroke="#C2185B" strokeWidth="1.5" />
    <line x1="88" y1="132" x2="88" y2="137" stroke="#C2185B" strokeWidth="1.5" />
    <line x1="92" y1="132" x2="92" y2="136" stroke="#C2185B" strokeWidth="1.5" />
  </g>
);

// 雨帽
export const RainHood: React.FC = () => (
  <g className="clothing-item clothing-layer-9">
    {/* 雨衣帽戴在头上 */}
    <path
      d="M60 48
         Q60 8 100 0
         Q140 8 140 48
         Q140 58 128 62
         L72 62
         Q60 58 60 48 Z"
      fill="#F1C40F"
      opacity="0.95"
    />
    {/* 帽檐 */}
    <path d="M62 54 Q100 65 138 54" stroke="#D4AC0D" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* 抽绳 */}
    <line x1="78" y1="60" x2="78" y2="68" stroke="#D4AC0D" strokeWidth="2" />
    <circle cx="78" cy="70" r="2" fill="#D4AC0D" />
    <line x1="122" y1="60" x2="122" y2="68" stroke="#D4AC0D" strokeWidth="2" />
    <circle cx="122" cy="70" r="2" fill="#D4AC0D" />
  </g>
);

// 手套
export const RainGloves: React.FC = () => (
  <g className="clothing-item clothing-layer-6">
    <ellipse cx="46" cy="170" rx="10" ry="12" fill="#9B59B6" />
    <ellipse cx="38" cy="166" rx="4.5" ry="6" fill="#8E44AD" transform="rotate(-20 38 166)" />
    <rect x="38" y="178" width="15" height="5" rx="2" fill="#8E44AD" />
    <ellipse cx="154" cy="170" rx="10" ry="12" fill="#9B59B6" />
    <ellipse cx="162" cy="166" rx="4.5" ry="6" fill="#8E44AD" transform="rotate(20 162 166)" />
    <rect x="147" y="178" width="15" height="5" rx="2" fill="#8E44AD" />
  </g>
);

// ============================================
// ☀️ 晴天主题衣物
// ============================================

// T恤 - 简洁版，身体和袖子连在一起
export const SunnyTshirt: React.FC = () => (
  <g className="clothing-item clothing-layer-3">
    {/* T恤整体：身体 + 袖子 连成一片 */}
    <path
      d="M48 125
         Q44 115 55 110
         L72 102
         Q82 96 100 96
         Q118 96 128 102
         L145 110
         Q156 115 152 125
         L148 148
         Q146 152 142 150
         L135 142
         L134 170
         Q132 176 125 177
         L100 178
         L75 177
         Q68 176 66 170
         L65 142
         L58 150
         Q54 152 52 148
         Z"
      fill="#87CEEB"
    />
    {/* 领口 */}
    <path d="M85 104 Q100 114 115 104 Q110 96 100 94 Q90 96 85 104 Z" fill="#6BBEE0" />
    {/* 袖口边 */}
    <ellipse cx="50" cy="148" rx="8" ry="4" fill="#6BBEE0" />
    <ellipse cx="150" cy="148" rx="8" ry="4" fill="#6BBEE0" />
    {/* 下摆 */}
    <rect x="66" y="172" width="68" height="6" rx="3" fill="#6BBEE0" />
    {/* 胸前太阳图案 */}
    <circle cx="100" cy="140" r="9" fill="#FFD93D" />
    <g stroke="#FFD93D" strokeWidth="1.8" strokeLinecap="round">
      <line x1="100" y1="127" x2="100" y2="131" />
      <line x1="100" y1="149" x2="100" y2="153" />
      <line x1="87" y1="140" x2="91" y2="140" />
      <line x1="109" y1="140" x2="113" y2="140" />
    </g>
  </g>
);

// 短裤 - 整体一片式，两个裤腿
export const SunnyShorts: React.FC = () => (
  <g className="clothing-item clothing-layer-3">
    {/* 短裤主体 - 腰到大腿，整体一片 */}
    <path
      d="M72 158
         Q70 162 70 170
         L70 182
         Q72 186 78 186
         Q86 187 90 184
         Q92 178 92 170
         L108 170
         Q108 178 110 184
         Q114 187 122 186
         Q128 186 130 182
         L130 170
         Q130 162 128 158
         Q115 154 100 154
         Q85 154 72 158 Z"
      fill="#FFA726"
    />
    {/* 裤腰 */}
    <path d="M73 158 Q85 154 100 154 Q115 154 127 158 Q127 154 100 152 Q73 154 73 158 Z" fill="#E67E22" />
    {/* 裤脚边 */}
    <ellipse cx="78" cy="186" rx="9" ry="3" fill="#E67E22" />
    <ellipse cx="122" cy="186" rx="9" ry="3" fill="#E67E22" />
    {/* 裤绳 */}
    <path d="M95 158 Q95 163 93 168" stroke="#FFD93D" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M105 158 Q105 163 107 168" stroke="#FFD93D" strokeWidth="2" fill="none" strokeLinecap="round" />
  </g>
);

// 太阳镜
// 太阳镜
export const SunnySunglasses: React.FC = () => (
  <g className="clothing-item clothing-layer-10">
    {/* 镜片外框 */}
    <ellipse cx="82" cy="72" rx="13" ry="10" fill="#333" />
    <ellipse cx="118" cy="72" rx="13" ry="10" fill="#333" />
    {/* 镜片（深色） */}
    <ellipse cx="82" cy="72" rx="10" ry="7.5" fill="#1a1a2e" opacity="0.9" />
    <ellipse cx="118" cy="72" rx="10" ry="7.5" fill="#1a1a2e" opacity="0.9" />
    {/* 鼻梁架 */}
    <path d="M95 72 Q100 76 105 72" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* 镜腿 */}
    <path d="M69 70 Q55 62 52 50" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M131 70 Q145 62 148 50" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* 反光 */}
    <ellipse cx="77" cy="68" rx="4" ry="2.5" fill="#fff" opacity="0.4" />
    <ellipse cx="113" cy="68" rx="4" ry="2.5" fill="#fff" opacity="0.4" />
  </g>
);

// 草帽
export const SunnyHat: React.FC = () => (
  <g className="clothing-item clothing-layer-9">
    {/* 帽檐 */}
    <ellipse cx="100" cy="42" rx="40" ry="7" fill="#DEB887" />
    {/* 帽顶 */}
    <ellipse cx="100" cy="32" rx="22" ry="13" fill="#DEB887" />
    {/* 帽带 */}
    <path d="M78 36 Q100 30 122 36" stroke="#D2691E" strokeWidth="2.5" fill="none" />
    {/* 帽带小花 */}
    <circle cx="100" cy="28" r="4" fill="#FF6B6B" />
    <circle cx="98" cy="27" r="1.5" fill="#FFD93D" />
    {/* 草编纹理 */}
    <path d="M80 38 Q100 33 120 38" stroke="#C4A86B" strokeWidth="1" fill="none" opacity="0.4" />
    <path d="M85 44 Q100 40 115 44" stroke="#C4A86B" strokeWidth="1" fill="none" opacity="0.3" />
  </g>
);

// 运动鞋
export const SunnyShoes: React.FC = () => (
  <g className="clothing-item clothing-layer-5">
    {/* 左运动鞋 */}
    <g>
      {/* 鞋底 */}
      <ellipse cx="78" cy="216" rx="14" ry="5" fill="#fff" />
      <ellipse cx="78" cy="218" rx="13" ry="3.5" fill="#E0E0E0" />
      {/* 鞋身 */}
      <path
        d="M66 192
           Q64 205 66 213
           Q70 216 80 216
           Q92 215 94 212
           Q96 200 96 192
           Q94 186 85 186
           Q70 186 66 192 Z"
        fill="#FF6B6B"
      />
      {/* 鞋头白色 */}
      <ellipse cx="70" cy="210" rx="6" ry="5" fill="#fff" opacity="0.8" />
      {/* 鞋带 */}
      <line x1="75" y1="194" x2="88" y2="198" stroke="#fff" strokeWidth="1.8" />
      <line x1="73" y1="201" x2="88" y2="205" stroke="#fff" strokeWidth="1.8" />
      <line x1="72" y1="208" x2="87" y2="211" stroke="#fff" strokeWidth="1.8" />
      {/* 鞋舌 */}
      <path d="M78 188 Q82 185 86 188 L86 194 Q82 192 78 194 Z" fill="#fff" opacity="0.6" />
    </g>

    {/* 右运动鞋 */}
    <g>
      <ellipse cx="122" cy="216" rx="14" ry="5" fill="#fff" />
      <ellipse cx="122" cy="218" rx="13" ry="3.5" fill="#E0E0E0" />
      <path
        d="M134 192
           Q136 205 134 213
           Q130 216 120 216
           Q108 215 106 212
           Q104 200 104 192
           Q106 186 115 186
           Q130 186 134 192 Z"
        fill="#FF6B6B"
      />
      <ellipse cx="130" cy="210" rx="6" ry="5" fill="#fff" opacity="0.8" />
      <line x1="125" y1="194" x2="112" y2="198" stroke="#fff" strokeWidth="1.8" />
      <line x1="127" y1="201" x2="112" y2="205" stroke="#fff" strokeWidth="1.8" />
      <line x1="128" y1="208" x2="113" y2="211" stroke="#fff" strokeWidth="1.8" />
      <path d="M122 188 Q118 185 114 188 L114 194 Q118 192 122 194 Z" fill="#fff" opacity="0.6" />
    </g>
    {/* 袜子边 */}
    <rect x="68" y="186" width="16" height="4" rx="2" fill="#fff" />
    <rect x="116" y="186" width="16" height="4" rx="2" fill="#fff" />
  </g>
);

// 沙桶
export const SunnyBucket: React.FC = () => (
  <g className="clothing-item clothing-layer-7">
    {/* 沙桶（放在脚边） */}
    <g transform="translate(175, 200)">
      <path d="M-12 0 L-10 18 Q0 22 10 18 L12 0 Z" fill="#FF6B6B" />
      <ellipse cx="0" cy="0" rx="12" ry="3" fill="#FF8787" />
      {/* 桶把手 */}
      <path d="M-10 -2 Q0 -12 10 -2" stroke="#D4AC0D" strokeWidth="2.5" fill="none" />
      {/* 桶上花纹 */}
      <path d="M-8 8 L8 8" stroke="#FF8787" strokeWidth="1" opacity="0.5" />
      <path d="M-9 14 L9 14" stroke="#FF8787" strokeWidth="1" opacity="0.5" />
    </g>
  </g>
);

// 水壶
export const SunnyBottle: React.FC = () => (
  <g className="clothing-item clothing-layer-6">
    {/* 水壶（在身侧） */}
    <g transform="translate(170, 135)">
      {/* 瓶身 */}
      <rect x="-7" y="5" width="14" height="25" rx="4" fill="#4ECDC4" />
      {/* 瓶盖 */}
      <rect x="-5" y="0" width="10" height="7" rx="2" fill="#FF6B6B" />
      {/* 瓶嘴 */}
      <rect x="-2.5" y="-3" width="5" height="4" rx="1.5" fill="#FF8787" />
      {/* 水位线 */}
      <rect x="-5" y="12" width="10" height="3" rx="1" fill="#fff" opacity="0.4" />
      <rect x="-5" y="20" width="10" height="2" rx="1" fill="#fff" opacity="0.3" />
    </g>
  </g>
);

// ============================================
// 衣物映射表
// ============================================

export const clothingComponents: Record<string, React.FC> = {
  // 雪天
  'snow-thermal': SnowThermal,
  'snow-leggings': SnowLeggings,
  'snow-sweater': SnowSweater,
  'snow-pants': SnowPants,
  'snow-jacket': SnowJacket,
  'snow-scarf': SnowScarf,
  'snow-hat': SnowHat,
  'snow-gloves': SnowGloves,
  'snow-boots': SnowBoots,
  'snow-board': SnowBoard,

  // 泳池
  'pool-swimsuit': PoolSwimsuit,
  'pool-armbands': PoolArmbands,
  'pool-cap': PoolCap,
  'pool-goggles': PoolGoggles,
  'pool-slippers': PoolSlippers,
  'pool-float': PoolFloat,
  'pool-ball': PoolBeachBall,

  // 雨天
  'rain-coat': RainCoat,
  'rain-boots': RainBoots,
  'rain-umbrella': RainUmbrella,
  'rain-scarf': RainScarf,
  'rain-hood': RainHood,
  'rain-gloves': RainGloves,

  // 晴天
  'sunny-tshirt': SunnyTshirt,
  'sunny-shorts': SunnyShorts,
  'sunny-sunglasses': SunnySunglasses,
  'sunny-hat': SunnyHat,
  'sunny-shoes': SunnyShoes,
  'sunny-bucket': SunnyBucket,
  'sunny-bottle': SunnyBottle,
};

export default clothingComponents;
