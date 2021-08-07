var midi;

var anc_onglet = 'Set';
var outputs = [];
var module_init = [0xE0, 0, 0],
	module_num = [0xE0, 2, 0],
	module_startedit = [0xE0, 4, 0],
	module_stopedit = [0xE0, 5, 0],
	module_blink_start = [0xE1,0,0],
	module_blink_stop = [0xE1,1,0];
	
change_onglet(anc_onglet);

var grille_width=80;
var grille_height=80;					
var context;
var context2;

var canvas;
var canvas2;					  

var seq = [[]];
var current_seq=0;

var config_module = 0;

var pos_enco = 4;
     

/////////////////////////////////////////////////////////  

var _mouse;

var module_image = [];
var module_image_shadow = [];
var stepON_image;
var stepOFF_image;
var mesur1ON_image;
var mesur2ON_image;
var mesur3ON_image;
var mesur4ON_image;
var mesur1OFF_image;
var mesur2OFF_image;
var mesur3OFF_image;
var mesur4OFF_image;

var modulox_image_type = [];

var module_number = 0;
var module_to_place = 5;

var module_taken = 0;
var isTaken = 0;

var shadow_loaded = 0;
var module_placed_shadow = 0;

//var module_image;

var menu = 0;
var current_module = 0;

var state = 0;

var active_module = 0;
var active_place = 0;
var active_param = 0;			 

var root;

var module_placed = 0;
var module_connected = 0;

var current_pattern = 0;

var debug = 0;
var port_number = 0;

var port_selected = 0;
var previous_key_over=0;

var testNote_num = [[]];
var testNote_type = [[]];

var arpege_num = 0;

var sequencer = 0; //1=arpegio, 2=sequencer

var midiout=0;

var elem;
var hueb;

var module = [];
var module_shadow = [];

var enco_group=0;

var midi_note_count = 0;

var tempo_send = 300;

/*var hueb = new Huebee( '.color-input', {
	  // options
	  notation: 'hex',
	  saturations: 2,
	});*/

