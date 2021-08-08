//---------------------------------------------
//----- Save preset ---------------------------
//---------------------------------------------

function onSavePreset(e){
  console.log('Save Preset');
  if (!module_placed) {
    document.getElementById('Set_text').innerHTML = 'Placer tous les modules avant de sauvegarder';
  } else {
    root = '<?xml version=\'1.0\' ?><doc><MIDI>';

    root+= '<number>'+module_number+'</number>';

    for(i = 0;i < module_number;i++){
      root+=module[i].xml();
    }
    root+='</MIDI></doc>';
    console.log(root);

    var filename = 'default2.xml';
    var blob = new Blob([root], {
      type : 'text/csv;charset=utf-8;'
    });
    var link = document.createElement('a');
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function exportToFileEntry(fileEntry) {
  console.log('exportfile');
  console.log(fileEntry.name);
  fileEntry.createWriter(function(fileWriter) {
    console.log('file writer');
    fileWriter.onwriteend = function(e) {
      console.log('Write completed.');
    };
    fileWriter.onerror = function(e) {
      console.log('Write failed: ' + e);
    };
    console.log('after error');
    var bb = new Blob(['',root],  {type: 'text/plain'});
    console.log('after blob');
    fileWriter.write(bb);
  });
}

//---------------------------------------------
//----- Load preset ---------------------------
//---------------------------------------------

function onLoadPreset(evt) {
  console.log('handleFileSelect');
  var files = evt.target.files; // FileList object

  // files is a FileList of File objects. List some properties.
  var output = [];
  //console.log(files[0]);
  var reader = new FileReader();
  reader.onload = function(e) {
    // e.target.result should contain the text
    console.log(e.target.result);
  };
  reader.readAsText(files[0]);
  openFileEntry2(files[0]);
}


function openFileEntry2(fileEntry) {

  console.log('openfile');
  console.log(fileEntry.name);
  reader.readAsText(fileEntry);
}

function onLoadPatch(evt){
  console.log('Load Patch');

  var files = evt.target.files; // FileList object

  // files is a FileList of File objects. List some properties.
  var output = [];
  console.log(files[0]);
  var reader = new FileReader();
  reader.onload = function(e) {
    // e.target.result should contain the text
    console.log(e.target.result);
  };
  reader.readAsText(files[0]);
  openFileEntry(files[0]);
}

function openFileEntry(fileEntry) {
  console.log('openfile');
  console.log(fileEntry.name);
  console.log('file');
  var reader = new FileReader();
  var tab = [0,0,0];
  var tab2 = [0,0,0];
  for(i = 0;i < module_number;i++){
    tab[module[i]._type]++;
  }
  console.log(tab);
  reader.onload = function(e) {
    console.log('onloadend');
    console.log(e.target.result);
    try {
      var xmlDoc = $.parseXML( e.target.result );
    } catch(e) {
      document.getElementById('Set_text').innerHTML = 'Le fichier n\'est pas un fichier XML valide.';
    }
    var $xml = $(xmlDoc);

    var $moduknob = $xml.find('moduknob');

    var j = 0;

    $moduknob.each(function(){
      var posx;
      var posy;
      posx = $(this).find('X').text(),
      posy = $(this).find('Y').text();

      module_shadow[j].modulox_pos_x = posx*80+55;
      module_shadow[j].modulox_pos_y = posy*80+55;
      console.log('posx : ' + posx);
      console.log('posy : ' + posy);
      var typ = $(this).find('Type').text();
      console.log(typ);
      module_shadow[j].updatetype(typ);
      console.log('type : ' + module_shadow[j]._type);
      tab2[$(this).find('Type').text()]++;

      console.log(j);
      var $encodeur = $(this).find('encoder');

      var i = 0;

      $encodeur.each(function(){
        console.log('encodeur : ' + i);
        var channel = $(this).find('channel').text();
        module_shadow[j].enco[i].channel_value=channel;
        var mode = $(this).find('mode_value').text();
        module_shadow[j].enco[i].mode_value=mode;
        var mode_number = $(this).find('mode_number_value').text();
        module_shadow[j].enco[i].mode_number_value=mode_number;
        module_shadow[j].enco[i].luminosity = $(this).find('luminosity').text();

        var k = 0;

        var $par = $(this).find('param');

        $par.each(function(){
          console.log('param : ' + k);
          module_shadow[j].enco[i].encopar[k]._module=$(this).find('module').text();
          module_shadow[j].enco[i].encopar[k]._place=$(this).find('place').text();
          module_shadow[j].enco[i].encopar[k]._choice=$(this).find('choice').text();
          module_shadow[j].enco[i].encopar[k].midi_value=$(this).find('midi_value').text();
          console.log('midi val : ' + module_shadow[j].enco[i].encopar[k].midi_value);
          module_shadow[j].enco[i].encopar[k].midi_color=$(this).find('midi_color').text();
          module_shadow[j].enco[i].encopar[k].midi_param_value[0]=$(this).find('midi_param0').text();
          module_shadow[j].enco[i].encopar[k].midi_param_value[1]=$(this).find('midi_param1').text();
          module_shadow[j].enco[i].encopar[k].midi_param_value[2]=$(this).find('midi_param2').text();
          module_shadow[j].enco[i].encopar[k].midi_param_value[3]=$(this).find('midi_param3').text();

          k++;
        });
        i++;
      });
      j++;
    });
    console.log(tab2);
    if(tab[0]==tab2[0] && tab[1]==tab2[1] && tab[2]==tab2[2])
    {
      console.log('cool!');
      moduleList();
      for(i = 0;i < j;i++){
        module_shadow[i].drawmodule_shadow();
      }
      shadow_loaded=1;
      document.getElementById('Set_text').innerHTML = 'Placer les composants noirs sur les composants rouges du patch';
    }
    if(module_number != j) {
      document.getElementById('Set_text').innerHTML = 'Il vous faut ' + j + ' modules pour charger ce patch. Vous en avez connect�s ' + module_number + '.';
    } else {
      document.getElementById('Set_text').innerHTML = 'Preset charg�. D�placez les composants sur la grille avec un drag-and-drop ou modifiez les param�tres dans l\'tab MIDI';
      //moduleList();
      module_placed = 1;
      drawModules();
    }
  };
  reader.readAsText(fileEntry);
}
