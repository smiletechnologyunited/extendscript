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

var str = $.version;

ExportTarget = function() {
};

ExportTarget.prototype.save = function() {
    confirm("hello world");
    // こんにちわ
};

ExportTarget.prototype.create_window = function() {

    var dlg = new Window("dialog", "Export Multiple DDS");
    dlg.alignChildren = "fill";
    {
        dlg.msgEt = dlg.add("edittext", undefined, "first line\n\nthird line", {multiline:true});
        dlg.msgEt.bounds = [0,0,500, 500];

        dlg.btn_group = dlg.add("group");
        dlg.btn_group.orientation = "row";
        dlg.btn_group.alignChildren = "fill";
        {
            dlg.btn_group.export_btn = dlg.btn_group.add("button", undefined, "Export"); 
            dlg.btn_group.export_btn.alignment = "left";
            dlg.btn_group.cancel_btn = dlg.btn_group.add("button", undefined, "Cancel"); 
            dlg.btn_group.cancel_btn.alignment = "right";
            that = this;
            dlg.btn_group.export_btn.onClick = function() {
                //alert("hello")
                //f = new File("C:\\user\\ryo");
                /*
                f = File.saveDialog("save");
                alert(f);
                */

                that.export_dds(false);

                dlg.close();
            };

        }
    }
    dlg.show();

};

ExportTarget.prototype.run = function() {
    this.create_window();
};

function find_array(source_list, target){
    for each(s in source_list){
        if (s == target){
            return true;
        }
    }
    return false;
}

ExportTarget.prototype.export_dds = function(dry) {
    KEYWORDS = ["albedo", "roughness", "specular"]

    var outputs = {};
    for each(key in KEYWORDS){
        outputs[key] = [];
    }

    var psd_name = app.activeDocument.fullName;

    // レイヤーを振り分けと初期状態の保存
    var layers = app.activeDocument.layers;
    for (i = 0; i < layers.length; i ++){
        var layer = layers[i];
        var name = layer.name;
        words = name.split("_");
        for each(word in words){
            if (find_array(KEYWORDS, word)){
                outputs[word].push(layer);
            }
        }
    }

    // レイヤーのビジビリティを切り替えつつ出力
    for each(key in KEYWORDS){
        if (outputs[key].length == 0){
            continue;
        }

        // 一旦すべて非表示にする
        for each(output in outputs){
            for each(layer in output){
                layer.visible = false;
            }
        }
        // 対象のレイヤーを表示にする
        for each(layer in outputs[key]){
            layer.visible = true;
        }

        // 出力
        new_name = new String(psd_name)
        new_name = new_name.replace(/\.psd/, "_"+key+".dds")
        //alert(key + " " + new_name);
        action_save_dds(new_name);
    }
};

et = new ExportTarget();
et.run();


