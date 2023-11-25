<?php

namespace App\Helpers;

class WilayaMapper {
    private $wilayaMap;

    public function __construct() {
        $this->wilayaMap = [
            1 => 'Adrar',
            2 => 'Chlef',
            3 => 'Laghouat',
            4 => 'Oum El Bouaghi',
            5 => 'Batna',
            6 => 'Béjaïa',
            7 => 'Biskra',
            8 => 'Béchar',
            9 => 'Blida',
            10 => 'Bouïra',
            11 => 'Tamanrasset',
            12 => 'Tébessa',
            13 => 'Tlemcen',
            14 => 'Tiaret',
            15 => 'Tizi Ouzou',
            16 => 'Algiers',
            17 => 'Djelfa',
            18 => 'Jijel',
            19 => 'Sétif',
            20 => 'Saïda',
            21 => 'Skikda',
            22 => 'Sidi Bel Abbès',
            23 => 'Annaba',
            24 => 'Guelma',
            25 => 'Constantine',
            26 => 'Médéa',
            27 => 'Mostaganem',
            28 => 'M\'Sila',
            29 => 'Mascara',
            30 => 'Ouargla',
            31 => 'Oran',
            32 => 'El Bayadh',
            33 => 'Illizi',
            34 => 'Bordj Bou Arréridj',
            35 => 'Boumerdès',
            36 => 'El Tarf',
            37 => 'Tindouf',
            38 => 'Tissemsilt',
            39 => 'El Oued',
            40 => 'Khenchela',
            41 => 'Souk Ahras',
            42 => 'Tipaza',
            43 => 'Mila',
            44 => 'Aïn Defla',
            45 => 'Naâma',
            46 => 'Aïn Témouchent',
            47 => 'Ghardaïa',
            48 => 'Relizane',
            49 => 'Timimoun',
            50 => 'Bordj Badji Mokhtar',
            51 => 'Ouled Djellal',
            52 => 'Béni Abbès',
            53 => 'Ain Salah',
            54 => 'Ain Guezzam',
            55 => 'Touggourt',
            56 => 'Djanet',
            57 => 'El M\'Ghair',
            58 => 'El Menia',
        ];
    }

    public function getProvinceName($wilayaCode): ?string
    {
        return $this->wilayaMap[$wilayaCode] ?? null;
    }
}