window.onload = function() {	
	
	if(navigator.userAgent.indexOf("Chrome") == -1 ) $.blockUI({ message: "Use Chrome. MIDI is only supported by Chrome Navigator" });
	
	// Onglet Set
	canvas  = document.querySelector('#canvas');
	context = canvas.getContext('2d');
	
	// Onglet MIDI
	canvas2  = document.querySelector('#canvas2');
	context2 = canvas2.getContext('2d');
	
	//Onglet Sequence
	canvas3  = document.querySelector('#canvas3');
	context3 = canvas3.getContext('2d');

 	//Onglet Arpegio
	canvas4  = document.querySelector('#canvas4');
	context4 = canvas4.getContext('2d');

	drawBackground();
	drawBackground2();	
	
	hueb = new Huebee( '#midi1_color', {
	  // options
	  notation: 'hex',
	  saturations: 1,
	  setText: true,
	  shades: 1,
	  hues: 12,
	});
	
	_mouse = {x:0,y:0};
	
	//modules que l'on dÃ©place
	module_image[0] = new Image();
	module_image[0].src = 'moduknob.png';
	module_image_shadow[0] = new Image();
	module_image_shadow[0].src = 'moduknob_shadow.png';
	module_image[1] = new Image();
	module_image[1].src = 'moduslide.png';
	module_image_shadow[1] = new Image();
	module_image_shadow[1].src = 'moduslide_shadow.png';
	module_image[2] = new Image();
	module_image[2].src = 'modutouch.png';
	module_image_shadow[2] = new Image();
	module_image_shadow[2].src = 'modutouch_shadow.png';
	// Step ON dans le step sequencer
	stepON_image = new Image();
	stepON_image.src = 'stepON.png';
	
	// Step OFF dans le step sequencer
	stepOFF_image = new Image();
	stepOFF_image.src = 'stepOFF.png';
	
	mesur1ON_image = new Image();
	mesur1ON_image.src = 'mesur1ON.png';
	
	mesur2ON_image = new Image();
	mesur2ON_image.src = 'mesur2ON.png';
	
	mesur3ON_image = new Image();
	mesur3ON_image.src = 'mesur3ON.png';
	
	mesur4ON_image = new Image();
	mesur4ON_image.src = 'mesur4ON.png';
	
	mesur1OFF_image = new Image();
	mesur1OFF_image.src = 'mesur1OFF.png';
	
	mesur2OFF_image = new Image();
	mesur2OFF_image.src = 'mesur2OFF.png';
	
	mesur3OFF_image = new Image();
	mesur3OFF_image.src = 'mesur3OFF.png';
	
	mesur4OFF_image = new Image();
	mesur4OFF_image.src = 'mesur4OFF.png';
	
	//context.drawImage(module_image, 0, 0);
	
	document.getElementById("canvas").onmousedown = onClick;
	document.getElementById("canvas").onmousemove = updateModuknob;
	document.getElementById("canvas").onmouseup = moduknobDropped;
	document.getElementById("canvas2").onmousedown = onClick2;
	document.getElementById("canvas3").onmousedown = onClick3;
	document.getElementById("canvas4").onmousemove = onMove4;
	document.getElementById("canvas4").onmousedown = onClick4;
	
	console.log("1");
	// On initialise les tableaux contenant les paramÃ¨tres des modules. 
	// Pour le moment, 16 modules maximum
	for(i = 0;i < 16;i++){
		testNote_num[i]=[];
		testNote_type[i]=[];					  
	}
	console.log("2");
	
	for(i = 0;i < 8;i++){
		seq[i]=new Sequence();
	}
	console.log("3");
	
	for(i = 0;i < 16;i++){
		module[i]=new Module(i,0);  
		module_shadow[i]=new Module(i,2);  
	}	
	
//----------------------------------	
//--- Initialisation des listbox --- 	
//----------------------------------
	init_channel();
	console.log(module[0]._module
	);
	module[0].showpar(0);
	
	// NumÃ©ro de sÃ©quence (16 possibles)
	for(i=0; i<8; i++)
	{
		$('#Seq_num').append('<option value="'+i+'">'+(i+1)+'</option>');
	}
	for(i=1; i<9; i++)
	{
		$('#Arp_num').append('<option value="'+(i-1)+'">'+i+'</option>');
	}
	
	// Notes MIDI pour le sÃ©quenceur
	for(i=1; i<128; i++)
	{
		$('#Seq1_note').append('<option value="'+i+'">'+i+'</option>');
		$('#Seq2_note').append('<option value="'+i+'">'+i+'</option>');
		$('#Seq3_note').append('<option value="'+i+'">'+i+'</option>');
		$('#Seq4_note').append('<option value="'+i+'">'+i+'</option>');
	}
	
    // Channel MIDI de chaque instru du sÃ©quenceur	
	for(i=1; i<17; i++)
	{
		$('#Seq1_chan').append('<option value="'+i+'">'+i+'</option>');
		$('#Seq2_chan').append('<option value="'+i+'">'+i+'</option>');
		$('#Seq3_chan').append('<option value="'+i+'">'+i+'</option>');
		$('#Seq4_chan').append('<option value="'+i+'">'+i+'</option>');
	}
	
	// Par dÃ©faut on se met en mode Toggle
	document.getElementById("midi1_text").innerHTML = "Turn - CC";
	document.getElementById("midi2_text").innerHTML = "Press 1";
	document.getElementById("midi3_text").innerHTML = "Press 2";
	
	// On masque les Ã©lÃ©ments non utilisÃ©s pour le mode Toggle
	delete_all();
	
	$('#onglet_Sequence').hide();
	$('#onglet_Arpegio').hide();

//--------------------------------
//--- Listener sur les listbox ---
//--------------------------------
// On met Ã  jour les variables locales quand un utilisateur change la valeur sur une listbox	
	$('#channel').on('change', function() {
		console.log($("#channel" ).val());
		module[active_module].updatechannel(active_place, $("#channel" ).val());
    });
	$('#Arp_num').on('change', function() {
		console.log($("#Arp_num" ).val());
		arpege_num=$("#Arp_num" ).val();
		drawArpegio(0,0);
    });
	
	
	
	$('#midi_out').on('change', function() {
		console.log("midi_out : " + $("#midi_out" ).val());
		midiout=parseInt($("#midi_out").val());
		outputs[port_selected].send([0xE0,6,midiout]);
	});
	
	$('#myselect').on('change', function() {
		console.log("port selected : " + $("#myselect" ).val());
		port_selected=parseInt($("#myselect").val());
	});
	
	$('#sequence').on('change', function() {
		console.log("sequence : " + $("#sequence" ).val());
		sequencer=parseInt($("#sequence").val());
		if(sequencer==0) 
		{
			Seq_type=0;
			$('#onglet_Sequence').hide();
			$('#onglet_Arpegio').hide();
		}
		if(sequencer==1) 
		{
			Seq_type=0;
			$('#onglet_Sequence').hide();
			$('#onglet_Arpegio').show();
		}
		if(sequencer==2)  
		{
			Seq_type=1;
			$('#onglet_Sequence').show();
			$('#onglet_Arpegio').hide();
		}
		console.log("sequencer : " + sequencer);
		Show_parameters();
	});
		
	// GROMIX		
	$('#preset_load').on('change', function() {
		console.log($("#preset_load" ).val());
		if($("#preset_load" ).val()==1)
		{
			midi_note_count = 1;
			for(i = 0;i < module_number;i++){
				module[i].toggle();
			}
			Show_parameters();
		}
		
		if($("#preset_load" ).val()==3)
		{
			midi_note_count=1;
			for(i = 0;i < module_number;i++){
				module[i].input();
			}
			Show_parameters();
		}
		
		if($("#preset_load" ).val()==2)
		{
			midi_note_count=1;
			sequencer=2;
			Seq_type=2;
			$('#onglet_Sequence').show();
			$('#onglet_Arpegio').hide();
			module[0].seq_preset();
			for(i = 1;i < module_number;i++){
				module[i].toggle();
			}
			Show_parameters();
		}
	});
	
	$('#mode_number').on('change', function() {
		console.log($("#mode_number" ).val());
		module[active_module].updatemode_number(active_place, $("#mode_number").val());
		Show_parameters();
		});
		
	$('#mode').on('change', function() {
		console.log($("#mode").val());
		module[active_module].updatemode(active_place, $("#mode").val());
		Show_parameters();
    });
	
	$('#luminosity').on('change', function() {
		console.log($("#luminosity").val());
		module[active_module].updateluminosity(active_place, $("#luminosity").val());
	});
	
	$('#midi1_value').on('change', function() {
		console.log($("#midi1_value" ).val());
		module[active_module].init_parm(active_place,0,$("#midi1_value").val());
	});
	$('#midi2_value').on('change', function() {
		console.log($("#midi2_value" ).val());
		module[active_module].init_parm(active_place,1,$("#midi2_value").val());
	});
	$('#midi3_value').on('change', function() {
		console.log($("#midi3_value" ).val());
		module[active_module].init_parm(active_place,2,$("#midi3_value").val());
	});
	$('#midi4_value').on('change', function() {
		console.log($("#midi4_value" ).val());
		module[active_module].init_parm(active_place,3,$("#midi4_value").val());
	});
	$('#midi5_value').on('change', function() {
		console.log($("#midi5_value" ).val());
		module[active_module].init_parm(active_place,4,$("#midi5_value").val());
	});
	
	$('#advanced1_value').on('change', function() {
		console.log($("#advanced1_value" ).val());
		module[active_module].init_adv(active_place,0,$("#advanced1_value").val());
	});
	
	$('#advanced2_value').on('change', function() {
		console.log($("#advanced2_value" ).val());
		module[active_module].init_adv(active_place,1,$("#advanced2_value").val());
	});
	
	$('#advanced3_value').on('change', function() {
		console.log($("#advanced3_value" ).val());
		module[active_module].init_adv(active_place,2,$("#advanced3_value").val());
	});	

	$('#advanced4_value').on('change', function() {
		console.log($("#advanced4_value" ).val());
		module[active_module].init_adv(active_place,3,$("#advanced4_value").val());
		Show_parameters();
		module[active_module].init_parm3(active_place);
	});	

	$('#Seq1_note').on('change', function() {
		console.log($("#Seq1_note" ).val());
		seq[current_seq].note[0] = $("#Seq1_note").val();
	});
	
	$('#Seq1_chan').on('change', function() {
		console.log($("#Seq1_chan" ).val());
		seq[current_seq].channel[0] = $("#Seq1_chan").val();
	});
	
	$('#Seq2_note').on('change', function() {
		console.log($("#Seq2_note" ).val());
		seq[current_seq].note[1] = $("#Seq2_note").val();
	});
	
	$('#Seq2_chan').on('change', function() {
		console.log($("#Seq2_chan" ).val());
		seq[current_seq].channel[1] = $("#Seq2_chan").val();
	});
	
	$('#Seq3_note').on('change', function() {
		console.log($("#Seq3_note" ).val());
		seq[current_seq].note[2] = $("#Seq3_note").val();
	});
	
	$('#Seq3_chan').on('change', function() {
		console.log($("#Seq3_chan" ).val());
		seq[current_seq].channel[2] = $("#Seq3_chan").val();
	});
	
	$('#Seq4_note').on('change', function() {
		console.log($("#Seq4_note" ).val());
		seq[current_seq].note[3] = $("#Seq4_note").val();
	});
	
	$('#Seq4_chan').on('change', function() {
		console.log($("#Seq4_chan" ).val());
		seq[current_seq].channel[3] = $("#Seq4_chan").val();
	});
	
	$('#Seq_num_mes').on('change', function() {
		console.log("num mes : " + $("#Seq_num_mes" ).val());
		seq[current_seq].num_meas = parseInt($("#Seq_num_mes" ).val());
		if(seq[current_seq].current_meas>=seq[current_seq].num_meas) seq[current_seq].current_meas = 0;
		drawSequence();
		//channel_value[active_module][active_place]=$("#channel" ).val();
    });
	
	$('#Seq_num').on('change', function() {
		console.log($("#Seq_num" ).val());
		current_seq = $("#Seq_num" ).val();
		drawSequence();
    });
	
	// SÃ©lection d'une couleur
	hueb.on( 'change', function( color, hue, sat, lum ) {
	  console.log( 'color changed to: ' + color );
	  console.log( 'is light: ' + this.isLight  );
	  module[active_module].init_color(active_place,color, this.isLight);
	})

}

