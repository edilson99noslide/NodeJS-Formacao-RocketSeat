import { Readable } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;
    const buf = Buffer.from(String(i));

    setTimeout(() => {
      i > 5 ? this.push(null) : this.push(buf);
    }, 1000);
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: "half"
})
  .then(res => res.text()) // Consumir a resposta evita travamento
  .then(data => {
    console.log(data);
  })
  .catch(console.error);