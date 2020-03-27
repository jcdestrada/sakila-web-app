import { Component, OnInit, ViewChild } from '@angular/core';
import { ActorService } from '../actor.service';
import { Actor } from '../actor.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections'
@Component({
	selector: 'app-actor-list',
	templateUrl: './actor-list.component.html',
	styleUrls: ['./actor-list.component.css']
})


export class ActorListComponent implements OnInit {
	actors$: Actor[];
	dataSource: MatTableDataSource<Actor>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	columnsToDisplay = ['select', 'actorId', 'firstName', 'lastName'];
	selection: SelectionModel<Actor>

	constructor(private actorService: ActorService) {
		const initialSelection = [];
		const allowMultiSelect = true;
		this.selection = new SelectionModel<Actor>(allowMultiSelect, initialSelection);
	}

	ngOnInit(): void {

		this.actorService.getActors().subscribe(data => {
			// wait 300ms after each keystroke before considering the term
			this.actors$ = data;
			this.dataSource = new MatTableDataSource<Actor>(this.actors$);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		}
		);
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: Actor): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.actorId}`;
	}

	add() { }
	remove() { }
	apply() { }

}