function init_channel()
{
	$('#channel').empty();
	for(i=1; i<17; i++)
	{
		$('#channel').append('<option value="'+i+'">'+i+'</option>');
	}
}

function delete_all()
{
	$('#mode_text').hide();
	$('#mode').hide();
	$('#mode_number').hide();
	$('#channel_text').hide();
	$('#channel').hide();
	$('#luminosity_text').hide();
	$('#luminosity').hide();
	
	$('#midi1_text').hide();
	$('#midi1_value').hide();
	$('#midi1_color').hide();
	$('#midi2_text').hide();
	$('#midi2_value').hide();
	$('#mode_number').hide();
	$('#midi3_text').hide();
	$('#midi3_value').hide();
	$('#midi4_text').hide();
	$('#midi4_value').hide();
	$('#midi5_text').hide();
	$('#midi5_value').hide();
	$('#button10').hide();
	$('#button11').hide();
	$('#button12').hide();
	$('#button13').hide();
	$('#button14').hide();				   
}

function delete_param()
{	
	$('#midi1_text').hide();
	$('#midi1_value').hide();
	$('#midi1_color').hide();
	$('#midi2_text').hide();
	$('#midi2_value').hide();
	$('#mode_number').hide();
	$('#midi3_text').hide();
	$('#midi3_value').hide();
	$('#midi4_text').hide();
	$('#midi4_value').hide();
	$('#midi5_text').hide();
	$('#midi5_value').hide();
	$('#button10').hide();
	$('#button11').hide();
	$('#button12').hide();
	$('#button13').hide();
	$('#button14').hide();				   
}
//------------------------------------------------------------------
//--- Rafraichissement des valeurs des paramÃ¨tres MIDI Ã  l'Ã©cran ---
//------------------------------------------------------------------
function Show_parameters() {
	// Initialisation des paramÃ¨tres fixes (channel, mode, midi values....)
	console.log("show parameters");
	$('#mode_text').show();
	$('#mode').show();
	$('#mode_number').show();
	$('#channel_text').show();
	$('#channel').show();
	if(module[active_module].module_image_num!=2) $('#luminosity_text').show();
	$('#luminosity').show();
	module[active_module].showpar(active_place);
	
	// Chargement des paramÃ¨tres qui varient en fonction du mode (Toggle, Select CC...)
	//---------------------------------------------------------------------------------
	
	
}

