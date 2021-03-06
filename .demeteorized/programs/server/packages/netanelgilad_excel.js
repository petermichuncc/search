(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var Excel, ExcelUtils, Workbook, Worksheet;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/netanelgilad:excel/lib/utils.js                                            //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var XLSX = Npm.require('xlsx');                                                        // 1
var XLS = Npm.require('xlsjs');                                                        // 2
                                                                                       // 3
ExcelUtils = function (fileType) {                                                     // 4
  this.fileType = fileType;                                                            // 5
};                                                                                     // 6
                                                                                       // 7
ExcelUtils.prototype.sheet_to_json = function (worksheet) {                            // 8
  if (this.fileType === 'xlsx') {                                                      // 9
    return XLSX.utils.sheet_to_json(worksheet);                                        // 10
  }                                                                                    // 11
  else if (this.fileType === 'xls') {                                                  // 12
    return XLS.utils.sheet_to_json(worksheet);                                         // 13
  }                                                                                    // 14
};                                                                                     // 15
                                                                                       // 16
ExcelUtils.prototype.sheet_to_csv = function (worksheet) {                             // 17
  if (this.fileType === 'xlsx') {                                                      // 18
    return XLSX.utils.sheet_to_csv(worksheet);                                         // 19
  }                                                                                    // 20
  else if (this.fileType === 'xls') {                                                  // 21
    return XLS.utils.sheet_to_csv(worksheet);                                          // 22
  }                                                                                    // 23
};                                                                                     // 24
                                                                                       // 25
ExcelUtils.prototype.encode_cell = function (cellAddress) {                            // 26
  if (this.fileType === 'xlsx') {                                                      // 27
    return XLSX.utils.encode_cell(cellAddress);                                        // 28
  }                                                                                    // 29
  else if (this.fileType === 'xls') {                                                  // 30
    return XLS.utils.encode_cell(cellAddress);                                         // 31
  }                                                                                    // 32
};                                                                                     // 33
                                                                                       // 34
ExcelUtils.prototype.encode_range = function (range) {                                 // 35
  if (this.fileType === 'xlsx') {                                                      // 36
    return XLSX.utils.encode_range(range);                                             // 37
  }                                                                                    // 38
  else if (this.fileType === 'xls') {                                                  // 39
    return XLS.utils.encode_range(range);                                              // 40
  }                                                                                    // 41
};                                                                                     // 42
                                                                                       // 43
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/netanelgilad:excel/lib/workbook.js                                         //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var XLSX = Npm.require('xlsx');                                                        // 1
var XLS = Npm.require('xlsjs');                                                        // 2
                                                                                       // 3
Workbook = function (fileType) {                                                       // 4
  this.fileType = fileType;                                                            // 5
                                                                                       // 6
  this.SheetNames = [];                                                                // 7
  this.Sheets = {};                                                                    // 8
};                                                                                     // 9
                                                                                       // 10
Workbook.prototype.addSheet = function (sheetName, sheet) {                            // 11
  this.SheetNames.push(sheetName);                                                     // 12
  this.Sheets[sheetName] = sheet;                                                      // 13
};                                                                                     // 14
                                                                                       // 15
Workbook.prototype.writeToFile = function (filePath) {                                 // 16
  if (this.fileType === 'xlsx') {                                                      // 17
    return XLSX.writeFile(this, filePath);                                             // 18
  }                                                                                    // 19
  else if (this.fileType == 'xls') {                                                   // 20
    return XLS.writeFile(this, filePath);                                              // 21
  }                                                                                    // 22
};                                                                                     // 23
                                                                                       // 24
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/netanelgilad:excel/lib/worksheet.js                                        //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var XLSX = Npm.require('xlsx');                                                        // 1
var XLS = Npm.require('xlsjs');                                                        // 2
                                                                                       // 3
Worksheet = function (fileType) {                                                      // 4
  this.fileType = fileType;                                                            // 5
  this.range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};                       // 6
  this['!merges'] = [];                                                                // 7
};                                                                                     // 8
                                                                                       // 9
Worksheet.prototype.writeToCell = function (row, col, value) {                         // 10
  var utils = new ExcelUtils(this.fileType);                                           // 11
  var cellAddress = utils.encode_cell({c: col, r: row});                               // 12
                                                                                       // 13
  var cell = {                                                                         // 14
    v: value                                                                           // 15
  };                                                                                   // 16
                                                                                       // 17
  if (typeof cell.v === 'number') cell.t = 'n';                                        // 18
  else if (typeof cell.v === 'boolean') cell.t = 'b';                                  // 19
  else if (cell.v instanceof Date) {                                                   // 20
    cell.t = 'n';                                                                      // 21
    cell.z = XLSX.SSF._table[14];                                                      // 22
    cell.v = datenum(cell.v);                                                          // 23
  }                                                                                    // 24
  else cell.t = 's';                                                                   // 25
                                                                                       // 26
  this[cellAddress] = cell;                                                            // 27
                                                                                       // 28
  if (this.range.s.r > row) this.range.s.r = row;                                      // 29
  if (this.range.s.c > col) this.range.s.c = col;                                      // 30
  if (this.range.e.r < row) this.range.e.r = row;                                      // 31
  if (this.range.e.c < col) this.range.e.c = col;                                      // 32
                                                                                       // 33
  this['!ref'] = utils.encode_range(this.range);                                       // 34
};                                                                                     // 35
                                                                                       // 36
