<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MegaMenuSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Universities Menu
        $universityId = DB::table('menu_items')->insertGetId([
            'name' => 'Universities',
            'order' => 1,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $col1Id = DB::table('menu_columns')->insertGetId(['menu_item_id' => $universityId, 'title' => 'Destinations', 'order' => 1, 'created_at' => now(), 'updated_at' => now()]);
        DB::table('menu_links')->insert([
            ['menu_column_id' => $col1Id, 'name' => 'Study in USA', 'href' => '/universities?country=USA', 'order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['menu_column_id' => $col1Id, 'name' => 'Study in UK', 'href' => '/universities?country=UK', 'order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['menu_column_id' => $col1Id, 'name' => 'Study in Canada', 'href' => '/universities?country=Canada', 'order' => 3, 'created_at' => now(), 'updated_at' => now()],
        ]);

        $col2Id = DB::table('menu_columns')->insertGetId(['menu_item_id' => $universityId, 'title' => 'Top Ranked', 'order' => 2, 'created_at' => now(), 'updated_at' => now()]);
        DB::table('menu_links')->insert([
            ['menu_column_id' => $col2Id, 'name' => 'Ivy League', 'href' => '/universities?type=ivy', 'order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['menu_column_id' => $col2Id, 'name' => 'Russell Group', 'href' => '/universities?type=russell', 'order' => 2, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 2. Programs Menu
        $programsId = DB::table('menu_items')->insertGetId([
            'name' => 'Programs',
            'order' => 2,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $pCol1Id = DB::table('menu_columns')->insertGetId(['menu_item_id' => $programsId, 'title' => 'Degree Level', 'order' => 1, 'created_at' => now(), 'updated_at' => now()]);
        DB::table('menu_links')->insert([
            ['menu_column_id' => $pCol1Id, 'name' => 'Bachelor\'s', 'href' => '/programs?level=bachelor', 'order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['menu_column_id' => $pCol1Id, 'name' => 'Master\'s', 'href' => '/programs?level=master', 'order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['menu_column_id' => $pCol1Id, 'name' => 'PhD', 'href' => '/programs?level=phd', 'order' => 3, 'created_at' => now(), 'updated_at' => now()],
        ]);

        $pCol2Id = DB::table('menu_columns')->insertGetId(['menu_item_id' => $programsId, 'title' => 'Fields of Study', 'order' => 2, 'created_at' => now(), 'updated_at' => now()]);
        DB::table('menu_links')->insert([
            ['menu_column_id' => $pCol2Id, 'name' => 'Engineering', 'href' => '/programs?field=engineering', 'order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['menu_column_id' => $pCol2Id, 'name' => 'Business', 'href' => '/programs?field=business', 'order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['menu_column_id' => $pCol2Id, 'name' => 'Computer Science', 'href' => '/programs?field=cs', 'order' => 3, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 3. Services Menu
        $servicesId = DB::table('menu_items')->insertGetId([
            'name' => 'Services',
            'order' => 3,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $sCol1Id = DB::table('menu_columns')->insertGetId(['menu_item_id' => $servicesId, 'title' => 'Student Support', 'order' => 1, 'created_at' => now(), 'updated_at' => now()]);
        DB::table('menu_links')->insert([
            ['menu_column_id' => $sCol1Id, 'name' => 'Application Review', 'href' => '/services/application-review', 'order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['menu_column_id' => $sCol1Id, 'name' => 'Visa Assistance', 'href' => '/services/visa', 'order' => 2, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