//------------------------------------------------------------------   
// DÃ©clenchÃ© quand on clique quelque part dans le premier onglet
//------------------------------------------------------------------   
function onClick(e){
	_mouse.x = e.layerX;
	_mouse.y = e.layerY ;
	console.log(_mouse.x);
	console.log(_mouse.y);
	// Si on clique sur un module placÃ©
	for(i = 0;i < module_number;i++){
		if(_mouse.x > module[i].modulox_pos_x && _mouse.x < (module[i].modulox_pos_x+100)
		&& _mouse.y > module[i].modulox_pos_y && _mouse.y < (module[i].modulox_pos_y+80))
		{	
			// On dÃ©clare que le module est en train d'Ãªtre dÃ©placÃ©
			module_taken = i;
			isTaken = 1;
			console.log("module " + i + " taken");
			// On charge le deuxiÃ¨me octet du message de blink avec le numÃ©ro du module pour signaler au main module lequel doit clignoter
			module_blink_start[2]=i;
			module_blink_stop[2]=i;
			// On envoie au main module le message de blink
			outputs[port_selected].send(module_blink_start);
			console.log(module_blink_start);
		}
  }
};

function StopBlink(){
	// On charge le deuxiÃ¨me octet du message de blink avec le numÃ©ro du module pour signaler au main module lequel doit clignoter
	module_blink_stop[2]=active_module;
	// On envoie au main module le message de blink
	outputs[port_selected].send(module_blink_stop);
	console.log(module_blink_stop);
}

//----------------------------
// Selection des encodeurs
//----------------------------
function onClick2(e){
	_mouse.x = e.layerX;
	_mouse.y = e.layerY ;
	console.log(_mouse.x);
	console.log(_mouse.y);
	console.log("module number : " + module_number);
	console.log("module placed : " + module_placed);
	// On ne permet de sÃ©lectionner un encodeur que si tous les modules sont placÃ©s sur la grille
	if(module_placed)
	{
		// On dÃ©tecte si le click de la souris est sur un bouton
		for(i = 0;i < module_number;i++){
			// Si on a cliquÃ© sur un bouton, on dÃ©clenche la fonction selectButton, en envoyant le numÃ©ro du module et le numÃ©ro du bouton cliquÃ© sur ce module
			console.log("click : " + module[i].test_click());
			if(module[i].test_click()!=-1) selectButton(i, module[i].test_click());
		}
	}
};



//-----------------------------
// On clique sur le sÃ©quenceur
//-----------------------------
function onClick3(e){
	_mouse.x = e.layerX;
	_mouse.y = e.layerY ;
	console.log(_mouse.x);
	console.log(_mouse.y);

	seq[current_seq].click_seq();
	
	if((_mouse.x >90) && (_mouse.x < 120) && (_mouse.y >50) && (_mouse.y < 80)) seq[current_seq].current_meas=0;
	if((_mouse.x >125) && (_mouse.x < 155) && (_mouse.y >50) && (_mouse.y < 80)) seq[current_seq].current_meas=1;
	if((_mouse.x >160) && (_mouse.x < 190) && (_mouse.y >50) && (_mouse.y < 80)) seq[current_seq].current_meas=2;
	if((_mouse.x >195) && (_mouse.x < 225) && (_mouse.y >50) && (_mouse.y < 80)) seq[current_seq].current_meas=3;
	
	drawSequence();
}

function print_konb(ind){
	
};

//---------------------------------------
// ExÃ©cutÃ© tant qu'on dÃ©place le module
//---------------------------------------
function updateModuknob(e){
	// Si on a "pris" le module en cliquant dessus
	if(isTaken) {
		_mouse.x = e.layerX;
		_mouse.y = e.layerY ;
		context.restore();
		
		// On le dessine Ã  l'endroit de la souris
		module[module_taken].modulox_pos_x= _mouse.x-50;
		module[module_taken].modulox_pos_y= _mouse.y-40;
		
		drawBackground();
		drawModules();
	}
};

function onMove4(e){
	_mouse.x = e.layerX;
	_mouse.y = e.layerY ;
	drawArpegio(_mouse.x,_mouse.y);
}

function onClick4(e){
	_mouse.x = e.layerX;
	_mouse.y = e.layerY ;
	console.log(_mouse.x);
	console.log(_mouse.y);
	testNote(_mouse.x,_mouse.y);
}
function moduknobDropped(e){
	if(isTaken) {
		_mouse.x = e.layerX;
		_mouse.y = e.layerY ;
		if(_mouse.x>50 && _mouse.x<550 && _mouse.y>50 && _mouse.y<400)
		{
			var posx = (_mouse.x-40)/grille_width; 
			var posy = (_mouse.y-40)/grille_height;
			posx = posx|0;
			posy = posy|0;
				
			module[module_taken].modulox_pos_x = posx*grille_width+55;
			module[module_taken].modulox_pos_y = posy*grille_height+55;
			
			if(shadow_loaded) 
			{
				for(i = 0;i < module_number;i++){
					if(module_shadow[i].modulox_pos_x==module[module_taken].modulox_pos_x && module_shadow[i].modulox_pos_y==module[module_taken].modulox_pos_y)
					{
						if(module_shadow[i]._type==module[module_taken]._type) 
						{
							console.log("OK, module " + i);
							console.log(module_shadow[i]);
							Object.assign(module[module_taken], module_shadow[i]);
							console.log(module[module_taken]);
						}
						else 
						{
							module[module_taken].modulox_pos_x =650;
							console.log("mauvais type " + i);
						}
					}
				}
			}
			
			updateList();
			drawBackground();
			drawModules();
			
			isTaken = 0;
			outputs[port_selected].send(module_blink_stop);
			console.log(module_blink_stop);
			
			
		}
		if(_mouse.x>600 && _mouse.x<790 && _mouse.y>10 && _mouse.y<490)
		{
			module[module_taken].modulox_pos_x =650;
			updateList();
			drawBackground();
			drawModules();
			isTaken = 0;
			if(module_connected) outputs[port_selected].send(module_blink_stop);
		}
		console.log("module placed : " + module_placed);
		if(module_placed) document.getElementById("Set_text").innerHTML = "Tous les modules sont placés. Aller dans l'onglet -MIDI- pour paramétrer les modules.";
		else document.getElementById("Set_text").innerHTML = "Placer les composants sur la grille avec un drag-and-drop";
	}
};