function test_window(){
// ウインドウの作成
var dlg = new Window("dialog", "Export Multiple DDS");
//var dlg = new Window("dialog", "Export Multiple DDS", undefined, {resizeable:true});
dlg.alignChildren = "fill";
{
    /*
    dlg.btnPnl = dlg.add("panel", undefined, "Build it");
    dlg.btnPnl.margins = [200,0,0,0];
    dlg.btnPnl.testBtn = dlg.btnPnl.add("button", undefined, "Test"); 
    */

    dlg.msgPnl = dlg.add("panel", undefined, "Options");
    dlg.msgPnl.orientation = "column";
    dlg.msgPnl.alignChildren = "fill";
    {
        dlg.msgPnl.fg = dlg.msgPnl.add("group");
        dlg.msgPnl.fg.orientation = "row";
        {
            //dlg.msgPnl.fg.titleSt = dlg.msgPnl.fg.add("statictext", undefined, "filename:");
            dlg.msgPnl.fg.titleEt = dlg.msgPnl.fg.add("edittext", undefined, "C:\\");
            dlg.msgPnl.fg.titleEt.bounds = [0,0,300, 20];
            //dlg.msgPnl.fg.titleEt.dimension = [500, -1]; // 文字列の長さに合わせてサイズが決まる
            dlg.msgPnl.fg.testBtn = dlg.msgPnl.fg.add("button", undefined, "参照"); 
        }
        dlg.msgPnl.msgSt = dlg.msgPnl.add("statictext", undefined, "Alert message:");
        dlg.msgPnl.msgEt = dlg.msgPnl.add("edittext", undefined, "first line\n\nthird line", {multiline:true});
        dlg.msgPnl.msgEt.bounds = [0,0,500, 500];
        //dlg.msgPnl.msgEt.Dimension = [500, 500]

        dlg.msgPnl.hasBtnsCb = dlg.msgPnl.add("checkbox", undefined, "Should there be alert buttons?");
        dlg.msgPnl.hasBtnsCb.value = true;
    }

    dlg.btn_group = dlg.add("group");
    dlg.btn_group.orientation = "row";
    dlg.btn_group.alignChildren = "fill";
    {
        dlg.btn_group.export_btn = dlg.btn_group.add("button", undefined, "Export"); 
        dlg.btn_group.export_btn.alignment = "left";
        dlg.btn_group.cancel_btn = dlg.btn_group.add("button", undefined, "Cancel"); 
        dlg.btn_group.cancel_btn.alignment = "right";
        dlg.btn_group.export_btn.onClick = callback_export;
    }
    /*
    dlg.alertBtnsPnl = dlg.add("panel", undefined, "Button alignment");
    dlg.alertBtnsPnl.orientation = "row";
    {
        dlg.alertBtnsPnl.alignLeftRb = dlg.alertBtnsPnl.add("radiobutton", undefined, "Left");
        dlg.alertBtnsPnl.alignCenterRb = dlg.alertBtnsPnl.add("radiobutton", undefined, "Center");
        dlg.alertBtnsPnl.alignRightRb = dlg.alertBtnsPnl.add("radiobutton", undefined, "Right");
        dlg.alertBtnsPnl.alignCenterRb.value = true;
    }
    */
}
//dlg.size = {width:500, height:500}; 
dlg.show();

}

function make(){
    // Hello Word Script
    // Remember current unit settings and then set units to
    // the value expected by this script
    var originalUnit = preferences.rulerUnits;
    preferences.rulerUnits = Units.INCHES;
    // Create a new 2x4 inch document and assign it to a variable
    var docRef = app.documents.add( 2, 4 );
    // Create a new art layer containing text
    var artLayerRef = docRef.artLayers.add();
    artLayerRef.kind = LayerKind.TEXT;
    // Set the contents of the text layer.
    var textItemRef = artLayerRef.textItem;
    textItemRef.contents = "Hello, World";
    // Release references
    docRef = null;
    artLayerRef = null;
    textItemRef = null;
    // Restore original ruler unit setting
    app.preferences.rulerUnits = originalUnit;

}

/*
 * ScriptListener.8liでdesktop/ScriptingListenerJS.logに保存されたアクション
 */
