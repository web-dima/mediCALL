<?php
namespace App\Services;
use Illuminate\Support\Str;

class FileService {
    static function saveFile($request, string $folder):string {
        $imageName = Str::random(32).".".$request->file("img")->getClientOriginalExtension();
        $path = public_path() . "/uploads/img/" . $folder . "/";
        $file = $request->file("img");
        $file->move($path, $imageName);
        return "$path/$imageName";
    }
    static function removeFile($imgPath):void {
        if (file_exists($imgPath)) {
            unlink($imgPath);
        }
    }
}
