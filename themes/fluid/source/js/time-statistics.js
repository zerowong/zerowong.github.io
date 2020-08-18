!(function () {
  function tick() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
  }
  const start = new Date("08/18/2020 00:00:00");
  const el = document.getElementById("time-statistics");
  function calc() {
    const interval = (new Date() - start) / 1000;
    let day = interval / 86400;
    day = Math.floor(day);
    let hour = interval / 3600 - 24 * day;
    hour = Math.floor(hour);
    let minute = interval / 60 - 1440 * day - 60 * hour;
    minute = Math.floor(minute);
    let second = interval - 86400 * day - 3600 * hour - 60 * minute;
    second = Math.round(second);
    const ret = [hour, minute, second].map((val) => {
      val = String(val);
      if (val.length === 1) val = "0" + val;
      return val;
    });
    el.innerHTML = `本站已存活 ${day} 天 ${ret[0]} 小时 ${ret[1]} 分钟 ${ret[2]} 秒`;
  }
  (async function update() {
    while (true) {
      calc();
      await tick();
    }
  })();
})();
