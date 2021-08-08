//********************************************************************************
//---------------------------------------
//---------------------------------------
//           MIDI receive
//---------------------------------------
//---------------------------------------

function change_led2(num)
{
  if(num==0) return 2;
  if(num==1) return 0;
  if(num==2) return 3;
  if(num==3) return 1;
}



function onMIDIMessage(event){
  var data = event.data,
    cmd = data[0] >> 4,
    channel = data[0] & 0xf,
    type = data[0], // ignore [inconsistent between devices]
    note = data[1],
    velocity = data[2];

  //console.log("receive MIDI");
  var type_text = 'inconnu';
  if(cmd==11) type_text = 'CC';
  if(cmd==9) type_text = 'Note On';
  if(type==8) type_text = 'Note Off';
  console.log(' channel ' + channel + '; type ' + type + '-' + type_text + '; note ' + note + '; velocity ' + velocity);
  document.getElementById('Set_text2').innerHTML = ' channel ' + channel + '; type ' + type_text + '; note ' + note + '; velocity ' + velocity;

  if(type==224 && note==1 && velocity==0)
  {
    document.getElementById('Set_text2').innerHTML = 'Modulox OK';
    document.getElementById('button').style.backgroundColor = '#1A1';
    document.getElementById('button').innerHTML = 'Connected';

    //alert("Le firmware de votre modulox est à la version 0.34. Veuillez telecharger la version 0.38")
    //document.location.href="https://forum.raspiaudio.com/t/modulox-installation-guide-french/14";
  }

  if(type==224 && note==3)
  {
    document.getElementById('Set_text2').innerHTML = 'Modulox OK';
    module_number = velocity;
    console.log('nombre de modules : ' + module_number);
    //state=2;
  }

  if(type==224 && note==5)
  {
    console.log('config sent with success');
    $.blockUI({ message: 'Configuration sent with success' });
    setTimeout(unlock,2000);
  }

  if(type==224 && note==64)
  {
    moduleList();
    drawModules();
    console.log('config received with success');
    $.blockUI({ message: 'Configuration successfully loaded' });
    setTimeout(unlock,2000);
    current_seq=0;
    drawSequence();
  }


  if(type==224 && note==8)
  {
    midiout=velocity;
    $('#midi_out').val(midiout);
  }

  if(type==224 && note==6)
  {
    sequencer=velocity;
    console.log('seq type : ' + sequencer);
    $('#sequence').val(sequencer);
    if(sequencer==0)
    {
      Seq_type=0;
      $('#tab_Sequence').hide();
      $('#tab_Arpegio').hide();
    }
    if(sequencer==1)
    {
      Seq_type=1;
      $('#tab_Sequence').hide();
      $('#tab_Arpegio').show();
    }
    if(sequencer==2)
    {
      Seq_type=2;
      $('#tab_Sequence').show();
      $('#tab_Arpegio').hide();
    }
  }

  if(type==224 && note==9)
  {
    console.log('firmware version ' + velocity);
    console.log('config_module ' + config_module);
    //document.getElementById("Version_text").innerHTML = "Firmware version : 0." + velocity;
    module[config_module].version = velocity;
    if(module[config_module].version!=38)
    {
      alert('Le firmware de votre modulox ' + config_module + ' est à la version 0.' + version[config_module] + '. Veuillez telecharger la version 0.38');
      document.location.href='https://forum.raspiaudio.com/t/modulox-installation-guide-french/14';
    }
  }

  if(type==224 && note==10)
  {
    var model_t = 'inconnu';
    if(velocity==1) {model_t = 'moduknob'; module[config_module].updatetype(0);}
    if(velocity==2) {model_t = 'moduslide'; module[config_module].updatetype(1);}
    if(velocity==3) {model_t = 'modutouch'; module[config_module].updatetype(2);}
    console.log('Model_text' + velocity);
    //document.getElementById("Model_text").innerHTML = "Model : " + model_t;

  }

  if(type==224 && note==11)
  {
    enco_group=velocity;
  }

  if(type==226)
  {
    console.log('controle receive : ' + note + ' - ' + velocity);
  }

  if(type==232 && note==1)
  {
    config_module=velocity;
    //console.log("-------------------------------");
    //console.log("config module number " + velocity);
    //console.log("-------------------------------");
    for(j=0; j<8; j++) testNote_num[j].length=0;
  }

  if(type==233 || type==234 || type==235 || type==236)
  {
    //console.log("type : " + type);
    var k;
    if(module[config_module]._type==0) k = change_led2(type-233);
    if(module[config_module]._type==2) k = change_led5(type-233+4*enco_group);
    if(module[config_module]._type==1) k = type-233;
    //console.log("k : " + k);
    //console.log("config_module : " + config_module);
    if(note==0)
    {
      console.log('-------- module ' + config_module + ' - enco : ' + k + '-----------------');
      module[config_module].updateluminosity(k,velocity);
    }
    if(note==1) module[config_module].updatemode(k,velocity);
    if(note==2) module[config_module].updatemode_number(k,velocity);
    if(note==3) module[config_module].updatechannel(k,velocity);

    if(note==4) module[config_module].updateparam(k,0,velocity);
    if(note==5) module[config_module].updateparam(k,1,velocity);
    if(note==6) module[config_module].updateparam(k,2,velocity);
    if(note==7) module[config_module].updateparam(k,3,velocity);
    if(note==8) module[config_module].updateparam(k,4,velocity);
    if(note==9) module[config_module].updatecolor(k,0,0,(velocity<<1));
    if(note==10) module[config_module].updatecolor(k,0,1,(velocity<<1));
    if(note==11) module[config_module].updatecolor(k,0,2,(velocity<<1));
    if(note==12) module[config_module].updatecolor(k,1,0,(velocity<<1));
    if(note==13) module[config_module].updatecolor(k,1,1,(velocity<<1));
    if(note==14) module[config_module].updatecolor(k,1,2,(velocity<<1));
    if(note==15) module[config_module].updatecolor(k,2,0,(velocity<<1));
    if(note==16) module[config_module].updatecolor(k,2,1,(velocity<<1));
    if(note==17) module[config_module].updatecolor(k,2,2,(velocity<<1));
    if(note==18) module[config_module].updatecolor(k,3,0,(velocity<<1));
    if(note==19) module[config_module].updatecolor(k,3,1,(velocity<<1));
    if(note==20) module[config_module].updatecolor(k,3,2,(velocity<<1));
    if(note==21) module[config_module].updatecolor(k,4,0,(velocity<<1));
    if(note==22) module[config_module].updatecolor(k,4,1,(velocity<<1));
    if(note==23) module[config_module].updatecolor(k,4,2,(velocity<<1));

    //convert_color()
    if(note==23) module[config_module].enco[k].convert_col();

    if(note==24) module[config_module].updateencopar(k,0,3,velocity);
    if(note==25) module[config_module].updateencopar(k,1,3,velocity);
    if(note==26) module[config_module].updateencopar(k,2,3,velocity);
    if(note==27) module[config_module].updateencopar(k,3,3,velocity);
    if(note==28) module[config_module].updateencopar(k,4,3,velocity);

    if(note==29) module[config_module].updateencopar(k,0,0,velocity);
    if(note==30) module[config_module].updateencopar(k,0,1,velocity);
    if(note==31) module[config_module].updateencopar(k,0,2,velocity);

    if(note==32) module[config_module].updateencopar(k,1,0,velocity);
    if(note==33) module[config_module].updateencopar(k,1,1,velocity);
    if(note==34) module[config_module].updateencopar(k,1,2,velocity);

    if(note==35) module[config_module].updateencopar(k,2,0,velocity);
    if(note==36) module[config_module].updateencopar(k,2,1,velocity);
    if(note==37) module[config_module].updateencopar(k,2,2,velocity);

    if(note==38) module[config_module].updateencopar(k,3,0,velocity);
    if(note==39) module[config_module].updateencopar(k,3,1,velocity);
    if(note==40) module[config_module].updateencopar(k,3,2,velocity);

    if(note==41) module[config_module].updateencopar(k,4,0,velocity);
    if(note==42) module[config_module].updateencopar(k,4,1,velocity);
    if(note==43) module[config_module].updateencopar(k,4,2,velocity);
  }

  if(type==225)
  {
    current_seq=note;
  }

  if(type==238)
  {
    if(note==0) {seq[current_seq].note[0]=velocity; $('#Seq1_note').val(velocity);}
    if(note==1) {seq[current_seq].note[1]=velocity; $('#Seq2_note').val(velocity);}
    if(note==2) {seq[current_seq].note[2]=velocity; $('#Seq3_note').val(velocity);}
    if(note==3) {seq[current_seq].note[3]=velocity; $('#Seq4_note').val(velocity);}

    if(note==4) {seq[current_seq].channel[0]=velocity; $('#Seq1_chan').val(velocity);}
    if(note==5) {seq[current_seq].channel[1]=velocity; $('#Seq2_chan').val(velocity);}
    if(note==6) {seq[current_seq].channel[2]=velocity; $('#Seq3_chan').val(velocity);}
    if(note==7) {seq[current_seq].channel[3]=velocity; $('#Seq4_chan').val(velocity);}

    if(note>8 && note<73 && Seq_type==2)
    {
      var n = note-9;
      if(n<16) {
        seq[current_seq].receive(0,n,velocity,(n>>2));
      }
      if(n<32 && n>=16) {
        n-=16;
        seq[current_seq].receive(1,n,velocity,(n>>2));
      }
      if(n<48 && n>=32) {
        n-=32;
        seq[current_seq].receive(2,n,velocity,(n>>2));
      }
      if(n<64 && n>=48) {
        n-=48;
        seq[current_seq].receive(3,n,velocity,(n>>2));
      }
    }
  }

  if(type==237)
  {

    if(note>8 && note<41 && Seq_type==1)
    {
      var n = note-9;
      console.log('arpege ' + (n%8) + ', velo : ' + velocity);
      if(velocity<60 && velocity>=0) push_note((n%8),velocity);
      if(n==0)
      {
        $('#sequence').val(1);
        sequencer=1;
        $('#tab_Sequence').hide();
        $('#tab_Arpegio').show();
      }
    }
    if(note==73)
    {
      seq[current_seq].num_meas=velocity;
      console.log('nb mesures ' + seq[current_seq].num_meas);
    }
    if(note==72)
    {
      console.log('config received');
      //$.blockUI({ message: "Module configuration received" });
      //setTimeout(unlock,2000);
    }
  }
}
