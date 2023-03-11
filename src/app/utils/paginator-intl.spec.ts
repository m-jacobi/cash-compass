import { MatPaginatorIntl } from "@angular/material/paginator";
import { getMatPaginatorIntl } from "./paginator-intl";

describe('getMatPaginatorIntl', () => {

    it('should return a MatPaginatorIntl object with correct page-labels', () => {
        const paginatorIntl = getMatPaginatorIntl();

        expect(paginatorIntl).toBeInstanceOf(MatPaginatorIntl);
        expect(paginatorIntl.itemsPerPageLabel).toEqual('Einträge pro Seite:');
        expect(paginatorIntl.nextPageLabel).toEqual('Vor');
        expect(paginatorIntl.previousPageLabel).toEqual('Zurück');
        expect(paginatorIntl.firstPageLabel).toEqual('Anfang');
        expect(paginatorIntl.lastPageLabel).toEqual('Ende');
    });

    it('should return a MatPaginatorIntl object with correct rage-labels', () => {
        const paginatorIntl = getMatPaginatorIntl();

        expect(paginatorIntl.getRangeLabel(0,10,0)).toEqual('Seite 1 von 1');
        expect(paginatorIntl.getRangeLabel(0,10,100)).toEqual('Seite 1 von 10');
        expect(paginatorIntl.getRangeLabel(1,10,100)).toEqual('Seite 2 von 10');
        expect(paginatorIntl.getRangeLabel(8,10,100)).toEqual('Seite 9 von 10');
        expect(paginatorIntl.getRangeLabel(9,10,100)).toEqual('Seite 10 von 10');
    });
})
