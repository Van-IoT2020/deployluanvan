<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class ImportReceipt implements ToCollection
{
    public $rows;
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        $this->rows = $collection;
    }
}
