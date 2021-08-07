class EncoderParam {
	
  constructor(_module, _place, _choice,type) {
    this._module = _module;
    this._place = _place;
	this.type=type;
		this._choice = _choice;
		this.midi_value=_place+4*_module+1;
		this.midi_color="#000000";
		this.midi_param_value = [];
		this.midi_param_value[0]=127;
		this.midi_param_value[1]=0;
		this.midi_param_value[2]=0;
		this.midi_param_value[3]=0;
		this.midi_color_r = 0 ;
		  this.midi_color_g = 0;
		  this.midi_color_b = 0;
		if(this._choice == 0) {this.name='#midi1_value'; this.midi_color="#FFFF00";}
		if(this._choice == 1) {this.name='#midi2_value'; this.midi_color="#00FF00";}
		if(this._choice == 2) {this.name='#midi3_value'; this.midi_color="#FF0000";}
		if(this._choice == 3) {this.name='#midi4_value'; this.midi_color="#0000FF";}
		if(this._choice == 4) {this.name='#midi5_value'; this.midi_color="#FF00FF";}
		//console.log("m : " + _module + " p : " + _place + " c : " + _choice + " - " + this.name);
		
    }
	
	init_mode()
	{
		this.midi_param_value[3]=0;
	}
	
	xml()
	{
		var xml_txt = "<param><module>"+this._module+"</module><place>"+this._place+"</place><choice>"+
		this._choice+"</choice><midi_value>"+this.midi_value+"</midi_value><midi_color>"+this.midi_color+
		"</midi_color><midi_param0>"+this.midi_param_value[0]+"</midi_param0><midi_param1>"+this.midi_param_value[1]+
		"</midi_param1><midi_param2>"+this.midi_param_value[2]+"</midi_param2><midi_param3>"+this.midi_param_value[3]+"</midi_param3></param>";
		return xml_txt;
	}
	
	toggleParm()
	{
		console.log("param" + this._choice);
		if(this._choice == 0) 
		{
			//console.log("midi val : " + this.midi_value);
			this.midi_value=midi_note_count;
			this.midi_color="#000000";
			this.midi_param_value[0]=127;
			this.midi_param_value[1]=0;
			this.midi_param_value[2]=2;
			this.midi_param_value[3]=1;
			this.midi_color_r = 0 ;
			this.midi_color_g = 0;
			this.midi_color_b = 0;
			//midi_note_count++;
		}
		if(this._choice == 1) 
		{
			this.midi_value=midi_note_count;
			this.midi_color="#00FF00";
			this.midi_param_value[0]=127;
			this.midi_param_value[1]=0;
			this.midi_param_value[2]=0;
			this.midi_param_value[3]=0;
			this.midi_color_r = 0 ;
			this.midi_color_g = 0;
			this.midi_color_b = 0;
			midi_note_count++;
		}
		if(this._choice == 2) 
		{
			this.midi_value=3;
			this.midi_color="#FF0000";
			this.midi_param_value[0]=127;
			this.midi_param_value[1]=0;
			this.midi_param_value[2]=0;
			this.midi_param_value[3]=2;
			this.midi_color_r = 127 ;
			this.midi_color_g = 0;
			this.midi_color_b = 0;
		}
	}
	
	seq_preset_start()
	{
		console.log("seq_preset_start");
		console.log("param" + this._choice);
		if(this._choice == 0) 
		{
			//console.log("midi val : " + this.midi_value);
			this.midi_value=1;
			this.midi_color="#000000";
			this.midi_param_value[0]=111;
			this.midi_param_value[1]=0;
			this.midi_param_value[2]=1;
			this.midi_param_value[3]=3;
			this.midi_color_r = 0 ;
			this.midi_color_g = 0;
			this.midi_color_b = 0;
		}
		if(this._choice == 1) 
		{
			this.midi_value=1;
			this.midi_color="#00FE00";
			this.midi_param_value[0]=7;
			this.midi_param_value[1]=23;
			this.midi_param_value[2]=15;
			this.midi_param_value[3]=3;
			this.midi_color_r = 0 ;
			this.midi_color_g = 127;
			this.midi_color_b = 0;
		}
		if(this._choice == 2) 
		{
			this.midi_value=2;
			this.midi_color="#FE0000";
			this.midi_param_value[0]=127;
			this.midi_param_value[1]=0;
			this.midi_param_value[2]=60;
			this.midi_param_value[3]=3;
			this.midi_color_r = 127 ;
			this.midi_color_g = 0;
			this.midi_color_b = 0;
		}
	}
	
	seq_preset_release()
	{
		console.log("param" + this._choice);
		if(this._choice == 0) 
		{
			//console.log("midi val : " + this.midi_value);
			this.midi_value=2;
			this.midi_color="#FEFE00";
			this.midi_param_value[0]=127;
			this.midi_param_value[1]=0;
			this.midi_param_value[2]=1;
			this.midi_param_value[3]=3;
			this.midi_color_r = 127 ;
			this.midi_color_g = 127;
			this.midi_color_b = 0;
		}
		if(this._choice == 1) 
		{
			this.midi_value=6;
			this.midi_color="#0080FE";
			this.midi_param_value[0]=100;
			this.midi_param_value[1]=5;
			this.midi_param_value[2]=1;
			this.midi_param_value[3]=3;
			this.midi_color_r = 0 ;
			this.midi_color_g = 64;
			this.midi_color_b = 127;
		}
	}
	
	seq_preset_volume()
	{
		console.log("param" + this._choice);
		this.midi_value=7;
		this.midi_color="#0000FE";
		this.midi_param_value[0]=100;
		this.midi_param_value[1]=0;
		this.midi_param_value[2]=2;
		this.midi_param_value[3]=3;
		this.midi_color_r = 0 ;
		this.midi_color_g = 0;
		this.midi_color_b = 127;
	}
	seq_preset_seqnum()
	{
		console.log("param" + this._choice);
		this.midi_value=3;
		this.midi_color="#FE8000";
		this.midi_param_value[0]=3;
		this.midi_param_value[1]=0;
		this.midi_param_value[2]=2;
		this.midi_param_value[3]=3;
		this.midi_color_r = 127 ;
		this.midi_color_g = 64;
		this.midi_color_b = 0;
	}
	
	
	init_midi(type, lib, noteoff)
	{	
		console.log("init_midi");
		console.log(this.name);
		console.log("type : " + type);
		if(type=="note")
		{
			$(this.name).empty();
			console.log("param val note : " + this.midi_param_value[3]);
			if(this.midi_param_value[3]==0)
			{
				for(i=1; i<128; i++)
				{
					$(this.name).append('<option value="'+i+'">Note '+i+'</option>');
				}
			}
			if(this.midi_param_value[3]==2)
			{
				$(this.name).append('<option value="1">Nothing</option>');
				$(this.name).append('<option value="2">All notes Off</option>');
				if(noteoff!=0) $(this.name).append('<option value="3">Note OFF</option>');
			}
			if(this.midi_param_value[3]==1)
			{
				for(i=1; i<128; i++)
				{
					$(this.name).append('<option value="'+i+'">CC '+i+'</option>');
				}
			}
			if(this.midi_param_value[3]==3)
			{
				console.log("sequencer " + sequencer);
				if(sequencer==1)
				{
					$(this.name).append('<option value="1">Start</option>');
					$(this.name).append('<option value="2">Stop</option>');
				}
				if(sequencer==2)
				{
					$(this.name).append('<option value="1">Start</option>');
					$(this.name).append('<option value="2">Stop</option>');
				}
			}
		}
		if(type=="CC")
		{
			$(this.name).empty();
			console.log("param val : " + this.midi_param_value[3]);
			if(this.midi_param_value[3]!=3)
			{
				for(i=1; i<128; i++)
				{
					$(this.name).append('<option value="'+i+'">CC '+i+'</option>');
				}
			}
			else
			{
				if(sequencer==1)
				{
					$(this.name).append('<option value="1">BPM</option>');
					$(this.name).append('<option value="2">Transpose</option>');
					$(this.name).append('<option value="3">Arpege num</option>');
					$(this.name).append('<option value="4">Mode</option>');
					$(this.name).append('<option value="5">Distance</option>');
					$(this.name).append('<option value="6">Release</option>');
					$(this.name).append('<option value="7">Volume</option>');
				}
				if(sequencer==2)
				{
					$(this.name).append('<option value="1">BPM</option>');
					$(this.name).append('<option value="2">Transpose</option>');
					$(this.name).append('<option value="3">Select seq</option>');
					$(this.name).append('<option value="6">Release</option>');
					$(this.name).append('<option value="7">Volume</option>');
				}
			}
		}
		if(this.name=='#midi1_value') document.getElementById("midi1_text").innerHTML = lib;
		if(this.name=='#midi2_value') document.getElementById("midi2_text").innerHTML = lib;
		if(this.name=='#midi3_value') document.getElementById("midi3_text").innerHTML = lib;
		if(this.name=='#midi4_value') document.getElementById("midi4_text").innerHTML = lib;
		if(this.name=='#midi5_value') document.getElementById("midi5_text").innerHTML = lib;
	}
	
	send_midi()
	{
		console.log("choice : " + this._choice);
		send_timer(0,4+parseInt(this._choice),this.midi_value);
		
		send_timer(0,(9+3*parseInt(this._choice)),parseInt(this.midi_color.substr(1, 2), 16)>>1);
		send_timer(0,(10+3*parseInt(this._choice)),parseInt(this.midi_color.substr(3, 2), 16)>>1);
		send_timer(0,(11+3*parseInt(this._choice)),parseInt(this.midi_color.substr(5, 2), 16)>>1);
		
		send_timer(0,24+parseInt(this._choice),this.midi_param_value[3]);
		send_timer(0,29+parseInt(this._choice),this.midi_param_value[0]);
		send_timer(0,34+parseInt(this._choice),this.midi_param_value[1]);
		send_timer(0,39+parseInt(this._choice),this.midi_param_value[2]);
	}
	rgbToHex(r, g, b) {
		return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
	}
	
	componentToHex(c) {
		//console.log("c : " + c);
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	
	convert_color()
	{
		this.midi_color = this.rgbToHex(this.midi_color_r, this.midi_color_g, this.midi_color_b);
		console.log("************** convert color : " + this.midi_color + ", module : " + this._module + ", place : " + this._place + ", param : " + this._choice);
	}
	
	// mode_num :
	//  - 0 : Note (Press)
	//  - 1 : Note (Release)
	//  - 2 : CC
	//  - 3 : Note (Press Off)
	//  - 4 : CC (with color)
	init_list(mode_num)
	{
		console.log("init_list - mode : " + mode_num);
		console.log("module type : " + this.type);
		
		
		var name_text, name_color, name_detail;
		
		//$(this.name).style.cssText = "background:"+this.color+";";
		
		$("#advanced1_value").hide();
		$("#advanced2_value").hide();
		$("#advanced3_value").hide();
		$("#advanced4_value").hide();
		$("#advanced1_text").hide();
		$("#advanced2_text").hide();
		$("#advanced3_text").hide();
		$("#advanced4_text").hide();
		$("#midi1_color").hide();
		$("#color_text").hide();
		
		if(this._choice == 0) {name_text='#midi1_text'; name_detail='#button10';}
		if(this._choice == 1) {name_text='#midi2_text'; name_detail='#button11';}
		if(this._choice == 2) {name_text='#midi3_text'; name_detail='#button12';}
		if(this._choice == 3) {name_text='#midi4_text'; name_detail='#button13';}
		if(this._choice == 4) {name_text='#midi5_text'; name_detail='#button14';}
		
		$(name_text).hide();
		$(this.name).hide();
		$(name_detail).hide();
		
		if(mode_num==0) 
		{
			this.init_midi("note", "Press",0);
			$(name_text).show();
			$(this.name).show();
			$(name_detail).show();
		}
		if(mode_num==1) 
		{
			this.init_midi("note", "Release",1);
			$(name_text).show();
			$(this.name).show();
			$(name_detail).show();
		}
		if(mode_num==2 && this.type!=2) 
		{
			this.init_midi("CC", "Turn - CC",0);
			$(name_text).show();
			$(this.name).show();
			$(name_detail).show();
		}
		if(mode_num==3) 
		{
			this.init_midi("note", "Press Off",1);
			$(name_text).show();
			$(this.name).show();
			$(name_detail).show();
		}
		if(mode_num==4 && this.type!=2) 
		{
			this.init_midi("CC", "Turn - CC",0);
			$(name_text).show();
			$(this.name).show();
			$(name_detail).show();
		}
		$(this.name).val(this.midi_value);
		
	}	

	type_par(input_mode)
	{
		console.log("type_par");
		console.log("input_mode : " + input_mode + ", this._choice : " + this._choice);
		if(input_mode==1)
		{
			if(this._choice == 0) return 2;
			if(this._choice == 1) return 1;
			if(this._choice == 2) return 1;
			if(this._choice == 3) return 0;
			if(this._choice == 4) return 0;
		}
		if(input_mode==2)
		{
			if(this._choice == 0) return 2;
			if(this._choice == 1) return 1;
			if(this._choice == 2) return 1;
			if(this._choice == 3) return 0;
			if(this._choice == 4) return 0;
		}
		if(input_mode==3)
		{
			if(this._choice == 0) return 1;
			if(this._choice == 1) return 1;
			if(this._choice == 2) return 1;
			if(this._choice == 3) return 1;
			if(this._choice == 4) return 2;
		}
		if(input_mode==4)
		{
			if(this._choice == 0) return 2;
			if(this._choice == 1) return 2;
			if(this._choice == 2) return 2;
			if(this._choice == 3) return 2;
			if(this._choice == 4) return 0;
		}
	}
	
	init_val()
	{
		$(this.name).val(this.midi_value);
	}
	
	init_param(mod)
	{
		console.log("init_param - mode : " + mod);
		$("#advanced1_value").hide();
		$("#advanced2_value").hide();
		$("#advanced3_value").hide();
		$("#advanced4_value").hide();
		$("#advanced1_text").hide();
		$("#advanced2_text").hide();
		$("#advanced3_text").hide();
		$("#advanced4_text").hide();
		$("#midi1_color").hide();
		$("#color_text").hide();
		
		$("#advanced1_value").empty();
		$("#advanced2_value").empty();
		$("#advanced3_value").empty();
		$("#advanced4_value").empty();
		
		$("#advanced1_value").show();
		$("#advanced2_value").show();
		if(this.type!=1) $("#advanced3_value").show();
		$("#advanced4_value").show();
		$("#advanced1_text").show();
		$("#advanced2_text").show();
		if(this.type!=1) $("#advanced3_text").show();
		$("#advanced4_text").show();
		$("#midi1_color").show();
		$("#color_text").show();

		console.log("type par : " + this.type_par(mod,this._choice));
		
		hueb.setColor(this.midi_color);
		
		if(mod==1 && this._choice==0) {$("#midi1_color").hide(); $("#color_text").hide();}
		if(mod==2 && this._choice==0) {$("#midi1_color").hide(); $("#color_text").hide();}
		if(mod==2 && this._choice==2) {$("#midi1_color").hide(); $("#color_text").hide();}
		if(mod==3 && this._choice==4) {$("#midi1_color").hide(); $("#color_text").hide();}
		
		//$(this.name).style.cssText = "background:"+this.color+";";
		
		
		//CC
		if(this.type_par(mod,this._choice)==2)
		{
			console.log("midi val : " + this.midi_value);
			console.log("midi_param_value[3] : " + this.midi_param_value[3]);
			//Normal / Logarithme
			if(this.midi_param_value[3]==0 || this.midi_param_value[3]==1)
			{
				document.getElementById("advanced1_text").innerHTML = "max CC";
				document.getElementById("advanced2_text").innerHTML = "min CC";
				//this.midi_param_value[0]=127;
				//this.midi_param_value[1]=0;
				for(i=0; i<128; i++)
				{
					$("#advanced1_value").append('<option value="'+i+'">'+i+'</option>');
					$("#advanced2_value").append('<option value="'+i+'">'+i+'</option>');
				}
				for(i=0; i<5; i++)
				{
					$("#advanced3_value").append('<option value="'+i+'">'+i+'</option>');
				}
			}
			//Relative
			if(this.midi_param_value[3]>=4)
			{
				$("#advanced1_value").hide();
				$("#advanced2_value").hide();
				$("#advanced3_value").hide();
				$("#advanced1_text").hide();
				$("#advanced2_text").hide();
				$("#advanced3_text").hide();
		   }
		   //Sequence
			if(sequencer==2 && this.midi_param_value[3]==3)
			{
				if(this.midi_value==1)
				{
					document.getElementById("advanced1_text").innerHTML = "max BPM";
					document.getElementById("advanced2_text").innerHTML = "min BPM";
					//this.midi_param_value[0]=127;
					//this.midi_param_value[1]=0;
					for(i=0; i<128; i++)
					{
						$("#advanced1_value").append('<option value="'+i+'">'+(i*2+20)+'</option>');
						$("#advanced2_value").append('<option value="'+i+'">'+(i*2+20)+'</option>');
					}
					for(i=0; i<5; i++)
					{
						$("#advanced3_value").append('<option value="'+i+'">'+i+'</option>');
					}
				}
				if(this.midi_value==2)
				{
					document.getElementById("advanced1_text").innerHTML = "max transpose";
					document.getElementById("advanced2_text").innerHTML = "min transpose";
					//this.midi_param_value[0]=127;
					//this.midi_param_value[1]=64;
					for(i=0; i<128; i++)
					{
						$("#advanced1_value").append('<option value="'+i+'">'+(i-64)+'</option>');
						$("#advanced2_value").append('<option value="'+i+'">'+(i-64)+'</option>');
					}
					for(i=0; i<5; i++)
					{
						$("#advanced3_value").append('<option value="'+i+'">'+i+'</option>');
					}
				}
				if(this.midi_value==3)
				{
					document.getElementById("advanced1_text").innerHTML = "max Seq number";
					document.getElementById("advanced2_text").innerHTML = "min Seq number";
					if (this.midi_param_value[0]>15 || this.midi_param_value[1]>15) 
					{
						this.midi_param_value[0]=15;
						this.midi_param_value[1]=0;
					}
					for(i=0; i<16; i++)
					{
						$("#advanced1_value").append('<option value="'+i+'">'+(i+1)+'</option>');
						$("#advanced2_value").append('<option value="'+i+'">'+(i+1)+'</option>');
					}
					for(i=0; i<5; i++)
					{
						$("#advanced3_value").append('<option value="'+i+'">'+i+'</option>');
					}
				}
				if(this.midi_value==6)
				{
					document.getElementById("advanced1_text").innerHTML = "max Release (%)";
					document.getElementById("advanced2_text").innerHTML = "min Release (%)";
					if (this.midi_param_value[0]>100 || this.midi_param_value[1]>100) 
					{
						this.midi_param_value[0]=100;
						this.midi_param_value[1]=0;
					}
					for(i=0; i<101; i++)
					{
						$("#advanced1_value").append('<option value="'+i+'">'+i+'</option>');
						$("#advanced2_value").append('<option value="'+i+'">'+i+'</option>');
					}
					for(i=0; i<5; i++)
					{
						$("#advanced3_value").append('<option value="'+i+'">'+i+'</option>');
					}
				}
				if(this.midi_value==7)
				{
					document.getElementById("advanced1_text").innerHTML = "max Vol (%)";
					document.getElementById("advanced2_text").innerHTML = "min Vol (%)";
					if (this.midi_param_value[0]>100 || this.midi_param_value[1]>100) 
					{
						this.midi_param_value[0]=100;
						this.midi_param_value[1]=0;
					}
					for(i=0; i<101; i++)
					{
						$("#advanced1_value").append('<option value="'+i+'">'+i+'</option>');
						$("#advanced2_value").append('<option value="'+i+'">'+i+'</option>');
					}
					for(i=0; i<5; i++)
					{
						$("#advanced3_value").append('<option value="'+i+'">'+i+'</option>');
					}
				}				
			}
			if(sequencer==1  && this.midi_param_value[3]==3)
			{
				if(this.midi_value==1)
				{
					document.getElementById("advanced1_text").innerHTML = "max BPM";
					document.getElementById("advanced2_text").innerHTML = "min BPM";
					//this.midi_param_value[0]=127;
					//this.midi_param_value[1]=0;
					for(i=0; i<128; i++)
					{
						$("#advanced1_value").append('<option value="'+i+'">'+(i*2+20)+'</option>');
						$("#advanced2_value").append('<option value="'+i+'">'+(i*2+20)+'</option>');
					}
					for(i=0; i<5; i++)
					{
						$("#advanced3_value").append('<option value="'+i+'">'+i+'</option>');
					}
				}
				if(this.midi_value==2)
				{
					document.getElementById("advanced1_text").innerHTML = "max transpose";
					document.getElementById("advanced2_text").innerHTML = "min transpose";
					//this.midi_param_value[0]=127;
					//this.midi_param_value[1]=0;
					for(i=0; i<128; i++)
					{
						$("#advanced1_value").append('<option value="'+i+'">'+(i-63)+'</option>');
						$("#advanced2_value").append('<option value="'+i+'">'+(i-63)+'</option>');
					}
					for(i=0; i<5; i++)
					{
						$("#advanced3_value").append('<option value="'+i+'">'+i+'</option>');
					}
				}
				if(this.midi_value==3)
				{
					document.getElementById("advanced1_text").innerHTML = "max Arp number";
					document.getElementById("advanced2_text").innerHTML = "min Arp number";
					if (this.midi_param_value[0]>15 || this.midi_param_value[1]>15) 
					{
						this.midi_param_value[0]=15;
						this.midi_param_value[1]=0;
					}
					for(i=0; i<16; i++)
					{
						$("#advanced1_value").append('<option value="'+i+'">'+i+'</option>');
						$("#advanced2_value").append('<option value="'+i+'">'+i+'</option>');
					}
					for(i=0; i<5; i++)
					{
						$("#advanced3_value").append('<option value="'+i+'">'+i+'</option>');
					}
				}
				if(this.midi_value==4)
				{
					document.getElementById("advanced1_text").innerHTML = "mode max";
					document.getElementById("advanced2_text").innerHTML = "mode min";
					if (this.midi_param_value[0]>3 || this.midi_param_value[1]>3) 
					{
						this.midi_param_value[0]=3;
						this.midi_param_value[1]=0;
					}
					
					$("#advanced1_value").append('<option value="0">Up</option>');
					$("#advanced1_value").append('<option value="1">Down</option>');
					$("#advanced1_value").append('<option value="2">Up/Down</option>');
					$("#advanced1_value").append('<option value="3">Random</option>');
					
					$("#advanced2_value").append('<option value="0">Up</option>');
					$("#advanced2_value").append('<option value="1">Down</option>');
					$("#advanced2_value").append('<option value="2">Up/Down</option>');
					$("#advanced2_value").append('<option value="3">Random</option>');
					
					for(i=0; i<5; i++)
					{
						$("#advanced3_value").append('<option value="'+i+'">'+i+'</option>');
					}
				}
				if(this.midi_value==5)
				{
					document.getElementById("advanced1_text").innerHTML = "max Distance";
					document.getElementById("advanced2_text").innerHTML = "min Distance";
					if (this.midi_param_value[0]>4 || this.midi_param_value[1]>4) 
					{
						this.midi_param_value[0]=4;
						this.midi_param_value[1]=0;
					}
					for(i=0; i<5; i++)
					{
						$("#advanced1_value").append('<option value="'+i+'">'+i+'</option>');
						$("#advanced2_value").append('<option value="'+i+'">'+i+'</option>');
					}
					for(i=0; i<5; i++)
					{
						$("#advanced3_value").append('<option value="'+i+'">'+i+'</option>');
					}
				}
				if(this.midi_value==6)
				{
					document.getElementById("advanced1_text").innerHTML = "max Release (%)";
					document.getElementById("advanced2_text").innerHTML = "min Release (%)";
					if (this.midi_param_value[0]>100 || this.midi_param_value[1]>100) 
					{
						this.midi_param_value[0]=100;
						this.midi_param_value[1]=0;
					}
					for(i=0; i<101; i++)
					{
						$("#advanced1_value").append('<option value="'+i+'">'+i+'</option>');
						$("#advanced2_value").append('<option value="'+i+'">'+i+'</option>');
					}
					for(i=0; i<5; i++)
					{
						$("#advanced3_value").append('<option value="'+i+'">'+i+'</option>');
					}
				}
				if(this.midi_value==7)
				{
					document.getElementById("advanced1_text").innerHTML = "max Vol (%)";
					document.getElementById("advanced2_text").innerHTML = "min Vol (%)";
					if (this.midi_param_value[0]>100 || this.midi_param_value[1]>100) 
					{
						this.midi_param_value[0]=100;
						this.midi_param_value[1]=0;
					}
					for(i=0; i<101; i++)
					{
						$("#advanced1_value").append('<option value="'+i+'">'+i+'</option>');
						$("#advanced2_value").append('<option value="'+i+'">'+i+'</option>');
					}
					for(i=0; i<5; i++)
					{
						$("#advanced3_value").append('<option value="'+i+'">'+i+'</option>');
					}
				}
			}
			/*for(i=0; i<128; i++)
			{
				$("#advanced1_value").append('<option value="'+i+'">'+i+'</option>');
				$("#advanced2_value").append('<option value="'+i+'">'+i+'</option>');
				$("#advanced3_value").append('<option value="'+i+'">'+i+'</option>');
			}*/
			//document.getElementById("advanced1_text").innerHTML = "max CC";
			//document.getElementById("advanced2_text").innerHTML = "min CC";
			document.getElementById("advanced3_text").innerHTML = "sensibility";
			document.getElementById("advanced4_text").innerHTML = "mode";
			//Slider
			if(this.type==1)
			{
				$("#advanced4_value").append('<option value="0">Normal</option>');
				$("#advanced4_value").append('<option value="1">Trigger</option>');
			}
			else
			{
				$("#advanced4_value").append('<option value="1">Logarithmic</option>');
				$("#advanced4_value").append('<option value="0">Normal</option>');
				$("#advanced4_value").append('<option value="4">Relative1</option>');
				$("#advanced4_value").append('<option value="5">Relative2</option>');
				$("#advanced4_value").append('<option value="6">Relative3</option>');
			}
			if(sequencer!=0) $("#advanced4_value").append('<option value="3">Sequencer</option>');
			
			
			console.log("show");
			
			
		}
		
		// Note
		if(this.type_par(mod,this._choice)==1)
		{
			
			if(this.midi_param_value[3]==0)
			{
				//this.midi_param_value[0]=127;
				//this.midi_param_value[1]=0;
				for(i=0; i<128; i++)
				{
					$("#advanced1_value").append('<option value="'+i+'">'+i+'</option>');
				}
				
				document.getElementById("advanced1_text").innerHTML = "NoteOn velocity";
				$("#advanced1_value").show();
				$("#advanced1_text").show();
			}
			if(this.midi_param_value[3]==1)
			{
				//this.midi_param_value[0]=127;
				//this.midi_param_value[1]=0;
				for(i=0; i<128; i++)
				{
					$("#advanced1_value").append('<option value="'+i+'">'+i+'</option>');
				}
				
				document.getElementById("advanced1_text").innerHTML = "CC value";
				$("#advanced1_value").show();
				$("#advanced1_text").show();
			}
			
			if(this.midi_param_value[3]==2 || this.midi_param_value[3]==3)
			{
				$("#advanced1_value").hide();
				$("#advanced1_text").hide();
			}
			
			
			document.getElementById("advanced4_text").innerHTML = "CC mode";
			$("#advanced4_value").append('<option value="0">Normal</option>');
			$("#advanced4_value").append('<option value="1">CC</option>');
			$("#advanced4_value").append('<option value="2">OFF</option>');
			$("#advanced4_value").append('<option value="3">Sequencer</option>');
			
			console.log("show");
			
			$("#advanced4_value").show();
			$("#advanced4_text").show();
			
			$("#advanced2_value").hide();
			$("#advanced3_value").hide();
			$("#advanced2_text").hide();
			$("#advanced3_text").hide();
		}
		console.log("max val : " + this.midi_param_value[0]);
		$("#advanced1_value").val(this.midi_param_value[0]);
		$("#advanced2_value").val(this.midi_param_value[1]);
		$("#advanced3_value").val(this.midi_param_value[2]);
		$("#advanced4_value").val(this.midi_param_value[3]);
	}
}