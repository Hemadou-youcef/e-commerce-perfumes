<?php

namespace App\Helpers;

class WilayaMapper {
    private $wilayaMap;

    public function __construct() {
        $this->wilayaMap = [
            1 => ['Adrar', 'أدرار'],
            2 => ['Chlef', 'الشلف'],
            3 => ['Laghouat', 'الأغواط'],
            4 => ['Oum El Bouaghi', 'أم البواقي'],
            5 => ['Batna', 'باتنة'],
            6 => ['Béjaïa', 'بجاية'],
            7 => ['Biskra', 'بسكرة'],
            8 => ['Béchar', 'بشار'],
            9 => ['Blida', 'البليدة'],
            10 => ['Bouïra', 'البويرة'],
            11 => ['Tamanrasset', 'تمنراست'],
            12 => ['Tébessa', 'تبسة'],
            13 => ['Tlemcen', 'تلمسان'],
            14 => ['Tiaret', 'تيارت'],
            15 => ['Tizi Ouzou', 'تيزي وزو'],
            16 => ['Algiers', 'الجزائر'],
            17 => ['Djelfa', 'الجلفة'],
            18 => ['Jijel', 'جيجل'],
            19 => ['Sétif', 'سطيف'],
            20 => ['Saïda', 'سعيدة'],
            21 => ['Skikda', 'سكيكدة'],
            22 => ['Sidi Bel Abbès', 'سيدي بلعباس'],
            23 => ['Annaba', 'عنابة'],
            24 => ['Guelma', 'قالمة'],
            25 => ['Constantine', 'قسنطينة'],
            26 => ['Médéa', 'المدية'],
            27 => ['Mostaganem', 'مستغانم'],
            28 => ['M\'Sila', 'المسيلة'],
            29 => ['Mascara', 'معسكر'],
            30 => ['Ouargla', 'ورقلة'],
            31 => ['Oran', 'وهران'],
            32 => ['El Bayadh', 'البيض'],
            33 => ['Illizi', 'إليزي'],
            34 => ['Bordj Bou Arréridj', 'برج بوعريريج'],
            35 => ['Boumerdès', 'بومرداس'],
            36 => ['El Tarf', 'الطارف'],
            37 => ['Tindouf', 'تندوف'],
            38 => ['Tissemsilt', 'تسمسيلت'],
            39 => ['El Oued', 'الوادي'],
            40 => ['Khenchela', 'خنشلة'],
            41 => ['Souk Ahras', 'سوق أهراس'],
            42 => ['Tipaza', 'تيبازة'],
            43 => ['Mila', 'ميلة'],
            44 => ['Aïn Defla', 'عين الدفلى'],
            45 => ['Naâma', 'النعامة'],
            46 => ['Aïn Témouchent', 'عين تموشنت'],
            47 => ['Ghardaïa', 'غرداية'],
            48 => ['Relizane', 'غليزان'],
            49 => ['Timimoun', 'تميمون'],
            50 => ['Bordj Badji Mokhtar', 'برج بادجي مختار'],
            51 => ['Ouled Djellal', 'أولاد جلال'],
            52 => ['Béni Abbès', 'بني عباس'],
            53 => ['Ain Salah', 'عين صالح'],
            54 => ['Ain Guezzam', 'عين قزام'],
            55 => ['Touggourt', 'تقرت'],
            56 => ['Djanet', 'جانت'],
            57 => ['El M\'Ghair', 'المقيرة'],
            58 => ['El Menia', 'المنيعة'],
        ];

    }

    // getter


    public function getWilayas(): array
    {
        return $this->wilayaMap;
    }
}

