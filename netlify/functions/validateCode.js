exports.handler = async function(event) {
  const { code } = JSON.parse(event.body);
  if (code && code.toUpperCase() === 'ADMIN') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'admin', expiry: null })
    };
  }
  // 其他情况都当普通用户
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'user', expiry: null })
  };
} 