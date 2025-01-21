"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const AlbumNuevo = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [popupContent, setPopupContent] = useState<{ 
    image: string; // Cambiado a string, ya que no debería ser null
    title: string; 
    description: string; 
    longDescription: string; 
  } | null>(null); // Estado para el contenido del pop-up

  interface Product {
    id: number;
    src: string;
    title: string;
    description: string;
    longDescription: string;
    imageStyle?: React.CSSProperties;
    imageClassName?: string;
  }

  const productCategories: Record<string, Product[]> = {
    SCALP: [
      { 
        id: 1, 
        src: "/imagenes/shampoo_depura.jpg", 
        title: "Shampoo Depura", 
        description: "Shampoos para una limpieza especializada",
        longDescription: "Permite una correcta oxigenación, eliminando el mal olor e impurezas del cuero cabelludo como toxinas, células muertas, bacterias, grasas, etc. Favorece el crecimiento saludable.",
        imageClassName: "w-full h-64 object-cover object-center"
      },
      { 
        id: 2, 
        src: "/imagenes/capissen_lotion.jpg", 
        title: "Capissen Lotion", 
        description: "Shampoos para una limpieza especializada",
        longDescription: "Loción capilar de uso diario. Ayuda a retrasar la caída prematura del cabello. SIN ENJUAGUE. Sus ingredientes contribuyen a optimizar los ciclos de crecimiento capilar, mejorar la densidad, engrosar y fortalecer el cabello, así como a hidratar y aumentar la velocidad de crecimiento y calidad del cabello."
      },
      { 
        id: 3, 
        src: "/imagenes/shampoo_mentol_ice.jpg", 
        title: "Shampoo Mentol Ice", 
        description: "Shampoos para una limpieza especializada",
        longDescription: "Shampoo formulado para relajar los vasos sanguíneos del cuello cabelludo, estimular el crecimiento capilar y lograr un cabello mucho más suave, notablemente más grueso y fuerte. Da volumen, previene la caspa y la pérdida de cabello, ya que penetra profundamente en los folículos capilares, activando la circulación."
      },
      { 
        id: 4, 
        src: "/imagenes/melanin_anti_g.jpg", 
        title: "Melanin Anti G", 
        description: "Shampoos para una limpieza especializada",
        longDescription: "Loción capilar de uso diario. Contribuye a reducir el proceso de pérdida de Melanina y activar su generación en el folículo capilar, que se hará visible con el crecimiento del nuevo cabello. La tecnología de Péptidos de MELANIN ANTI G contribuye a proteger el folículo del cabello contra el debilitamiento, así como a energizar, nutrir y engrosar la cutícula capilar."
      },
      { 
        id: 5, 
        src: "/imagenes/capissen_shampoo.jpg", 
        title: "Capissen Shampoo", 
        description: "Shampoos para una limpieza especializada",
        longDescription: "Shampoo de uso diario, auxiliar en la prevención de la caída del cabello. Sus ingredientes contribuyen a optimizar los ciclos de crecimiento capilar, mejorar la densidad, engrosar y fortalecer el cabello, así como a hidratar y aumentar la velocidad de crecimiento y calidad del cabello."
      },
      { 
        id: 6, 
        src: "/imagenes/dherma_roller.jpg", 
        title: "Dherma Roller", 
        description: "Shampoos para una limpieza especializada",
        longDescription: "Auxiliar para tratar el adelgazamiento capilar, contribuyendo a la disminución de la caída del cabello."
      }
    ],
    MOISTURE: [
      { 
        id: 7, 
        src: "/imagenes/humit_mask.jpg", 
        title: "Humiy mask", 
        description: "Línea de hidratación y acondicionamiento",
        longDescription: "El efecto inmediato reparador de sus aminoácidos, polisacáridos, proteínas y vitaminas le aportan gran humectación, suavidad y prolongado acondicionamiento al cabello, aumentando su manejabilidad y brillo. Hidrata, nutre, desenreda, acondiciona y repara la fibra capilar. Diseñado para ofrecer una prolongada y eficaz restauración capilar, gran humectación y proporcionar un intenso acondicionamiento que mejora la manejabilidad del cabello."
      },
      { 
        id: 8, 
        src: "/imagenes/dy_fazza_color.jpg", 
        title: "DY fazza co", 
        description: "Línea de hidratación y acondicionamiento",
        longDescription: "Hidrata, nutre, desenreda, acondiciona y repara el cabello reseco y maltratado. Crea un efecto protector contra los daños provocados por el medio ambiente, radiación solar, herramientas de calor (secador) y procesos químicos, controlando el frizz y aportando suavidad, manejabilidad y brillo intenso."
      },
      { 
        id: 9, 
        src: "/imagenes/shampoo_humit.jpg", 
        title: "Shampoo Humit", 
        description: "Línea de hidratación y acondicionamiento",
        longDescription: "Hidrata, nutre, desenreda, acondiciona y repara el cabello reseco y maltratado. Crea un efecto protector contra los daños provocados por el medio ambiente, radiación solar, herramientas de calor (secador) y procesos químicos, controlando el frizz y aportando suavidad, manejabilidad y brillo intenso."
      }
    ],
    COLOR_RESCUE: [
      { 
        id: 10, 
        src: "/imagenes/shampoo_dyfensor.jpg", 
        title: "Shampoo Dyfensor", 
        description: "Productos especializados en cuidado de color",
        longDescription: "Mantiene los aceites naturales que produce el cuero cabelludo, reduciendo el efecto de cabello rebelde y encrespado, volviéndolo más fuerte y saludable. Sus ingredientes recubren las zonas dañadas, protegiendo la vida media de las células capilares y potencializando el color que se encuentra en las cabelleras teñidas."
      },
      { 
        id: 11, 
        src: "/imagenes/shampoo_total_violet.jpg", 
        title: "Shampoo Total Violet", 
        description: "Productos especializados en cuidado de color",
        longDescription: "Ayuda a lograr tonos platinados sin resecar la hebra capilar. Gracias al efecto reparador de sus ingredientes activos, el cabello adquiere una profunda suavidad y prolongado acondicionamiento, aumentando su manejabilidad y brillo."
      },
      { 
        id: 12, 
        src: "/imagenes/shampoo_plattina.jpg", 
        title: "Shampoo Plattina", 
        description: "Productos especializados en cuidado de color",
        longDescription: "Neutraliza el tono amarillento del cabello que lo hace lucir seco y sin brillo, ayudando a que las canas estén suaves, hidratadas y logren tener un color platino. También para cabello negro, rubio o decolorado para tonalidades platinadas."
      },
      { 
        id: 13, 
        src: "/imagenes/total_violet_mask.jpg", 
        title: "Total Violet Mask", 
        description: "Productos especializados en cuidado de color",
        longDescription: "Hidrata, nutre, desenreda, acondiciona y repara la fibra capilar. El efecto inmediato reparador de sus ingredientes activos le aporta gran humectación, suavidad y prolongado acondicionamiento al cabello, aumentando su manejabilidad y br illo. Suero protector del color formulado con una mezcla especial de aminoácidos. Recubre las zonas dañadas del cabello brindando una profunda restauración capilar. Protege el color del cabello teñido prolongando su duración para mantener un color radiante y duradero."
      },
      { 
        id: 14, 
        src: "/imagenes/revenant_color.jpg", 
        title: "Revenant Color", 
        description: "Productos especializados en cuidado de color",
        longDescription: "Realza el color ya existente e intensifica reflejos. Neurone cuenta con 7 tonalidades: Cocoa, Mogano, Platino, Black, Cobre, Cherry y Champagne. Todos los tonos son intermezclables para poder personalizar y crear nuevas tonalidades. Es una herramienta fundamental para el colorista, ya que con REVENANT COLOR se pueden corregir matices y lograr la tonalidad e intensidad deseada."
      }
    ],
    RESTORE: [
      { 
        id: 15, 
        src: "/imagenes/shampoo_kerasin_hb.jpg", 
        title: "Shampoo Kerasin HB", 
        description: "Línea de reparación intensiva",
        longDescription: "Repara el cabello dañado por procesos químicos, factores ambientales y el uso de herramientas de estilizado (planchas, secadoras). Brinda una reparación a profundidad, otorgando sensación de bienestar y placer, así como un cabello fuerte, sano, manejable, brillante y sedoso."
      },
      { 
        id: 16, 
        src: "/imagenes/kerasin_hb_leave_in.jpg", 
        title: "Kerasin HB Leave-In", 
        description: "Línea de reparación intensiva",
        longDescription: "Permite brindarle fuerza, mejorar la textura y restaurar la elasticidad del cabello dañado y sobre procesado. Su textura ligera, sin sensación grasosa, permite una fácil absorción, dejando el cabello más dócil y fácil de peinar, controlando el frizz y aumentando la suavidad."
      },
      { 
        id: 17, 
        src: "/imagenes/kerasin_hb_mask.jpg", 
        title: "Kerasin HB Mask", 
        description: "Línea de reparación intensiva",
        longDescription: "Gracias a sus poderosos ingredientes a base de Ácido Hialurónico, Keratina, Biotina y proteínas ayuda a fortalecer el cabello dañado por procesos químicos y herramientas de calor, reparándolo y nutriéndolo profundamente para reconstruir la fuerza, mejorar la textura y restaurar su elasticidad."
      },
      { 
        id: 18, 
        src: "/imagenes/velvety_control.jpg", 
        title: "Velvety Control", 
        description: "Línea de reparación intensiva",
        longDescription: "Su textura aterciopelada, sin sensación grasosa, aporta gran manejabilidad, suavidad, brillo y fácil desenredo al cabello."
      }
    ],
    STYLING: [
      { 
        id: 19, 
        src: "/imagenes/neurona_gloss.jpg", 
        title: "Neurona Gloss", 
        description: "Revolución en estilizado",
        longDescription: "Proporciona brillo y suavidad al cabello, protegiéndolo de daños térmicos."
      },
      { 
        id: 20, 
        src: "/imagenes/thermo_dual.jpg", 
        title: "Thermo-Dual", 
        description: "Revolución en estilizado",
        longDescription: "Protege y repara los daños causados a la cutícula, acondicionando el cabello por dentro y por fuera sin dejarlo pesado ni grasoso. Brinda máxima suavidad e impresionante brillo."
      },
      { 
        id: 21, 
        src: "/imagenes/lisothermic.jpg", 
        title: "Lisothermic", 
        description: "Revolución en estilizado",
        longDescription: "Evita los daños causados por el uso constante de la secadora y mejora la condición de la cutícula después de un alaciado con plancha de calor, manteniendo el cabello suave y lacio por más tiempo. Se puede usar como una crema para peinar."
      },
      { 
        id: 22, 
        src: "/imagenes/geometry_gel.jpg", 
        title: "Geometry Gel", 
        description: "Revolución en estilizado",
        longDescription: "Ideal para moldear y manejar rizos con efecto elástico y controlar el frizz, otorgando un cabello con mayor brillo y textura. Su complejo de aminoácidos permite mantener un cabello saludable y resistente."
      },
      { 
        id: 23, 
        src: "/imagenes/geometry_cream.jpg", 
        title: " Geometry Cream", 
        description: "Revolución en estilizado",
        longDescription: "Crema moldeadora de rizos que brinda una combinación de estilizado y acondicionamiento. Ideal para marcar rizos con efecto elástico y controlar el frizz otorgando brillo y textura al cabello. Enriquecida con aminoácidos para mantener el cabello saludable y resistente."
      },
      { 
        id: 24, 
        src: "/imagenes/molding_toner.jpg", 
        title: "Molding Toner", 
        description: "Revolución en estilizado",
        longDescription: "Da volumen, cuerpo y brillo al cabello. El cabello cano logra un tono luminoso platinado. Su complejo de aminoácidos permite mantener el cabello saludable y resistente. Sus ingredientes neurocosméticos brindan sensación de bienestar y placer."
      },
      { 
        id: 25, 
        src: "/imagenes/resplandor_shine.jpg", 
        title: "Resplandor Shine", 
        description: "Revolución en estilizado",
        longDescription: "Spray de brillo y acondicionamiento que contribuye a dar al cabello un aspecto vibrante, luminoso, hidratado y saludable, incluso en cabello dañado y sobre procesado. Su fórmula no grasosa y ligera acondiciona dando sedosidad y suavidad al cabello."
      },
      { 
        id: 26, 
        src: "/imagenes/lycra_web.jpg", 
        title: "Lycra Web", 
        description: "Revolución en estilizado",
        longDescription: "Pasta con efecto telaraña para el cabello. Su fórmula permite estilizar y dar gran definición al peinado con fijación ligera. LYCRA WEB es una pasta que le da textura al cabello debido a las redes de consistencia elástica y cremosa que crea, aportando volumen y fijación para lograr un estilo extraordinario en el cabello."
      },
      { 
        id: 27, 
        src: "/imagenes/firmer_gel.jpg", 
        title: "Firmer Gel", 
        description: "Revolución en estilizado",
        longDescription: "Fijador en gel reactivable para estilizados duraderos bajo condiciones de alta humedad. Funciona como una barrera que repele la humedad protegiendo el cabello de los rayos UV y el viento, conservando el peinado en perfecto estado por más tiempo."
      },
      { 
        id: 28, 
        src: "/imagenes/firmer_mist.jpg", 
        title: "Firmer Mist", 
        description: "Revolución en estilizado",
        longDescription: "Funciona como una barrera que repele la humedad, protegiendo el cabello de los rayos UV y el viento, conservando el peinado en perfecto estado por más tiempo. Cuenta con un sistema de micro pulverizado para un rocío en forma de bruma. Adicionado con biotina y Pantenol para fortalecer y dar brillo."
      },
      { 
        id: 29, 
        src: "/imagenes/controller.jpg", 
        title: "Controller", 
        description: "Revolución en estilizado",
        longDescription: "Controla peinados que requieren un acabado de mayor duración y brinda una excelente resistencia a la humedad. Su textura permite hacer peinados artísticos o simplemente aplacar cabellos muy rebeldes."
      }
    ],
    PRO_SALON: [
      { 
        id: 30, 
        src: "/imagenes/plattina_white.jpg", 
        title: "Plattina White", 
        description: "Uso exclusivo de salón",
        longDescription: "Polvo decolorante para el cabello, NO VOLATIL. Con tecnología Nanotribología capilar para un mejor balance de lubricación durante el proceso de decoloración. Contiene especiales amarillos para neutralizar."
      },
      { 
        id: 31, 
        src: "/imagenes/regress.jpg", 
        title: "Regress", 
        description: "Uso exclusivo de salón",
        longDescription: "Sistema para eliminar cualquier tinte oxidativo sin afectar el color natural del cabello. Extrae el color de oxidación del cabello. Deja el cabello acondicionado y con una textura suave. Fórmula fácil de mezclar y aplicar. No contiene amoniaco, decolorante, ni formaldehído."
      },
      { 
        id: 32, 
        src: "/imagenes/neurone_color.jpg", 
        title: "Neurone Color", 
        description: "Uso exclusivo de salón",
        longDescription: "Con activos capilares liposolubles compatibles con las estructuras capilares lipofílicas internas y externas que promueven el balance de lubricación en las fibras capilares permitiendo mayor penetración de color evitando el daño durante el proceso de decoloración. Tiempo de pose de 45 a 60 minutos."
      },
      { 
        id: 33, 
        src: "/imagenes/fanzi_mix.jpg", 
        title: "Fanzi Mix", 
        description: "Uso exclusivo de salón",
        longDescription: "Deja el cabello manejable, sedoso y brillante. Sin peróxido ni amoniaco. Ideal para personas que buscan lucir una cabellera con colores vibrantes, luminosos y de larga duración. Cuenta con 12 Tonos: African Violet, Lavander Violet, Orchid Natural, Passion Magenta, Cherry Red, Fire Red, Maple Red, Sunflower Yellow, Citrus Green, Ocean Blue, Moonlight Blue y Neutral. Pueden ser mezclados entre sí para crear nuevas tonalidades."
      },
      { 
        id: 34, 
        src: "/imagenes/pro_filus.jpg", 
        title: "Pro Filus", 
        description: "Uso exclusivo de salón",
        longDescription: "Su fórmula ayuda a combatir los daños que el cabello sufre durante estos procesos, reduciendo la rotura, reparándolo y manteniendo su integridad sin añadir tiempo de procesado. Contribuyendo a reducir el efecto estático y el encrespamiento, evitando el quiebre y ofreciendo resultados precisos al proteger la fibra capilar."
      },
      { 
        id: 35, 
        src: "/imagenes/alizzanti.jpg", 
        title: "Alizzanti", 
        description: "Uso exclusivo de salón",
        longDescription: "Tratamiento progresivo anti frizz para cabello natural, teñido y decolorado."
      },
      { 
        id: 36, 
        src: "/imagenes/density_proff.jpg", 
        title: "Density Proff", 
        description: "Uso exclusivo de salón",
        longDescription: "Peróxido en crema estabilizado, su formulación proporciona una consistencia densa que permite tener mayor precisión y fácil manejo. Aumenta el poder de aclaración contribuyendo a mejorar la fijación del pigmento."
      },
      { 
        id: 37, 
        src: "/imagenes/lineare.jpg", 
        title: "Lineare", 
        description: "Uso exclusivo de salón",
        longDescription: "SISTEMA ALACIANTE PERMANENTE para el cabello, a base de activación térmica. Se puede usar en cabello natural y teñido. SISTEMA COMPUESTO POR FASE 1 + FASE 2."
      },
      { 
        id: 38, 
        src: "/imagenes/total_violet_ink.jpg", 
        title: "Total Violet Ink", 
        description: "Uso exclusivo de salón",
        longDescription: "Peróxido en crema estabilizado. Su fórmula permite lograr una mejor coloración o decoloración, mejorando la penetración de los pigmentos con el menor daño posible a la cutícula y una menor irritación al cuero cabelludo. Recomendado para cabellos rubios claros, rubios muy claros y rubios extra claros. Ideal para eliminar visos naranjas o amarillos y dar luz a los reflejos rubios platinados. Se puede mezclar con el producto que más se adapte al cabello, ya sea tinte, decolorante, shampoo, acondicionador, mascarillas, gel, etc."
      }
    ]
  };
