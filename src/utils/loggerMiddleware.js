const logger = (message) => {
  const time= new Date().toISOString();
  const entry= `[${time}] LOG: ${message}`;
  let logs= JSON.parse(localStorage.getItem('logs')||'[]');
  logs.push(entry);
  localStorage.setItem('logs', JSON.stringify(logs));
};

export default logger;