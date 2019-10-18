import { MeshBasicMaterial, Group, Mesh } from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js';
import { SubdivisionModifier } from 'three/examples/jsm/modifiers/SubdivisionModifier.js';
import { saveAs } from 'file-saver';
import jQuery from 'jquery';
import { arrive } from 'arrive';
import { finalizeMesh } from './finalizeMesh.js';

function save_stl() {
    var smooth = jQuery('#subdivideSLT').val() > 0 ? jQuery('#subdivideSLT').val() : undefined;
    var mirroredPose = CK.character.data.mirroredPose;

    var group = process(CK.character, smooth, mirroredPose);

    var exporter = new STLExporter();
    var fileString = exporter.parse(group);

    var name = get_name();

    var blob = new Blob([fileString], { type: "application/sla;charset=utf-8" });
    saveAs(blob, name + ((smooth) ? '-smooth' : '') + '.stl');
};

function save_obj() {
    var smooth = jQuery('#subdivideSLT').val() > 0 ? jQuery('#subdivideSLT').val() : undefined;
    var mirroredPose = CK.character.data.mirroredPose;


    var group = process(CK.character, smooth, mirroredPose);

    var exporter = new OBJExporter();
    var fileString = exporter.parse(group);

    var name = get_name();

    var blob = new Blob([fileString], { type: "text/plain;charset=utf-8" });
    saveAs(blob, name + ((smooth) ? '-smooth' : '') + '.obj');
};

function save_json(){
    var name = get_name();

    var blob = new Blob([JSON.stringify(CK.data.getJson())], {type: "text/plain;charset=utf-8"});

    saveAs(blob, name + ".json");
};

function load_json (e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (function(theFile) {
        return function(e) {
            e.preventDefault();
            CK.change(JSON.parse(e.target.result));
        };
    })(file);

    if (file != undefined) reader.readAsText(file);
};

function get_name() {
    var getName = CK.character.data.meta.character_name;
    return getName === "" ? "Hero" : getName;
};

function subdivide(geometry, subdivisions) {
    var modifier = new SubdivisionModifier( subdivisions );
    var smoothGeometry = modifier.modify( geometry );
    return smoothGeometry;
};

function mirror(geometry) {
    const tempXYZ = [0, 0, 0];
    if (geometry.index) geometry.copy(geometry.toNonIndexed());

    for (let i = 0; i < geometry.attributes.position.array.length / 9; i++) {
        tempXYZ[0] = geometry.attributes.position.array[i * 9];
        tempXYZ[1] = geometry.attributes.position.array[i * 9 + 1];
        tempXYZ[2] = geometry.attributes.position.array[i * 9 + 2];

        geometry.attributes.position.array[i * 9] = geometry.attributes.position.array[i * 9 + 6];
        geometry.attributes.position.array[i * 9 + 1] = geometry.attributes.position.array[i * 9 + 7];
        geometry.attributes.position.array[i * 9 + 2] = geometry.attributes.position.array[i * 9 + 8];

        geometry.attributes.position.array[i * 9 + 6] = tempXYZ[0];
        geometry.attributes.position.array[i * 9 + 7] = tempXYZ[1];
        geometry.attributes.position.array[i * 9 + 8] = tempXYZ[2];
    }

    return geometry;
}

function process(object3d, smooth, mirroredPose) {
    var material = new MeshBasicMaterial();
    var group = new Group();

    object3d.traverseVisible(function (object) {
        if (object.isMesh) {

            var exporter = new finalizeMesh();
            var geometry = exporter.parse(object);

            if (mirroredPose == true) {
              geometry = mirror(geometry)
            }

            if (smooth
                && object.name != 'baseRim'
                && object.name != 'base') {
                geometry = subdivide(geometry, smooth);
            }

            var mesh = new Mesh(geometry, material);

            group.add(mesh);
        }
    });
    return group;
};

