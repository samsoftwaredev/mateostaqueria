import type { ImageSourcePropType } from 'react-native';

import aguasFrescas from '../assets/aguas-frescas.jpg';
import bowl from '../assets/bowl.jpg';
import burrito from '../assets/burrito.jpg';
import chickenAlfredo from '../assets/chicken-alfredo.jpg';
import chickenMole from '../assets/chicken-mole.jpg';
import chimichanga from '../assets/chimichanga.jpg';
import crispyTacos from '../assets/crispy-tacos.jpg';
import enchiladas from '../assets/enchiladas.jpg';
import flan from '../assets/flan.jpg';
import flautas from '../assets/flautas.jpg';
import guacamole from '../assets/guacamole.jpg';
import heroTacos from '../assets/hero-tacos.jpg';
import huevosChorizo from '../assets/huevos-chorizo.jpg';
import huevosRancheros from '../assets/huevos-rancheros.jpg';
import jalapenos from '../assets/jalapenos.jpg';
import mateosWordmark from '../assets/mateos-wordmark.png';
import nachos from '../assets/nachos.jpg';
import polloPoblano from '../assets/pollo-poblano.jpg';
import quesadilla from '../assets/quesadilla.jpg';
import queso from '../assets/queso.jpg';
import sopapillas from '../assets/sopapillas.jpg';
import sopes from '../assets/sopes.jpg';
import streetTacos from '../assets/street-tacos.jpg';
import tacoBar from '../assets/taco-bar.jpg';
import tacoStation from '../assets/taco-station.jpg';
import torta from '../assets/torta.jpg';

const photos: Record<string, ImageSourcePropType> = {
  'aguas-frescas.jpg': aguasFrescas,
  'bowl.jpg': bowl,
  'burrito.jpg': burrito,
  'chicken-alfredo.jpg': chickenAlfredo,
  'chicken-mole.jpg': chickenMole,
  'chimichanga.jpg': chimichanga,
  'crispy-tacos.jpg': crispyTacos,
  'enchiladas.jpg': enchiladas,
  'flan.jpg': flan,
  'flautas.jpg': flautas,
  'guacamole.jpg': guacamole,
  'hero-tacos.jpg': heroTacos,
  'huevos-chorizo.jpg': huevosChorizo,
  'huevos-rancheros.jpg': huevosRancheros,
  'jalapenos.jpg': jalapenos,
  'nachos.jpg': nachos,
  'pollo-poblano.jpg': polloPoblano,
  'quesadilla.jpg': quesadilla,
  'queso.jpg': queso,
  'sopapillas.jpg': sopapillas,
  'sopes.jpg': sopes,
  'street-tacos.jpg': streetTacos,
  'taco-bar.jpg': tacoBar,
  'taco-station.jpg': tacoStation,
  'torta.jpg': torta,
};

export const getPhoto = (name: string): ImageSourcePropType => {
  const photo = photos[name];

  if (!photo) {
    throw new Error(`Missing native photo asset: ${name}`);
  }

  return photo;
};

export { mateosWordmark };
