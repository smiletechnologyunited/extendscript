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


ExportTarget = function() {
};

ExportTarget.prototype.save = function() {
    confirm("hello world");
    // こんにちわ
};

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

jpgFile = new File( "C:\\Users\\ryo\\Temp001.jpeg" );
jpgSaveOptions = new JPEGSaveOptions();
jpgSaveOptions.embedColorProfile = true;
jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
jpgSaveOptions.matte = MatteType.NONE;
jpgSaveOptions.quality = 1;
app.activeDocument.saveAs(jpgFile, jpgSaveOptions, true, Extension.LOWERCASE);

// EOF