document.body.arrive(".footer", { onceOnly: true, existing: true }, function () { 	 
	var icon_import = '\u{1F845}';
	var icon_export = '\u{1F847}';
	var icon_save = '\u{1F4BE}';
	
	var class_header = 'headerMenu-nav-item';
	var class_nav = 'headerMenu-nav-scroll';
	var class_char_menu = 'headerMenu-container';
	var class_editor_footer = 'editorFooter';
	var class_editor_tabs = 'tabs';
	var class_shop_button = 'shop-button clickable';
	
	var html_import = '<label id="jsonImport" for="import" ><span class="' + class_header + '" href="#" target="_self"><input type="file" id="import" name="import" style="display: none;"/><div class="' + class_header + '-img"><span style="width:20px">'+icon_import+'</span></div><div class="' + class_header + '-text">Import</div></span></label>';
	var html_export = '<a id="jsonExport" class="' + class_header + '" href="#" target="_self"><div class="' + class_header + '-img"><span style="width:20px">'+icon_export+'</span></div><div class="' + class_header + '-text">Export</div></a>';
	
	var style_editor_footer = { "margin-left": "10px", "width": "50px" };
	var style_char_menu_item = { "margin-left": "10px", "width": "50px" };
	var style_shop_button = {};
	var style_number_label = {'margin-left': '20px;'};
	var char_menu = { "display": "flex", "justify-content": "center", "align-content": "center", "align-items": "center" };
	
    //jQuery('.headerMenu:last').remove();
    //jQuery('a:contains(Log In)').remove();
    //jQuery(".headerMenu-nav-item:contains(Save)").hide();
    //jQuery(".headerMenu-nav-item:contains(Share)").remove();
    //jQuery(".headerMenu-nav-item:contains(Heroes)").remove();
    //jQuery(".editorFooter").empty();
    //jQuery("li.tab-Material").remove();
    jQuery(".footer").empty();
	jQuery(".content-side > .headerMenu-container").remove();
	jQuery("#subDSltLabel").remove();
	jQuery("#subdivideSLT").remove();
	jQuery("#topSaveStl").remove();
	jQuery("#topSaveObj").remove();
	jQuery("#butSaveStl").remove();
	jQuery("#butSaveObj").remove();
	jQuery("#jsonImport").remove();
	jQuery("#jsonExport").remove();

    var area_char_menu = jQuery('.' + class_char_menu).first();
    area_char_menu.css(char_menu);
    area_char_menu
		.append(jQuery("<label />", { css: style_char_menu_item, 	class: "jss7", 				id:'subDSltLabel', 	text: 'Quality:', 			title:'Subdivision Passes', for:'subdivideSLT'}))
		.append(jQuery("<input />", { css: style_char_menu_item, 	class: "jss7 jss9 jss10",	id:'subdivideSLT', 	 name:'subdivideSLT',	 	title:'Subdivision Passes', type:'number', min:'0', max:'2', step:'1', value:'0' }))
        .append(jQuery("<a />", 	{ css: style_char_menu_item, 	class: "jss7 jss9 jss10",	id:'topSaveStl',	text: icon_save + " .stl",	title:'Download in STL Format'}).on("click", save_stl))
        .append(jQuery("<a />", 	{ css: style_char_menu_item,	class: "jss7 jss9 jss10",	id:'topSaveObj',	text: icon_save + " .obj",	title:'Download in OBJ Format'}).on("click", save_obj));
	
	var area_editor_footer = jQuery("." + class_editor_footer);
	area_editor_footer
		.prepend(jQuery("<a />", 	{ css: style_shop_button,		class: class_shop_button,	id:'butSaveStl',	text: icon_save + " .stl",	title:'Download in STL Format'}).on("click", save_stl))
        .prepend(jQuery("<a />", 	{ css: style_shop_button, 		class: class_shop_button,	id:'butSaveObj',	text: icon_save + " .obj",	title:'Download in OBJ Format'}).on("click", save_obj));
	
	// To Work on
	//var area_editor_tabs = jQuery("." + class_editor_tabs + ">ul");
	//area_editor_tabs
	//	.append(jQuery("<li />", 	{ class:'tab tab-20 tab-Download', title:'Download'}));
		
		
	//var area_download_tab = jQuery(".tab-Download");
	//area_download_tab
	//	.append(jQuery("<img />", 	{ class: 'menuThumb', src: "/static/svg/material.svg", alt:"Download"}))
	//	.append("<span>Download</span>");
		
    jQuery("." + class_nav + ":first").append([
        jQuery(html_import).on("click", load_json),
		jQuery(html_export).on("click", save_json),
        jQuery().on("change", load_json)
    ]);
});
