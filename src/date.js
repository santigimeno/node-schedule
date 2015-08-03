var tz = require('timezone');

function TZDate(arg, _tz) {
  this.tz = _tz || 'UTC';
  if (this.tz !== 'UTC') {
      var timezone = this.tz.split('/');
      this.region = tz(require('timezone/' + timezone[0]));
  } else {
      this.region = tz;
  }

  this._refresh(arg);
}

TZDate.prototype._refresh = function(arg) {
  this.date = arg ? this.region(arg, this.tz) : Date.now();
  var date_str = this.region(this.date, this.tz, "%Y %m %d %H %M %S %w");
  var d = date_str.split(/\s+/).map(function (e) { return parseInt(e, 10) });
  [ this.year, this.month, this.day, this.hour, this.minute, this.second, this.dow ] = d;
};

TZDate.prototype.addYear = function () {
    this.month = 1;
    this.day = 1;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this._refresh(this.region([this.year, this.month, this.day, this.hour, this.minute, this.second], this.tz, '+1 year'));
};

TZDate.prototype.addMonth = function () {
    this.day = 1;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this._refresh(this.region([this.year, this.month, this.day, this.hour, this.minute, this.second], this.tz, '+1 month'));
};

TZDate.prototype.addDay = function () {
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this._refresh(this.region([this.year, this.month, this.day, this.hour, this.minute, this.second], this.tz, '+1 day'));
};

TZDate.prototype.addHour = function () {
    this.minute = 0;
    this.second = 0;
    this._refresh(this.region([this.year, this.month, this.day, this.hour, this.minute, this.second], this.tz, '+1 hour'));
};

TZDate.prototype.addMinute = function () {
    this.second = 0;
    this._refresh(this.region([this.year, this.month, this.day, this.hour, this.minute, this.second], this.tz, '+1 minute'));
};

TZDate.prototype.addSecond = function () {
    this._refresh(this.region([this.year, this.month, this.day, this.hour, this.minute, this.second], this.tz, '+1 second'));
};

TZDate.prototype.toString = function() {
    return this.region(this.date, this.tz, "%Y %m %d %H %M %S");
};

TZDate.prototype.getFullYear = function() {
    return this.year;
};

TZDate.prototype.getMonth = function() {
    return this.month - 1;
};

TZDate.prototype.getDate = function() {
    return this.day;
};

TZDate.prototype.getDay = function() {
    return this.dow;
};

TZDate.prototype.getHours = function() {
    return this.hour;
};

TZDate.prototype.getMinutes = function() {
    return this.minute;
};

TZDate.prototype.getSeconds = function() {
    return this.second;
};

TZDate.prototype.getTime = function() {
    return this.date;
};

module.exports = TZDate;
