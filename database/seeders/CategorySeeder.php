<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types_parfums = ['boisé', 'agrume', 'aromatique', 'épicé frais', 'frais', 'fleurs blanches', 'sucré', 'fruité', 'floral', 'poudreux', 'épicé chaud', 'cannelle', 'vert', 'vanille', 'ambre', 'alcool', 'balsamique/baumé', 'tabac', 'épicé doux', 'rose', 'musqué', 'ozonique', 'miel', 'caramel', 'animal', 'patchouli', 'cire d\'abeille', 'iris', 'cacao', 'aquatique', 'terreux', 'oud', 'cuir', 'fumé', 'violette', 'noix de coco', 'fleurs jaunes', 'lactonique', 'tropical', 'café', 'chocolate', 'amande', 'lavande', 'terreux', 'conifère', 'violette', 'anis', 'tubéreuse', 'fruits à coque', 'aigre', 'odeur marine', 'salé', 'mousse', 'herbacé', 'cerise', 'savonneux', 'aldéhydé', 'vodka', 'camphre', 'minéral', 'métallique', 'amer', 'fleursjaunes', 'rhum',];
        $types_parfums_ar = ['خشبي', 'حمضيات', 'أروماتك', 'تابلي منعش', 'منعش', 'الزهور البيضاء', 'حلو', 'فاكهي', 'زهري', 'ناعم', 'تابلي دافئ', 'القرفة', 'عشبي', 'الفانيلا', 'العنبر', 'كحولي', 'بلسمي', 'التبغ', 'توابل ناعم', 'ورد', 'مسكي', 'أوزوني', 'العسل', 'الكراميل', 'حيواني', 'الباتشولي', 'شمع العسل', 'السوسن', 'الكاكاو', 'مائي', 'ترابي', 'العود', 'الجلود', 'مدخن', 'البنفسج', 'جوز الهند', 'زهور صفراء', 'لاكتوني', 'أستوائي', 'القهوة', 'شوكولاتة', 'اللوز', 'الخزامي', 'ترابي', 'صنوبرية', 'البنفسج', 'الينسون', 'مسك الروم', 'بنكهه الجوز', 'حامض', 'بحري', 'مالح', 'طحلبي', 'عشبي', 'الكرز', 'صابوني', 'ألدهيد', 'الفودكا', 'الكافور', 'معدني', 'معدني', 'مرّ', 'زهور صفراء', 'الروم',];
        $types_sex = ['homme', 'femme', 'unisexe'];
        $types_sex_ar = ['رجالي', 'نسائي', 'رجالي و نسائي'];
        $day_seasons = ['printemps', 'été', 'automne', 'hiver', 'day', 'night', 'day and night'];
        $day_seasons_ar = ['ربيع', 'صيف', 'خريف', 'شتاء', 'نهاري', 'ليلي', 'نهاري و ليلي'];

        for ($i = 0; $i < count($types_parfums); $i++) {
            Category::create([
                'name' => $types_parfums[$i],
                'name_ar' => $types_parfums_ar[$i],
            ]);
        }
        for ($i = 0; $i < count($types_sex); $i++) {
            Category::create([
                'name' => $types_sex[$i],
                'name_ar' => $types_sex_ar[$i],
            ]);
        }

        for ($i = 0; $i < count($day_seasons); $i++) {
            Category::create([
                'name' => $day_seasons[$i],
                'name_ar' => $day_seasons_ar[$i],
            ]);
        }
    }
}
