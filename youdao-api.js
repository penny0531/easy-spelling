// youdao-api.js

async function queryYoudao(word) {
    const appKey = '4733c68e76321b78';  // 替换成你的 appKey
    const appSecret = 'vEEVfY9i86WwYm35kqIqedzZOcaZnicp';  // 替换成你的 appSecret
    const salt = Date.now();
    const curtime = Math.round(new Date().getTime() / 1000);

    const str1 = appKey + truncate(word) + salt + curtime + appSecret;
    const sign = await sha256(str1);

    const formData = new URLSearchParams();
    formData.append('q', word);
    formData.append('from', 'en');
    formData.append('to', 'zh-CHS');
    formData.append('appKey', appKey);
    formData.append('salt', salt);
    formData.append('sign', sign);
    formData.append('signType', 'v3');
    formData.append('curtime', curtime);

    try {
        const response = await fetch('https://openapi.youdao.com/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        const data = await response.json();
        if (data.translation && data.translation.length > 0) {
            return data.translation[0]; // 返回中文翻译
        } else {
            return '未找到中文释义';
        }
    } catch (error) {
        console.error('Youdao API error:', error);
        return '查询失败';
    }
}

function truncate(q) {
    const len = q.length;
    if (len <= 20) return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}