Worksheet.prototype.writeObjectArray = function (row, col, objArray, objDefinitions) { // 37
  if (objArray.length === 0)                                                           // 38
    return;                                                                            // 39
                                                                                       // 40
  var self = this;                                                                     // 41
                                                                                       // 42
  if (_.isUndefined(objDefinitions)) {                                                 // 43
    objDefinitions = {};                                                               // 44
    for (var prop in objArray[0]) {                                                    // 45
      if (objArray[0].hasOwnProperty(prop)) {                                          // 46
        objDefinitions[prop] = prop;                                                   // 47
      }                                                                                // 48
    }                                                                                  // 49
  }                                                                                    // 50
                                                                                       // 51
  var currentHeaderCol = col;                                                          // 52
  _.forEach(objDefinitions, function(definition) {                                     // 53
    var header = _.isObject(definition) ? definition.header : definition;              // 54
    self.writeToCell(row, currentHeaderCol, header);                                   // 55
    currentHeaderCol++;                                                                // 56
  });                                                                                  // 57
                                                                                       // 58
  var currentRow = row + 1;                                                            // 59
  _.forEach(objArray, function(item) {                                                 // 60
    var currentCol = col;                                                              // 61
    _.forEach(objDefinitions, function(definition, field) {                            // 62
      var itemData = _.isUndefined(definition.transform) ? item[field] : definition.transform.apply(item, [item[field]]);
      self.writeToCell(currentRow, currentCol, itemData);                              // 64
      currentCol++;                                                                    // 65
    });                                                                                // 66
    currentRow++;                                                                      // 67
  });                                                                                  // 68
};                                                                                     // 69
                                                                                       // 70
Worksheet.prototype.mergeCells = function(startRow, startCol, endRow, endCol) {        // 71
  this['!merges'].push({s:{r:startRow, c:startCol}, e:{r:endRow, c:endCol}});          // 72
};                                                                                     // 73
                                                                                       // 74
Worksheet.prototype.setColumnProperties = function(columns) {                          // 75
  this['!cols'] = columns;                                                             // 76
};                                                                                     // 77
                                                                                       // 78
//////////////////////                                                                 // 79
                                                                                       // 80
function datenum(v, date1904) {                                                        // 81
  if (date1904) v += 1462;                                                             // 82
  var epoch = Date.parse(v);                                                           // 83
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);           // 84
}                                                                                      // 85
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/netanelgilad:excel/netanelgilad:excel.js                                   //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
var XLSX = Npm.require('xlsx');                                                        // 1
var XLS = Npm.require('xlsjs');                                                        // 2
                                                                                       // 3
Excel = function (fileType) {                                                          // 4
  if (fileType != 'xlsx' && fileType != 'xls') {                                       // 5
    throw new Meteor.Error(400, "File must be of type xlsx or xls");                   // 6
  }                                                                                    // 7
                                                                                       // 8
  this.fileType = fileType;                                                            // 9
  this.utils = new ExcelUtils(this.fileType);                                          // 10
};                                                                                     // 11
                                                                                       // 12
Excel.prototype.readFile = function (fileName, read_opts) {                            // 13
  if (this.fileType === 'xlsx') {                                                      // 14
    return XLSX.readFile(fileName, read_opts);                                         // 15
  }                                                                                    // 16
  else if (this.fileType == 'xls') {                                                   // 17
    return XLS.readFile(fileName, read_opts);                                          // 18
  }                                                                                    // 19
};                                                                                     // 20
                                                                                       // 21
Excel.prototype.read = function (file, read_opts) {                                    // 22
  if (this.fileType === 'xlsx') {                                                      // 23
    return XLSX.read(file, read_opts);                                                 // 24
  }                                                                                    // 25
  else if (this.fileType == 'xls') {                                                   // 26
    return XLS.read(file, read_opts);                                                  // 27
  }                                                                                    // 28
};                                                                                     // 29
                                                                                       // 30
Excel.prototype.createWorkbook = function () {                                         // 31
  return new Workbook(this.fileType);                                                  // 32
};                                                                                     // 33
                                                                                       // 34
Excel.prototype.createWorksheet = function () {                                        // 35
  return new Worksheet(this.fileType);                                                 // 36
};                                                                                     // 37
/////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['netanelgilad:excel'] = {
  Excel: Excel
};

})();

//# sourceMappingURL=netanelgilad_excel.js.map
