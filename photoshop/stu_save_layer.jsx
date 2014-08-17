/*
The MIT License (MIT)

Copyright (c) 2014 SMILE TECHNOLOGY UNITED, INC.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* jshint moz: true */


/**
 * constructor
 */
var ExportTarget = function() {
};


/**
 * save
 */
ExportTarget.prototype.save = function() {
  confirm('hello world');
  // こんにちわ
};


/**
 * create_window
 */
ExportTarget.prototype.create_window = function() {

  var dlg = new Window('dialog', 'Export Multiple DDS');
  dlg.alignChildren = 'fill';

  dlg.msgEt = dlg.add('edittext', undefined,
                      'first line\n\nthird line', {multiline: true});
  dlg.msgEt.bounds = [0, 0, 500, 500];

  dlg.btn_group = dlg.add('group');
  dlg.btn_group.orientation = 'row';
  dlg.btn_group.alignChildren = 'fill';

  dlg.btn_group.export_btn = dlg.btn_group.add('button', undefined, 'Export');
  dlg.btn_group.export_btn.alignment = 'left';
  dlg.btn_group.cancel_btn = dlg.btn_group.add('button', undefined, 'Cancel');
  dlg.btn_group.cancel_btn.alignment = 'right';
  that = this;
  dlg.btn_group.export_btn.onClick = function() {
    //alert('hello')
    //f = new File('C:\\user\\ryo');
    /*
    f = File.saveDialog('save');
    alert(f);
    */

    that.export_dds(false);

    dlg.close();
  };

  dlg.show();

};


/**
 * gui
 */
ExportTarget.prototype.gui = function() {
  this.create_window();
};


/**
 * find_array
 * @param {list} source_list array
 * @param {string} target name
 * @return {bool} find flag
 */
ExportTarget.prototype.find_array = function(source_list, target) {
  for each(var s in source_list) {
    if (s === target) {
      return true;
    }
  }
  return false;
};


/**
 * export_dds
 * @param {bool} dry flag
 */
ExportTarget.prototype.export_dds = function(dry) {
  KEYWORDS = ['albedo', 'roughness', 'specular'];

  var outputs = {};
  for each(var key in KEYWORDS) {
    outputs[key] = [];
  }

  var psd_name = app.activeDocument.fullName;

  // レイヤーを振り分けと初期状態の保存
  var layers = app.activeDocument.layers;
  var layer;
  for (var i = 0; i < layers.length; i++) {
    layer = layers[i];
    var name = layer.name;
    var words = name.split('_');
    for each(var word in words) {
      if (this.find_array(KEYWORDS, word)) {
        outputs[word].push(layer);
      }
    }
  }

  // レイヤーのビジビリティを切り替えつつ出力
  for each(key in KEYWORDS) {
    if (outputs[key].length === 0) {
      continue;
    }

    // 一旦すべて非表示にする
    for each(var output in outputs) {
      for each(layer in output) {
        layer.visible = false;
      }
    }
    // 対象のレイヤーを表示にする
    for each(layer in outputs[key]) {
      layer.visible = true;
    }

    // 出力
    var new_name = psd_name.fullName;
    new_name = new_name.replace(/\.psd/, '_' + key + '.dds');
    //alert(key + ' ' + new_name);
    this.action_save_dds(new_name);
  }
};


/**
 * action_save_dds
 * ScriptListener.8liでdesktop/ScriptingListenerJS.logに保存されたアクション
 * @param {string} filename output filename
 */
