class Encoder {
	
	 constructor(_module, _place, type) {
		
		this._module = _module;
		this._place = _place;
		this.channel_value=1;
		this.mode_value="1";
		this.mode_number_value = 2;
		this.active_param=0;
		this.luminosity = 0;
		this.encopar = [];
		for(var k = 0;k < 5;k++){
				this.encopar[k]=new EncoderParam(_module,_place,k,type);
		}		
		console.log("module : " + this._module);
		console.log("place : " + this._place);
	}
	
	xml()
	{
	   console.log("xml yo");
	   var xml_txt = "<encoder><channel>"+this.channel_value+"</channel><mode_value>"+this.mode_value+"</mode_value><mode_number_value>"+this.mode_number_value+"</mode_number_value><luminosity>"+this.luminosity+"</luminosity>";
	  
	   for(var k = 0;k < 5;k++){
		  xml_txt+=this.encopar[k].xml();
	   }
	   xml_txt+="</encoder>"
	   //console.log(xml_txt);
	   return xml_txt;
	}
	
	toggle()
	{
		console.log("module : " + this._module);
		console.log("place : " + this._place);
		
		this.channel_value=1;
		this.mode_value=1;
		this.luminosity = 0;
		for(var k = 0;k < 5;k++){
				this.encopar[k].toggleParm();
		}		
	}
	
	input()
	{
		console.log("module : " + this._module);
		console.log("place : " + this._place);
		
		this.channel_value=1;
		this.mode_value=4;
		this.mode_number_value = 1;
		this.luminosity = 2;
		for(var k = 0;k < 1;k++){
				this.encopar[k].toggleParm();
		}		
	}
	
	seq_preset_start()
	{
		console.log("module : " + this._module);
		console.log("place : " + this._place);
		
		this.channel_value=1;
		this.mode_value=1;
		this.luminosity = 0;
		for(var k = 0;k < 5;k++){
				this.encopar[k].seq_preset_start();
		}		
	}
	
	seq_preset_release()
	{
		console.log("module : " + this._module);
		console.log("place : " + this._place);
		
		this.channel_value=1;
		this.mode_value=4;
		this.mode_number_value=2;
		this.luminosity = 0;
		for(var k = 0;k < 2;k++){
				this.encopar[k].seq_preset_release();
		}		
	}
	
	seq_preset_volume()
	{
		console.log("module : " + this._module);
		console.log("place : " + this._place);
		
		this.channel_value=1;
		this.mode_value=4;
		this.mode_number_value=1;
		this.luminosity = 0;
		this.encopar[0].seq_preset_volume();	
	}
	
	seq_preset_seqnum()
	{
		console.log("module : " + this._module);
		console.log("place : " + this._place);
		
		this.channel_value=1;
		this.mode_value=4;
		this.mode_number_value=1;
		this.luminosity = 0;
		this.encopar[0].seq_preset_seqnum();	
	}
	
	init_parm(num, val)
	{	
		console.log("init_parm - num : " + num + " ; val : " + val);
		console.log("mode value : " + this.mode_value);
		this.active_param=num;
		this.encopar[num].midi_value=val;
		this.encopar[num].init_param(this.mode_value);
	}
	
	init_parm2(num)
	{	
		console.log("init_parm2 - num : " + num);
		console.log("mode value : " + this.mode_value);
	    this.active_param=num;
		this.encopar[num].init_param(this.mode_value);
	}
	
	init_parm3()
	{	
		console.log("init_parm3");
		console.log("mode value : " + this.mode_value);
		this.encopar[this.active_param].init_param(this.mode_value);
	}
	
	load_parm(num, val)
	{	
		this.encopar[num].midi_value=val;
	}
	
	init_adv(num, val)
	{
		console.log("init_adv - num : "+ num + "val : " + val );
		this.encopar[this.active_param].midi_param_value[num]=val;
		if(num==3)
		{
			/*if(val==0) this.encopar[this.active_param].midi_value=1;
			if(val==1) this.encopar[this.active_param].midi_value=1;
			if(val==2) this.encopar[this.active_param].midi_value=256;
			if(val==3) this.encopar[this.active_param].midi_value=1;
			if(val==4) this.encopar[this.active_param].midi_value=1;*/
			if(val==0 || val==1 || val==4)
			{
				if(this.encopar[this.active_param].midi_value>127) this.encopar[this.active_param].midi_value=1;
			}
			if(val==3)
			{
				if(this.encopar[this.active_param].midi_value>7) this.encopar[this.active_param].midi_value=1;
			}
			if(val==2)
			{
				if(this.encopar[this.active_param].midi_value>2) this.encopar[this.active_param].midi_value=1;
			}
		}
		
	}
	
	init_color(col, light)
	{
		console.log("init_color");
		this.encopar[this.active_param].midi_color=col;
		var l = "#000000";
		if(!light) l="#FFFFFF";
		console.log("text : " + l);
		console.log("color : " + col);
		if(this.active_param==0) document.getElementById("midi1_value").style.cssText = "background:"+col+";color:"+l;
		if(this.active_param==1) document.getElementById("midi2_value").style.cssText = "background:"+col+";color:"+l;
		if(this.active_param==2) document.getElementById("midi3_value").style.cssText = "background:"+col+";color:"+l;
		if(this.active_param==3) document.getElementById("midi4_value").style.cssText = "background:"+col+";color:"+l;
		if(this.active_param==4) document.getElementById("midi5_value").style.cssText = "background:"+col+";color:"+l;
		
		/*if(this.active_param==0) document.getElementById("midi1_value").style.cssText = "color:"+l;
		if(this.active_param==1) document.getElementById("midi2_value").style.cssText = "color:"+l;
		if(this.active_param==2) document.getElementById("midi3_value").style.cssText = "color:"+l;
		if(this.active_param==3) document.getElementById("midi4_value").style.cssText = "color:"+l;
		if(this.active_param==4) document.getElementById("midi5_value").style.cssText = "color:"+l;*/
	}
	
