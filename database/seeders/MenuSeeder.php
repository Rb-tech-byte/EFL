<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\MenuItem;
use App\Models\MenuColumn;
use App\Models\MenuLink;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing menu data (delete in correct order to avoid FK constraints)
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        MenuLink::truncate();
        MenuColumn::truncate();
        MenuItem::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Universities Menu
        $universities = MenuItem::create(['name' => 'Universities', 'order' => 1, 'is_active' => true]);

        $byRegion = MenuColumn::create(['menu_item_id' => $universities->id, 'title' => 'By Region', 'order' => 1]);
        MenuLink::create(['menu_column_id' => $byRegion->id, 'name' => 'North America', 'href' => '/universities?region=na', 'order' => 1]);
        MenuLink::create(['menu_column_id' => $byRegion->id, 'name' => 'Europe', 'href' => '/universities?region=eu', 'order' => 2]);
        MenuLink::create(['menu_column_id' => $byRegion->id, 'name' => 'Asia', 'href' => '/universities?region=as', 'order' => 3]);
        MenuLink::create(['menu_column_id' => $byRegion->id, 'name' => 'Oceania', 'href' => '/universities?region=oc', 'order' => 4]);

        $byProgram = MenuColumn::create(['menu_item_id' => $universities->id, 'title' => 'By Program', 'order' => 2]);
        MenuLink::create(['menu_column_id' => $byProgram->id, 'name' => 'Engineering & Technology', 'href' => '/programs?category=engineering', 'order' => 1]);
        MenuLink::create(['menu_column_id' => $byProgram->id, 'name' => 'Business & Management', 'href' => '/programs?category=business', 'order' => 2]);
        MenuLink::create(['menu_column_id' => $byProgram->id, 'name' => 'Computer Science', 'href' => '/programs?category=cs', 'order' => 3]);
        MenuLink::create(['menu_column_id' => $byProgram->id, 'name' => 'Health & Medicine', 'href' => '/programs?category=health', 'order' => 4]);

        $featured = MenuColumn::create(['menu_item_id' => $universities->id, 'title' => 'Featured', 'order' => 3]);
        MenuLink::create(['menu_column_id' => $featured->id, 'name' => 'Top 100 Ranked', 'href' => '/universities?rank=top100', 'order' => 1]);
        MenuLink::create(['menu_column_id' => $featured->id, 'name' => 'Partner Universities', 'href' => '/universities?type=partner', 'order' => 2]);
        MenuLink::create(['menu_column_id' => $featured->id, 'name' => 'New Additions', 'href' => '/universities?sort=newest', 'order' => 3]);

        // Process Menu
        $process = MenuItem::create(['name' => 'Process', 'order' => 2, 'is_active' => true]);

        $application = MenuColumn::create(['menu_item_id' => $process->id, 'title' => 'Application', 'order' => 1]);
        MenuLink::create(['menu_column_id' => $application->id, 'name' => 'How to Apply', 'href' => '/process/how-to-apply', 'order' => 1]);
        MenuLink::create(['menu_column_id' => $application->id, 'name' => 'Requirements', 'href' => '/process/requirements', 'order' => 2]);
        MenuLink::create(['menu_column_id' => $application->id, 'name' => 'Deadlines', 'href' => '/process/deadlines', 'order' => 3]);

        $support = MenuColumn::create(['menu_item_id' => $process->id, 'title' => 'Support', 'order' => 2]);
        MenuLink::create(['menu_column_id' => $support->id, 'name' => 'Visa & Immigration', 'href' => '/process/visa', 'order' => 1]);
        MenuLink::create(['menu_column_id' => $support->id, 'name' => 'Tuition & Financing', 'href' => '/process/financing', 'order' => 2]);
        MenuLink::create(['menu_column_id' => $support->id, 'name' => 'Scholarships', 'href' => '/scholarships', 'order' => 3]);

        // Student Life Menu
        $studentLife = MenuItem::create(['name' => 'Student Life', 'order' => 3, 'is_active' => true]);

        $community = MenuColumn::create(['menu_item_id' => $studentLife->id, 'title' => 'Community', 'order' => 1]);
        MenuLink::create(['menu_column_id' => $community->id, 'name' => 'Student Stories', 'href' => '/stories', 'order' => 1]);
        MenuLink::create(['menu_column_id' => $community->id, 'name' => 'Ambassadors', 'href' => '/ambassadors', 'order' => 2]);
        MenuLink::create(['menu_column_id' => $community->id, 'name' => 'Alumni Network', 'href' => '/alumni', 'order' => 3]);

        $living = MenuColumn::create(['menu_item_id' => $studentLife->id, 'title' => 'Living', 'order' => 2]);
        MenuLink::create(['menu_column_id' => $living->id, 'name' => 'Accommodations', 'href' => '/housing', 'order' => 1]);
        MenuLink::create(['menu_column_id' => $living->id, 'name' => 'Cost of Living', 'href' => '/cost-of-living', 'order' => 2]);
        MenuLink::create(['menu_column_id' => $living->id, 'name' => 'Safety & Wellness', 'href' => '/safety', 'order' => 3]);

        // About Menu
        $about = MenuItem::create(['name' => 'About', 'order' => 4, 'is_active' => true]);

        $whoWeAre = MenuColumn::create(['menu_item_id' => $about->id, 'title' => 'Who We Are', 'order' => 1]);
        MenuLink::create(['menu_column_id' => $whoWeAre->id, 'name' => 'Our Mission', 'href' => '/about/mission', 'order' => 1]);
        MenuLink::create(['menu_column_id' => $whoWeAre->id, 'name' => 'Leadership', 'href' => '/about/leadership', 'order' => 2]);
        MenuLink::create(['menu_column_id' => $whoWeAre->id, 'name' => 'Careers', 'href' => '/about/careers', 'order' => 3]);

        $connect = MenuColumn::create(['menu_item_id' => $about->id, 'title' => 'Connect', 'order' => 2]);
        MenuLink::create(['menu_column_id' => $connect->id, 'name' => 'Contact Us', 'href' => '/contact', 'order' => 1]);
        MenuLink::create(['menu_column_id' => $connect->id, 'name' => 'For Universities', 'href' => '/partners', 'order' => 2]);
        MenuLink::create(['menu_column_id' => $connect->id, 'name' => 'Newsroom', 'href' => '/news', 'order' => 3]);
    }
}
