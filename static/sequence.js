class SeqLine {

  constructor() {

    this.sequence_note = [];
    for(var j = 0;j < 16;j++){
      this.sequence_note[j]=0;
    }
  }

  click_step()
  {
    for(var i = 0;i < 16;i++){
      if((_mouse.x >100+35*i) && (_mouse.x < 120+35*i)) this.sequence_note[i]= !this.sequence_note[i];
    }
  }

  draw_step(num)
  {
    for(var i = 0;i < 16;i++){
      if(this.sequence_note[i]==1) context3.drawImage(stepON_image, 100+35*i, 100+num*80);
      if(this.sequence_note[i]==0) context3.drawImage(stepOFF_image, 100+35*i, 100+num*80);
    }
  }

  send(k)
  {
    for(var l = 0;l < 4;l++){
      send_timer(4,9+k*4+l,8*this.sequence_note[l*4]+4*this.sequence_note[l*4+1]+2*this.sequence_note[l*4+2]+this.sequence_note[l*4+3]);
      //send_data(4,9+k*4+l,0);
    }
  }

  receive(num, vel)
  {
    this.sequence_note[(num%4)*4+3] = vel&0x01;
    this.sequence_note[(num%4)*4+2] = (vel&0x02)>>1;
    this.sequence_note[(num%4)*4+1] = (vel&0x04)>>2;
    this.sequence_note[(num%4)*4] = (vel&0x08)>>3;
  }
}

class Measure {

  constructor() {
    this.line = [];
    for(var k = 0;k < 4;k++){
      this.line[k]=new SeqLine();
    }
  }

  draw()
  {
    for(var k = 0;k < 4;k++){
      this.line[k].draw_step(k);
    }
  }

  click_seq()
  {
    for(var i = 0;i < 4;i++){
      if((_mouse.y >(100+80*i)) && (_mouse.y < (135+80*i))) this.line[i].click_step();
    }
  }

  send(linenum,mesure)
  {
    this.line[linenum].send(mesure);
  }

  receive(linenum,num,vel)
  {
    this.line[linenum].receive(num, vel);
  }
}



class Sequence {

  constructor() {
    this.meas = [];
    this.channel=[];
    this.note=[];
    for(var k = 0;k < 4;k++){
      this.meas[k]=new Measure();
      this.channel[k]=1;
      this.note[k]=1;
    }
    this.num_meas=1;
    this.current_meas=0;
  }

  draw()
  {
    console.log('current measure : ' + this.current_meas);
    console.log('detail : ' + this.meas[this.current_meas]);
    this.meas[this.current_meas].draw();
  }

  click_seq()
  {
    this.meas[this.current_meas].click_seq();
  }

  send(linenum)
  {
    send_timer(4,1,this.note[linenum]);
    send_timer(4,2,this.num_meas);
    send_timer(4,5,this.channel[linenum]);
    for(var mes = 0;mes < 4;mes++){
      this.meas[mes].send(linenum,mes);
    }

  }

  receive(linenum,num,vel,measure)
  {
    this.meas[measure].receive(linenum,num,vel);
  }
}

