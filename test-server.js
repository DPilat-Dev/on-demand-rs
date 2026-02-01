const { exec } = require('child_process');
const http = require('http');

console.log('Starting Next.js dev server...');

// Start the dev server
const nextProcess = exec('npx next dev', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});

// Wait a bit for server to start
setTimeout(() => {
  console.log('\nTesting server connection...');
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
    timeout: 5000
  };
  
  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    if (res.statusCode === 200) {
      console.log('✅ Server is running!');
    } else {
      console.log(`⚠️ Server returned status: ${res.statusCode}`);
    }
    process.exit(0);
  });
  
  req.on('error', (e) => {
    console.log(`❌ Server not reachable: ${e.message}`);
    console.log('Trying port 3001...');
    
    // Try port 3001
    const req2 = http.request({ ...options, port: 3001 }, (res) => {
      console.log(`Status on port 3001: ${res.statusCode}`);
      if (res.statusCode === 200) {
        console.log('✅ Server is running on port 3001!');
      }
      process.exit(0);
    });
    
    req2.on('error', (e2) => {
      console.log(`❌ Server not reachable on port 3001 either: ${e2.message}`);
      process.exit(1);
    });
    
    req2.end();
  });
  
  req.end();
}, 10000); // Wait 10 seconds for server to start

// Kill process on exit
process.on('SIGINT', () => {
  nextProcess.kill();
  process.exit();
});