	init_mode()
	{
		for(var k = 0;k < 5;k++){
			this.encopar[k].init_mode();
		}
	}
	
	init_list(num, val)
	{	
	    console.log("init_list : " + val);
		this.enco[num].init_list(val);
	}
	
	convert_col()
	{
		for(var k = 0;k < 5;k++){
				this.encopar[k].convert_color();
		}
		
	}
	
	showpar()
	{
		for(var k = 0;k < 5;k++){
				this.encopar[k].init_val();
		}
		$("#channel" ).val(this.channel_value);
		$("#mode").val(this.mode_value);
		$("#mode_number" ).val(this.mode_number_value);
		$("#luminosity").val(this.luminosity);
		/*document.getElementById("midi1_color").value = this.encopar[0].midi_color;
		document.getElementById("midi2_color").value = this.encopar[1].midi_color;
		document.getElementById("midi3_color").value = this.encopar[2].midi_color;
		document.getElementById("midi4_color").value = this.encopar[3].midi_color;
		document.getElementById("midi5_color").value = this.encopar[4].midi_color;*/
		
		var l=[];
		for(var k = 0;k < 5;k++){
			l[k] = "#000000";
			var sub = this.encopar[k].midi_color.substr(4, 2);
			console.log("sub : " + parseInt("0x"+sub));
			if(parseInt("0x"+sub) <= 0x80) l[k]="#FFFFFF";
			console.log("k : " + k + " l[k] : " + l[k] + " color : " + this.encopar[k].midi_color + " s: " + sub);
		}
		
		document.getElementById("midi1_value").style.cssText = "background:"+this.encopar[0].midi_color+";color:"+l[0];
		document.getElementById("midi2_value").style.cssText = "background:"+this.encopar[1].midi_color+";color:"+l[1];
		document.getElementById("midi3_value").style.cssText = "background:"+this.encopar[2].midi_color+";color:"+l[2];
		document.getElementById("midi4_value").style.cssText = "background:"+this.encopar[3].midi_color+";color:"+l[3];
		document.getElementById("midi5_value").style.cssText = "background:"+this.encopar[4].midi_color+";color:"+l[4];
		
		//************* Group *****************
		if($("#mode" ).val()=="5") 
		{
			delete_param();

			this.encopar[0].init_list(2);
			this.encopar[1].init_list(0);
			this.encopar[2].init_list(1);
		}
		//************* Select CC *****************
		if($("#mode" ).val()=="4") 
		{
			$('#mode_number').show();
			this.encopar[2].init_list(4);
			this.encopar[3].init_list(4);
			this.encopar[4].init_list(4);
			delete_param();
			
			$('#mode_number').show();

			if($('#mode_number').val()=="1")
			{
				this.encopar[0].init_list(4);
			}
			if($('#mode_number').val()=="2")
			{
				this.encopar[0].init_list(4);
				this.encopar[1].init_list(4);
			}
			if($('#mode_number').val()=="3")
			{
				this.encopar[0].init_list(4);
				this.encopar[1].init_list(4);
				this.encopar[2].init_list(4);	
			}
			if($('#mode_number').val()=="4")
			{
				this.encopar[0].init_list(4);
				this.encopar[1].init_list(4);
				this.encopar[2].init_list(4);		
				this.encopar[3].init_list(4);				
			}
		}
		
		//************** Selector ***************
		if($("#mode" ).val()=="3") 
		{
			$('#mode_number').show();
			this.encopar[0].init_list(0);
			this.encopar[1].init_list(0);
			this.encopar[2].init_list(0);
			this.encopar[3].init_list(0);
			this.encopar[4].init_list(2);
			
			delete_param();
			
			$('#mode_number').show();
			if($('#mode_number').val()=="1")
			{
				this.encopar[0].init_list(0);
				this.encopar[4].init_list(2);
			}
			if($('#mode_number').val()=="2")
			{
				this.encopar[0].init_list(0);
				this.encopar[1].init_list(0);
				this.encopar[4].init_list(2);
			}
			if($('#mode_number').val()=="3")
			{
				this.encopar[0].init_list(0);
				this.encopar[1].init_list(0);
				this.encopar[2].init_list(0);
				this.encopar[4].init_list(2);
									 
									 
			}
			if($('#mode_number').val()=="4")
			{
				this.encopar[0].init_list(0);
				this.encopar[1].init_list(0);
				this.encopar[2].init_list(0);
				this.encopar[3].init_list(0);
				this.encopar[4].init_list(2);
									 
			}	
		}
		
		//*************** Momentary *************** 
		if($("#mode" ).val()=="2") 
		{
			delete_param();
			
			this.encopar[0].init_list(2);
			this.encopar[1].init_list(0);
			this.encopar[2].init_list(1);
		}
		
		//************** Toggle ***************
		if($("#mode" ).val()=="1") 
		{
			delete_param();	
			
			document.getElementById("midi1_value").style.cssText = "background:#000000";
			this.encopar[0].midi_color="#000000";

			this.encopar[0].init_list(2);
			this.encopar[1].init_list(0);
			this.encopar[2].init_list(3);
		}
	}
	
	send_midi()
	{
		send_timer(0,0,this.luminosity);
		send_timer(0,1,this.mode_value);
		send_timer(0,2,this.mode_number_value);
		send_timer(0,3,this.channel_value);
		for(i = 0;i < 5;i++){
			this.encopar[i].send_midi();
		}
	}
}