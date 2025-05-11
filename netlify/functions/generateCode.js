const { MongoClient } = require('mongodb');

// MongoDB 连接 URL（需要在 Netlify 环境变量中设置）
const MONGODB_URI = process.env.MONGODB_URI;

// 生成访问码并存储到数据库
exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { code, email, expiry } = JSON.parse(event.body);
    
    // 连接到 MongoDB
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db('spelling-practice');
    const codes = db.collection('access-codes');

    // 存储新的访问码
    await codes.insertOne({
      code,
      email,
      expiry: new Date(expiry),
      createdAt: new Date(),
      active: true,
      type: 'paid',
      deviceLogins: [] // 记录设备登录
    });

    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, code })
    };
  } catch (error) {
    console.error('Error generating code:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate code' })
    };
  }
} 