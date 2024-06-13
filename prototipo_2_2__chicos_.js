let tamañoCuadricula = 140; 
let maximoCuadrados = 20; 
let imagenes = []; 
let margen = 0.2; 
let mic, fft;
let lienzo;

function preload() {
  for (let i = 1; i < 12; i++) {
    imagenes.push(loadImage('data/imagen' + i + '.png'));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  lienzo = new Lienzo();
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  userStartAudio();
}

function draw() {
  let volume = mic.getLevel();
  let spectrum = fft.analyze();
  let bass = fft.getEnergy('bass');
  let treble = fft.getEnergy('treble');

  let scaledTreble = map(treble, 70, 0, 0, 1);
  scaledTreble = constrain(scaledTreble, 0, 1);

  lienzo.mostrar(scaledTreble);

  if (volume > 0.01) {
    lienzo.agregarCuadrado();
  }
}
