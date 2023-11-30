//console.log("Hello Coin");
//console.log("test12312313");
//URL = "http:\\\\localhost:8082"
let URL = "https:\\\\walbi-coins-f5f6175f8253.herokuapp.com";
let INTERVAL_FOR_CHART = "3h";

let tableWrapper = $("#table-wrapper");
let sourceRow = $("#o-c-row");
let historicalData = {};

// HELPER
function waitForEl(selector, callback, maxtries = false, interval = 100) {
  const poller = setInterval(() => {
    const el = $(selector);
    const retry = maxtries === false || maxtries-- > 0;
    if (retry && el.length <= 1) {
      // will try again
      return;
    }
    clearInterval(poller);
    callback(el || null);
  }, interval);
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function print(obj) {
  console.log(obj);
}

function commafy(num) {
  var str = num.split(".");
  if (str[0].length > 3) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 3) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
}

function formatingMoney(cost, use_dollar = true) {
  var str = commafy(Number.parseFloat(cost).toFixed(2));
  if (use_dollar) {
    return "$" + str;
  }

  return str;
}
// END HELPER

function setPercent(elem, percent) {
  elem.text(Number.parseFloat(percent).toFixed(2) + "%");
  var parent = elem.parent();
  parent.removeClass("text-color-red text-color-green");
  var first = parent.children(":first");
  if (percent > 0) {
    parent.addClass("text-color-green");
    first.text("▲");
    return;
  }

  first.text("▼");
  parent.addClass("text-color-red");
}

function randNumbers() {
  var numbers = [];

  for (var i = 0; i < 15; i += 1) {
    numbers.push(Math.random() * 50);
  }

  return numbers;
}

function getPrices(q) {
  var prices = [];
  var min = q[0].quote.USD.price;
  var max = min;
  var price = 0;
  q.forEach(function (info) {
    var price = info.quote.USD.price;
    if (price > max) {
      max = price;
    }
    if (price < min) {
      min = price;
    }
  });

  q.forEach(function (info) {
    price = (info.quote.USD.price - min) / (max - min);
    prices.push(Number.parseFloat(price.toFixed(2)));
  });

  return prices;
}

// var eth = [
//   8.3,
//   10.57,
//   15.73,
//   49.51,
//   85.69,
//   226.51,
//   246.65,
//   213.87,
//   386.61,
//   303.56,
//   298.21,
// ];

function drawGraphs() {
  $(".sparkline").each(function () {
    var elem = $(this)[0];
    if ($(this)[0].id.trim() !== "") {
      var key = elem.id.replace("c-graph_", "");
      var prices = getPrices(historicalData[key][0].quotes);
      sparkline.sparkline(elem, prices);
      if (prices[0] <= prices[prices.length - 1]) {
        $(this).css("stroke", "green");
      } else {
        $(this).css("stroke", "red");
      }
    }
  });
}

function create_record(data, meta, ticker) {
  const clonedItem = sourceRow.clone().removeAttr("id");
  const cName = clonedItem.find(".c-name");
  const cCode = clonedItem.find(".c-code, #c-volume-code");
  const cLogo = clonedItem.find("#c-logo");
  const cButton = clonedItem.find(".button");

  const cPrice = clonedItem.find("#c-price");
  const c1H = clonedItem.find("#c-1h");
  const c24H = clonedItem.find("#c-24h");
  const c7d = clonedItem.find("#c-7d");
  const cMarketCap = clonedItem.find("#c-market-cap");
  const cVolume24 = clonedItem.find("#c-volume-24");
  const cVolumeInTicker = clonedItem.find("#c-volume");
  const cGraph = clonedItem.find("#c-graph");

  // load data from API
  // "price": 0.41003756997678176,
  // "volume_24h": 0.468684144590817,
  // "volume_change_24h": 0.076262003055378,
  // "percent_change_1h": 0.2743809382730067,
  // "percent_change_24h": 0.8482108770918979,
  // "percent_change_7d": 0.9719371086850697,
  // "percent_change_30d": 0.8051354810191695,
  // "market_cap": 0.47777489410312657,
  // "market_cap_dominance": 3833,
  var quote = data[0].quote.USD;

  cPrice.text(formatingMoney(quote.price));
  setPercent(c1H, quote.percent_change_1h);
  setPercent(c24H, quote.percent_change_24h);
  setPercent(c7d, quote.percent_change_7d);

  cMarketCap.text(formatingMoney(quote.market_cap));
  cVolume24.text(formatingMoney(quote.volume_24h));
  cVolumeInTicker.text(formatingMoney(quote.volume_24h / quote.price, false));

  var spark = cGraph.find(".sparkline");
  spark.attr("id", "c-graph_" + ticker);

  // load meta
  cName.text(meta.name);
  cCode.text(ticker);
  cLogo.attr("src", meta.image);
  cLogo.attr("alt", meta.name);
  var cta = meta.cta;
  cButton.text(cta);
  cButton.attr("href", meta.url);
  if (cta.trim() === "") {
    cButton.hide(); // Скрываем кнопку, если нет текста
  }

  return clonedItem;
}

function update_table(datas) {
  for (var ticker in datas) {
    var newItem = create_record(datas[ticker], coints[ticker], ticker);
    tableWrapper.append(newItem);
  }
}

function httpGet(path, params, callback) {
  $.ajax({
    async: false,
    method: "GET",
    url: URL + path,
    success: function (responce) {
      callback(responce.data);
    },
    data: params,
    error: function () {
      alert("error");
    }
  });
}

function getInformationData(tickers) {
  params = { symbol: tickers };
  httpGet("/latest", params, update_table);
}

function getHistoricalData(tickers) {
  now = new Date();
  since = now.addDays(-7);
  params = {
    symbol: tickers,
    interval: INTERVAL_FOR_CHART,
    time_start: since.toISOString(),
    time_end: now.toISOString()
  };
  httpGet("/historical", params, function (data) {
    historicalData = data;
  });
}

var coinSliderWrappers = $(".coin-slider-wrapper");
coints = {};
coinSliderWrappers.each(function () {
  coin = $(this);
  meta = {};
  meta["name"] = coin.find(".o-c-name").text();
  meta["cta"] = coin.find(".o-c-cta-name").text();
  meta["url"] = coin.find(".o-c-cta-url").text();
  meta["image"] = coin.find(".o-c-image").attr("src");
  code = coin.find(".o-c-code").text();

  coints[code] = meta;
});

tickers = Object.keys(coints).join(",");
getHistoricalData(tickers);
getInformationData(tickers);
waitForEl(".sparkline", drawGraphs);