/////////////////////////////////////////////////////////

//------	
// Dessin des cercles rouges autour des boutons
//------

function change_led3(num)
{
	if(num==0) return 1;
	if(num==1) return 3;
	if(num==2) return 0;
	if(num==3) return 2;
}

function change_led4(num)
{
	if(num==0) return 7;
	if(num==1) return 6;
	if(num==2) return 5;
	if(num==3) return 4;
	if(num==4) return 0;
	if(num==5) return 1;
	if(num==6) return 2;
	if(num==7) return 3;
}

function selectButton(num_mod, place) {	
	StopBlink();
	console.log("SelectButton");
	console.log("num mode : " + num_mod);
	console.log("place : " + place);
	active_module = num_mod;
	active_place = place;
	
	Show_parameters();

	//init_values();
	
	
//FIN GRO

	drawBackground2();
	drawModules();
	
	console.log("selectButton : " + num_mod + ", " + place);
	
	outputs[port_selected].send([0xE1,2,num_mod]);
	console.log([0xE1,2,num_mod]);
	if(module[num_mod].module_image_num==0)
	{
		//send_data(-8, 3, change_led3(place));
		setTimeout(send_data, 10, -8,3,change_led3(place),0);
		//outputs[port_selected].send([0xE1,3,change_led3(place)]);
		//console.log([0xE1,3,change_led3(place)]);
	}
	if(module[num_mod].module_image_num==2)
	{
		outputs[port_selected].send([0xE1,3,change_led4(place)]);
		console.log([0xE1,3,place]);
	}
	if(module[num_mod].module_image_num==1)
	{
		outputs[port_selected].send([0xE1,3,place]);
		console.log([0xE1,3,place]);
	}
};

$(document).ready(function () {
	document.getElementById("button").onclick = onRead;
	document.getElementById("button2").onclick = onWrite;
	//document.getElementById("button3").onclick = onLoadPreset;
	document.getElementById('button3').addEventListener('change', onLoadPreset, false);
	document.getElementById("button4").onclick = onSavePreset;
	document.getElementById('button5').addEventListener('change', onLoadPatch, false);
	document.getElementById("button10").onclick = setParam1;
	document.getElementById("button11").onclick = setParam2;
	document.getElementById("button12").onclick = setParam3;
	document.getElementById("button13").onclick = setParam4;
	document.getElementById("button14").onclick = setParam5;
	$("#onglet_Set").click(changeSet);
	$("#onglet_MIDI").click(changeMIDI);
//1111111111111111111
	$("#onglet_Console").click(changeConsole);
	$("#onglet_Sequence").click(changeSequence);
	$("#onglet_Arpegio").click(changeArpegio);
	$("#onglet_Module").click(changeModule);
});

function unlock(){
	$.unblockUI();
}

function drawBackground(){
	context.fillStyle="#333333";
	context.fillRect(0,0,800,500);

	context.fillStyle="#555555";
	context.fillRect(600,10,190,480);

	context.beginPath();
	context.lineWidth="3";
	context.strokeStyle="white";
	context.rect(59,50,(6*grille_width),400); 

	for(i = 0;i < 7;i++){
		context.moveTo(59+i*grille_width,50);
		context.lineTo(59+i*grille_width,450);
	}

	for(i = 0;i < 5;i++){
		context.moveTo(59,50+i*grille_height);
		context.lineTo((59+6*grille_width),50+i*grille_height);
	}

	context.stroke();
}

function drawBackground2(){
	context2.fillStyle="#333333";
	context2.fillRect(0,0,800,500);

	context2.fillStyle="#555555";
	context2.fillRect(600,10,190,480);
	
	
}

function drawModules(){
  drawBackground();
	drawBackground2();
		
	for(i = 0;i < module_number;i++){
		if(shadow_loaded) module_shadow[i].drawmodule_shadow();
	}
	for(i = 0;i < module_number;i++){
		module[i].drawmodule();
	}
	module[active_module].draw_circle(active_place);
};

