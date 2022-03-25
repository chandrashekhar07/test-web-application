export interface OriginalSalesObject {
    country: string;
    sale: number;
    year: number;
    petroleum_product: string;
}

export interface ModifiedSalesObject {
    country: number;
    sale: number;
    year: number;
    petroleum_product: number;
}