// Función para mostrar el pop-up con la información del producto
function showPopup(product: Product) {
  setPopupContent({
    image: product.src, // Asegúrate de que esto sea siempre un string
    title: product.title,
    description: product.description,
    longDescription: product.longDescription,
  });
}

// Función para cerrar el pop-up
function closePopup() {
  setPopupContent(null); // Restablece el contenido a null para cerrar el pop-up
}

return (
  <div className="p-4">
    <h2 className="text-lg font-bold">Búsqueda de Productos de Neurone Cosmetica</h2>
    
    {/* Barra de búsqueda */}
    <input
      type="text"
      placeholder="Buscar por título..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="mb-4 p-2 w-full border rounded-md"
    />

    {/* Categorías de productos */}
    {Object.entries(productCategories).map(([category, products]) => (
      <div key={category} className="mb-8">
        <h3 className="text-xl font-semibold mb-4">{category.replace('_', ' ')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products
            .filter((product) => 
              product.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <img
                    src={product.src}
                    alt={product.title}
                    className="rounded-md w-full h-48 object-cover"
                    onClick={() => showPopup(product)} // Muestra el pop-up al hacer clic en la imagen
                  />
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                </CardContent>
                <CardFooter>
                  <button 
                    className="px-4 py-2 text-sm text-white rounded-md hover:bg-opacity-90" 
                    style={{ backgroundColor: 'pink' }}
                    onClick={() => showPopup(product)} // Muestra el pop-up al hacer clic en "Ver más"
                  >
                    Ver más
                  </button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    ))}

   {/* Pop-up para mostrar la información del producto */}
{popupContent && (
  <div id="popup" className="popup-overlay">
    <div className="popup-content">
      <button className="close-btn" onClick={closePopup}>×</button>
      <img id="popupImage" src={popupContent.image} alt="Imagen del Pop-up" />
      <div className="text-content">
        <h3 className="text-lg font-semibold">{popupContent.title}</h3>
        <p className="text-sm text-gray-500">{popupContent.description}</p>
        <p className="text-sm">{popupContent.longDescription}</p>
      </div>
    </div>
  </div>
)}


    {/* Estilos del pop-up */}
    <style jsx>{`
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .popup-content {
    position: relative;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%; /* Limita el tamaño horizontal */
    max-width: 600px; /* Tamaño máximo */
  }
  .popup-content img {
    max-width: 100%;
    max-height: 300px;
    width: auto;
    height: auto;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .popup-content h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  .popup-content p {
    font-size: 1rem;
    line-height: 1.5;
    max-width: 100%;
    margin-bottom: 15px;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    cursor: pointer;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
  }
`}</style>

  </div>
);
};

export default AlbumNuevo;