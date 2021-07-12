var mysql = require('mysql');
var fs = require("fs")

var connection = mysql.createConnection({
  host: '39.99.148.170',
  port: '3306',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'secureswap'
});

//写入文件，会完全替换之前JSON文件中的内容
function writeData(path, value) {
  var str = JSON.stringify(value, "", "\t");
  fs.writeFile(path, str, function (err) {
    if (err) {
      console.error(err);
    }
    console.log('写入成功!');
  })
}

// 按某一时间间隔取汇率
function takeRate(gapcount, newestcount, tokenname) {
  console.log("used " + tokenname);
  var command = 'SELECT * FROM ' + tokenname + '\
    WHERE count = ? OR count = ? OR count = ? OR count = ? OR count = ? OR count = ? OR count = ?;'
  var para = [newestcount, newestcount - gapcount, newestcount - 2 * gapcount,
    newestcount - 3 * gapcount, newestcount - 4 * gapcount, newestcount - 5 * gapcount, newestcount - 6 * gapcount
  ];
  path = "./js/" + tokenname + ".json";
  (function (command, para, path) {
    connection.query(command, para, function (error, result) {
      if (error) {
        console.log('[INSERT ERROR] - ', error.message);
        return;
      }
      console.log("writepath: " + path);
      writeData(path, result);
    });
  }) (command, para, path);

}

connection.connect();


// 开始运行
connection.query('SELECT `name` FROM  `token`;', function (error, result) {
  if (error) throw error;
  writeData("./js/tokenlist.json", result);
  var tokenlist = result;
  for (var key in tokenlist) {
    console.log(tokenlist[key].name);
    (function (key) {
      connection.query('SELECT max(count) AS maxc FROM `' + tokenlist[key].name + '`;', function (error, result) {
        if (error) throw error;
        console.log(tokenlist[key].name);
        var tokenname = tokenlist[key].name
        var newestcount = result[0].maxc;
        console.log("takerate: " + tokenname);
        takeRate(120, newestcount, tokenname);
      });
    })(key);

  }
  var selectrate_new;
});

setTimeout(function () {
  connection.end();
}, 3000);