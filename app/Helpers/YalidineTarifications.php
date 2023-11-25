<?php

namespace App\Helpers;

class YalidineTarifications
{
    private $tarifs = [
        1 => ['Adrar', 1600, 800],
        2 => ['Chlef', 900, 450],
        3 => ['Laghouat', 1200, 600],
        4 => ['Oum El Bouaghi', 900, 350],
        6 => ['Béjaïa', 850, 400],
        7 => ['Biskra', 850, 350],
        8 => ['Béchar', 1400, 800],
        9 => ['Blida', 800, 350],
        10 => ['Bouira', 850, 400],
        11 => ['Tamanrasset', 1600, 1000],
        12 => ['Tébessa', 800, 600],
        13 => ['Tlemcen', 900, 350],
        14 => ['Tiaret', 950, 400],
        15 => ['Tizi Ouzou', 850, 400],
        16 => ['Alger', 750, 350],
        17 => ['Djelfa', 1200, 600],
        18 => ['Jijel', 850, 400],
        19 => ['Sétif', 850, 350],
        20 => ['Saïda', 1000, 400],
        21 => ['Skikda', 850, 400],
        22 => ['Sidi Bel Abbès', 900, 400],
        23 => ['Annaba', 850, 350],
        24 => ['Guelma', 850, 400],
        25 => ['Constantine', 850, 400],
        26 => ['Médéa', 850, 400],
        27 => ['Mostaganem', 900, 400],
        28 => ['M’Sila', 900, 350],
        29 => ['Mascara', 950, 400],
        30 => ['Ouargla', 1200, 600],
        31 => ['Oran', 900, 350],
        32 => ['El Bayadh', 1400, 600],
        33 => ['Illizi', 1800, 1200],
        34 => ['Bordj Bou Arreridj', 850, 400],
        35 => ['Boumerdès', 650, 400],
        36 => ['El Tarf', 850, 400],
        37 => ['Tindouf', 1600, 1000],
        38 => ['Tissemsilt', 950, 400],
        39 => ['El Oued', 1000, 600],
        40 => ['Khenchela', 800, 350],
        41 => ['Souk Ahras', 850, 400],
        42 => ['Tipaza', 850, 350],
        43 => ['Mila', 800, 350],
        44 => ['Aïn Defla', 900, 400],
        45 => ['Naâma', 1400, 800],
        46 => ['Aïn Témouchent', 950, 400],
        47 => ['Ghardaïa', 1200, 600],
        48 => ['Relizane', 950, 400]
    ];

    public function getFeesByWilayaCode($wilayaCode) {
        if (isset($this->tarifs[$wilayaCode])) {
            $tarif = $this->tarifs[$wilayaCode];
            return [
                'wilaya' => $tarif[0],
                'tarif_domicile' => $tarif[1],
                'tarif_point_relais' => $tarif[2]
            ];
        } else {
            return null; // Wilaya code not found
        }
    }

    public function getHomeDeliveryFee($wilayaCode) {
        $fees = $this->getFeesByWilayaCode($wilayaCode);
        if ($fees !== null) {
            return $fees['tarif_domicile'];
        } else {
            return null;
        }
    }

    public function getStopDeskDeliveryFee($wilayaCode) {
        $fees = $this->getFeesByWilayaCode($wilayaCode);
        if ($fees !== null) {
            return $fees['tarif_point_relais'];
        } else {
            return null;
        }
    }
}
