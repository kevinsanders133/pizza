import React from 'react';
import IPage from '../interfaces/page';

const AboutUs: React.FunctionComponent<IPage> = () => {
    return (
        <div>
            <h1>
                AVE! PIZZA ZAPRASZA NA WARSZAWSKIE POWIŚLE. NIECH ŻYJE PIZZA!
            </h1>
            <p>
                AVE! Pizza to miejsce z tradycyjną pizzą, którą przygotowują nasi włoscy pizzaiolo według tradycyjnej receptury. Na naszej pizzy znajdują się wyłącznie wysokiej jakości produkty włoskie. W odpowiednim do tego sezonie serwujemy specjalne menu - można w nim znaleźć ciekawe propozycję pizz np. ze szparagami lub kurkami.  Ciasto z którego wyrabiamy pizze dojrzewa 72 godziny, a wypiekane jest w specjalnym piecu w temperaturze 450 stopni!  Zapraszamy również na nasze pasty, antipasti, sałatki, desery oraz do naszego Ave Baru, Nasza pizzeria została uznana za jedną z 50 najlepszych w Europie w zestawieniu “Top 50 pizza” na rok 2019 oraz 2020. Ranking ten to zestawienie najlepszych pizzerii na wszystkich kontynentach. Kuratorami zestawienia są Barbara Guerra (twórczyni kongresu Le Strade della Mozzarella), znany sommelier Albert Sapere i Luciano Pignataro, specjalista od gastronomii w serwisie "Il Mattino" oraz twórca poczytnego bloga o jedzeniu i winie.
            </p>
            <p>
                Adres: Topiel 12, 00-342 Warszawa
            </p>
        </div>
    )
}

export default AboutUs;
