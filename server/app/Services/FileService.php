<?php
namespace App\Services;
use Illuminate\Support\Str;

class FileService {
    static function saveFile($request, $folder):string {
        $imageName = Str::random(32).".".$request->file("img")->getClientOriginalExtension();
        $path = url('/') . "/uploads/img/" . $folder . "/";
        $pathMove = public_path() . "/uploads/img/" . $folder . "/";
        $file = $request->file("img");
        $file->move($pathMove, $imageName);
        return "$path$imageName";
    }
    static function removeFile($imgPath):void {
        if (file_exists($imgPath)) {
            unlink($imgPath);
        }
    }
}