function return_note(x,y){
	var begin_left=50, 
	    begin_top=50,
			key_width=20,
			key_height=50;
			numk=0;
	for(i = 0;i < 35;i++){
		if((x>begin_left+i*key_width) && (x<key_width+begin_left+i*key_width) && (y>begin_top) && (y<begin_top+key_height) && !((x>begin_left+((i+0.75)*key_width)) && (x<begin_left+((i+0.75)*key_width)+key_width/2) && (y>begin_top) && (y<begin_top+key_height/2)) && !((x>begin_left+((i-0.25)*key_width)) && (x<begin_left+((i-0.25)*key_width)+key_width/2) && (y>begin_top) && (y<begin_top+key_height/2)))
		{
			if(i%7==0) {numk = 0; key_over = "F";}
			if(i%7==1) {numk = 2; key_over = "G";}
			if(i%7==2) {numk = 4; key_over = "A";}
			if(i%7==3) {numk = 6; key_over = "B";}
			if(i%7==4) {numk = 7; key_over = "C";}
			if(i%7==5) {numk = 9; key_over = "D";}
			if(i%7==6) {numk = 11; key_over = "E";}
			return (numk+12*Math.trunc(i/7));
		}
	}
	
	for(i = 0;i < 35;i++){
		if((i%7)==0 || (i%7)==1 || (i%7)==2 || (i%7)==4 || (i%7)==5)
		{
			if((x>begin_left+((i+0.75)*key_width)) && (x<begin_left+((i+0.75)*key_width)+key_width/2) && (y>begin_top) && (y<begin_top+key_height/2))
			{
				if(i%7==0) {numk = 1; key_over = "F#";}
				if(i%7==1) {numk = 3; key_over = "G#";}
				if(i%7==2) {numk = 5; key_over = "A#";}
				if(i%7==4) {numk = 8; key_over = "C#";}
				if(i%7==5) {numk = 10; key_over = "D#";}
				return (numk+12*Math.trunc(i/7));
			}
		}
	}
}
function drawArpegio(x,y){
	
	context4.strokeStyle   = "black";
	context4.lineWidth     = 1;
	var begin_left=50, 
	    begin_top=50,
			key_width=20,
			key_height=50;
	
	context4.fillStyle="#FFFFFF";
	for(i = 0;i < 35;i++){
		if((x>begin_left+i*key_width) && (x<key_width+begin_left+i*key_width) && (y>begin_top) && (y<begin_top+key_height) && !((x>begin_left+((i+0.75)*key_width)) && (x<begin_left+((i+0.75)*key_width)+key_width/2) && (y>begin_top) && (y<begin_top+key_height/2)) && !((x>begin_left+((i-0.25)*key_width)) && (x<begin_left+((i-0.25)*key_width)+key_width/2) && (y>begin_top) && (y<begin_top+key_height/2)))
		{
			context4.fillStyle="#AA1199";
			if(i%7==0) key_over = "F";
			if(i%7==1) key_over = "G";
			if(i%7==2) key_over = "A";
			if(i%7==3) key_over = "B";
			if(i%7==4) key_over = "C";
			if(i%7==5) key_over = "D";
			if(i%7==6) key_over = "E";
			if(key_over!=previous_key_over) {console.log(key_over + " / " + return_note(x,y));}
			previous_key_over=key_over
		}
		else
		{
			//console.log(testNote_num);
			//if(testNote_num==i && testNote_type==0) context4.fillStyle="#0044FF";
			//else 
				context4.fillStyle="#FFFFFF";
				for(j=0; j<testNote_num[arpege_num].length; j++)
				{
					if(testNote_num[arpege_num][j]==i && testNote_type[arpege_num][j]==0) {context4.fillStyle="#0044FF";}
				}
		}
		context4.fillRect(begin_left+i*key_width,begin_top,key_width,key_height);
		context4.strokeRect(begin_left+i*key_width,begin_top,key_width,key_height);
		context4.stroke();
	}
	
	context4.fillStyle="#000000";
	for(i = 0;i < 35;i++){
		if((i%7)==0 || (i%7)==1 || (i%7)==2 || (i%7)==4 || (i%7)==5)
		{
			if((x>begin_left+((i+0.75)*key_width)) && (x<begin_left+((i+0.75)*key_width)+key_width/2) && (y>begin_top) && (y<begin_top+key_height/2))
			{
				context4.fillStyle="#AA1199";
				if(i%7==0) key_over = "F#";
				if(i%7==1) key_over = "G#";
				if(i%7==2) key_over = "A#";
				if(i%7==4) key_over = "C#";
				if(i%7==5) key_over = "D#";
				if(key_over!=previous_key_over) console.log(key_over + " / " + return_note(x,y));
				previous_key_over=key_over
			}
			else
			{
				//if(testNote_num==i && testNote_type==1) context4.fillStyle="#0044FF";
				//else 
				//console.log(testNote_num);
				context4.fillStyle="#000000";
				for(j=0; j<testNote_num[arpege_num].length; j++)
				{
					if(testNote_num[arpege_num][j]==i && testNote_type[arpege_num][j]==1) context4.fillStyle="#0044FF";
				}
			}
			context4.fillRect(begin_left+((i+0.75)*key_width),begin_top,key_width/2,key_height/2);
			
		}			
	}
}

function convert_note(an,nn)
{
	var ret=127;
	console.log("testNote_num[an][nn] : " + testNote_num[an][nn]);
	var conv = parseInt(testNote_num[an][nn]/7);
	var conv2 = testNote_num[an][nn]%7;
	console.log("conv : " + conv + " conv2 : " + conv2);
	if(testNote_type[an][nn]==0) 
	{
		if(conv2==0) ret=0+conv*12;
		if(conv2==1) ret= 2+conv*12;
		if(conv2==2) ret= 4+conv*12;
		if(conv2==3) ret= 6+conv*12;
		if(conv2==4) ret= 7+conv*12;
		if(conv2==5) ret= 9+conv*12;
		if(conv2==6) ret= 11+conv*12;
	}
	if(testNote_type[an][nn]==1) 
	{
		if(conv2==0) ret=1+conv*12;
		if(conv2==1) ret= 3+conv*12;
		if(conv2==2) ret= 5+conv*12;
		if(conv2==3) ret= 8+conv*12;
		if(conv2==4) ret= 10+conv*12;
	}
	return ret;
}

function push_note(an,nn)
{
	var conv = parseInt(nn/12);
	var conv2 = nn%12;
	console.log("conv : " + conv + " conv2 : " + conv2);
	if(conv2==0) {testNote_num[an].push(0+conv*7); testNote_type[an].push(0);} 
	if(conv2==1) {testNote_num[an].push(0+conv*7); testNote_type[an].push(1);}
	if(conv2==2) {testNote_num[an].push(1+conv*7); testNote_type[an].push(0);}
	if(conv2==3) {testNote_num[an].push(1+conv*7); testNote_type[an].push(1);}
	if(conv2==4) {testNote_num[an].push(2+conv*7); testNote_type[an].push(0);}
	if(conv2==5) {testNote_num[an].push(2+conv*7); testNote_type[an].push(1);}
	if(conv2==6) {testNote_num[an].push(3+conv*7); testNote_type[an].push(0);}
	if(conv2==7) {testNote_num[an].push(4+conv*7); testNote_type[an].push(0);}
	if(conv2==8) {testNote_num[an].push(4+conv*7); testNote_type[an].push(1);}
	if(conv2==9) {testNote_num[an].push(5+conv*7); testNote_type[an].push(0);}
	if(conv2==10) {testNote_num[an].push(5+conv*7); testNote_type[an].push(1);}
	if(conv2==11) {testNote_num[an].push(6+conv*7); testNote_type[an].push(0);}
}