ExportTarget.prototype.action_save_dds = function(filename) {
  if (filename === undefined) {
    return;
  }
  if (filename === '') {
    return;
  }

  // =======================================================
  var idsave = charIDToTypeID('save');

  var desc308 = new ActionDescriptor();
  var idAs = charIDToTypeID('As  ');

  var desc309 = new ActionDescriptor();
  var idbarF = charIDToTypeID('barF');
  desc309.putBoolean(idbarF, true);
  var idfdev = charIDToTypeID('fdev');
  desc309.putDouble(idfdev, 3.000000);
  var idfbia = charIDToTypeID('fbia');
  desc309.putDouble(idfbia, 0.000000);
  var idurad = charIDToTypeID('urad');
  desc309.putDouble(idurad, 5.000000);
  var iduamo = charIDToTypeID('uamo');
  desc309.putDouble(iduamo, 0.500000);
  var iduthr = charIDToTypeID('uthr');
  desc309.putDouble(iduthr, 0.000000);
  var idxstf = charIDToTypeID('xstf');
  desc309.putDouble(idxstf, 1.000000);
  var idxthf = charIDToTypeID('xthf');
  desc309.putDouble(idxthf, 1.000000);
  var idqual = charIDToTypeID('qual');
  desc309.putInteger(idqual, 70);
  var iderdi = charIDToTypeID('erdi');
  desc309.putBoolean(iderdi, false);
  var iderdw = charIDToTypeID('erdw');
  desc309.putInteger(iderdw, 1);
  var idusfa = charIDToTypeID('usfa');
  desc309.putBoolean(idusfa, false);
  var idtxfm = charIDToTypeID('txfm');
  desc309.putInteger(idtxfm, 2);
  var idweig = charIDToTypeID('weig');
  desc309.putInteger(idweig, 0);
  var idtmty = charIDToTypeID('tmty');
  desc309.putInteger(idtmty, 0);
  var idmmty = charIDToTypeID('mmty');
  desc309.putInteger(idmmty, 30);
  var idsmip = charIDToTypeID('smip');
  desc309.putInteger(idsmip, 0);
  var idbina = charIDToTypeID('bina');
  desc309.putBoolean(idbina, false);
  var idprem = charIDToTypeID('prem');
  desc309.putBoolean(idprem, false);
  var idfilm = charIDToTypeID('film');
  desc309.putBoolean(idfilm, false);
  var idalpb = charIDToTypeID('alpb');
  desc309.putBoolean(idalpb, false);
  var idbord = charIDToTypeID('bord');
  desc309.putBoolean(idbord, false);
  var idbrdr = charIDToTypeID('brdr');
  desc309.putDouble(idbrdr, 0.000000);
  var idbrdg = charIDToTypeID('brdg');
  desc309.putDouble(idbrdg, 0.000000);
  var idbrdb = charIDToTypeID('brdb');
  desc309.putDouble(idbrdb, 0.000000);
  var idmmft = charIDToTypeID('mmft');
  desc309.putInteger(idmmft, 2);
  var idfdcl = charIDToTypeID('fdcl');
  desc309.putBoolean(idfdcl, false);
  var idfdaf = charIDToTypeID('fdaf');
  desc309.putBoolean(idfdaf, false);
  var idftworl = charIDToTypeID('f2rl');
  desc309.putDouble(idftworl, 0.500000);
  var idftwogl = charIDToTypeID('f2gl');
  desc309.putDouble(idftwogl, 0.500000);
  var idftwobl = charIDToTypeID('f2bl');
  desc309.putDouble(idftwobl, 0.500000);
  var idftwoal = charIDToTypeID('f2al');
  desc309.putDouble(idftwoal, 0.500000);
  var idfddl = charIDToTypeID('fddl');
  desc309.putInteger(idfddl, 0);
  var idfafm = charIDToTypeID('fafm');
  desc309.putDouble(idfafm, 0.150000);
  var idbafh = charIDToTypeID('bafh');
  desc309.putDouble(idbafh, 0.500000);
  var iddthc = charIDToTypeID('dthc');
  desc309.putBoolean(iddthc, false);
  var iddthzero = charIDToTypeID('dth0');
  desc309.putBoolean(iddthzero, false);
  var idsmth = charIDToTypeID('smth');
  desc309.putInteger(idsmth, 0);
  var idfilg = charIDToTypeID('filg');
  desc309.putDouble(idfilg, 2.200000);
  var idfieg = charIDToTypeID('fieg');
  desc309.putBoolean(idfieg, false);
  var idfilw = charIDToTypeID('filw');
  desc309.putDouble(idfilw, 10.000000);
  var idover = charIDToTypeID('over');
  desc309.putBoolean(idover, false);
  var idfblr = charIDToTypeID('fblr');
  desc309.putDouble(idfblr, 1.000000);
  var idnmcv = charIDToTypeID('nmcv');
  desc309.putBoolean(idnmcv, false);
  var idncnv = charIDToTypeID('ncnv');
  desc309.putInteger(idncnv, 1009);
  var idnflt = charIDToTypeID('nflt');
  desc309.putInteger(idnflt, 1040);
  var idnmal = charIDToTypeID('nmal');
  desc309.putInteger(idnmal, 1034);
  var idnmbr = charIDToTypeID('nmbr');
  desc309.putBoolean(idnmbr, false);
  var idnmix = charIDToTypeID('nmix');
  desc309.putBoolean(idnmix, false);
  var idnmiy = charIDToTypeID('nmiy');
  desc309.putBoolean(idnmiy, false);
  var idnmiz = charIDToTypeID('nmiz');
  desc309.putBoolean(idnmiz, false);
  var idnmah = charIDToTypeID('nmah');
  desc309.putBoolean(idnmah, false);
  var idnswp = charIDToTypeID('nswp');
  desc309.putBoolean(idnswp, false);
  var idnmsc = charIDToTypeID('nmsc');
  desc309.putDouble(idnmsc, 2.000000);
  var idnmnz = charIDToTypeID('nmnz');
  desc309.putInteger(idnmnz, 0);
  var idusbi = charIDToTypeID('usbi');
  desc309.putBoolean(idusbi, false);
  var idlien = charIDToTypeID('lien');
  desc309.putBoolean(idlien, false);
  var idshdi = charIDToTypeID('shdi');
  desc309.putBoolean(idshdi, false);
  var idshfi = charIDToTypeID('shfi');
  desc309.putBoolean(idshfi, false);
  var idshmm = charIDToTypeID('shmm');
  desc309.putBoolean(idshmm, true);
  var idshan = charIDToTypeID('shan');
  desc309.putBoolean(idshan, true);
  var idclrc = charIDToTypeID('clrc');
  desc309.putInteger(idclrc, 0);
  var idvdxone = charIDToTypeID('vdx1');
  desc309.putBoolean(idvdxone, true);
  var idvdxtwo = charIDToTypeID('vdx2');
  desc309.putBoolean(idvdxtwo, true);
  var idvdxthree = charIDToTypeID('vdx3');
  desc309.putBoolean(idvdxthree, true);
  var idvdxfive = charIDToTypeID('vdx5');
  desc309.putBoolean(idvdxfive, true);
  var idvfourfourfour = charIDToTypeID('v444');
  desc309.putBoolean(idvfourfourfour, true);
  var idvfivefivefive = charIDToTypeID('v555');
  desc309.putBoolean(idvfivefivefive, true);
  var idvfivesixfive = charIDToTypeID('v565');
  desc309.putBoolean(idvfivesixfive, true);
  var idveighteighteight = charIDToTypeID('v888');
  desc309.putBoolean(idveighteighteight, true);
  var idalph = charIDToTypeID('alph');
  desc309.putBoolean(idalph, false);
  var idusra = charIDToTypeID('usra');
  desc309.putBoolean(idusra, false);
  var idusfs = charIDToTypeID('usfs');
  desc309.putInteger(idusfs, 0);
  var idprev = charIDToTypeID('prev');
  desc309.putBoolean(idprev, false);
  var idrdep = charIDToTypeID('rdep');
  desc309.putInteger(idrdep, 3000);
  var idlomm = charIDToTypeID('lomm');
  desc309.putBoolean(idlomm, false);
  var idsflp = charIDToTypeID('sflp');
  desc309.putBoolean(idsflp, false);
  var idlflp = charIDToTypeID('lflp');
  desc309.putBoolean(idlflp, false);
  var idscar = charIDToTypeID('scar');
  desc309.putDouble(idscar, 1.000000);
  var idscag = charIDToTypeID('scag');
  desc309.putDouble(idscag, 1.000000);
  var idscab = charIDToTypeID('scab');
  desc309.putDouble(idscab, 1.000000);
  var idscaa = charIDToTypeID('scaa');
  desc309.putDouble(idscaa, 1.000000);
  var idbiar = charIDToTypeID('biar');
  desc309.putDouble(idbiar, 0.000000);
  var idbiag = charIDToTypeID('biag');
  desc309.putDouble(idbiag, 0.000000);
  var idbiab = charIDToTypeID('biab');
  desc309.putDouble(idbiab, 0.000000);
  var idbiaa = charIDToTypeID('biaa');
  desc309.putDouble(idbiaa, 0.000000);
  var idsiar = charIDToTypeID('siar');
  desc309.putDouble(idsiar, 1.000000);
  var idsiag = charIDToTypeID('siag');
  desc309.putDouble(idsiag, 1.000000);
  var idsiab = charIDToTypeID('siab');
  desc309.putDouble(idsiab, 1.000000);
  var idsiaa = charIDToTypeID('siaa');
  desc309.putDouble(idsiaa, 1.000000);
  var idbiir = charIDToTypeID('biir');
  desc309.putDouble(idbiir, 0.000000);
  var idbiig = charIDToTypeID('biig');
  desc309.putDouble(idbiig, 0.000000);
  var idbiib = charIDToTypeID('biib');
  desc309.putDouble(idbiib, 0.000000);
  var idbiia = charIDToTypeID('biia');
  desc309.putDouble(idbiia, 0.000000);
  var idoutw = charIDToTypeID('outw');
  desc309.putBoolean(idoutw, false);
  var idclcL = charIDToTypeID('clcL');
  desc309.putBoolean(idclcL, true);

  var idNVIDIADthreeD_DDS = stringIDToTypeID('NVIDIA D3D/DDS');
  desc308.putObject(idAs, idNVIDIADthreeD_DDS, desc309);
  var idIn = charIDToTypeID('In  ');
  desc308.putPath(idIn, new File(filename));
  var idDocI = charIDToTypeID('DocI');
  desc308.putInteger(idDocI, 1283);
  var idCpy = charIDToTypeID('Cpy ');
  desc308.putBoolean(idCpy, true);
  var idsaveStage = stringIDToTypeID('saveStage');
  var idsaveStageType = stringIDToTypeID('saveStageType');
  var idsaveBegin = stringIDToTypeID('saveBegin');
  desc308.putEnumerated(idsaveStage, idsaveStageType, idsaveBegin);

  executeAction(idsave, desc308, DialogModes.NO);
  // =======================================================
};

var et = new ExportTarget();
et.gui();

// EOF
