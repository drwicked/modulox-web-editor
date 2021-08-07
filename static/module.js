class Module {
	
	 constructor(_module, _type) {
		
		this._module = _module;
		this._type = _type;
		this.module_image_num = _type;	
		this.modulox_pos_x = 0;
		this.modulox_pos_y = 0;

		this.modulox_list_x = 0;
		this.modulox_list_y = 0;
		
		this.version=0;
		
		if(_type==0) this.enconum = 4;
		if(_type==1) this.enconum = 2;
		if(_type==2) this.enconum = 8;
		
		this.enco = [];
		for(var k = 0;k < this.enconum;k++){
				this.enco[k]=new Encoder(_module,k,_type);
		}		
		console.log("module : " + this._module);
		console.log("place : " + this._type);
	}
	
	xml()
	{
		var xml_txt ="<moduknob>";
	   var posx = (this.modulox_pos_x - 55)/80 ;
	   var posy = (this.modulox_pos_y - 55)/80;
	   xml_txt+="<X>"+posx+"</X>";
	   xml_txt+="<Y>"+posy+"</Y>";
	   xml_txt+="<Type>"+this._type+"</Type>";
	   for(var j = 0;j < this.enconum;j++){
					   xml_txt+=this.enco[j].xml();
	   }
	   xml_txt+="</moduknob>";
		return xml_txt;
	}
	
	showpar(num)
	{
		console.log("showpar" + num);
		$("#mode").empty();
		if(this._type==0 || this._type==1)
		{
			$("#mode").append('<option value="1">Toggle</option>');
			$("#mode").append('<option value="2">Momentary</option>');
			$("#mode").append('<option value="3">Selector</option>');
			$("#mode").append('<option value="4">Select CC</option>');
		}
		if(this._type==2)
		{
			$("#mode").append('<option value="1">Toggle</option>');
			$("#mode").append('<option value="2">Momentary</option>');
			$("#mode").append('<option value="3">Selector</option>');
		}
		this.enco[num].showpar();
	}
	
	updatechannel(place,val)
	{
		this.enco[place].channel_value=val;
	}
	
	updatetype(ty)
	{
		this._type = ty;
		this.module_image_num = ty;		
		this.enco = [];
		if(ty==0) this.enconum = 4;
		if(ty==1) this.enconum = 2;
		if(ty==2) this.enconum = 8;
		for(var k = 0;k < this.enconum;k++){
				this.enco[k]=new Encoder(this._module,k,this._type);
		}
	}
	
	toggle()
	{
		for(var j = 0;j < this.enconum;j++){
			this.enco[j].toggle();
		}
	}
	
	input()
	{
		for(var j = 0;j < this.enconum;j++){
			this.enco[j].input();
		}
	}
	
	seq_preset()
	{
		this.enco[0].seq_preset_start();
		this.enco[1].seq_preset_volume();
		this.enco[2].seq_preset_seqnum();
		this.enco[3].seq_preset_release();
	}
	
	updatemode_number(place,val)
	{
		this.enco[place].mode_number_value=val;
		this.enco[place].init_mode();
	}
	updatemode(place,val)
	{
		this.enco[place].mode_value=val;
		this.enco[place].init_mode();
	}
	
	updateparam(place,num,val)
	{
		this.enco[place].encopar[num].midi_value=val;
	}
	
	updatecolor(place,num,co,val)
	{
		console.log("enco : " + place + ", midi num : " + num + ", col type : " + co + ", valeur : " + val);
		if(co==0) this.enco[place].encopar[num].midi_color_r=val;
		if(co==1) this.enco[place].encopar[num].midi_color_g=val;
		if(co==2) this.enco[place].encopar[num].midi_color_b=val;
	}
	
	updateencopar(place,num,numpa,val)
	{
		console.log("midi param " + numpa + " - midi num " + num);
		this.enco[place].encopar[num].midi_param_value[numpa]=val;
	}
	
	updateluminosity(place,val)
	{
		console.log("place : " + place);
		this.enco[place].luminosity=val;
	}
	init_parm(place,num,val)
	{
		this.enco[place].init_parm(num, val);
	}
	init_adv(place,num,val)
	{
		this.enco[place].init_adv(num, val);
	}
	init_parm3(place)
	{
		this.enco[place].init_parm3();
	}
	init_color(place, co, islight)
	{
		this.enco[place].init_color(co, islight);
	}
	
	click_enco(xmin, xmax, ymin, ymax, i) {
		console.log("posx : " + (this.modulox_pos_x));
		console.log("xmax : " + (xmax+this.modulox_pos_x));
		console.log("xmin : " + (xmin+this.modulox_pos_x));
		console.log("x : " + _mouse.x);
		console.log("y : " + _mouse.y);
		if(_mouse.x < (xmax+this.modulox_pos_x) && _mouse.x > (xmin+this.modulox_pos_x) && 
		_mouse.y < (ymax+this.modulox_pos_y) && _mouse.y > (ymin+this.modulox_pos_y))
		{
			return true;
		}
		else return false;
	}
	
	test_click()
	{
		//------------- Moduknob ----------------
		if(this.module_image_num==0)
		{
			if(this.click_enco(18, 42, 5, 27, i)) return 0;
			if(this.click_enco(58, 82, 5, 27, i)) return 1;
			if(this.click_enco(18, 42, 28, 60, i)) return 2;
			if(this.click_enco(58, 82, 28, 60, i)) return 3;
		}
		
		//------------- Moduslide ----------------
		if(this.module_image_num==1)
		{
			if(this.click_enco(18, 40, 5, 52, i)) return 0;
			if(this.click_enco(45, 80, 5, 52, i)) return 1;
		}
		
		//------------- Modutouch ----------------
		if(this.module_image_num==2)
		{
			console.log("touch ");
			if(this.click_enco(13, 29, 10, 27, i)) return 0;
			if(this.click_enco(33, 49, 10, 27, i)) return 1;
			if(this.click_enco(52, 68, 10, 27, i)) return 2;
			if(this.click_enco(69, 86, 10, 27, i)) return 3;
			if(this.click_enco(13, 29, 39, 54, i)) return 4;
			if(this.click_enco(33, 49, 39, 54, i)) return 5;
			if(this.click_enco(52, 68, 39, 54, i)) return 6;
			if(this.click_enco(69, 86, 39, 54, i)) return 7;
		}
		return -1;
	}
	
	drawmodule()
	{
		context.drawImage(module_image[this.module_image_num], this.modulox_pos_x, this.modulox_pos_y); 
		if(this.modulox_pos_x!=650) context2.drawImage(module_image[this.module_image_num], this.modulox_pos_x, this.modulox_pos_y); 
		context.fillText("V0." + this.version, this.modulox_pos_x+32, this.modulox_pos_y+68);
	}
	
	drawmodule_shadow()
	{
		if(this.modulox_pos_x!=0)
		{
			context.drawImage(module_image_shadow[this.module_image_num], this.modulox_pos_x, this.modulox_pos_y); 
			if(this.modulox_pos_x!=650) context2.drawImage(module_image_shadow[this.module_image_num], this.modulox_pos_x, this.modulox_pos_y); 
		}
	}
	
	draw_circle(place)
	{
		context2.beginPath();
		context2.fillStyle = 'rgba(225,0,0,0.5)';
		
		if(this.module_image_num==0)
		{
			if(place==0) this.circle(25,20,11);
			if(place==1) this.circle(63,20,11);
			if(place==2) this.circle(25,51,11);
			if(place==3) this.circle(63,51,11);
		}
		if(this.module_image_num==1)
		{
			if(place==0) this.circle(26,19,11);
			if(place==1) this.circle(60,35,11);
		}
		if(this.module_image_num==2)
		{
			if(place==0) this.circle(16,21,8);
			if(place==1) this.circle(35,21,8);
			if(place==2) this.circle(54,21,8);
			if(place==3) this.circle(72,21,8);
			if(place==4) this.circle(16,49,8);
			if(place==5) this.circle(35,49,8);
			if(place==6) this.circle(54,49,8);
			if(place==7) this.circle(72,49,8);
		}
		
		context2.fill();
		context2.lineWidth = 1;
		context2.strokeStyle = "red";
		context2.stroke();
	}
	
	circle(x,y,size)
	{
		context2.arc(x+this.modulox_pos_x, y+this.modulox_pos_y, size, 0, 2 * Math.PI, false);
	}
	
	init_parm2(place, num)
	{
		this.enco[place].init_parm2(num);
	}
}