function testNote(x,y){
	console.log("arpege length : " + testNote_num[arpege_num].length);
	for(j=0; j<testNote_num[arpege_num].length; j++)
	{
		console.log("note " + convert_note(arpege_num,j) + " : " + testNote_num[arpege_num][j]);
		
	}
	
	var begin_left=50, 
	    begin_top=50,
		key_width=20,
		key_height=50;
	
	for(i = 0;i < 35;i++){
		if((x>begin_left+i*key_width) && (x<key_width+begin_left+i*key_width) && (y>begin_top) && (y<begin_top+key_height) && !((x>begin_left+((i+0.75)*key_width)) && (x<begin_left+((i+0.75)*key_width)+key_width/2) && (y>begin_top) && (y<begin_top+key_height/2)) && !((x>begin_left+((i-0.25)*key_width)) && (x<begin_left+((i-0.25)*key_width)+key_width/2) && (y>begin_top) && (y<begin_top+key_height/2)))
		{
			var j = testNote_num[arpege_num].indexOf(i);
			
			if(j != -1) {
				testNote_num[arpege_num].splice(j, 1);
				testNote_type[arpege_num].splice(j, 1);
			}
			else
			{
				if(testNote_num[arpege_num].length < 4)
				{
					testNote_num[arpege_num].push(i);
					testNote_type[arpege_num].push(0);
				}
			}
		}
	}
	for(i = 0;i < 35;i++){
		if((i%7)==0 || (i%7)==1 || (i%7)==2 || (i%7)==4 || (i%7)==5)
		{
			if((x>begin_left+((i+0.75)*key_width)) && (x<begin_left+((i+0.75)*key_width)+key_width/2) && (y>begin_top) && (y<begin_top+key_height/2))
			{
				var j = testNote_num[arpege_num].indexOf(i);
				if(j != -1) {
					testNote_num[arpege_num].splice(j, 1);
					testNote_type[arpege_num].splice(j, 1);
				}
				else
				{
					if(testNote_num[arpege_num].length < 4)
					{
						testNote_num[arpege_num].push(i);
						testNote_type[arpege_num].push(1);
					}
				}
			}
		}			
	}
}
function drawSequence(){

	context3.shadowOffsetX = 3;
	context3.shadowOffsetY = 3;
	context3.shadowBlur    = 3;
	context3.shadowColor   = "black";
	context3.fillStyle="#666666";
	context3.fillRect(90,88,570,290);
	
	context3.beginPath();
	context3.strokeStyle   = "black";
	context3.lineWidth     = 1;
	context3.shadowOffsetX = 4;
	context3.shadowOffsetY = 4;
	context3.shadowBlur    = 7;
	context3.shadowColor   = "black";
	context3.moveTo(233, 88);
	context3.lineTo(233, 378);
	context3.moveTo(373, 88);
	context3.lineTo(373, 378);
	context3.moveTo(513, 88);
	context3.lineTo(513, 378);
	context3.stroke();
	
	context3.shadowOffsetX = 0;
	context3.shadowOffsetY = 0;
	context3.shadowBlur    = 0;
	context3.fillStyle="#555555";
	context3.fillRect(20,20,300,60);
	
	context3.shadowOffsetX = 1;
	context3.shadowOffsetY = 1;
	context3.shadowBlur    = 1;	
	
	console.log("current_seq : " + current_seq);
	
	$("#Seq1_note" ).val(seq[current_seq].note[0]);
	$("#Seq2_note" ).val(seq[current_seq].note[1]);
	$("#Seq3_note" ).val(seq[current_seq].note[2]);
	$("#Seq4_note" ).val(seq[current_seq].note[3]);
	
	$("#Seq1_chan" ).val(seq[current_seq].channel[0]);
	$("#Seq2_chan" ).val(seq[current_seq].channel[1]);
	$("#Seq3_chan" ).val(seq[current_seq].channel[2]);
	$("#Seq4_chan" ).val(seq[current_seq].channel[3]);

	if(seq[current_seq].current_meas==0) context3.drawImage(mesur1ON_image, 90, 50); 
	else context3.drawImage(mesur1OFF_image, 90, 50); 
	if(seq[current_seq].num_meas>1) {
		if(seq[current_seq].current_meas==1) context3.drawImage(mesur2ON_image, 125, 50); 
		else context3.drawImage(mesur2OFF_image, 125, 50); 
	}
	if(seq[current_seq].num_meas>2) {
		if(seq[current_seq].current_meas==2) context3.drawImage(mesur3ON_image, 160, 50); 
		else context3.drawImage(mesur3OFF_image, 160, 50);
	}
	if(seq[current_seq].num_meas>3) {
		if(seq[current_seq].current_meas==3) context3.drawImage(mesur4ON_image, 195, 50); 
		else context3.drawImage(mesur4OFF_image, 195, 50);
	}	
	
	context3.shadowOffsetX = 3;
	context3.shadowOffsetY = 3;
	context3.shadowBlur    = 10;
	
	console.log("current seq : " + current_seq);
	
	seq[current_seq].draw();
};

function moduleList()
{
	for(i = 0;i < module_number;i++){
		module[i].modulox_pos_x=650;
		module[i].modulox_pos_y=50+i*80;
	}
}

