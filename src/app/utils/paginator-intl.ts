import { MatLegacyPaginatorIntl as MatPaginatorIntl } from '@angular/material/legacy-paginator';

const rangeLabel = (page: number, pageSize: number, length: number) => {
    if(length === 0) {
        return 'Seite 1 von 1'
    }

    const totalPages = Math.ceil(length / pageSize);
    return `Seite ${page + 1} von ${totalPages}`;
}
export const getMatPaginatorIntl = () => {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'Einträge pro Seite:';
    paginatorIntl.nextPageLabel = 'Vor';
    paginatorIntl.previousPageLabel = 'Zurück';
    paginatorIntl.firstPageLabel = 'Anfang';
    paginatorIntl.lastPageLabel = 'Ende';
    paginatorIntl.getRangeLabel = rangeLabel;

    return paginatorIntl;
}
