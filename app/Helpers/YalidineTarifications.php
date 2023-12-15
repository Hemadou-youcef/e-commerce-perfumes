<?php

namespace App\Helpers;

class YalidineTarifications
{
    private $tarifs = [
        1 => ['Adrar', 'أدرار', 1600, 800],
        2 => ['Chlef', 'الشلف', 900, 450],
        3 => ['Laghouat', 'الأغواط', 1200, 600],
        4 => ['Oum El Bouaghi', 'أم البواقي', 900, 350],
        5 => ['Batna', 'باتنة', 850, 400],
        6 => ['Béjaïa', 'بجاية', 850, 400],
        7 => ['Biskra', 'بسكرة', 850, 350],
        8 => ['Béchar', 'بشار', 1400, 800],
        9 => ['Blida', 'البليدة', 800, 350],
        10 => ['Bouira', 'البويرة', 850, 400],
        11 => ['Tamanrasset', 'تمنراست', 1600, 1000],
        12 => ['Tébessa', 'تبسة', 800, 600],
        13 => ['Tlemcen', 'تلمسان', 900, 350],
        14 => ['Tiaret', 'تيارت', 950, 400],
        15 => ['Tizi Ouzou', 'تيزي وزو', 850, 400],
        16 => ['Algiers', 'الجزائر', 750, 350],
        17 => ['Djelfa', 'الجلفة', 1200, 600],
        18 => ['Jijel', 'جيجل', 850, 400],
        19 => ['Sétif', 'سطيف', 850, 350],
        20 => ['Saïda', 'سعيدة', 1000, 400],
        21 => ['Skikda', 'سكيكدة', 850, 400],
        22 => ['Sidi Bel Abbès', 'سيدي بلعباس', 900, 400],
        23 => ['Annaba', 'عنابة', 850, 350],
        24 => ['Guelma', 'قالمة', 850, 400],
        25 => ['Constantine', 'قسنطينة', 850, 400],
        26 => ['Médéa', 'المدية', 850, 400],
        27 => ['Mostaganem', 'مستغانم', 900, 400],
        28 => ['M’Sila', 'المسيلة', 900, 350],
        29 => ['Mascara', 'معسكر', 950, 400],
        30 => ['Ouargla', 'ورقلة', 1200, 600],
        31 => ['Oran', 'وهران', 900, 350],
        32 => ['El Bayadh', 'البيض', 1400, 600],
        33 => ['Illizi', 'إليزي', 1800, 1200],
        34 => ['Bordj Bou Arreridj', 'برج بوعريريج', 850, 400],
        35 => ['Boumerdès', 'بومرداس', 650, 400],
        36 => ['El Tarf', 'الطارف', 850, 400],
        37 => ['Tindouf', 'تندوف', 1600, 1000],
        38 => ['Tissemsilt', 'تسمسيلت', 950, 400],
        39 => ['El Oued', 'الوادي', 1000, 600],
        40 => ['Khenchela', 'خنشلة', 800, 350],
        41 => ['Souk Ahras', 'سوق أهراس', 850, 400],
        42 => ['Tipaza', 'تيبازة', 850, 350],
        43 => ['Mila', 'ميلة', 800, 350],
        44 => ['Aïn Defla', 'عين الدفلى', 900, 400],
        45 => ['Naâma', 'النعامة', 1400, 800],
        46 => ['Aïn Témouchent', 'عين تموشنت', 950, 400],
        47 => ['Ghardaïa', 'غرداية', 1200, 600],
        48 => ['Relizane', 'غليزان', 950, 400],
    ];


    public function getFeesByWilayaCode($wilayaCode) {
        if ($this->tarifs[$wilayaCode] !== null) {
            $tarif = $this->tarifs[$wilayaCode];
            return [
                'wilaya' => $tarif[0],
                'tarif_domicile' => $tarif[2],
                'tarif_point_relais' => $tarif[3]
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

    public function getStopDeskDeliveryFee(int $wilayaCode): ?int {
        $fees = $this->getFeesByWilayaCode($wilayaCode);
        if ($fees !== null) {
            return $fees['tarif_point_relais'];
        } else {
            return null;
        }
    }

    public function getTarifs(): array
    {
        return $this->tarifs;
    }

}
