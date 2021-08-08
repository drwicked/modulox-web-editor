//********************************************************************************
//---------------------------------------
//---------------------------------------
//           MIDI send
//---------------------------------------
//---------------------------------------

function send_data(numenco, nummess, output_message, tempo_val)
{
  console.log('' + [233+numenco,nummess,output_message] + ' - time : ' + tempo_val);
  if(output_message<128) outputs[port_selected].send([233+numenco,nummess,output_message]);
}

function send_timer(numenco, nummess, output_message)
{
  setTimeout(send_data,tempo_send,numenco,nummess,output_message,tempo_send);
  tempo_send+=3;
}

function send_end()
{
  outputs[port_selected].send([224,64,0]);
  console.log([224,64,0]);
}

function change_led(num)
{
  if(num==0) return 2;
  if(num==1) return 0;
  if(num==2) return 3;
  if(num==3) return 1;
}

function change_led5(num)
{
  if(num==0) return 4;
  if(num==1) return 5;
  if(num==2) return 6;
  if(num==3) return 7;
  if(num==4) return 3;
  if(num==5) return 2;
  if(num==6) return 1;
  if(num==7) return 0;
}

function send_sequence2(num,j)
{
  seq[j].send(num);
  send_timer(-7,num,j);
}

function send_midi_enco(num,j)
{

  $.blockUI({ message: 'send module '+j+' encoder '+num });
  if(module[j]._type==0) i=change_led(num);
  if(module[j]._type==2) i=change_led5(num);
  if(module[j]._type==1) i=num;

  module[j].enco[i].send_midi();

  //On n'envoie la séquence que pour le premier module
  if(j==0)
  {
    console.log('seq : ' + sequencer);
    if(sequencer==1)
    {
      send_timer(4,2,0);
      for(k = 0;k < 8;k++){ send_timer(3,k,parseInt(convert_note(k,num)));}
    }
  }
  setTimeout(writeStart,tempo_send,num, j,tempo_send);
  tempo_send+=300;

  //writeStart(num, j);
}

function onWrite(e){

  StopBlink();

  //outputs[port_selected].send([0xE0,5,sequencer]);
  send_timer(-9,5,sequencer);

  $.blockUI({ message: 'Sending data to module...' });

  for(j = 0; j < module_number; j++)
  {
    console.log('======== MODULE ' + j);
    // MODUKNOB
    if(module[j]._type==0)
    {
      for(n = 0;n < 4;n++){
        send_midi_enco(n,j);
      }
    }


    // MODUSLIDE
    if(module[j]._type==1)
    {
      for(n = 0;n < 2;n++){
        send_midi_enco(n,j);
      }
    }

    // MODUTOUCH
    if(module[j]._type==2)
    {
      for(n = 0;n < 8;n++){
        send_midi_enco(n,j);
      }
    }

    if(j==0)
    {
      if(sequencer==2)
      {
        for(j = 0; j < 8; j++)
        {
          for(k = 0; k < 4; k++)
          {
            send_sequence2(k,(7-j));
            tempo_send+=3;
          }
        }
      }
    }

    setTimeout(writeStart,tempo_send,16, j,tempo_send);
    tempo_send+=500;
  }

  tempo_send+=500;
  setTimeout(send_end,tempo_send);
  tempo_send=300;
}