function action_save_dds(filename){
    if (filename === undefined){
        return;
    }
    if (filename === ""){
        return;
    }

// =======================================================
var idsave = charIDToTypeID( "save" );
    var desc308 = new ActionDescriptor();
    var idAs = charIDToTypeID( "As  " );
        var desc309 = new ActionDescriptor();
        var idbarF = charIDToTypeID( "barF" );
        desc309.putBoolean( idbarF, true );
        var idfdev = charIDToTypeID( "fdev" );
        desc309.putDouble( idfdev, 3.000000 );
        var idfbia = charIDToTypeID( "fbia" );
        desc309.putDouble( idfbia, 0.000000 );
        var idurad = charIDToTypeID( "urad" );
        desc309.putDouble( idurad, 5.000000 );
        var iduamo = charIDToTypeID( "uamo" );
        desc309.putDouble( iduamo, 0.500000 );
        var iduthr = charIDToTypeID( "uthr" );
        desc309.putDouble( iduthr, 0.000000 );
        var idxstf = charIDToTypeID( "xstf" );
        desc309.putDouble( idxstf, 1.000000 );
        var idxthf = charIDToTypeID( "xthf" );
        desc309.putDouble( idxthf, 1.000000 );
        var idqual = charIDToTypeID( "qual" );
        desc309.putInteger( idqual, 70 );
        var iderdi = charIDToTypeID( "erdi" );
        desc309.putBoolean( iderdi, false );
        var iderdw = charIDToTypeID( "erdw" );
        desc309.putInteger( iderdw, 1 );
        var idusfa = charIDToTypeID( "usfa" );
        desc309.putBoolean( idusfa, false );
        var idtxfm = charIDToTypeID( "txfm" );
        desc309.putInteger( idtxfm, 2 );
        var idweig = charIDToTypeID( "weig" );
        desc309.putInteger( idweig, 0 );
        var idtmty = charIDToTypeID( "tmty" );
        desc309.putInteger( idtmty, 0 );
        var idmmty = charIDToTypeID( "mmty" );
        desc309.putInteger( idmmty, 30 );
        var idsmip = charIDToTypeID( "smip" );
        desc309.putInteger( idsmip, 0 );
        var idbina = charIDToTypeID( "bina" );
        desc309.putBoolean( idbina, false );
        var idprem = charIDToTypeID( "prem" );
        desc309.putBoolean( idprem, false );
        var idfilm = charIDToTypeID( "film" );
        desc309.putBoolean( idfilm, false );
        var idalpb = charIDToTypeID( "alpb" );
        desc309.putBoolean( idalpb, false );
        var idbord = charIDToTypeID( "bord" );
        desc309.putBoolean( idbord, false );
        var idbrdr = charIDToTypeID( "brdr" );
        desc309.putDouble( idbrdr, 0.000000 );
        var idbrdg = charIDToTypeID( "brdg" );
        desc309.putDouble( idbrdg, 0.000000 );
        var idbrdb = charIDToTypeID( "brdb" );
        desc309.putDouble( idbrdb, 0.000000 );
        var idmmft = charIDToTypeID( "mmft" );
        desc309.putInteger( idmmft, 2 );
        var idfdcl = charIDToTypeID( "fdcl" );
        desc309.putBoolean( idfdcl, false );
        var idfdaf = charIDToTypeID( "fdaf" );
        desc309.putBoolean( idfdaf, false );
        var idftworl = charIDToTypeID( "f2rl" );
        desc309.putDouble( idftworl, 0.500000 );
        var idftwogl = charIDToTypeID( "f2gl" );
        desc309.putDouble( idftwogl, 0.500000 );
        var idftwobl = charIDToTypeID( "f2bl" );
        desc309.putDouble( idftwobl, 0.500000 );
        var idftwoal = charIDToTypeID( "f2al" );
        desc309.putDouble( idftwoal, 0.500000 );
        var idfddl = charIDToTypeID( "fddl" );
        desc309.putInteger( idfddl, 0 );
        var idfafm = charIDToTypeID( "fafm" );
        desc309.putDouble( idfafm, 0.150000 );
        var idbafh = charIDToTypeID( "bafh" );
        desc309.putDouble( idbafh, 0.500000 );
        var iddthc = charIDToTypeID( "dthc" );
        desc309.putBoolean( iddthc, false );
        var iddthzero = charIDToTypeID( "dth0" );
        desc309.putBoolean( iddthzero, false );
        var idsmth = charIDToTypeID( "smth" );
        desc309.putInteger( idsmth, 0 );
        var idfilg = charIDToTypeID( "filg" );
        desc309.putDouble( idfilg, 2.200000 );
        var idfieg = charIDToTypeID( "fieg" );
        desc309.putBoolean( idfieg, false );
        var idfilw = charIDToTypeID( "filw" );
        desc309.putDouble( idfilw, 10.000000 );
        var idover = charIDToTypeID( "over" );
        desc309.putBoolean( idover, false );
        var idfblr = charIDToTypeID( "fblr" );
        desc309.putDouble( idfblr, 1.000000 );
        var idnmcv = charIDToTypeID( "nmcv" );
        desc309.putBoolean( idnmcv, false );
        var idncnv = charIDToTypeID( "ncnv" );
        desc309.putInteger( idncnv, 1009 );
        var idnflt = charIDToTypeID( "nflt" );
        desc309.putInteger( idnflt, 1040 );
        var idnmal = charIDToTypeID( "nmal" );
        desc309.putInteger( idnmal, 1034 );
        var idnmbr = charIDToTypeID( "nmbr" );
        desc309.putBoolean( idnmbr, false );
        var idnmix = charIDToTypeID( "nmix" );
        desc309.putBoolean( idnmix, false );
        var idnmiy = charIDToTypeID( "nmiy" );
        desc309.putBoolean( idnmiy, false );
        var idnmiz = charIDToTypeID( "nmiz" );
        desc309.putBoolean( idnmiz, false );
        var idnmah = charIDToTypeID( "nmah" );
        desc309.putBoolean( idnmah, false );
        var idnswp = charIDToTypeID( "nswp" );
        desc309.putBoolean( idnswp, false );
        var idnmsc = charIDToTypeID( "nmsc" );
        desc309.putDouble( idnmsc, 2.000000 );
        var idnmnz = charIDToTypeID( "nmnz" );
        desc309.putInteger( idnmnz, 0 );
        var idusbi = charIDToTypeID( "usbi" );
        desc309.putBoolean( idusbi, false );
        var idlien = charIDToTypeID( "lien" );
        desc309.putBoolean( idlien, false );
        var idshdi = charIDToTypeID( "shdi" );
        desc309.putBoolean( idshdi, false );
        var idshfi = charIDToTypeID( "shfi" );
        desc309.putBoolean( idshfi, false );
        var idshmm = charIDToTypeID( "shmm" );
        desc309.putBoolean( idshmm, true );
        var idshan = charIDToTypeID( "shan" );
        desc309.putBoolean( idshan, true );
        var idclrc = charIDToTypeID( "clrc" );
        desc309.putInteger( idclrc, 0 );
        var idvdxone = charIDToTypeID( "vdx1" );
        desc309.putBoolean( idvdxone, true );
        var idvdxtwo = charIDToTypeID( "vdx2" );
        desc309.putBoolean( idvdxtwo, true );
        var idvdxthree = charIDToTypeID( "vdx3" );
        desc309.putBoolean( idvdxthree, true );
        var idvdxfive = charIDToTypeID( "vdx5" );
        desc309.putBoolean( idvdxfive, true );
        var idvfourfourfour = charIDToTypeID( "v444" );
        desc309.putBoolean( idvfourfourfour, true );
        var idvfivefivefive = charIDToTypeID( "v555" );
        desc309.putBoolean( idvfivefivefive, true );
        var idvfivesixfive = charIDToTypeID( "v565" );
        desc309.putBoolean( idvfivesixfive, true );
        var idveighteighteight = charIDToTypeID( "v888" );
        desc309.putBoolean( idveighteighteight, true );
        var idalph = charIDToTypeID( "alph" );
        desc309.putBoolean( idalph, false );
        var idusra = charIDToTypeID( "usra" );
        desc309.putBoolean( idusra, false );
        var idusfs = charIDToTypeID( "usfs" );
        desc309.putInteger( idusfs, 0 );
        var idprev = charIDToTypeID( "prev" );
        desc309.putBoolean( idprev, false );
        var idrdep = charIDToTypeID( "rdep" );
        desc309.putInteger( idrdep, 3000 );
        var idlomm = charIDToTypeID( "lomm" );
        desc309.putBoolean( idlomm, false );
        var idsflp = charIDToTypeID( "sflp" );
        desc309.putBoolean( idsflp, false );
        var idlflp = charIDToTypeID( "lflp" );
        desc309.putBoolean( idlflp, false );
        var idscar = charIDToTypeID( "scar" );
        desc309.putDouble( idscar, 1.000000 );
        var idscag = charIDToTypeID( "scag" );
        desc309.putDouble( idscag, 1.000000 );
        var idscab = charIDToTypeID( "scab" );
        desc309.putDouble( idscab, 1.000000 );
        var idscaa = charIDToTypeID( "scaa" );
        desc309.putDouble( idscaa, 1.000000 );
        var idbiar = charIDToTypeID( "biar" );
        desc309.putDouble( idbiar, 0.000000 );
        var idbiag = charIDToTypeID( "biag" );
        desc309.putDouble( idbiag, 0.000000 );
        var idbiab = charIDToTypeID( "biab" );
        desc309.putDouble( idbiab, 0.000000 );
        var idbiaa = charIDToTypeID( "biaa" );
        desc309.putDouble( idbiaa, 0.000000 );
        var idsiar = charIDToTypeID( "siar" );
        desc309.putDouble( idsiar, 1.000000 );
        var idsiag = charIDToTypeID( "siag" );
        desc309.putDouble( idsiag, 1.000000 );
        var idsiab = charIDToTypeID( "siab" );
        desc309.putDouble( idsiab, 1.000000 );
        var idsiaa = charIDToTypeID( "siaa" );
        desc309.putDouble( idsiaa, 1.000000 );
        var idbiir = charIDToTypeID( "biir" );
        desc309.putDouble( idbiir, 0.000000 );
        var idbiig = charIDToTypeID( "biig" );
        desc309.putDouble( idbiig, 0.000000 );
        var idbiib = charIDToTypeID( "biib" );
        desc309.putDouble( idbiib, 0.000000 );
        var idbiia = charIDToTypeID( "biia" );
        desc309.putDouble( idbiia, 0.000000 );
        var idoutw = charIDToTypeID( "outw" );
        desc309.putBoolean( idoutw, false );
        var idclcL = charIDToTypeID( "clcL" );
        desc309.putBoolean( idclcL, true );
    var idNVIDIADthreeD_DDS = stringIDToTypeID( "NVIDIA D3D/DDS" );
    desc308.putObject( idAs, idNVIDIADthreeD_DDS, desc309 );
    var idIn = charIDToTypeID( "In  " );
    //desc308.putPath( idIn, new File( "C:\\Users\\ryo\\Dropbox\\dev\\STU\\extendscript\\photoshop\\test_al.dds" ) );
    desc308.putPath( idIn, new File(filename) );
    var idDocI = charIDToTypeID( "DocI" );
    desc308.putInteger( idDocI, 1283 );
    var idCpy = charIDToTypeID( "Cpy " );
    desc308.putBoolean( idCpy, true );
    var idsaveStage = stringIDToTypeID( "saveStage" );
    var idsaveStageType = stringIDToTypeID( "saveStageType" );
    var idsaveBegin = stringIDToTypeID( "saveBegin" );
    desc308.putEnumerated( idsaveStage, idsaveStageType, idsaveBegin );
executeAction( idsave, desc308, DialogModes.NO );

}

function save(){
    jpgFile = new File( "C:\\Users\\ryo\\Temp001.jpeg" );
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.embedColorProfile = true;
    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgSaveOptions.matte = MatteType.NONE;
    jpgSaveOptions.quality = 1;
    app.activeDocument.saveAs(jpgFile, jpgSaveOptions, true, Extension.LOWERCASE);
}

// EOF