function updateList()
{
	var j=0;
	module_placed = 1;
	for(i = 0;i < module_number;i++){
		if(module[i].modulox_pos_x==650)
		{
			module_placed = 0;
			module[i].modulox_pos_x=650;
			module[i].modulox_pos_y=50+j*80;
			j++;
		}
	}
}

function changeSet()
{
	console.log("changeSet");
	change_onglet("Set");
}

function changeMIDI()
{
	console.log("changeMIDI");
	change_onglet("MIDI");
	if(!module_placed)
	{
		document.getElementById("MIDI_text").innerHTML = "Tous les modules ne sont pas placés";
	}
	else
	{
		document.getElementById("MIDI_text").innerHTML = "Cliquer sur un encodeur pour modifier ses paramètres";
	}
}

//1111111111111111111
function changeConsole()
{
	console.log("changeConsole");
	change_onglet("Console");
}

function changeSequence()
{
	drawSequence();
	console.log("changeSequence");
	change_onglet("Sequence");
}

function changeArpegio()
{
	drawArpegio();
	console.log("changeArpegio");
	change_onglet("Arpegio");
}

function changeModule()
{
	change_onglet("Module");
}


if (navigator.requestMIDIAccess) {
	// Try to connect to the MIDI interface.
	navigator.requestMIDIAccess().then(onSuccess, onFailure);
} else {
	console.log("Web MIDI API not supported!");
}

function setParam1(e){
	console.log("Détail 1");
	module[active_module].init_parm2(active_place, 0);
}

function setParam2(e){
	console.log("Détail 2");
	module[active_module].init_parm2(active_place, 1);
}

function setParam3(e){
	console.log("Détail 3");
	module[active_module].init_parm2(active_place, 2);
}

function setParam4(e){
	console.log("Détail 4");
	module[active_module].init_parm2(active_place, 3);
}

function setParam5(e){
	console.log("Détail 5");
	module[active_module].init_parm2(active_place, 4);
}
//--------------------------------------
//--------- Bouton Connect -------------
//--------------------------------------

function onRead(e){	
	if(debug==1)
	{
		module_number = 2;
		module[0].module_image_num=0;
		module[1].module_image_num=2;		
		moduleList();
		drawModules();
		state=2;
	}
	else
	{
		console.log("port_number : " + port_number);
		if(port_number==0) document.getElementById("Set_text").innerHTML = "Aucun Modulox connecté";
		else
		{
			$.blockUI({ message: "receiving data..." });
			outputs[port_selected].send(module_init);
			outputs[port_selected].send([0xE0, 16, 16]);
			console.log("send port " + port_selected);
		}
	}
}

function writeStart(knob,module, tempo_val)
{
	outputs[port_selected].send([234,knob,module]);
	console.log("--------MODULE " + module + " - KNOB " + knob);
	console.log("" + [234,knob,module] + " - time : " + tempo_val);
}

function transferEnd()
{
	outputs[port_selected].send([0xE8,3,0]);
	console.log([0xE8,3,0]);
}



function tempo()
{
}

function writeStop()
{
	outputs[port_selected].send([0xE8,2,0]);
}

function onSendId(e) {
	console.log("Id module : " + $("#Id_value").val());
	outputs[port_selected].send([0xE0,6,$("#Id_value").val()]);
}

 
// Function executed on successful connection
function onSuccess(interface) {

	midi = interface;
	console.log("MIDI OK");	
 
	// Grab an array of all available devices
	var iter = interface.outputs.values();
	for (var i = iter.next(); i && !i.done; i = iter.next()) {
		outputs.push(i.value);
	}
  
	var inputs = interface.inputs.values();
	// loop through all inputs
	for(var input = inputs.next(); input && !input.done; input = inputs.next()){
		input.value.onmidimessage = onMIDIMessage;
	}
	showMIDIPorts(interface);
	
	//interface.onstatechange = onStateChange;
}

// Affichage des appareils MIDI connectÃ©s
function showMIDIPorts(midiAccess){
	var inputs = midiAccess.inputs;
	$('#myselect').empty();
	port_number = 0;
	inputs.forEach(function(port){
		$('#myselect').append('<option value="'+port_number+'">'+port.name+'</option>');
		port_number++;		
	});
}

// ExÃ©cutÃ© quand on branche ou dÃ©branche
/*function onStateChange(event){
    
	outputs.length=0;
	//inputs.length=0;
	
	console.log("change");
	console.log("evente" + event);
	module_number=0;
	drawModules();
	document.getElementById("button").style.backgroundColor = "#555";
	document.getElementById("button").innerHTML = "Connect";
	console.log("length :" + outputs.length);
	var iter = midi.outputs.values();
	for (var i = iter.next(); i && !i.done; i = iter.next()) {
		outputs.push(i.value);
	}
	//console.log(outputs);
  
	var inputs = midi.inputs.values();
	// loop through all inputs
	for(var input = inputs.next(); input && !input.done; input = inputs.next()){
		// listen for midi messages
		input.value.onmidimessage = onMIDIMessage;
	}
	showMIDIPorts(midi);
}*/




/*function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}*/

/*function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}*/
 
// Function executed on failed connection
function onFailure(error) {
  console.log("Could not connect to the MIDI interface");
}

function change_onglet(name)
{
	console.log('onglet_'+anc_onglet);
	console.log('onglet_'+name);
   document.getElementById('onglet_'+anc_onglet).className = 'onglet_0 onglet';
   document.getElementById('onglet_'+name).className = 'onglet_1 onglet';
   document.getElementById('contenu_onglet_'+anc_onglet).style.display = 'none';
   document.getElementById('contenu_onglet_'+name).style.display = 'block';
   anc_onglet = name;
   if(module_placed) StopBlink();
}
